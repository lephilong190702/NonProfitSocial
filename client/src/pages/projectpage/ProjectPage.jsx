import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ApiConfig, { authApi, endpoints } from "../../configs/ApiConfig";
import MySpinner from "../../layout/MySpinner";
import { Header } from "../../components";
import {
  Alert,
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  ProgressBar,
  Pagination,
} from "react-bootstrap";
import { Box, InputBase, Typography } from "@mui/material";

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
  const [currentPage, setCurrentPage] = useState(1);

  const [errorMessage, setErrorMessage] = useState("");

  const projectsPerPage = 4;

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
    
    if (!pay.donateAmount.trim()) {
      setErrorMessage("Vui lòng nhập số tiền đóng góp.");
      return;
    }

    const donationAmount = parseFloat(pay.donateAmount);
    console.log(donationAmount);
    if (
      donationAmount > 1000000000 ||
      donationAmount < 10000
    ) {
      setErrorMessage(
        "Số tiền đóng góp không được vượt quá 1 tỷ và thấp hơn 10000."
      );
      console.log(errorMessage);
      return;
    }

    try {
      setErrorMessage("");
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

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = project.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(project.length / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

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
        {currentProjects.map((p) => {
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
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            onClick={() => paginate(number)}
            active={number === currentPage}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(project.length / projectsPerPage)}
        />
        <Pagination.Last
          onClick={() =>
            paginate(Math.ceil(project.length / projectsPerPage))
          }
        />
      </Pagination>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <div className="text-xl text-center font-bold">
            {selectedProjectTitle}
          </div>
        </Modal.Header>
        <Modal.Body>
          <Box
            style={{ padding: 0 }}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-col">
                <Typography className="flex">Số tiền đóng góp</Typography>
                <InputBase
                  required
                  type="number"
                  className="border p-2"
                  placeholder="Nhập số tiền đóng góp"
                  value={pay.donateAmount}
                  onChange={(e) => {
                    setPay({ ...pay, donateAmount: e.target.value });
                    setErrorMessage("");
                  }}
                />
                {errorMessage && (
                  <Form.Text className="text-danger">{errorMessage}</Form.Text>
                )}
              </div>

              <div className="flex flex-col">
                <Typography className="mt-2">Ghi chú</Typography>
                <InputBase
                  className="border p-2"
                  placeholder="Nhập ghi chú (tuỳ chọn)"
                  value={pay.note}
                onChange={(e) => setPay({ ...pay, note: e.target.value })}
                />
              </div>
            </div>
          </Box>
          {/* <div>
            <p>Số tiền đóng góp</p>
            <Input placeholder="Nhập số tiền đóng góp" className=""></Input>
          </div>
          <div className="mt-3">
            <p>Ghi chú</p>
            <Input placeholder="Nhập ghi chú (tuỳ chọn)" className=""></Input>
          </div> */}
          {/*  <Form style={{ padding: 0 }} className="absolute left-5">
            <Form.Group className="" controlId="donateAmount">
              <Form.Label>Số tiền đóng góp</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số tiền đóng góp"
                value={pay.donateAmount}
                onChange={(e) => {
                  setPay({ ...pay, donateAmount: e.target.value });
                  setErrorMessage("");
                }}
              />
              {errorMessage && (
                <Form.Text className="text-danger">{errorMessage}</Form.Text>
              )}
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
          </Form>*/}
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
