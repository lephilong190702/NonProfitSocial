package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.LiveRoom;
import com.csn.charity.model.User;
import com.csn.charity.model.UserJoinRoom;
import java.util.List;

public interface UserJoinRoomRepository extends JpaRepository<UserJoinRoom, Long>{
    List<UserJoinRoom>findByUserAndRoom(User user, LiveRoom liveRoom);

    List<User> findAllByRoom(LiveRoom liveRoom);

}
