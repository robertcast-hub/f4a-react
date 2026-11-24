// src/pages/store/AboutPage.jsx
import { PageTitle } from '../../components/common/PageTitle';

export const AboutPage = () => (
  <div className="container" style={{ maxWidth: 820 }}>
    <PageTitle title="Nosotros" />
    <p className="lead">
      F4A Tienda Digital vende claves de videojuegos, licencias de software, suscripciones y tarjetas de regalo,
      con entrega inmediata en tu correo.
    </p>
    <div className="row g-4 mt-2">
      <div className="col-md-6">
        <h2 className="h5 fw-bold">Misión</h2>
        <p>Ofrecer productos digitales originales al mejor precio, con una compra simple y segura.</p>
      </div>
      <div className="col-md-6">
        <h2 className="h5 fw-bold">Visión</h2>
        <p>Ser la tienda digital de referencia en Chile para jugadores y profesionales.</p>
      </div>
    </div>
  </div>
);
