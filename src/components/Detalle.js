import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detalle = ({ posts }) => {
  const { id } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPostFromServer = async () => {
      try {
        const response = await fetch(`https://backend-jags.onrender.com/all-posts`);
        if (response.ok) {
          const data = await response.json();
          const post = data.find(product => product.id === parseInt(id, 10));
          setSelectedPost(post);
        } else {
          console.error('Error al obtener el producto del servidor:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener el producto del servidor:', error.message);
      }
    };

    fetchPostFromServer();
  }, [id]);

  if (!selectedPost) {
    return <p>Post no encontrado.</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card card2 mb-3">
        <img className="card-img-top" src={selectedPost.img} alt="Card" />
        <div className="card-body">
          <h5 className="card-title">{selectedPost.titulo}</h5>
          <p className="card-text">{selectedPost.descripcion}</p>
          <p className="card-text"><small className="text-muted">${selectedPost.precio}</small></p>
        </div>
      </div>
    </div>
  );
};

export default Detalle;