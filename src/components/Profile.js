import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import script from '../script'; // Asegúrate de que este import esté presente
const Profile = () => {
  const { usuarioId } = useAuth();
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(localStorage.getItem(`profileImage_${usuarioId}`) || null);
  const fileInputRef = useRef(null);
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

  useEffect(() => {
    // Inicia el script que maneja el cambio de temas
    script();

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (usuarioId) {
          const url = `https://backend-jags.onrender.com/usuarios/${usuarioId}`;
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUserData(response.data);
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
        swal('Imagen cambiada exitosamente!', 'Presiona el botón OK', 'success');
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
        alert('Imagen subida exitosamente!');
      } else {
        console.error('Error: No se ha seleccionado ninguna imagen.');
        alert('Error: No se ha seleccionado ninguna imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
    }
  };

  const handleButtonClick = () => {
    const themeSwitcherWrapper = document.getElementById('theme-switcher-wrapper');
    if (themeSwitcherWrapper) {
      themeSwitcherWrapper.classList.toggle('is-open');
    }
  };
  const handleButtonClik = () => {
    // Simula un clic en el input file
    fileInputRef.current.click();
  };

  const handleThemeClick = (e) => {
    const selectedTheme = e.currentTarget.dataset.theme;
    document.body.className = `theme-${selectedTheme}`;
  };

  return (
    <div>
      {userData && (
        <div class="row py-5 px-4"> <div class="col-md-5 mx-auto">
          <div class="bg-white shadow rounded overflow-hidden">
           <div class="px-4 pt-0 pb-4 cover"> 
           <div class="media align-items-end d-flex justify-content-start profile-head">
            <div class="profile">
            <img src={profileImage || "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"} alt="..." width="130" class="rounded mb-2 img-thumbnail"/>
              </div> 
              &nbsp;&nbsp;&nbsp;
              <div class="media-body mb-5 ml-3 text-white "> 
              <h4 className="card-title">{(userData.nombre || '').charAt(0).toUpperCase() + (userData.nombre || '').slice(1)}</h4>
              <p class="small mb-4"> <i class="fas fa-map-marker-alt mr-2"></i>{userData.numero}</p> 
              </div>
               </div>
                </div>
                 <div class="bg-light p-4 d-flex mt-5 justify-content-between text-center">
                 <a class="btn btn-outline-dark btn-sm btn-block"onClick={handleButtonClik}>
                  Editar foto</a>
                  <Link to="/form"><a class="btn btn-outline-dark btn-sm btn-block">
                  Publicar nuevo </a></Link>
                  <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
                      </div>

                          <div class="py-4 px-4"> 
                          <div class="d-flex align-items-center justify-content-between mb-3"> 
                          <h5 class="mb-0">Tus Publicaciones</h5>
                          <Link to="/posts"><a href="#" class="btn btn-link text-muted">Mostrar todo </a></Link>
                           </div> 
                           <div class="row"> 
                           {posts.map((post) => (

                           <div class="col-lg-6 mb-2 pr-lg-1">

                            <img src={post.img} alt="" class="img-fluid rounded shadow-sm"/>

                            </div> 
                                                        ))} 

                                  </div>
                                  </div> 
                                  </div> 
                                  </div>
        </div>
      )}
    </div>
  );
};

export default Profile;





