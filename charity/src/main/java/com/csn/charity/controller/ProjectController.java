package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.csn.charity.service.interfaces.ProjectService;



@Controller
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping("/")
    public String homePage(Model model) {
        model.addAttribute("projects", projectService.getAllProjects());
        return "index";
    }
}
