import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { useParams } from 'react-router';
import ApiConfig, { authApi, endpoints } from '../configs/ApiConfig';
import { Button, Col, Form, ListGroup, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MySpinner from '../layout/MySpinner';
import Header from './Header';

const NewsDetails = () => {
    const [user] = useContext(UserContext);
    const { newsId } = useParams();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        const loadNews = async () => {
            let { data } = await ApiConfig.get(endpoints["details"](newsId));
            setNews(data);
        }

        const loadComments = async () => {
            // Kiểm tra xem có dữ liệu đã lưu trong Local Storage không
            const storedComments = localStorage.getItem('comments');
            if (storedComments) {
                setComments(JSON.parse(storedComments));
            } else {
                let { data } = await authApi().get(endpoints["comments"](newsId));
                setComments(data);
                // Lưu dữ liệu vào Local Storage
                localStorage.setItem('comments', JSON.stringify(data));
            }
        }

        const loadNewsReply = async () => {
            let { data } = await authApi().get(endpoints["replies"](parentId));
            setReplyContent(data);
        }

        loadNews();
        loadComments();
        loadNewsReply();
    }, [newsId]);

    const addComment = () => {
        const process = async () => {
            let { data } = await authApi().post(endpoints["add-comment"], {
                "content": content,
                "newsId": news.id,
            });

            setComments([...comments, data]);
            // Cập nhật Local Storage khi thêm bình luận mới
            localStorage.setItem('comments', JSON.stringify([...comments, data]));
        }

        process();
    }

    const addReply = (parentId) => {
        const process = async () => {
            let { data } = await authApi().post(endpoints["replies"](parentId), {
                "content": replyContent,
                "newsId": news.id,
            });

            const updatedComments = comments.map((c) => {
                if (c.id === parentId) {
                    c.reply_news = c.reply_news || [];
                    c.reply_news.push(data);
                }
                return c;
            });

            setComments(updatedComments);
            // Cập nhật Local Storage khi thêm phản hồi mới
            localStorage.setItem('comments', JSON.stringify(updatedComments));
            setReplyContent('');
        }

        process();
    }

    if (news === null)
        return <MySpinner />;

    let url = `/login?next=/news/${newsId}`;
    return (
        <>
            <h1 className="text-center text-info mt-2">{news.name}</h1>
            <hr />
            <Row>
                <Col md={5} xs={6}>
                    <Image src={news.image} rounded fluid />
                </Col>
                <Col md={5} xs={6}>
                    <h2 className="text-danger">{news.name}</h2>
                    <p>{news.content}</p>
                    <h3>{news.createdDate}</h3>
                </Col>
            </Row>
            <hr />

            {user === null ? (
                <p>Vui lòng <Link to={url}>đăng nhập</Link> để bình luận! </p>
            ) : (
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
            )}
            <hr />

            <ListGroup>
                {comments.map((comment) => (
                    <ListGroup.Item key={comment.id}>
                        {comment.user.username} - {comment.content} - {comment.createdDate}
                        <Form.Control
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Nội dung phản hồi"
                        />
                        <Button
                            variant="link"
                            onClick={() => addReply(comment.id)}
                        >
                            Trả lời
                        </Button>
                        
                        {comment.reply_news && comment.reply_news.map((reply) => (
                            <div key={reply.id} className="ml-4">
                                {reply.user.username} - {reply.content} - {reply.createdDate}
                            </div>
                        ))}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default NewsDetails;
