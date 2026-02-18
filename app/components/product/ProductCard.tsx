import { Link } from "@remix-run/react";
import { cn, formatCurrency } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";
import { Icon } from "~/components/ui/Icon";
import { LazyImage } from "~/components/media/LazyImage";
import type { Product } from "~/lib/products.data";

type ProductCardProduct = Pick<
  Product,
  "slug" | "name" | "mayaName" | "basePrice" | "comparePrice" | "isFeatured" | "isRentable" | "freeShipping" | "guestCapacity" | "grillSize" | "images"
> & { category: { name: string } };

interface ProductCardProps {
  product: ProductCardProduct;
  className?: string;
  index?: number;
  featured?: boolean;
}

export function ProductCard({ product, className, index = 0, featured }: ProductCardProps) {
  const primaryImage = product.images[0];
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.basePrice) / product.comparePrice) * 100)
    : null;

  return (
    <Link
      to={`/productos/${product.slug}`}
      className={cn(
        "group block bg-obsidian-900/60 backdrop-blur-sm rounded-xl overflow-hidden",
        "transition-all duration-300 hover:shadow-fire-500/10 hover:shadow-lg hover:border-obsidian-600 hover:-translate-y-1",
        featured ? "gradient-border" : "border border-obsidian-700/50",
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
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={300}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-obsidian-600">
            <Icon name="image" className="w-16 h-16" strokeWidth={1} />
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
          <p className="text-sm text-obsidian-400 italic mt-0.5">
            "{product.mayaName}"
          </p>
        )}

        {/* At-a-glance specs */}
        {(product.guestCapacity || product.grillSize) && (
          <div className="flex items-center gap-3 mt-2 text-xs text-obsidian-400">
            {product.guestCapacity && (
              <span className="flex items-center gap-1">
                <Icon name="users" className="w-3.5 h-3.5" />
                {product.guestCapacity}
              </span>
            )}
            {product.grillSize && (
              <span className="flex items-center gap-1">
                <Icon name="fire" className="w-3.5 h-3.5" />
                {product.grillSize}
              </span>
            )}
          </div>
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
              <span className="text-xs text-obsidian-400">Compra</span>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-heading font-bold text-white">
              {formatCurrency(product.basePrice)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-obsidian-400 line-through">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
