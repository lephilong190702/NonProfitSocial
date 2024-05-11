import React, { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../../../configs/ApiConfig";
import moment from "moment";
import { Button, Dropdown } from "react-bootstrap";
import { UserContext } from "../../../App";

const AcceptPost = () => {
  const [post, setPost] = useState([]);
  const [user] = useContext(UserContext);
  const [approvedPosts, setApprovedPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const activePost = async (postId) => {
    try {
      const res = await authApi().patch(endpoints["active-post"](postId));
      setPost(post.filter((p) => p.id !== postId));

      setApprovedPosts([...approvedPosts, postId]);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await authApi().delete(endpoints["delete-post"](postId));
      setPost(post.filter((p) => p.id !== postId));

      setApprovedPosts([...approvedPosts, postId]);
    } catch (error) {
      console.log(error);
    }
  }

  const loadTagsByPost = async (postId) => {
    try {
      const { data } = await ApiConfig.get(
        endpoints["post-tags"](postId)
      );
      setTags((prevTags) => ({
        ...prevTags,
        [postId]: data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let res = await authApi().get(endpoints["private-posts"]);
        setPost(res.data);
        console.log("POST" + res.data);
        res.data.forEach((p) => loadTagsByPost(p.id));

      } catch (error) {
        console.log(error);
      }
    };

    loadPosts();
  }, []);
  return (
    <>
      {post
        .filter((p) => !approvedPosts.includes(p.id))
        .slice()
        .reverse()
        .map((p) => (
          <div className="post w-50" key={p.id} style={{ margin: '0 auto', marginBottom: '30px' }}>
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  <img
                    className="postProfileImg"
                    src={p.user.profile.avatar}
                    alt=""
                  />
                  <span className="postUsername">{p.user.username}</span>
                  <span className="postDate">
                    {" "}
                    {moment(p.createDate).fromNow()}
                  </span>
                </div>
              </div>
              <div className="postCenter">
                <span className="postText">{p.content}</span>
              </div>
              <div className="postCenter">
                <span className="postText">
                  {tags[p.id] && tags[p.id].map((tag) => (
                    <Link
                      to={`/tag/?name=${tag.name}`}
                      style={{ textDecoration: "none" }}
                      key={tag.id}
                    >
                      <span className="postText link">#{tag.name}</span>
                    </Link>
                  ))}
                </span>
              </div>
              <div className="postCenter">
                {p.images.length > 0 &&
                  p.images.map((image, index) => (
                    <img src={image.image} key={index} alt="image" />
                  ))}
              </div>
              <div className="bottom-content">
                <button
                  className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
                  onClick={() => activePost(p.id)}
                >
                  DUYỆT
                </button>
                <button
                  className="custom-card-link font-semibold text-[#fff] bg-[#ff3838]  shadow-md shadow-[#ff3838] text-[13px] border-2 px-6 py-2  hover:bg-[#cf2222] hover:text-[#fff] hover:shadow-md hover:shadow-[#cf2222]"
                  onClick={() => deletePost(p.id)}
                >
                  TỪ CHỐI
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default AcceptPost;
