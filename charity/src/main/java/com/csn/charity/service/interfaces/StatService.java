package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.StatDTO;

public interface StatService {
    List<StatDTO> getTotalDonationByMonth(int year);

    List<StatDTO> getTotalDonationByQuarter(int year);

    List<StatDTO> getTotalDonationByYear();
}
