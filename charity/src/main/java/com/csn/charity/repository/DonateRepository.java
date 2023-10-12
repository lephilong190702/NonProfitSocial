package com.csn.charity.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csn.charity.model.Project;
import com.csn.charity.model.UserContributeProject;

public interface DonateRepository extends JpaRepository<UserContributeProject, Long> {

    @Query("SELECT SUM(u.donateAmount) FROM UserContributeProject u WHERE YEAR(u.donateDate) = :year AND MONTH(u.donateDate) = :month")
    BigDecimal getTotalDonationByMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT SUM(u.donateAmount) FROM UserContributeProject u WHERE YEAR(u.donateDate) = :year AND QUARTER(u.donateDate) = :quarter")
    BigDecimal getTotalDonationByQuarter(@Param("year") int year, @Param("quarter") int quarter);

    @Query("SELECT YEAR(u.donateDate) as year, SUM(u.donateAmount) as totalDonation FROM UserContributeProject u GROUP BY YEAR(u.donateDate)")
    List<Object[]> getTotalDonationByYear();

    List<UserContributeProject> findByProject(Project project);
}
