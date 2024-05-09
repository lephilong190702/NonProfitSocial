package com.csn.charity.controller;

import com.csn.charity.service.interfaces.UserRoleService;
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

    @Autowired
    private UserRoleService userRoleService;

    @GetMapping("/")
    public String getContribute(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean hasAdminRole = auth != null && auth.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_SUPERADMIN"));
        model.addAttribute("hasAdminRole", hasAdminRole);
        model.addAttribute("contributions", this.donateService.getAllContribute());
        return "pages/landing_page";
    }

    @GetMapping("/admin/login")
    public String login() {
        return "login";
    }

    @GetMapping("/users")
    public String getUser(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean hasAdminRole = auth != null && auth.getAuthorities().stream()
                        .anyMatch(role -> role.getAuthority().equals("ROLE_SUPERADMIN"));
        model.addAttribute("users", this.userService.findAllUsers());
        model.addAttribute("userRoles", this.userRoleService.findAllUserRoles());
        model.addAttribute("hasAdminRole", hasAdminRole);
        return "pages/users";
    }

    @GetMapping("/userRole")
    public String getUserRole(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean hasAdminRole = auth != null && auth.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_SUPERADMIN"));
        model.addAttribute("users", this.userService.findAllUsers());
        model.addAttribute("userRoles", this.userRoleService.findAllUserRoles());
        model.addAttribute("hasAdminRole", hasAdminRole);
        return "pages/userRole";
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

    @PostMapping("/admin/user/{userId}/role/{roleId}")
    public String setRoleAccount(@PathVariable(value = "userId") Long userId,
                                 @PathVariable(value = "roleId") Long roleId) {
        this.userService.updateUserRole(userId, roleId);
        return "redirect:/userRole";
    }

}
