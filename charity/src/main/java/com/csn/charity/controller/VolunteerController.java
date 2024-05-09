package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.csn.charity.service.interfaces.DonateService;
import com.csn.charity.service.interfaces.VolunteerService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class VolunteerController {
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private DonateService donateService;


    @GetMapping("/admin/volunteers")
    public String getVolunteer(Model model) {
        model.addAttribute("volunteers", this.volunteerService.getPendingVolunteer());
        return "pages/volunteers";
    }

    @GetMapping("/admin/contributions")
    public String getContribute(Model model) {
        model.addAttribute("contributions", this.donateService.getAllContribute());
        return "pages/landing_page";
    }

    @GetMapping("/admin/export")
    public String getContribution(Model model) {
        model.addAttribute("contributions", this.donateService.getAllContribute());
        return "pages/exportexcel";
    }

    @GetMapping("/admin/stats")
    public String stats() {
        return "pages/test";
    }

    @RequestMapping(value = "/admin/accept/volunteer/{volunteerId}", method = { RequestMethod.GET, RequestMethod.POST })
    public String approveAddress(@PathVariable Long volunteerId) {
        volunteerService.acceptVolunteer(volunteerId);
        return "redirect:/admin/volunteers";
    }

}
