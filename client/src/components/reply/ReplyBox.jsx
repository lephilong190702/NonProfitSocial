import moment from "moment";
import React, { useState } from "react";

import "./replyNews.css";

const ReplyBox = ({ comment, addReply, value, onChange, user }) => {
  const [openReply, setOpenReply] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const totalPages = Math.ceil(comment.replies.length / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comment.replies.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const replyHandler = (commentId) => {
    setOpenReply((prevOpenReply) =>
      prevOpenReply === commentId ? null : commentId
    );
  };

  const handleAddReply = () => {
    addReply(comment.id);
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
          </div>
        </div>
        
        {/* </ListGroup.Item> */}
      </div>
      {comment.replies &&
        comment.replies.map((reply) => (
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
    </>
  );
};

export default ReplyBox;
