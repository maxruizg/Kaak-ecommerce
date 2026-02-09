import { cn, formatCurrency } from "~/lib/utils";
import type { CartItem as CartItemType } from "~/lib/cart.server";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  onRemove: (productId: string, variantId?: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-obsidian-700 last:border-0">
      {/* Image */}
      <div className="w-20 h-20 bg-obsidian-800 rounded-lg overflow-hidden flex-shrink-0">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-obsidian-600">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-heading font-semibold text-white truncate">
            {item.name}
          </h3>
          {item.isRental && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-heading font-semibold rounded bg-ember-600/20 text-ember-400 border border-ember-600/30">
              Renta
            </span>
          )}
        </div>
        {item.variantName && (
          <p className="text-sm text-obsidian-400">{item.variantName}</p>
        )}
        <p className="text-fire-600 font-heading font-semibold mt-1">
          {formatCurrency(item.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-obsidian-600 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1, item.variantId)}
              className="px-2.5 py-1 text-obsidian-400 hover:text-obsidian-200 transition-colors"
              aria-label="Reducir cantidad"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-medium text-white min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1, item.variantId)}
              className="px-2.5 py-1 text-obsidian-400 hover:text-obsidian-200 transition-colors"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.productId, item.variantId)}
            className="text-sm text-crimson-500 hover:text-crimson-700 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right">
        <p className="font-heading font-bold text-white">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}
