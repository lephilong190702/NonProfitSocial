package com.csn.charity.controller;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.csn.charity.model.New;
import com.csn.charity.model.NewCategory;
import com.csn.charity.service.interfaces.NewsCategoryService;
import com.csn.charity.service.interfaces.NewsService;

@Controller
@SessionAttributes("currentPage")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @Autowired
    private NewsCategoryService newsCategoryService;

    @GetMapping("/news")
    public String index(Model model) {
        model.addAttribute("currentPage", "news");
        model.addAttribute("news", this.newsService.getAll());
        return "pages/news";
    }

    @GetMapping("/news/search")
    public String search(@RequestParam("kw") String kw, Model model) {
        if (kw != null && !kw.isEmpty()) {
            List<New> news = newsService.findByName(kw);
            model.addAttribute("news", news);
        }
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
    @Transactional
    public String addOrUpdate(@Valid @ModelAttribute(value = "anew") New anew, BindingResult bindingResult, Model model,
            @RequestParam(value = "categoryId", required = false) Long categoryId) {
        if (bindingResult.hasErrors())
        {
            List<NewCategory> nCategories = newsCategoryService.getAll();

             model.addAttribute("ncategories", nCategories);

            return "pages/new";
        }
                
        System.out.println("category: " + categoryId);

        NewCategory newCategory = this.newsCategoryService.get(categoryId);
        anew.setCategory(newCategory);

        if (anew.getId() == null)
            newsService.add(anew);
        else
            newsService.update(anew.getId(), anew);

        return "redirect:/news";
    }
}
