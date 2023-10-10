package com.csn.charity.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.Project;
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

    @GetMapping("/projects/{id}")
    @CrossOrigin
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return new ResponseEntity<>(this.projectService.get(id), HttpStatus.OK);
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

    @GetMapping("projects/pcategories/{id}/")
    @CrossOrigin
    public ResponseEntity<List<Project>> getProjectByCategory(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.getProjectsByCategory(id), HttpStatus.OK);
    }

}