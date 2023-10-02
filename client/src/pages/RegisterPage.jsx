import { useState } from "react";
import axios from "axios";

import { Alert, Button, Form } from "react-bootstrap";
import ApiConfig, { endpoints } from "../configs/ApiConfig";
function Register() {

  const [user, setUser] = useState({
    "username": "",
    "password": "",
    "email": "",
  });
  const [err, setErr] = useState(null);
  const register = (evt) => {
    evt.preventDefault();

    const process = async () => {
      try {
        let res = await ApiConfig.post(endpoints['register'], user);
        if (res.status === 201) {
          alert("Employee Registation Successfully");
        } else
          setErr("Hệ thống bị lỗi!");
      } catch (error) {
        console.error(err);
        alert("Failed to register user. Check console for error details.");
      }

    }
    process();
  }

  const change = (evt, field) => {
    setUser(current => {
      return { ...current, [field]: evt.target.value }
    })
  }

  return <>
    <h1 className="text-center text-info mt-2">ĐĂNG KÝ NGƯỜI DÙNG</h1>
    <Form onSubmit={register}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" onChange={(e) => change(e, "email")} placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tên đăng nhập</Form.Label>
        <Form.Control value={user.username} onChange={(e) => change(e, "username")} type="text" placeholder="Tên đăng nhập" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control value={user.password} onChange={(e) => change(e, "password")} type="password" placeholder="Mật khẩu" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="info" type="submit">Đăng ký</Button>

      </Form.Group>
    </Form>
  </>
}

export default Register;