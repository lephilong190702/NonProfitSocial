import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import cookie from "react-cookies";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const login = (evt) => {
    evt.preventDefault();

    const process = async () => {
      try {
        let res = await ApiConfig.post(endpoints['login'], {
          "username": username,
          "password": password
        })
        cookie.save("token", res.data);

        let {data} = await authApi().get(endpoints['current-user']);
        cookie.save("user", data);
        console.info(data);
      } catch (ex) {
        console.error(ex);
      }
    }
    
    process();
  }
    

  return (
    <>
      <h1 className="text-center text-info">Đăng nhập</h1>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Tên đăng nhập" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button type="submit" variant="danger">Đăng nhập</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default LoginPage;
