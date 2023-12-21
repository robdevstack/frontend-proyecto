import React from 'react';
import { useParams } from 'react-router-dom';

const Detalle = ({ posts }) => {
  const { id } = useParams();

  // Verifica si los posts aún no están disponibles
  if (!posts || posts.length === 0) {
    return <p>Cargando...</p>;
  }

  const selectedPost = posts.find((post) => post.id === parseInt(id, 10));

  if (!selectedPost) {
    return <p>Post no encontrado.</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card card2 mb-3">
        <img className="card-img-top" src={selectedPost.img} alt="Card image cap" />
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