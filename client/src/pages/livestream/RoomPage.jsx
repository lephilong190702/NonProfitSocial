import React, { useRef, useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { authApi, endpoints } from "../../configs/ApiConfig";
import { MeetingRoom } from "@material-ui/icons";

const RoomPage = () => {
    const { roomId } = useParams();
    const [users, setUsers] = useState([]);

    const myMeeting = async (element) => {
        try {
            const response = await authApi().post(endpoints["join-room"](roomId));
            console.log("Joined chat room:", response.data);

            const appID = 439406758;
            const serverSecret = "b842dda547baa838f621b89f16df73d9";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                response.data.user.username
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Personal link',
                        url:
                            window.location.protocol + '//' +
                            window.location.host + window.location.pathname +
                            '?roomID=' +
                            roomId,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.LiveStreamingMode,
                },
                onRoomUserListDidUpdate: (users) => {
                    setUsers(users);
                },
            });

        } catch (error) {
            console.error("Error:", error.message);
        }

        kickUser();
    };

    const kickUser = (userId) => {
        if (zp && roomId) {
            const room = zp.getRoom(roomId);
            if (room) {
                room.kickUser(userId);
            }
        }
    }

    return (
        <div className="room-page">
            <div ref={myMeeting} />
            <ul>
                {users.map((user) => (
                    <li key={user.userId}>
                        {user.userName}
                        <button onClick={() => kickUser(user.userId)}>Kick</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomPage;