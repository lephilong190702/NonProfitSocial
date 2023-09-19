package com.csn.charity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.csn.charity.model.Project;
import com.csn.charity.model.ProjectCategory;
import com.csn.charity.service.interfaces.ProjectCategoryService;
import com.csn.charity.service.interfaces.ProjectService;

@Controller
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectCategoryService projectCategoryService;

    @GetMapping("/home")
    public String index(Model model) {
        model.addAttribute("projects", projectService.getAllProjects());
        return "/pages/index";
    }

    @GetMapping("/admin/project")
    public String addPage(Model model) {
        Project project = new Project();
        model.addAttribute("project", project);
        List<ProjectCategory> projectCategories = projectCategoryService.getAllProjectCategories();
        model.addAttribute("projectCategories", projectCategories);
        return "/pages/project";
    }

    @PostMapping("/admin/project")
    public String addProject(@ModelAttribute(value = "project") Project project,
            @RequestParam(value = "categoryId") Long categoryId) {
        ProjectCategory projectCategory = projectCategoryService.getProjectCategoryById(categoryId);
        project.setCategory(projectCategory);
        projectService.addProject(project);
        return "redirect:/";
    }
}
