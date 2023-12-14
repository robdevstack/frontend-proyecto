// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/usuarios', {
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

      <a href="http://localhost:3001/form" class="btn btn-primary">Crear producto</a>


    </div>
  );
};

export default Profile;