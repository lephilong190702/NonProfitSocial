import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import { Link, useNavigate } from "react-router-dom";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { UserContext } from "../App";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import JSZip from "jszip";

const CustomNavbar = () => {
  const [user, dispatch] = useContext(UserContext);
  const [newsCategory, setNewsCategory] = useState([]);
  const [projectCategory, setProjectCategory] = useState([]);
  const [kw, setKw] = useState("");
  const [stats, setStats] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        let res = await ApiConfig.get(endpoints["newsCategory"]);
        setNewsCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const loadProjects = async () => {
      try {
        let res = await ApiConfig.get(endpoints["projectCategory"]);
        setProjectCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadProjects();
    loadNews();
  }, []);

  const exportFinancialReport = async () => {
    try {
      const response = await ApiConfig.get(endpoints["statistic"], {
        responseType: "arraybuffer",
      });
  
      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "financial_report.xlsx");
    } catch (error) {
      console.error(error);
    }
  };

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
  if (projectCategory.length === 0) return <MySpinner />;
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
              {projectCategory.length > 0 &&
                projectCategory.map((c) => {
                  let h = `/projects/?cateId=${c.id}`;
                  return (
                    <Link to={h} className="dropdown-item" key={c.id}>
                      {c.name}
                    </Link>
                  );
                })}
            </NavDropdown>

            <Nav.Link href="#financial_report" onClick={exportFinancialReport}>
              Báo cáo tài chính
            </Nav.Link>

            <Link to="/social" className="nav-link">
              Mạng xã hội
            </Link>

            <NavDropdown title="Tin tức" id="basic-nav-dropdown">
              {newsCategory.length > 0 &&
                newsCategory.map((c) => {
                  let h = `/news/?cateId=${c.id}`;
                  return (
                    <Link to={h} className="dropdown-item" key={c.id}>
                      {c.name}
                    </Link>
                  );
                })}
            </NavDropdown>

            <Link to="/registerVol" className="nav-link">
              Liên hệ
            </Link>

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

        <Form onSubmit={search} inline className="d-flex">
          <Form.Control
            type="search"
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="Nhập từ khóa..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success" type="submit">
            Tìm
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
