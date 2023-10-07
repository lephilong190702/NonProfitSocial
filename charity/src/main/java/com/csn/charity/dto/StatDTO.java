package com.csn.charity.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatDTO {
    private Integer month;
    private Integer quarter;
    private Integer year;
    private BigDecimal totalDonation;
}
