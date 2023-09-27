package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.csn.charity.model.ProjectCategory;
import com.csn.charity.service.interfaces.ProjectCategoryService;

@Controller
public class ProjectCategoryController {
    @Autowired
    private ProjectCategoryService projectCategoryService;

    @GetMapping("/pcategories")
    public String listProjectCategories(Model model) {
        model.addAttribute("projectCategories", projectCategoryService.getAll());
        return "pages/pcategories";
    }

    @GetMapping("/admin/pcategory")
    public String addPage(Model model) {
        ProjectCategory projectCategory = new ProjectCategory();
        model.addAttribute("projectCategory", projectCategory);
        return "pages/pcategory";
    }

    @GetMapping("/admin/pcategory/{id}")
    public String update(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("projectCategory", this.projectCategoryService.get(id));
        return "pages/pcategory";
    }

    @PostMapping("/admin/pcategory")
    public String addProjectCategory(@ModelAttribute(value = "projectCategory") ProjectCategory projectCategory) {
        if (projectCategory.getId() == null)
            projectCategoryService.add(projectCategory);
        else
            projectCategoryService.update(projectCategory.getId(), projectCategory);

        return "redirect:/pcategories";
    }
}
