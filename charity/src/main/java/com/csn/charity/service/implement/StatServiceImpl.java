package com.csn.charity.service.implement;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.StatDTO;
import com.csn.charity.model.UserContributeProject;
import com.csn.charity.repository.DonateRepository;
import com.csn.charity.service.interfaces.StatService;

@Service
public class StatServiceImpl implements StatService {
    @Autowired
    private DonateRepository donateRepository;

    @Override
    public List<StatDTO> getTotalDonationByMonth(int year) {
        List<StatDTO> monthlyStats = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            BigDecimal totalDonation = donateRepository.getTotalDonationByMonth(year, month);
            StatDTO statDTO = new StatDTO(month, null, year, totalDonation != null ? totalDonation : BigDecimal.ZERO);
            monthlyStats.add(statDTO);
        }
        return monthlyStats;
    }

    @Override
    public List<StatDTO> getTotalDonationByQuarter(int year) {
        List<StatDTO> quarterlyStats = new ArrayList<>();
        for (int quarter = 1; quarter <= 4; quarter++) {
            BigDecimal totalDonation = donateRepository.getTotalDonationByQuarter(year, quarter);
            StatDTO statDTO = new StatDTO(null, quarter, year, totalDonation != null ? totalDonation : BigDecimal.ZERO);
            quarterlyStats.add(statDTO);
        }
        return quarterlyStats;
    }

    @Override
    public List<StatDTO> getTotalDonationByYear() {
        List<Object[]> yearlyStats = donateRepository.getTotalDonationByYear();
        List<StatDTO> statDTOs = new ArrayList<>();
        for (Object[] stat : yearlyStats) {
            int year = (int) stat[0];
            BigDecimal totalDonation = (BigDecimal) stat[1];
            StatDTO statDTO = new StatDTO(null, null, year, totalDonation);
            statDTOs.add(statDTO);
        }
        return statDTOs;
    }

    @Override
    public List<UserContributeProject> getMonthlyContributions(int month, int year) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.with(TemporalAdjusters.lastDayOfMonth());
        return donateRepository.findByDonateDateBetween(startDate, endDate);
    }

    @Override
    public List<UserContributeProject> getQuarterlyContributions(int quarter, int year) {
        int startMonth = (quarter - 1) * 3 + 1;
        LocalDate startDate = LocalDate.of(year, startMonth, 1);
        LocalDate endDate = startDate.plusMonths(2).with(TemporalAdjusters.lastDayOfMonth());
        return donateRepository.findByDonateDateBetween(startDate, endDate);
    }

    @Override
    public List<UserContributeProject> getYearlyContributions(int year) {
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        return donateRepository.findByDonateDateBetween(startDate, endDate);
    }    


    @Override
    public List<Integer> getMonthlyWithData() {
        return donateRepository.findDistinctMonths();
    }

    @Override
    public List<Integer> getQuarterlyWithData() {
        return donateRepository.findDistinctQuarters();
    }

    @Override
    public List<Integer> getYearlyWithData() {
        return donateRepository.findDistinctYears();
    }
}
