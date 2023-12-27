import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Posts from './Posts'; // Importa el componente Posts

const Profile = () => {
  const { usuarioId } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (usuarioId) {
          const url = `https://backend-jags.onrender.com/usuarios/${usuarioId}`;
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log('usuarioId:', usuarioId);
          console.log('Datos del usuario:', response.data);
          setUserData(response.data);
        } else {
          console.error('Error: usuarioId es null');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    fetchProfile();
  }, [usuarioId]);

  console.log('userData:', userData); // Agregado para imprimir userData en la consola

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
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="Avatar" className="img-fluid my-5 style4" />
                      <h5>{userData.nombre}</h5>
                      <i className="far fa-edit mb-5"></i>
                      <button className='btn btn-primary mb-4'>subir foto</button>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
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
              {/* Agrega la columna para los posts al lado derecho */}
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