import { useEffect, useState } from "react";
import { Button, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import MySpinner from "./MySpinner";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [newsCategory, setNewsCategory] = useState(null) ;
    const [kw, setKw] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const loadNews = async () => {
            // let res = await fetch("http://localhost:9090/api/ncategories/");
            // let data = await res.json();
            let res = await ApiConfig.get(endpoints['newsCategory']);

            setNewsCategory(res.data);
        }

        loadNews();

    }, [])

    const search = (evt) => {
        evt.preventDefault();
        nav(`/?kw=${kw}`);
    }

    if (newsCategory === null)
        return <MySpinner />

    return (
       <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Quỹ từ thiện</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Trang chủ</Nav.Link>

                        <NavDropdown title="Dự án" id="basic-nav-dropdown">
                        {newsCategory.map(c => <NavDropdown.Item href="#action/3.1" key={c.id}>{c.name}</NavDropdown.Item>)}
                        
                        </NavDropdown>

                        <NavDropdown title="Đóng góp" id="basic-nav-dropdown">
                        {newsCategory.map(c => <NavDropdown.Item href="#action/3.1" key={c.id}>{c.name}</NavDropdown.Item>)}
                        
                        </NavDropdown>

                        <Nav.Link href="#">Báo cáo tài chính</Nav.Link>

                        <Nav.Link href="#">Mạng xã hội</Nav.Link>

                        <NavDropdown title="Tin tức" id="basic-nav-dropdown">
                        {newsCategory.map(c => <NavDropdown.Item href="#action/3.1" key={c.id}>{c.name}</NavDropdown.Item>)}
                        
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>

                    <Form onSubmit={search} className="d-flex">
                        <Form.Control
                            type="search"
                            value={kw}
                            onChange={e => setKw(e.target.value)}
                            placeholder="Nhập từ khóa..."
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Tìm</Button>
                    </Form>
                </Container>
            </Navbar>
       </>
    )
}

export default Header;