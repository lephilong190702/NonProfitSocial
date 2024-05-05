import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import ApiConfig, { endpoints } from "../../../configs/ApiConfig";
import Post from "../post/Post";
import { UserContext } from "../../../App";
import { Link, useSearchParams } from "react-router-dom";
import SearchPost from "../../../pages/search/SearchPost";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [user] = useContext(UserContext);
  const [kw, setKw] = useState(false);

  const [post, setPost] = useState([]);

  const [q] = useSearchParams();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let p = endpoints.post;
        console.log(q);

        const kw = q.get("kw");
        if (kw !== null) {
          p = `${p}search?kw=${kw}`;
          console.log(p);
          setKw(true);
        } else setKw(false);


        const response = await ApiConfig.get(p);
        setPosts(response.data);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();
  }, [q]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {user === null ? (
          <p>
            Vui lòng{" "}
            <Link to={"/login"} className="login-link">
              đăng nhập
            </Link>{" "}
            để đăng bài viết{" "}
          </p>
        ) : (
          <Share />
        )}
        {/* <PostTests /> */}
        <Post />
      </div>
    </div>
  );
};

export default Feed;
