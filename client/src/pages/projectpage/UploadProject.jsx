import React, { useContext, useState } from "react";
import { authApi, endpoints } from "../../configs/ApiConfig";
import './UploadProject.css'
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { UserContext } from "../../App";
const UploadProject = () => {
    const [files, setFiles] = useState([]);
    const [user] = useContext(UserContext);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [projectDTO, setProjectDTO] = useState({
        "title": "",
        "content": "",
        "contributedAmount": "",
        "totalAmount": "",
        "startDate": "",
        "endDate": "",
        "categoryId": ""
    });

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectDTO({ ...projectDTO, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        files.forEach(file => {
            console.log(file);
            formData.append('files', file);
        });
        formData.append('projectDTO', new Blob([JSON.stringify(projectDTO)], {
            type: "application/json"
        }));

        console.log(JSON.stringify(projectDTO))

        try {
            const res = await authApi().post(endpoints["upload-project"], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                setRegistrationSuccess(true);
            }
            console.log(res.data);
            // setFiles(res.data.files);
            // setProjectDTO(res.data.projectDTO)
        } catch (error) {
            console.log("Lỗi");
            console.log(error);
        }
    };

    return (
        <>
            <h3 className="text-center">Vui lòng nhập các thông tin đầy đủ kèm với các giấy tờ chứng minh hoàn cảnh một cách minh bạch để được hỗ trợ sớm nhất!!!</h3>
            <div className="resgisVolunContainer">
                {registrationSuccess ? (
                    <div className="success-message">Đăng ký thành công</div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <h1 className="form-heading">GỬI DỰ ÁN TỪ THIỆN VỀ CHO CHƯƠNG TRÌNH</h1>
                        {user === null ? (
                            <p>
                                Vui lòng{" "}
                                <Link to={"/login"} className="login-link">
                                    đăng nhập
                                </Link>{" "}
                                để gửi dự án{" "}
                            </p>
                        ) : (
                            <>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Tên dự án</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{ width: "500px" }}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Nội dung</Form.Label>
                                    <Form.Control
                                        as="textarea" 
                                        rows={5}
                                        type="text"
                                        name="content"
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{ width: "500px" }}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Số tiền đã góp được</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="contributedAmount"
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{ width: "500px" }}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Số tiền cần quyên góp</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="totalAmount"
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{ width: "500px" }}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Ảnh minh chứng đính kèm</Form.Label>
                                    <Form.Control
                                        type="file" multiple
                                        onChange={handleFileChange}
                                        className="form-control"
                                        style={{ width: "500px" }}
                                        required
                                    />
                                </Form.Group>

                                <Row className="form-group">
                                    <Form.Group as={Col} controlId="startDate">
                                        <Form.Label>Ngày bắt đầu</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="startDate"
                                            onChange={handleChange}
                                            style={{ width: "250px" }}
                                            className="form-control"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="endDate">
                                        <Form.Label>Ngày kết thúc</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="endDate"
                                            onChange={handleChange}
                                            style={{ width: "250px" }}
                                            className="form-control"
                                        />
                                    </Form.Group>
                                </Row>

                                <Button variant="primary" type="submit" className="btn-submit">
                                    GỬI DỰ ÁN
                                </Button>
                            </>
                        )}
                    </Form>
                )}
            </div>
        </>


    );
};

export default UploadProject;
