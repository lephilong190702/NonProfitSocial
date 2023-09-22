package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.Project;


public interface ProjectService {
    List<Project> getAllProjects();
    Project getProjectById(Long id);
    Project addProject(Project project);
    Project updateProject(Long id, Project project);
    void deleteProject(Long id);
}
