import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { usuarioId } = useAuth();
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem(`profileImage_${usuarioId}`) || null
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (usuarioId) {
          const url = `http://localhost:3000/usuarios/${usuarioId}`;
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUserData(response.data);
          // Actualizar la imagen de perfil solo si el usuarioId cambia
          setProfileImage(localStorage.getItem(`profileImage_${usuarioId}`) || null);
        } else {
          console.error('Error: usuarioId es null');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    fetchProfile();
  }, [usuarioId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem(`profileImage_${usuarioId}`, reader.result);
        swal('Imagen cambiada exitosamente!', 'presiona el boton ok', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (profileImage) {
        const formData = new FormData();
        formData.append('image', profileImage);
  
        const uploadResponse = await axios.post('https://backend-jags.onrender.com/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('URL de la imagen subida:', uploadResponse.data.url);
        // Puedes guardar la URL de la imagen en el localStorage u otro lugar según tus necesidades.
  
        // Muestra un alert de éxito
        alert('Imagen subida exitosamente!');
      } else {
        console.error('Error: No se ha seleccionado ninguna imagen.');
        // Muestra un alert de error
        alert('Error: No se ha seleccionado ninguna imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      // Muestra un alert de error
      alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
    }
  };

  const handleButtonClick = () => {
    // Simula un clic en el input file
    fileInputRef.current.click();
  };

  return (
    <div>
      {userData && (
        <div className='row d-flex justify-content-center mt-4 '>
        <div class="col-md-4">
            <div class="card profile-card-3">
                <div class="background-block">
                    <img src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="profile-sample1" class="background"/>
                </div>
                <div class="profile-thumb-block">
                    <img class="profile"
                    alt="profile-image"
                        src={profileImage || "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"}
                        />
                </div>
                <div class="card-content">
                    <h2>{userData.nombre}<small></small></h2>
                    <div className='d-flex justify-content-around'>
                    <button className='btn btn-light mt-3 mb-4' onClick={handleButtonClick}>Cambiar foto</button>
                    <Link to="/posts">
                    <button className='btn btn-light mt-3 mb-4'>Tus publicaciones</button>        </Link>
                    </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
                    </div>
                </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Profile;


        