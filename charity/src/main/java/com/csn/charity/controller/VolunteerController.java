package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.csn.charity.service.interfaces.VolunteerService;

@Controller
public class VolunteerController {
    @Autowired
    private VolunteerService volunteerService;

    @GetMapping("/volunteers")
    public String getVolunteer(Model model) {
        model.addAttribute("volunteers", this.volunteerService.getAll());
        return "pages/volunteers";
    }
}
