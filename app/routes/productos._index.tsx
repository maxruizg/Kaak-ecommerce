import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getAllProducts, getCategories } from "~/lib/products.data";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { ProductGrid } from "~/components/product/ProductGrid";
import { ProductFilters } from "~/components/product/ProductFilters";
import { MayaDivider } from "~/components/maya/MayaDivider";

export const meta: MetaFunction = () => [
  { title: "Productos — K'Á-AK Barriles Asadores" },
  { name: "description", content: "Explora nuestra línea completa de barriles asadores, accesorios e insumos artesanales inspirados en la cultura Maya." },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const categorySlug = url.searchParams.get("categoria");

  const products = getAllProducts(categorySlug);
  const categories = getCategories();

  return json({ products, categories });
}

export default function ProductosIndex() {
  const { products, categories } = useLoaderData<typeof loader>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="pt-20 md:pt-24 pb-16">
        <PageContainer>
          <div className="text-center mb-10">
            <p className="font-heading text-sm uppercase tracking-[0.3em] text-fire-500 mb-3">
              Catálogo
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Nuestros Productos
            </h1>
            <MayaDivider variant="accent" className="max-w-xs mx-auto mb-8" />
          </div>

          <div className="mb-8">
            <ProductFilters categories={categories} />
          </div>

          <ProductGrid products={products} />
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
