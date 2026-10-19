// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { getProducts, addProduct, deleteProduct } from '../data/dataService';

export const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    categoria: 'gaming',
    precio: '',
    imagen: '/imagenes/randomKey.jpg',
    descripcion: '',
    destacado: false
  });

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setNewProduct({ ...newProduct, [e.target.name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.nombre || !newProduct.precio) return;

    const updated = addProduct({
      ...newProduct,
      precio: Number(newProduct.precio)
    });
    setProducts(updated);
    setNewProduct({
      nombre: '',
      categoria: 'gaming',
      precio: '',
      imagen: '/imagenes/randomKey.jpg',
      descripcion: '',
      destacado: false
    });
    setShowForm(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      const updated = deleteProduct(id);
      setProducts(updated);
    }
  };

  const totalInventario = products.reduce((acc, p) => acc + Number(p.precio), 0);
  const cantidadCategorias = new Set(products.map((p) => p.categoria)).size;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
        <h2 className="text-success fw-bold mb-0">🛠️ Panel de Administración F4A</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-success fw-bold"
        >
          {showForm ? '❌ Cancelar' : '➕ Agregar Producto'}
        </button>
      </div>

      {/* Indicadores / KPIs */}
      <div className="row g-3 mb-4">
        {/* Recuadro 1: Total de Productos */}
        <div className="col-md-4">
          <div className="card bg-dark text-white border-success shadow-sm text-center">
            <div className="card-header border-success bg-transparent fw-bold text-white text-uppercase py-2" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
              Total de Productos Registrados
            </div>
            <div className="card-body py-3">
              <h3 className="text-success fw-bold display-6 mb-0">{products.length}</h3>
            </div>
          </div>
        </div>

        {/* Recuadro 2: Cantidad de Categorías */}
        <div className="col-md-4">
          <div className="card bg-dark text-white border-success shadow-sm text-center">
            <div className="card-header border-success bg-transparent fw-bold text-white text-uppercase py-2" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
              Cantidad de Categorías
            </div>
            <div className="card-body py-3">
              <h3 className="text-success fw-bold display-6 mb-0">{cantidadCategorias}</h3>
            </div>
          </div>
        </div>

        {/* Recuadro 3: Valor Total del Inventario */}
        <div className="col-md-4">
          <div className="card bg-dark text-white border-success shadow-sm text-center">
            <div className="card-header border-success bg-transparent fw-bold text-white text-uppercase py-2" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
              Valor Total del Inventario
            </div>
            <div className="card-body py-3">
              <h3 className="text-success fw-bold display-6 mb-0">${totalInventario.toLocaleString('es-CL')} CLP</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Formulario Agregar Producto */}
      {showForm && (
        <div className="bg-dark p-4 rounded border border-success mb-4 text-white">
          <h4 className="text-success fw-bold mb-3">Nuevo Producto</h4>
          <form onSubmit={handleAddProduct} className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Nombre del Producto</label>
              <input
                type="text"
                name="nombre"
                className="form-control bg-black text-white border-secondary"
                value={newProduct.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Categoría</label>
              <select
                name="categoria"
                className="form-select bg-black text-white border-secondary"
                value={newProduct.categoria}
                onChange={handleChange}
              >
                <option value="gaming">Gaming</option>
                <option value="software">Software</option>
                <option value="subscripciones">Suscripciones</option>
                <option value="regalos">Regalos</option>
                <option value="randomkey">Random Key</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Precio (CLP)</label>
              <input
                type="number"
                name="precio"
                className="form-control bg-black text-white border-secondary"
                value={newProduct.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Ruta de Imagen</label>
              <input
                type="text"
                name="imagen"
                className="form-control bg-black text-white border-secondary"
                value={newProduct.imagen}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Descripción</label>
              <input
                type="text"
                name="descripcion"
                className="form-control bg-black text-white border-secondary"
                value={newProduct.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 d-flex align-items-center gap-2">
              <input
                type="checkbox"
                name="destacado"
                id="destacado"
                className="form-check-input"
                checked={newProduct.destacado}
                onChange={handleChange}
              />
              <label htmlFor="destacado" className="form-check-label small">Destacar en Portada</label>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success fw-bold">Guardar Producto</button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla CRUD de Productos */}
      <div className="bg-dark p-4 rounded border border-secondary text-white">
        <h4 className="fw-bold mb-3 border-bottom border-secondary pb-2">Gestión de Catálogo</h4>
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.imagen} alt={p.nombre} width="45" height="35" className="rounded object-fit-cover" />
                  </td>
                  <td className="fw-semibold">{p.nombre}</td>
                  <td><span className="badge bg-secondary text-uppercase">{p.categoria}</span></td>
                  <td className="text-success fw-bold">${Number(p.precio).toLocaleString('es-CL')}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};