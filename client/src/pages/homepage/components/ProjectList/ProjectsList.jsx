import React, { useContext, useEffect, useState } from "react";
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
// import { Button, Checkbox, Form, Input } from 'antd';
import "./projects.css"; // Import CSS file
import {
  Box,
  Grid,
  Input,
  InputBase,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { SpaceBar } from "@material-ui/icons";
import { UserContext } from "../../../../App";

const ProjectsList = () => {
  const [user] = useContext(UserContext);
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

  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");
  const [displayedProjects, setDisplayedProjects] = useState(4);

  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState(null);
  const [orderInfo, setOrderInfo] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
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
        console.log("PROJECT: " + res.data);
        setProject(res.data);

        res.data.forEach((p) => loadProjectImages(p.id));
      } catch (ex) {
        console.error(ex);
      }
    };

    const loadProjectImages = async (projectId) => {
      try {
        const { data } = await ApiConfig.get(endpoints["images"](projectId));
        setImages((prevImages) => ({
          ...prevImages,
          [projectId]: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    loadProject();
  }, [q]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedProjectId === null) {
      console.error("Chưa chọn dự án để đóng góp.");
      return;
    }

    if (amount === null) {
      setErrorMessage("Vui lòng nhập số tiền đóng góp.");
      return;
    }

    const donationAmount = parseFloat(amount);
    console.log(donationAmount);
    if (donationAmount > 1000000000 || donationAmount < 10000) {
      setErrorMessage(
        "Số tiền đóng góp không được vượt quá 1 tỷ và thấp hơn 10000."
      );
      console.log(errorMessage);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("orderInfo", orderInfo);

      const response = await authApi().post(
        endpoints["donate"](selectedProjectId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const vnpayUrl = response.data;
      window.location.href = vnpayUrl;

      console.log("VNPAY" + vnpayUrl);
    } catch (error) {
      console.error("Error submitting order:", error);
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

  const handleValueChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue.replace(/,/g, ""));
    if (isNaN(numericValue)) {
      setErrorMessage("Vui lòng nhập một số hợp lệ");
      setAmount(inputValue);
    } else {
      setErrorMessage("");
      setAmount(numericValue);
    }
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

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
                      images[p.id] && images[p.id].length > 0
                        ? images[p.id][0].image // Sử dụng hình ảnh đầu tiên theo projectId từ đối tượng images
                        : "" // Nếu không có hình ảnh, sử dụng một giá trị rỗng
                    }
                    className="card-img"
                  />
                  <Card.Body>
                    <Card.Title className="card-title">{title}</Card.Title>
                    <Card.Text className="card-text">{content}</Card.Text>
                    <Card.Footer>
                      Số tiền đã quyên góp:{" "}
                      {formatter.format(p.contributedAmount)}
                    </Card.Footer>
                    <Card.Footer>
                      Số tiền cần quyên góp: {formatter.format(p.totalAmount)}
                    </Card.Footer>
                    <ProgressBar
                      now={(p.contributedAmount / p.totalAmount) * 100}
                    />
                    <hr />

                    <div className="basis-1/4 flex flex-row justify-between pb-3">
                      <div className="py-1 pr-3">
                        {user ? (
                          <>
                            {p.contributedAmount < p.totalAmount && (
                              <Link
                                onClick={() => openModal(p.id, p.title)}
                                className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
                                style={{ marginRight: "5px" }}
                                variant="primary"
                              >
                                Đóng góp
                              </Link>
                            )}
                            {p.contributedAmount >= p.totalAmount && (
                              <Link
                                // onClick={() => openModal(p.id, p.title)}
                                to={url}
                                className="custom-card-link font-semibold text-[#fff] bg-[#86bb86]  shadow-md shadow-[#86bb86] text-[13px] border-2 px-1 py-2  hover:bg-[#49B949] hover:text-[#fff] hover:shadow-md hover:shadow-[#49B949]"
                                style={{ marginRight: "5px" }}
                                variant="primary"
                              >
                                ĐÃ HOÀN THÀNH
                              </Link>
                            )}
                          </>
                        ) : (
                          <Link to="/login">Đăng nhập để quyên góp</Link>
                        )}
                        {/* {p.contributedAmount < p.totalAmount && (
                          <Link
                            onClick={() => openModal(p.id, p.title)}
                            className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
                            style={{ marginRight: "5px" }}
                            variant="primary"
                          >
                            Đóng góp
                          </Link>
                        )}
                        {p.contributedAmount >= p.totalAmount && (
                          <Link
                            // onClick={() => openModal(p.id, p.title)}
                            to={url}
                            className="custom-card-link font-semibold text-[#fff] bg-[#86bb86]  shadow-md shadow-[#86bb86] text-[13px] border-2 px-1 py-2  hover:bg-[#49B949] hover:text-[#fff] hover:shadow-md hover:shadow-[#49B949]"
                            style={{ marginRight: "5px" }}
                            variant="primary"
                          >
                            ĐÃ HOÀN THÀNH
                          </Link>
                        )} */}
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
          <div className="text-xl text-center font-bold">
            {selectedProjectTitle}
          </div>
        </Modal.Header>
        <Modal.Body>
          <Box
            style={{ padding: 0 }}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-col">
                <Typography className="flex">Số tiền đóng góp</Typography>
                <CurrencyTextField
                  required
                  variant="standard"
                  className=" p-2 w-70sh ml-90"
                  placeholder="Nhập số tiền đóng góp"
                  currencySymbol="VNĐ"
                  sx={{ marginLeft: "0px" }}
                  onChange={handleValueChange}
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
                  sx={{ marginLeft: "5px" }}
                  // value={pay.note}
                  onChange={(e) => setOrderInfo(e.target.value)}
                />
              </div>
            </div>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Xác nhận đóng góp
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectsList;
