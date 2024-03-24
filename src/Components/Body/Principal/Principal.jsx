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
    const [selectedImages, setSelectedImages] = useState(['']);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [authToken, setAuthToken] = useState('');


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
            alert('Erro ao obter a imagem. Por favor, tente novamente.');
        }
    }


    // useEffect para chamar a função getImage quando uploadedImageUrl mudar
    useEffect(() => {
        getImage();
    }, [uploadedImageUrl]);



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
                                <Form.Control as="textarea" aria-label="With textarea" style={{ resize: 'none' }} placeholder='Comente na publicação' />
                                <Button variant="primary">
                                    Comente
                                </Button>
                            </InputGroup>


                        </Form>
                    </Card.Body>
                </Card>
                <button onClick={getImage}>
                    Obter Imagem
                </button>
                {uploadedImageUrl && (
                    <div className='UploadedImageView'>
                        <Image src={`http://localhost:8000/00bb26a91b61f4d05fcc5576b4c215a9.jpg`} alt="Uploaded Image" style={{ width: '200px' }} />
                    </div>
                )}


            </div>
        </div>
    );
}

export default Principal;


