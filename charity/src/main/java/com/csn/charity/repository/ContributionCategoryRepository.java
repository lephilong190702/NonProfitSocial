package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.ContributionCategory;

public interface ContributionCategoryRepository extends JpaRepository<ContributionCategory, Long>{
    
}
