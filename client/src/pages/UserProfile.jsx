import React, { useContext, useRef, useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Header } from "../components";
import cookie from "react-cookies";
import { UserContext } from "../App";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";

const UserProfile = () => {
  const [validated, setValidated] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const [phone, setPhone] = useState();

  const fileInputRef = useRef();
  const handleChooseAvatar = (e) => {
    setAvatar(e.target.files[0]);
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(first_name, last_name, phone);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      
      event.stopPropagation();
    }

    setValidated(true);

    const process = async () => {
      const userForm = new FormData();
      userForm.append("firstName", first_name);
      userForm.append("lastName", last_name);
      userForm.append("phone", phone);
      userForm.append("file", avatar, avatar.name);
      try {

        let profile = await authApi().patch(endpoints["profile-by-id"], userForm);
        // cookie.save("user", profile.data);

      } catch (ex) {
        console.error(ex);
      }
    };

    process();
  };
  return (
    <>
      <Header />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control 
            required 
            type="text" 
            placeholder="Last name" 
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                defaultValue={user.username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group> */}
        </Row>
        <Row className="mb-3">
          {/* <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Email" 
            required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group> */}
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Phone</Form.Label>
            <Form.Control 
            type="tel" 
            placeholder="Phone" 
            required 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Phone.
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group> */}
          {/* <Form.Group className="mb-3">
          <Form.Label>Ảnh đại diện</Form.Label>
          <Form.Control type="file" ref={avatar} />
        </Form.Group> */}
        </Row>
        <Form.Group>
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            multiple={false}
            accept=".png, .jpg"
            onChange={handleChooseAvatar}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Xác nhận muốn thay dổi"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
};

export default UserProfile;