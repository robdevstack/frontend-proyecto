import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Posts = () => {
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIds = storedPosts.map(post => post.id);

    // Verificar si los posts almacenados en localStorage aún existen en la base de datos
    const postsExist = posts.every(post => postIds.includes(post.id));

    if (!postsExist) {
      // Limpiar localStorage si algunos posts no existen en la base de datos
      localStorage.removeItem('posts');
      setPosts([]); // Clear the posts state
    } else {
      setPosts(storedPosts);
    }
  }, []);
  return (
    <div>
                    <a className="btnverde btn btn-success"><Link className="navbar-brand" to="/form">
          volver al formulario
        </Link></a>
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