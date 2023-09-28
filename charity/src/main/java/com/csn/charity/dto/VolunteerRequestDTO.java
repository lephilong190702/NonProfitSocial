package com.csn.charity.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VolunteerRequestDTO {
    private Long id;
    private Long userId;
    private Long projectId;
    private Date startDate;
    private Date endDate;
    private String description;
    private List<Long> skills;
}
