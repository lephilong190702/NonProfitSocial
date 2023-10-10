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

const Post = () => {
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

  const likeHandler = async (postId) => {
    try {
      const { data } = await authApi().post(endpoints["react"], {
        reaction: "LIKE",
        postId: postId,
      });
      setLike({ ...like, [postId]: data });
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
    try {
      const response = await authApi().delete(`${endpoints["post"]}${postId}`);

      console.log("Kết quả xóa bài viết:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (postId) => {
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
      const response = await authApi().get(
        endpoints["comment-post"](postId)
      );
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
      const response = await authApi().post(endpoints["replies-post"](commentId), {
        commentId: commentId,
        content: replyContent[commentId],
      });

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
      } catch (error) {
        console.error(error);
      }
    };

    const loadComments = async () => {
      try {
        post.forEach((p) => {
          loadCommentsByPostId(p.id);
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
                <Dropdown
                  show={menuOpen[p.id]}
                  onToggle={() => handleMenuToggle(p.id)}
                >
                  <Dropdown.Toggle variant="link" className="btn-more-vert">
                    <MoreVert />
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
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{p.content}</span>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src="public/like.png"
                  onClick={() => likeHandler(p.id)}
                  alt=""
                />
                <img
                  className="likeIcon"
                  src="public/heart.png"
                  onClick={() => likeHandler(p.id)}
                  alt=""
                />
                <span className="postLikeCounter">
                  {like[p.id] || 0} people like it
                </span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">
                  {(comments[p.id] || []).length} comments
                </span>
              </div>
            </div>
            <div>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={content[p.id] || ""}
                onChange={(e) =>
                  setContent({ ...content, [p.id]: e.target.value })
                }
                placeholder="Nội dung bình luận"
              />
              <Button
                onClick={() => addComment(p.id)}
                className="mt-2"
                variant="info"
              >
                Bình luận
              </Button>
            </div>
            <div className="commentList">
              <ListGroup>
                {Array.isArray(comments[p.id]) && comments[p.id].length > 0 ? (
                  comments[p.id].map((comment) => (
                    <ListGroup.Item key={comment.id}>
                      <span className="commentContent">
                        {comment.user.username} - {comment.content}
                      </span>
                      <Button
                        variant="link"
                        onClick={() => handleShowReplies(comment.id)}
                      >
                        Hiển thị phản hồi
                      </Button>

                      {Array.isArray(replies[comment.id]) &&
                      replies[comment.id].length > 0 ? (
                        replies[comment.id].map((reply) => (
                          <div key={reply.id} className="reply">
                            <span className="replyContent">
                              {reply.user.username} - {reply.content}
                            </span>
                          </div>
                        ))
                      ) : null}

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
                      <Button
                        onClick={() => addReply(comment.id, p.id)}
                        className="mt-2"
                        variant="info"
                      >
                        Thêm phản hồi
                      </Button>
                    </ListGroup.Item>
                  ))
                ) : (
                  <div>No comments available</div>
                )}
              </ListGroup>
            </div>
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
              value={editedPostContent}
              onChange={(e) => setEditedPostContent(e.target.value)}
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
    </>
  );
};

export default Post;
