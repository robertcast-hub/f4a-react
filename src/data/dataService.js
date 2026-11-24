// src/data/dataService.js
// "Base de datos" simulada de la tienda. Expone un servicio por entidad,
// todos con CRUD (getAll, getById, create, update, remove) + consultas propias.
// Los componentes SIEMPRE llaman a estos objetos (productService.getAll(), etc.),
// lo que permite reemplazarlos por mocks en las pruebas con spyOn().

import { createRepository, storage, KEYS } from './storage';
import { PRODUCTOS, CATEGORIAS, USUARIOS, ORDENES, BLOGS, REGIONES } from './db';

const normalize = (text = '') =>
  text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export const precioFinal = (product) =>
  product.precioOferta != null && product.precioOferta < product.precio
    ? product.precioOferta
    : product.precio;

/* ---------------------------- PRODUCTOS ---------------------------- */
export const productService = {
  ...createRepository(KEYS.products, PRODUCTOS, 'P'),

  getByCategory(categoryId) {
    if (!categoryId) return this.getAll();
    return this.getAll().filter((p) => p.categoria === categoryId);
  },
  getFeatured() {
    return this.getAll().filter((p) => p.destacado);
  },
  getOffers() {
    return this.getAll().filter((p) => p.precioOferta != null && p.precioOferta < p.precio);
  },
  getCritical() {
    return this.getAll().filter((p) => Number(p.stock) <= Number(p.stockCritico));
  },
  search({ query = '', categoria = '', orden = '' } = {}) {
    const q = normalize(query);
    let list = this.getAll().filter((p) => {
      const matchText = !q || normalize(p.nombre).includes(q) || normalize(p.descripcion).includes(q);
      const matchCat = !categoria || p.categoria === categoria;
      return matchText && matchCat;
    });
    if (orden === 'precio-asc') list = [...list].sort((a, b) => precioFinal(a) - precioFinal(b));
    if (orden === 'precio-desc') list = [...list].sort((a, b) => precioFinal(b) - precioFinal(a));
    if (orden === 'nombre') list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre));
    return list;
  },
  /** Descuenta stock al confirmar una compra */
  decreaseStock(items) {
    items.forEach(({ id, cantidad }) => {
      const product = this.getById(id);
      if (product) this.update(id, { stock: Math.max(0, Number(product.stock) - cantidad) });
    });
  },
};

/* ---------------------------- CATEGORÍAS ---------------------------- */
export const categoryService = {
  ...createRepository(KEYS.categories, CATEGORIAS, 'C'),
  countProducts(categoryId) {
    return productService.getByCategory(categoryId).length;
  },
};

/* ----------------------------- USUARIOS ----------------------------- */
export const userService = {
  ...createRepository(KEYS.users, USUARIOS, 'U'),
  getByEmail(email) {
    return this.getAll().find((u) => normalize(u.email) === normalize(email)) ?? null;
  },
  emailExists(email, exceptId = null) {
    const user = this.getByEmail(email);
    return Boolean(user && user.id !== exceptId);
  },
};

/* ------------------------------ ÓRDENES ----------------------------- */
export const orderService = {
  ...createRepository(KEYS.orders, ORDENES, 'ORD-'),
  getByUser(userId) {
    return this.getAll().filter((o) => o.usuarioId === userId);
  },
  /**
   * Registra una orden con el resultado de la pasarela de pago simulada.
   * `pago` = { metodo, aprobado, motivo, ultimos4 }. Nunca se guarda el número completo ni el CVV.
   */
  checkout({ cliente, cart, usuarioId = null, pago = { metodo: 'webpay', aprobado: true } }) {
    const items = cart.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      precioUnitario: precioFinal(p),
      cantidad: p.quantity,
    }));
    const total = items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0);
    const estado = pago.aprobado ? 'pagada' : 'rechazada';
    const order = this.create({
      id: `ORD-${Date.now()}`,
      fecha: new Date().toISOString(),
      estado,
      usuarioId,
      cliente,
      items,
      total,
      pago: {
        metodo: pago.metodo,
        ultimos4: pago.ultimos4 ?? null,
        motivo: pago.aprobado ? null : (pago.motivo ?? 'Pago rechazado'),
      },
    });
    if (estado === 'pagada') productService.decreaseStock(items);
    return order;
  },
};

/* --------------------------- AUTENTICACIÓN -------------------------- */
export const authService = {
  getSession() {
    return storage.read(KEYS.session, null);
  },
  login(email, password) {
    const user = userService.getByEmail(email);
    if (!user || user.password !== password) {
      return { ok: false, error: 'Correo o contraseña incorrectos.' };
    }
    const { password: _omit, ...session } = user;
    storage.write(KEYS.session, session);
    return { ok: true, user: session };
  },
  logout() {
    storage.remove(KEYS.session);
  },
  register(data) {
    if (userService.emailExists(data.email)) {
      return { ok: false, error: 'Ya existe una cuenta con ese correo.' };
    }
    const user = userService.create({ ...data, rol: 'cliente' });
    return { ok: true, user };
  },
  refreshSession(user) {
    const { password: _omit, ...session } = user;
    return storage.write(KEYS.session, session);
  },
};

/* -------------------- CONTENIDO DE SOLO LECTURA -------------------- */
export const blogService = {
  getAll: () => BLOGS,
  getById: (id) => BLOGS.find((b) => b.id === id) ?? null,
};

export const regionService = {
  getAll: () => REGIONES,
  getComunas: (region) => REGIONES.find((r) => r.nombre === region)?.comunas ?? [],
};

/* ---------------------------- REPORTES ----------------------------- */
export const reportService = {
  summary() {
    const orders = orderService.getAll();
    const paid = orders.filter((o) => o.estado === 'pagada');
    const products = productService.getAll();
    return {
      totalOrdenes: orders.length,
      ordenesPagadas: paid.length,
      ordenesRechazadas: orders.length - paid.length,
      ingresos: paid.reduce((acc, o) => acc + o.total, 0),
      totalProductos: products.length,
      productosCriticos: productService.getCritical().length,
      totalUsuarios: userService.getAll().length,
      valorInventario: products.reduce((acc, p) => acc + precioFinal(p) * Number(p.stock), 0),
    };
  },
  salesByCategory() {
    const products = productService.getAll();
    const totals = {};
    orderService.getAll()
      .filter((o) => o.estado === 'pagada')
      .forEach((o) => o.items.forEach((i) => {
        const cat = products.find((p) => p.id === i.id)?.categoria ?? 'otros';
        totals[cat] = (totals[cat] ?? 0) + i.precioUnitario * i.cantidad;
      }));
    return categoryService.getAll()
      .map((c) => ({ categoria: c.nombre, total: totals[c.id] ?? 0 }))
      .sort((a, b) => b.total - a.total);
  },
  topProducts(limit = 5) {
    const units = {};
    orderService.getAll()
      .filter((o) => o.estado === 'pagada')
      .forEach((o) => o.items.forEach((i) => {
        units[i.nombre] = (units[i.nombre] ?? 0) + i.cantidad;
      }));
    return Object.entries(units)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, limit);
  },
};

/** Restaura todos los datos semilla (útil para demo y pruebas) */
export const resetDatabase = () => {
  productService.reset();
  categoryService.reset();
  userService.reset();
  orderService.reset();
  authService.logout();
};
