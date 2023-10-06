package com.csn.charity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csn.charity.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p WHERE LOWER(p.title) LIKE %?1%")
    List<Project> findByName(String name);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.category.id = :categoryId")
    Long countProjectsByCategoryId(@Param("categoryId") Long categoryId);
}
