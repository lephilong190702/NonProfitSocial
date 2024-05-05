package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.Notification;
import com.csn.charity.model.Project;
import com.csn.charity.model.User;
import com.csn.charity.repository.NotificationRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Override
    public List<Notification> getNotificationByUser(Long id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng với ID: " + id));
        
        return this.notificationRepository.findByUser(user);
    }
    
}
