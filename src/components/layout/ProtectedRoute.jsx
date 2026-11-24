// src/components/layout/ProtectedRoute.jsx
// Protege rutas: sin sesión → /login ; con sesión pero sin el rol requerido → inicio.
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (role && user.rol !== role) return <Navigate to="/" replace />;
  return children;
};
