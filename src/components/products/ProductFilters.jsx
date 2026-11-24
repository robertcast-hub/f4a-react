// src/components/products/ProductFilters.jsx
// Componente controlado: el estado de los filtros vive en el padre (ProductsPage).
export const ProductFilters = ({ filters, categories, onChange, resultCount }) => {
  const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value });

  return (
    <form className="filters row g-2 align-items-end mb-4" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="col-12 col-md-5">
        <label htmlFor="filtro-query" className="form-label small">Buscar</label>
        <input
          id="filtro-query"
          name="query"
          type="search"
          className="form-control"
          placeholder="Nombre o descripción"
          value={filters.query}
          onChange={handle}
        />
      </div>
      <div className="col-6 col-md-3">
        <label htmlFor="filtro-categoria" className="form-label small">Categoría</label>
        <select id="filtro-categoria" name="categoria" className="form-select" value={filters.categoria} onChange={handle}>
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>
      <div className="col-6 col-md-2">
        <label htmlFor="filtro-orden" className="form-label small">Ordenar</label>
        <select id="filtro-orden" name="orden" className="form-select" value={filters.orden} onChange={handle}>
          <option value="">Relevancia</option>
          <option value="precio-asc">Menor precio</option>
          <option value="precio-desc">Mayor precio</option>
          <option value="nombre">Nombre A-Z</option>
        </select>
      </div>
      <div className="col-12 col-md-2 text-md-end small text-secondary-emphasis" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
      </div>
    </form>
  );
};
