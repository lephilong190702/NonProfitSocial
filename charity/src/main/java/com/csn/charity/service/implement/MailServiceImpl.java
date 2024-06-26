package com.csn.charity.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.csn.charity.service.interfaces.MailService;

@Service
public class MailServiceImpl implements MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("$(lephilong02@gmail.com)")
    private String fromEmail;

    @Async
    public void sendMailRegister(SimpleMailMessage email) {
        javaMailSender.send(email);
    }

    @Override
    public void sendConfirmEmail(String email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(fromEmail);
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject("Xác nhận đăng ký tình nguyện");
            simpleMailMessage.setText("Cảm ơn bạn đã đăng ký tình nguyện! Chúng tôi sẽ liên lạc lại sau.");

            javaMailSender.send(simpleMailMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendUploadProjectEmail(String email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(fromEmail);
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject("Email xác nhận gửi dự án thành công");
            simpleMailMessage.setText("Chúc mừng dự án của bạn đã hợp lệ, vui lòng lên website để thấy dự án của bạn!");

            javaMailSender.send(simpleMailMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendDonateItemProjectEmail(String email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(fromEmail);
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject("Email xác nhận quyên góp hiện vật");
            simpleMailMessage.setText("Cảm ơn bạn đã quyên góp hiện vật cho dự án");
    
            javaMailSender.send(simpleMailMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendShipperEmail(String email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(fromEmail);
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject("Email xác nhận đơn vận chuyển");
            simpleMailMessage.setText("Đã có đơn mới! Vui lòng liên lạc người quyên góp để nhận hàng");

            javaMailSender.send(simpleMailMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendTransportSuccessEmail(String email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(fromEmail);
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject("Email xác nhận gửi dự án thành công");
            simpleMailMessage.setText("Chúc mừng dự án của bạn đã hợp lệ, vui lòng lên website để thấy dự án của bạn!");

            javaMailSender.send(simpleMailMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendEmail(String email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(fromEmail);
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject("Email xác nhận quyên góp thành công");
            simpleMailMessage.setText("Chân thành cảm ơn bạn vì đã quyên góp vào dự án của chúng tôi, chúng tôi sẽ sử dụng vào đúng mục đích của nó !!!");

            javaMailSender.send(simpleMailMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendDonateItemEmail(SimpleMailMessage email) {
        try {
            javaMailSender.send(email);
        } catch (Exception e) {
            e.printStackTrace();
        }
        javaMailSender.send(email);
    }
    
}
