package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.csn.charity.service.interfaces.DonateService;
import com.csn.charity.service.interfaces.VolunteerService;

@Controller
public class VolunteerController {
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private DonateService donateService;


    @GetMapping("/volunteers")
    public String getVolunteer(Model model) {
        model.addAttribute("volunteers", this.volunteerService.getAll());
        return "pages/volunteers";
    }

    @GetMapping("/contributions")
    public String getContribute(Model model) {
        model.addAttribute("contributions", this.donateService.getAllContribute());
        return "pages/landing_page";
    }

    @GetMapping("/stats")
    public String stats() {
        return "pages/test";
    }

}
