import { Person } from "@material-ui/icons";
import React, { useState } from "react";
import Topbar from "../../../components/social/topbar/Topbar";
import Feed from "../../../components/social/feed/Feed";
import Rightbar from "../../../components/social/rightbar/Rightbar";
import "./home.css";
import { Header } from "../../../components";

const Home = () => {
  // const [kw, setKw] = useState("");
  return (
    <>  
      <Topbar />
      <div className="homeContainer">
        
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
