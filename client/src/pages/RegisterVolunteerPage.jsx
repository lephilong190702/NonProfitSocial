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
    endDate: "" ,
    description: "",
    skills: [],
  });
  const [projectList, setProjectList] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const change = (evt, field) => {
    setVolunteer((current) => {
      return { ...current, [field]: evt.target.value };
    });
  };

  const toggleSkill = (skillId) => {
    const updatedSkills = volunteer.skills.includes(skillId)
      ? volunteer.skills.filter((id) => id !== skillId)
      : [...volunteer.skills, skillId];

    setVolunteer((current) => {
      return { ...current, skills: updatedSkills };
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

    async function fetchSkills() {
      try {
        const res = await ApiConfig.get(endpoints["skill"]);
        const skills = res.data;
        setSkillList(skills);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSkills();
    fetchProjects();
  }, []);

  const registerVol = async (evt) => {
    evt.preventDefault();
    console.log(volunteer.skills, volunteer.startDate, volunteer.endDate);

    try {
      const res = await authApi().post(endpoints["volunteer"], {
        projectId: volunteer.projectId,
        startDate: volunteer.startDate,
        endDate: volunteer.endDate,
        description: volunteer.description,
        skills: volunteer.skills,
      });

      if (res.status === 201) {
        console.log("Đăng ký thành công");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form onSubmit={registerVol}>
        <h1 className="text-center text-info mt-2">ĐĂNG KÝ TÌNH NGUYỆN VIÊN</h1>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="startDate">
            <Form.Label>Ngày tham gia</Form.Label>
            <Form.Control
              type="date"
              max={volunteer.endDate}
              value={volunteer.startDate}
              onChange={(e) => change(e, "startDate")}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="endDate">
            <Form.Label>Ngày kết thúc</Form.Label>
            <Form.Control
              type="date"
              min={volunteer.startDate}
              value={volunteer.endDate}
              onChange={(e) => change(e, "endDate")}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Kỹ năng</Form.Label>
            {skillList.map((skill) => (
              <Form.Check
                key={skill.id}
                type="checkbox"
                id={`skill-${skill.id}`}
                label={skill.name}
                checked={volunteer.skills.includes(skill.id)}
                onChange={() => toggleSkill(skill.id)}
              />
            ))}
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
            value={volunteer.description}
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
