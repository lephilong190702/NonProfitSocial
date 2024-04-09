import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import MySpinner from "../layout/MySpinner";
import { Header } from "../components";
import { Alert, Card, Col, Row, Button, Modal, Form, ProgressBar } from "react-bootstrap";
import "./projects.css"; // Import CSS file

const ProjectPage = () => {
  const [project, setProject] = useState(null);
  const [pay, setPay] = useState({
    projectId: "",
    donateAmount: "",
    note: "",
  });
  const [q] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        let e = endpoints["project"];
        let cateId = q.get("cateId");

        if (cateId !== null) {
          e = `${e}pcategories/${cateId}`;
        } else {
          let kw = q.get("kw");
          if (kw !== null) e = `${e}?kw=${kw}`;
        }

        let res = await ApiConfig.get(e);
        setProject(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    const payment = async () => {
      const form = new FormData();
      // Append payment data to the form here

      let e = await authApi().post(endpoints["callback"](selectedProjectId), form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };

    if (q.has("vnp_PayDate")) {
      payment();
    }

    loadProject();
  }, [q]);

  const handlePayment = async () => {
    if (selectedProjectId === null) {
      console.error("Chưa chọn dự án để đóng góp.");
      return;
    }

    try {
      // Handle payment submission here
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (projectId, projectTitle) => {
    localStorage.setItem("selectedProjectId", projectId);
    setSelectedProjectId(projectId);
    setSelectedProjectTitle(projectTitle);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
    setShowModal(false);
  };

  if (project === null) return <MySpinner />;
  if (project.length === 0)
    return (
      <>
        <Alert variant="info" className="mt-5">
          Không có dự án nào
        </Alert>
      </>
    );

  return (
    <div className="projects-container">
      <h1 className="page-title">DANH SÁCH DỰ ÁN</h1>
      <Row>
        {project.map((p) => {
          let url = `/projects/${p.id}`;
          const maxContentHeight = 100;
          const content = p.content.length > maxContentHeight ? p.content.substring(0, maxContentHeight) + '...' : p.content;
          const maxTitleHeight = 50;
          const title = p.title.length > maxTitleHeight ? p.title.substring(0, maxTitleHeight) + '...' : p.title;
          
          return (
            <Col xs={12} md={3} key={p.id}>
              <Card className="card">
                <Card.Img variant="top" src={p.images && p.images.length > 0 ? p.images[0].image : ""} className="card-img" />
                <Card.Body>
                  <Card.Title className="card-title">{title}</Card.Title>
                  <Card.Text className="card-text">{content}</Card.Text>
                </Card.Body>
                <Card.Footer className=" flex  bg-[#fff] border-[1px] border-[#DFDFDF]">
                  <Link to={url} className="custom-card-link ">
                    Xem chi tiết
                  </Link>
                  <div>
                    <Button
                      onClick={() => openModal(p.id, p.title)}
                      className="card-link donate-link custom-card-link "
                      style={{ marginRight: "5px" }}
                      variant="primary"
                    >
                      Đóng góp
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProjectTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="donateAmount">
              <Form.Label>Số tiền đóng góp</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số tiền đóng góp"
                value={pay.donateAmount}
                onChange={(e) =>
                  setPay({ ...pay, donateAmount: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="note">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập ghi chú (tuỳ chọn)"
                value={pay.note}
                onChange={(e) => setPay({ ...pay, note: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Xác nhận đóng góp
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectPage;
