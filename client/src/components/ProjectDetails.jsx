import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import MySpinner from "../layout/MySpinner";
import moment from "moment";
import { Box, InputBase, Typography } from "@mui/material";

const ProjectDetails = () => {
  const [user] = useContext(UserContext);
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [contributor, setContributor] = useState([]);
  const [pay, setPay] = useState({
    projectId: "",
    donateAmount: "",
    note: "",
  });

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
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(""); // Thêm state mới

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("vnpAmount: ", vnpAmount);
    const savedProjectId = localStorage.getItem("selectedProjectId");

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

    // loadProjects();

    const loadProject = async () => {
      try {
        const { data } = await ApiConfig.get(
          endpoints["details-project"](projectId)
        );
        setProject(data);
      } catch (error) {
        console.error("Error loading project:", error);
        setProject([]);
      }
    };

    const loadContributor = async () => {
      try {
        const { data } = await ApiConfig.get(
          endpoints["contributor-post"](projectId)
        );
        setContributor(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadContributor();
    loadProject();
  }, [projectId]);

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

  if (project === null) {
    return <MySpinner />;
  } else if (project.length === 0) {
    return <p>No project data available.</p>;
  }

  return (
    <>
      <h1 className="text-center text-info mt-2">{project.title}</h1>
      <hr />
      <Row>
        <Col>
          <h2 className="text-danger">{project.title}</h2>
          <p>{project.content}</p>
          <hr />
          {project.images.length > 0 && (
            <div className="image-container">
              {project.images.map((image, index) => (
                <img
                  src={image.image}
                  key={index}
                  alt="image"
                  style={{
                    maxWidth: "50%",
                    height: "auto",
                    margin: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
          )}
          <hr />
          <h3>
            {project.startDate
              ? moment(project.startDate).format("DD/MM/YYYY HH:mm")
              : "Không có ngày bắt đầu"}{" "}
            -{" "}
            {project.endDate
              ? moment(project.endDate).format("DD/MM/YYYY HH:mm")
              : "Không có ngày kết thúc"}
          </h3>

          <hr />
          <h4>Danh sách các người đóng góp</h4>
          <ul>
            {contributor.map((c) => (
              <li key={c.id} style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={c.user.profile.avatar}
                  alt="avatar"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "5px",
                  }}
                />
                {c.user.username} - {c.donateAmount} -{" "}
                {moment(c.donateDate).format("DD/MM/YYYY HH:mm")}
              </li>
            ))}
          </ul>
        </Col>
        <Button
          onClick={() => openModal(project.id, project.title)}
          className="card-link donate-link"
          style={{ marginRight: "5px" }}
          variant="primary"
        >
          Đóng góp
        </Button>
      </Row>
      <hr />
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
    </>
  );
};

export default ProjectDetails;
