import React, { useContext, useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Header } from "../components";
import cookie from "react-cookies";
import { UserContext } from "../App";
import ApiConfig, { endpoints } from "../configs/ApiConfig";

const UserProfile = () => {
  const [validated, setValidated] = useState(false);
  const [user, dispatch] = useContext(UserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const [phone, setPhone] = useState();
  

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const process = async () => {
      try {
        let res = await ApiConfig.post(endpoints["login"], {
          username: username,
          password: password,
        });
        cookie.save("token", res.data);

        let profile = await ApiConfig.put(endpoints["profile-by-id"], {
          username: username, 
          password: password,
          email: email,
          avatar: avatar,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
        });
        cookie.save("token", profile.data);

        let { data } = await authApi().get(endpoints["current-user"]);
        cookie.save("user", data);

        dispatch({
          type: "profile-by-id",
          payload: data,
        });
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
              defaultValue={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            ></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control 
            required 
            type="text" 
            placeholder="Last name" 
            defaultValue={last_name}
            onChange={(e) => setLast_name(e.target.value)}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Email" 
            required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="number" placeholder="Phone" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Phone.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Ảnh đại diện</Form.Label>
          <Form.Control type="file" ref={avatar} />
        </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
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