import React, { useContext, useEffect, useRef, useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import ApiConfig, { authApi, endpoints } from "../../../configs/ApiConfig";
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
import { faHeart, faList, faListDots } from "@fortawesome/free-solid-svg-icons";
import Client from "stompjs";
import SockJS from "sockjs-client";
import { Link, useSearchParams } from "react-router-dom";

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

  // const [image, setImage] = useState([]);
  const [editedImages, setEditedImages] = useState([]);

  const [commentDisplayModes, setCommentDisplayModes] = useState({});
  const [replyDisplayModes, setReplyDisplayModes] = useState({});

  const [kw, setKw] = useState(false);
  const [q] = useSearchParams();
  const [findPost, setFindPost] = useState([]);

  const [commentOpen, setCommentOpen] = useState({});
  const [commentNow, setCommentNow] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editCommentModalOpen, setEditCommentModalOpen] = useState(false);
  const [editedCommentContent, setEditedCommentContent] = useState("");

  const [replyOpen, setReplyOpen] = useState({});
  const [replyNow, setReplyNow] = useState("");
  const [editedReplyId, setEditedReplyId] = useState(null);
  const [editReplyModalOpen, setEditReplyModalOpen] = useState(false);
  const [editedReplyContent, setEditedReplyContent] = useState("");

  const [imagePost, setImagePost] = useState([]);
  const [choosePost, setChoosePost] = useState("");

  const images = useRef();

  const [edit, setEdit] = useState({
    content: "",
    files: [],
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
    loadRepliesByCommentId(commentId);
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
    // setImagePost(post.images);
    setChoosePost(post.id);
    setImagePost(loadImagesByPost(post.id));
    setContentNow(post.content);
    setEditedPostId(post.id);
    setEditedImages(loadImagesByPost(post.id));
    setEditPostModalOpen(true);
  };

  const handleEditComment = (comment) => {
    setCommentNow(comment.content);
    setEditedCommentId(comment.id);
    setEditCommentModalOpen(true);
  };

  const handleEditReply = (reply) => {
    setReplyNow(reply.content);
    setEditedReplyId(reply.id);
    setEditReplyModalOpen(true);
  };

  const handleImageChange = async (event) => {
    const selectedImages = event.target.files;
    const imageArray = Array.from(selectedImages);
    console.log(imageArray);
    setEdit((current) => ({
      ...current,
      files: current.files.concat(imageArray),
    }));
  };

  const handleEditPost = async (postId) => {
    try {

      const formData = new FormData();
      formData.append("content", editedPostContent);
      edit.files.forEach((image, index) => {
        formData.append(`files[${index}]`, image);
      });

      if (edit.files.length > 0)
        for (let i = 0; i < edit.files.length; i++) {
          formData.append("files", edit.files[i]);
        }

      console.log(editedPostContent);

      const response = await authApi().put(
        endpoints["update-post"](postId),
        formData
      );

      console.log("Kết quả chỉnh sửa bài viết:", response.data);

      setEditPostModalOpen(false);
      setEditedPostId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const editComment = async (commentId) => {
    try {
      const response = await authApi().put(
        endpoints["edit-comment"](commentId),
        {
          content: editedCommentContent,
        }
      );

      console.log("Kết quả chỉnh sửa bài viết:", response.content);

      setEditCommentModalOpen(false);
      setEditedCommentId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const editReply = async (replyId) => {
    try {
      const response = await authApi().put(endpoints["edit-replies"](replyId), {
        content: editedReplyContent,
      });

      console.log("Kết quả chỉnh sửa bài viết:", response.content);

      setEditReplyModalOpen(false);
      setEditedReplyId(null);
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

  const handleDeleteComment = async (commentId) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bình luận này này?"
    );

    if (shouldDelete) {
      try {
        const response = await authApi().delete(
          endpoints["edit-comment"](commentId)
        );
        console.log("Kết quả xóa bình luận:", response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteReply = async (replyId) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bình luận này này?"
    );

    if (shouldDelete) {
      try {
        const response = await authApi().delete(
          endpoints["edit-replies"](replyId)
        );
        console.log("Kết quả xóa bình luận:", response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const loadRepliesByCommentId = async (commentId) => {
    try {
      const response = await ApiConfig.get(
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
      const response = await ApiConfig.get(endpoints["comment-post"](postId));
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const loadImagesByPost = async (postId) => {
    try {
      const res = await ApiConfig.get(endpoints["post-image"](postId));
      setImagePost((prevImage) => ({
        ...prevImage,
        [postId]: res.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const connectToWebSocket = () => {
    const socket = new SockJS(
      "https://nonprofit.southeastasia.cloudapp.azure.com/api/ws"
    );
    // const socket = new SockJS("http://localhost:9090/api/ws");
    const stompClient = Client.over(socket);

    console.log("Connecting to websocket server...");

    stompClient.connect(
      {},
      () => {
        stompClient.subscribe("/topic/comments/", (message) => {
          console.log("Received message:", message.body);
          const newComment = JSON.parse(message.body);
          console.log("newComment", newComment);
          const postId = newComment.post.id;
          console.log("postId", postId);
          setComments((current) => ({
            ...current,
            [postId]: [...(current[postId] || []), newComment],
          }));
        });

        stompClient.subscribe("/topic/update-comments/", (message) => {
          console.log("Received message:", message.body);
          const updateComment = JSON.parse(message.body);
          console.log("updateComment: ", updateComment);
          const postId = updateComment.post.id;
          console.log("postId", postId);
          setComments((prevComments) => {
            return {
              ...prevComments,
              [postId]: prevComments[postId].map((comment) =>
                comment.id === updateComment.id
                  ? { ...comment, content: updateComment.content }
                  : comment
              ),
            };
          });
        });

        stompClient.subscribe("/topic/delete-post/", (message) => {
          console.log("Received delete post message:", message.body);
          const deletedPostId = JSON.parse(message.body);
          console.log("deletedPostId: ", deletedPostId);

          // Cập nhật state hoặc thực hiện các hành động tương ứng, ví dụ: xóa bài viết khỏi danh sách bài viết mà không cần reload trang
          setPost((prevPosts) =>
            prevPosts.filter((post) => post.id !== deletedPostId)
          );
        });

        stompClient.subscribe("/topic/delete-comment-post/", (message) => {
          console.log("Received delete comment post message:", message.body);
          const deletedCommentId = JSON.parse(message.body);
          console.log("deletedCommentId: ", deletedCommentId);

          // Cập nhật state hoặc thực hiện các hành động tương ứng, ví dụ: xóa bài viết khỏi danh sách bài viết mà không cần reload trang
          setComments((prevComments) => {
            console.log("prevComments before update:", prevComments);
            const updatedComments = {};
            Object.keys(prevComments).forEach((postId) => {
              updatedComments[postId] = prevComments[postId].filter(
                (comment) => comment.id !== deletedCommentId
              );
            });
            console.log("updatedComments:", updatedComments);
            return updatedComments;
          });
        });

        stompClient.subscribe("/topic/delete-reply-comment/", (message) => {
          console.log("Received delete reply comment message:", message.body);
          const deletedReplyCommentId = JSON.parse(message.body);
          console.log("deletedReplyCommentId: ", deletedReplyCommentId);

          // Update replies state by removing the deleted reply comment
          setReplies((prevReplies) => {
            // Lặp qua tất cả các commentId và loại bỏ reply comment có replyId tương ứng
            const updatedReplies = {};
            Object.keys(prevReplies).forEach((commentId) => {
              updatedReplies[commentId] = prevReplies[commentId].filter(
                (reply) => reply.id !== deletedReplyCommentId
              );
            });
            return updatedReplies;
          });
        });

        stompClient.subscribe("/topic/reply-comments/", (message) => {
          console.log("Received message:", message.body);
          const newReplyComment = JSON.parse(message.body);
          console.log("newReplyComment", newReplyComment);
          const commentId = newReplyComment.comment.id;
          console.log("commentId", commentId);
          setReplies((current) => ({
            ...current,
            [commentId]: [...(current[commentId] || []), newReplyComment],
          }));
        });

        stompClient.subscribe("/topic/update-reply-comments/", (message) => {
          console.log("Received message:", message.body);
          const newUpdateReplyComment = JSON.parse(message.body);
          console.log("newUpdateReplyComment", newUpdateReplyComment);
          const commentId = newUpdateReplyComment.comment.id;
          console.log("commentId", commentId);
          setReplies((prevReplies) => {
            return {
              ...prevReplies,
              [commentId]: prevReplies[commentId].map((reply) =>
                reply.id === newUpdateReplyComment.id
                  ? newUpdateReplyComment
                  : reply
              ),
            };
          });
        });
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
        let p = endpoints.post;
        const kw = q.get("kw");

        if (kw !== null) {
          p = `${p}search?kw=${kw}`;
          setKw(true);
        } else setKw(false);
        const res2 = await ApiConfig.get(p);
        setFindPost(res2.data);

        let res = await ApiConfig.get(endpoints["public-posts"]);
        console.log(res.data);
        setPost(res.data);

        res.data.map((p) => loadImagesByPost(p.id));

        const commentPromises = res.data.map((post) => {
          const postId = post.id;
          loadCommentsByPostId(postId);
          console.log(post.comments);
        });

        const reactionsPromises = res.data.map((p) => {
          const postId = p.id;
          return ApiConfig.get(endpoints["react-post"](postId)).then(
            (response) => response.data
          ); // Lấy dữ liệu từ response
        });

        const reactionsData = await Promise.all(reactionsPromises);

        const totalLikes = {};
        reactionsData.forEach((data, index) => {
          const postId = res.data[index].id;
          totalLikes[postId] = data.length;
        });

        setLikeCurrent(totalLikes);
      } catch (error) {
        console.error(error);
      }
    };

    const stompClient = connectToWebSocket();

    loadPosts();

    return () => {
      stompClient.disconnect();
    };
  }, [q]);

  const handleMenuToggle = (postId) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleCommentToggle = (commentId) => {
    setCommentOpen((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleReplyToggle = (replyId) => {
    setReplyOpen((prevState) => ({
      ...prevState,
      [replyId]: !prevState[replyId],
    }));
  };

  return (
    <>
      {!kw ? (
        <div>
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
                                <Dropdown.Item
                                  onClick={() => handleEditsPost(p)}
                                >
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
                              <Dropdown.Item
                                onClick={() => handleReportPost(p.id)}
                              >
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
                    <span className="postText">
                      {p.tags.map((tag) => (
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
                    {imagePost[p.id] &&
                      imagePost[p.id].length > 0 &&
                      imagePost[p.id].map((image, index) => (
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
                                <div
                                  className="flex flex-row gap-3 border-t-[1px] border-[#E1E1E1] "
                                  style={{ position: "relative" }}
                                >
                                  <div className="comment-post flex flex-row">
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
                                            {moment(
                                              comment.createDate
                                            ).fromNow()}
                                          </p>
                                          <p
                                            className="font-semibold text-sm cursor-pointer"
                                            onClick={() =>
                                              replyHandler(comment.id)
                                            }
                                          >
                                            Trả lời
                                          </p>
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <Dropdown
                                    className="commentContent"
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                      display: "flex",
                                      marginBottom: "10px",
                                    }}
                                    show={commentOpen[comment.id]}
                                    onToggle={() =>
                                      handleCommentToggle(comment.id)
                                    }
                                  >
                                    <Dropdown.Toggle
                                      variant="link"
                                      className="btn-more-vert"
                                      style={{
                                        border: "none",
                                        boxShadow: "none",
                                      }}
                                    >
                                      {/* <FontAwesomeIcon icon={faList} /> */}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleEditComment(comment)
                                        }
                                      >
                                        Chỉnh sửa bình luận
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleDeleteComment(comment.id)
                                        }
                                      >
                                        Xóa bình luận
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>

                                {openReply === comment.id && (
                                  <>
                                    <Link
                                      onClick={() =>
                                        toggleReplyDisplay(comment.id)
                                      }
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
                                          .slice(
                                            replyDisplayModes[comment.id]
                                              ? undefined
                                              : -2
                                          )
                                          // .reverse()
                                          .map((reply) => (
                                            <div
                                              key={reply.id}
                                              className="reply"
                                            >
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
                                                    src={
                                                      reply.user.profile.avatar
                                                    }
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
                                              <Dropdown
                                                className="replyContent"
                                                style={{
                                                  position: "absolute",
                                                  // top: 0,
                                                  right: 0,
                                                  display: "flex",
                                                  marginBottom: "10px",
                                                }}
                                                show={replyOpen[reply.id]}
                                                onToggle={() =>
                                                  handleReplyToggle(reply.id)
                                                }
                                              >
                                                <Dropdown.Toggle
                                                  variant="link"
                                                  className="btn-more-vert"
                                                  style={{
                                                    border: "none",
                                                    boxShadow: "none",
                                                  }}
                                                >
                                                  {/* <FontAwesomeIcon icon={faList} /> */}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                  <Dropdown.Item
                                                    onClick={() =>
                                                      handleEditReply(reply)
                                                    }
                                                  >
                                                    Chỉnh sửa phản hồi
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() =>
                                                      handleDeleteReply(
                                                        reply.id
                                                      )
                                                    }
                                                  >
                                                    Xóa phản hồi
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          ))
                                      : null}
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
                                        onClick={() =>
                                          addReply(comment.id, p.id)
                                        }
                                        className="mt-2"
                                        variant="info"
                                      >
                                        Thêm phản hồi
                                      </Button>
                                    )}
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
        </div>
      ) : (
        <div>
          {findPost
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
                                <Dropdown.Item
                                  onClick={() => handleEditsPost(p)}
                                >
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
                              <Dropdown.Item
                                onClick={() => handleReportPost(p.id)}
                              >
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
                    <span className="postText">
                      <a href="#" style={{ textDecoration: "none" }}>
                        {p.tags.map((tag) => (
                          <span key={tag.id} className="postText link">
                            #{tag.name}
                          </span>
                        ))}
                      </a>
                    </span>
                  </div>
                  <div className="postCenter">
                    {imagePost[p.id] && imagePost[p.id].length > 0 &&
                      imagePost[p.id].map((image, index) => (
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
                                <div
                                  className="flex flex-row gap-3 border-t-[1px] border-[#E1E1E1] "
                                  style={{ position: "relative" }}
                                >
                                  <div className="comment-post flex flex-row">
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
                                            {moment(
                                              comment.createDate
                                            ).fromNow()}
                                          </p>
                                          <p
                                            className="font-semibold text-sm cursor-pointer"
                                            onClick={() =>
                                              replyHandler(comment.id)
                                            }
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
                                  <Dropdown
                                    className="commentContent"
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                      display: "flex",
                                      marginBottom: "10px",
                                    }}
                                    show={commentOpen[comment.id]}
                                    onToggle={() =>
                                      handleCommentToggle(comment.id)
                                    }
                                  >
                                    <Dropdown.Toggle
                                      variant="link"
                                      className="btn-more-vert"
                                      style={{
                                        border: "none",
                                        boxShadow: "none",
                                      }}
                                    >
                                      {/* <FontAwesomeIcon icon={faList} /> */}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleEditComment(comment)
                                        }
                                      >
                                        Chỉnh sửa bình luận
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleDeleteComment(comment.id)
                                        }
                                      >
                                        Xóa bình luận
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>

                                {openReply === comment.id && (
                                  <>
                                    <Link
                                      onClick={() =>
                                        toggleReplyDisplay(comment.id)
                                      }
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
                                          .slice(
                                            replyDisplayModes[comment.id]
                                              ? undefined
                                              : -2
                                          )
                                          // .reverse()
                                          .map((reply) => (
                                            <div
                                              key={reply.id}
                                              className="reply"
                                            >
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
                                                    src={
                                                      reply.user.profile.avatar
                                                    }
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
                                              <Dropdown
                                                className="replyContent"
                                                style={{
                                                  position: "absolute",
                                                  // top: 0,
                                                  right: 0,
                                                  display: "flex",
                                                  marginBottom: "10px",
                                                }}
                                                show={replyOpen[reply.id]}
                                                onToggle={() =>
                                                  handleReplyToggle(reply.id)
                                                }
                                              >
                                                <Dropdown.Toggle
                                                  variant="link"
                                                  className="btn-more-vert"
                                                  style={{
                                                    border: "none",
                                                    boxShadow: "none",
                                                  }}
                                                >
                                                  {/* <FontAwesomeIcon icon={faList} /> */}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                  <Dropdown.Item
                                                    onClick={() =>
                                                      handleEditReply(reply)
                                                    }
                                                  >
                                                    Chỉnh sửa phản hồi
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() =>
                                                      handleDeleteReply(
                                                        reply.id
                                                      )
                                                    }
                                                  >
                                                    Xóa phản hồi
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          ))
                                      : null}
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
                                        onClick={() =>
                                          addReply(comment.id, p.id)
                                        }
                                        className="mt-2"
                                        variant="info"
                                      >
                                        Thêm phản hồi
                                      </Button>
                                    )}
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
        </div>
      )}

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
            {imagePost[choosePost] &&
              imagePost[choosePost].map((image, index) => (
                <div>
                  <img src={image.image} alt="image" />
                </div>
              ))}
            <input
              type="file"
              // accept="image/*"
              ref={images}
              multiple
              onChange={(e) => handleImageChange(e)}
            />
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

      <Modal
        show={editCommentModalOpen}
        onHide={() => setEditCommentModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              defaultValue={commentNow}
              onChange={(e) => setEditedCommentContent(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setEditCommentModalOpen(false)}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            // onClick={() => editComment(editedCommentId)}
            onClick={() => editComment(editedCommentId)}
          >
            Lưu chỉnh sửa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={editReplyModalOpen}
        onHide={() => setEditReplyModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa phản hồi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              defaultValue={replyNow}
              onChange={(e) => setEditedReplyContent(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setEditReplyModalOpen(false)}
          >
            Hủy
          </Button>
          <Button variant="primary" onClick={() => editReply(editedReplyId)}>
            Lưu chỉnh sửa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
