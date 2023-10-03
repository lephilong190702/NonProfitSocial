package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.Project;


public interface ProjectService {
    List<Project> getAll();
    Project get(Long id);
    Project add(Project project);
    Project update(Long id, Project project);
    void delete(Long id);
    List<Project> findByName(String name);
    Long countProjectByCategory(Long categoryId);
}
