import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { UserContext } from "../../../App";
import { authApi, endpoints } from "../../../configs/ApiConfig";
import { ListGroup } from "react-bootstrap";
import Chatbox from "../Chat/Chatbox";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <Chatbox />
    </div>
  );
};

export default Rightbar;
