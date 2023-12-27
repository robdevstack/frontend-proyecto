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
        const response = await fetch(`https://backend-jags.onrender.com/posts?usuario_id=${usuarioId}`, {
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

  return (
    <div>
      <h2 className='titulo-posts'>Tus Publicaciones</h2>
      <div className="overflow-auto" style={{ maxHeight: '400px' }}>
        <div className="row mb-4">
          {posts.map((post) => (
            <div key={post.id} className="col mb-4">
              <div className="card card1">
                <img
                  src={post.img}
                  className="card-img-top"
                  alt={post.titulo}
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
      </div>
    </div>
  );
};

export default Posts;
