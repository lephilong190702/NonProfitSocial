package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.Project;


public interface ProjectService {
    List<Project> getAllProjects();
    Project addProject(Project project);
}
