// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend-jags.onrender.com/usuarios', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Bienvenido, {userData?.nombre}</h2>
      
      <a class="btn btn-primary"><Link className="navbar-brand" to="/form">
          Crear Producto
        </Link></a>
        <a class="btnverde btn btn-success"><Link className="navbar-brand" to="/form">
          volver al formulario
        </Link></a>


    </div>
  );
};

export default Profile;