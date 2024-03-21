import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import './Register.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(props) {
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
        <div className='ContainerRegister'>
            <div className='Register' style={{ position: 'relative' }}>
                <Button variant="primary" size="sm" onClick={() => navigate('/login')} style={{ position: 'absolute', top: '0px', right: '0px', left: '100' }}>
                    Voltar para Login
                </Button>
                <div className='Content'>
                    <div className="LogoContainer">
                        <img src={logo} alt="logo" className='RegisterLogo' />
                        <p className="LogoText">Faça seu registro na</p>
                        <p className="SubText">StackOverFlower</p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                required
                            />
                            {showAlertEmail && (
                                <Alert variant="danger" className="mt-1" onClose={() => setShowAlertEmail(false)} dismissible style={{ fontSize: '1rem', padding: '0.3rem', margin: '0px', width: '70%', marginLeft: '30%', marginBottom: '0px' }}>
                                    <p style={{ marginBottom: '0px' }}>Email já cadastrado, faça o <Alert.Link href="#" onClick={() => navigate('/login')}>Login</Alert.Link>!</p>
                                </Alert>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword" style={{ marginBottom: '5px' }}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                            {showAlert && (
                                <Alert variant="danger" className="mt-1" onClose={() => setShowAlert(false)} dismissible style={{ fontSize: '1rem', padding: '0.3rem', margin: '0px', width: '50%', marginLeft: '50%', marginBottom: '0px' }}>
                                    <p style={{ marginBottom: '0px' }}>Senhas não conferem!</p>
                                </Alert>
                            )}
                        </Form.Group>

                        <Button variant="success" type="submit" style={{ width: '30%', fontSize: '1.5rem', padding: '5px 5px' }}>
                            REGISTER
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;
