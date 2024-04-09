package com.csn.charity.service.interfaces;

import com.csn.charity.model.LiveRoom;
import com.csn.charity.model.User;
import com.csn.charity.model.UserJoinRoom;
import java.util.List;

public interface LiveRoomService {
    LiveRoom createRoom(String roomCode);

    UserJoinRoom joinRoom(String roomCode);

    LiveRoom getLiveRoomByRoomCode(String roomCode);

    List<User> getAllUserOfRoom(String roomCode);
}
