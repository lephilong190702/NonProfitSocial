package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.csn.charity.model.ProjectImage;

public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM ProjectImage p WHERE p.project.id = :projectId")
    void deleteByProjectId(@Param("projectId") Long projectId);

}
