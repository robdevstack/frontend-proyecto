import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    onLogout();
    navigate('/');
    // Cerrar el menú después de hacer clic en "Cerrar Sesión"
    setIsNavCollapsed(true);
  };

  const handleNavLinkClick = () => {
    // Cerrar el menú después de hacer clic en un enlace del Navbar
    setIsNavCollapsed(true);
  };

  const isAuthRoute = location.pathname === '/' || location.pathname === '/register';

  if (isAuthRoute) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Tu Logo
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/profile"
                    onClick={handleNavLinkClick}
                  >
                    Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/productos"
                    onClick={handleNavLinkClick}
                  >
                    Marketplace
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/form"
                    onClick={handleNavLinkClick}
                  >
                    Formulario
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={handleNavLinkClick}
                  >
                    Iniciar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    onClick={handleNavLinkClick}
                  >
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