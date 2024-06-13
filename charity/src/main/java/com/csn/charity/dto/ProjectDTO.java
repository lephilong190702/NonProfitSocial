package com.csn.charity.dto;

import java.math.BigDecimal;
import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {
    private String title;
    private String content;
    private String address;
    private BigDecimal contributedAmount;
    private BigDecimal totalAmount;
    private Date startDate;
    private Date endDate;
}
