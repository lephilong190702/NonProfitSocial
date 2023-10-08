package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.csn.charity.dto.UserDTO;
import com.csn.charity.model.User;
import com.csn.charity.service.interfaces.DonateService;
import com.csn.charity.service.interfaces.UserService;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private DonateService donateService;

    @GetMapping("/")
    public String getContribute(Model model) {
        model.addAttribute("contributions", this.donateService.getAllContribute());
        return "pages/landing_page";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/users")
    public String getUser(Model model) {
        model.addAttribute("users", this.userService.findAllUsers());
        return "pages/users";
    }

    @GetMapping("/admin/user/{id}")
    public String details(@PathVariable(value = "id") Long id) {
        this.userService.get(id);
        return "pages/users";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        UserDTO user = new UserDTO();
        model.addAttribute("user", user);
        return "register";
    }

    @PostMapping("/register")
    public String registration(@Validated @ModelAttribute("user") UserDTO userDto,
            BindingResult result,
            Model model) {
        User existingUser = userService.findUserByUsername(userDto.getUsername());

        if (existingUser != null) {
            if (existingUser.getUsername() != null && !existingUser.getUsername().isEmpty()) {
                result.rejectValue("username", null,
                        "Tên tài khoản đã tồn tại");
            }
        }

        if (result.hasErrors()) {
            model.addAttribute("user", userDto);
            return "/register";
        }

        userService.addUser(userDto);
        return "redirect:/login";
    }

    @PostMapping("/admin/active/{id}")
    public String activateAccount(@PathVariable(value = "id") Long id) {
        this.userService.activateAccount(id);
        return "redirect:/users";
    }

    @PostMapping("/admin/disable/{id}")
    public String disableAccount(@PathVariable(value = "id") Long id) {
        this.userService.disableAccount(id);
        return "redirect:/users";
    }

}
