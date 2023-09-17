package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csn.charity.model.ProjectCategory;

@Repository
public interface ProjectCategoryRepository extends JpaRepository<ProjectCategory, Long> {
    
}
