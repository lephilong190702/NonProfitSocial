import React, { useEffect, useState } from "react";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import "./OutsideNews.css";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

const OutsideNews = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await ApiConfig.get(endpoints["other-news"]);
        setNewsItems(response.data);
      } catch (error) {
        console.error('Error fetching news items:', error);
      }
    };

    fetchNewsItems();
  }, []);

  return (
    <>
      <div className="news-container">
        <h1 className="page-title">DANH SÁCH TIN TỨC</h1>
        <Row>
          {newsItems.map((item, index) => {
            const maxContentHeight = 100;
            const content =
              item.content.length > maxContentHeight
                ? item.content.substring(0, maxContentHeight) + "..."
                : item.content;
            const maxTitleHeight = 50;
            const title =
              item.title.length > maxTitleHeight
                ? item.title.substring(0, maxTitleHeight) + "..."
                : item.title;
            return (
              <Col xs={12} md={3} key={index}>
                <Card className="custom-card">
                  <Link to={item.url}>
                    <Card.Img variant="top" src={item.imageUrl} className="card-img" />
                  </Link>
                  <Card.Body>
                    <Card.Title className="card-title">{title}</Card.Title>
                    <Card.Text className="card-text">{content}</Card.Text>
                    <Link to={item.url} className="custom-card-link">
                      Xem chi tiết
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default OutsideNews;
