import React, { useEffect, useState } from "react";
import MySpinner from "../../layout/MySpinner";
import ApiConfig, { endpoints } from "../../configs/ApiConfig";
import { Alert, Card, Col, Row, Pagination } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
// import { Header } from "../components";
import "./news.css";

const NewsPage = () => {
  const [news, setNews] = useState(null);
  const [q] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;

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

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(news.length / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="news-container">
      <h1 className="page-title">DANH SÁCH TIN TỨC</h1>
      <Row>
        {currentNews.map((n) => {
          const maxContentHeight = 100;
          const content =
            n.content.length > maxContentHeight
              ? n.content.substring(0, maxContentHeight) + "..."
              : n.content;

          const maxTitleHeight = 50;
          const title =
            n.name.length > maxTitleHeight
              ? n.name.substring(0, maxTitleHeight) + "..."
              : n.name;
          const url = `/news/${n.id}`;
          return (
            <Col xs={12} md={3} key={n.id}>
              <Card className="custom-card">
                <Card.Img variant="top" src={n.image} className="card-img" />
                <Card.Body>
                  <Card.Title className="card-title">{title}</Card.Title>
                  <Card.Text className="card-text">{content}</Card.Text>
                  <Link to={url} className="custom-card-link">
                    Xem chi tiết
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {pageNumbers.map((number) => {
          if (number === 1 || number === currentPage || number === Math.ceil(news.length / newsPerPage)) {
            return (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => paginate(number)}
              >
                {number}
              </Pagination.Item>
            );
          } else if (number === currentPage - 1 || number === currentPage + 1) {
            return (
              <Pagination.Ellipsis key={number} disabled />
            );
          }
          return null;
        })}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(news.length / newsPerPage)} />
        <Pagination.Last onClick={() => paginate(Math.ceil(news.length / newsPerPage))} />
      </Pagination>
    </div>
  );
};

export default NewsPage;
