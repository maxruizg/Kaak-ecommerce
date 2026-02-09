import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🔥 Seeding K'Á-AK database...");

  // Admin user
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: "admin@kaak.mx" },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("kaak2026", 10);
    await prisma.adminUser.create({
      data: {
        email: "admin@kaak.mx",
        passwordHash,
        name: "Chef Marco HG",
        role: "admin",
      },
    });
    console.log("✅ Admin user created");
  }

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "barriles-asadores" },
      update: {},
      create: {
        name: "Barriles Asadores",
        slug: "barriles-asadores",
        description: "Barriles asadores profesionales K'Á-AK en tres tamaños, inspirados en la cultura Maya milenaria.",
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "accesorios" },
      update: {},
      create: {
        name: "Accesorios",
        slug: "accesorios",
        description: "Complementos esenciales para tu experiencia de asado profesional.",
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "insumos-artesanales" },
      update: {},
      create: {
        name: "Insumos Artesanales",
        slug: "insumos-artesanales",
        description: "Ingredientes artesanales seleccionados para elevar tus asados.",
        sortOrder: 3,
      },
    }),
  ]);

  const [barriles, accesorios, insumos] = categories;
  console.log("✅ Categories created");

  // Products - Barrels
  const colibri = await prisma.product.upsert({
    where: { slug: "colibri" },
    update: {},
    create: {
      name: "Colibrí",
      slug: "colibri",
      description: "El barril asador compacto ideal para reuniones íntimas y espacios reducidos. Perfecto para familias y parrilleros que buscan calidad profesional en formato portátil. Inspirado en el colibrí, mensajero de los dioses Mayas.",
      mayaName: "Tz'unun",
      categoryId: barriles.id,
      basePrice: 12000,
      comparePrice: 14500,
      sku: "KAAK-BAR-COL",
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
    },
  });

  const aguila = await prisma.product.upsert({
    where: { slug: "aguila" },
    update: {},
    create: {
      name: "Águila",
      slug: "aguila",
      description: "El barril asador versátil para eventos medianos y reuniones familiares grandes. Capacidad generosa y rendimiento profesional. Inspirado en el águila, símbolo de poder y visión en la cosmogonía Maya.",
      mayaName: "K'utz",
      categoryId: barriles.id,
      basePrice: 18000,
      comparePrice: 21000,
      sku: "KAAK-BAR-AGU",
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
    },
  });

  const jaguar = await prisma.product.upsert({
    where: { slug: "jaguar" },
    update: {},
    create: {
      name: "Jaguar",
      slug: "jaguar",
      description: "El barril asador profesional de máxima capacidad para grandes eventos y uso comercial. El más grande y poderoso de la línea K'Á-AK. Inspirado en el jaguar, señor del inframundo Maya y símbolo de fuerza suprema.",
      mayaName: "Balam",
      categoryId: barriles.id,
      basePrice: 25000,
      comparePrice: 29000,
      sku: "KAAK-BAR-JAG",
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
    },
  });

  // Product Images
  const productImages = [
    { productId: colibri.id, url: "/images/products/colibri-1.jpg", alt: "Barril Asador Colibrí - Vista frontal", sortOrder: 0, isPrimary: true },
    { productId: colibri.id, url: "/images/products/colibri-2.jpg", alt: "Barril Asador Colibrí - En uso", sortOrder: 1, isPrimary: false },
    { productId: aguila.id, url: "/images/products/aguila-1.jpg", alt: "Barril Asador Águila - Vista frontal", sortOrder: 0, isPrimary: true },
    { productId: aguila.id, url: "/images/products/aguila-2.jpg", alt: "Barril Asador Águila - En uso", sortOrder: 1, isPrimary: false },
    { productId: jaguar.id, url: "/images/products/jaguar-1.jpg", alt: "Barril Asador Jaguar - Vista frontal", sortOrder: 0, isPrimary: true },
    { productId: jaguar.id, url: "/images/products/jaguar-2.jpg", alt: "Barril Asador Jaguar - En uso", sortOrder: 1, isPrimary: false },
  ];

  for (const img of productImages) {
    await prisma.productImage.create({ data: img });
  }

  // Accessories
  const lena = await prisma.product.upsert({
    where: { slug: "lena-mezquite" },
    update: {},
    create: {
      name: "Leña Premium de Mezquite",
      slug: "lena-mezquite",
      description: "Leña de mezquite seleccionada a mano, secada naturalmente durante 6 meses. Aporta un sabor ahumado único e inconfundible a tus asados. Paquete de 10kg.",
      categoryId: accesorios.id,
      basePrice: 350,
      sku: "KAAK-ACC-LEN",
      weight: 10,
    },
  });

  const kit = await prisma.product.upsert({
    where: { slug: "kit-herramientas" },
    update: {},
    create: {
      name: "Kit de Herramientas K'Á-AK",
      slug: "kit-herramientas",
      description: "Set profesional de herramientas para asado: pinzas largas, espátula, tenedor y cepillo de limpieza. Acero inoxidable con mangos de madera grabados con motivos Mayas.",
      categoryId: accesorios.id,
      basePrice: 1800,
      comparePrice: 2200,
      sku: "KAAK-ACC-KIT",
      isFeatured: true,
      weight: 2,
      includes: JSON.stringify([
        "Pinzas largas 45cm",
        "Espátula profesional",
        "Tenedor para carne",
        "Cepillo de limpieza",
        "Estuche de lona",
      ]),
    },
  });

  // Artisanal supplies
  const sal = await prisma.product.upsert({
    where: { slug: "sal-mar-yucateca" },
    update: {},
    create: {
      name: "Sal de Mar Yucateca",
      slug: "sal-mar-yucateca",
      description: "Sal de mar artesanal recolectada en las costas de Yucatán. Cristales gruesos ideales para sazonar cortes antes del asado. Bolsa de 500g.",
      categoryId: insumos.id,
      basePrice: 180,
      sku: "KAAK-INS-SAL",
      weight: 0.5,
    },
  });

  // Images for accessories and supplies
  await prisma.productImage.createMany({
    data: [
      { productId: lena.id, url: "/images/products/lena-1.jpg", alt: "Leña Premium de Mezquite", sortOrder: 0, isPrimary: true },
      { productId: kit.id, url: "/images/products/kit-1.jpg", alt: "Kit de Herramientas K'Á-AK", sortOrder: 0, isPrimary: true },
      { productId: sal.id, url: "/images/products/sal-1.jpg", alt: "Sal de Mar Yucateca", sortOrder: 0, isPrimary: true },
    ],
  });
  console.log("✅ Products and images created");

  // Site Settings
  const settings = [
    { key: "phone", value: "+52 999 123 4567" },
    { key: "email", value: "hola@kaak.mx" },
    { key: "whatsapp", value: "5219991234567" },
    { key: "instagram", value: "https://instagram.com/kaak.mx" },
    { key: "facebook", value: "https://facebook.com/kaak.mx" },
    { key: "address", value: "Mérida, Yucatán, México" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("✅ Site settings created");

  console.log("🔥 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
