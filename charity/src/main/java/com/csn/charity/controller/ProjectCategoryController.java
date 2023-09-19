package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.csn.charity.model.ProjectCategory;
import com.csn.charity.service.interfaces.ProjectCategoryService;

@Controller
public class ProjectCategoryController {
    @Autowired
    private ProjectCategoryService projectCategoryService;

    @GetMapping("/projectCategories")
    public String listProjectCategories(Model model) {
        model.addAttribute("projectCategories", projectCategoryService.getAllProjectCategories());
        return "/pages/pcategories";
    }
    
    @GetMapping("/admin/projectCategory")
    public String addPage(Model model) {
        ProjectCategory projectCategory = new ProjectCategory();
        model.addAttribute("projectCategory", projectCategory);
        return "/pages/pcategory";
    }

    @PostMapping("/admin/projectCategory")
    public String addProjectCategory(@ModelAttribute(value = "projectCategory") ProjectCategory projectCategory) {
        projectCategoryService.addProjectCategory(projectCategory);
        return "redirect:/";
    }
}
