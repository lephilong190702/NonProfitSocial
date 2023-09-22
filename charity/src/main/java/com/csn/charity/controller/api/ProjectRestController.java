package com.csn.charity.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.Project;
import com.csn.charity.model.ProjectCategory;
import com.csn.charity.repository.ProjectCategoryRepository;
import com.csn.charity.service.interfaces.ProjectService;

@RestController
@RequestMapping("/api")
public class ProjectRestController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectCategoryRepository projectCategoryRepository;

    @GetMapping("/projects/")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/category/")
    public List<ProjectCategory> get() {
        return projectCategoryRepository.findAll();
    }
}
