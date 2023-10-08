package com.csn.charity.controller.api;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.csn.charity.configs.JwtService;
import com.csn.charity.dto.AuthRequest;
import com.csn.charity.dto.ProfileDTO;
import com.csn.charity.dto.UserDTO;
import com.csn.charity.firebase.UserFirebaseService;
import com.csn.charity.model.User;
import com.csn.charity.service.interfaces.ProfileService;
import com.csn.charity.service.interfaces.UserService;

@RestController
@RequestMapping("/api")
public class AuthRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserFirebaseService userFirebaseService;

    @PostMapping("/register/")
    @CrossOrigin
    public ResponseEntity<String> addNewUser(@RequestBody UserDTO userDto) {
        try {
            this.userFirebaseService.saveUser(userDto);
            String result = this.userService.addUser(userDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            String errorMessage = "Failed to add new user: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login/")
    @CrossOrigin
    public ResponseEntity<String> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = this.jwtService.generateToken(authRequest.getUsername());
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/current-user/")
    @CrossOrigin
    public ResponseEntity<User> getUser(Principal user) {
        User u = this.userService.findUserByUsername(user.getName());
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @PutMapping("/profile/")
    @CrossOrigin
    public ResponseEntity<String> updateProfile(@RequestPart(value = "avatar") MultipartFile avatar,
            @RequestPart(value = "firstName") String firstName,
            @RequestPart(value = "lastName") String lastName,
            @RequestPart(value = "phone") String phone) {

        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setFirstName(firstName);
        profileDTO.setLastName(lastName);
        profileDTO.setPhone(phone);
        profileDTO.setFile(avatar);
        this.profileService.update(profileDTO);
        return ResponseEntity.ok("Hồ sơ đã được cập nhật thành công.");
    }

    @GetMapping("/user/userProfile")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @GetMapping("/admin/adminProfile")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }
}