import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import img1 from '../../../assets/Begin/peoples-planting.jpg';
import img2 from '../../../assets/Begin/smelling-plant.jpg';
import './Begin.css';

import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';



function Begin(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlertEmail, setShowAlertEmail] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            // navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        verifyPassword(confirmPassword);
    }, [confirmPassword]);

    function verifyPassword(confirmPassword) {
        if (password !== confirmPassword) {
            setShowAlert(true);
            return false;
        } else {
            setShowAlert(false);
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!verifyPassword(confirmPassword)) {
            return;
        }
        Axios.post("http://localhost:8000/user/new", {
            name: name,
            email: email,
            password: password,
        }).then((response) => {
            console.log('aquiiii');
            console.log(response.data, 'aaaaaa');
            if (response.status === 201) {
                localStorage.setItem('authToken', response.data);
            }
        }).catch(error => {
            if (error.response && error.response.status === 400 && error.response.data.errorCode === 'EmailExist') {
                setShowAlertEmail(true);
            } else {
                console.error('Erro na requisição:', error);
            }
        });
    };

    return (
        <div className='ContainerBegin'>
        <Row className="gx-0">
            <Col xs="auto">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={img2} />
                </Card>
            </Col>
            <Col xs="auto">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
    );
}

export default Begin;
