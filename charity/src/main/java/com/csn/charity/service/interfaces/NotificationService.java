package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.Notification;
import com.csn.charity.model.Post;
import com.csn.charity.model.User;
import com.csn.charity.model.UserContributeProject;

public interface NotificationService {
    List<Notification> getNotificationByUser(Long id);
}
