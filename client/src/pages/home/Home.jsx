import { Person } from "@material-ui/icons";
import React from "react";
import Topbar from "../../components/social/topbar/Topbar";
import Sidebar from "../../components/social/sidebar/Sidebar";
import Feed from "../../components/social/feed/Feed";
import Rightbar from "../../components/social/rightbar/Rightbar";
import "./home.css";
import { Header } from "../../components";

const Home = () => {
  return (
    <>
      <Header />
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
