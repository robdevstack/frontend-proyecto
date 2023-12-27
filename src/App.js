import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Form from './components/Form';
import Posts from './components/Posts';
import Detalle from './components/Detalle';
import { AuthProvider } from './components/AuthContext';
import Productos from './components/Productos';

const App = () => {
  const initialLoggedInState = localStorage.getItem('loggedIn') === 'true';
  const [loggedIn, setLoggedIn] = useState(initialLoggedInState);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (loggedIn) {
          const token = localStorage.getItem('token');
          const usuarioId = localStorage.getItem('usuarioId');

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

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  const handleAddPost = async (postData) => {
    try {
      console.log('Nuevo post:', postData);
    } catch (error) {
      console.error('Error al agregar el post:', error);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
          <Routes>
            <Route
              path='/'
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
                  <Navigate to='/' />
                )
              }
            />
            <Route
              path='/posts'
              element={
                loggedIn ? (
                  <Posts posts={posts} />
                ) : (
                  <Navigate to='/' />
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
                  <Navigate to='/' />
                )
              }
            />
            <Route
              path='/detalle/:id'
              element={
                loggedIn ? (
                  <Detalle posts={posts} />
                ) : (
                  <Navigate to='/' />
                )
              }
            />
            <Route
              path='/productos'
              element={
                loggedIn ? (
                  <Productos posts={posts} />
                ) : (
                  <Navigate to='/' />
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