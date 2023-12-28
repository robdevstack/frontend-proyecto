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
            <div class="card border-0 rounded-0 shadow" style={{width: '18rem'}}>
    <img src={post.img} class="card-img-top rounded-0" alt="..."/>
    <div class="card-body mt-3 mb-3">
        <div class="row">
            <div class="col-10">
                <h4 class="card-title">{post.titulo}</h4>
                <p class="card-text">
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                </p>
            </div>
            <div class="col-2">
                <i class="bi bi-bookmark-plus fs-2"></i>
            </div>
        </div>
    </div>
    <div class="row align-items-center text-center g-0">
        <div class="col-4">
            <h5>{post.precio}</h5>
        </div>
        <div class="col-8">
            <a href="#" class="btn btn-dark w-100 p-3 rounded-0 text-warning">VER MAS</a>
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
