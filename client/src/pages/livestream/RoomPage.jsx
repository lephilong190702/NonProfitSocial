import React, { useRef, useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { authApi, endpoints } from "../../configs/ApiConfig";
import { MeetingRoom } from "@material-ui/icons";

const RoomPage = () => {
  const { roomId } = useParams();
  const meetingRef = useRef(null);

  const [error, setError] = useState(null);

  let url = `/login?next=/livestream/${roomId}`;

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
    } catch (error) {
      console.error("Error joining room:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    myMeeting();
  }, []);

  return (
    <div className="room-page" style={{ width: '100vw', height: '100vh' }}>
      <p>
        Vui lòng{" "}
        <Link to={url} className="login-link">
          đăng nhập
        </Link>{" "}
        để xem trực tuyến các hoạt động tình nguyện{" "}
      </p>
      <div ref={meetingRef} />
    </div>
  );
};

export default RoomPage;