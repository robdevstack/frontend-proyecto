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
          setProductosFiltrados(response.data);
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
    const productosFiltrados = productos.filter((producto) =>
      (producto.titulo || '').toLowerCase().includes((filtro || '').toLowerCase())
    );
    setProductosFiltrados(productosFiltrados);
  }, [filtro, productos]);

  return (
    <div>
      <div className="mb-3 d-flex justify-content-center align-items-center">
        <label htmlFor="filtro" className="form-label me-2"></label>
        <input
          type="text"
          id="filtro"
          className="form-control w-50 mt-4 mb-4"
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
            <div key={producto.id} className="col mb-4">
              <div className="card rounded-top border-0 shadow w-75 mx-auto">
                <img
                  src={producto.img}
                  className="rounded-top card-img-top rounded-0"
                  alt="..."
                  style={{ width: '100%', height: '280px', backgroundSize: 'cover' }}
                />
                <div className="card-body mt-3 mb-3">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                      <h4 className="card-title">{(producto.titulo || '').charAt(0).toUpperCase() + (producto.titulo || '').slice(1)}</h4>
                    </div>
                  </div>
                </div>
                <div className="row rounded-bottom align-items-center text-center g-0">
                  <div className="col-4">
                    <h5>${producto.precio}</h5>
                  </div>
                  <div className="col-8">
                    <Link to={`/detalle/${producto.id}`} className="btn btn-dark w-100 p-3 rounded-0 text-warning">
                      VER MAS
                    </Link>
                  </div>
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