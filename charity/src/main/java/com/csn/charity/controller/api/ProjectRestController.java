package com.csn.charity.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.service.interfaces.ProjectCategoryService;
import com.csn.charity.service.interfaces.ProjectService;

@RestController
@RequestMapping("/api")
public class ProjectRestController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ProjectCategoryService projectCategoryService;

    @GetMapping("/projects/")
    @CrossOrigin
    public ResponseEntity<?> getAllProjects() {
        try {
            return new ResponseEntity<>(this.projectService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pcategories/")
    @CrossOrigin
    public ResponseEntity<?> getAllCategories() {
        try {
            return new ResponseEntity<>(this.projectCategoryService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}