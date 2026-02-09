import { Link } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn, formatCurrency } from "~/lib/utils";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { PageContainer } from "~/components/layout/PageContainer";
import { ProductCard } from "~/components/product/ProductCard";

interface Product {
  slug: string;
  name: string;
  mayaName?: string | null;
  basePrice: number;
  comparePrice?: number | null;
  isFeatured: boolean;
  isRentable: boolean;
  freeShipping: boolean;
  images: { url: string; alt?: string | null }[];
  category: { name: string };
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-obsidian-950 relative" id="productos">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-fire-900)_0%,_transparent_50%)] opacity-20 pointer-events-none" />
      <PageContainer>
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-fire-500 mb-3">
            Nuestros Barriles
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Productos Destacados
          </h2>
          <MayaDivider variant="accent" className="max-w-xs mx-auto mb-6" />
          <p className="text-obsidian-400 max-w-2xl mx-auto text-lg">
            Tres tamaños inspirados en la fauna sagrada Maya. Cada barril está forjado
            con la pasión del fuego ancestral.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 px-6 py-3 font-heading font-semibold text-fire-400 hover:text-fire-300 transition-colors"
          >
            Ver todos los productos
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
