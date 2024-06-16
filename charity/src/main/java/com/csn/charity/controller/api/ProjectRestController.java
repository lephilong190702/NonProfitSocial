package com.csn.charity.controller.api;

import java.util.List;

import com.csn.charity.model.ProjectFeedback;
import com.csn.charity.model.UserContributeProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.csn.charity.dto.ProjectDTO;
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

    @PostMapping("/upload-project/")
    @CrossOrigin
    public ResponseEntity<?> addProject(@RequestPart("files") List<MultipartFile> files,
            @RequestPart(value = "projectDTO", required = false) ProjectDTO projectDTO) {
        try {
            Project sendedProject = projectService.sendProject(projectDTO, files);
            return new ResponseEntity<>(sendedProject, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/projects/search")
    @CrossOrigin
    public ResponseEntity<List<Project>> searchNews(@RequestParam("kw") String kw) {
        return ResponseEntity.ok(projectService.search(kw));
    }

    @GetMapping("/projects/{id}")
    @CrossOrigin
    public ResponseEntity<?> getProject(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(this.projectService.get(id), HttpStatus.OK);
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

    @GetMapping("/projects/pcategories/{id}")
    @CrossOrigin
    public ResponseEntity<?> getProjectByCategory(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(projectService.getProjectsByCategory(id), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/projects/images/{id}")
    @CrossOrigin
    public ResponseEntity<?> getImagesByCategory(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(projectService.getImagesByProject(id), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/feedback/{projectId}")
    @CrossOrigin
    public ResponseEntity<?> feedbackProject(@PathVariable Long projectId,
                                         @RequestBody ProjectFeedback projectFeedback) {
        try {
            ProjectFeedback feedback = this.projectService.feedbackProject(projectId, projectFeedback);
            return new ResponseEntity<>(feedback, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}