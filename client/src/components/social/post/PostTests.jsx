import React from "react";
import "./post.css";
import PostTest from "./PostTest";
import { useContext, useEffect, useState } from "react";
import { MoreVert } from "@material-ui/icons";
import { authApi, endpoints } from "../../../configs/ApiConfig";
import {
  Button,
  Form,
  Dropdown,
  Modal,
  Alert,
  ListGroup,
} from "react-bootstrap";
import { UserContext } from "../../../App";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faListDots,
  faPaperPlane,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import "./post.css";

const PostTests = () => {
  const [user] = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [like, setLike] = useState({});
  const [comments, setComments] = useState({});
  const [replies, setReplies] = useState({});
  const [content, setContent] = useState({});
  const [menuOpen, setMenuOpen] = useState({});
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportPostId, setReportPostId] = useState(null);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [editPostModalOpen, setEditPostModalOpen] = useState(false);
  const [editedPostId, setEditedPostId] = useState(null);
  const [editedPostContent, setEditedPostContent] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [reactions, setReactions] = useState({});
  const [likeCount, setLikeCount] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [openComment, setOpenComment] = useState(null);

  const CommentHandler = (postId) => {
    setOpenComment((prevOpenComment) =>
      prevOpenComment === postId ? null : postId
    );
  };

  const likeHandler = async (postId) => {
    if (!user) {
      // Người dùng chưa đăng nhập, hiển thị thông báo
      alert("Bạn cần đăng nhập để thực hiện thao tác này.");
      return;
    }

    try {
      const { data } = await authApi().post(endpoints["react"], {
        reaction: "LIKE",
        postId: postId,
      });

      // Cập nhật số lần "LIKE" trong state
      setLikeCount((prevLikeCount) => {
        return { ...prevLikeCount, [postId]: data.length };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReportPost = (postId) => {
    setReportPostId(postId);
    setReportModalOpen(true);
  };

  const handleSubmitReport = async () => {
    try {
      if (reportPostId) {
        const response = await authApi().post(endpoints["report-post"], {
          postId: reportPostId,
          content: reportReason,
        });

        setReportModalOpen(false);
        setReportReason("");
        setReportPostId(null);
        setReportSuccess(true);

        setTimeout(() => {
          setReportSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditsPost = (postId) => {
    setEditedPostId(postId);
    setEditPostModalOpen(true);
  };

  const handleEditPost = async (postId) => {
    try {
      const response = await authApi().put(`${endpoints["post"]}${postId}`, {
        content: editedPostContent,
      });

      console.log("Kết quả chỉnh sửa bài viết:", response.data);

      setEditPostModalOpen(false);
      setEditedPostId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (postId) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bài viết này?"
    );

    if (shouldDelete) {
      try {
        const response = await authApi().delete(
          `${endpoints["post"]}${postId}`
        );
        console.log("Kết quả xóa bài viết:", response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addComment = async (postId) => {
    if (!user) {
      alert("Bạn cần đăng nhập để thực hiện thao tác này.");
      return;
    }

    try {
      const response = await authApi().post(endpoints["post-comment"], {
        postId: postId,
        content: content[postId],
      });

      loadCommentsByPostId(postId);

      setContent({ ...content, [postId]: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const loadCommentsByPostId = async (postId) => {
    try {
      const response = await authApi().get(endpoints["comment-post"](postId));
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowReplies = (commentId) => {
    loadRepliesByCommentId(commentId);
  };

  const loadRepliesByCommentId = async (commentId) => {
    try {
      const response = await authApi().get(
        endpoints["replies-post"](commentId)
      );
      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const addReply = async (commentId) => {
    try {
      const response = await authApi().post(
        endpoints["replies-post"](commentId),
        {
          commentId: commentId,
          content: replyContent[commentId],
        }
      );

      loadRepliesByCommentId(commentId);

      setReplyContent({ ...replyContent, [commentId]: "" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let res = await authApi().get(endpoints["post"]);
        setPost(res.data);

        const reactionsPromises = res.data.map((p) => {
          const postId = p.id;
          return authApi()
            .get(endpoints["react-post"](postId))
            .then((response) => response.data); // Lấy dữ liệu từ response
        });

        const reactionsData = await Promise.all(reactionsPromises);

        const totalLikes = {};
        reactionsData.forEach((data, index) => {
          const postId = res.data[index].id;
          totalLikes[postId] = data.length;
        });

        setLikeCount(totalLikes);
      } catch (error) {
        console.error(error);
      }
    };

    const loadComments = async () => {
      try {
        post.forEach((p) => {
          loadCommentsByPostId(p.id);
          loadRepliesByCommentId(p.id);
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadComments();
    loadPosts();
  }, []);

  const handleMenuToggle = (postId) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
  return (
    <>
      {post.map((p) => (
        <div className="post" key={p.id}>
          <div className="postWeapper">
            <div className="feed" key={p.id}>
              <div className="top-content">
                <Link to={`/social/profile`}>
                  <div className="user">
                    <img src={p.user.profile.avatar} alt="" />
                    <h5>{p.user.username}</h5>
                  </div>
                </Link>
                <span>
                <Dropdown
                  show={menuOpen[p.id]}
                  onToggle={() => handleMenuToggle(p.id)}
                >
                  <Dropdown.Toggle variant="link" className="btn-more-vert" style={{border: 'none', boxShadow: 'none'}}>
                    <FontAwesomeIcon icon={faListDots} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditsPost(p.id)}>
                      Chỉnh sửa bài viết
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeletePost(p.id)}>
                      Xóa bài viết
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleReportPost(p.id)}>
                      Báo cáo bài viết
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </span>
              </div>
              <div className="mid-contetnt">
                <p>{p.content}</p>
                {p.images.length > 0 &&
                  p.images.map((image, index) => (
                    <img src={image.image} key={index} alt="image" />
                  ))}
              </div>
              <div className="bottom-content">
                <div className="action-item">
                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                </div>
                <div
                  className="action-item"
                  onClick={() => CommentHandler(p.id)}
                >
                  <span>
                    <FontAwesomeIcon icon={faComment} />
                  </span>
                </div>
                <div className="action-item">
                  <span>
                    <FontAwesomeIcon icon={faShare} />
                  </span>
                </div>
              </div>
              {openComment === p.id && (
                <div className="comments">
                  <Form action="#">
                    <div className="user">
                      {user ? (
                        <>
                          <img src={user.profile.avatar} alt="" />
                          <input
                            as="textarea"
                            aria-label="With textarea"
                            value={content[p.id] || ""}
                            onChange={(e) =>
                              setContent({
                                ...content,
                                [p.id]: e.target.value,
                              })
                            }
                            placeholder="Nội dung bình luận"
                          />
                          {/* <Button
                            onClick={() => addComment(p.id)}
                            className="btn btn-primary"
                            variant="info"
                          >
                            Bình luận
                          </Button> */}
                          <div className="action-item">
                            <span>
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                onClick={() => addComment(p.id)}
                                type="submit"
                              />
                            </span>
                          </div>
                        </>
                      ) : (
                        <p>Bạn cần đăng nhập để bình luận.</p>
                      )}
                    </div>
                  </Form>
                  {
                    <div className="comment">
                      <div>
                        {Array.isArray(comments[p.id]) &&
                        comments[p.id].length > 0 ? (
                          comments[p.id]
                            .slice()
                            .reverse()
                            .map((comment) => (
                              <div key={comment.id} className="user">
                                <img
                                  className="comment-avatar"
                                  src={comment.user.profile.avatar}
                                  alt=""
                                />
                                <div className="comment-details">
                                  <h5 className="comment-username">
                                    {comment.user.username}
                                  </h5>
                                  <p className="comment-content">
                                    {comment.content}
                                  </p>
                                  <div className="comment-time">
                                    {" "}
                                    {moment(comment.createDate).fromNow()}
                                    <Link
                                      style={{ marginLeft: "10px" }}
                                      onClick={() =>
                                        handleShowReplies(comment.id)
                                      }
                                    >
                                      Phản hồi
                                    </Link>
                                  </div>
                                  
                                </div>
                                
                              </div>
                            ))
                        ) : (
                          <div>Không có bình luận</div>
                        )}
                      </div>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostTests;
