// src/pages/store/LegalPage.jsx
import { PageTitle } from '../../components/common/PageTitle';

export const LegalPage = ({ title }) => (
  <div className="container" style={{ maxWidth: 820 }}>
    <PageTitle title={title} />
    <p>
      Este documento describe las condiciones de uso de F4A Tienda Digital. Al comprar en el sitio aceptas que los
      productos son digitales y se entregan por correo electrónico.
    </p>
    <p>Para dudas sobre este documento escribe a soporte@f4a.cl.</p>
  </div>
);
