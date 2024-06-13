package com.csn.charity.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserVolunteerProject;

import java.util.List;

public interface VolunteerRepository extends JpaRepository<UserVolunteerProject, Long> {
    List<UserVolunteerProject> findByStatus(Boolean status);

}
