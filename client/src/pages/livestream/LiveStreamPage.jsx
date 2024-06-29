import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../../configs/ApiConfig";
import { Input } from "@material-ui/core";
import "./liveStream.css";
import { UserContext } from "../../App";

const LiveStreamPage = () => {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState(""); // add a new state for room code
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // add a new state to store admin role
  const [user] = useContext(UserContext);

  // assume you have a function to check if the user is an admin
  const checkAdminRole = async () => {
    try {
      const response = await authApi().get(endpoints["current-user"]);
      const userId = response.data.id; // get the user ID from the current user data
      const response2 = await authApi().get(
        endpoints["check-admin-role"](userId)
      );
      console.log(response2);
      if (response2.data === true) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // call the checkAdminRole function when the component mounts
  React.useEffect(() => {
    checkAdminRole();
  }, []);

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

  const handleJoinRoom = async (roomCode) => {
    try {
      const api = authApi();
      const url = endpoints["join-room"](roomCode);
      const response = await api.post(url, {});
      navigate(`/livestream/${roomCode}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="live-stream">
      {user === null ? (
        <div className="form-heading">
          <h1 className="">Live Stream</h1>
          <p>
            Vui lòng{" "}
            <Link to={"/login?next=/livestream"} className="login-link">
              đăng nhập
            </Link>{" "}
            để xem trực tuyến các hoạt động tình nguyện{" "}
          </p>
        </div>
      ) : (
        <>
          {isAdmin && ( // render the create room button only if the user is an admin
            <form onSubmit={handleFormSubmit} className="live-form">
              <div>
                <label>NHẬP TÊN PHÒNG</label>
                <Input
                  value={roomName}
                  onChange={handleRoomNameChange}
                  type="text"
                  required
                  placeholder="Nhập tên phòng"
                />
              </div>
              <hr />
              <button
                className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
                type="submit"
              >
                Tạo phòng
              </button>
            </form>
          )}
          {!isAdmin && (
            <div style={{ marginLeft: "100px" }}>
              <label
                style={{ fontWeight: "bold", fontSize: "13px", margin: "10px" }}
              >
                NHẬP MÃ PHÒNG
              </label>
              <Input
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value)}
                type="text"
                required
                placeholder="Nhập mã phòng"
              />
              <button
                className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
                onClick={() => handleJoinRoom(roomCode)}
              >
                Tham gia
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LiveStreamPage;
