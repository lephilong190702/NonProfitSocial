import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { useParams } from 'react-router';
import ApiConfig from '../configs/ApiConfig';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MySpinner from '../layout/MySpinner';

const NewsDetails = () => {
    const [user, ] = useContext(UserContext);
    const {newsId} = useParams();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState();

    useEffect(() => {
        const loadNews = async () => {
            let {data} = await ApiConfig.get(endpoints['details'](newsId));
            setNews(data); 
        }

        const loadComments = async () => {
            let {data} = await ApiConfig.get(endpoints['comments'](newsId));
            setComments(data);
        }

        loadNews();
        loadComments();
    }, []);

    const addComment = () => {
        const process = async () => {
            let {data} = await authApi().post(endpoints['add-comment'], {
                "content": content, 
                "product": news.id
            });

            setComments([...comments, data]);
        }

        process();
    }
    
    if (news === null || comments === null)
        return <MySpinner /> ;

    let url = `/login?next=/news/${newsId}`;
    return <>
        <h1 className="text-center text-info mt-2">CHI TIẾT SẢN PHẨM ({newsId})</h1>
        <Row>
            <Col md={5} xs={6}>
                <Image src={news.image} rounded fluid />
            </Col>
            <Col md={5} xs={6}>
                <h2 className="text-danger">{news.name}</h2>
                <p>{news.content}</p>
                <h3>{news.createdDate} VNĐ</h3>
            </Col>
        </Row>
        <hr />
        

        {user===null?<p>Vui lòng <Link to={url}>đăng nhập</Link> để bình luận! </p>:<>
        <Form.Control as="textarea" aria-label="With textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Nội dung bình luận" />
        <Button onClick={addComment} className="mt-2" variant="info">Bình luận</Button>
        </>}
        <hr />
        <ListGroup>
            {comments.map(c => <ListGroup.Item id={c.id}>
                        {c.user.username} - {c.content} - <Moment locale="vi" fromNow>{c.createdDate}</Moment>
                    </ListGroup.Item>)
            }
        </ListGroup>
    </>
}

export default NewsDetails