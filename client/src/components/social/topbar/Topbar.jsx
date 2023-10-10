import React from "react";
import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Nav } from "react-bootstrap";

const Topbar = () => {
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
      </div>
    </div>
  );
};

export default Topbar;
