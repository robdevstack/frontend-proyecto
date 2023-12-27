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
  
        if (usuarioId) {
          const url = `http://localhost:3000/usuarios/${usuarioId}`;
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          console.log('usuarioId:', usuarioId);
          console.log('Datos del usuario:', response.data);
          setUserData(response.data);
        } else {
          console.error('Error: usuarioId es null');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };
  
    fetchProfile();
  }, [usuarioId]);
  
  console.log('userData:', userData);// Agregado para imprimir userData en la consola

  return (
    <div>
      {userData && (
        <div>
          <h2>Bienvenido {userData.nombre}</h2>
          <a className="btn btn-primary">
            <Link className="navbar-brand" to="/form">
              Crear Producto
            </Link>
          </a>
          <a className="btnverde btn btn-success">
            <Link className="navbar-brand" to="/posts">
              Mis Productos
            </Link>
          </a>
        </div>
      )}
    </div>
  );
};

export default Profile;