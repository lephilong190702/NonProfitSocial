import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import { Button, Col, Form, ListGroup, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import MySpinner from "../layout/MySpinner";
import Header from "./header/Header";
import moment from "moment";
import "./comment.css";

const NewsDetails = () => {
  const [user] = useContext(UserContext);
  const { newsId } = useParams();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    const loadNewsDetail = async () => {
      let { data } = await ApiConfig.get(endpoints["details"](newsId));
      setNews(data);
    };

    const loadComments = async () => {
      let { data } = await authApi().get(endpoints["comments"](newsId));
      setComments(data);
    };

    loadNewsDetail();
    loadComments();
  }, [newsId]);

  const addComment = () => {
    const process = async () => {
      let { data } = await authApi().post(endpoints["add-comment"], {
        content: content,
        newsId: news.id,
      });
  
      setComments((prevState) => [data, ...prevState]);
  
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

      const updatedComments = comments.map((c) => {
        if (c.id === parentId) {
          c.replies = c.replies || [];
          c.replies.push(data);
        }
        return c;
      });

      setComments(updatedComments);
      setReplyContent(""); // Clear the reply content
    };

    process();
  };

  if (news === null) return <MySpinner />;

  let url = `/login?next=/registerVol/${newsId}`;
  return (
    <div className="comment-container">
      <h1 className="text-center text-info mt-2">{news.name}</h1>
      <hr />
      <Row>
        <Col md={5} xs={6}>
          <Image src={news.image} rounded fluid />
        </Col>
        <Col md={5} xs={6}>
          <h2 className="text-danger">{news.name}</h2>
          <p>{news.content}</p>
          <h3>{moment(news.createDate).format("DD/MM/YYYY HH:mm")}</h3>
        </Col>
      </Row>
      <hr />

      {user !== null ? (
        <>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nội dung bình luận"
          />
          <Button onClick={addComment} className="mt-2" variant="info">
            Bình luận
          </Button>
        </>
      ) : null}
      <>
        <hr />

        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <div className="comment">
                <div className="comment-avatar">
                  <img src={comment.user.profile.avatar} alt="avatar" />
                </div>
                <div className="comment-details">
                  <div className="comment-username">
                    <span>{comment.user.username}</span>
                  </div>
                  <div className="comment-content">
                    <span>{comment.content}</span>
                  </div>
                  <div className="comment-time">
                    <span>{moment(comment.createDate).fromNow()}</span>
                  </div>
                </div>
              </div>

              {user !== null ? (
                <>
                  <Form.Control
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Nội dung phản hồi"
                  />
                  <Button variant="link" onClick={() => addReply(comment.id)}>
                    Trả lời
                  </Button>
                </>
              ) : null}

              {comment.replies &&
                comment.replies.map((reply) => (
                  <div className="reply">
                    <div className="reply-avatar">
                      <img src={reply.user.profile.avatar} alt="avatar" />
                    </div>
                    <div className="reply-details">
                      <div className="reply-username">
                        <span>{reply.user.username}</span>
                      </div>
                      <div className="reply-content">
                        <span>{reply.content}</span>
                      </div>
                      <div className="reply-time">
                        <span>{moment(reply.createDate).fromNow()}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    </div>
  );
};

export default NewsDetails;
