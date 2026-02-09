/**
 * Hardcoded product data for development without a database.
 * Replace with Prisma queries when the DB is ready.
 */

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  mayaName: string | null;
  categoryId: string;
  category: Category;
  basePrice: number;
  comparePrice: number | null;
  sku: string;
  isActive: boolean;
  isFeatured: boolean;
  isRentable: boolean;
  freeShipping: boolean;
  weight: number | null;
  guestCapacity: string | null;
  grillSize: string | null;
  material: string | null;
  includes: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
}

const categories: Category[] = [
  {
    id: "cat-barriles",
    name: "Barriles Asadores",
    slug: "barriles-asadores",
    description: "Barriles asadores profesionales K'Á-AK en tres tamaños, inspirados en la cultura Maya milenaria.",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "cat-accesorios",
    name: "Accesorios",
    slug: "accesorios",
    description: "Complementos esenciales para tu experiencia de asado profesional.",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "cat-insumos",
    name: "Insumos Artesanales",
    slug: "insumos-artesanales",
    description: "Ingredientes artesanales seleccionados para elevar tus asados.",
    sortOrder: 3,
    isActive: true,
  },
];

const products: Product[] = [
  {
    id: "prod-colibri",
    name: "Colibrí",
    slug: "colibri",
    description: "El barril asador compacto ideal para reuniones íntimas y espacios reducidos. Perfecto para familias y parrilleros que buscan calidad profesional en formato portátil. Inspirado en el colibrí, mensajero de los dioses Mayas.",
    mayaName: "Tz'unun",
    categoryId: "cat-barriles",
    category: categories[0],
    basePrice: 12000,
    comparePrice: 14500,
    sku: "KAAK-BAR-COL",
    isActive: true,
    isFeatured: true,
    isRentable: true,
    freeShipping: true,
    weight: 35,
    guestCapacity: "8-15 personas",
    grillSize: "40cm diámetro",
    material: "Acero al carbón calibre 10, pintura horneada de alta temperatura",
    includes: JSON.stringify([
      "Barril asador Colibrí",
      "Parrilla de acero inoxidable",
      "Charola para carbón",
      "Tapa con termómetro",
      "Manual de uso",
      "Garantía 1 año",
    ]),
    images: [
      { id: "img-col-1", url: "https://placehold.co/800x600/1a1a1a/e85d2c?text=Colibr%C3%AD&font=montserrat", alt: "Barril Asador Colibrí - Vista frontal", sortOrder: 0, isPrimary: true },
      { id: "img-col-2", url: "https://placehold.co/800x600/2a1a0a/f5a623?text=Colibr%C3%AD+en+Uso&font=montserrat", alt: "Barril Asador Colibrí - En uso", sortOrder: 1, isPrimary: false },
    ],
    variants: [],
  },
  {
    id: "prod-aguila",
    name: "Águila",
    slug: "aguila",
    description: "El barril asador versátil para eventos medianos y reuniones familiares grandes. Capacidad generosa y rendimiento profesional. Inspirado en el águila, símbolo de poder y visión en la cosmogonía Maya.",
    mayaName: "K'utz",
    categoryId: "cat-barriles",
    category: categories[0],
    basePrice: 18000,
    comparePrice: 21000,
    sku: "KAAK-BAR-AGU",
    isActive: true,
    isFeatured: true,
    isRentable: true,
    freeShipping: true,
    weight: 55,
    guestCapacity: "20-40 personas",
    grillSize: "57cm diámetro",
    material: "Acero al carbón calibre 10, pintura horneada de alta temperatura",
    includes: JSON.stringify([
      "Barril asador Águila",
      "Doble parrilla de acero inoxidable",
      "Charola para carbón ajustable",
      "Tapa con termómetro profesional",
      "Gancho para costillas",
      "Manual de uso",
      "Garantía 2 años",
    ]),
    images: [
      { id: "img-agu-1", url: "https://placehold.co/800x600/1a1a1a/e85d2c?text=%C3%81guila&font=montserrat", alt: "Barril Asador Águila - Vista frontal", sortOrder: 0, isPrimary: true },
      { id: "img-agu-2", url: "https://placehold.co/800x600/2a1a0a/f5a623?text=%C3%81guila+en+Uso&font=montserrat", alt: "Barril Asador Águila - En uso", sortOrder: 1, isPrimary: false },
    ],
    variants: [],
  },
  {
    id: "prod-jaguar",
    name: "Jaguar",
    slug: "jaguar",
    description: "El barril asador profesional de máxima capacidad para grandes eventos y uso comercial. El más grande y poderoso de la línea K'Á-AK. Inspirado en el jaguar, señor del inframundo Maya y símbolo de fuerza suprema.",
    mayaName: "Balam",
    categoryId: "cat-barriles",
    category: categories[0],
    basePrice: 25000,
    comparePrice: 29000,
    sku: "KAAK-BAR-JAG",
    isActive: true,
    isFeatured: true,
    isRentable: true,
    freeShipping: true,
    weight: 80,
    guestCapacity: "50-80 personas",
    grillSize: "70cm diámetro",
    material: "Acero al carbón calibre 10, doble capa de pintura horneada de alta temperatura",
    includes: JSON.stringify([
      "Barril asador Jaguar",
      "Triple parrilla de acero inoxidable",
      "Sistema de carbón multinivel",
      "Tapa con termómetro profesional dual",
      "Ganchos para costillas y pollo",
      "Ruedas industriales",
      "Manual de uso profesional",
      "Garantía 3 años",
    ]),
    images: [
      { id: "img-jag-1", url: "https://placehold.co/800x600/1a1a1a/e85d2c?text=Jaguar&font=montserrat", alt: "Barril Asador Jaguar - Vista frontal", sortOrder: 0, isPrimary: true },
      { id: "img-jag-2", url: "https://placehold.co/800x600/2a1a0a/f5a623?text=Jaguar+en+Uso&font=montserrat", alt: "Barril Asador Jaguar - En uso", sortOrder: 1, isPrimary: false },
    ],
    variants: [],
  },
  {
    id: "prod-lena",
    name: "Leña Premium de Mezquite",
    slug: "lena-mezquite",
    description: "Leña de mezquite seleccionada a mano, secada naturalmente durante 6 meses. Aporta un sabor ahumado único e inconfundible a tus asados. Paquete de 10kg.",
    mayaName: null,
    categoryId: "cat-accesorios",
    category: categories[1],
    basePrice: 350,
    comparePrice: null,
    sku: "KAAK-ACC-LEN",
    isActive: true,
    isFeatured: false,
    isRentable: false,
    freeShipping: false,
    weight: 10,
    guestCapacity: null,
    grillSize: null,
    material: null,
    includes: null,
    images: [
      { id: "img-len-1", url: "https://placehold.co/800x600/2a1a0a/d4a574?text=Le%C3%B1a+Mezquite&font=montserrat", alt: "Leña Premium de Mezquite", sortOrder: 0, isPrimary: true },
    ],
    variants: [],
  },
  {
    id: "prod-kit",
    name: "Kit de Herramientas K'Á-AK",
    slug: "kit-herramientas",
    description: "Set profesional de herramientas para asado: pinzas largas, espátula, tenedor y cepillo de limpieza. Acero inoxidable con mangos de madera grabados con motivos Mayas.",
    mayaName: null,
    categoryId: "cat-accesorios",
    category: categories[1],
    basePrice: 1800,
    comparePrice: 2200,
    sku: "KAAK-ACC-KIT",
    isActive: true,
    isFeatured: true,
    isRentable: false,
    freeShipping: false,
    weight: 2,
    guestCapacity: null,
    grillSize: null,
    material: null,
    includes: JSON.stringify([
      "Pinzas largas 45cm",
      "Espátula profesional",
      "Tenedor para carne",
      "Cepillo de limpieza",
      "Estuche de lona",
    ]),
    images: [
      { id: "img-kit-1", url: "https://placehold.co/800x600/1a1a1a/c0c0c0?text=Kit+Herramientas&font=montserrat", alt: "Kit de Herramientas K'Á-AK", sortOrder: 0, isPrimary: true },
    ],
    variants: [],
  },
  {
    id: "prod-sal",
    name: "Sal de Mar Yucateca",
    slug: "sal-mar-yucateca",
    description: "Sal de mar artesanal recolectada en las costas de Yucatán. Cristales gruesos ideales para sazonar cortes antes del asado. Bolsa de 500g.",
    mayaName: null,
    categoryId: "cat-insumos",
    category: categories[2],
    basePrice: 180,
    comparePrice: null,
    sku: "KAAK-INS-SAL",
    isActive: true,
    isFeatured: false,
    isRentable: false,
    freeShipping: false,
    weight: 0.5,
    guestCapacity: null,
    grillSize: null,
    material: null,
    includes: null,
    images: [
      { id: "img-sal-1", url: "https://placehold.co/800x600/f0f0f0/1a1a1a?text=Sal+de+Mar&font=montserrat", alt: "Sal de Mar Yucateca", sortOrder: 0, isPrimary: true },
    ],
    variants: [],
  },
];

export function getCategories() {
  return categories;
}

export function getAllProducts(categorySlug?: string | null) {
  let filtered = products.filter((p) => p.isActive);
  if (categorySlug) {
    filtered = filtered.filter((p) => p.category.slug === categorySlug);
  }
  return filtered;
}

export function getFeaturedProducts() {
  return products.filter((p) => p.isFeatured && p.isActive).sort((a, b) => a.basePrice - b.basePrice);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug && p.isActive) || null;
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id) || null;
}
