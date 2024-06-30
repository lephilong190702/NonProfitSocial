import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../../configs/ApiConfig";
import { Input } from "@material-ui/core";
import "./liveStream.css";
import { UserContext } from "../../App";
import { Button, Form } from "react-bootstrap";

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
          <div className="container">
            <div className="forms-container1">
              <div className="signin-signup">
                {isAdmin && (
                  <Form onSubmit={handleFormSubmit} className="sign-in-form">
                    <div className="input-field">
                      <input
                        className="loginInput"
                        type="text"
                        value={roomName}
                        onChange={handleRoomNameChange}
                        style={{ width: "100%" }}
                        required
                        placeholder="Nhập tên phòng"
                      />
                    </div>
                    <Form.Group className="mb-3">
                      <Button type="submit" className="btn solid">
                        Tạo phòng livestream
                      </Button>
                    </Form.Group>
                  </Form>
                )}

                {!isAdmin && (
                  <Form onSubmit={handleFormSubmit} className="sign-in-form">
                    <div className="input-field">
                      <input
                        className="loginInput"
                        type="text"
                        value={roomName}
                        onChange={(event) => setRoomCode(event.target.value)}
                        style={{ width: "100%" }}
                        required
                        placeholder="Nhập mã phòng"
                      />
                    </div>
                    <Form.Group className="mb-3">
                      <Button onClick={() => handleJoinRoom(roomCode)} className="btn solid">
                        Tham gia
                      </Button>
                    </Form.Group>
                  </Form>
                )}
              </div>
            </div>


            <div className="panels-container">
              <div className="panel left-panel">
                <div className="content">
                  <h3>Bạn muốn xem trực tiếp từ thiện?</h3>
                  <p>
                    Nhấn tham gia phòng để có thể xem phát sóng trực tiếp quá trình từ thiện của chúng tôi.
                  </p>
                </div>
                <img src="./src/assets/livestream.png" className="image" alt="" />
              </div>
            </div>
          </div>


        </>
      )}
    </div>
  );
};

export default LiveStreamPage;
