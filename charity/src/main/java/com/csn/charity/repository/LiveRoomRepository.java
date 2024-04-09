package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.LiveRoom;
import java.util.List;


public interface LiveRoomRepository extends JpaRepository<LiveRoom, Long> {
    LiveRoom findByRoomCode(String roomCode);
}
