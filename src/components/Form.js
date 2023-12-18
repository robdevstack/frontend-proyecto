import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = ({ onAddPost }) => {
  const [titulo, setTitulo] = useState('');
  const [img, setImg] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const navigate = useNavigate();

  const agregarPost = async () => {
    try {
      const response = await axios.post(
        'https://backend-jags.onrender.com/posts',
        {
          titulo,
          img,
          descripcion,
          precio,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        // Llama a la función proporcionada por el componente padre para manejar la lógica de agregar post
        onAddPost(response.data);

        // Limpiar los campos después de agregar el post
        setTitulo('');
        setImg('');
        setDescripcion('');
        setPrecio('');

        // No redirige a la nueva ruta después de agregar el post
        // navigate('/posts'); // Remove this line
      } else {
        console.error('Error al agregar el post:', response.data);
      }
    } catch (error) {
      console.error('Error en la solicitud para agregar el post:', error.response || error.message || error);
    }
  };

  return (
    <div className="App">
      <h2 className="py-5 text-center">Agregar Producto</h2>
      <div className="row m-auto px-5">
        <div className='form'>
          <div className='mb-2'>
            <h6>Agregar post</h6>
            <label>Título</label>
            <input
              onChange={(event) => setTitulo(event.target.value)}
              value={titulo}
              className='form-control'
            />
          </div>
          <div className='mb-2'>
            <label>URL de la imagen</label>
            <input
              onChange={(event) => setImg(event.target.value)}
              value={img}
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label>Descripción</label> <br />
            <textarea
              onChange={(event) => setDescripcion(event.target.value)}
              value={descripcion}
              className='form-control'
            />
          </div>
          <div className='mb-2'>
            <label>Precio</label>
            <input
              onChange={(event) => setPrecio(event.target.value)}
              value={precio}
              className='form-control'
            />
          </div>
          <div className='d-flex'>
            <button type="button" onClick={agregarPost} className="btn btn-primary m-auto">
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;