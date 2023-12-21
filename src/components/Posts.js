import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Posts = () => {
  const { usuarioId } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Obtiene la lista de posts desde localStorage al montar el componente
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    // Filtra los posts por el usuarioId actual
    const userPosts = storedPosts.filter((post) => post.usuario_id === usuarioId);
    setPosts(userPosts);
  }, [usuarioId]);

  return (
    <div>
      <a className="btnverde btn btn-success">
        <Link className="navbar-brand" to="/form">
          Volver al formulario
        </Link>
      </a>
      <h2 className='titulo-posts'>Lista de Productos</h2>
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