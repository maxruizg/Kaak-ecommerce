import { useState } from "react";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import { cn, formatCurrency } from "~/lib/utils";

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    basePrice: number;
    comparePrice?: number | null;
    isRentable: boolean;
  };
  primaryImageUrl: string;
  isSubmitting: boolean;
  currentIntent?: string;
}

export function ProductActions({
  product,
  primaryImageUrl,
  isSubmitting,
  currentIntent,
}: ProductActionsProps) {
  const [tab, setTab] = useState<"buy" | "rent">("rent");

  if (!product.isRentable) {
    return (
      <Form method="post">
        <input type="hidden" name="intent" value="addToCart" />
        <input type="hidden" name="productId" value={product.id} />
        <input type="hidden" name="productName" value={product.name} />
        <input type="hidden" name="price" value={product.basePrice} />
        <input type="hidden" name="image" value={primaryImageUrl} />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={isSubmitting && currentIntent === "addToCart"}
        >
          Agregar al Carrito
        </Button>
      </Form>
    );
  }

  return (
    <div>
      {/* Price — reacts to tab */}
      <div className="mb-6">
        {tab === "rent" ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-heading font-bold text-ember-400">
                {formatCurrency(product.basePrice * 0.3)}
              </span>
              <span className="text-sm font-heading text-ember-400/80">
                Renta por evento
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-heading font-semibold text-obsidian-300">
                {formatCurrency(product.basePrice)}
              </span>
              <span className="text-sm text-obsidian-500">Compra</span>
              {product.comparePrice && (
                <span className="text-sm text-obsidian-500 line-through">
                  {formatCurrency(product.comparePrice)}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-heading font-bold text-white">
                {formatCurrency(product.basePrice)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-obsidian-400 line-through">
                  {formatCurrency(product.comparePrice)}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-heading font-semibold text-obsidian-400">
                {formatCurrency(product.basePrice * 0.3)}
              </span>
              <span className="text-sm text-obsidian-500">Renta</span>
            </div>
          </>
        )}
      </div>

      {/* Tab toggle */}
      <div className="flex rounded-lg border border-obsidian-700 p-1 mb-6">
        <button
          type="button"
          onClick={() => setTab("rent")}
          className={cn(
            "flex-1 py-2.5 text-sm font-heading font-semibold rounded-md transition-colors",
            tab === "rent"
              ? "bg-ember-600 text-white"
              : "text-obsidian-400 hover:text-white"
          )}
        >
          Rentar
        </button>
        <button
          type="button"
          onClick={() => setTab("buy")}
          className={cn(
            "flex-1 py-2.5 text-sm font-heading font-semibold rounded-md transition-colors",
            tab === "buy"
              ? "bg-fire-600 text-white"
              : "text-obsidian-400 hover:text-white"
          )}
        >
          Comprar
        </button>
      </div>

      {/* Buy tab */}
      {tab === "buy" && (
        <Form method="post">
          <input type="hidden" name="intent" value="addToCart" />
          <input type="hidden" name="productId" value={product.id} />
          <input type="hidden" name="productName" value={product.name} />
          <input type="hidden" name="price" value={product.basePrice} />
          <input type="hidden" name="image" value={primaryImageUrl} />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isSubmitting && currentIntent === "addToCart"}
          >
            Agregar al Carrito
          </Button>
        </Form>
      )}

      {/* Rent tab */}
      {tab === "rent" && (
        <Form method="post">
          <input type="hidden" name="intent" value="addToRental" />
          <input type="hidden" name="productId" value={product.id} />
          <input type="hidden" name="productName" value={product.name} />
          <input type="hidden" name="price" value={product.basePrice} />
          <input type="hidden" name="image" value={primaryImageUrl} />
          <input type="hidden" name="isRental" value="true" />
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="w-full"
            isLoading={isSubmitting && currentIntent === "addToRental"}
          >
            Agregar Renta al Carrito
          </Button>
        </Form>
      )}
    </div>
  );
}
