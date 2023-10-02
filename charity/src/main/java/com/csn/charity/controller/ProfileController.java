package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.csn.charity.dto.ProfileDTO;
import com.csn.charity.model.Profile;
import com.csn.charity.model.User;
import com.csn.charity.service.interfaces.ProfileService;
import com.csn.charity.service.interfaces.UserService;

@Controller
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private UserService userService;

    @GetMapping("/admin/profile/{username}")
    public String viewPage(@PathVariable(value = "username") String username, Model model) {
        User user = userService.findUserByUsername(username);
        Profile profile = user.getProfile();
        model.addAttribute("profiles", profile);
        return "pages/profile";
    }

    @GetMapping("/admin/edit-profile/{username}")
    public String update(Model model, @PathVariable(value = "username") String username) {
        User user = userService.findUserByUsername(username);
        Profile profile = user.getProfile();
        model.addAttribute("profile", profile);
        return "pages/editprofile";
    }

//    @PostMapping("/admin/edit-profile/{username}")
//    public String updateProfile(@ModelAttribute(value = "profile") ProfileDTO profileDTO, @PathVariable(value = "username") String username) {
//        profileService.update(profileDTO);
//        return "redirect:/admin/profile/" + username;
//    }
}
