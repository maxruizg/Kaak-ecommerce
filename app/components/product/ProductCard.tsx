import { Link } from "@remix-run/react";
import { cn, formatCurrency } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";
import { LazyImage } from "~/components/media/LazyImage";

interface ProductCardProps {
  product: {
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
  };
  className?: string;
  index?: number;
}

export function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const primaryImage = product.images[0];
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.basePrice) / product.comparePrice) * 100)
    : null;

  return (
    <Link
      to={`/productos/${product.slug}`}
      className={cn(
        "group block bg-obsidian-900/60 backdrop-blur-sm rounded-xl border border-obsidian-700/50 overflow-hidden",
        "transition-all duration-300 hover:shadow-fire-500/10 hover:shadow-lg hover:border-obsidian-600 hover:-translate-y-1",
        className
      )}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-obsidian-800">
        {primaryImage ? (
          <LazyImage
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            className="w-full h-full"
            width={400}
            height={300}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-obsidian-600">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {discount && <Badge variant="crimson">-{discount}%</Badge>}
          {product.freeShipping && <Badge variant="jade">Envío Gratis</Badge>}
          {product.isRentable && <Badge variant="ember">Rentable</Badge>}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-obsidian-950/0 group-hover:bg-obsidian-950/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <p className="text-xs font-heading text-fire-500 uppercase tracking-wider mb-1">
          {product.category.name}
        </p>
        <h3 className="font-heading font-semibold text-lg text-white group-hover:text-fire-400 transition-colors">
          {product.name}
        </h3>
        {product.mayaName && (
          <p className="text-sm text-obsidian-500 italic mt-0.5">
            "{product.mayaName}"
          </p>
        )}

        {/* Price */}
        {product.isRentable ? (
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-heading font-bold text-ember-400">
                {formatCurrency(product.basePrice * 0.3)}
              </span>
              <span className="text-xs text-ember-400/70">Renta</span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-sm font-heading text-obsidian-400">
                {formatCurrency(product.basePrice)}
              </span>
              <span className="text-xs text-obsidian-500">Compra</span>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-heading font-bold text-white">
              {formatCurrency(product.basePrice)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-obsidian-500 line-through">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
