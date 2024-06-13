package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.StatDTO;
import com.csn.charity.model.UserContributeProject;

public interface StatService {
    List<StatDTO> getTotalDonationByMonth(int year);

    List<StatDTO> getTotalDonationByQuarter(int year);

    List<StatDTO> getTotalDonationByYear();

    List<UserContributeProject> getMonthlyContributions(int month, int year);
    List<UserContributeProject> getQuarterlyContributions(int quarter, int year);
    List<UserContributeProject> getYearlyContributions(int year);
    List<Integer> getMonthlyWithData();
    List<Integer> getQuarterlyWithData();
    List<Integer> getYearlyWithData();

}
