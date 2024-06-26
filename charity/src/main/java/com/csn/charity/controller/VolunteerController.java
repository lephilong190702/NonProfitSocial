package com.csn.charity.controller;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.csn.charity.model.User;
import com.csn.charity.model.UserContributeProject;
import com.csn.charity.service.interfaces.DonateService;
import com.csn.charity.service.interfaces.MailService;
import com.csn.charity.service.interfaces.StatService;
import com.csn.charity.service.interfaces.UserService;
import com.csn.charity.service.interfaces.VolunteerService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class VolunteerController {
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private DonateService donateService;
    @Autowired
    private StatService statService;
    @Autowired
    private UserService userService;
    @Autowired
    private MailService mailService;
    @Value("$(lephilong02@gmail.com)")
    private String fromEmail;

    @GetMapping("/admin/volunteers")
    public String getVolunteer(Model model) {
        model.addAttribute("volunteers", this.volunteerService.getPendingVolunteer());
        return "pages/volunteers";
    }

    @GetMapping("/admin/contributions")
    public String getContribute(Model model) {
        List<UserContributeProject> contributions = this.donateService.getAllContribute();
        List<UserContributeProject> sortedContributions = contributions.stream()
                .sorted(Comparator.comparing(UserContributeProject::getDonateDate).reversed())
                .collect(Collectors.toList());
        model.addAttribute("contributions", sortedContributions);
        return "pages/landing_page";
    }

    @GetMapping("/admin/payment-contributions")
    public String getPaymentContribution(Model model) {
        Long category = 1L;
        List<UserContributeProject> contributions = this.donateService.getContributionByCategory(category);
        List<UserContributeProject> sortedContributions = contributions.stream()
                .sorted(Comparator.comparing(UserContributeProject::getDonateDate).reversed())
                .collect(Collectors.toList());
        model.addAttribute("payment", sortedContributions);
        model.addAttribute("monthlyMonthsWithData", this.statService.getMonthlyWithData());
        System.out.println("MONTH" + this.statService.getMonthlyWithData());
        model.addAttribute("quarterlyQuartersWithData", this.statService.getQuarterlyWithData());
        System.out.println("MONTH" + this.statService.getQuarterlyWithData());
        model.addAttribute("yearlyYearsWithData", this.statService.getYearlyWithData());
        System.out.println("MONTH" + this.statService.getYearlyWithData());
        return "pages/payment_contributions";
    }

    @GetMapping("/admin/item-contributions")
    public String getItemContribution(Model model) {
        model.addAttribute("items", this.donateService.getContributionItemsByStatus());
        model.addAttribute("monthlyMonthsWithData", this.statService.getMonthlyWithData());
        System.out.println("MONTH" + this.statService.getMonthlyWithData());
        model.addAttribute("quarterlyQuartersWithData", this.statService.getQuarterlyWithData());
        System.out.println("MONTH" + this.statService.getQuarterlyWithData());
        model.addAttribute("yearlyYearsWithData", this.statService.getYearlyWithData());
        System.out.println("MONTH" + this.statService.getYearlyWithData());
        return "pages/item_contributions";
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

    @GetMapping("/admin/pending-transport")
    public String getPendingTransport(Model model) {
        model.addAttribute("transport", this.donateService.getContributionByStatus());
        model.addAttribute("shippers", this.userService.getAllShipper());
        return "pages/pending_transport";
    }

    @GetMapping("/admin/transport")
    public String getTransport(Model model) {
        model.addAttribute("transport", this.donateService.getTransportByStatus());
        model.addAttribute("shippers", this.userService.getAllShipper());
        return "pages/transport";
    }

    @PostMapping("/admin/pending-transport/{transportId}/shipper/{shipperId}")
    public String setPendingShipper(@PathVariable(value = "transportId") Long transportId,
            @PathVariable(value = "shipperId") Long shipperId) {
        this.donateService.updateTransport(transportId, shipperId);
        User user = this.userService.get(shipperId);
        UserContributeProject userContributeProject = this.donateService.getContributionById(transportId);
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("VẬN CHUYỂN ĐƠN QUYÊN GÓP HIỆN VẬT!");
            mailMessage.setText("Mã đơn vận chuyển: " + userContributeProject.getId() + "\n" +
                    "Người quyên góp: " + userContributeProject.getUser().getProfile().getFirstName() + "\n" +
                    "Địa chỉ: " + userContributeProject.getAddress() + "\n" +
                    "Số điện thoại: " + userContributeProject.getUser().getProfile().getPhone());
            mailService.sendDonateItemEmail(mailMessage);
        } catch (MailException e) {
            System.out.println("Error sending email: " + e.getMessage());
        }
        return "redirect:/admin/pending-transport";
    }

    @PostMapping("/admin/transport/{transportId}/shipper/{shipperId}")
    public String setShipper(@PathVariable(value = "transportId") Long transportId,
            @PathVariable(value = "shipperId") Long shipperId) {
        this.donateService.updateTransport(transportId, shipperId);
        UserContributeProject userContributeProject = this.donateService.getContributionById(transportId);

        User user = this.userService.get(shipperId);
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("VẬN CHUYỂN ĐƠN QUYÊN GÓP HIỆN VẬT!");
            mailMessage.setText("Vui lòng liên lạc người quyên góp để nhận hàng" + "\n" +
                    "Mã đơn vận chuyển: " + userContributeProject.getId() + "\n" +
                    "Người quyên góp: " + userContributeProject.getUser().getProfile().getFirstName() + "\n" +
                    "Địa chỉ: " + userContributeProject.getAddress() + "\n" +
                    "Số điện thoại: " + userContributeProject.getUser().getProfile().getPhone());
            mailService.sendDonateItemEmail(mailMessage);
        } catch (MailException e) {
            System.out.println("Error sending email: " + e.getMessage());
        }
        return "redirect:/admin/transport";
    }
}
