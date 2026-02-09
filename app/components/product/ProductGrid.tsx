import { ProductCard } from "./ProductCard";

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

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-obsidian-500 text-lg">No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.slug} product={product} index={index} />
      ))}
    </div>
  );
}
