package com.csn.charity.repository;

import com.csn.charity.model.ProjectFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectFeedbackRepository extends JpaRepository<ProjectFeedback, Long> {
    List<ProjectFeedback> findByStatus(String status);
}
