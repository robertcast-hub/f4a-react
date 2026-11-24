// src/pages/admin/DashboardPage.jsx
import { Link } from 'react-router-dom';
import { reportService } from '../../data/dataService';
import { formatCLP } from '../../utils/format';
import { StatCard } from '../../components/admin/StatCard';
import { PageTitle } from '../../components/common/PageTitle';

const accesos = [
  { to: '/admin/ordenes', titulo: 'Órdenes', texto: 'Revisa las compras y sus boletas.' },
  { to: '/admin/productos', titulo: 'Productos', texto: 'Agrega, edita o elimina productos.' },
  { to: '/admin/categorias', titulo: 'Categorías', texto: 'Organiza el catálogo.' },
  { to: '/admin/usuarios', titulo: 'Usuarios', texto: 'Gestiona cuentas y roles.' },
  { to: '/admin/reportes', titulo: 'Reportes', texto: 'Ventas por categoría y productos top.' },
  { to: '/admin/perfil', titulo: 'Perfil', texto: 'Tus datos de administrador.' },
];

export const DashboardPage = () => {
  const r = reportService.summary();
  return (
    <>
      <PageTitle title="Dashboard" subtitle="Resumen de la actividad de la tienda" />
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3"><StatCard label="Compras" value={r.ordenesPagadas} detail={`${r.ordenesRechazadas} rechazadas`} /></div>
        <div className="col-sm-6 col-xl-3"><StatCard label="Ingresos" value={formatCLP(r.ingresos)} tone="success" /></div>
        <div className="col-sm-6 col-xl-3"><StatCard label="Productos" value={r.totalProductos} detail={`${r.productosCriticos} con stock crítico`} tone="warning" /></div>
        <div className="col-sm-6 col-xl-3"><StatCard label="Usuarios" value={r.totalUsuarios} tone="info" /></div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {accesos.map((a) => (
          <div className="col" key={a.to}>
            <Link to={a.to} className="admin-tile d-block p-3 h-100 text-decoration-none">
              <span className="h6 fw-bold d-block">{a.titulo}</span>
              <span className="small">{a.texto}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
