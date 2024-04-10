package com.csn.charity.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.LiveRoom;
import com.csn.charity.model.User;
import com.csn.charity.model.UserJoinRoom;
import com.csn.charity.service.interfaces.LiveRoomService;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LiveStreamRestController {
    @Autowired
    private LiveRoomService liveRoomService;

    @PostMapping("/create-room/")
    @CrossOrigin
    public ResponseEntity<?> createRoom(@RequestBody LiveRoom liveRoom) {
        try {
            LiveRoom room = this.liveRoomService.createRoom(liveRoom.getName());
            return new ResponseEntity<>(room, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/rooms/{roomCode}/join/")
    @CrossOrigin
    public ResponseEntity<?> joinRoom(@PathVariable String roomCode) {
        try {
            UserJoinRoom uJoinRoom = this.liveRoomService.joinRoom(roomCode);
            return new ResponseEntity<>(uJoinRoom, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/rooms/{roomCode}")
    @CrossOrigin
    public ResponseEntity<?> getRoomByCode(@PathVariable String roomCode) {
        try {
            LiveRoom liveRoom = this.liveRoomService.getLiveRoomByRoomCode(roomCode);
            return new ResponseEntity<>(liveRoom, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/rooms/{roomCode}/kick/{userId}")
    @CrossOrigin
    public ResponseEntity<?> kickUser(@PathVariable String roomCode, @PathVariable Long userId) {
        try {
            this.liveRoomService.kickUser(roomCode, userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
