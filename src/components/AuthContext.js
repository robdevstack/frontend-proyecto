import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioId, setUsuarioId] = useState(null);

  return (
    <AuthContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};