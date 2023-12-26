// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Form from './components/Form';
import Posts from './components/Posts';
import Home from './components/Home';
import Detalle from './components/Detalle';
import { AuthProvider } from './components/AuthContext';
import Productos from './components/Productos';

const App = () => {
  
  const initialLoggedInState = localStorage.getItem('loggedIn') === 'true';
  const [loggedIn, setLoggedIn] = useState(initialLoggedInState);

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  const handleAddPost = async (postData) => {
    try {
      // Tu lógica para agregar el post al servidor
      console.log('Nuevo post:', postData);
    } catch (error) {
      console.error('Error al agregar el post:', error);
    }
  };
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (loggedIn) {
          const token = localStorage.getItem('token');
          const usuarioId = localStorage.getItem('usuarioId'); // Obtener el ID del usuario autenticado
  
          const response = await fetch(`https://backend-jags.onrender.com/posts?usuario_id=${usuarioId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
          }
  
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Error al obtener los posts:', error.message);
      }
    };
  
    fetchPosts();
  }, [loggedIn]);

  return (
    <AuthProvider>
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route
            path='/login'
            element={
              loggedIn ? (
                <Navigate to='/profile' />
              ) : (
                <Login onLogin={() => setLoggedIn(true)} />
              )
            }
          />
          <Route path='/register' element={<Register />} />
          <Route
            path='/form'
            element={
              loggedIn ? (
                <Form onAddPost={handleAddPost} />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            path='/posts'
            element={
              loggedIn ? (
                <Posts posts={posts} />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            path='/profile'
            element={
              loggedIn ? (
                <>
                  <Profile />
                </>
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            path='/detalle/:id'
            element={
              loggedIn ? (
                <Detalle posts={posts} />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
                    <Route
            path='/productos'
            element={
              loggedIn ? (
                <Productos posts={posts}/>
              ) : (
                <Navigate to='/login' />
              )
            }
          />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App; 