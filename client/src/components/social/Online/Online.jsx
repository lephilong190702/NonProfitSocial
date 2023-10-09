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

    const loadUserId = async () => {

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
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={`rightbarFriend ${userId === user.id ? 'active' : ''}`}
            onClick={() => handleUserClick(user.id)}
          >
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src={user.profile.avatar} alt="" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
          </li>
        ))}
      </ul>
  
      {userId && <Chatbox userId={userId} />} {/* Truyền userId vào Chatbox */}
    </div>
  );
};

export default Online;
