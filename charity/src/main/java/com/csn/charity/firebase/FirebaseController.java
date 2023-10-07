// package com.csn.charity.firebase;

// import java.util.concurrent.ExecutionException;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.csn.charity.model.User;

// @RestController
// @RequestMapping("/api")
// public class FirebaseController {
//     @Autowired
//     private UserFirebaseService userFirebaseService;

//     @PostMapping("/firebase/")
//     public String saveUser(@RequestBody User user) throws InterruptedException, ExecutionException {
//         return userFirebaseService.saveUser(user);
//     }

//     @GetMapping("/firebase/{username}")
//     public User saveUser(@PathVariable String username) throws InterruptedException, ExecutionException {
//         return userFirebaseService.getUser(username);
//     }

//     @PutMapping("/firebase/")
//     public String updateUser(@RequestBody User user) throws InterruptedException, ExecutionException {
//         return userFirebaseService.updateUser(user);
//     }

//     @DeleteMapping("/firebase/{username}")
//     public String deleteUser(@PathVariable String username) throws InterruptedException, ExecutionException {
//         return userFirebaseService.deleteUser(username);
//     }
// }
