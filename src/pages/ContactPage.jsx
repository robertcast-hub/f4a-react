// src/pages/ContactPage.jsx
export const ContactPage = () => {
  return (
    <div className="container py-5 text-light">
      <h1 className="text-success fw-bold mb-4">Contacto</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card bg-dark border-secondary p-4 shadow h-100">
            <h4 className="text-success mb-3">Atención al Cliente</h4>
            <p><strong>Email:</strong> soporte@f4a.cl</p>
            <p><strong>WhatsApp:</strong> +56 9 1234 5678</p>
            <p><strong>Horario de atención:</strong> Lunes a Domingo - 24/7</p>
          </div>
        </div>
        <div className="col-md-6">
          <form className="card bg-dark border-secondary p-4 shadow" onSubmit={(e) => e.preventDefault()}>
            <h4 className="text-success mb-3">Envíanos un mensaje</h4>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control bg-black text-light border-secondary" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control bg-black text-light border-secondary" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea className="form-control bg-black text-light border-secondary" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-success fw-bold">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};