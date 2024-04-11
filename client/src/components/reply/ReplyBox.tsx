import moment from "moment";
import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import "./replyNews.css";

const ReplyBox = ({ comment }) => {
  const [openReply, setOpenReply] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const replyHandler = (commentId) => {
    setOpenReply((prevOpenReply) =>
      prevOpenReply === commentId ? null : commentId
    );
  };

  const handleChange = (event) => {
    setReplyContent(event.target.value); // Cập nhật nội dung trả lời khi người dùng nhập
  };

  const handleSubmit = () => {
    // Xử lý logic khi người dùng hoàn thành việc nhập và gửi trả lời
    console.log("Nội dung trả lời:", replyContent);
    // Đồng thời có thể gửi nội dung trả lời đến máy chủ ở đây
  };

  return (
    <>
      <div className="flex flex-row gap-3 border-t-[1px] border-[#E1E1E1] py-5">
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
            <div className="font-semibold">{comment.user.username}</div>
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
            {openReply === comment.id && (
              <div className="reply-news-box">
                <div className="reply-news-box">
                  <textarea
                    className="w-full h-[145px] font-medium text-sm  px-4 py-4 border-[1px] border-[#E1E1E1] rounded-md placeholder:text-[#A7A7A7]"
                    placeholder="Nhập gì đó..."
                  />
                  <button
                    onClick={handleSubmit}
                    className="float-right font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-12 py-2  hover:bg-[#1775ee] hover:text-[#fff] hover:shadow-md hover:shadow-[#1775ee]"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* </ListGroup.Item> */}
      </div>
      {comment.replies &&
        comment.replies.map((reply) => (
          <div className="flex flex-row gap-3  py-5">
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
    </>
  );
};

export default ReplyBox;
