package com.csn.charity.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.csn.charity.model.ProjectCategory;
import com.csn.charity.service.interfaces.ProjectCategoryService;
import com.csn.charity.service.interfaces.ProjectService;


@Controller
@Slf4j
public class ProjectCategoryController {
    @Autowired
    private ProjectCategoryService projectCategoryService;

    @Autowired
    private ProjectService projectService;

    @GetMapping("/admin/pcategories")
    public String listProjectCategories(Model model) {
        List<ProjectCategory> projectCategories = projectCategoryService.getAll();

        Map<Long, Long> count = projectCategories.stream()
                .collect(Collectors.toMap(ProjectCategory::getId,
                        category -> projectService.countProjectByCategory(category.getId())));

        model.addAttribute("count", count);
        model.addAttribute("projectCategories", projectCategories);
        return "pages/pcategories";
    }

    @GetMapping("/admin/pcategory")
    public String addPage( Model model) {
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
    @Transactional
    public String addProjectCategory(@Valid @ModelAttribute("projectCategory") ProjectCategory projectCategory, BindingResult bindingResult) {
        log.error(bindingResult.toString());
        if (bindingResult.hasErrors())
            return "pages/pcategory";
        if (projectCategory.getId() == null)
            projectCategoryService.add(projectCategory);
        else
            projectCategoryService.update(projectCategory.getId(), projectCategory);

        return "redirect:/admin/pcategories";
    }
}
