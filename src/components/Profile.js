import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { usuarioId } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError('Error al obtener los datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [usuarioId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Bienvenido, {userData?.nombre || 'Invitado'}</h2>
    
      <a class="btn btn-primary"><Link className="navbar-brand" to="/form">
          Crear Producto
        </Link></a>
      <a class="btnverde btn btn-success"><Link className="navbar-brand" to="/posts">
          Mis Productos
        </Link></a>
    </div>
  );
};

export default Profile;