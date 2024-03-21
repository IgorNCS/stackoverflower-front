import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import img1 from '../../../assets/Begin/peoples-planting.jpg';
import img2 from '../../../assets/Begin/smelling-plant.jpg';
import img3 from '../../../assets/Begin/arvore.jpg';


import './Principal.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, ListGroup, InputGroup, Row, Image, Collapse, Form, FormLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faImage, faShareSquare } from '@fortawesome/free-regular-svg-icons';

function Principal(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [postContent, setPostContent] = useState('');
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            // navigate('/');
        }
    }, [navigate]);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const handlePostSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode adicionar a lógica para enviar o post
        alert('Post enviado!');
        console.log()
    };

    const cardText = "Some quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's content.";
    const truncatedText = expanded ? cardText : cardText.slice(0, 195);

    return (
        <div className='Container'>
            <div>
                <Card className='CardPrincipalNewPost '>
                    <Card.Title className='CardProfilePost' style={{ height: '30px' }}>

                        <Image src={img3} roundedCircle className='CardImageProfile' style={{ height: '30px' }} />
                        <div className='CardTextProfile' >
                            Igão da Massa
                        </div>

                    </Card.Title>
                    <Form onSubmit={handlePostSubmit}>
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                aria-label="With textarea"
                                style={{ resize: 'none' }}
                                placeholder='Plante uma ideia, publique um novo Post!'
                                value={postContent}
                                onChange={(event) => setPostContent(event.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Publicar
                            </Button>
                        </InputGroup>
                        <Form.Control type="file" size="sm" multiple />
                    </Form>


                </Card>
                <Card className='CardPrincipal '>
                    <Card.Title className='CardProfile'>

                        <Image src={img3} roundedCircle className='CardImageProfile' />
                        <div className='CardTextProfile'>
                            Igão da Massa
                        </div>

                    </Card.Title>
                    <hr />

                    <Card.Text className='CardText' >
                        {truncatedText}

                        {cardText.length > 195 && (
                            <Button variant="link" onClick={handleExpand}>
                                {expanded ? "Show less" : "Show more"}
                            </Button>

                        )}


                    </Card.Text>
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <div className='CardImageBg' style={{ backgroundImage: `url(${img2})` }}></div>
                        <Card.Img src={img2} className='CardImage' />
                    </div>

                    <Card.Body className="CardBody">
                        <Row>
                            <Col md={4}>
                                <Card.Link href="#"><FontAwesomeIcon size='xl' icon={faHeart} style={{ color: '#ff686b' }} /></Card.Link>

                                <Card.Link href="#"><FontAwesomeIcon size='xl' icon={faShareSquare} style={{ color: '#84dcc6' }} /></Card.Link>
                            </Col>
                            <Col md={{ span: 4, offset: 4 }}>
                                <Card.Link href="#">Comments</Card.Link>
                            </Col>
                        </Row>
                        <hr />
                        <Form>
                        <InputGroup>                      
                                <Form.Control as="textarea" aria-label="With textarea" style={{ resize: 'none' }} placeholder='Comente na publicação'/>
                            <Button variant="primary">
                                Comente
                            </Button>
                        </InputGroup>
                                   

                    </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Principal;


