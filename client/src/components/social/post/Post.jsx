import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { authApi, endpoints } from "../../../configs/ApiConfig";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../../App";

const Post = () => {
  const [user] = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const likeHandler = async (postId) => {
    try {
      const { data } = await authApi().post(endpoints["react"], {
        reaction: "LIKE",
        postId: postId, // Assuming postId is properly defined
      });
      setLike(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (postId) => {
    try {
      const { data } = await authApi().post(endpoints["post-comment"], {
        content: content,
        postId: postId,
      });

      // Cập nhật danh sách bình luận và xóa nội dung của ô nhập
      setComments([...comments, data]);
      setContent("");

      // Cập nhật Local Storage khi thêm bình luận mới
      localStorage.setItem("post-comment", JSON.stringify([...comments, data]));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let res = await authApi().get(endpoints["post"]);
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPosts();
  }, []);

  return (
    <>
      {post.map((p) => (
        <div className="post" key={p.id}>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img
                  className="postProfileImg"
                  src={p.user.profile.avatar}
                  alt=""
                />
                <span className="postUsername">{p.user.username}</span>
                <span className="postDate">{p.createDate}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
            </div>
            <div className="postCenter">
              {/* Hiển thị nội dung bài viết */}
              <span className="postText">{p.content}</span>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src="public/like.png"
                  onClick={() => likeHandler(p.id)} // Pass postId to likeHandler
                  alt=""
                />
                <img
                  className="likeIcon"
                  src="public/heart.png"
                  onClick={() => likeHandler(p.id)} // Pass postId to likeHandler
                  alt=""
                />
                <span className="postLikeCounter">{like} people like it</span>
              </div>
              <div className="postBottomRight">
                {/* Hiển thị số lượng bình luận */}
                <span className="postCommentText">{comments.length} comments</span>
              </div>
            </div>
            <div>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nội dung bình luận"
              />
              <Button
                onClick={() => addComment(p.id)} // Pass postId to addComment
                className="mt-2"
                variant="info"
              >
                Bình luận
              </Button>
            </div>
            {/* Hiển thị danh sách bình luận */}
            <div className="commentList">
              {comments.map((comment, index) => (
                <div key={index} className="commentItem">
                  <span className="commentContent">{comment.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;
