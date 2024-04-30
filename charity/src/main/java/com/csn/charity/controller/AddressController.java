package com.csn.charity.controller;

import com.csn.charity.model.Address;
import com.csn.charity.model.Project;
import com.csn.charity.service.interfaces.ProjectService;
import jakarta.validation.Valid;
import org.apache.commons.math3.analysis.function.Add;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.csn.charity.service.interfaces.AddressService;

import java.util.List;

@Controller
@SessionAttributes("currentPage")
public class AddressController {
    @Autowired
    private AddressService addressService;
    @Autowired
    private ProjectService projectService;
    
    @GetMapping("/addresses")
    public String getAllAddress(Model model) {
        model.addAttribute("currentPage", "addresses");
        model.addAttribute("addresses", this.addressService.getAll());
        return "pages/addresses";
    }

    @GetMapping("/address")
    public String getPendingAddress(Model model) {
        model.addAttribute("address", this.addressService.getPendingAddress());
        return "pages/address";
    }

    @RequestMapping(value = "/admin/accept/{addressId}", method = { RequestMethod.GET, RequestMethod.POST })
    public String approveAddress(@PathVariable Long addressId) {
        addressService.acceptAddress(addressId);
        return "redirect:/address"; 
    }

    @RequestMapping(value = "/admin/deny/{addressId}", method = { RequestMethod.GET, RequestMethod.POST })
    public String denyAddress(@PathVariable Long addressId) {
        addressService.rejectAddress(addressId);
        return "redirect:/address";
    }

    @GetMapping("/admin/address")
    public String addAddress(Model model) {
        Address address = new Address();
        model.addAttribute("address", address);
        List<Project> projects = projectService.getAll();
        model.addAttribute("projects", projects);
        return "pages/address_info";
    }
    @GetMapping("/admin/address/{id}")
    public String update(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("address", addressService.getById(id));
        List<Project> projects = projectService.getAll();
        model.addAttribute("projects", projects);
        return "pages/address_info";
    }

    @PostMapping("/admin/address")
    public String updateAddress(@Valid @ModelAttribute(value = "address") Address address,
                                Model model, @RequestParam(value = "projectId", required = false) Long projectId) {
        Project project = projectService.get(projectId);
        address.setProject(project);
        if (address.getId() == null) {
            addressService.addAddress(address, projectId);
        }
        else {
            addressService.updateById(address.getId(), address);
        }

        return "redirect:/addresses";
    }

//    @PostMapping
}
