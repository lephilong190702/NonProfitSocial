package com.csn.charity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.csn.charity.model.New;
import com.csn.charity.model.NewCategory;
import com.csn.charity.service.interfaces.NewsCategoryService;
import com.csn.charity.service.interfaces.NewsService;

@Controller
public class NewsController {
    @Autowired
    private NewsService newsService;

    @Autowired
    private NewsCategoryService newsCategoryService;

    @GetMapping("/news")
    public String index(Model model) {
        model.addAttribute("news", this.newsService.getAll());
        return "pages/news";
    }

    @GetMapping("/admin/new")
    public String addPage(Model model) {
        New n = new New();
        model.addAttribute("anew", n);
        List<NewCategory> nCategories = newsCategoryService.getAll();
        model.addAttribute("ncategories", nCategories);
        return "pages/new";
    }

    @GetMapping("/admin/new/{id}")
    public String update(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("anew", this.newsService.get(id));
        List<NewCategory> nCategories = newsCategoryService.getAll();
        model.addAttribute("ncategories", nCategories);
        return "pages/new";
    }

    @PostMapping("/admin/new")
    public String addOrUpdate(@ModelAttribute(value = "anew") New anew,
            @RequestParam(value = "categoryId", required = false) Long categoryId) {
        System.out.println("category: " + categoryId);

        NewCategory newCategory = this.newsCategoryService.get(categoryId);
        anew.setCategory(newCategory);

        if(anew.getId() == null)
            newsService.add(anew);
        else 
            newsService.update(anew.getId(), anew);
        
        return "redirect:/news";
    }
}
