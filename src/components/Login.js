import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async () => {

    if (!email.includes('@')) {
      alert('Falta el "@" en el correo electrónico.');
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

      // Muestra alerta de éxito
      alert('Inició sesión con éxito');

      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setError('Authentication failed. Please check your credentials.');

      // Muestra alerta de error
      alert('Usuario no válido. Por favor, verifique sus credenciales.');
    }
  };

  return (
<div className="d-flex justify-content-center align-items-center vh-100">
  <div className="w-50">
    <div className="form-outline mb-4">
      <input
        type="email"
        className="form-control"
        placeholder="Escribe tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="form-label" htmlFor="form2Example1">
        Correo
      </label>
    </div>

    <div className="form-outline mb-4">
      <input
        type="password"
        className="form-control"
        placeholder="Escribe tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="form-label" htmlFor="form2Example2">
        Contraseña
      </label>
    </div>

    <button
      type="button"
      className="btn btn-primary btn-block mb-4"
      onClick={handleLogin}
    >
      Entrar
    </button>

    <div className="text-center">
      <p>
        No eres miembro?  <a><Link className="navbar-brand" to="/form">
          Regístrate
        </Link></a>
      </p>
    </div>
  </div>
</div>
  );
};

export default Login;

