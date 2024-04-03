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
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

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

  const register = (evt) => {
    evt.preventDefault();

    const process = async () => {
      try {
        let res = await ApiConfig.post(endpoints["register"], user);
        if (res.status === 201) {
          nav("/login");
        } else setErr("Hệ thống bị lỗi!");
      } catch (error) {
        console.error(err);
        alert("Failed to register user. Check console for error details.");
      }
    };
    process();
  };

  return (
    <>
      <Fragment>
        <div className="container sign-up-mode">
          <div className="forms-container">
            <div className="signin-signup">
              <Form className="sign-up-form">
                <div className="title-signup">Đăng Ký</div>
                <div className="input-field">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    color="#acacac"
                    size="lg"
                    fixedWidth
                    className="icon-login"
                  />
                  <Form.Control
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
                  <Form.Control
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
                  <Form.Control
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
                        onClick={() => {
                          hidePassword();
                          setHangUp(true);
                          setGlance(false);
                        }}
                        className="icon-password"
                      />
                    ) : (
                      <FontAwesomeIcon
                        // value={user.password || ""}
                        icon={faEye}
                        color="#000"
                        size="lg"
                        fixedWidth
                        onClick={() => {
                          showPassword();
                          setHangUp(true);
                          setGlance(true);
                        }}
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

      {/* <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Charity Social</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on Charity Social.
            </span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <Form onSubmit={register}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="loginInput"
                    type="email"
                    onChange={(e) => change(e, "email")}
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    className="loginInput"
                    value={user.username}
                    onChange={(e) => change(e, "username")}
                    type="text"
                    placeholder="Tên đăng nhập"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    className="loginInput"
                    value={user.password}
                    onChange={(e) => change(e, "password")}
                    type="password"
                    placeholder="Mật khẩu"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button
                    variant="info"
                    type="submit"
                    className="loginRegisterButton"
                  >
                    Đăng ký
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Register;
