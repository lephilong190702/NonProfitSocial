package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.Notification;


public interface NotificationService {
    List<Notification> getNotificationByUser(Long id);

    void markAllNotificationsAsRead(Long userId);
}
