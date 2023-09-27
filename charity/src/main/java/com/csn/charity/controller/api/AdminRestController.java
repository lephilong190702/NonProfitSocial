package com.csn.charity.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.service.interfaces.NewsCategoryService;
import com.csn.charity.service.interfaces.NewsService;
import com.csn.charity.service.interfaces.ProjectCategoryService;
import com.csn.charity.service.interfaces.ProjectService;
import com.csn.charity.service.interfaces.UserService;

@RestController
public class AdminRestController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private NewsService newsService;

    @Autowired
    private NewsCategoryService newsCategoryService;

    @Autowired
    private ProjectCategoryService projectCategoryService;

    @Autowired
    private UserService userService;

    @DeleteMapping("/admin/pcategory/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProjectCategory(@PathVariable(value = "id") Long id) {
        this.projectCategoryService.delete(id);
    }

    @DeleteMapping("/admin/project/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable(value = "id") Long id) {
        this.projectService.delete(id);
    }

    @DeleteMapping("/admin/ncategory/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNewCategory(@PathVariable(value = "id") Long id) {
        this.newsCategoryService.delete(id);
    }

    @DeleteMapping("/admin/new/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNew(@PathVariable(value = "id") Long id) {
        this.newsService.delete(id);
    }

    @DeleteMapping("/admin/user/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable(value = "id") Long id) {
        this.userService.delete(id);
    }
}
