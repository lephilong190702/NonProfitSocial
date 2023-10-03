package com.csn.charity.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.csn.charity.model.NewCategory;
import com.csn.charity.model.ProjectCategory;
import com.csn.charity.service.interfaces.NewsCategoryService;
import com.csn.charity.service.interfaces.NewsService;

@Controller
public class NewsCategoryController {
    @Autowired
    private NewsCategoryService newsCategoryService;
    @Autowired
    private NewsService newsService;

    @GetMapping("/ncategories")
    public String listProjectCategories(Model model) {
        List<NewCategory> newCategories = this.newsCategoryService.getAll();
        Map<Long, Long> count = newCategories.stream()
                .collect(Collectors.toMap(NewCategory::getId,
                        category -> newsService.countNewsByCategory(category.getId())));
        System.out.println("COUNT" + count);
        model.addAttribute("count", count);
        model.addAttribute("ncategories", newCategories);
        return "pages/ncategories";
    }

    @GetMapping("/admin/ncategory")
    public String addPage(Model model) {
        NewCategory newCategory = new NewCategory();
        model.addAttribute("ncategory", newCategory);
        return "pages/ncategory";
    }

    @GetMapping("/admin/ncategory/{id}")
    public String update(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("ncategory", this.newsCategoryService.get(id));
        return "pages/ncategory";
    }

    @PostMapping("/admin/ncategory")
    public String add(@ModelAttribute(value = "ncategory") NewCategory newCategory) {
        if (newCategory.getId() == null)
            newsCategoryService.add(newCategory);
        else
            newsCategoryService.update(newCategory.getId(), newCategory);

        return "redirect:/ncategories";
    }
}
