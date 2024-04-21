import { Fragment, useState } from "react";
import axios from "axios";

import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import ApiConfig, { endpoints } from "../../configs/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const showPassword = () => {
    setIsShow(true);
  };
  const hidePassword = () => {
    setIsShow(false);
  };
  const showPasswordConfirm = () => {
    setIsShowConfirm(true);
  };
  const hidePasswordConfirm = () => {
    setIsShowConfirm(false);
  };

  const change = (evt, field) => {
    setUser((current) => {
      return { ...current, [field]: evt.target.value };
    });
  };

  const register = async (evt) => {
    evt.preventDefault();

    try {
      let res = await ApiConfig.post(endpoints["register"], user);
      if (res.status === 201) {
        // <Alert variant="success" className="mt-3">
        //   Báo cáo đã được gửi thành công!
        // </Alert>
        setRegisterSuccess(true);
        nav("/login");
      } else {
        setErrorMessage("Hệ thống bị lỗi!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Đăng ký không thành công, có thể Tên đăng nhập đã bị trùng."
      );
    }
  };

  return (
    <>
      <Fragment>
        <div className="container sign-up-mode">
          <div className="forms-container">
            <div className="signin-signup">
              <Form className="sign-up-form" onSubmit={register}>
                <div className="title-signup">Đăng Ký</div>
                {errorMessage && (
                  <div
                    className="error-message"
                    onClose={() => setErrorMessage("")}
                    dismissible
                  >
                    {errorMessage}
                  </div>
                )}
                <div className="input-field">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    color="#acacac"
                    size="lg"
                    fixedWidth
                    className="icon-login"
                  />
                  <input
                    className="loginInput"
                    type="email"
                    onChange={(e) => change(e, "email")}
                    placeholder="Email"
                  />
                </div>
                <div className="input-field">
                  <FontAwesomeIcon
                    icon={faUser}
                    color="#acacac"
                    size="lg"
                    fixedWidth
                    className="icon-login"
                  />
                  <input
                    className="loginInput"
                    value={user.username}
                    onChange={(e) => change(e, "username")}
                    type="text"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="input-field">
                  <FontAwesomeIcon
                    icon={faLock}
                    color="#acacac"
                    size="lg"
                    fixedWidth
                    className="icon-login"
                  />
                  <input
                    className="loginInput"
                    value={user.password}
                    onChange={(e) => change(e, "password")}
                    type={isShow ? "text" : "password"}
                    placeholder="Password"
                    required
                  />
                  <div>
                    {isShow ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        color="#000"
                        size="lg"
                        fixedWidth
                        onClick={() => hidePassword()}
                        className="icon-password"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        color="#000"
                        size="lg"
                        fixedWidth
                        onClick={() => showPassword()}
                        className="icon-password"
                      />
                    )}
                  </div>
                </div>
                <Form.Group className="mb-3">
                  <Button variant="info" type="submit" className="btn">
                    Đăng ký
                  </Button>
                </Form.Group>
                <p className="social-text">Hoặc đăng nhập bằng các nền tảng</p>
                <div className="social-media">
                  <a href="#" className="social-icon">
                    <img
                      src="./src/assets/facebook.svg"
                      style={{ width: "40px" }}
                      alt=""
                    />
                  </a>
                  <a href="#" className="social-icon">
                    <img
                      src="./src/assets/insta.svg"
                      style={{ width: "40px" }}
                      alt=""
                    />
                  </a>
                  <a href="#" className="social-icon">
                    <img
                      src="./src/assets/google.svg"
                      style={{ width: "40px" }}
                      alt=""
                    />
                  </a>
                </div>
              </Form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel"></div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Bạn đang là thành viên của Charity for live?</h3>
                <p>
                  Đăng nhập ngay để trải nghiệm dịch vụ từ thiện cho cộng động
                  hàng đầu Việt Nam.
                </p>
                <Link to="/login">
                  <Button className="btn transparent">Đăng nhập</Button>
                </Link>
              </div>
              <img
                src="./src/assets/login.png"
                style={{ marginRight: "90px" }}
                className="image"
                alt=""
              />
            </div>
          </div>
        </div>
      </Fragment>
      {registerSuccess && (
        <Alert variant="success" className="mt-3">
          Đăng ký thành công!
        </Alert>
      )}
    </>
  );
}

export default Register;
