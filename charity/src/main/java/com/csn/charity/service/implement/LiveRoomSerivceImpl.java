package com.csn.charity.service.implement;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.csn.charity.model.LiveRoom;
import com.csn.charity.model.User;
import com.csn.charity.model.UserJoinRoom;
import com.csn.charity.repository.LiveRoomRepository;
import com.csn.charity.repository.UserJoinRoomRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.LiveRoomService;
import com.csn.charity.service.interfaces.MailService;

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
    @Autowired
    private MailService mailService;
    
    @Value("$(lephilong02@gmail.com)")
    private String fromEmail;

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
    public void sendMail(LiveRoom liveRoom) {
        List<User> allUsers = userRepository.findAll();
        for (User u : allUsers) {
            try {
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setFrom(fromEmail);
                mailMessage.setTo(u.getEmail());
                mailMessage.setSubject("LIVESTREAM DỰ ÁN TỪ THIỆN: " + liveRoom.getName());
                mailMessage.setText("Phòng livestream đã được tạo, vui lòng tham gia để theo dõi trực tiếp quá trình từ thiện" + "\n" 
                + "Link tham gia: https://nonprofit.southeastasia.cloudapp.azure.com/livestream/" + liveRoom.getRoomCode());
                mailService.sendLivestreamEmail(mailMessage);
            } catch (MailException e) {
                System.out.println("Error sending email: " + e.getMessage());
            }
        }
    }

}
