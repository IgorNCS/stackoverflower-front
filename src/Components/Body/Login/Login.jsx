import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';



function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertEmail, setShowAlertEmail] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        Axios.post("http://localhost:8000/user/login", {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data);
            }
        }).catch(error => {
            console.log(error)
            if (error.response && error.response.status === 400 && error.response.data.errorCode === 'EmailNotExist') {
                setShowAlertEmail(true);
            } else if (error.response && error.response.status === 400 && error.response.data.errorCode === 'IncorrectPassword') {
                setShowAlert(true);
            } else {
                console.error('Erro na requisição:', error);
            }
        });
    };

    return (
        <div className='ContainerLogin'>
            <div className='Login'>
                <div className='Content'>
                    <div className="LogoContainer">
                        <img src={logo} alt="logo" className='LoginLogo' />
                        <p className="LogoText">Faça seu login na sua conta</p>
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
                                <Alert variant="danger" className="mt-1" onClose={() => setShowAlertEmail(false)} dismissible style={{
                                    fontSize: '1rem',
                                    padding: '0.3rem',
                                    margin: '0px',
                                    width: '70%',
                                    marginLeft: '30%',
                                    marginBottom: '0px',
                                }}>
                                    <p style={{ marginBottom: '0px' }}>Email não cadastrado, se <Alert.Link href="#" onClick={() => navigate('/register')}>Registre</Alert.Link>
                                        !</p>
                                </Alert>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label >Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            {showAlert && (
                                <Alert variant="danger" className="mt-1" onClose={() => setShowAlert(false)} dismissible style={{
                                    fontSize: '1rem',
                                    padding: '0.3rem',
                                    margin: '0px',
                                    width: '50%',
                                    marginLeft: '50%',
                                    marginBottom: '0px',
                                }}>
                                    <p style={{ marginBottom: '0px' }}>Senha incorreta!</p>
                                </Alert>
                            )}
                        </Form.Group>



                        <Button variant="primary" type="submit" style={{ width: '30%', fontSize: '1.5rem', padding: '5px 5px', marginRight: '10px' }}>
                            LOGIN
                        </Button>
                        <Button variant="success" type="button" style={{ width: '30%', fontSize: '1.5rem', padding: '5px 5px' }} onClick={() => navigate('/register')}>
                            REGISTER
                        </Button>

                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
