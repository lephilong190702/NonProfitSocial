import React, { useEffect, useState } from "react";
import MySpinner from "../layout/MySpinner";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { Alert, Card, Col, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../components";
import "./news.css";

const NewsPage = () => {
  const [news, setNews] = useState(null);
  const [q] = useSearchParams();

  useEffect(() => {
    const loadNews = async () => {
      try {
        let e = endpoints.news;

        const cateId = q.get("cateId");
        if (cateId !== null) e = `${e}ncategories/${cateId}/`;
        else {
          const kw = q.get("kw");
          if (kw !== null) e = `${e}?kw=${kw}`;
        }

        const res = await ApiConfig.get(e);
        setNews(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadNews();
  }, [q]);

  if (news === null) return <MySpinner />;
  if (news.length === 0)
    return (
      <div className="container">
        <Alert variant="info" className="no-news-alert">
          Không có tin tức nào
        </Alert>
      </div>
    );

  return (
    <div className="container">
      <h1 className="page-title">DANH SÁCH TIN TỨC</h1>
      <Row>
        {news.map((n) => {
          const url = `/news/${n.id}`;
          return (
            <Col xs={12} md={3} key={n.id}>
              <Card className="custom-card">
                <Card.Img variant="top" src={n.image} className="card-img" />
                <Card.Body>
                  <Card.Title className="card-title">{n.name}</Card.Title>
                  <Card.Text className="card-text">{n.content}</Card.Text>
                  <Link to={url} className="custom-card-link">
                    Xem chi tiết
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default NewsPage;
