package com.csn.charity.firebase;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.MessageDoc;
import com.csn.charity.model.UserDoc;

@RestController
@RequestMapping("/api")
public class FirebaseController {
    @Autowired
    private FirebaseService firebaseService;

    @GetMapping("/chat/{userId}")
    public UserDoc getUser(@PathVariable String userId) throws InterruptedException, ExecutionException {
        return this.firebaseService.getUser(userId);
    }

    @PostMapping("/chat/{userId}")
    @CrossOrigin
    public String sendMessage(@RequestBody MessageDoc messageDoc, @PathVariable Long userId) throws InterruptedException, ExecutionException {
        return this.firebaseService.sendMessage(messageDoc, userId);
    }
}
