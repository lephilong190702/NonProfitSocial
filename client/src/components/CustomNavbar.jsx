import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import { Link, useNavigate } from "react-router-dom";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { UserContext } from "../App";

const CustomNavbar = () => {
  const [user, dispatch] = useContext(UserContext);
  const [newsCategory, setNewsCategory] = useState([]);
  const [kw, setKw] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      // let res = await fetch("http://localhost:9090/api/ncategories/");
      // let data = await res.json();
      try {
        let res = await ApiConfig.get(endpoints["newsCategory"]);

        setNewsCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadNews();
  }, []);

  const search = (evt) => {
    evt.preventDefault();
    nav(`/?kw=${kw}`);
  };

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };

  if (newsCategory.length === 0) return <MySpinner />;
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Quỹ từ thiện</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Trang chủ
            </Link>

            <NavDropdown title="Dự án" id="basic-nav-dropdown">
              {newsCategory.length > 0 &&
                newsCategory.map((c) => {
                  let h = `/?cateId=${c.id}`;
                  return (
                    <Link to={h} className="dropdown-item" key={c.id}>
                      {c.name}
                    </Link>
                  );
                })}
            </NavDropdown>

            <NavDropdown title="Đóng góp" id="basic-nav-dropdown">
              {newsCategory.map((c) => (
                <NavDropdown.Item href="#contribution" key={c.id}>
                  {c.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link href="#financial_report">Báo cáo tài chính</Nav.Link>

            <Nav.Link href="#social">Mạng xã hội</Nav.Link>

            <NavDropdown title="Tin tức" id="basic-nav-dropdown">
              {newsCategory.map((c) => (
                <NavDropdown.Item href="#news" key={c.id}>
                  {c.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Link to="/registerVol" className="nav-link">Liên hệ</Link>
            
            {user === null ? (
              <>
                <Link to="/login" className="text-danger nav-link">
                  Đăng nhập
                </Link>
                <Link to="/register" className="text-danger nav-link">
                  Đăng ký
                </Link>
              </>
            ) : (
              <>
                <Link to="/userProfile" className="text-danger nav-link">
                  Chào {user.username}!
                </Link>
                <Button variant="secondary" onClick={logout}>
                  Đăng xuất
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        <Form onSubmit={search} className="d-flex">
          <Form.Control
            type="search"
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="Nhập từ khóa..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Tìm</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
