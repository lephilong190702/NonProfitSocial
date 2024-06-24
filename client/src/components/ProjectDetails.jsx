import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import MySpinner from "../layout/MySpinner";
import moment from "moment";
import { Box, InputBase, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookMessenger,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import "./projectDetail.css";
import GoogleMapProject from "./googleMap/GoogleMapProject";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const ProjectDetails = () => {
  const [user] = useContext(UserContext);
  const nav = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [contributor, setContributor] = useState([]);
  const [addressRecommended, setAddressRecommended] = useState({
    latitude: "",
    longitude: "",
    name: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showModelAddress, setShowModalAddress] = useState(false);
  const [showDonateItemModal, setShowDonateItemModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const currentURL = window.location.href;
  const urlParams = new URLSearchParams(currentURL);
  const url = new URL(currentURL);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [address, setAddress] = useState([]);
  const [images, setImages] = useState([]);

  const [errorLat, setErrorLat] = useState("");
  const [errorLng, setErrorLng] = useState("");
  const [errorName, setErrorName] = useState("");

  const [success, setSuccess] = useState("");

  const [amount, setAmount] = useState(null);
  const [donateItem, setDonateItem] = useState(null);
  const [addressDelivery, setAddressDelivery] = useState(null);
  const [orderInfo, setOrderInfo] = useState("");

  const [errDonateItem, setErrDonateItem] = useState(null);
  const [errAddressDelivery, setErrAddressDelivery] = useState(null);

  const [feedbackName, setFeedbackName] = useState(null);
  const [feedbackPhone, setFeedbackPhone] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [errFeedbackName, setErrFeedbackName] = useState(null);
  const [errFeedbackPhone, setErrFeedbackPhone] = useState(null);
  const [errFeedback, setErrFeedback] = useState(null);

  const currentPageUrl = window.location.href;

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data } = await ApiConfig.get(
          endpoints["details-project"](projectId)
        );
        setProject(data);
        console.log(project);
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

    const loadAddressProject = async () => {
      try {
        const { data } = await ApiConfig.get(
          endpoints["address-project"](projectId)
        );
        setAddress(data);
      } catch (error) {
        console.log(error);
      }
    };

    const loadProjectImages = async () => {
      try {
        const { data } = await ApiConfig.get(endpoints["images"](projectId));
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadAddressProject();
    loadContributor();
    loadProject();
    loadProjectImages();
  }, [projectId]);

  const handleAddressProject = async () => {
    const data = {
      latitude: addressRecommended.latitude,
      longitude: addressRecommended.longitude,
      name: addressRecommended.name,
    };

    if (!addressRecommended.latitude.trim()) {
      setErrorLat("Vui lòng nhập latitude");
    }

    if (!addressRecommended.longitude.trim()) {
      setErrorLng("Vui lòng nhập longitude");
    }

    if (!addressRecommended.name.trim()) {
      setErrorName("Vui lòng nhập ghi chú");
      return;
    }

    try {
      const res = await authApi().post(
        endpoints["post-address"](selectedProjectId),
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Gửi địa chỉ thành công");
      setTimeout(() => {
        setSuccess("");
        nav("/projects-map");
      }, 2000);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        endpoints["donate"](projectId),
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

  const handleSubmitDonateItem = async (event) => {
    event.preventDefault();
    if (selectedProjectId === null) {
      console.error("Chưa chọn dự án để đóng góp.");
      return;
    }

    // if (amount === null) {
    //   setErrorMessage("Vui lòng nhập số tiền đóng góp.");
    //   return;
    // }

    if (donateItem === null) {
      setErrDonateItem("Vui lòng nhập hiện vật cần đóng góp.");
      return;
    }

    if (addressDelivery === null) {
      setErrAddressDelivery("Vui lòng nhập địa chỉ cần giao hàng.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("donateItem", donateItem);
      formData.append("address", addressDelivery);
      formData.append("orderInfo", orderInfo);

      const response = await authApi().post(
        endpoints["donate-item"](projectId),
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Gửi địa chỉ thành công");
      setTimeout(() => {
        setSuccess("");
        nav("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    // if (selectedProjectId === null) {
    //   console.error("Chưa chọn dự án để đóng góp.");
    //   return;
    // }


    if (feedbackName === null) {
      setErrFeedbackName("Vui lòng nhập tên người phản hồi.");
      return;
    }
    
    if (!isValidPhoneNumber(feedbackPhone)) {
      setErrFeedbackPhone('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
      return;
    }
    
    if (feedback === null) {
      setErrFeedback("Vui lòng nhập nội dung cần phản hồi.");
      return;
    }


    try {
      const formData = new FormData();
      formData.append("name", feedbackName);
      formData.append("phone", feedbackPhone);
      formData.append("feedback", feedback);

      const response = await ApiConfig.post(
        endpoints["feedback-project"](projectId),
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Gửi phản hồi thành công");
      setTimeout(() => {
        setSuccess("");
        nav("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const openModal = (projectId, projectTitle) => {
    localStorage.setItem("selectedProjectId", projectId);
    setSelectedProjectId(projectId);
    setSelectedProjectTitle(projectTitle);
    setShowModal(true);
  };

  const openDonateItemModal = (projectId, projectTitle) => {
    localStorage.setItem("selectedProjectId", projectId);
    setSelectedProjectId(projectId);
    setSelectedProjectTitle(projectTitle);
    setShowDonateItemModal(true);
  };

  const openFeedbackModal = (projectId, projectTitle) => {
    localStorage.setItem("selectedProjectId", projectId);
    setSelectedProjectId(projectId);
    setSelectedProjectTitle(projectTitle);
    setShowFeedbackModal(true);
  };

  const openProposeAddress = (projectId, projectTitle) => {
    localStorage.setItem("selectedProjectId", projectId);
    setSelectedProjectId(projectId);
    setSelectedProjectTitle(projectTitle);
    setShowModalAddress(true);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
    setShowModal(false);
  };

  const closeDonateItemModal = () => {
    setSelectedProjectId(null);
    setShowDonateItemModal(false);
  };

  const closeFeedbackModal = () => {
    setSelectedProjectId(null);
    setShowFeedbackModal(false);
  };

  const closeModalAddress = () => {
    setSelectedProjectId(null);
    setShowModalAddress(false);
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

  const isValidPhoneNumber = (phoneNumber) => {
    const vietnamPhoneNumberRegex = /^(0[1-9])+([0-9]{8})$/;
    return vietnamPhoneNumberRegex.test(phoneNumber);
  };

  if (project === null) {
    return <MySpinner />;
  } else if (project.length === 0) {
    return <p>No project data available.</p>;
  }

  return (
    <>
      <Row>
        <Col>
          <div>
            <div className="max-w-screen-5xl px-36 py-10 ">
              <div className="flex flex-row gap-16 pb-20">
                <div className="basis-2/3 flex flex-row gap-7 select-none">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col h-full w-full">
                      {images.length > 0 && (
                        <div className="image-container">
                          {images.map((image, index) => (
                            <img
                              src={image.image}
                              key={index}
                              alt="image"
                              className="project-image"
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex flex-row justify-between items-center pt-2">
                        <div className="flex flex-row gap-1 items-center">
                          <div className="text-base font-normal pr-2">
                            Chia sẻ:
                          </div>
                          <FacebookShareButton url={currentPageUrl}>
                            <FacebookIcon />
                          </FacebookShareButton>
                          <FacebookMessengerShareButton url={currentPageUrl}>
                            <FacebookMessengerIcon />
                          </FacebookMessengerShareButton>
                          <TwitterShareButton url={currentPageUrl}>
                            <TwitterIcon />
                          </TwitterShareButton>
                          <TelegramShareButton url={currentPageUrl}>
                            <TelegramIcon className="text-[29px] cursor-pointer" />
                          </TelegramShareButton>
                        </div>
                        <div className="flex flex-row gap-4 cursor-pointer">
                          <div className="w-full font-semibold text-[#F16D9A] text-[14px] hover:text-[#EE5287]">
                            <div fixedWidth className="pr-1 text-[16px]">
                              {project.startDate
                                ? moment(project.startDate).format(
                                    "DD/MM/YYYY HH:mm"
                                  )
                                : "Không có ngày bắt đầu"}{" "}
                              - <br />
                              {project.endDate
                                ? moment(project.endDate).format(
                                    "DD/MM/YYYY HH:mm"
                                  )
                                : "Không có ngày kết thúc"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col basis-1/3">
                  <h1 className="font-bold text-[28px]  text-[#38b6ff]">
                    {project.title}
                  </h1>
                  <p className="font-semibold text-[#868686] pt-3 leading-6 text-lg">
                    {project.content.split(".").map((paragraph, index) => (
                      <React.Fragment key={index}>
                        {paragraph.trim()}
                        {index !== project.content.split(".").length - 1 && (
                          <>
                            <br />
                            <br />
                          </>
                        )}{" "}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <h4>Danh sách các người đóng góp: </h4>
            <ul>
              {contributor.map((c) => (
                <li
                  key={c.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
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
                  {c.user.username} - {formatter.format(c.donateAmount)} -{" "}
                  {moment(c.donateDate).format("DD/MM/YYYY HH:mm")}
                </li>
              ))}
            </ul>
          </div>
        </Col>
        {user ? (
          <div className="flex-col justify-center">
            <div className="flex flex-row justify-center">
              <button
                onClick={() => openModal(project.id, project.title)}
                className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-2 py-1  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
                style={{ marginRight: "5px", height: "50px" }}
                variant="primary"
              >
                Đóng góp hiện kim
              </button>
              <button
                onClick={() => openDonateItemModal(project.id, project.title)}
                className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-2 py-1  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
                style={{ marginRight: "5px", height: "50px" }}
                variant="primary"
              >
                Đóng góp hiện vật
              </button>
            </div>
          </div>
        ) : (
          <Link className="flex justify-center" to="/login">Đăng nhập để quyên góp</Link>
        )}
        <div className="flex justify-center">
          <Button
            onClick={() => openFeedbackModal(project.id, project.title)}
            className="justify-center custom-card-link font-semibold text-[#fff] bg-[#38b6ff] shadow-md shadow-[#38b6ff] text-[13px] border-2 px-2 py-1 hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
            style={{ marginRight: "5px", height: "50px" }}
            variant="primary"
          >
            PHẢN HỒI VỀ DỰ ÁN
          </Button>
        </div>
      </Row>

      <hr />
      <GoogleMapProject projectId={projectId} />

      <button
        onClick={() => openProposeAddress(project.id, project.title)}
        className="custom-card-link font-semibold text-[#fff] bg-[#38b6ff]  shadow-md shadow-[#38b6ff] text-[13px] border-2 px-6 py-2  hover:bg-[#059df4] hover:text-[#fff] hover:shadow-md hover:shadow-[#059df4]"
      >
        Đề xuất địa chỉ
      </button>

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

      <Modal show={showDonateItemModal} onHide={closeDonateItemModal}>
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
                <Typography className="flex">Hiện vật cần đóng góp</Typography>
                <InputBase
                  className="border p-2"
                  placeholder="Vui lòng nhập hiện vật cần quyên góp"
                  sx={{ marginLeft: "5px" }}
                  // value={pay.note}
                  onChange={(e) => {
                    setDonateItem(e.target.value);
                    setErrDonateItem("");
                  }}
                />
                {errDonateItem && (
                  <Form.Text className="text-danger">{errDonateItem}</Form.Text>
                )}
              </div>

              <div className="flex flex-col">
                <Typography className="flex">Địa chỉ giao hàng</Typography>
                <InputBase
                  className="border p-2"
                  placeholder="Vui lòng nhập địa chỉ giao hàng"
                  sx={{ marginLeft: "5px" }}
                  // value={pay.note}
                  onChange={(e) => {
                    setAddressDelivery(e.target.value);
                    setErrAddressDelivery("");
                  }}
                />
                {errAddressDelivery && (
                  <Form.Text className="text-danger">
                    {errAddressDelivery}
                  </Form.Text>
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
          <Button variant="secondary" onClick={closeDonateItemModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmitDonateItem}>
            Xác nhận đóng góp
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFeedbackModal} onHide={closeFeedbackModal}>
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
                <Typography className="flex">Tên người phản hồi</Typography>
                <InputBase
                  className="border p-2"
                  placeholder="Vui lòng nhập hiện vật cần quyên góp"
                  sx={{ marginLeft: "5px" }}
                  // value={pay.note}
                  onChange={(e) => {
                    setFeedbackName(e.target.value);
                    setErrFeedbackName("");
                  }}
                />
                {errFeedbackName && (
                  <Form.Text className="text-danger">{errFeedbackName}</Form.Text>
                )}
              </div>

              <div className="flex flex-col">
                <Typography className="flex">Số điện thoại người phản hồi</Typography>
                <InputBase
                  className="border p-2"
                  placeholder="Vui lòng nhập địa chỉ giao hàng"
                  sx={{ marginLeft: "5px" }}
                  type="number"
                  // value={pay.note}
                  onChange={(e) => {
                    setFeedbackPhone(e.target.value);
                    // setErrAddressDelivery("");
                  }}
                />
                {errFeedbackPhone && (
                  <Form.Text className="text-danger">{errFeedbackPhone}</Form.Text>
                )}
              </div>

              <div className="flex flex-col">
                <Typography className="mt-2">Nội dung phản hồi</Typography>
                <InputBase
                  className="border p-2"
                  placeholder="Nhập ghi chú (tuỳ chọn)"
                  sx={{ marginLeft: "5px" }}
                  // value={pay.note}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                    setErrFeedback("");
                  }}
                />
                {errFeedback && (
                  <Form.Text className="text-danger">{errFeedback}</Form.Text>
                )}
              </div>
            </div>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeFeedbackModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmitFeedback}>
            Xác nhận đóng góp
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModelAddress} onHide={closeModalAddress}>
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
            <div className="flex flex-row w-full">
              <div className="flex flex-col">
                <TextField
                  id="standard-number"
                  label="Latitude"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  value={addressRecommended.latitude}
                  onChange={(e) => {
                    setAddressRecommended({
                      ...addressRecommended,
                      latitude: e.target.value,
                    });
                    setErrorLat("");
                  }}
                />
                {errorLat && (
                  <Form.Text className="text-danger">{errorLat}</Form.Text>
                )}
              </div>

              <div className="flex flex-col">
                <TextField
                  id="standard-number"
                  label="Longitude"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  value={addressRecommended.longitude}
                  onChange={(e) => {
                    setAddressRecommended({
                      ...addressRecommended,
                      longitude: e.target.value,
                    });
                    setErrorLng("");
                  }}
                />
                {errorLng && (
                  <Form.Text className="text-danger">{errorLng}</Form.Text>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex flex-col">
                <Typography className="mt-2">Ghi chú</Typography>
                <InputBase
                  className="border p-2"
                  placeholder="Nhập ghi chú (tuỳ chọn)"
                  value={addressRecommended.name}
                  onChange={(e) => {
                    setAddressRecommended({
                      ...addressRecommended,
                      name: e.target.value,
                    });
                    setErrorName("");
                  }}
                />
                {errorName && (
                  <Form.Text className="text-danger">{errorName}</Form.Text>
                )}
              </div>
            </div>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalAddress}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddressProject}>
            Xác nhận thông tin
          </Button>
        </Modal.Footer>
        {success && <div className="alert alert-success">{success}</div>}
      </Modal>
    </>
  );
};

export default ProjectDetails;
