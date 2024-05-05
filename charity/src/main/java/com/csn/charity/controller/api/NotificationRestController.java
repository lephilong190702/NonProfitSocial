package com.csn.charity.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.service.interfaces.NotificationService;

@RestController
@RequestMapping("/api")
public class NotificationRestController {
    @Autowired
    private NotificationService notificationService;
    @GetMapping("/notifications/{userId}")
    @CrossOrigin
    public ResponseEntity<?> getNotificationByUser(@PathVariable Long userId) {
        try {
            return new ResponseEntity<>(this.notificationService.getNotificationByUser(userId), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
