import { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { useSearchParams } from "react-router-dom";
import reactIcon from "../assets/react.svg";

const Home = () => {
  const [news, setNews] = useState(null);
  const [q] = useSearchParams();

  useEffect(() => {
    let loadNews = async () => {
      try {
        let e = endpoints["news"];

        let kw = q.get("kw");
        if (kw !== null) e = `${e}?kw=${kw}`;

        let res = await ApiConfig.get(e);
        setNews(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadNews();
  }, [q]);

  if (news === null) return <MySpinner />;

  return (
    <>
      <h1 className="text-center text-info">DANH SÁCH TIN TỨC</h1>
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
      </Row>
      
    </>
  );
};

export default Home;
