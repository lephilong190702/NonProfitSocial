import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { authApi, endpoints } from "../../../configs/ApiConfig";
import { Button, Form, Dropdown, Modal, Alert } from "react-bootstrap";
import { UserContext } from "../../../App";

const Post = () => {
  const [user] = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Trạng thái của menu mở hoặc đóng

  const [reportModalOpen, setReportModalOpen] = useState(false); // Trạng thái của modal báo cáo
  const [reportReason, setReportReason] = useState("");
  const [reportPostId, setReportPostId] = useState(null);
  const [reportSuccess, setReportSuccess] = useState(false);

  const [editPostModalOpen, setEditPostModalOpen] = useState(false); // Trạng thái của modal chỉnh sửa bài viết
  const [editedPostId, setEditedPostId] = useState(null);
  const [editedPostTitle, setEditedPostTitle] = useState("");
  const [editedPostContent, setEditedPostContent] = useState("");

  const likeHandler = async (postId) => {
    try {
      const { data } = await authApi().post(endpoints["react"], {
        reaction: "LIKE",
        postId: postId, // Giả sử postId đã được xác định đúng cách
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

   // Hàm xử lý khi nhấp vào tùy chọn báo cáo bài viết
   const handleReportPost = (postId) => {
    setReportPostId(postId);
    setReportModalOpen(true);
  };

  // Hàm xử lý khi nhấp vào nút Gửi báo cáo trong modal
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

        // Đặt hàm setTimeout để tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
          setReportSuccess(false);
        }, 3000); // 3 giây
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditsPost = (postId) => {
    setEditedPostId(postId);
    setEditPostModalOpen(true);
  };

  // Hàm xử lý khi nhấp vào tùy chọn chỉnh sửa bài viết
  const handleEditPost = async (postId) => {
    try {
      // Gửi yêu cầu chỉnh sửa bài viết bằng API
      const response = await authApi().put(`${endpoints["post"]} + ${postId}`, {
        // title: editedPostTitle,
        content: editedPostContent,
      });

      // Xử lý kết quả từ API nếu cần
      console.log("Kết quả chỉnh sửa bài viết:", response.data);

      // Đóng modal sau khi lưu chỉnh sửa
      setEditPostModalOpen(false);
      setEditedPostId(null);

      // Cập nhật danh sách bài viết hoặc thực hiện các hành động cần thiết
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm xử lý khi nhấp vào tùy chọn xóa bài viết
  const handleDeletePost = async (postId) => {
    try {
      // Gửi yêu cầu xóa bài viết bằng API
      const response = await authApi().delete(`${endpoints["post"]} + ${postId}`);

      // Xử lý kết quả từ API nếu cần
      console.log("Kết quả xóa bài viết:", response.data);

      // Sau khi xóa bài viết thành công, bạn có thể cập nhật danh sách bài viết để loại bỏ bài viết đã xóa.
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
                <Dropdown show={menuOpen[p.id]} onToggle={() => handleMenuToggle(p.id)}>
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
                    <Dropdown.Item onClick={() => handleReportPost(p.id)}> {/* Thêm xử lý báo cáo bài viết */}
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
                <span className="postLikeCounter">{like[p.id] || 0} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{(comments[p.id] || []).length} comments</span>
              </div>
            </div>
            <div>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={content[p.id] || ""}
                onChange={(e) => setContent({ ...content, [p.id]: e.target.value })}
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
              {comments[p.id]?.map((comment, index) => (
                <div key={index} className="commentItem">
                  <span className="commentContent">{comment.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Modal báo cáo */}
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

      {/* Thông báo báo cáo thành công */}
      {reportSuccess && (
        <Alert variant="success" className="mt-3">
          Báo cáo đã được gửi thành công!
        </Alert>
      )}

      {/* Modal chỉnh sửa bài viết */}
      <Modal
        show={editPostModalOpen}
        onHide={() => setEditPostModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form.Group>
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              value={editedPostTitle}
              onChange={(e) => setEditedPostTitle(e.target.value)}
            />
          </Form.Group> */}
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
          <Button variant="primary" onClick={() => handleEditPost(editedPostId)}>
            Lưu chỉnh sửa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
