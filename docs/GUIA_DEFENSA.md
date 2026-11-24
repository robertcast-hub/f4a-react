# Guía de defensa — Evaluación Parcial 2 (presentación individual, 60%)

La presentación dura 15 minutos más 5 de preguntas. Se evalúa **a cada integrante por separado**, así que
todos deben poder explicar cualquier parte. Esta guía sigue el orden de los 4 indicadores de la rúbrica.

**Antes de empezar:** ten abiertos `npm run dev`, una terminal lista para `npm test`,
`coverage/html/index.html` y el editor con `src/` visible. Borra el Local Storage para partir con datos limpios.

---

## Bloque 1 — IE2.1.3 Diseño del proyecto con un framework JS (15%) · ~3 min

**Qué mostrar**

1. La estructura de carpetas (README): `data`, `context`, `components`, `pages`, `utils`, `test`.
2. `App.jsx`: las rutas de la tienda y del administrador, que siguen el diagrama de navegación (Figura 2).
3. `main.jsx`: el orden de los proveedores `BrowserRouter → AuthProvider → CartProvider → App`.

**Qué decir**

- Usamos **React 19 con Vite**. Vite compila rápido y recarga en caliente durante el desarrollo.
- La navegación es una SPA con **React Router**. Las rutas anidadas permiten que la tienda use `StoreLayout`
  y el panel use `AdminLayout` sin repetir encabezado ni menú.
- Separamos en capas: la **vista** (componentes y páginas), el **estado global** (contextos) y los
  **datos** (`dataService.js`). Los componentes nunca tocan `localStorage` directamente.

**Preguntas probables**

- *¿Por qué el Router está en `main.jsx` y no en `App.jsx`?*
  Para que en las pruebas podamos montar `<App />` con `MemoryRouter` y navegar a cualquier ruta sin navegador real.
- *¿Qué es una SPA?*
  Una aplicación de una sola página: el servidor entrega un único `index.html` y React cambia la vista según la URL,
  sin recargar. Por eso `vercel.json` redirige todas las rutas a `index.html`.
- *¿Cómo protegen el panel?*
  Con `ProtectedRoute`: sin sesión redirige a `/login`, y si el rol no es `admin` redirige al inicio.

---

## Bloque 2 — IE2.1.4 Componentes, props, estado y Bootstrap (20%) · ~5 min

**Qué mostrar**

1. `ProductCard.jsx`: recibe `product` y `onAdd` por **props**, y tiene **estado local** `added` para el
   mensaje "Agregado al carrito". El `useEffect` limpia el temporizador.
2. `ProductGrid.jsx`: toma `addToCart` del contexto y se lo pasa a cada tarjeta. Así `ProductCard` no conoce
   el carrito, y eso es responsabilidad única.
3. `CartContext.jsx`: `useState` con carga desde localStorage, `useEffect` para persistir, y `useMemo` para
   calcular total y cantidad.
4. `CheckoutPage` + `CustomerForm`: un **formulario controlado** cuyo estado vive en la página. La comuna se
   reinicia al cambiar la región. Si hay sesión, los datos se completan solos.
5. **Responsivo:** abre las DevTools (Ctrl+Shift+M) y muestra 390 px, 768 px y 1280 px.
   - La grilla `row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4` muestra 1, 2, 3 o 4 columnas según el ancho.
   - El menú móvil y el desplegable de categorías se abren con estado de React (`aria-expanded`).
   - Las tablas del panel usan `table-responsive`.
   - El menú lateral del admin se convierte en un menú desplegable en móvil.

**Preguntas probables**

- *¿Diferencia entre props y estado?*
  Las props vienen del padre y el componente no las modifica. El estado es interno, cambia con `setX` y
  provoca un nuevo render.
- *¿Por qué `addToCart` crea un objeto nuevo en vez de hacer `item.quantity += 1`?*
  React detecta cambios comparando referencias. Si mutas el objeto, React puede no volver a renderizar, y
  además se corrompe el estado anterior.
- *¿Por qué no usaron el JavaScript de Bootstrap para el menú?*
  Bootstrap JS manipula el DOM por fuera de React. Con estado de React el comportamiento es predecible y se
  puede probar (hay una prueba de `aria-expanded`).
- *¿Qué es Context y cuándo usarlo?*
  Sirve para compartir estado entre muchos componentes sin pasar props por cada nivel. Lo usamos para el
  carrito y la sesión.
- *¿Dónde está el CRUD?*
  En `storage.js` está `createRepository`, que entrega `getAll`, `getById`, `create`, `update`, `remove` y
  `reset`. `dataService.js` lo reutiliza para productos, categorías, usuarios y órdenes. En el panel, cada
  entidad tiene vistas de crear, ver, editar y eliminar.

---

## Bloque 3 — IE2.2.2 Pruebas unitarias con Jasmine y Karma (15%) · ~4 min

La rúbrica pide **demostrar 10 pruebas** para el nivel máximo. Ejecuta `npm test` en vivo (tarda unos
10 segundos) y luego abre estas 10. Cada una cubre un punto de la propuesta del docente:

| # | Archivo | Prueba | Concepto |
|---|---|---|---|
| 1 | `ProductGrid.spec.jsx` | renderiza una tarjeta por cada producto | Renderizado de listas |
| 2 | `Alert.spec.jsx` | NO renderiza nada cuando no hay error | Renderizado condicional |
| 3 | `Alert.spec.jsx` | renderiza el mensaje cuando hay un error | Renderizado condicional |
| 4 | `Button.spec.jsx` | muestra la etiqueta recibida por props | Props |
| 5 | `Button.spec.jsx` | ejecuta la función onClick recibida | Props + evento + mock |
| 6 | `LoginPage.spec.jsx` | actualiza el estado mientras el usuario escribe | Estado de formulario |
| 7 | `ProductCard.spec.jsx` | cambia a "Agregado" y vuelve tras 1,8 s | Estado + `jasmine.clock()` |
| 8 | `CartContext.spec.jsx` | agregar dos veces suma cantidades | Lógica de estado global |
| 9 | `QuantitySelector.spec.jsx` | el botón + llama a onChange con valor + 1 | Simulación de eventos |
| 10 | `CheckoutPage.spec.jsx` | pago rechazado navega a error y conserva el carrito | Flujo completo con mock |

**Cómo explicar una prueba (patrón AAA)**

1. **Arrange (preparar):** `render(<Button label="Pagar" onClick={spy} />)`.
2. **Act (actuar):** `fireEvent.click(screen.getByRole('button', { name: 'Pagar' }))`.
3. **Assert (verificar):** `expect(spy).toHaveBeenCalledTimes(1)`.

**Preguntas probables**

- *¿Qué hace Jasmine y qué hace Karma?*
  Jasmine es el framework con el que se escriben las pruebas (`describe`, `it`, `expect`, `spyOn`). Karma es
  el ejecutor: compila los archivos, abre Chrome, corre las pruebas en un navegador real y entrega el reporte.
- *¿Para qué usan Testing Library si ya tienen Jasmine?*
  Solo para montar el componente y buscar elementos como lo haría un usuario (`getByRole`, `getByLabelText`).
  Las aserciones y los mocks son 100% Jasmine.
- *¿Cómo aseguran que una prueba no afecte a la siguiente?*
  En `src/test/index.spec.js` hay un `beforeEach` global que limpia localStorage. Testing Library desmonta
  cada componente al terminar. Además, `random: false` fija el orden para que los resultados se repitan igual.

---

## Bloque 4 — IE2.3.2 Proceso de testeo: entorno, escritura, mocks y resultados (10%) · ~3 min

**Configuración del entorno.** Recorre `karma.conf.cjs` de arriba a abajo:

- `frameworks: ['jasmine', 'webpack']`.
- `files`: un solo punto de entrada, que carga todos los `*.spec.js(x)` con `import.meta.webpackContext`.
- `preprocessors`: Webpack + Babel con `preset-react`, porque el navegador no entiende JSX.
- `babel-plugin-istanbul` instrumenta el código fuente (no los tests) para medir cobertura.
- `reporters: ['spec', 'coverage']`, y `check` define umbrales mínimos: si la cobertura baja, `npm test` falla.
- `ChromeHeadless` permite ejecutar sin ventana, igual que en un servidor de integración continua.

**Escritura.** Los archivos `*.spec` van junto al componente. El helper `renderWithProviders` monta el
componente con Router, sesión y carrito, como en la app real.

**Mocks.** Muestra estos cuatro tipos:

- `jasmine.createSpy('onClick')` reemplaza una función recibida por props (`Button.spec`).
- `spyOn(orderService, 'checkout').and.returnValue({...})` aísla el checkout de la base de datos
  (`CheckoutPage.spec`).
- `spyOn(authService, 'getSession').and.returnValue(mockAdmin)` simula una sesión iniciada
  (`ProtectedRoute.spec`).
- `spyOn(window, 'confirm').and.returnValue(false)` simula que el usuario cancela una eliminación
  (`ProductsAdminPage.spec`).
- Extra: `jasmine.clock()` controla el tiempo para no esperar 1,8 segundos reales.

**Análisis de resultados.** Abre `coverage/html/index.html`:

- 163 pruebas, 0 fallidas.
- Sentencias 92,6%, ramas 87,3%, funciones 89,7%, líneas 94,7%.
- Lo menos cubierto son ramas de páginas del admin (por ejemplo, "producto no encontrado") y `LegalPage`.
  Es contenido estático o un caso de borde de bajo riesgo, y está documentado como mejora pendiente.

**Preguntas probables**

- *¿Qué es un mock y por qué usarlo?*
  Es un reemplazo controlado de una dependencia. Permite probar el componente solo: por ejemplo, forzar un
  pago rechazado sin depender de un azar, o verificar que **no** se llamó a un servicio cuando el formulario
  es inválido.
- *¿Diferencia entre `spyOn` y `jasmine.createSpy`?*
  `spyOn` envuelve un método que ya existe en un objeto (y se restaura solo al terminar la prueba).
  `createSpy` crea una función falsa nueva, ideal para pasarla como prop.
- *¿100% de cobertura significa que no hay errores?*
  No. Solo dice qué líneas se ejecutaron. Por eso cada prueba verifica un resultado concreto con `expect`,
  no solo que "no falle".
- *¿Por qué `dataService` exporta objetos y no funciones sueltas?*
  Porque `spyOn` necesita un objeto y un nombre de método para reemplazarlo. Con funciones sueltas
  exportadas como módulo ES no se pueden espiar.

---

## Demostración en vivo sugerida (2 min, dentro del bloque 2)

1. Inicio → agregar 2 productos → el contador del carrito cambia.
2. Carrito → aumentar cantidad → el total se recalcula.
3. Checkout vacío → "Pagar" → aparecen los errores en rojo.
4. Completar datos → marcar "simular pago rechazado" → vista de error → "Volver a realizar el pago".
5. Desmarcar → pagar → vista de compra exitosa con boleta.
6. Login con `admin@f4a.cl` → Dashboard → Órdenes → la orden recién creada → Productos → el stock bajó.

## Cambios realizados frente a la versión anterior (por si preguntan por el historial de GitHub)

- Se reemplazó Vitest por **Jasmine + Karma**, que es lo exigido, y se pasó de 10 a 163 pruebas con mocks y cobertura.
- Se agregaron las vistas que faltaban: Ofertas, Blogs, Categorías, Productos y todo el panel administrativo.
- Se corrigieron:
  - el login que aceptaba cualquier contraseña de administrador;
  - la ruta `/admin`, que no estaba protegida;
  - la mutación del estado en el carrito;
  - el menú móvil y las FAQ, que no abrían;
  - el pago fallido, que era inalcanzable.
- El checkout ahora tiene apellidos, dirección, región, comuna e indicaciones (Figura 6).
