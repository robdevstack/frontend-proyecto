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
      <div className="container d-flex justify-content-center">
        <div className="row row-cols-1 row-cols-md-3 mb-4">
          {posts.map((post) => (
            <div key={post.id} className="col">
              <div className="card border-0 rounded-0 shadow w-75 mt-4 mx-auto">
                <img src={post.img} className="card-img-top rounded-0" alt="..." />
                <div className="card-body mt-3 mb-3">
                  <div className="row">
                    <div className="col-10">
                      <h4 className="card-title">{post.titulo}</h4>
                      <p className="card-text">
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                      </p>
                    </div>
                    <div className="col-2">
                      <i className="bi bi-bookmark-plus fs-2"></i>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center text-center g-0">
                  <div className="col-4">
                    <h5>${post.precio}</h5>
                  </div>
                  <div className="col-8">
                    <Link to={`/detalle/${post.id}`} className="btn btn-dark w-100 p-3 rounded-0 text-warning">
                      VER MAS
                    </Link>
                  </div>
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
