import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import Login from './Login/Login';
import Register from './Register/Register';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Begin from './Begin/Begin';
import Principal from './Principal/Principal';

function Body(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Verificar o estado de autenticação ao carregar o componente
    useEffect(() => {
        // Lógica para verificar se o usuário está logado, por exemplo, verificar o token JWT no localStorage
        const userLoggedIn = localStorage.getItem('token') !== null;
        setIsLoggedIn(userLoggedIn);
    }, []);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Principal />} />
                </Routes>
            </Router>
        </div>
    );
}

export default Body;
