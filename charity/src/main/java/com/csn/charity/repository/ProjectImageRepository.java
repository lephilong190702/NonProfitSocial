package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.ProjectImage;

public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {
    
}
