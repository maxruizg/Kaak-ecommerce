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
import { MayaDivider } from "~/components/maya/MayaDivider";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.product) return [{ title: "Producto no encontrado — K'Á-AK" }];
  return [
    { title: `${data.product.name} — K'Á-AK Barriles Asadores` },
    { name: "description", content: data.product.description.slice(0, 160) },
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
  const includes = product.includes ? JSON.parse(product.includes as string) : [];
  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="pt-20 md:pt-24 pb-16">
        <PageContainer>
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
                        <svg className="w-4 h-4 text-jade-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
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
