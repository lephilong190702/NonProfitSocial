import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import "./online.css";
import { authApi, endpoints } from "../../../configs/ApiConfig";
import Chatbox from "../Chatbox";

const Online = () => {
  const [user] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await authApi().get(endpoints["user"]);
        setUsers(response.data);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    const loadUserId = async (evt) => {
      evt.preventDefault();
      console.log(userId.id, userId.username)

      try {
        const res = await authApi().get(endpoints["userId"]);
        setUserId(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadUserId();
    loadUsers();
  }, []);

  const handleUserClick = (selectedUserId) => {
    setUserId(selectedUserId);
    setSelectedUser(selectedUserId);
  };

  return (
    <div>
      <div className="user-list">
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`rightbarFriend ${
                selectedUser === user.id ? "selected" : ""
              }`}
              onClick={() => handleUserClick(user.id)}
            >
              <div className="rightbarProfileImgContainer">
                <img
                  className="rightbarProfileImg"
                  src={user.profile.avatar}
                  alt=""
                />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
      <Chatbox userId={userId} />
    </div>
  );
};

export default Online;
