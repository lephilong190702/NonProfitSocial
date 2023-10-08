package com.csn.charity.pay;

import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(donateAmount, projectId, baseUrl);
        return new ResponseEntity<>(vnpayUrl, HttpStatus.CREATED);
    }

    @GetMapping("/vnpay-payment/{projectId}")
    @CrossOrigin
    public ResponseEntity<Map<String, Object>> getPaymentStatus(@PathVariable(value = "projectId") Long projectId,
            HttpServletRequest request) {
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", orderInfo);
        response.put("totalPrice", totalPrice);
        response.put("paymentTime", paymentTime);
        response.put("transactionId", transactionId);
        response.put("paymentStatus", paymentStatus);

        System.out.println("STATUS" + paymentStatus);
        if (paymentStatus == 1) {
            BigDecimal donatedAmount = new BigDecimal(totalPrice);
            UserContributeProject userContributeProject = new UserContributeProject();
            userContributeProject.setDonateAmount(donatedAmount.divide(new BigDecimal(100)));
            donateService.donate(projectId, userContributeProject);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
