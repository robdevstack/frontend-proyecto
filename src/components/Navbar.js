import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica si estás en las rutas de Login o Register
  const isAuthRoute = location.pathname === '/' || location.pathname === '/register';

  const handleLogout = () => {
    // Limpia la información de inicio de sesión y redirige a la página de inicio de sesión
    localStorage.removeItem('loggedIn');
    onLogout();
    navigate('/');
  };

  // Si estás en las rutas de Login o Register, no renderiza el Navbar
  if (isAuthRoute) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">
                    Marketplace
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Iniciar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registrar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;