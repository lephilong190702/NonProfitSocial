import React, { useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import cookie from "react-cookies";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import MySpinner from "../layout/MySpinner";

const RegisterPage = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    avatar: "",
  });

  const avatar = useRef();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const change = (evt, field) => {
    setUser((current) => {
      return { ...current, [field]: evt.target.value };
    });
  };

  const register = (evt) => {
    evt.preventDefault();

    const process = async () => {
      //   let formData = new FormData();

      //   for (let field in user)
      //     if (field !== "confirmPassword") formData.append(field, user[field]);

      setLoading(true);

      let res = await ApiConfig.post(endpoints["register"]);

      if (res.status === 201) {
        nav("/login");
      } else setErr("Hệ thống bị lỗi");
    }

    process();
    // if (user.password === user.confirmPassword) {
    //   process();
    // } else {
    //   setErr("Mật khẩu không khớp");
    // }
  };

  return (
    <>
      <Header />
      <h1 className="text-center text-info">Đăng nhập</h1>
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            value={user.username}
            onChange={(e) => change(e, "username")}
            placeholder="Tên đăng nhập"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={user.password}
            onChange={(e) => change(e, "password")}
            placeholder="Mật khẩu"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label>Xác nhận Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={user.confirmPassword}
            onChange={(e) => change(e, "confirmPassword")}
            placeholder="Xác nhận Mật khẩu"
          />
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={user.email}
            onChange={(e) => change(e, "email")}
            placeholder="Email"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label>Ảnh đại diện</Form.Label>
          <Form.Control type="file" ref={avatar} />
        </Form.Group> */}
        <Form.Group className="mb-3">
          {loading === true ? (
            <MySpinner />
          ) : (
            <Button variant="info" type="submit">
              Đăng ký
            </Button>
          )}
        </Form.Group>
      </Form>
    </>
  );
};

export default RegisterPage;
