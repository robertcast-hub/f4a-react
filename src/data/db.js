// src/data/db.js
// Datos semilla de la aplicación. Actúan como una base de datos inicial:
// la primera vez que se abre la tienda se copian a localStorage (ver storage.js).

export const CATEGORIAS = [
  { id: 'gaming', nombre: 'Juegos', descripcion: 'Claves de videojuegos para PC y consolas.', imagen: '/imagenes/banner-juegos-bg.jpg' },
  { id: 'software', nombre: 'Software', descripcion: 'Licencias originales de sistemas y ofimática.', imagen: '/imagenes/bannerSistemas.webp' },
  { id: 'subscripciones', nombre: 'Suscripciones', descripcion: 'Música, IA y streaming por meses.', imagen: '/imagenes/open-graph-default.webp' },
  { id: 'regalos', nombre: 'Tarjetas de regalo', descripcion: 'Saldo para regalar o recargar tu billetera.', imagen: '/imagenes/banner_tarjetaRegalo.webp' },
  { id: 'randomkey', nombre: 'Claves aleatorias', descripcion: 'Una clave de Steam sorpresa con valor garantizado.', imagen: '/imagenes/banner_randomkey.webp' },
];

export const PRODUCTOS = [
  { id: 'P001', nombre: 'Final Fantasy VII Remake Intergrade', categoria: 'gaming', precio: 29990, precioOferta: 22990, stock: 25, stockCritico: 5, imagen: '/imagenes/FFVIIR.webp', descripcion: 'La historia de Cloud reinventada con combate en tiempo real e Intermission de Yuffie incluido.', destacado: true },
  { id: 'P002', nombre: 'Grand Theft Auto V: Premium Edition', categoria: 'gaming', precio: 14990, precioOferta: null, stock: 40, stockCritico: 8, imagen: '/imagenes/gta5.webp', descripcion: 'Historia completa de GTA V y acceso a GTA Online con el paquete Criminal Enterprise.', destacado: true },
  { id: 'P003', nombre: 'Grand Theft Auto VI (Reserva)', categoria: 'gaming', precio: 69990, precioOferta: null, stock: 4, stockCritico: 5, imagen: '/imagenes/gta6.webp', descripcion: 'Reserva la clave del próximo título de Rockstar ambientado en Vice City.', destacado: true },
  { id: 'P004', nombre: "Tom Clancy's Rainbow Six Siege", categoria: 'gaming', precio: 9990, precioOferta: 5990, stock: 60, stockCritico: 10, imagen: '/imagenes/R6Game.webp', descripcion: 'Shooter táctico 5v5 centrado en destrucción del entorno y estrategia de equipo.', destacado: false },
  { id: 'P005', nombre: 'Minecraft Java & Bedrock Edition', categoria: 'gaming', precio: 19990, precioOferta: null, stock: 3, stockCritico: 5, imagen: '/imagenes/MinecraftLogo.webp', descripcion: 'Ambas ediciones en una sola compra: explora, construye y sobrevive.', destacado: true },
  { id: 'P006', nombre: 'Warhammer 40k: Space Marine 2', categoria: 'gaming', precio: 45990, precioOferta: 36990, stock: 12, stockCritico: 4, imagen: '/imagenes/bannerMarines.webp', descripcion: 'Combate brutal en tercera persona contra las hordas tiránidas.', destacado: false },
  { id: 'P007', nombre: 'World of Warcraft: The War Within', categoria: 'gaming', precio: 39990, precioOferta: null, stock: 18, stockCritico: 5, imagen: '/imagenes/wow.webp', descripcion: 'Expansión que lleva Azeroth a las profundidades de Khaz Algar.', destacado: false },
  { id: 'P008', nombre: 'Onimusha: Way of the Sword', categoria: 'gaming', precio: 49990, precioOferta: null, stock: 9, stockCritico: 3, imagen: '/imagenes/onimusha.webp', descripcion: 'Acción samurái en el Kioto del período Edo.', destacado: false },
  { id: 'P009', nombre: 'Windows 11 Pro', categoria: 'software', precio: 12990, precioOferta: 9990, stock: 100, stockCritico: 15, imagen: '/imagenes/OIP.webp', descripcion: 'Licencia digital vitalicia para un PC, activación en línea.', destacado: true },
  { id: 'P010', nombre: 'Microsoft Excel 2021', categoria: 'software', precio: 14990, precioOferta: null, stock: 30, stockCritico: 6, imagen: '/imagenes/excel.webp', descripcion: 'Licencia individual permanente de Excel 2021.', destacado: false },
  { id: 'P011', nombre: 'Power BI Pro (1 mes)', categoria: 'software', precio: 10990, precioOferta: null, stock: 2, stockCritico: 4, imagen: '/imagenes/power.webp', descripcion: 'Informes y paneles colaborativos para tu equipo.', destacado: false },
  { id: 'P012', nombre: 'ChatGPT Plus (1 mes)', categoria: 'subscripciones', precio: 18990, precioOferta: null, stock: 50, stockCritico: 10, imagen: '/imagenes/gpt.webp', descripcion: 'Acceso prioritario a los modelos más recientes de OpenAI.', destacado: true },
  { id: 'P013', nombre: 'Gemini Advanced (1 mes)', categoria: 'subscripciones', precio: 17990, precioOferta: 14990, stock: 40, stockCritico: 8, imagen: '/imagenes/geminipro.webp', descripcion: 'Plan con el modelo más capaz de Google y 2 TB de almacenamiento.', destacado: false },
  { id: 'P014', nombre: 'Spotify Premium (3 meses)', categoria: 'subscripciones', precio: 11990, precioOferta: null, stock: 70, stockCritico: 10, imagen: '/imagenes/open-graph-default.webp', descripcion: 'Música sin anuncios y descargas para escuchar sin conexión.', destacado: true },
  { id: 'P015', nombre: 'YouTube Music Premium (1 mes)', categoria: 'subscripciones', precio: 4990, precioOferta: null, stock: 80, stockCritico: 10, imagen: '/imagenes/yt_music.webp', descripcion: 'Reproducción en segundo plano y sin interrupciones.', destacado: false },
  { id: 'P016', nombre: 'Tarjeta de regalo F4A $20.000', categoria: 'regalos', precio: 20000, precioOferta: 18500, stock: 200, stockCritico: 20, imagen: '/imagenes/banner_tarjetaRegalo.webp', descripcion: 'Saldo instantáneo en la billetera F4A, ideal para regalar.', destacado: true },
  { id: 'P017', nombre: 'Steam Random Key VIP', categoria: 'randomkey', precio: 2990, precioOferta: null, stock: 150, stockCritico: 20, imagen: '/imagenes/banner_randomkey.webp', descripcion: 'Una clave aleatoria de Steam con valor de mercado garantizado.', destacado: true },
];

export const USUARIOS = [
  { id: 'U001', run: '11111111-1', nombre: 'Admin', apellidos: 'F4A', email: 'admin@f4a.cl', password: 'admin123', rol: 'admin', region: 'Región Metropolitana de Santiago', comuna: 'Santiago', direccion: 'Av. Libertador 1234' },
  { id: 'U002', run: '12345678-5', nombre: 'Pedro', apellidos: 'Soto', email: 'cliente@f4a.cl', password: 'cliente123', rol: 'cliente', region: 'Región Metropolitana de Santiago', comuna: 'Maipú', direccion: 'Los Crisantemos 603' },
  { id: 'U003', run: '9876543-3', nombre: 'Camila', apellidos: 'Rojas', email: 'camila@correo.cl', password: 'camila123', rol: 'cliente', region: 'Región de Valparaíso', comuna: 'Viña del Mar', direccion: 'Calle Valparaíso 456' },
];

export const ORDENES = [
  {
    id: 'ORD-20260001', fecha: '2026-11-02T14:20:00.000Z', estado: 'pagada', usuarioId: 'U002',
    cliente: { nombre: 'Pedro', apellidos: 'Soto', email: 'cliente@f4a.cl', calle: 'Los Crisantemos 603', departamento: '', region: 'Región Metropolitana de Santiago', comuna: 'Maipú', indicaciones: '' },
    items: [
      { id: 'P002', nombre: 'Grand Theft Auto V: Premium Edition', precioUnitario: 14990, cantidad: 1 },
      { id: 'P017', nombre: 'Steam Random Key VIP', precioUnitario: 2990, cantidad: 2 },
    ],
    total: 20970,
    pago: { metodo: 'webpay', ultimos4: '1111', motivo: null },
  },
  {
    id: 'ORD-20260002', fecha: '2026-11-08T19:05:00.000Z', estado: 'rechazada', usuarioId: 'U003',
    cliente: { nombre: 'Camila', apellidos: 'Rojas', email: 'camila@correo.cl', calle: 'Calle Valparaíso 456', departamento: '12B', region: 'Región de Valparaíso', comuna: 'Viña del Mar', indicaciones: 'Dejar en conserjería' },
    items: [{ id: 'P012', nombre: 'ChatGPT Plus (1 mes)', precioUnitario: 18990, cantidad: 1 }],
    total: 18990,
    pago: { metodo: 'paypal', ultimos4: null, motivo: 'El usuario canceló el pago en PayPal' },
  },
  {
    id: 'ORD-20260003', fecha: '2026-11-12T10:40:00.000Z', estado: 'pagada', usuarioId: 'U003',
    cliente: { nombre: 'Camila', apellidos: 'Rojas', email: 'camila@correo.cl', calle: 'Calle Valparaíso 456', departamento: '12B', region: 'Región de Valparaíso', comuna: 'Viña del Mar', indicaciones: '' },
    items: [
      { id: 'P012', nombre: 'ChatGPT Plus (1 mes)', precioUnitario: 18990, cantidad: 1 },
      { id: 'P009', nombre: 'Windows 11 Pro', precioUnitario: 9990, cantidad: 1 },
    ],
    total: 28980,
    pago: { metodo: 'mastercard', ultimos4: '4444', motivo: null },
  },
];

export const BLOGS = [
  {
    id: 'claves-originales',
    titulo: 'Cómo distinguir una clave original de una revendida',
    fecha: '2026-10-21',
    autor: 'Equipo F4A',
    imagen: '/imagenes/banner-bg.webp.png',
    resumen: 'Tres señales para saber si una clave digital es legítima antes de pagar.',
    contenido: [
      'Una clave legítima viene de un distribuidor autorizado y se activa en la plataforma oficial: Steam, Microsoft Store o la tienda del editor.',
      'Desconfía de precios que están muy por debajo del mercado sin una promoción que lo explique. Las claves revendidas suelen venir de compras con tarjetas robadas y pueden ser revocadas.',
      'En F4A cada clave tiene trazabilidad con el proveedor y, si una activación falla, te devolvemos el dinero o la reemplazamos.',
    ],
  },
  {
    id: 'guia-gta6',
    titulo: 'GTA VI: lo que sabemos antes del lanzamiento',
    fecha: '2026-11-05',
    autor: 'Equipo F4A',
    imagen: '/imagenes/gta6.webp',
    resumen: 'Plataformas, requisitos y qué incluye la reserva digital.',
    contenido: [
      'Rockstar confirmó Vice City como escenario principal, con dos protagonistas y un mapa más grande que el de GTA V.',
      'La reserva digital asegura la clave el día del lanzamiento y la descarga anticipada cuando el editor la habilite.',
      'Si reservas en F4A, la clave llega a tu correo en cuanto el distribuidor la libera, sin pasos extra.',
    ],
  },
];

// Regiones y comunas de Chile (subconjunto representativo para el formulario de entrega)
export const REGIONES = [
  { nombre: 'Región de Arica y Parinacota', comunas: ['Arica', 'Putre'] },
  { nombre: 'Región de Tarapacá', comunas: ['Iquique', 'Alto Hospicio'] },
  { nombre: 'Región de Antofagasta', comunas: ['Antofagasta', 'Calama'] },
  { nombre: 'Región de Atacama', comunas: ['Copiapó', 'Vallenar'] },
  { nombre: 'Región de Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle'] },
  { nombre: 'Región de Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'San Antonio'] },
  { nombre: 'Región Metropolitana de Santiago', comunas: ['Santiago', 'Cerrillos', 'Maipú', 'Puente Alto', 'Providencia', 'Las Condes', 'Ñuñoa', 'La Florida'] },
  { nombre: "Región del Libertador Gral. Bernardo O'Higgins", comunas: ['Rancagua', 'San Fernando'] },
  { nombre: 'Región del Maule', comunas: ['Talca', 'Curicó', 'Linares'] },
  { nombre: 'Región de Ñuble', comunas: ['Chillán', 'San Carlos'] },
  { nombre: 'Región del Biobío', comunas: ['Concepción', 'Talcahuano', 'Los Ángeles'] },
  { nombre: 'Región de La Araucanía', comunas: ['Temuco', 'Villarrica'] },
  { nombre: 'Región de Los Ríos', comunas: ['Valdivia', 'La Unión'] },
  { nombre: 'Región de Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro'] },
  { nombre: 'Región de Aysén', comunas: ['Coyhaique', 'Puerto Aysén'] },
  { nombre: 'Región de Magallanes', comunas: ['Punta Arenas', 'Puerto Natales'] },
];
