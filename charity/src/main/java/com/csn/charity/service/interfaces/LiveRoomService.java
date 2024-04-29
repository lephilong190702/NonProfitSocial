package com.csn.charity.service.interfaces;

import com.csn.charity.model.LiveRoom;
import com.csn.charity.model.UserJoinRoom;

public interface LiveRoomService {
    LiveRoom createRoom(String roomCode);

    UserJoinRoom joinRoom(String roomCode);

    LiveRoom getLiveRoomByRoomCode(String roomCode);
}
