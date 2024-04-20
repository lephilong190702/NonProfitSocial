package com.csn.charity.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.csn.charity.service.interfaces.MailService;

import jakarta.mail.internet.MimeMessage;

@Service
public class MailServiceImpl implements MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Async
    public void sendMailRegister(SimpleMailMessage email) {
        javaMailSender.send(email);
    }

    @Override
    public void sendConfirmEmail(String email) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(email);
            helper.setSubject("Xác nhận đăng ký tình nguyện");
            helper.setText("Cảm ơn bạn đã đăng ký tình nguyện!");

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
