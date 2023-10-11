import React, { useEffect, useState } from "react";
import MySpinner from "../layout/MySpinner";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../components";
import "./news.css"; // Import CSS file

const NewsPage = () => {
  const [news, setNews] = useState(null);
  const [q] = useSearchParams();

  useEffect(() => {
    let loadNews = async () => {
      try {
        let e = endpoints["news"];

        let cateId = q.get("cateId");
        if (cateId !== null) e = `${e}ncategories/${cateId}/`;
        else {
          let kw = q.get("kw");
          if (kw !== null) e = `${e}?kw=${kw}`;
        }

        let res = await authApi().get(e);
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
      <>
        <Alert variant="info" className="mt-5">
          Không có tin tức nào
        </Alert>
      </>
    );

  return (
    <div className="container">
      <h1 className="page-title">DANH SÁCH TIN TỨC</h1>
      <Row>
        {news.map((n) => {
          let url = `/news/${n.id}`;
          let vnpay = `/news/${n.id}/donate/`;
          return (
            <Col xs={12} md={3} key={n.id}>
              <Card className="card">
                <Card.Img variant="top" src={n.image} className="card-img" />
                <Card.Body>
                  <Card.Title className="card-title">{n.name}</Card.Title>
                  <Card.Text className="card-text">{n.content}</Card.Text>
                  <Link to={url} className="card-link">
                    Xem chi tiết
                  </Link>
                  <Link to={vnpay} className="card-link donate-link">
                    Đóng góp
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
