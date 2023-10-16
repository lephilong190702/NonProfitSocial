import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import cookie from "react-cookies";
import { Header } from "../components";
import { Navigate } from "react-router";
import { UserContext } from "../App";
import "./login.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [user, dispatch] = useContext(UserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null); // Thêm state để theo dõi thông báo lỗi

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
        cookie.save("user", data);

        dispatch({
          type: "login",
          payload: data,
        });
      } catch (ex) {
        console.error(ex);
        setError("Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."); // Đặt thông báo lỗi ở đây
      }
    };

    process();
  };

  if (user !== null) return <Navigate to="/" />;

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Charity Social</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on Charity Social.
            </span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              {error && <div className="error-message">{error}</div>} {/* Hiển thị thông báo lỗi */}
              <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    className="loginInput"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tên đăng nhập"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    className="loginInput"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                  />
                </Form.Group>
                <Link to="/forgotPassword">
                <span className="loginForgot">Forgot Password?</span>
                </Link>
                
                <Form.Group className="mb-3">
                  <Button type="submit" variant="danger" className="loginRegisterButton">
                    Đăng nhập
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;