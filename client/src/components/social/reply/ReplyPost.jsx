import moment from "moment";
import React from "react";
import { Button, ListGroup } from "react-bootstrap";

const ReplyPost = (comment, openReply, user, replies, replyHandler) => {
  return (
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
              <div className="comment-username">{comment.user.username}</div>
              <div className="comment-content">{comment.content}</div>
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
          {Array.isArray(replies[comment.id]) && replies[comment.id].length > 0
            ? replies[comment.id].slice().revece().map((reply) => (
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
                      <div className="reply-content">{reply.content}</div>
                      <div className="reply-time">
                        {" "}
                        {moment(reply.createDate).fromNow()}
                      </div>
                    </div>
                  </span>
                </div>
              ))
            : null}
        </>
      )}
    </ListGroup.Item>
  );
};

export default ReplyPost;
