import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!email.includes('@')) {
            swal('Falta el "@" en el correo electrónico.');
            return;
          }
        try {
            const response = await axios.post(
                'https://backend-jags.onrender.com/usuarios',
                {
                    email,
                    password,
                    nombre,
                    numero,
                }
            );

            if (response.status === 200) {
                // Registro exitoso
                swal("Usuario registrado con exito!", "presiona ok", "success");

                navigate('/');
            } else {
                console.error('Error al registrar el usuario:', response.data);
            }
        } catch (error) {
            console.error('Error en la solicitud para registrar el usuario:', error.response || error.message || error);
        }
    };

    return (
        <section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white">
          <div class="card-body p-5 text-center">

            <div class="mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Registro</h2>
              <p class="text-white-50 mb-5">Por favor ingrese nombre, correo y contraseña!</p>
              <div class="form-outline form-white mb-4">
                <input type="text"
                 id="typeEmailX"
                 className="form-control form-control-lg"
                 placeholder="Nombre"
                 value={nombre}
                 onChange={(e) => setNombre(e.target.value)}/>
                <label class="form-label" for="typeEmailX"></label>
              </div>
              <div class="form-outline form-white mb-4">
                <input type="text"
                 id="typeEmailX"
                 className="form-control form-control-lg"
                 placeholder="Numero telefono"
                 value={numero}
                 onChange={(e) => setNumero(e.target.value)}/>
                <label class="form-label" for="typeEmailX"></label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="email"
                 id="typeEmailX"
                  className="form-control form-control-lg"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                <label class="form-label" for="typeEmailX"></label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password"
                 id="typePasswordX"
                  className="form-control form-control-lg"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <label class="form-label" for="typePasswordX"></label>
              </div>
              
              <button className="btn btn-outline-light btn-lg px-5"
               type="submit"
               onClick={handleRegister}
               >Registrar</button>
            </div>
            <div>
              <p class="mb-0">Ya tienes cuenta? <a class="text-white-50 fw-bold"> <Link className="navbar-brand" to="/">
          Inicia sesión
        </Link></a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
};

export default Register;