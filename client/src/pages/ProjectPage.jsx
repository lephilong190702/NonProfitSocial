import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../configs/ApiConfig";
import MySpinner from "../layout/MySpinner";
import { Header } from "../components";
import { Alert, Card, Col, Row, Button, Modal, Form } from "react-bootstrap";

const ProjectPage = () => {
  const [project, setProject] = useState([]);
  const [pay, setPay] = useState({
    projectId: "",
    donateAmount: "",
    note: "",
  });
  const [q] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    let loadProject = async () => {
      try {
        let e = endpoints["project"];

        let cateId = q.get("cateId");
        if (cateId !== null) e = `${e}pcategories/${cateId}/`;
        else {
          let kw = q.get("kw");
          if (kw !== null) e = `${e}?kw=${kw}`;
        }

        let res = await authApi().get(e);
        setProject(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadProject();
  }, [q]);

  const handlePayment = async () => {
    if (selectedProjectId === null) {
      console.error("Chưa chọn dự án để đóng góp.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("projectId", selectedProjectId);
      formData.append("donateAmount", pay.donateAmount);
      formData.append("note", pay.note);

      let res = await authApi().post(endpoints["vn-pay"](selectedProjectId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const redirectUrl = res.data;
      console.log(res);

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.error("Không có đường dẫn trả về từ server.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (projectId) => {
    setSelectedProjectId(projectId); 
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
        <Header />
        <Alert variant="info" className="mt-5">
          Không có tin tức nào
        </Alert>
      </>
    );

  return (
    <>
      <h1 className="text-center text-info">DANH SÁCH DỰ ÁN</h1>
      <Row>
        {project.map((p) => {
          let url = `/projects/${p.id}`;
          return (
            <Col xs={12} md={3} key={p.id}>
              <Card>
              <Card.Img variant="top" src={p.images && p.images.length > 0 ? p.images[0].image : ""} />
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>{p.content}</Card.Text>
                  <Card.Footer>Số tiền đã quyên góp: {p.contributedAmount}</Card.Footer>
                  <Card.Footer>Số tiền đã quyên góp: {p.totalAmount}</Card.Footer>

                  <Link
                    to={url}
                    className="btn btn-info"
                    style={{ marginRight: "5px" }}
                    variant="primary"
                  >
                    Xem chi tiết
                  </Link>
                  <Button
                    onClick={() => openModal(p.id)}
                    className="btn btn-info btn-danger"
                    style={{ marginRight: "5px" }}
                    variant="primary"
                  >
                    Đóng góp
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đóng góp</Modal.Title>
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
    </>
  );
};

export default ProjectPage;
