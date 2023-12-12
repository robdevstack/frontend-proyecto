// Detalle.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Detalle = ({ posts }) => {
  const { id } = useParams();
  const selectedPost = posts.find((post) => post.id === parseInt(id, 10));

  if (!selectedPost) {
    return <p>Post no encontrado.</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div class="card card2 mb-3">
        <img class="card-img-top" src={selectedPost.img} alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{selectedPost.titulo}</h5>
          <p class="card-text">{selectedPost.descripcion}</p>
          <p class="card-text"><small class="text-muted">${selectedPost.precio}</small></p>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
