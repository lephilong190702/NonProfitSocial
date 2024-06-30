import React, { useRef, useEffect, useState, useContext } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Link, useParams } from "react-router-dom";
import { authApi, endpoints } from "../../configs/ApiConfig";
import { MeetingRoom } from "@material-ui/icons";
import { UserContext } from "../../App";

const RoomPage = () => {
  const { roomId } = useParams();
  const meetingRef = useRef(null);
  const [user] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const [error, setError] = useState(null);

  let url = `/login?next=/livestream/${roomId}`;

  const checkAdminRole = async () => {
    try {
      const response = await authApi().get(endpoints["current-user"]);
      const userId = response.data.id;
      const response2 = await authApi().get(
        endpoints["check-admin-role"](userId)
      );
      console.log(response2);
      if (response2.data === true) {
        setIsAdmin(true);
        const response = await authApi().post(endpoints["send-mail"](roomId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const myMeeting = async () => {
    try {
      const response = await authApi().post(endpoints["join-room"](roomId));
      console.log("Joined chat room:", response.data);

      const appID = 1904762599;
      const serverSecret = "4cced028cabcf7efc2acb456a7174fbb";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        String(response.data.user.id),
        response.data.user.username
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomId,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreamingMode,
        },
      });

      // const res = await authApi().post(endpoints["send-mail"](roomId));
      // console.log("SEND MAIL", res.data);
    } catch (error) {
      console.error("Error joining room:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    myMeeting();
    checkAdminRole();
  }, []);

  return (
    <div className="room-page" style={{ width: '100vw', height: '100vh' }}>
      {user === null ? (
        <div className="form-heading">
          <h1 className="">Live Stream</h1>
          <p>
            Vui lòng{" "}
            <Link to={url} className="login-link">
              đăng nhập
            </Link>{" "}
            để xem trực tuyến các hoạt động tình nguyện{" "}
          </p>
        </div>
      ) : (
        <>
          <div ref={meetingRef} />

        </>
      )}
    </div>
  );
};

export default RoomPage;