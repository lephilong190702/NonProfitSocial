package com.csn.charity.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csn.charity.model.ContributionCategory;
import com.csn.charity.model.Project;
import com.csn.charity.model.User;
import com.csn.charity.model.UserContributeProject;

public interface DonateRepository extends JpaRepository<UserContributeProject, Long> {

    @Query("SELECT SUM(u.donateAmount) FROM UserContributeProject u WHERE YEAR(u.donateDate) = :year AND MONTH(u.donateDate) = :month")
    BigDecimal getTotalDonationByMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT SUM(u.donateAmount) FROM UserContributeProject u WHERE YEAR(u.donateDate) = :year AND QUARTER(u.donateDate) = :quarter")
    BigDecimal getTotalDonationByQuarter(@Param("year") int year, @Param("quarter") int quarter);

    @Query("SELECT YEAR(u.donateDate) as year, SUM(u.donateAmount) as totalDonation FROM UserContributeProject u GROUP BY YEAR(u.donateDate)")
    List<Object[]> getTotalDonationByYear();

    List<UserContributeProject> findByProject(Project project);

    List<UserContributeProject> findByCategory(ContributionCategory category);

    List<UserContributeProject> findByDonateDateBetween(LocalDate startDate, LocalDate endDate);

    List<UserContributeProject> findByStatus(String status);

    List<UserContributeProject> findByShipper(User shipper);

    @Query("SELECT DISTINCT MONTH(d.donateDate) FROM UserContributeProject d")
    List<Integer> findDistinctMonths();

    @Query("SELECT DISTINCT QUARTER(d.donateDate) FROM UserContributeProject d")
    List<Integer> findDistinctQuarters();
    
    @Query("SELECT DISTINCT YEAR(d.donateDate) FROM UserContributeProject d")
    List<Integer> findDistinctYears();

}
