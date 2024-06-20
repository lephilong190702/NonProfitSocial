import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router";
import ApiConfig, { authApi, endpoints } from "../../configs/ApiConfig";
import { Form } from "react-bootstrap";
import MySpinner from "../../layout/MySpinner";
import moment from "moment";
import "./comment.css";
import ReplyBox from "../reply/ReplyBox";
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, PinterestShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from "react-share";


const NewsDetails = () => {
  const [user] = useContext(UserContext);
  const { newsId } = useParams();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState([]);
  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState("");

  const [isComment, setIsComment] = useState(false);
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const currentPageUrl = window.location.href;


  const loadComments = async (newsId) => {
    try {
      let { data } = await ApiConfig.get(endpoints["comments"](newsId));
      console.log("COMMENT " + data);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadReply = async (commentId) => {
    try {
      const res = await ApiConfig.get(endpoints["replies"](commentId));
      setReply(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    const loadNewsDetail = async () => {
      let { data } = await ApiConfig.get(endpoints["details"](newsId));
      setNews(data);
    };


    loadNewsDetail();
    loadComments(newsId);
  }, [newsId]);


  const checkCondition = () => {
    if (content.trim() === "") {
      setIsCommentEmpty(true);
    } else {
      setIsCommentEmpty(false);
      addComment();
    }
  };

  const addComment = () => {
    const process = async () => {
      let { data } = await authApi().post(endpoints["add-comment"], {
        content: content,
        newsId: news.id,
      });

      loadComments(newsId);
      setContent("");
    };

    process();
  };

  const addReply = (parentId) => {
    const process = async () => {
      let { data } = await authApi().post(endpoints["replies"](parentId), {
        content: replyContent,
        newsId: news.id,
      });
      loadReply(parentId);
      loadComments(newsId);
      setReplyContent("");
    };

    process();
  };

  const openComment = () => {
    setIsComment(!isComment);
  };
  if (news === null) return <MySpinner />;

  return (
    <>
      <div>
        <div className="max-w-screen-2xl px-36 py-10 ">
          <div className="flex flex-row gap-16 pb-8">
            <div className="basis-2/3 flex flex-row gap-7 select-none">
              <div className="flex flex-col h-full">
                <div className="flex flex-col max-h-[638px] w-full">
                  <img className="h-full w-full" src={news.image} />
                  <div className="flex flex-row justify-between items-center pt-2">
                    <div className="flex flex-row gap-1 items-center">
                      <div className="text-base font-normal pr-2">Chia sẻ:</div>
                      <FacebookShareButton url={currentPageUrl}>
                        <FacebookIcon />
                      </FacebookShareButton>
                      <FacebookMessengerShareButton url={currentPageUrl}>
                        <FacebookMessengerIcon />
                      </FacebookMessengerShareButton>
                      <TwitterShareButton url={currentPageUrl}>
                        <TwitterIcon />
                      </TwitterShareButton>
                      <TelegramShareButton url={currentPageUrl}>
                        <TelegramIcon className="text-[29px] cursor-pointer" />
                      </TelegramShareButton >
                    </div>
                    <div className="flex flex-row gap-4 cursor-pointer">
                      <div className="w-full font-semibold text-[#F16D9A] text-[14px] hover:text-[#EE5287]">
                        <div fixedWidth className="pr-1 text-[16px]">
                          Ngày đăng bài:{" "}
                          {moment(news.createDate).format("DD/MM/YYYY HH:mm")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col basis-1/3">
              <h1 className="font-bold text-[28px]  text-[#38b6ff]">
                {news.name}
              </h1>
              <p className="font-semibold text-[#868686] pt-3 leading-6 text-lg">
                {news.content}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl px-36 pt-10">
          <h1 className="product-title-header">BÌNH LUẬN</h1>
          <div className="bg-white">
            <div className="px-5 py-1">
              <div className="">
                <div className="basis-[45%] flex flex-col gap-3 justify-center items-center">
                  <p className="text-base font-semib  old">
                    Chia sẻ nhận xét của bạn về tin tức này
                  </p>
                  <button
                    className="font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#1775ee] hover:text-[#fff] hover:shadow-md hover:shadow-[#1775ee]"
                    onClick={openComment}
                  >
                    Viết bình luận
                  </button>
                </div>
              </div>
            </div>

            {/*open comment*/}
            <div
              className={`flex flex-col items-center px-5 py-1 duration-500 max-h-0 overflow-hidden ${isComment ? "max-h-[500px]" : ""
                }`}
            >
              {user !== null ? (
                <>
                  <div className="w-full px-12">
                    <div>Gửi bình luận của bạn tại đây</div>
                    <Form.Control
                      className="w-full h-[145px] font-medium text-sm  px-4 py-4 border-[1px] border-[#E1E1E1] rounded-md placeholder:text-[#A7A7A7]"
                      as="textarea"
                      aria-label="With textarea"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Nội dung bình luận"
                    />
                  </div>
                  <div className="w-full px-12 py-4">
                    {isCommentEmpty && (
                      <div className="text-sm text-[#f10000]">
                        Vui lòng nhập bình luận của bạn.
                      </div>
                    )}
                    <button
                      onClick={checkCondition}
                      className="font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-16 py-2  hover:bg-[#1775ee] hover:text-[#fff] hover:shadow-md hover:shadow-[#1775ee]"
                      variant="info"
                    >
                      Bình luận
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-danger">
                  Vui lòng đăng nhập để có thể bình luận
                </p>
              )}
            </div>

            {/*Show comment */}
            <div className="px-12 py-3 ">
              {/* <ListGroup> */}
              {comments
                .slice()
                .reverse()
                .map((comment) => (
                  <ReplyBox
                    key={comment.id}
                    newsId={newsId}
                    user={user}
                    comment={comment}
                    addReply={addReply}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                ))}
              {/* </ListGroup> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
