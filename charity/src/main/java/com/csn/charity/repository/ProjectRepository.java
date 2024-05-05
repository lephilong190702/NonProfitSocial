package com.csn.charity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csn.charity.model.Project;
import com.csn.charity.model.ProjectCategory;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p WHERE LOWER(p.title) LIKE %?1%")
    List<Project> findByName(String name);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.category.id = :categoryId")
    Long countProjectsByCategoryId(@Param("categoryId") Long categoryId);

    List<Project> findByCategory(ProjectCategory category);

    @Query("SELECT p FROM Project p WHERE p.title LIKE CONCAT('%',:kw, '%') Or p.content LIKE CONCAT('%', :kw, '%')")
    List<Project> search(String kw);
}
