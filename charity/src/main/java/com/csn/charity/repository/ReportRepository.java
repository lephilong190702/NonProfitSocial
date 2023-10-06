package com.csn.charity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserReportPost;

public interface ReportRepository extends JpaRepository<UserReportPost, Long> {
    List<UserReportPost> findByResolved(boolean resolved);
}
