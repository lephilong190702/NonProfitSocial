package com.csn.charity.configs;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.csn.charity.model.AuthenticationType;
import com.csn.charity.model.User;
import com.csn.charity.service.interfaces.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuthLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws ServletException, IOException {
        CustomOAuth2User oauth2User = (CustomOAuth2User) authentication.getPrincipal();
        String oauth2ClientName = oauth2User.getOauth2ClientName();
        String email = oauth2User.getEmail();
        User user = userService.findUserByEmail(email);
        System.out.println("USER" + user);
        if(user == null) {
            userService.registerOAuthUser(email, AuthenticationType.valueOf(oauth2ClientName));
        }
        System.out.println("DEBUG" + email);
        System.out.println("DEBUG" + oauth2ClientName);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
