package com.csn.charity.controller;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/projects")
    public String index(Model model) {
        model.addAttribute("currentPage", "projects");
        model.addAttribute("projects", projectService.getAll());
        return "pages/index";
    }

    @GetMapping("/projects/search")
    public String search(@RequestParam("kw") String kw, Model model) {
        if (kw != null && !kw.isEmpty()) {
            List<Project> projects = projectService.findByName(kw);
            model.addAttribute("projects", projects);
        }
        return "pages/index";
    }

    @GetMapping("/admin/project")
    public String addPage(Model model) {
        Project project = new Project();
        model.addAttribute("project", project);
        List<ProjectCategory> projectCategories = projectCategoryService.getAll();
        model.addAttribute("projectCategories", projectCategories);
        return "pages/project";
    }

    @GetMapping("/admin/project/{id}")
    public String update(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("project", this.projectService.get(id));
        List<ProjectCategory> projectCategories = projectCategoryService.getAll();
        model.addAttribute("projectCategories", projectCategories);
        return "pages/project";
    }

    @PostMapping("/admin/project")
    @Transactional
    public String addOrUpdateProject(@Valid @ModelAttribute(value = "project") Project project,BindingResult bindingResult,
                                     @RequestParam(value = "categoryId", required = false) Long categoryId) {
        if (bindingResult.hasErrors())
            return "pages/project";
        System.out.println("category: " + categoryId);

        ProjectCategory projectCategory = projectCategoryService.get(categoryId);
        project.setCategory(projectCategory);

        if (project.getId() == null) {
            projectService.add(project);
        } else
            projectService.update(project.getId(), project);

        return "redirect:/projects";

    }

    @GetMapping("/showMap")
    public String index() {
        return "pages/test";
    }
}
