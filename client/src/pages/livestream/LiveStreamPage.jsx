import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../../configs/ApiConfig";
import { Input } from "@material-ui/core";
import './liveStream.css'

const LiveStreamPage = () => {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    try {
      let response = await authApi().post(endpoints["create-room"], {
        name: roomName,
      });
      console.log("Room created:", response.data);
      if (response.status === 201) {
        navigate(`/livestream/${response.data.roomCode}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="live-stream">
      <form onSubmit={handleFormSubmit} className="live-form">
        <div>
          <label>Enter Room Name</label>
          <Input
            value={roomName}
            onChange={handleRoomNameChange}
            type="text"
            required
            placeholder="Enter Room Name"
          />
        </div>
        <hr />
        <button
          className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
          type="submit"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default LiveStreamPage;
