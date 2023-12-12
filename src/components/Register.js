import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email.includes('@')) {
      alert('Falta el "@" en el correo electrónico.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/usuarios', {
        email,
        password,
      });

      // Muestra alerta de éxito
      alert('Usuario registrado con éxito');
    } catch (error) {
      console.error('Registration error:', error);

      // Muestra alerta de error
      alert('Error al registrar usuario. Por favor, intente de nuevo.');
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
      className="btn btn-success btn-block mb-4"
      onClick={handleRegister}
    >
      Registrarse
    </button>

    <div className="text-center">
      <p>
        Eres miembro? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  </div>
</div>
  );
};

export default Register;