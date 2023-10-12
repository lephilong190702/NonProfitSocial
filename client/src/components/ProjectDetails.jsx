import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import ApiConfig, { endpoints } from '../configs/ApiConfig';
import MySpinner from '../layout/MySpinner';
import moment from 'moment';

const ProjectDetails = () => {
    const [user] = useContext(UserContext);
    const { projectId } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const loadProject = async () => {
            try {
                const { data } = await ApiConfig.get(endpoints["details-project"](projectId));
                setProject(data);
            } catch (error) {
                console.error("Error loading project:", error);
                setProject([]); // Set an empty array or handle the error as needed
            }
        }

        loadProject();
    }, [projectId]);

    if (project === null) {
        return <MySpinner />;
    } else if (project.length === 0) {
        return <p>No project data available.</p>;
    }

    return (
        <>
            <h1 className="text-center text-info mt-2">{project.title}</h1>
            <hr />
            <Row>
                <Col>
                    <h2 className="text-danger">{project.title}</h2>
                    <p>{project.content}</p>
                    <hr />
                    {project.images.length > 0 && (
                        <div className="image-container">
                            {project.images.map((image, index) => (
                                <img
                                    src={image.image}
                                    key={index}
                                    alt="image"
                                    style={{
                                        maxWidth: '50%', 
                                        height: 'auto',
                                        margin: '10px', 
                                        border: '1px solid #ccc',
                                        borderRadius: '5px' 
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    <hr />
                    <h3>{moment(project.startDate).format("DD/MM/YYYY HH:mm")} - {moment(project.endDate).format("DD/MM/YYYY HH:mm")}</h3>
                </Col>
                <Button>Đóng góp</Button>
            </Row>
            <hr />
        </>
    );
}

export default ProjectDetails;
