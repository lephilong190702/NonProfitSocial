package com.csn.charity.service.interfaces;

public interface MailService {
    void sendConfirmEmail(String email);
    void sendUploadProjectEmail(String email);
}
