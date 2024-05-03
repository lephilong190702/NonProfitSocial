import React, { Fragment, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../../configs/ApiConfig";
import cookie from "react-cookies";
import { Header } from "../../components";
import { Navigate } from "react-router";
import { UserContext } from "../../App";
import "./login.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [user, dispatch] = useContext(UserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null); // Thêm state để theo dõi thông báo lỗi

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

  const login = async (evt) => {
    evt.preventDefault();

    const process = async () => {
      try {
        let res = await ApiConfig.post(endpoints["login"], {
          username: username,
          password: password,
        });
        cookie.save("token", res.data);

        let { data } = await authApi().get(endpoints["current-user"]);
        if (!data.enabled) {
          setError(
            "Tài khoản chưa được xác thực."
          );
          return;
        }
        cookie.save("user", data);

        dispatch({
          type: "login",
          payload: data,
        });
      } catch (ex) {
        console.error(ex);
        setError(
          "Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
        );
      }
    };

    process();
  };

  if (user !== null) return <Navigate to="/" />;

  return (
    <>
      <Fragment>
        <div className="container">
          <div className="forms-container">
            <div className="signin-signup">
              <Form onSubmit={login} className="sign-in-form">
                {/* <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                > */}
                <div className="title-signin">Đăng Nhập</div>
                {error && <div className="error-message">{error}</div>}{" "}
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
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tên đăng nhập"
                    style={{ width: "100%" }}
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
                    type={isShow ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
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
                        }}
                        className="icon-password"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        color="#000"
                        size="lg"
                        fixedWidth
                        onClick={() => {
                          showPassword();
                        }}
                        className="icon-password"
                      />
                    )}
                  </div>
                </div>
                <a href="/forgotPassword" className="forgot-password">
                  <p>Bạn quên mật khẩu?</p>
                </a>
                <Form.Group className="mb-3">
                  <Button type="submit" className="btn solid">
                    Đăng nhập
                  </Button>
                </Form.Group>
                {/* </Form.Group> */}
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
            <div className="panel left-panel">
              <div className="content">
                <h3>Bạn mới biết đến Charity?</h3>
                <p>
                  Đăng kí tải khoản ngay để trải nghiệm dịch vụ từ thiện cho
                  cộng động hàng đầu Việt Nam.
                </p>
                <Link to="/register">
                  <Button className="btn transparent">Đăng ký</Button>
                </Link>
              </div>
              <img src="./src/assets/register.png" className="image" alt="" />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default LoginPage;
