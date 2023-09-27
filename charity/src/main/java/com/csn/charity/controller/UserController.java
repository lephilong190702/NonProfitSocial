package com.csn.charity.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.csn.charity.dto.UserDTO;
import com.csn.charity.model.User;
import com.csn.charity.service.interfaces.UserService;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public String loginSubmit() {
        return "pages/landing_page";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
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
        Optional<User> existingUser = userService.findUserByUsername(userDto.getUsername());

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getUsername() != null && !user.getUsername().isEmpty()) {
                result.rejectValue("username", null,
                        "There is already an account registered with the same username");
            }
        }

        if (result.hasErrors()) {
            model.addAttribute("user", userDto);
            return "/register";
        }

        userService.addUser(userDto);
        return "redirect:/login";
    }

}
