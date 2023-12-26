import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://backend-jags.onrender.com/all-posts');
        if (response.status === 200) {
          setProductos(response.data);
          setProductosFiltrados(response.data); // Inicialmente, los productos filtrados son los mismos que todos los productos
        } else {
          console.error('Error al obtener los productos:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error.response || error.message || error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    // Filtra productos por título
    const productosFiltrados = productos.filter((producto) =>
      producto.titulo.toLowerCase().includes(filtro.toLowerCase())
    );
    setProductosFiltrados(productosFiltrados);
  }, [filtro, productos]);

  return (
    <div>
      <h2 className='titulo-posts'>Lista de Productos</h2>
      <div className="mb-3 d-flex justify-content-center align-items-center">
      <label htmlFor="filtro" className="form-label me-2"></label>
      <input
        type="text"
        id="filtro"
        className="form-control w-50"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder='Buscar por nombre'
      />
    </div>

      {productosFiltrados.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="col">
              <div className="card card1">
                <img
                  src={producto.img}
                  className="card-img-top"
                  alt={producto.titulo}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.titulo}</h5>
                  <p className="card-text">${producto.precio}</p>
                  {/* Agrega el enlace al detalle del producto si es necesario */}
                  <Link to={`/detalle/${producto.id}`} className="btn btn-primary">
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

export default Productos;