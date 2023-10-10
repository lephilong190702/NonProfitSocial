import { useEffect, useState } from "react";
import { Alert, Button, Card, Carousel, Col, Row } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { useSearchParams } from "react-router-dom";
import reactIcon from "../assets/react.svg";
import { Header, Post, Slider } from "../components";
import Footer from "../components/Footer";
import { NewsPage } from ".";
import ProjectPage from "./ProjectPage";

const HomePage = () => {

  return (
    <>
      <NewsPage />
      <ProjectPage />
      {/* <h1 className="text-center text-info">DANH SÁCH TIN TỨC</h1>
      <Row>
        {news.map((n) => {
          return (
            <>
              <Col xs={12} md={3} className="2">
                <Card>
                  <Card.Img variant="top" src="{p.image}" />
                  <Card.Body>
                    <Card.Title>{n.name}</Card.Title>
                    <Card.Text>{n.content}</Card.Text>
                    <Button variant="primary">Xem chi tiết</Button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          );
        })}
      </Row> */}
      {/* <Slider /> */}
      {/* <Post /> */}
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
