import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { authApi, endpoints } from "../../configs/ApiConfig";

const LiveStreamPage = () => {
    const [roomName, setRoomName] = useState('')
    const [roomCode, setRoomCode] = useState('')
    const navigate = useNavigate();

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
      };

    const handleRoomCodeChange = (event) => {
        setRoomCode(event.target.value);
      };

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        try {
            let response = await authApi().post(endpoints["create-room"], { name: roomName });
            console.log('Room created:', response.data);
            if (response.status === 201) {
                navigate(`/livestream/${response.data.roomCode}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleJoinRoomSubmit = async (ev) => {
        ev.preventDefault();
        try {
            let response = await authApi().post(endpoints["join-room"](roomCode));
            console.log('Joined room:', response.data);
            if (response.status === 200) {
                navigate(`/livestream/${roomCode}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="home-page">
            <form onSubmit={handleFormSubmit} className="form">
                <div>
                    <label>Enter Room Name</label>
                    <input value={roomName} onChange={handleRoomNameChange} type="text" required placeholder="Enter Room Name" />
                </div>
                <button type="submit">Create Room</button>
            </form>
            <form onSubmit={handleJoinRoomSubmit} className="form">
                <div>
                    <label>Enter Room Code</label>
                    <input value={roomCode} onChange={handleRoomCodeChange} type="text" required placeholder="Enter Room Code" />
                </div>
                <button type="submit">Join Room</button>
            </form>
        </div>
    )
}

export default LiveStreamPage;