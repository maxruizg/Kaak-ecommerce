import { Link } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { PageContainer } from "~/components/layout/PageContainer";
import { ProductCard } from "~/components/product/ProductCard";
import { Icon } from "~/components/ui/Icon";
import type { Product } from "~/lib/products.data";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 md:py-36 bg-obsidian-950 relative" id="productos-destacados">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-fire-900)_0%,_transparent_50%)] opacity-20 pointer-events-none" />
      <PageContainer>
        {/* Quick Stats Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 text-sm font-heading tracking-wide">
          <span className="text-fire-400 font-semibold">3 Modelos</span>
          <span className="text-obsidian-600 hidden sm:inline">|</span>
          <span className="text-obsidian-300">8–80 Personas</span>
          <span className="text-obsidian-600 hidden sm:inline">|</span>
          <span className="text-cenote-400">Envío Gratis</span>
          <span className="text-obsidian-600 hidden sm:inline">|</span>
          <span className="text-ember-400">Desde $12,000</span>
        </div>

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
            Fauna sagrada Maya. Fuego ancestral.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} featured />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 px-6 py-3 font-heading font-semibold text-fire-400 hover:text-fire-300 transition-colors"
          >
            Ver todos los productos
            <Icon name="arrowRight" className="w-5 h-5" strokeWidth={2} />
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
