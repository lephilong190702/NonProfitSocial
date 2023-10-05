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
        <div className="topbarLinks">
          {/* <span className="topbarLink">HomePage</span> */}
          <Nav.Link className="topbarLink">HomePage</Nav.Link>
          <span className="topbarLink">Timeline</span>
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
        <img src="/public/gift.png" alt="" className="topbarImg" />
      </div>
    </div>
  );
};

export default Topbar;
