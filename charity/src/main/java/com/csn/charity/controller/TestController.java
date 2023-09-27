// package com.csn.charity.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.csn.charity.configs.JwtService;
// import com.csn.charity.dto.AuthRequest;
// import com.csn.charity.dto.UserDTO;
// import com.csn.charity.model.User;
// import com.csn.charity.service.interfaces.UserService;

// @RestController
// @RequestMapping("/auth")
// public class TestController {
//     @Autowired
//     private UserService service;

//     @Autowired
//     private JwtService jwtService;

//     @Autowired
//     private AuthenticationManager authenticationManager;

//     @GetMapping("/welcome")
//     public String welcome() {
//         return "Welcome this endpoint is not secure";
//     }

//     @PostMapping("/addNewUser")
//     @CrossOrigin
//     public ResponseEntity<String> addNewUser(@RequestBody UserDTO userDto) {
//         String result = this.service.addUser(userDto);
//         if (result != null)
//             return new ResponseEntity<>(result, HttpStatus.CREATED);
//         else
//             return new ResponseEntity<>("Failed to add new user", HttpStatus.BAD_REQUEST);

//     }

//     @GetMapping("/user/userProfile")
//     public String userProfile() {
//         return "Welcome to User Profile";
//     }

//     @GetMapping("/admin/adminProfile")
//     public String adminProfile() {
//         return "Welcome to Admin Profile";
//     }

//     @PostMapping("/generateToken")
//     @CrossOrigin
//     public ResponseEntity<String> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
//         Authentication authentication = authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
//         if (authentication.isAuthenticated()) {
//             String token = this.jwtService.generateToken(authRequest.getUsername());
//             return new ResponseEntity<>(token, HttpStatus.OK);
//         }
//         return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
//     }
// }
