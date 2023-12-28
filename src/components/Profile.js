import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import Posts from './Posts';
import swal from 'sweetalert';

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
          const url = `https://backend-jags.onrender.com/upload/usuarios/${usuarioId}`;
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
        <section className="vh-100 style1">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-start align-items-start h-100">
              <div className="col col-lg-6 mb-4 mb-lg-0">
                <div className="card mb-3 style2">
                  <div className="row g-0">
                    <div className="col-md-4 gradient-custom text-center text-white style3">
                      <img
                        className="imgRedonda"
                        src={profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHOXipijomsjnTofMFdcROq6_jqejPsvzfAg&usqp=CAU"}
                        alt="Avatar"
                      />
                      <h5>{userData.nombre}</h5>
                      <button className='btn btn-primary mb-4' onClick={handleButtonClick}>Subir foto</button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Información del usuario</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{userData.email}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Phone</h6>
                            <p className="text-muted">123 456 789</p>
                          </div>
                        </div>
                        <h6>Projects</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Recent</h6>
                            <p className="text-muted">Lorem ipsum</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Most Viewed</h6>
                            <p className="text-muted">Dolor sit amet</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start">
                          <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                          <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                          <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-lg-6">
                <Posts />
              </div>
            </div>
            <p></p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;