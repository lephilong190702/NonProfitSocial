import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { Button, Col, Form, Row } from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import { useNavigate } from "react-router-dom";

const RegisterVolunteerPage = () => {
  const [user, setUser] = useState();
  const [volunteer, setVolunteer] = useState({
    projectId: "",
    startDate: "",
    endDate: "",
    description: "",
    skill: "",
  });
  const [projectList, setProjectList] = useState([]); // State để lưu danh sách dự án

  const change = (evt, field) => {
    setVolunteer((current) => {
      return { ...current, [field]: evt.target.value };
    });
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await ApiConfig.get(endpoints["project"]);
        const projects = response.data;
        setProjectList(projects);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  const registerVol = async (evt) => {
    evt.preventDefault();

    try {
      const res = await authApi().post(endpoints["volunteer"], {
        projectId: volunteer.projectId,
        startDate: volunteer.startDate,
        endDate: volunteer.endDate,
        description: volunteer.description,
        skill: volunteer.skill,
      });

      if (res.status === 201) {
        console.log("Đăng ký thành công");
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Form onSubmit={registerVol}>
        <h1 className="text-center text-info mt-2">ĐĂNG KÝ TÌNH NGUYỆN VIÊN</h1>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="startDate">
            <Form.Label>Ngày tham gia</Form.Label>
            <Form.Control type="date" onChange={(e) => change(e, "startDate")}/>
          </Form.Group>

          <Form.Group as={Col} controlId="endDate">
            <Form.Label>Ngày kết thúc</Form.Label>
            <Form.Control type="date" onChange={(e) => change(e, "endDate")}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Kỹ năng</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={(e) => change(e, "skill")}>
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Dự án muốn tham gia</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            value={volunteer.projectId}
            onChange={(e) => change(e, "projectId")}
          >
            <option value="">Choose...</option>
            {projectList.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apartment, studio, or floor"
            onChange={(e) => change(e, "description")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          ĐĂNG KÝ
        </Button>
      </Form>
    </>
  );
};

export default RegisterVolunteerPage;
