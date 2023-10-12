import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Nav } from "react-bootstrap";
import { UserContext } from "../../../App";
import { authApi, endpoints } from "../../../configs/ApiConfig";
import { Link } from "react-router-dom";

const Topbar = () => {
  const[user] = useContext(UserContext)
  const [avatar, setAvatar] = useState([])


useEffect(() => {
  const loadUserById = async () => {

    try {
      let res = await authApi().get(endpoints["userId"](user.id))
      setAvatar(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  loadUserById();
}, [])
    

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Social</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search />
          <input
            placeholder="Search for something"
            className="searchInput"
          ></input>
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          {/* <span className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/social/profile`}>
        {user === null  ? (null) : (
          <img src={avatar.profile?.avatar} alt="" className="topbarImg"/>
        )}
        </Link>
        
      </div>
    </div>
  );
};

export default Topbar;
