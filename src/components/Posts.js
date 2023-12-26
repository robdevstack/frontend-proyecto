import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posts = () => {
  const { usuarioId } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:3000/posts?usuario_id=${usuarioId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.error('Error al obtener los posts:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los posts:', error.response || error.message || error);
      }
    };

    fetchPosts();
  }, [usuarioId]);

  return (
    <div>
      <h2 className='titulo-posts'>Tus publicaciones</h2>
      {posts.length === 0 ? (
        <p>No hay posts disponibles.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {posts.map((post) => (
            <div key={post.id} className="col">
              <div className="card card1">
                <img
                  src={post.img}
                  className="card-img-top"
                  alt={post.titulo}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.titulo}</h5>
                  <p className="card-text">${post.precio}</p>
                  {/* Puedes personalizar el enlace según tu estructura de rutas */}
                  <Link to={`/detalle/${post.id}`} className="btn btn-primary">
                    Ver Más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;