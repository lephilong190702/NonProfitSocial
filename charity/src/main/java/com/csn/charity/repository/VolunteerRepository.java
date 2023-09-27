package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserVolunteerProject;

public interface VolunteerRepository extends JpaRepository<UserVolunteerProject, Long> {
    
}
