import { Link } from "@remix-run/react";
import { formatCurrency } from "~/lib/utils";
import { Button } from "~/components/ui/Button";

interface CartSummaryProps {
  subtotal: number;
  shippingCost?: number;
  discount?: number;
  showCheckoutButton?: boolean;
}

export function CartSummary({
  subtotal,
  shippingCost = 0,
  discount = 0,
  showCheckoutButton = true,
}: CartSummaryProps) {
  const total = subtotal + shippingCost - discount;

  return (
    <div className="bg-obsidian-900/60 rounded-xl p-6 border border-obsidian-700/50">
      <h3 className="font-heading font-semibold text-lg text-white mb-4">
        Resumen del Pedido
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-obsidian-400">Subtotal</span>
          <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-obsidian-400">Envío</span>
          <span className="text-white font-medium">
            {shippingCost === 0 ? (
              <span className="text-jade-600">Gratis</span>
            ) : (
              formatCurrency(shippingCost)
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-jade-600">Descuento</span>
            <span className="text-jade-600 font-medium">-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="border-t border-obsidian-700 pt-3">
          <div className="flex justify-between">
            <span className="font-heading font-semibold text-white">Total</span>
            <span className="font-heading font-bold text-xl text-white">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <Link to="/checkout" className="block mt-6">
          <Button className="w-full" size="lg">
            Proceder al Pago
          </Button>
        </Link>
      )}
    </div>
  );
}
