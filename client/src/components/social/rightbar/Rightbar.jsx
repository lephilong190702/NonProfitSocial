import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import Chatbox from "../Chat/Chatbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faExpand,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const Rightbar = () => {
  const [isChatboxExpanded, setIsChatboxExpanded] = useState(true);

  const toggleChatbox = () => {
    setIsChatboxExpanded(!isChatboxExpanded);
  };

  return (
    <div className={`rightbar ${isChatboxExpanded ? "expanded" : "collapsed"}`}>
      {isChatboxExpanded && (
        <>
          <button className="toggle-button" onClick={toggleChatbox}>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
          <Chatbox />
        </>
      )}
      {!isChatboxExpanded && (
        <button className="toggle-button" onClick={toggleChatbox}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
      )}
    </div>
  );
};

export default Rightbar;
