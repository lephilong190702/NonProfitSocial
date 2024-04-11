import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// import ApiConfig, { authApi, endpoints } from "../../../../configs/ApiConfig";
// import MySpinner from "../../../../layout/MySpinner";
// import { Header } from "../../../../components";
import {
  Alert,
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  ProgressBar,
} from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../../../../configs/ApiConfig";
import MySpinner from "../../../../layout/MySpinner";
import "./projects.css"; // Import CSS file

const ProjectsList = () => {
  const [project, setProject] = useState(null);
  const [pay, setPay] = useState({
    projectId: "",
    donateAmount: "",
    note: "",
  });
  const [q] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const currentURL = window.location.href;
  const urlParams = new URLSearchParams(currentURL);
  const url = new URL(currentURL);
  const vnpAmount = url.searchParams.get("vnp_Amount");
  const vnpBankCode = urlParams.get("vnp_BankCode");
  const vnpBankTranNo = urlParams.get("vnp_BankTranNo");
  const vnpCardType = urlParams.get("vnp_CardType");
  const vnpOrderInfo = urlParams.get("vnp_OrderInfo");
  const vnpPayDate = urlParams.get("vnp_PayDate");
  const vnpResponseCode = urlParams.get("vnp_ResponseCode");
  const vnpTmnCode = urlParams.get("vnp_TmnCode");
  const vnpTransactionNo = urlParams.get("vnp_TransactionNo");
  const vnpTransactionStatus = urlParams.get("vnp_TransactionStatus");
  const vnpTxnRef = urlParams.get("vnp_TxnRef");
  const vnpSecureHash = urlParams.get("vnp_SecureHash");
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");
  const [displayedProjects, setDisplayedProjects] = useState(4);

  useEffect(() => {
    console.log("vnpAmount: ", vnpAmount);
    const savedProjectId = localStorage.getItem("selectedProjectId");

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

    // const handleLoadMore = () => {
    //   setDisplayedProjects((prev) => prev + 4);
    // };

    // const openModal = (projectId, projectTitle) => {
    //   localStorage.setItem("selectedProjectId", projectId);
    //   setSelectedProjectId(projectId);
    //   setSelectedProjectTitle(projectTitle);
    //   setShowModal(true);
    // };

    // const closeModal = () => {
    //   setSelectedProjectId(null);
    //   setShowModal(false);
    // };

    const payment = async () => {
      const form = new FormData();
      form.append("vnp_Amount", vnpAmount);
      form.append("vnp_BankCode", vnpBankCode);
      form.append("vnp_BankTranNo", vnpBankTranNo);
      form.append("vnp_CardType", vnpCardType);
      form.append("vnp_OrderInfo", vnpOrderInfo);
      form.append("vnp_PayDate", vnpPayDate);
      form.append("vnp_ResponseCode", vnpResponseCode);
      form.append("vnp_SecureHash", vnpSecureHash);
      form.append("vnp_TmnCode", vnpTmnCode);
      form.append("vnp_TransactionNo", vnpTransactionNo);
      form.append("vnp_TransactionStatus", vnpTransactionStatus);
      form.append("vnp_TxnRef", vnpTxnRef);

      let e = await authApi().post(
        endpoints["callback"](savedProjectId),
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    };

    if (urlParams.has("vnp_PayDate")) {
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
      const formData = new FormData();
      formData.append("projectId", selectedProjectId);
      formData.append("donateAmount", pay.donateAmount);
      formData.append("note", pay.note);
      let res = await authApi().post(
        endpoints["vn-pay"](selectedProjectId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const redirectUrl = res.data;
      console.log(res.data);

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.error("Không có đường dẫn trả về từ server.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    setDisplayedProjects((prev) => prev + 4);
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
        {project.slice(0, displayedProjects).map((p) => {
          let url = `/projects/${p.id}`;

          const maxContentHeight = 100;
          const content =
            p.content.length > maxContentHeight
              ? p.content.substring(0, maxContentHeight) + "..."
              : p.content;

          const maxTitleHeight = 50;
          const title =
            p.title.length > maxTitleHeight
              ? p.title.substring(0, maxTitleHeight) + "..."
              : p.title;

          return (
            <Col xs={12} md={3} key={p.id}>
              <Card className="card">
                <Link to={url} className="nav-link">
                  <Card.Img
                    variant="top"
                    src={
                      p.images && p.images.length > 0 ? p.images[0].image : ""
                    }
                    className="card-img"
                  />
                  <Card.Body>
                    <Card.Title className="card-title">{title}</Card.Title>
                    <Card.Text className="card-text">{content}</Card.Text>
                    <Card.Footer>
                      Số tiền đã quyên góp: {p.contributedAmount}
                    </Card.Footer>
                    <Card.Footer>
                      Số tiền cần quyên góp: {p.totalAmount}
                    </Card.Footer>
                    <ProgressBar
                      now={(p.contributedAmount / p.totalAmount) * 100}
                    />
                    <hr />
                    <div className="basis-1/4 flex flex-row justify-between pb-3">
                      <div className="py-1 pr-3">
                        <Link
                          onClick={() => openModal(p.id, p.title)}
                          className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
                          style={{ marginRight: "5px" }}
                          variant="primary"
                        >
                          Đóng góp
                        </Link>
                      </div>
                    </div>
                    {/* <Link to={url} className="card-link">
                    Xem chi tiết
                  </Link> */}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
      {displayedProjects < project.length && (
        <div className="text-center mt-4">
          <Link
            variant="primary"
            onClick={handleLoadMore}
            className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-8 py-2 hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
          >
            Xem Thêm
          </Link>
        </div>
      )}
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

export default ProjectsList;
