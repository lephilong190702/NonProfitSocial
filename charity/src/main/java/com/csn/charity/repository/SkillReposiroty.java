package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.Skill;

public interface SkillReposiroty extends JpaRepository<Skill, Long> {
    
}
