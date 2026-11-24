// Pruebas de la "base de datos" simulada: CRUD, consultas, checkout, autenticación y reportes.
import {
  productService, categoryService, userService, orderService, authService,
  reportService, regionService, blogService, precioFinal, resetDatabase,
} from './dataService';
import { storage } from './storage';

describe('dataService', () => {
  describe('productService (CRUD)', () => {
    it('getAll inicializa localStorage con los datos semilla', () => {
      const all = productService.getAll();
      expect(all.length).toBeGreaterThan(10);
      expect(JSON.parse(localStorage.getItem('f4a_v3_products')).length).toBe(all.length);
    });

    it('create agrega un producto con id generado y lo persiste', () => {
      const before = productService.getAll().length;
      const created = productService.create({ nombre: 'Nuevo', categoria: 'gaming', precio: 1000, stock: 1, stockCritico: 0 });
      expect(created.id).toMatch(/^P/);
      expect(productService.getAll().length).toBe(before + 1);
      expect(productService.getById(created.id).nombre).toBe('Nuevo');
    });

    it('update modifica solo los campos enviados y conserva el id', () => {
      const updated = productService.update('P001', { precio: 1, id: 'HACK' });
      expect(updated.id).toBe('P001');
      expect(updated.precio).toBe(1);
      expect(productService.getById('P001').nombre).toContain('Final Fantasy');
    });

    it('update devuelve null si el producto no existe', () => {
      expect(productService.update('NOEXISTE', { precio: 1 })).toBeNull();
    });

    it('remove elimina el producto y devuelve true', () => {
      expect(productService.remove('P001')).toBeTrue();
      expect(productService.getById('P001')).toBeNull();
      expect(productService.remove('P001')).toBeFalse();
    });

    it('si localStorage está corrupto vuelve a los datos semilla', () => {
      localStorage.setItem('f4a_v3_products', '{json roto');
      expect(productService.getAll().length).toBeGreaterThan(10);
    });
  });

  describe('consultas de productos', () => {
    it('search filtra por texto sin importar tildes ni mayúsculas', () => {
      const res = productService.search({ query: 'MINECRAFT' });
      expect(res.length).toBe(1);
      expect(productService.search({ query: 'clave' }).length).toBeGreaterThan(0);
    });

    it('search ordena por precio ascendente usando el precio final', () => {
      const res = productService.search({ categoria: 'gaming', orden: 'precio-asc' });
      const precios = res.map(precioFinal);
      expect(precios).toEqual([...precios].sort((a, b) => a - b));
    });

    it('getOffers solo devuelve productos con precio de oferta menor', () => {
      productService.getOffers().forEach((p) => expect(p.precioOferta).toBeLessThan(p.precio));
    });

    it('getCritical devuelve productos con stock menor o igual al crítico', () => {
      const ids = productService.getCritical().map((p) => p.id);
      expect(ids).toContain('P005'); // stock 3, crítico 5
      expect(ids).not.toContain('P002');
    });
  });

  describe('orderService.checkout', () => {
    const cliente = { nombre: 'Ana', apellidos: 'Díaz', email: 'ana@x.cl' };

    it('crea una orden pagada, calcula el total y descuenta stock', () => {
      const stockAntes = productService.getById('P002').stock;
      const cart = [{ ...productService.getById('P002'), quantity: 2 }];
      const order = orderService.checkout({ cliente, cart });
      expect(order.estado).toBe('pagada');
      expect(order.total).toBe(14990 * 2);
      expect(productService.getById('P002').stock).toBe(stockAntes - 2);
    });

    it('usa el precio de oferta en el total', () => {
      const cart = [{ ...productService.getById('P004'), quantity: 1 }];
      expect(orderService.checkout({ cliente, cart }).total).toBe(5990);
    });

    it('una orden rechazada NO descuenta stock y guarda el motivo (verificado con spy)', () => {
      const spy = spyOn(productService, 'decreaseStock');
      const cart = [{ ...productService.getById('P002'), quantity: 1 }];
      const pago = { metodo: 'visa', aprobado: false, motivo: 'Fondos insuficientes', ultimos4: '0002' };
      const order = orderService.checkout({ cliente, cart, pago });
      expect(order.estado).toBe('rechazada');
      expect(order.pago).toEqual({ metodo: 'visa', ultimos4: '0002', motivo: 'Fondos insuficientes' });
      expect(spy).not.toHaveBeenCalled();
    });

    it('la orden guardada nunca contiene el número completo de la tarjeta', () => {
      const cart = [{ ...productService.getById('P002'), quantity: 1 }];
      orderService.checkout({ cliente, cart, pago: { metodo: 'visa', aprobado: true, ultimos4: '1111' } });
      expect(localStorage.getItem('f4a_v3_orders')).not.toContain('4111111111111111');
      expect(orderService.getAll().at(-1).pago.ultimos4).toBe('1111');
    });

    it('getByUser devuelve el historial de un usuario', () => {
      expect(orderService.getByUser('U003').length).toBe(2);
    });
  });

  describe('authService', () => {
    it('login correcto guarda la sesión sin la contraseña', () => {
      const res = authService.login('admin@f4a.cl', 'admin123');
      expect(res.ok).toBeTrue();
      expect(res.user.password).toBeUndefined();
      expect(authService.getSession().rol).toBe('admin');
    });

    it('login con contraseña incorrecta falla y no crea sesión', () => {
      const res = authService.login('admin@f4a.cl', 'otra');
      expect(res.ok).toBeFalse();
      expect(authService.getSession()).toBeNull();
    });

    it('register impide correos duplicados y crea clientes', () => {
      expect(authService.register({ email: 'ADMIN@f4a.cl' }).ok).toBeFalse();
      const res = authService.register({ email: 'nuevo@x.cl', nombre: 'N', rol: 'admin' });
      expect(res.ok).toBeTrue();
      expect(res.user.rol).toBe('cliente'); // nadie se registra como admin
    });

    it('logout elimina la sesión', () => {
      authService.login('admin@f4a.cl', 'admin123');
      authService.logout();
      expect(authService.getSession()).toBeNull();
    });
  });

  describe('reportService (con mocks)', () => {
    it('summary calcula métricas a partir de los servicios (mockeados con spyOn)', () => {
      spyOn(orderService, 'getAll').and.returnValue([
        { estado: 'pagada', total: 1000, items: [] },
        { estado: 'rechazada', total: 500, items: [] },
      ]);
      spyOn(productService, 'getAll').and.returnValue([
        { precio: 100, precioOferta: null, stock: 2, stockCritico: 5 },
      ]);
      spyOn(userService, 'getAll').and.returnValue([{}, {}]);

      const r = reportService.summary();
      expect(r).toEqual(jasmine.objectContaining({
        totalOrdenes: 2, ordenesPagadas: 1, ordenesRechazadas: 1, ingresos: 1000,
        totalProductos: 1, productosCriticos: 1, totalUsuarios: 2, valorInventario: 200,
      }));
    });

    it('salesByCategory y topProducts agrupan solo órdenes pagadas', () => {
      const ventas = reportService.salesByCategory();
      expect(ventas.find((v) => v.categoria === 'Juegos').total).toBe(14990); // P017 pertenece a randomkey, no a Juegos
      expect(reportService.topProducts(1)[0]).toEqual({ nombre: 'Steam Random Key VIP', cantidad: 2 });
    });
  });

  describe('otros servicios', () => {
    it('categoryService.countProducts cuenta por categoría', () => {
      expect(categoryService.countProducts('software')).toBe(3);
    });
    it('regionService.getComunas devuelve [] para región desconocida', () => {
      expect(regionService.getComunas('Marte')).toEqual([]);
      expect(regionService.getComunas('Región Metropolitana de Santiago')).toContain('Maipú');
    });
    it('blogService.getById encuentra los 2 artículos', () => {
      expect(blogService.getAll().length).toBe(2);
      expect(blogService.getById('guia-gta6').titulo).toContain('GTA');
      expect(blogService.getById('x')).toBeNull();
    });
    it('userService.emailExists ignora al propio usuario al editar', () => {
      expect(userService.emailExists('admin@f4a.cl')).toBeTrue();
      expect(userService.emailExists('admin@f4a.cl', 'U001')).toBeFalse();
    });
    it('resetDatabase restaura los datos y cierra sesión', () => {
      productService.remove('P001');
      authService.login('admin@f4a.cl', 'admin123');
      resetDatabase();
      expect(productService.getById('P001')).not.toBeNull();
      expect(storage.read('f4a_v3_session', null)).toBeNull();
    });
  });
});
