package com.csn.charity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentNewsDTO {
    private Long newsId;
    private String content;
    private Date createDate;
}
