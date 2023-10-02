import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { authApi, endpoints } from "../configs/ApiConfig";
import { Header } from "../components";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const avatar = useRef();

  const updateProfile = (event) => {
    console.log(profile.firstName, profile.lastName, profile.phone, avatar);
    event.preventDefault();

    const process = async () => {
      let userForm = new FormData();
      userForm.append("firstName", profile.firstName);
      userForm.append("lastName", profile.lastName);
      userForm.append("phone", profile.phone);
      userForm.append("avatar", avatar.current.files[0]);
      try {
        let profile = await authApi().put(endpoints["profile"], userForm);
        console.log(profile.data);

        setSuccessMessage("Cập nhật hồ sơ thành công");

        setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
      } catch (ex) {
        console.error(ex);
      }
    };

    process();
  };

  const change = (evt, field) => {
    setProfile((current) => {
      return { ...current, [field]: evt.target.value };
    });
  };

  return (
    <>
      <Header />
      <h1 className="text-center text-info mt-2">HỒ SƠ NGƯỜI DÙNG</h1>

      <Form onSubmit={updateProfile}>
        <Form.Group className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => change(e, "firstName")}
            placeholder="Tên"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Họ và chữ lót</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => change(e, "lastName")}
            placeholder="Họ và chữ lót"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Điện thoại</Form.Label>
          <Form.Control
            type="tel"
            onChange={(e) => change(e, "phone")}
            placeholder="Điện thoại"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ảnh đại diện</Form.Label>
          <Form.Control type="file" ref={avatar} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button variant="info" type="submit">
            Cập nhật hồ sơ
          </Button>
        </Form.Group>
      </Form>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
    </>
  );
};

export default UserProfile;
