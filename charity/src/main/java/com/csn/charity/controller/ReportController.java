package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.csn.charity.model.UserReportPost;
import com.csn.charity.service.interfaces.ReportService;

@Controller
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/admin/reports")
    public String getReport(Model model) {
        model.addAttribute("reports", this.reportService.getReportPost());
        return "pages/reports";
    }

    @GetMapping("/admin/reports/{id}")
    public String detail(Model model, @PathVariable(value = "id") Long id) {
        UserReportPost userReportPost = this.reportService.getById(id);
        model.addAttribute("report", userReportPost);
        return "pages/report";
    }

    @RequestMapping(value = "/admin/resolve/{id}", method = { RequestMethod.GET, RequestMethod.POST })
    public String resolve(@PathVariable(value = "id") Long id) {
        this.reportService.resolvedReport(id);
        return "redirect:/admin/reports";
    }

    @RequestMapping(value = "/admin/skip/{id}", method = { RequestMethod.GET, RequestMethod.POST })
    public String skip(@PathVariable(value = "id") Long id) {
        this.reportService.skipReport(id);
        return "redirect:/admin/reports";
    }
}
