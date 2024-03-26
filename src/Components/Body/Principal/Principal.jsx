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
import { faHeart as faHeartSolid, faImage as faImageSolid, faShareSquare as faShareSquareSolid } from '@fortawesome/free-solid-svg-icons';

function Principal(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [postContent, setPostContent] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [selectedImages, setSelectedImages] = useState(['']);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredHeart1, setIsHoveredHeart1] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isHoveredShare, setIsHoveredShare] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        setAuthToken(localStorage.getItem('authToken'));
        if (authToken) {
            // navigate('/');
        }
    }, [navigate]);

    const handleExpand = () => {
        setExpanded(!expanded);
    };
    const toggleReplyForm = () => {
        setShowReplyForm(!showReplyForm);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        console.log(selectedImages); // Verifica o valor de selectedImages antes de forEach
        setAuthToken(localStorage.getItem('authToken'));
        console.log(authToken)
        if (selectedImages) {
            const imagesArray = Array.from(selectedImages);
            imagesArray.forEach((image) => {
                formData.append(`images`, image);
            });
        }
        formData.append('content', postContent);
        console.log(formData)
        try {
            const response = await Axios.post('http://localhost:8000/post/new', formData, {
                headers: {
                    'Authorization': `${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Post enviado:', response.data);
            alert('Post enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar post:', error);
            alert('Erro ao enviar post. Por favor, tente novamente.');
        }
    };

    async function getImage() {
        try {
            const response = await Axios.get('http://localhost:8000/00bb26a91b61f4d05fcc5576b4c215a9.jpg');
            console.log(response);
            setUploadedImageUrl(response.data);
        } catch (error) {
            console.error('Erro ao obter a imagem:', error);
            // alert('Erro ao obter a imagem. Por favor, tente novamente.');
        }
    }


    // useEffect para chamar a função getImage quando uploadedImageUrl mudar
    useEffect(() => {
        getImage();
    }, [uploadedImageUrl]);



    const cardText = "Some quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's content.";
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
                    <Form onSubmit={handlePostSubmit} encType="multipart/form-data">
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                aria-label="With textarea"
                                style={{ resize: 'none' }}
                                placeholder="Plante uma ideia, publique um novo Post!"
                                value={postContent}
                                onChange={(event) => setPostContent(event.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Publicar
                            </Button>
                        </InputGroup>
                        <Form.Control
                            type="file"
                            size="sm"
                            multiple
                            accept="image/*"
                            onChange={(event) => setSelectedImages(event.target.files)}
                        />

                    </Form>




                </Card>
                <Card className='CardPrincipal '>
                    <Card.Title className='CardProfile' >
                        <Image src={img3} roundedCircle className='CardImageProfile' />
                        <div className='CardTextProfile'>
                            Igão da Massa
                        </div>
                        <Card.Link href="#" className='CardPlantProfile'>Girassol</Card.Link>

                    </Card.Title>
                    <hr style={{ marginTop: '0px' }} />

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
                                <Card.Link href="#"><FontAwesomeIcon
                                    size='xl'
                                    icon={isHoveredHeart1 ? faHeartSolid : faHeart}
                                    onMouseEnter={() => setIsHoveredHeart1(true)}
                                    onMouseLeave={() => setIsHoveredHeart1(false)}
                                    style={{ color: '#ff686b' }} /></Card.Link>

                                <Card.Link href="#">
                                    <FontAwesomeIcon
                                        size='xl'
                                        icon={isHoveredShare ? faShareSquareSolid : faShareSquare}
                                        onMouseEnter={() => setIsHoveredShare(true)}
                                        onMouseLeave={() => setIsHoveredShare(false)}
                                        style={{ color: '#84dcc6' }} alt="Share" />
                                </Card.Link>
                            </Col>
                            <Col md={{ span: 4, offset: 4 }}>
                                <div className='blockquote-footer'>4 fev, 2024 as 18:30</div>
                            </Col>
                        </Row>

                        <Form style={{ marginTop: '10px' }}>
                            <InputGroup>
                                <Form.Control as="textarea" aria-label="With textarea" style={{ resize: 'none' }} placeholder='Comente na publicação ' />
                                <Button variant="primary">
                                    Comente
                                </Button>
                            </InputGroup>
                        </Form>
                        <hr />

                        <Card >
                            <Card.Header className='CardProfile' style={{ padding: '3px', paddingLeft: '5px' }}>
                                <Image src={img3} roundedCircle className='CardImageProfile' style={{ height: '30px', padding: '1px' }} /> Igão da Massazz
                            </Card.Header>
                            <Card.Body style={{ padding: '5px' }}>
                                <Card.Text style={{ textAlign: 'justify' }}>
                                    {truncatedText}
                                    {cardText.length > 225 && (
                                        <Button variant="link" onClick={handleExpand}>
                                            {expanded ? "Show less" : "...Show more"}
                                        </Button>
                                    )}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted d-flex align-items-center justify-content-between" style={{ padding: '1px', paddingLeft: '5%' }}>
                                <div>
                                    <Card.Link href="#">
                                        <FontAwesomeIcon
                                            size='xl'
                                            icon={isHovered ? faHeartSolid : faHeart}
                                            style={{ color: '#ff686b' }}
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        />
                                    </Card.Link>
                                </div>
                                <div style={{ width: '90%', padding: '1px' }}>
                                    <Form
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}>
                                        <InputGroup>
                                            <Form.Control as="textarea" aria-label="With textarea" style={{ resize: 'none', height: isFocused ? '80px' : '30px' }} placeholder='Responda esse comentario' />
                                            <Button variant="primary">
                                                Enviar Resposta
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                </div>
                            </Card.Footer>
                        </Card>
                        <div className="d-flex justify-content-end mt-2">
                            <Card.Link href="#" style={{ textAlign: 'right' }}>Show All Comments</Card.Link>
                        </div>
                    </Card.Body>

                </Card>











                {/* <button onClick={getImage}>
                    Obter Imagem
                    </button>
                    {uploadedImageUrl && (
                    <div className='UploadedImageView'>
                        <Image src={`http://localhost:8000/post/00bb26a91b61f4d05fcc5576b4c215a9.jpg`} alt="Uploaded Image" style={{ width: '200px' }} />
                    </div>
                )} */}


            </div>
        </div>
    );
}

export default Principal;


