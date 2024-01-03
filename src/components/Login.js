import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import swal from 'sweetalert';

const Login = ({ onLogin }) => {
  const { setUsuarioId } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async () => {

    if (!email.includes('@')) {
      swal('Falta el "@" en el correo electrónico.');
      return;
    }

    try {
      const response = await axios.post('https://backend-jags.onrender.com/login', {
        email,
        password,
      });

      const token = response.data;
      localStorage.setItem('token', token);
      onLogin();

      const usuarioResponse = await axios.get('https://backend-jags.onrender.com/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usuarioId = usuarioResponse.data.id;
      
      setUsuarioId(usuarioId);

      swal("Inicio de sesión exitoso!", "Presiona el botón", "success");

      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setError('Authentication failed. Please check your credentials.');

      swal("Error al iniciar!", "Verifique sus credenciales", "error");
    }
  };

  return (
<section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Por favor ingrese correo y contraseña!</p>

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
               onClick={handleLogin}
               >Login</button>

            </div>

            <div>
              <p class="mb-0">No tienes una cuenta? <a class="text-white-50 fw-bold"> <Link className="navbar-brand" to="/register">
          Regístrate
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

export default Login;

