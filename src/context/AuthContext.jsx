// src/context/AuthContext.jsx
// Sesión del usuario (cliente o administrador), disponible en toda la app.
import { createContext, useContext, useState } from 'react';
import { authService } from '../data/dataService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getSession());

  const login = (email, password) => {
    const result = authService.login(email, password);
    if (result.ok) setUser(result.user);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refresh = (updatedUser) => setUser(authService.refreshSession(updatedUser));

  const value = { user, isAdmin: user?.rol === 'admin', login, logout, refresh };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
};
