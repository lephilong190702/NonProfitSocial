import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../components/social/topbar/Topbar';
import Feed from '../../components/social/feed/Feed';
import Rightbar from '../../components/social/rightbar/Rightbar';
import "./profile.css"
import { UserContext } from '../../App';
import { authApi, endpoints } from '../../configs/ApiConfig';

const Profile = () => {
  const [user] = useContext(UserContext);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const loadUserById = async () => {
  
      try {
        let res = await authApi().get(endpoints["userId"](user.id))
        setProfile(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    loadUserById();
  }, [])

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.profile?.avatar}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profile?.avatar}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{profile.profile?.firstName} {profile.profile?.firstName}</h4>
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