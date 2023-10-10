import { useState } from "react";
import axios from "axios";

import { Alert, Button, Form } from "react-bootstrap";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [err, setErr] = useState(null);
  const nav = useNavigate();

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
                  <Button variant="info" type="submit" className="loginRegisterButton">
                    Đăng ký
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
