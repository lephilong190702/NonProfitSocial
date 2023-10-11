package com.csn.charity.pay;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.UserContributeProject;
import com.csn.charity.service.interfaces.DonateService;

@RestController
@RequestMapping("/api")
public class PaymentController {
    @Autowired
    private VNPayService vnPayService;
    @Autowired
    private DonateService donateService;

    @PostMapping("/projects/{projectId}/donate/")
    @CrossOrigin
    public ResponseEntity<String> donate(@RequestParam("donateAmount") BigDecimal donateAmount,
            @PathVariable(value = "projectId") Long projectId, @RequestParam("note") String note,
            HttpServletRequest request) throws UnsupportedEncodingException {

        UserContributeProject userContributeProject = new UserContributeProject();
        userContributeProject.setDonateAmount(donateAmount);
        userContributeProject.setNote(note);
        System.out.println("NOTE" + note);

        String vnpayUrl = vnPayService.createOrder(donateAmount, projectId);
        return new ResponseEntity<>(vnpayUrl, HttpStatus.CREATED);
    }

    @GetMapping("/vnpay-payment/{projectId}")
    @CrossOrigin
    public ResponseEntity<?> getPaymentStatus(@PathVariable(value = "projectId") Long projectId,
            HttpServletRequest request) throws IOException {
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        System.out.println("STATUS" + paymentStatus);
        if (paymentStatus == 1) {
            BigDecimal donatedAmount = new BigDecimal(totalPrice);
            UserContributeProject userContributeProject = new UserContributeProject();
            userContributeProject.setDonateAmount(donatedAmount.divide(new BigDecimal(100)));
            System.out.println(userContributeProject.getUser());
            donateService.donate(projectId, userContributeProject);
            return new ResponseEntity<>("Xong", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Lỗi", HttpStatus.BAD_REQUEST);
        }
    }
}
