package com.csn.charity.controller;

import java.util.List;

import com.csn.charity.model.ProjectFeedback;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.csn.charity.model.Project;
import com.csn.charity.model.ProjectCategory;
import com.csn.charity.model.ProjectImage;
import com.csn.charity.service.interfaces.ProjectCategoryService;
import com.csn.charity.service.interfaces.ProjectService;

@Controller
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    

    @Autowired
    private ProjectCategoryService projectCategoryService;

    @GetMapping("/admin/projects")
    public String index(Model model) {
        model.addAttribute("currentPage", "projects");
        model.addAttribute("projects", projectService.getAll());
        return "pages/index";
    }

    @GetMapping("/admin/projects/search")
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
    public String addOrUpdateProject(@Valid @ModelAttribute(value = "project") Project project,
            BindingResult bindingResult, Model model,
            @RequestParam(value = "categoryId", required = false) Long categoryId) {
        if (bindingResult.hasErrors()) {
            List<ProjectCategory> projectCategories = projectCategoryService.getAll();
            model.addAttribute("projectCategories", projectCategories);
            return "pages/project";

        }
        System.out.println("category: " + categoryId);

        ProjectCategory projectCategory = projectCategoryService.get(categoryId);
        project.setCategory(projectCategory);

        if (project.getId() == null) {
            projectService.add(project);
        } else
            projectService.update(project.getId(), project);

        return "redirect:/admin/projects";

    }

    @GetMapping("/showMap")
    public String index() {
        return "pages/test";
    }

    @GetMapping("/admin/pending-project")
    public String getPedingProject(Model model) {
        model.addAttribute("pendings", this.projectService.getPendingProject());
        return "pages/pending_projects";
    }

    @GetMapping("/admin/pending-feedback")
    public String getPendingFeedback(Model model) {
        model.addAttribute("pending", this.projectService.getPendingFeedback());
        return "pages/pending_feedback_project";
    }

    @GetMapping("/admin/pending-project/{id}")
    public String detail(Model model, @PathVariable(value = "id") Long id) {
        List<ProjectImage> projectImage = this.projectService.getImagesByProject(id);
        model.addAttribute("images", projectImage);
        Project project = this.projectService.get(id);
        model.addAttribute("pending", project);
        return "pages/pending_project";
    }

    @GetMapping("/admin/pending-feedback/{id}")
    public String feedbackDetail(Model model, @PathVariable(value = "id") Long id) {
        ProjectFeedback projectFeedback = this.projectService.getFeedback(id);
        model.addAttribute("pending", projectFeedback);
        return "pages/feedback_project_detail";
    }

    @RequestMapping(value = "/admin/accept-project/{id}", method = { RequestMethod.GET, RequestMethod.POST })
    public String acceptProject(@PathVariable(value = "id") Long id) {
        this.projectService.acceptProject(id);
        return "redirect:/admin/pending-project";
    }

    @RequestMapping(value = "/admin/accept-feedback/{id}", method = { RequestMethod.GET, RequestMethod.POST })
    public String acceptFeedback(@PathVariable(value = "id") Long id) {
        this.projectService.acceptFeedback(id);
        return "redirect:/admin/pending-feedback";
    }

    @RequestMapping(value = "/admin/deny-project/{id}", method = { RequestMethod.GET, RequestMethod.POST })
    public String denyProject(@PathVariable(value = "id") Long id) {
        this.projectService.denyProject(id);
        return "redirect:/admin/pending-project";
    }

    @RequestMapping(value = "/admin/deny-feedback/{id}", method = { RequestMethod.GET, RequestMethod.POST })
    public String denyFeedback(@PathVariable(value = "id") Long id) {
        this.projectService.denyFeedback(id);
        return "redirect:/admin/pending-feedback";
    }

}
