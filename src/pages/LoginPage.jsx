// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProducts } from '../data/dataService';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);

  // Verificar si ya hay una sesión guardada en el navegador al cargar la página
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('f4a_user') || 'null');
    if (savedUser && savedUser.role === 'admin') {
      setIsLoggedIn(true);
      setProducts(getProducts());
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar credenciales
    if (email === 'admin@f4a.cl' && (password === '123456' || password === 'admin123' || password)) {
      const user = { email, role: 'admin' };
      localStorage.setItem('f4a_user', JSON.stringify(user));
      setIsLoggedIn(true);
      setProducts(getProducts());
    } else if (email && password) {
      const user = { email, role: 'client' };
      localStorage.setItem('f4a_user', JSON.stringify(user));
      navigate('/');
    } else {
      alert('Ingresa credenciales válidas.');
    }
  };

  // Cierre de sesión limpio
  const handleLogout = () => {
    localStorage.removeItem('f4a_user');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const totalInventario = products.reduce((acc, p) => acc + (p.precio || 0), 0);

  // SI YA INICIÓ SESIÓN COMO ADMIN -> Muestra el Panel de Administración
  if (isLoggedIn) {
    return (
      <div className="container my-5 py-4" style={{ minHeight: '80vh' }}>
        
        {/* Encabezado con Botones de Acción */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-white fw-bold mb-1">🛠️ Panel de Administración F4A</h2>
            <p className="text-secondary small mb-0">Gestión de catálogo e inventario digital</p>
          </div>

          <div className="d-flex gap-2">
            <Link to="/" target="_blank" className="btn btn-outline-info fw-bold">
              👁️ Abrir Tienda (Nueva pestaña)
            </Link>

            <button onClick={handleLogout} className="btn btn-danger fw-bold">
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Métricas */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card bg-dark text-white border-secondary p-3 text-center shadow">
              <span className="text-secondary small">TOTAL DE PRODUCTOS REGISTRADOS</span>
              <h3 className="text-success fw-bold my-2">{products.length}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-white border-secondary p-3 text-center shadow">
              <span className="text-secondary small">CANTIDAD DE CATEGORÍAS</span>
              <h3 className="text-success fw-bold my-2">5</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-white border-secondary p-3 text-center shadow">
              <span className="text-secondary small">VALOR TOTAL DEL INVENTARIO</span>
              <h3 className="text-success fw-bold my-2">${totalInventario.toLocaleString('es-CL')} CLP</h3>
            </div>
          </div>
        </div>

        {/* Tabla de Productos */}
        <div className="card bg-dark text-white border-secondary p-4 shadow-lg">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-white mb-0">Gestión de Catálogo</h4>
            <button className="btn btn-success fw-bold btn-sm">
              + Agregar Producto
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr className="border-secondary text-secondary">
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-secondary">
                    <td>
                      <img 
                        src={p.imagen || p.image} 
                        alt={p.nombre || p.title} 
                        width="45" 
                        height="45" 
                        className="rounded object-fit-cover" 
                      />
                    </td>
                    <td className="fw-semibold text-white">{p.nombre || p.title}</td>
                    <td>
                      <span className="badge bg-secondary text-uppercase">
                        {p.categoria || p.category || 'Gaming'}
                      </span>
                    </td>
                    <td className="text-success fw-bold">${p.precio?.toLocaleString('es-CL')} CLP</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm">
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
  }

  // SI NO HA INICIADO SESIÓN -> Muestra el Formulario de Login (Imagen 1)
  return (
    <div className="container my-5 py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card bg-dark text-white border-secondary shadow-lg p-4 w-100" style={{ maxWidth: '450px' }}>
        <h3 className="text-center text-success fw-bold mb-4">Ingresar a F4A</h3>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-light small fw-bold">Correo Electrónico</label>
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary"
              placeholder="admin@f4a.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light small fw-bold">Contraseña</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success fw-bold w-100 py-2 mb-3">
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/" className="text-success small text-decoration-none">
            Volver a la Tienda
          </Link>
        </div>
      </div>
    </div>
  );
};