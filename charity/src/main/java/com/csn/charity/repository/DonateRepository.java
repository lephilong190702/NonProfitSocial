package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserContributeProject;

public interface DonateRepository extends JpaRepository<UserContributeProject, Long>{
    
}
