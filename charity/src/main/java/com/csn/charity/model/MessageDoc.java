package com.csn.charity.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDoc {
    private String content;
    private Date createAt;
    private Date updateAt;
    private Long userId;
    private String roomName;
    
    @Override
    public String toString() {
        return "MessageDoc [content=" + content + ", createAt=" + createAt + ", updateAt=" + updateAt + ", userId="
                + userId + ", roomName=" + roomName + "]";
    }
    
}
