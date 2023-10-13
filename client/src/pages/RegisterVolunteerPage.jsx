import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ApiConfig, { authApi, endpoints } from "../configs/ApiConfig";
import { Link, useNavigate } from "react-router-dom";
import "./registerVolunteer.css";
import { UserContext } from "../App";
import "./register.css"

const RegisterVolunteerPage = () => {
  const [user] = useContext(UserContext);
  const [volunteer, setVolunteer] = useState({
    projectId: "",
    startDate: "",
    endDate: "",
    description: "",
    skills: [],
  });
  const [projectList, setProjectList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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
      console.log(res.status)
      if (res.status === 200) {
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {registrationSuccess ? (
        <div className="success-message">Đăng ký thành công</div>
      ) : (
        <Form onSubmit={registerVol}>
          <h1 className="form-heading">ĐĂNG KÝ TÌNH NGUYỆN VIÊN</h1>
          {user === null ? (
            <p>
              Vui lòng <Link to={"/login"} className="login-link">đăng nhập</Link> để đăng ký tình nguyện viên{" "}
            </p>
          ) : (
            <>
              <Row className="form-group">
                <Form.Group as={Col} controlId="startDate">
                  <Form.Label>Ngày tham gia</Form.Label>
                  <Form.Control
                    type="date"
                    max={volunteer.endDate}
                    value={volunteer.startDate}
                    onChange={(e) => change(e, "startDate")}
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="endDate">
                  <Form.Label>Ngày kết thúc</Form.Label>
                  <Form.Control
                    type="date"
                    min={volunteer.startDate}
                    value={volunteer.endDate}
                    onChange={(e) => change(e, "endDate")}
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Kỹ năng</Form.Label>
                  {skillList.map((skill) => (
                    <label key={skill.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        id={`skill-${skill.id}`}
                        checked={volunteer.skills.includes(skill.id)}
                        onChange={() => toggleSkill(skill.id)}
                      />
                      {skill.name}
                    </label>
                  ))}
                </Form.Group>
              </Row>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Dự án muốn tham gia</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  value={volunteer.projectId}
                  onChange={(e) => change(e, "projectId")}
                  className="form-select"
                >
                  <option value="">Choose...</option>
                  {projectList.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="form-group" controlId="formGridAddress2">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apartment, studio, or floor"
                  value={volunteer.description}
                  onChange={(e) => change(e, "description")}
                  className="form-control"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="btn-submit">
                ĐĂNG KÝ
              </Button>
            </>
          )}
        </Form>
      )}
    </div>
  );
};

export default RegisterVolunteerPage;
