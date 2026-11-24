// src/pages/admin/ReportsPage.jsx
// Se usa para /admin/reportes y /admin/productos/reportes (este último con foco en inventario).
import { reportService, productService, categoryService } from '../../data/dataService';
import { formatCLP } from '../../utils/format';
import { BarList } from '../../components/admin/BarList';
import { StatCard } from '../../components/admin/StatCard';
import { PageTitle } from '../../components/common/PageTitle';

export const ReportsPage = ({ inventory = false }) => {
  const r = reportService.summary();
  const stockPorCategoria = categoryService.getAll().map((c) => ({
    categoria: c.nombre,
    unidades: productService.getByCategory(c.id).reduce((acc, p) => acc + Number(p.stock), 0),
  }));

  return (
    <>
      <PageTitle title={inventory ? 'Reporte de productos' : 'Reportes'} />
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3"><StatCard label="Ingresos" value={formatCLP(r.ingresos)} tone="success" /></div>
        <div className="col-sm-6 col-lg-3"><StatCard label="Órdenes" value={r.totalOrdenes} detail={`${r.ordenesPagadas} pagadas`} /></div>
        <div className="col-sm-6 col-lg-3"><StatCard label="Valor inventario" value={formatCLP(r.valorInventario)} tone="info" /></div>
        <div className="col-sm-6 col-lg-3"><StatCard label="Stock crítico" value={r.productosCriticos} tone="warning" /></div>
      </div>
      <div className="row g-4">
        {!inventory && (
          <>
            <div className="col-lg-6"><section className="admin-panel p-3 h-100">
              <h2 className="h6 fw-bold mb-3">Ventas por categoría</h2>
              <BarList data={reportService.salesByCategory()} labelKey="categoria" valueKey="total" format={formatCLP} />
            </section></div>
            <div className="col-lg-6"><section className="admin-panel p-3 h-100">
              <h2 className="h6 fw-bold mb-3">Productos más vendidos (unidades)</h2>
              <BarList data={reportService.topProducts()} labelKey="nombre" valueKey="cantidad" />
            </section></div>
          </>
        )}
        <div className="col-lg-6"><section className="admin-panel p-3 h-100">
          <h2 className="h6 fw-bold mb-3">Unidades en stock por categoría</h2>
          <BarList data={stockPorCategoria} labelKey="categoria" valueKey="unidades" />
        </section></div>
      </div>
    </>
  );
};
