package com.csn.charity.service.implement;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.LiveRoom;
import com.csn.charity.model.User;
import com.csn.charity.model.UserJoinRoom;
import com.csn.charity.repository.LiveRoomRepository;
import com.csn.charity.repository.UserJoinRoomRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.LiveRoomService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class LiveRoomSerivceImpl implements LiveRoomService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LiveRoomRepository liveRoomRepository;
    @Autowired
    private UserJoinRoomRepository userJoinRoomRepository;

    @Override
    public LiveRoom createRoom(String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Không đủ quyền truy cập!!!");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng!!");
        }

        LiveRoom liveRoom = new LiveRoom();
        liveRoom.setName(name);
        liveRoom.setRoomCode(RandomStringUtils.randomAlphanumeric(9).toLowerCase());
        liveRoom.setCreateDate(new Date());
        liveRoom = liveRoomRepository.save(liveRoom);

        UserJoinRoom userJoinRoom = new UserJoinRoom();
        userJoinRoom.setJoinTime(new Date());
        userJoinRoom.setUser(user);
        userJoinRoom.setRoom(liveRoom);
        userJoinRoomRepository.save(userJoinRoom);

        user.getUserRooms().add(userJoinRoom);
        liveRoom.getUserRooms().add(userJoinRoom);

        liveRoomRepository.save(liveRoom);
        userRepository.save(user);

        return liveRoom;
    }

    @Override
    public UserJoinRoom joinRoom(String roomCode) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Không đủ quyền truy cập!!!");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng!!");
        }

        LiveRoom liveRoom = liveRoomRepository.findByRoomCode(roomCode);

        if (liveRoom == null) {
            throw new IllegalArgumentException("Phòng live không tồn tại!!!");
        }

        List<UserJoinRoom> userJoinRooms = userJoinRoomRepository.findByUserAndRoom(user, liveRoom);
        if (!userJoinRooms.isEmpty()) {
            UserJoinRoom existingUserJoinRoom = userJoinRooms.get(0);
            existingUserJoinRoom.setJoinTime(new Date());
            userJoinRoomRepository.save(existingUserJoinRoom);
            return existingUserJoinRoom;
        }

        UserJoinRoom userJoinRoom = new UserJoinRoom();
        userJoinRoom.setJoinTime(new Date());
        userJoinRoom.setUser(user);
        userJoinRoom.setRoom(liveRoom);
        userJoinRoomRepository.save(userJoinRoom);

        user.getUserRooms().add(userJoinRoom);
        liveRoom.getUserRooms().add(userJoinRoom);

        liveRoomRepository.save(liveRoom);
        userRepository.save(user);

        return userJoinRoom;

    }

    @Override
    public LiveRoom getLiveRoomByRoomCode(String roomCode) {
        LiveRoom liveRoom = liveRoomRepository.findByRoomCode(roomCode);

        if (liveRoom == null) {
            throw new IllegalArgumentException("Phòng live không tồn tại!!!");
        }

        return liveRoom;

    }

    @Override
    public void kickUser(String roomCode, Long userId) {
        LiveRoom liveRoom = liveRoomRepository.findByRoomCode(roomCode);

        if (liveRoom == null) {
            throw new IllegalArgumentException("Phòng live không tồn tại!!!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy user trong phòng live!!!"));

        List<UserJoinRoom> userJoinRooms = userJoinRoomRepository.findByUserAndRoom(user, liveRoom);

        if (userJoinRooms.isEmpty()) {
            throw new NoSuchElementException("Không tìm thấy user trong phòng live!!!");
        }

        UserJoinRoom userJoinRoom = userJoinRooms.get(0);
        userJoinRoomRepository.delete(userJoinRoom);
    }

}
