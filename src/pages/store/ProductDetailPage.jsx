// src/pages/store/ProductDetailPage.jsx
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { useCart } from '../../context/CartContext';
import { PriceTag } from '../../components/products/PriceTag';
import { QuantitySelector } from '../../components/products/QuantitySelector';
import { ProductGrid } from '../../components/products/ProductGrid';
import { EmptyState } from '../../components/common/EmptyState';
import { Alert } from '../../components/common/Alert';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const product = productService.getById(id);

  if (!product) {
    return (
      <div className="container">
        <EmptyState title="Producto no encontrado" text="Puede que se haya eliminado del catálogo."
          actionTo="/productos" actionLabel="Ver productos" />
      </div>
    );
  }

  const categoria = categoryService.getById(product.categoria);
  const relacionados = productService.getByCategory(product.categoria).filter((p) => p.id !== product.id).slice(0, 4);
  const agotado = Number(product.stock) <= 0;

  const handleAdd = () => {
    addToCart(product, cantidad);
    setMensaje(`Agregaste ${cantidad} × ${product.nombre} al carrito.`);
  };

  return (
    <div className="container">
      <nav aria-label="Ruta de navegación" className="small mb-3">
        <Link to="/productos">Productos</Link>
        {categoria && <> / <Link to={`/categorias/${categoria.id}`}>{categoria.nombre}</Link></>}
      </nav>
      <div className="row g-4 g-lg-5 mb-5">
        <div className="col-md-6">
          <img src={product.imagen} alt={product.nombre} className="img-fluid rounded-3 w-100 detail-img" />
        </div>
        <div className="col-md-6">
          <h1 className="h2 fw-bold">{product.nombre}</h1>
          <p className="text-secondary-emphasis">{product.descripcion}</p>
          <PriceTag precio={product.precio} precioOferta={product.precioOferta} size="lg" />
          <p className="small mt-2">
            {agotado ? <span className="text-danger">Sin stock</span> : `${product.stock} unidades disponibles · entrega digital inmediata`}
          </p>
          {!agotado && (
            <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
              <QuantitySelector value={cantidad} onChange={setCantidad} max={Number(product.stock)} />
              <button type="button" className="btn btn-success" onClick={handleAdd}>Agregar al carrito</button>
            </div>
          )}
          <div className="mt-3">
            <Alert message={mensaje} variant="success" onClose={() => setMensaje('')} />
          </div>
        </div>
      </div>
      {relacionados.length > 0 && (
        <section>
          <h2 className="h4 fw-bold mb-3">También te puede interesar</h2>
          <ProductGrid products={relacionados} />
        </section>
      )}
    </div>
  );
};
