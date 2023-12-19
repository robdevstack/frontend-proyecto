import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                'https://backend-jags.onrender.com/usuarios',
                {
                    email,
                    password,
                    nombre,
                }
            );

            if (response.status === 200) {
                // Registro exitoso
                alert('Usuario registrado con éxito');
                navigate('/login');
            } else {
                console.error('Error al registrar el usuario:', response.data);
            }
        } catch (error) {
            console.error('Error en la solicitud para registrar el usuario:', error.response || error.message || error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-50">
                <div className="form-outline mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Escribe tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form2Example0">
                        Nombre
                    </label>
                </div>

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
                        ¿Ya eres miembro?  <a><Link className="navbar-brand" to="/form">
          Inicia sesión
        </Link></a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;