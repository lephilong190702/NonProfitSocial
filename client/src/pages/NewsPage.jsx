import React, { useEffect, useState } from "react";
import MySpinner from "../layout/MySpinner";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../components";

const NewsPage = () => {
  const [news, setNews] = useState(null);
  const [q] = useSearchParams();

  useEffect(() => {
    let loadNews = async () => {
      try {
        let e = endpoints["news"];

        let cateId = q.get("cateId");
        if (cateId !== null) e = `${e}?cateId=${cateId}`;
        else {
          let kw = q.get("kw");
          if (kw !== null) e = `${e}?kw=${kw}`;
        }

        let res = await ApiConfig.get(e);
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
      <Alert variant="info" className="mt-5">
        Không có tin tức nào
      </Alert>
    );

  return (
    <>
    <Header />
      <h1 className="text-center text-info">DANH SÁCH TIN TỨC</h1>
      <Row>
        {news.map((n) => {
          let url = `/news/${n.cateId}/${n.id}`;
          return (
            <>
              <Col xs={12} md={3} className="2">
                <Card>
                  <Card.Img variant="top" src="{p.image}" />
                  <Card.Body>
                    <Card.Title>{n.name}</Card.Title>
                    <Card.Text>{n.content}</Card.Text>
                    <Link to={url} className="btn btn-info" style={{marginRight: "5px"}} variant="primary">Xem chi tiết</Link>
                  </Card.Body>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
};

export default NewsPage;
