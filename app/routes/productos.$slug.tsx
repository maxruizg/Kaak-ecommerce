import type { LoaderFunctionArgs, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useOutletContext, useNavigation } from "@remix-run/react";
import { addToCart } from "~/lib/cart.server";
import { getProductBySlug } from "~/lib/products.data";
import { formatCurrency } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { ProductGallery } from "~/components/product/ProductGallery";
import { ProductActions } from "~/components/product/ProductActions";
import { Badge } from "~/components/ui/Badge";
import { Icon } from "~/components/ui/Icon";
import { MayaDivider } from "~/components/maya/MayaDivider";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.product) return [{ title: "Producto no encontrado — K'Á-AK" }];
  const primaryImage = data.product.images.find((i) => i.isPrimary) || data.product.images[0];
  return [
    { title: `${data.product.name} — K'Á-AK Barriles Asadores` },
    { name: "description", content: data.product.description.slice(0, 160) },
    { property: "og:title", content: `${data.product.name} — K'Á-AK` },
    { property: "og:description", content: data.product.description.slice(0, 160) },
    { property: "og:image", content: primaryImage?.url || "/og-image.jpg" },
    { property: "og:type", content: "product" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${data.product.name} — K'Á-AK` },
    { name: "twitter:image", content: primaryImage?.url || "/og-image.jpg" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const product = getProductBySlug(params.slug || "");

  if (!product) {
    throw new Response("Producto no encontrado", { status: 404 });
  }

  return json({ product });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "addToCart") {
    try {
      const productId = formData.get("productId") as string;
      const productName = formData.get("productName") as string;
      const price = Number(formData.get("price"));
      const image = formData.get("image") as string;
      const variantId = formData.get("variantId") as string | undefined;
      const variantName = formData.get("variantName") as string | undefined;

      const cookie = await addToCart(request, {
        productId,
        name: productName,
        price,
        quantity: 1,
        image: image || undefined,
        variantId: variantId || undefined,
        variantName: variantName || undefined,
      });

      return redirect("/carrito", {
        headers: { "Set-Cookie": cookie },
      });
    } catch (error) {
      console.error("productos.$slug addToCart error:", error);
      return json({ error: "No se pudo agregar al carrito. Intente de nuevo." }, { status: 500 });
    }
  }

  if (intent === "addToRental") {
    try {
      const productId = formData.get("productId") as string;
      const productName = formData.get("productName") as string;
      const basePrice = Number(formData.get("price"));
      const image = formData.get("image") as string;

      const cookie = await addToCart(request, {
        productId,
        name: productName,
        price: basePrice * 0.3,
        quantity: 1,
        image: image || undefined,
        variantId: "rental",
        variantName: "Renta",
        isRental: true,
      });

      return redirect("/carrito", {
        headers: { "Set-Cookie": cookie },
      });
    } catch (error) {
      console.error("productos.$slug addToRental error:", error);
      return json({ error: "No se pudo agregar al carrito. Intente de nuevo." }, { status: 500 });
    }
  }

  return json({ error: "Intent no válido" }, { status: 400 });
}

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();
  const navigation = useNavigation();
  const submittingIntent = navigation.formData?.get("intent") as string | undefined;
  const isSubmitting = navigation.state === "submitting";
  const includes: string[] = product.includes
    ? (typeof product.includes === "string" ? JSON.parse(product.includes) : product.includes)
    : [];
  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      price: product.basePrice,
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar cartItemCount={cartItemCount} />
      <main id="main-content" className="pt-20 md:pt-24 pb-16">
        <PageContainer>
          {/* Lo Esencial — at-a-glance summary */}
          {(product.guestCapacity || product.grillSize || product.material) && (
            <div className="mb-10 p-5 rounded-xl bg-obsidian-900/60 border border-obsidian-700/50 backdrop-blur-sm">
              <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-fire-500 mb-3">
                Lo Esencial
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-obsidian-500 text-xs">Modelo</p>
                  <p className="font-heading font-semibold text-white">{product.name}</p>
                </div>
                {product.guestCapacity && (
                  <div>
                    <p className="text-obsidian-500 text-xs">Capacidad</p>
                    <p className="font-heading font-semibold text-white">{product.guestCapacity}</p>
                  </div>
                )}
                {product.grillSize && (
                  <div>
                    <p className="text-obsidian-500 text-xs">Parrilla</p>
                    <p className="font-heading font-semibold text-white">{product.grillSize}</p>
                  </div>
                )}
                <div>
                  <p className="text-obsidian-500 text-xs">Precio</p>
                  <p className="font-heading font-semibold text-fire-400">{formatCurrency(product.basePrice)}</p>
                </div>
                {product.freeShipping && (
                  <div>
                    <p className="text-obsidian-500 text-xs">Envío</p>
                    <p className="font-heading font-semibold text-cenote-400">Gratis</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Info */}
            <div>
              <p className="font-heading text-sm uppercase tracking-wider text-fire-500 mb-2">
                {product.category.name}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                {product.name}
              </h1>
              {product.mayaName && (
                <p className="font-heading text-lg text-obsidian-400 italic mb-4">
                  "{product.mayaName}"
                </p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.freeShipping && <Badge variant="jade">Envío Gratis</Badge>}
                {product.isRentable && <Badge variant="ember">Disponible para Renta</Badge>}
              </div>

              {/* Price — only for non-rentable; rentable price is inside ProductActions */}
              {!product.isRentable && (
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-heading font-bold text-white">
                    {formatCurrency(product.basePrice)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-lg text-obsidian-400 line-through">
                      {formatCurrency(product.comparePrice)}
                    </span>
                  )}
                </div>
              )}

              <MayaDivider variant="accent" className="mb-6" />

              {/* Description */}
              <p className="text-obsidian-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Specs */}
              {(product.guestCapacity || product.grillSize || product.material) && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {product.guestCapacity && (
                    <div>
                      <p className="text-xs font-heading uppercase text-obsidian-400 tracking-wider">Capacidad</p>
                      <p className="font-medium text-white">{product.guestCapacity}</p>
                    </div>
                  )}
                  {product.grillSize && (
                    <div>
                      <p className="text-xs font-heading uppercase text-obsidian-400 tracking-wider">Parrilla</p>
                      <p className="font-medium text-white">{product.grillSize}</p>
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <p className="text-xs font-heading uppercase text-obsidian-400 tracking-wider">Peso</p>
                      <p className="font-medium text-white">{product.weight} kg</p>
                    </div>
                  )}
                  {product.material && (
                    <div className="col-span-2">
                      <p className="text-xs font-heading uppercase text-obsidian-400 tracking-wider">Material</p>
                      <p className="font-medium text-white">{product.material}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Includes */}
              {includes.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-white mb-3">
                    Incluye:
                  </h3>
                  <ul className="space-y-2">
                    {includes.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-obsidian-300">
                        <Icon name="check" className="w-4 h-4 text-jade-600 flex-shrink-0" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buy / Rent actions */}
              <ProductActions
                product={product}
                primaryImageUrl={primaryImage?.url || ""}
                isSubmitting={isSubmitting}
                currentIntent={submittingIntent}
              />
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
