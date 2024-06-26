package com.csn.charity.pay;

import com.csn.charity.service.implement.MailServiceImpl;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URI;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.User;
import com.csn.charity.model.UserContributeProject;
import com.csn.charity.service.interfaces.DonateService;
import com.csn.charity.service.interfaces.UserService;

@RestController
@RequestMapping("/api")
public class PaymentController {
    @Autowired
    private VNPayService vnPayService;
    @Autowired
    private DonateService donateService;
    @Autowired
    private UserService userService;
    @Autowired
    MailServiceImpl mailService;

    @PostMapping("/submitOrder/{projectId}")
    @CrossOrigin
    public String submidOrder(@PathVariable Long projectId,
            @RequestParam("amount") int orderTotal,
            @RequestParam("orderInfo") String orderInfo,
            HttpServletRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }
        String username = authentication.getName();
        User user = this.userService.findUserByUsername(username);
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl, projectId, user);
        System.out.println("USERNAME: " + username);
        System.out.println("VNPAY: " + vnpayUrl);
        System.out.println("NOTE: " + orderInfo);
        return vnpayUrl;
    }

    @GetMapping("/vnpay-payment")
    @CrossOrigin
    public ResponseEntity<String> getMapping(HttpServletRequest request) {
        int paymentStatus = vnPayService.orderReturn(request);
        String orderInfo = request.getParameter("vnp_OrderInfo");
        String totalPrice = request.getParameter("vnp_Amount");

        System.out.println("ORDER INFO: " + orderInfo);
        System.out.println("TOTAL PRICE: " + totalPrice);

        if (paymentStatus == 1) {
            BigDecimal donatedAmount = new BigDecimal(totalPrice);
            String[] orderInfoParts = orderInfo.split(" - ");
            String note = orderInfoParts[0];
            String projectIdStr = orderInfoParts[1].split(": ")[1];
            Long projectId = Long.parseLong(projectIdStr);
            String username = orderInfoParts[2].split(": ")[1];

            User userDonate = this.userService.findUserByUsername(username);

            UserContributeProject userContributeProject = new UserContributeProject();
            userContributeProject.setDonateAmount(donatedAmount.divide(new BigDecimal(100)));
            userContributeProject.setNote(note);
            userContributeProject.setUser(userDonate);

            donateService.donate(projectId, userContributeProject);

            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create("https://nonprofit.southeastasia.cloudapp.azure.com/result"));

            this.mailService.sendEmail(userDonate.getEmail());
            return new ResponseEntity<>("", headers, HttpStatus.FOUND);
        } else {
            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create("https://nonprofit.southeastasia.cloudapp.azure.com/error"));
            return new ResponseEntity<>("", headers, HttpStatus.FOUND);
        }
    }
}
