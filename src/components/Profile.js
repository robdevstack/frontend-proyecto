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
  const [activeTheme, setActiveTheme] = useState('orange'); // Nuevo estado para el tema activo


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
        <div class="profile-page">
 <div class="content">
   <div class="content__cover">
     <img class="content__avatar" src={profileImage || "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"}/>
     <div class="content__bull"><span></span><span></span><span></span><span></span><span></span>
     </div>
   </div>
   <div class="content__actions"> <a onClick={handleButtonClik}>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
         <path fill="currentColor" d="M192 256A112 112 0 1 0 80 144a111.94 111.94 0 0 0 112 112zm76.8 32h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 0 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 268.8 288z"></path>
         <path fill="currentColor" d="M480 256a96 96 0 1 0-96-96 96 96 0 0 0 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592a48 48 0 0 0 48-48 111.94 111.94 0 0 0-112-112z"></path>
       </svg><span >Cambiar Foto</span></a><Link to="/posts"><a href="#">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
         <path fill="currentColor" d="M208 352c-41 0-79.1-9.3-111.3-25-21.8 12.7-52.1 25-88.7 25a7.83 7.83 0 0 1-7.3-4.8 8 8 0 0 1 1.5-8.7c.3-.3 22.4-24.3 35.8-54.5-23.9-26.1-38-57.7-38-92C0 103.6 93.1 32 208 32s208 71.6 208 160-93.1 160-208 160z"></path>
         <path fill="currentColor" d="M576 320c0 34.3-14.1 66-38 92 13.4 30.3 35.5 54.2 35.8 54.5a8 8 0 0 1 1.5 8.7 7.88 7.88 0 0 1-7.3 4.8c-36.6 0-66.9-12.3-88.7-25-32.2 15.8-70.3 25-111.3 25-86.2 0-160.2-40.4-191.7-97.9A299.82 299.82 0 0 0 208 384c132.3 0 240-86.1 240-192a148.61 148.61 0 0 0-1.3-20.1C522.5 195.8 576 253.1 576 320z"></path>
       </svg><span>Publicaciones</span></a></Link></div>
       <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
   <div class="content__title">
     <h1>{userData.nombre}</h1><span className='text-secondary'>{userData.numero}</span>
   </div>
   <div class="content__description">
     {/* <p>Web Producer - Web Specialist</p>
     <p>Columbia University - New York</p> */}
   </div>
   {/* <ul class="content__list">
     <li><span>65</span>Friends</li>
     <li><span>43</span>Photos</li>
     <li><span>21</span>Comments</li>
   </ul> */}
   <div class="content__button"> <Link to="/form"><a class="button" href="#">
       <div class="button__border"></div>
       <div class="button__bg"></div>
       <p class="button__text">Publicar</p></a></Link></div>
 </div>
 <div class="bg">
   <div><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
   </div>
 </div>
 <div className="theme-switcher-wrapper" id="theme-switcher-wrapper">
            <span>Themes color</span>
            <ul className=" d-flex justify-content-center ">
              <li onClick={handleThemeClick} data-theme="orange">
                <em className={activeTheme === 'orange' ? 'is-active' : ''}></em>
              </li>
              <li onClick={handleThemeClick} data-theme="green">
                <em className={activeTheme === 'green' ? 'is-active' : ''}></em>
              </li>
              <li onClick={handleThemeClick} data-theme="purple">
                <em className={activeTheme === 'purple' ? 'is-active' : ''}></em>
              </li>
              <li onClick={handleThemeClick} data-theme="blue">
                <em className={activeTheme === 'blue' ? 'is-active' : ''}></em>
              </li>
            </ul>
          </div>
          <div
            className="theme-switcher-button"
            id="theme-switcher-button"
            onClick={handleButtonClick}
          >
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
     <path fill="currentColor" d="M352 0H32C14.33 0 0 14.33 0 32v224h384V32c0-17.67-14.33-32-32-32zM0 320c0 35.35 28.66 64 64 64h64v64c0 35.35 28.66 64 64 64s64-28.65 64-64v-64h64c35.34 0 64-28.65 64-64v-32H0v32zm192 104c13.25 0 24 10.74 24 24 0 13.25-10.75 24-24 24s-24-10.75-24-24c0-13.26 10.75-24 24-24z"></path>
   </svg>
 </div>
</div>
      )}
    </div>
  );
};

export default Profile;


        