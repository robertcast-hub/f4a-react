# F4A Tienda Digital — Frontend React (Evaluación Parcial 2, DSY1104)

Tienda online de claves digitales (videojuegos, software, suscripciones y tarjetas de regalo) construida con
**React 19 + Vite**, **Bootstrap 5** y probada con **Jasmine + Karma**.

## Requisitos

- Node.js 20 o superior
- Google Chrome instalado (Karma lo usa en modo *headless* para ejecutar las pruebas)

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias |
| `npm run dev` | Levanta la tienda en http://localhost:5173 |
| `npm test` | Ejecuta las 194 pruebas con Karma + Jasmine y genera el reporte de cobertura |
| `npm run test:watch` | Ejecuta las pruebas en modo observación (se repiten al guardar) |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run lint` | Revisa el código con ESLint |

Después de `npm test`, abre **`coverage/html/index.html`** en el navegador para ver la cobertura por archivo y línea.

> Si Karma no encuentra Chrome, define la variable `CHROME_BIN` con la ruta del ejecutable.
> Windows (PowerShell): `$env:CHROME_BIN="C:\Program Files\Google\Chrome\Application\chrome.exe"; npm test`

## Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@f4a.cl | admin123 |
| Cliente | cliente@f4a.cl | cliente123 |

Para volver a los datos iniciales, borra el *Local Storage* del sitio en las herramientas del navegador (F12 → Application).

## Estructura

```
src/
├── App.jsx                 Mapa de rutas (tienda pública + panel admin protegido)
├── main.jsx                Monta Router, AuthProvider y CartProvider
├── data/
│   ├── db.js               Datos semilla (productos, categorías, usuarios, órdenes, blogs, regiones)
│   ├── storage.js          Persistencia en localStorage + repositorio CRUD genérico
│   └── dataService.js      Servicios por entidad: CRUD + consultas (búsqueda, ofertas, críticos, reportes)
├── context/                Estado global: CartContext (carrito) y AuthContext (sesión)
├── components/
│   ├── common/             Button, Alert/ErrorMessage, FormField, EmptyState, PageTitle
│   ├── products/           ProductCard, ProductGrid, ProductFilters, PriceTag, QuantitySelector, CategoryCard
│   ├── orders/             CustomerForm, OrderItemsTable, OrderReceipt
│   ├── admin/              ProductForm, UserForm, StatCard, BarList
│   ├── payment/            PaymentMethodSelector, PaymentGateway (pasarela simulada)
│   └── layout/             Header, Footer, StoreLayout, AdminLayout, ProtectedRoute, ScrollToTop
├── pages/store/            Vistas de la tienda
├── pages/admin/            Vistas del panel administrativo
├── utils/                  Formato, validaciones (RUN, correo, formularios) y payment.js (tarjetas y pagos)
└── test/                   Punto de entrada de Karma y helper renderWithProviders
```

Cada archivo `*.spec.js(x)` está junto al componente que prueba.

## Rutas

**Tienda:** `/`, `/productos`, `/producto/:id`, `/categorias`, `/categorias/:id`, `/ofertas`, `/carrito`,
`/checkout`, `/compra/exito/:orderId`, `/compra/error/:orderId`, `/login`, `/registro`, `/nosotros`,
`/blogs`, `/blogs/:id`, `/contacto`, `/faqs`, `/terminos`, `/privacidad`.

**Administrador** (requiere rol `admin`): `/admin`, `/admin/ordenes`, `/admin/ordenes/:id`,
`/admin/productos`, `/admin/productos/nuevo`, `/admin/productos/:id`, `/admin/productos/:id/editar`,
`/admin/productos/criticos`, `/admin/productos/reportes`, `/admin/categorias`, `/admin/categorias/nueva`,
`/admin/categorias/:id/editar`, `/admin/usuarios`, `/admin/usuarios/nuevo`, `/admin/usuarios/:id`,
`/admin/usuarios/:id/editar`, `/admin/reportes`, `/admin/perfil`.

## Pasarela de pago simulada

En el checkout el cliente elige **Webpay Plus, Visa, Mastercard, PayPal o Mercado Pago** y pasa a una
pasarela simulada (no se cobra nada ni se conecta a ningún banco):

- **Tarjetas** (Webpay, Visa, Mastercard): se valida el número con el algoritmo de Luhn, que la marca
  corresponda al medio elegido, el vencimiento (MM/AA, no vencida) y el CVV (3 dígitos).
- **Billeteras** (PayPal, Mercado Pago): el cliente autoriza o cancela el pago.

Tarjetas de prueba (cualquier nombre, fecha futura y CVV de 3 dígitos):

| Número | Marca | Resultado |
|---|---|---|
| 4111 1111 1111 1111 | Visa | Aprobada |
| 5555 5555 5555 4444 | Mastercard | Aprobada |
| 4000 0000 0000 0002 | Visa | Rechazada: fondos insuficientes |
| 5105 1051 0510 5100 | Mastercard | Rechazada: tarjeta bloqueada |

Si el pago se aprueba, se descuenta el stock y se genera la boleta. Si se rechaza, la orden queda
registrada como rechazada con su motivo y el carrito se conserva. La orden solo guarda los últimos
4 dígitos de la tarjeta: nunca el número completo ni el CVV.

## Datos guardados

Las claves de localStorage llevan versión (`f4a_v3_...`). Al abrir la app se borran los datos de la
versión 2.x (`f4a_products`, `f4a_cart`, etc.) para que no se mezclen con la estructura nueva.

## Documentación

- `docs/Documento ERS V2.docx` — especificación de requisitos
- `docs/Documento de Cobertura de Testing.docx` — plan, inventario y análisis de las pruebas
- `docs/GUIA_DEFENSA.md` — guion para la presentación
