// src/pages/ContactoPage.jsx
import { useState } from 'react';

export const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
    setFormData({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <div className="container my-5 py-4" style={{ minHeight: '75vh' }}>
      <h1 className="text-success fw-bold mb-4">Contacto</h1>

      <div className="row g-4">
        
        {/* Columna Izquierda: Atención al Cliente con texto en blanco */}
        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary p-4 shadow-lg h-100">
            <h3 className="text-success fw-bold mb-4">Atención al Cliente</h3>
            
            <div className="d-flex flex-column gap-3 fs-6">
              <p className="mb-1 text-white">
                <strong className="text-white">Email:</strong>{' '}
                <span className="text-light">soporte@f4a.cl</span>
              </p>

              <p className="mb-1 text-white">
                <strong className="text-white">WhatsApp:</strong>{' '}
                <span className="text-light">+56 9 1234 5678</span>
              </p>

              <p className="mb-0 text-white">
                <strong className="text-white">Horario de atención:</strong>{' '}
                <span className="text-light">Lunes a Domingo - 24/7</span>
              </p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario con etiquetas "Nombre:" y "Correo:" */}
        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary p-4 shadow-lg h-100">
            <h3 className="text-success fw-bold mb-4">Envíanos un mensaje</h3>

            <form onSubmit={handleSubmit}>
              
              {/* Línea 1: Nombre */}
              <div className="mb-3">
                <label className="form-label text-white fw-semibold">Nombre:</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>

              {/* Línea 2: Correo */}
              <div className="mb-3">
                <label className="form-label text-white fw-semibold">Correo:</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="ejemplo@correo.com"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  required
                />
              </div>

              {/* Línea 3: Mensaje */}
              <div className="mb-4">
                <label className="form-label text-white fw-semibold">Mensaje:</label>
                <textarea
                  className="form-control bg-dark text-white border-secondary"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success fw-bold w-100 py-2">
                Enviar Mensaje
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

// Exportaciones de respaldo para garantizar compatibilidad con App.jsx
export const ContactPage = ContactoPage;
export const Contacto = ContactoPage;
export default ContactoPage;