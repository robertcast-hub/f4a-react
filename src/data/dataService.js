// src/data/dataService.js

const INITIAL_PRODUCTS = [
  // Gaming
  {
    id: '1',
    nombre: 'Final Fantasy VII Remake Intergrade',
    categoria: 'gaming',
    precio: 29990,
    precioUSD: 34.99,
    precioEUR: 31.99,
    imagen: '/imagenes/FFVIIR.webp',
    descripcion: 'Inolvidable historia reinventada con combate en tiempo real y gráficos deslumbrantes.',
    destacado: true
  },
  {
    id: '2',
    nombre: 'Grand Theft Auto V: Premium Edition',
    categoria: 'gaming',
    precio: 14990,
    precioUSD: 17.99,
    precioEUR: 16.49,
    imagen: '/imagenes/gta5.webp',
    descripcion: 'Incluye la historia completa de GTA V y acceso a GTA Online.',
    destacado: true
  },
  {
    id: '3',
    nombre: 'Grand Theft Auto VI',
    categoria: 'gaming',
    precio: 69990,
    precioUSD: 69.99,
    precioEUR: 69.99,
    imagen: '/imagenes/gta6.webp',
    descripcion: 'Reserva anticipada del esperado título de Rockstar Games en Vice City.',
    destacado: true
  },
  {
    id: '4',
    nombre: 'Tom Clancy\'s Rainbow Six Siege',
    categoria: 'gaming',
    precio: 9990,
    precioUSD: 11.99,
    precioEUR: 10.99,
    imagen: '/imagenes/R6Game.webp',
    descripcion: 'Shooter táctico de alto impacto 5v5 enfocado en la destrucción y estrategia.',
    destacado: false
  },
  {
    id: '5',
    nombre: 'Minecraft Java & Bedrock Edition',
    categoria: 'gaming',
    precio: 19990,
    precioUSD: 23.99,
    precioEUR: 21.99,
    imagen: '/imagenes/MinecraftLogo.webp',
    descripcion: 'Explora mundos infinitos y construye todo lo que puedas imaginar.',
    destacado: true
  },
  {
    id: '6',
    nombre: 'Warhammer 40k: Space Marine 2',
    categoria: 'gaming',
    precio: 45990,
    precioUSD: 49.99,
    precioEUR: 45.99,
    imagen: '/imagenes/bannerMarines.webp',
    descripcion: 'Encarna la habilidad sobrehumana y la brutalidad de un Space Marine.',
    destacado: false
  },
  {
    id: '7',
    nombre: 'World of Warcraft: The War Within',
    categoria: 'gaming',
    precio: 39990,
    precioUSD: 44.99,
    precioEUR: 39.99,
    imagen: '/imagenes/wow.webp',
    descripcion: 'Defiende Azeroth de las sombras de las profundidades.',
    destacado: false
  },
  // Software
  {
    id: '8',
    nombre: 'Windows 11 Pro Key',
    categoria: 'software',
    precio: 12990,
    precioUSD: 14.99,
    precioEUR: 13.99,
    imagen: '/imagenes/OIP.webp',
    descripcion: 'Licencia digital vitalicia de Windows 11 Profesional para 1 PC.',
    destacado: true
  },
  {
    id: '9',
    nombre: 'Microsoft Excel 2021',
    categoria: 'software',
    precio: 14990,
    precioUSD: 16.99,
    precioEUR: 15.99,
    imagen: '/imagenes/excel.webp',
    descripcion: 'Licencia individual de Excel 2021 para gestión de hojas de cálculo.',
    destacado: false
  },
  // Subscripciones
  {
    id: '10',
    nombre: 'ChatGPT Plus (Suscripción 1 Mes)',
    categoria: 'subscripciones',
    precio: 18990,
    precioUSD: 20.00,
    precioEUR: 18.99,
    imagen: '/imagenes/gpt.webp',
    descripcion: 'Acceso a GPT-4o, generación de imágenes y respuestas prioritarias.',
    destacado: true
  },
  {
    id: '11',
    nombre: 'Spotify Premium 3 Meses',
    categoria: 'subscripciones',
    precio: 11990,
    precioUSD: 13.99,
    precioEUR: 12.99,
    imagen: '/imagenes/open-graph-default.webp',
    descripcion: 'Música sin anuncios y reproducción sin conexión.',
    destacado: true
  },
  {
    id: '12',
    nombre: 'YouTube Music Premium (1 Mes)',
    categoria: 'subscripciones',
    precio: 4990,
    precioUSD: 5.99,
    precioEUR: 5.49,
    imagen: '/imagenes/yt_music.webp',
    descripcion: 'Escucha millones de canciones sin interrupciones y en segundo plano.',
    destacado: false
  },
  // Regalos
  {
    id: '13',
    nombre: 'Tarjeta de Regalo F4A Game Card',
    categoria: 'regalos',
    precio: 18500,
    precioUSD: 20.00,
    precioEUR: 18.50,
    imagen: '/imagenes/banner_tarjetaRegalo.webp',
    descripcion: 'Agrega saldo de forma instantánea a tu billetera F4A.',
    destacado: true
  },
  // Random Key
  {
    id: '14',
    nombre: 'Steam Random Key VIP',
    categoria: 'randomkey',
    precio: 2990,
    precioUSD: 3.50,
    precioEUR: 3.20,
    imagen: '/imagenes/banner_randomkey.webp',
    descripcion: 'Consigue una clave aleatoria de Steam con valor garantizado.',
    destacado: true
  }
];

// Cargar productos desde localStorage o inicializar forzando actualización
export const getProducts = () => {
  const stored = localStorage.getItem('f4a_products');
  if (!stored || stored.includes('.jpg') || stored.includes('.png')) {
    localStorage.setItem('f4a_products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category) => {
  const products = getProducts();
  if (!category || category === 'todas') return products;
  return products.filter(p => p.categoria.toLowerCase() === category.toLowerCase());
};

export const addProduct = (newProduct) => {
  const products = getProducts();
  const productToAdd = { ...newProduct, id: Date.now().toString() };
  const updated = [...products, productToAdd];
  localStorage.setItem('f4a_products', JSON.stringify(updated));
  return updated;
};

export const updateProduct = (id, updatedData) => {
  const products = getProducts();
  const updated = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
  localStorage.setItem('f4a_products', JSON.stringify(updated));
  return updated;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const updated = products.filter(p => p.id !== id);
  localStorage.setItem('f4a_products', JSON.stringify(updated));
  return updated;
};

export const resetProductsToDefault = () => {
  localStorage.setItem('f4a_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};