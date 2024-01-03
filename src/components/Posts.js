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
                        <div className="card rounded-top border-0 shadow w-75 mx-auto">
                        <img src={post.img} className="rounded-top card-img-top rounded-0" alt="..." style={{ width: '100%', height: '280px', backgroundSize: 'cover' }} />
                          <div className="card-body mt-3 mb-3">
                            <div className="row">
                              <div className="col-12 d-flex justify-content-center">
                              <h4 className="card-title">{(post.titulo || '').charAt(0).toUpperCase() + (post.titulo || '').slice(1)}</h4>
                              </div>
                            </div>
                          </div>
                          <div className="row rounded-bottom align-items-center text-center g-0">
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
