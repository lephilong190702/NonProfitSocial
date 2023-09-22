package com.csn.charity.repository;


import org.springframework.data.jpa.repository.JpaRepository;


import com.csn.charity.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}
