import React from 'react'
import "./profile.css";
import Sidebar from "../../components/social/sidebar/Sidebar";
import Feed from "../../components/social/feed/Feed";
import Rightbar from "../../components/socialrightbar/Rightbar";
import Topbar from '../../components/social/topbar/Topbar';

const Profile = () => {
    return (
        <>
          <Topbar />
          <div className="profile">
            <Sidebar />
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src="/public/gift.png"
                    alt=""
                  />
                  <img
                    className="profileUserImg"
                    src="/public/gift.png"
                    alt=""
                  />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">Safak Kocaoglu</h4>
                    <span className="profileInfoDesc">Hello my friends!</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed />
                <Rightbar profile/>
              </div>
            </div>
          </div>
        </>
      );
}

export default Profile