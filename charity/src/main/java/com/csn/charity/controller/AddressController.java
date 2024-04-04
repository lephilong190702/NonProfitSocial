package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.csn.charity.service.interfaces.AddressService;

@Controller
@SessionAttributes("currentPage")
public class AddressController {
    @Autowired
    private AddressService addressService;
    
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

}
