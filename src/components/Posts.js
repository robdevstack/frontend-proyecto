import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Posts = () => {
  const { usuarioId } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/posts?usuario_id=${usuarioId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          localStorage.setItem('posts', JSON.stringify(data));
        } else {
          console.error('Error al obtener los posts del usuario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los posts del usuario:', error.message);
      }
    };

    fetchUserPosts();
  }, [usuarioId]);

  const renderPosts = () => {
    return (
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
                <Link to={`/detalle/${post.id}`} className="btn btn-primary">
                  Ver Más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <a className="btnverde btn btn-success">
        <Link className="navbar-brand" to="/form">
          Volver al formulario
        </Link>
      </a>
      <h2 className='titulo-posts'>Lista de Productos</h2>
      {posts.length === 0 ? <p>No hay posts disponibles.</p> : renderPosts()}
    </div>
  );
};

export default Posts;