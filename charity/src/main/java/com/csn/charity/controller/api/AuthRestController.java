package com.csn.charity.controller.api;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.csn.charity.configs.JwtService;
import com.csn.charity.dto.AuthRequest;
import com.csn.charity.dto.ProfileDTO;
import com.csn.charity.dto.UserDTO;
import com.csn.charity.model.User;
import com.csn.charity.service.interfaces.ProfileService;
import com.csn.charity.service.interfaces.UserService;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/register/")
    @CrossOrigin
    public ResponseEntity<String> addNewUser(@RequestBody UserDTO userDto) {
        String result = this.userService.addUser(userDto);
        if (result != null)
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        else
            return new ResponseEntity<>("Failed to add new user", HttpStatus.BAD_REQUEST);

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

    @PostMapping(path = "/profile/",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<String> updateProfile(@RequestParam Map<String, String> params, @RequestPart MultipartFile avatar) {
        this.profileService.update(params, avatar);
        return ResponseEntity.ok("Hồ sơ đã được cập nhật thành công.");
    }

    @GetMapping("/user/userProfile/")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @GetMapping("/admin/adminProfile")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }
}
