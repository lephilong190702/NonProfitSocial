import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { authApi, endpoints } from "../configs/ApiConfig";
import { Header } from "../components";
import "./userProfile.css"; // Import CSS file

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const avatar = useRef();

  const updateProfile = (event) => {
    event.preventDefault();

    const process = async () => {
      let userForm = new FormData();
      userForm.append("firstName", profile.firstName);
      userForm.append("lastName", profile.lastName);
      userForm.append("phone", profile.phone);
      userForm.append("avatar", avatar.current.files[0]);
      try {
        let profileData = await authApi().put(endpoints["profile"], userForm);

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
    <div className="profile-container">
      <h1 className="form-heading">HỒ SƠ NGƯỜI DÙNG</h1>

      <Form onSubmit={updateProfile}>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Tên</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => change(e, "firstName")}
            placeholder="Tên"
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Họ và chữ lót</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => change(e, "lastName")}
            placeholder="Họ và chữ lót"
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Điện thoại</Form.Label>
          <Form.Control
            type="tel"
            onChange={(e) => change(e, "phone")}
            placeholder="Điện thoại"
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Ảnh đại diện</Form.Label>
          <Form.Control type="file" ref={avatar} className="form-control" />
        </Form.Group>
        <Form.Group className="form-group">
          <Button variant="info" type="submit" className="btn-submit">
            Cập nhật hồ sơ
          </Button>
        </Form.Group>
      </Form>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
    </div>
  );
};

export default UserProfile;
