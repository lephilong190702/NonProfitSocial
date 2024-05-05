import React, { useContext, useEffect, useState } from 'react';
import "./feed.css";
import Share from '../share/Share';
import ApiConfig, { endpoints } from '../../../configs/ApiConfig';
import Post from '../post/Post';
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [user] = useContext(UserContext);


  return (
    <div className="feed">
      <div className="feedWrapper">
        {user === null ? (
        <p>
          Vui lòng <Link to={"/login"} className="login-link">đăng nhập</Link> để đăng bài viết{" "}
        </p>) : (
          <Share />
        )}
        {/* <PostTests /> */}
        <Post />
      </div>
    </div>
  );
}

export default Feed;
