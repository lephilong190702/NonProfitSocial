import moment from "moment";
import React, { useState } from "react";

import "./replyNews.css";
import ApiConfig, { authApi, endpoints } from "../../configs/ApiConfig";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const ReplyBox = ({ newsId, comment, addReply, value, onChange, user }) => {
  const [openReply, setOpenReply] = useState(null);
  const [replies, setReplies] = useState({});

  const [commentOpen, setCommentOpen] = useState({});
  const [commentNow, setCommentNow] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editCommentModalOpen, setEditCommentModalOpen] = useState(false);
  const [editedCommentContent, setEditedCommentContent] = useState("");


  const replyHandler = (commentId) => {
    loadRepliesByCommentId(commentId);
    setOpenReply((prevOpenReply) =>
      prevOpenReply === commentId ? null : commentId
    );
  };

  const loadComments = async (newsId) => {
    try {
      let { data } = await ApiConfig.get(endpoints["comments"](newsId));
      console.log("COMMENT " + data);
      // setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRepliesByCommentId = async (commentId) => {
    try {
      const response = await ApiConfig.get(endpoints["replies"](commentId));
      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const editComment = async (commentId) => {
    try {
      const response = await authApi().put(
        endpoints["news-comments"](commentId),
        {
          content: editedCommentContent,
        }
      );

      console.log("Kết quả chỉnh sửa bài viết:", response.content);

      comment.content = editedCommentContent;

      setEditCommentModalOpen(false);
      setEditedCommentId(null);
      loadComments(newsId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bình luận này này?"
    );

    if (shouldDelete) {
      try {
        const response = await authApi().delete(
          endpoints["news-comments"](commentId)
        );
        console.log("Kết quả xóa bình luận:", response.data);
        loadComments(newsId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddReply = () => {
    addReply(comment.id);
  };

  const handleCommentToggle = (commentId) => {
    setCommentOpen((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleEditComment = (comment) => {
    setCommentNow(comment.content);
    setEditedCommentId(comment.id);
    setEditCommentModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3 border-t-[1px] border-[#E1E1E1] ">
        {/* <ListGroup.Item key={comment.id}> */}
        <div className="comment">
          <div className="comment-avatar">
            <img
              className="w-[70px]"
              src={comment.user.profile.avatar}
              alt="avatar"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">
              <span>
              {comment.user.profile.lastName} {comment.user.profile.firstName} 
              </span>
              </div>
            <div className="pt-1 text-sm font-light text-[#333333]">
              {comment.content}
            </div>
            <div className="pt-2 flex flex-row gap-2 items-center">
              <p
                className="font-semibold text-sm cursor-pointer"
                onClick={() => replyHandler(comment.id)}
              >
                Trả lời
              </p>
              <p className="text-xs font-light">
                {moment(comment.createDate).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <Dropdown
          className="commentContent"
          style={{
            position: "absolute",
            // top: 0,
            right: 200,
            display: "flex",
            marginBottom: "10px",
          }}
          show={commentOpen[comment.id]}
          onToggle={() => handleCommentToggle(comment.id)}
        >
          <Dropdown.Toggle
            variant="link"
            className="btn-more-vert"
            style={{
              border: "none",
              boxShadow: "none",
            }}
          >
            <FontAwesomeIcon icon={faList} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleEditComment(comment)}>
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
        {/* </ListGroup.Item> */}
      </div>
      {replies[comment.id] &&
        replies[comment.id].map((reply) => (
          <div className="flex flex-row gap-3 py-2">
            <div>
              <div className="reply-news">
                <div className="reply-news-avatar">
                  <img src={reply.user.profile.avatar} alt="avatar" />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">{reply.user.username}</div>
                  <div className="pt-1 text-sm font-light text-[#333333]">
                    {reply.content}
                  </div>
                  <div className="pt-2 flex flex-row gap-2 items-center">
                    <p className="font-semibold text-sm cursor-pointer">
                      Trả lời
                    </p>
                    <p className="text-xs font-light">
                      {moment(reply.createDate).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {openReply === comment.id && (
        <div className="reply-news-box">
          {user !== null ? (
            <>
              <div className="reply-news-box flex flex-col">
                <textarea
                  className="w-50 h-[145px] font-medium text-sm  px-4 py-4 border-[1px] border-[#E1E1E1] rounded-md placeholder:text-[#A7A7A7]"
                  placeholder="Nhập gì đó..."
                  value={value}
                  onChange={onChange}
                />
                <button
                  onClick={handleAddReply}
                  className="w-20 float-right font-semibold text-[#fff] bg-[#38b6ff] shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2 hover:bg-[#1775ee] hover:text-[#fff] hover:shadow-md hover:shadow-[#1775ee]"
                >
                  Gửi
                </button>
              </div>
            </>
          ) : (
            <p className="text-danger">Vui lòng đăng nhập để bình luận</p>
          )}
        </div>
      )}

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
    </>
  );
};

export default ReplyBox;
