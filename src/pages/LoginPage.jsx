// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para mostrar el mensaje tipo tostadora por 2 segundos
  const triggerToastError = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError('');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validar que tenga un @
    if (!formData.email.includes('@')) {
      triggerToastError('El correo debe incluir un carácter "@".');
      return;
    }

    // 2. Validar el máximo de 50 caracteres
    if (formData.email.length > 50) {
      triggerToastError('El correo no puede tener más de 50 caracteres.');
      return;
    }

    // 3. Validar si el correo es el registrado
    if (formData.email !== 'admin@f4a.cl' && formData.email !== 'user@f4a.cl') {
      triggerToastError('Correo equivocado o no existe.');
      return;
    }

    // 4. Validar contraseña según el usuario
    if (formData.email === 'admin@f4a.cl') {
      if (formData.password !== 'admin123') {
        triggerToastError('Error: contraseña incorrecta.');
        return;
      }
      localStorage.setItem('f4a_user', JSON.stringify({ email: formData.email, role: 'admin', name: 'Administrador F4A' }));
      navigate('/admin');
      return;
    }

    if (formData.email === 'user@f4a.cl') {
      if (formData.password !== 'user123') {
        triggerToastError('Error: contraseña incorrecta.');
        return;
      }
      localStorage.setItem('f4a_user', JSON.stringify({ email: formData.email, role: 'user', name: 'Usuario F4A' }));
      navigate('/');
      return;
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-75 position-relative">
      
      {/* Notificación Tipo Tostadora (Toast) en la esquina superior derecha */}
      {error && (
        <div 
          className="position-fixed top-0 end-0 m-4 toast show align-items-center text-white bg-danger border-0 shadow-lg"
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
          style={{ zIndex: 1055, animation: 'fadeIn 0.3s' }}
        >
          <div className="d-flex">
            <div className="toast-body fw-bold">
              ⚠️ {error}
            </div>
          </div>
        </div>
      )}

      <div className="card bg-dark text-white border-secondary p-4 shadow-lg" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="text-success fw-bold">Ingresar a F4A</h2>
          <p className="text-muted small">Accede a tu cuenta para gestionar tus claves y pedidos</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">Correo Electrónico</label>
            <input
              type="text"
              name="email"
              className="form-control bg-black text-white border-secondary"
              placeholder="tu@email.com"
              maxLength={50}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light small fw-semibold">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control bg-black text-white border-secondary"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold py-2 mb-3">
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mt-3 pt-3 border-top border-secondary">
          <p className="small text-muted mb-0">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="text-success text-decoration-none fw-semibold">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};