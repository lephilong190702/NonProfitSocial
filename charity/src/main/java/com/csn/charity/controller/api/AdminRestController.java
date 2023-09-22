package com.csn.charity.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.service.interfaces.ProjectService;

@RestController
public class AdminRestController {
    @Autowired
    private ProjectService projectService;

    @DeleteMapping("/admin/project/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNew(@PathVariable(value = "id") Long id) {
        this.projectService.deleteProject(id);
    }
}
