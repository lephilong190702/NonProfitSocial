package com.csn.charity.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.New;
import com.csn.charity.model.NewCategory;
import com.csn.charity.service.interfaces.NewsCategoryService;
import com.csn.charity.service.interfaces.NewsService;

@RestController
@RequestMapping("/api")
public class NewsRestController {
    @Autowired
    private NewsService newsService;
    @Autowired
    private NewsCategoryService newsCategoryService;

    @GetMapping("/news/")
    public List<New> getAllNews() {
        return this.newsService.getAll();
    }

    @GetMapping("/ncategories/")
    public List<NewCategory> getAllCategory() {
        return this.newsCategoryService.getAll();
    }
}
