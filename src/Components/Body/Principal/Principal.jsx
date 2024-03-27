import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import img1 from '../../../assets/Begin/peoples-planting.jpg';
import img2 from '../../../assets/Begin/smelling-plant.jpg';
import img3 from '../../../assets/Begin/arvore.jpg';
import imgDefaultUser from '../../../assets/default-user-icon.jpg'



import './Principal.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, ListGroup, InputGroup, Row, Image, Collapse, Form, FormLabel, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faImage, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faImage as faImageSolid, faShareSquare as faShareSquareSolid } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import { format } from 'date-fns';


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

    const [postReceived, setPostReceived] = useState([]);
    const [expandedPosts, setExpandedPosts] = useState({});



    const [commentContent, setCommentContent] = useState({});
    const [showComments, setShowComments] = useState();

    const [showAllComments, setShowAllComments] = useState({});




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

    const handleFocusResponse = (commentId) => {
        setIsFocused({
            ...isFocused,
            [commentId]: true // Alterna entre true e false para o postId fornecido
        });
    };

    const handleBlurResponse = (commentId) => {
        setIsFocused({
            ...isFocused,
            [commentId]: false // Alterna entre true e false para o postId fornecido
        });
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
            const response = await Axios.post('http://localhost:8000/post/nsew', formData, {
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

    const handlePostCommentSubmit = async (event, elementId) => {
        event.preventDefault();
        const formData = new FormData();
        const authToken = localStorage.getItem('authToken');
        console.log(authToken);

        formData.append('content', commentContent[elementId]);
        formData.append('postId', elementId);

        console.log(elementId)

        try {
            await Axios.post('http://localhost:8000/post/new', formData, {
                headers: {
                    'Authorization': `${authToken}`
                },
            });
            alert('Comentário enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            alert('Erro ao enviar comentário. Por favor, tente novamente.');
        }
    };

    async function getImage() {
        // try {
        //     const response = await Axios.get('http://localhost:8000/00bb26a91b61f4d05fcc5576b4c215a9.jpg');
        //     console.log(response.data);
        //     setPostReceived(response.data);
        // } catch (error) {
        //     console.error('Erro ao obter a imagem:', error);
        //     // alert('Erro ao obter a imagem. Por favor, tente novamente.');
        // }
    }

    const showLessComments = () => {
        const decreaseBy = 3; // Quantidade para diminuir, pode ser ajustado conforme necessário
        const minShowComments = 1; // Valor mínimo para showComments

        if (showComments > minShowComments) {
            // Calcula o novo valor de showComments, garantindo que não seja menor que o mínimo
            const newShowComments = Math.max(showComments - decreaseBy, minShowComments);
            setShowComments(newShowComments);
        }
    };

    const showMoreComments = () => {
        setShowComments(showComments + 3);

    };

    async function getAllPosts() {
        try {
            const response = await Axios.get('http://localhost:8000/post/all');
            console.log(response.data);
            setPostReceived(response.data);
        } catch (error) {
            console.error('Erro ao obter a imagem:', error);
            // alert('Erro ao obter a imagem. Por favor, tente novamente.');
        }
    }


    // useEffect para chamar a função getImage quando uploadedImageUrl mudar
    useEffect(() => {
        getImage();
    }, [uploadedImageUrl]);

    const handleTextExpand = (postId) => {
        setExpandedPosts({
            ...expandedPosts,
            [postId]: !expandedPosts[postId] // Alterna entre true e false para o postId fornecido
        });
    };



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



                {postReceived && postReceived.length > 0 && (
                    postReceived.map((element, index) => (
                        <Card className='CardPrincipal '>
                            <Card.Title className='CardProfile' >
                                <Image src={img3} roundedCircle className='CardImageProfile' />
                                <div className='CardTextProfile'>
                                    {element.authorName ? element.authorName : ''}
                                </div>
                                {element.plants && element.plants.length > 0 ? (
                                    element.plants.map((plantName, index) => (
                                        <Card.Link key={index} href="#" className='CardPlantProfile'>{plantName}</Card.Link>
                                    ))
                                ) : (
                                    <Card.Link href="#" className='CardPlantProfile'>Sem Planta</Card.Link>
                                )}


                            </Card.Title>
                            <hr style={{ marginTop: '0px' }} />

                            <Card.Text className='CardText' >
                                {console.log(index, expandedPosts[element._id])}
                                {element.text && (
                                    expandedPosts[element._id] ? element.text : element.text.slice(0, 215)
                                )}
                                {element.text && element.text.length > 215 && ( 
                                    <Button variant="link" onClick={() => handleTextExpand(element._id)}>
                                        {expandedPosts[element._id] ? "Show less" : "... Show more"}
                                    </Button>
                                )}
                            </Card.Text>

                            {element.imageSrc.length > 0 && (
                                element.imageSrc.length > 1 ? (
                                    <Carousel>
                                        {element.imageSrc.map((image, index) => (
                                            <Carousel.Item key={index}>
                                                <div style={{ position: 'relative', overflow: 'hidden' }}>
                                                    <div className='CardImageBg' style={{ backgroundImage: `url(http://localhost:8000/post/${image})` }}></div>
                                                    <Card.Img src={`http://localhost:8000/post/${image}`} className='CardImage' />
                                                </div>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                ) : (
                                    element.imageSrc.map((image, index) => (
                                        <div key={index} style={{ position: 'relative', overflow: 'hidden' }}>
                                            <div className='CardImageBg' style={{ backgroundImage: `url(http://localhost:8000/post/${image})` }}></div>
                                            <Card.Img src={`http://localhost:8000/post/${image}`} className='CardImage' />
                                        </div>
                                    ))
                                )
                            )}

                            <Card.Body className="CardBody">
                                <Row>
                                    <Col md={4}>
                                        <Card.Link href="#">
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <FontAwesomeIcon
                                                    size='xl'
                                                    icon={isHoveredHeart1[element._id] ? faHeartSolid : faHeart}
                                                    onMouseEnter={() => setIsHoveredHeart1({
                                                        ...isHoveredHeart1,
                                                        [element._id]: true // Alterna entre true e false para o postId fornecido
                                                    })}
                                                    onMouseLeave={() => setIsHoveredHeart1({
                                                        ...isHoveredHeart1,
                                                        [element._id]: false // Alterna entre true e false para o postId fornecido
                                                    })}
                                                    style={{ color: '#ff686b' }} />
                                                <Badge bg="secondary CardBadge" style={{ position: 'absolute', top: '-10px', right: '-18px', opacity: '0.7', borderRadius: '50%' }}>{element.likes.length}</Badge>
                                            </div>
                                        </Card.Link>

                                        <Card.Link href="#">
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <FontAwesomeIcon
                                                    size='xl'
                                                    icon={isHoveredShare[element._id] ? faShareSquareSolid : faShareSquare}
                                                    onMouseEnter={() => setIsHoveredShare({
                                                        ...isHoveredShare,
                                                        [element._id]: true // Alterna entre true e false para o postId fornecido
                                                    })}
                                                    onMouseLeave={() => setIsHoveredShare({
                                                        ...isHoveredShare,
                                                        [element._id]: false // Alterna entre true e false para o postId fornecido
                                                    })}
                                                    style={{ color: '#84dcc6' }} alt="Share" />

                                                <Badge bg="secondary CardBadge" style={{ position: 'absolute', top: '-10px', right: '-18px', opacity: '0.7', borderRadius: '50%' }}>{element.shares.length}</Badge>
                                            </div>
                                        </Card.Link>
                                    </Col>
                                    <Col md={{ span: 4, offset: 4 }}>
                                        <div className='blockquote-footer'>Posted {format(new Date(element.createdAt), "dd 'de' MMM 'de' yyyy 'às' HH:mm")}</div>
                                    </Col>
                                </Row>

                                <Form onSubmit={(event) => handlePostCommentSubmit(event, element._id)} style={{ marginTop: '10px' }}>
                                    <InputGroup>
                                        <Form.Control
                                            as="textarea"
                                            aria-label="With textarea"
                                            style={{ resize: 'none' }}
                                            placeholder="Comente na publicação "
                                            value={commentContent[element._id]}
                                            onChange={(event) => setCommentContent({ ...commentContent, [element._id]: event.target.value })}
                                        />
                                        <Button variant="primary" type="submit">
                                            Comente
                                        </Button>
                                    </InputGroup>
                                </Form>
                                {/* <Form style={{ marginTop: '10px' }}>
                                    <InputGroup>
                                        <Form.Control as="textarea" aria-label="With textarea" style={{ resize: 'none' }} placeholder='Comente na publicação ' />
                                        <Button variant="primary">
                                            Comente
                                        </Button>
                                    </InputGroup>
                                </Form> */}


                                {element.comments.length > 0 && (
                                    <hr />
                                )}
                                <hr />


                                {element.comments.map((comment, index) => (
                                    <div>
                                        {console.log(comment,'za')}
                                        <Card>
                                            <Card.Header className='CardProfile' style={{ padding: '3px', paddingLeft: '5px' }}>
                                                <Image
                                                    src={comment.authorCommentImage ? `http://localhost:8000/post/${comment.authorCommentImage}` : imgDefaultUser}
                                                    roundedCircle
                                                    className='CardImageProfile'
                                                    style={{ height: '30px', padding: '1px' }}
                                                />
                                                {comment.authorCommentName}
                                            </Card.Header>

                                            <Card.Body style={{ padding: '5px' }}>
                                                <Card.Text style={{ textAlign: 'justify' }}>
                                                    {comment && comment.text && (
                                                        <>
                                                            {expandedPosts[comment._id] ? comment.text : comment.text.slice(0, 215)}
                                                            {comment.text.length > 215 && (
                                                                <Button variant="link" onClick={() => handleTextExpand(comment._id)}>
                                                                    {expandedPosts[comment._id] ? "Show less" : "... Show more"}
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                </Card.Text>
                                            </Card.Body>



                                            <Card.Footer className="text-muted d-flex align-items-center justify-content-between" style={{ padding: '1px', paddingLeft: '5%' }}>
                                                <div>

                                                    <Card.Link href="#">
                                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                                            <FontAwesomeIcon
                                                                size='xl'
                                                                icon={isHoveredHeart1[comment._id] ? faHeartSolid : faHeart}
                                                                onMouseEnter={() => setIsHoveredHeart1({
                                                                    ...isHoveredHeart1,
                                                                    [comment._id]: true // Alterna entre true e false para o postId fornecido
                                                                })}
                                                                onMouseLeave={() => setIsHoveredHeart1({
                                                                    ...isHoveredHeart1,
                                                                    [comment._id]: false // Alterna entre true e false para o postId fornecido
                                                                })}
                                                                style={{ color: '#ff686b' }}
                                                            />
                                                            <Badge bg="secondary CardBadge" style={{ position: 'absolute', top: '-10px', right: '-18px', opacity: '0.7', borderRadius: '50%' }}>
                                                                {comment.likes && comment.likes.length}
                                                            </Badge>
                                                        </div>
                                                    </Card.Link>
                                                </div>
                                                <div style={{ width: '90%', padding: '1px' }}>
                                                    <Form
                                                        onFocus={handleFocusResponse}
                                                        onBlur={handleBlurResponse}>
                                                        <InputGroup>
                                                            <Form.Control as="textarea" aria-label="With textarea" style={{ resize: 'none', height: isFocused[comment.id] ? '80px' : '30px' }} placeholder='Responda esse comentario' />
                                                            <Button variant="primary">
                                                                Enviar Resposta
                                                            </Button>
                                                        </InputGroup>
                                                    </Form>
                                                </div>
                                            </Card.Footer>
                                        </Card>

                                    </div>
                                ))}

                                <div className="d-flex justify-content-end mt-2">
                                    {element.comments.length > 1 && element.comments.length <= showComments && (
                                        <Card.Link href="#" style={{ textAlign: 'right' }} onClick={showLessComments}>Less Comments</Card.Link>
                                    )}
                                    {element.comments.length > 1 && element.comments.length < showComments && (
                                        <Card.Link href="#" style={{ textAlign: 'right' }} onClick={showMoreComments}>More Comments</Card.Link>
                                    )}

                                </div>


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

                                {element.comments.length > 1 && (
                                    <div className="d-flex justify-content-end mt-2">
                                        <Card.Link href="#" style={{ textAlign: 'right' }} onClick={() => setShowAllComments(true)}>Show All Comments</Card.Link>
                                    </div>
                                )}
                            </Card.Body>

                        </Card>
                    ))

                )}

                <button onClick={getAllPosts}>
                    Obter posts
                </button>

                <button onClick={() => setPostReceived([])}>
                    Limpar para teste
                </button>




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


