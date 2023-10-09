import { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { useSearchParams } from "react-router-dom";

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
      <section id="home" className="hero-block">
        <Carousel>
          <Carousel.Item>
            <ExampleCarouselImage text="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage text="Second slide" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage text="Third slide" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  );
};

export default Home;
