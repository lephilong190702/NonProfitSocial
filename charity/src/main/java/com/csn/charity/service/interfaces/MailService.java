package com.csn.charity.service.interfaces;

import org.springframework.mail.SimpleMailMessage;

public interface MailService {
    void sendEmail(String email);
    void sendLivestreamEmail(SimpleMailMessage email);
    void sendDonateItemEmail(SimpleMailMessage email);
    void sendConfirmEmail(String email);
    void sendUploadProjectEmail(String email);
    void sendDonateItemProjectEmail(String email);
    void sendShipperEmail(String email);
    void sendTransportSuccessEmail(String email);
}
