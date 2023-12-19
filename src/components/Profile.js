// Profile.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { usuarioId } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://backend-jags.onrender.com/usuarios/${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    fetchProfile();
  }, [usuarioId]);

  return (
    <div>
      <h2>Bienvenido, {userData?.nombre}</h2>
      <Link to="/form">Crear Producto</Link>
      <Link to="/posts">Mis Productos</Link>
    </div>
  );
};

export default Profile;