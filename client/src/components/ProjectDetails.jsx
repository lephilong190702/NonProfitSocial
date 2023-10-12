import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import ApiConfig, { endpoints } from '../configs/ApiConfig';
import MySpinner from '../layout/MySpinner';

const ProjectDetails = () => {
    const [user] = useContext(UserContext);
    const { projectId } = useParams();
    const [project, setProject] = useState(null);


    useEffect(() => {
        const loadProject = async () => {
            let { data } = await ApiConfig.get(endpoints["details-project"](projectId));
            setProject(data);
        }


        loadProject();
    }, [projectId]);


    if (project === null)
        return <MySpinner />;

    let url = `/login?next=/projects/${projectId}`;
    return (
        <>
            <h1 className="text-center text-info mt-2">{project.title}</h1>
            <hr />
            <Row>
                {/* <Col md={5} xs={6}>
                    <Image src={project.image} rounded fluid />
                </Col> */}
                <Col>
                    <h2 className="text-danger">{project.title}</h2>
                    <p>{project.content}</p>
                    <h3>{project.startDate} - {project.endDate}</h3>
                </Col>
                <Button>Đóng góp</Button>
            </Row>
            <hr />
        </>
    );
}

export default ProjectDetails