package com.csn.charity.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.dto.StatDTO;
import com.csn.charity.service.interfaces.AddressService;
import com.csn.charity.service.interfaces.NewsCategoryService;
import com.csn.charity.service.interfaces.NewsService;
import com.csn.charity.service.interfaces.ProjectCategoryService;
import com.csn.charity.service.interfaces.ProjectService;
import com.csn.charity.service.interfaces.SkillService;
import com.csn.charity.service.interfaces.StatService;
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

    @Autowired
    private SkillService skillService;

    @Autowired
    private StatService statService;

    @Autowired
    private AddressService addressService;

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

    @DeleteMapping("/admin/skill/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSkill(@PathVariable(value = "id") Long id) {
        this.skillService.delete(id);
    }

    @DeleteMapping("/admin/address/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAddress(@PathVariable(value = "id") Long id) {
        this.addressService.deleteById(id);
    }

    @GetMapping("/admin/month")
    public List<StatDTO> getYearlyDonations(@RequestParam("year") int year) {
        return statService.getTotalDonationByMonth(year);
    }

    @GetMapping("/admin/quarter")
    public List<StatDTO> getQuarterlyDonations(@RequestParam("year") int year) {
        return statService.getTotalDonationByQuarter(year);
    }

    @GetMapping("/admin/year")
    public List<StatDTO> getYearlyDonations() {
        return statService.getTotalDonationByYear();
    }

}
