import React, { useContext, useEffect, useState } from "react";
import "./post.css";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faListDots } from "@fortawesome/free-solid-svg-icons";
import Client from "stompjs";
import SockJS from "sockjs-client";
import { Link } from "react-router-dom";

const Post = () => {
  const [user] = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [like, setLike] = useState({});
  const [comments, setComments] = useState([]);
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
  const [contentNow, setContentNow] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [reactions, setReactions] = useState({});
  const [likeCount, setLikeCount] = useState({});
  const [likeCurrent, setLikeCurrent] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [openComment, setOpenComment] = useState(null);
  const [openReply, setOpenReply] = useState(null);

  const [image, setImage] = useState([]);
  const [editedImages, setEditedImages] = useState([]);

  const [commentDisplayModes, setCommentDisplayModes] = useState({});
  const [replyDisplayModes, setReplyDisplayModes] = useState({});

  const [edit, setEdit] = useState({
    content: "",
    tags: [],
    image: [],
  });

  const toggleCommentDisplay = (postId) => {
    setCommentDisplayModes((prevModes) => ({
      ...prevModes,
      [postId]: !prevModes[postId], // Chuyển đổi giữa true và false
    }));
  };

  const toggleReplyDisplay = (commentId) => {
    setReplyDisplayModes((prevModes) => ({
      ...prevModes,
      [commentId]: !prevModes[commentId], // Chuyển đổi giữa true và false
    }));
  };

  const CommentHandler = (postId) => {
    setOpenComment((prevOpenComment) =>
      prevOpenComment === postId ? null : postId
    );
  };

  const replyHandler = (commentId) => {
    loadRepliesByCommentId(commentId)
    setOpenReply((prevOpenReply) =>
      prevOpenReply === commentId ? null : commentId
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
      setLikeCurrent((prevLikeCurrent) => {
        return {
          ...prevLikeCurrent,
          [postId]: (prevLikeCurrent[postId] || 0) + 1,
        };
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

  const handleEditsPost = (post) => {
    setImage(post.images);
    setContentNow(post.content);
    setEditedPostId(post.id);
    setEditedImages(post.images);
    setEditPostModalOpen(true);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = { image: reader.result };
      const updatedImages = [...editedImages];
      updatedImages[index] = newImage;
      setEditedImages(updatedImages);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditPost = async (postId) => {
    try {

      const updatedPostImages = image.map((image, index) => {
        if (editedImages[index]) {
          return editedImages[index];
        } else {
          return image;
        }
      });

      const response = await authApi().put(`${endpoints["post"]}${postId}`, {
        content: editedPostContent,
        image: updatedPostImages,
      });

      console.log("Kết quả chỉnh sửa bài viết:", response.content);

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
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
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

  const loadPosts = async (stompClient) => {
    try {
      let res = await authApi().get(endpoints["post"]);
      setPost(res.data);

      const commentPromises = res.data.map((post) => {
        const postId = post.id;
        loadCommentsByPostId(postId);
      });

      console.log(commentPromises);

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

      setLikeCurrent(totalLikes);

      res.data.forEach((p) => {
        const postTopic = `/topic/posts/${p.id}`;
        stompClient.subscribe(postTopic, (message) => {
          console.log("Received message for post update:", message.body);
          const updatedPost = JSON.parse(message.body);
          setPost((current) => {
            const index = current.findIndex(
              (post) => post.id === updatedPost.id
            );
            if (index !== -1) {
              return [
                ...current.slice(0, index),
                updatedPost,
                ...current.slice(index + 1),
              ];
            }
            return current;
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const connectToWebSocket = () => {
    const socket = new SockJS("http://34.101.50.127:80/api/ws");
    const stompClient = Client.over(socket);

    console.log("Connecting to websocket server...");

    stompClient.connect({}, () => {
      console.log("Websocket connection established.");

      stompClient.subscribe("/topic/posts", (message) => {
        console.log("Received message:", message.body);
        const newPost = JSON.parse(message.body);
        setPost((current) => [...current, newPost]);
      });

      stompClient.subscribe("/topic/comments/", (message) => {
        console.log("Received message:", message.body);
        const newComment = JSON.parse(message.body);
        console.log("newComment", newComment);
        const postId = newComment.post.id;
        console.log("postId", postId)
        setComments((current) => ({
          ...current,
          [postId]: [...(current[postId] || []), newComment]
        }));
      });

      stompClient.subscribe("/topic/reply-comments/", (message) => {
        console.log("Received message:", message.body);
        const newReplyComment = JSON.parse(message.body);
        console.log("newReplyComment", newReplyComment);
        const commentId = newReplyComment.comment.id;
        console.log("commentId", commentId)
        setReplies((current) => ({
          ...current,
          [commentId]: [...(current[commentId] || []), newReplyComment]
        }));
      });


      loadPosts(stompClient);
    },
      (error) => {
        console.error("Websocket connection error:", error);
      }
    );

    return stompClient;
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let res = await authApi().get(endpoints["public-posts"]);
        console.log(res.data);
        setPost(res.data);

        const commentPromises = res.data.map((post) => {
          const postId = post.id;
          loadCommentsByPostId(postId);
          console.log(post.comments);
          post.comments.map((commentId) => {
            loadRepliesByCommentId(commentId.id);
          });
          // console.log(loadCommentsByPostId);
        });

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

        setLikeCurrent(totalLikes);

        res.data.forEach((p) => {
          const postTopic = `/topic/posts/${p.id}`;
          stompClient.subscribe(postTopic, (message) => {
            console.log("Received message for post update:", message.body);
            const updatedPost = JSON.parse(message.body);
            setPost((current) => {
              const index = current.findIndex(
                (post) => post.id === updatedPost.id
              );
              if (index !== -1) {
                return [
                  ...current.slice(0, index),
                  updatedPost,
                  ...current.slice(index + 1),
                ];
              }
              return current;
            });
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    const stompClient = connectToWebSocket();

    loadPosts();

    return () => {
      stompClient.disconnect();
    };
  }, [editedPostContent]);

  const handleMenuToggle = (postId) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };



  return (
    <>
      {post
        .slice()
        .reverse()
        .map((p) => (
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
                  <span className="postDate">
                    {" "}
                    {moment(p.createDate).fromNow()}
                  </span>
                </div>
                <div className="postTopRight">
                  {user && (
                    <Dropdown
                      show={menuOpen[p.id]}
                      onToggle={() => handleMenuToggle(p.id)}
                    >
                      <Dropdown.Toggle
                        variant="link"
                        className="btn-more-vert"
                        style={{ border: "none", boxShadow: "none" }}
                      >
                        <FontAwesomeIcon icon={faListDots} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {user.username === p.user.username && (
                          <>
                            <Dropdown.Item onClick={() => handleEditsPost(p)}>
                              Chỉnh sửa bài viết
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDeletePost(p.id)}
                            >
                              Xóa bài viết
                            </Dropdown.Item>
                          </>
                        )}

                        {user.username !== p.user.username && (
                          <Dropdown.Item onClick={() => handleReportPost(p.id)}>
                            Báo cáo bài viết
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div className="postCenter">
                <span className="postText">{p.content}</span>
              </div>
              <div className="postCenter">
                {p.images.length > 0 &&
                  p.images.map((image, index) => (
                    <img src={image.image} key={index} alt="image" />
                  ))}
              </div>
              <div className="bottom-content">
                <div className="postBottomLeft">
                  <Link
                    className="custom-card-link"
                    onClick={() => likeHandler(p.id)}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="postLikeCounter">
                      {likeCurrent[p.id] || 0} lượt yêu thích
                    </span>
                  </Link>
                </div>
                <div
                  className="postBottomRight"
                  onClick={() => CommentHandler(p.id)}
                >
                  <span className="postCommentText">
                    {(comments[p.id] || []).length} bình luận
                  </span>
                </div>
              </div>
              <div>
                {user ? (
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    value={content[p.id] || ""}
                    onChange={(e) =>
                      setContent({ ...content, [p.id]: e.target.value })
                    }
                    placeholder="Nội dung bình luận"
                  />
                ) : (
                  <p>Bạn cần đăng nhập để bình luận.</p>
                )}
                {user && (
                  <Button
                    onClick={() => addComment(p.id)}
                    className="mt-2"
                    variant="info"
                  >
                    Bình luận
                  </Button>
                )}
              </div>
              <Link
                onClick={() => toggleCommentDisplay(p.id)}
                className={
                  commentDisplayModes[p.id]
                    ? "gray-link"
                    : "gray-link underline-on-hover"
                }
              >
                {commentDisplayModes[p.id]
                  ? "Hiển thị một phần bình luận"
                  : "Hiển thị toàn bộ bình luận"}
              </Link>
              {
                <div className="commentList">
                  <div>
                    {Array.isArray(comments[p.id]) &&
                      comments[p.id].length > 0 ? (
                      comments[p.id]
                        .slice(commentDisplayModes[p.id] ? undefined : -4)
                        .reverse()
                        .map((comment) => (
                          <ListGroup.Item key={comment.id}>
                            <div className="flex flex-row gap-3 border-t-[1px] border-[#E1E1E1] ">
                              <div className="comment-post">
                                <span
                                  className="commentContent "
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <div className="comment-avatar">
                                    <img
                                      src={comment.user.profile.avatar}
                                      alt="avatar"
                                      style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginRight: "5px",
                                      }}
                                    />
                                  </div>
                                  <div className="comment-details">
                                    <div className="comment-username">
                                      {comment.user.username}
                                    </div>
                                    <div className="comment-content">
                                      {comment.content}
                                    </div>
                                    <div className="comment-time pt-1 flex flex-row gap-2 items-center">
                                      {" "}
                                      <p className="text-xs font-light">
                                        {moment(comment.createDate).fromNow()}
                                      </p>
                                      <p
                                        className="font-semibold text-sm cursor-pointer"
                                        onClick={() => replyHandler(comment.id)}
                                      >
                                        Trả lời
                                      </p>
                                    </div>
                                  </div>
                                </span>
                                {/* <Button
                                  variant="link"
                                  onClick={() => handleShowReplies(comment.id)}
                                >
                                  Hiển thị phản hồi
                                </Button> */}
                              </div>
                            </div>

                            {openReply === comment.id && (
                              <>
                                {user && ( // Kiểm tra xem người dùng đã đăng nhập hay chưa
                                  <Form.Control
                                    as="textarea"
                                    aria-label="With textarea"
                                    value={replyContent[comment.id] || ""}
                                    onChange={(e) =>
                                      setReplyContent({
                                        ...replyContent,
                                        [comment.id]: e.target.value,
                                      })
                                    }
                                    placeholder="Nội dung phản hồi"
                                  />
                                )}
                                {user && ( // Hiển thị nút thêm phản hồi nếu người dùng đã đăng nhập
                                  <Button
                                    onClick={() => addReply(comment.id, p.id)}
                                    className="mt-2"
                                    variant="info"
                                  >
                                    Thêm phản hồi
                                  </Button>
                                )}
                                <br />
                                <Link
                                  onClick={() => toggleReplyDisplay(comment.id)}
                                  className={
                                    replyDisplayModes[comment.id]
                                      ? "gray-link"
                                      : "gray-link underline-on-hover"
                                  }
                                  style={{ marginLeft: 50 }}
                                >
                                  {replyDisplayModes[comment.id]
                                    ? "Hiển thị một phần phản hồi"
                                    : "Hiển thị toàn bộ phản hồi"}
                                </Link>
                                {Array.isArray(replies[comment.id]) &&
                                  replies[comment.id].length > 0
                                  ? replies[comment.id]
                                    .slice(replyDisplayModes[comment.id] ? undefined : -2)
                                    .reverse()
                                    .map((reply) => (
                                      <div key={reply.id} className="reply">
                                        <span
                                          className="replyContent"
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <div className="reply-avatar">
                                            <img
                                              src={reply.user.profile.avatar}
                                              alt="avatar"
                                              style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                marginRight: "5px",
                                              }}
                                            />{" "}
                                          </div>
                                          <div className="reply-details">
                                            <div className="reply-username">
                                              {reply.user.username}
                                            </div>
                                            <div className="reply-content">
                                              {reply.content}
                                            </div>
                                            <div className="reply-time">
                                              {" "}
                                              {moment(
                                                reply.createDate
                                              ).fromNow()}
                                            </div>
                                          </div>
                                        </span>
                                      </div>
                                    ))
                                  : null}
                              </>
                            )}
                          </ListGroup.Item>
                        ))
                    ) : (
                      <div>Không có bình luận</div>
                    )}
                  </div>
                </div>
              }
            </div>
          </div>
        ))}

      <Modal show={reportModalOpen} onHide={() => setReportModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Báo cáo bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Lý do báo cáo"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setReportModalOpen(false);
              setReportReason("");
            }}
          >
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmitReport}>
            Gửi báo cáo
          </Button>
        </Modal.Footer>
      </Modal>

      {reportSuccess && (
        <Alert variant="success" className="mt-3">
          Báo cáo đã được gửi thành công!
        </Alert>
      )}

      <Modal
        show={editPostModalOpen}
        onHide={() => setEditPostModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              defaultValue={contentNow}
              onChange={(e) => setEditedPostContent(e.target.value)}
            />
            {image.map((image, index) => (
              <div key={index}>
                <img src={image.image} alt="image" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setEditPostModalOpen(false)}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => handleEditPost(editedPostId)}
          >
            Lưu chỉnh sửa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
