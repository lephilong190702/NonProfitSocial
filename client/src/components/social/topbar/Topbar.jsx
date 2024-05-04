import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Nav } from "react-bootstrap";
import { UserContext } from "../../../App";
import { authApi, endpoints } from "../../../configs/ApiConfig";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Topbar = () => {
  const [user] = useContext(UserContext);
  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    const loadUserById = async () => {
      try {
        let res = await authApi().get(endpoints["userId"](user.id));
        setAvatar(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadUserById();
  }, []);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Social Charity</span>
      </div>
      <div className="topbarCenter">
        <div className="">
          <FontAwesomeIcon
            icon={faSearch}
            color="white"
            size="lg"
            // onClick={() => closeSearchMenu()}
            className="cursor-pointer ml-1"
            fixedWidth
          />
          {/* <input
            placeholder="Search for something"
            className="searchInput"
          ></input> */}
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks"></div>
        <div className="topbarIcons">
          <div className="topbarIconItem ml-1">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
