import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext, Link } from "@remix-run/react";
import { getCart, getCartTotal } from "~/lib/cart.server";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { CartItem } from "~/components/cart/CartItem";
import { CartSummary } from "~/components/cart/CartSummary";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { useCart } from "~/hooks/useCart";

export const meta: MetaFunction = () => [
  { title: "Carrito — K'Á-AK" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const cart = await getCart(request);
  const { subtotal, itemCount } = getCartTotal(cart);
  const hasRentalItems = cart.items.some((i) => i.isRental);
  return json({ cart, subtotal, itemCount, hasRentalItems });
}

export default function Carrito() {
  const { cart, subtotal, itemCount } = useLoaderData<typeof loader>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();
  const { updateItem, removeItem } = useCart();

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="pt-20 md:pt-24 pb-16 min-h-screen">
        <PageContainer>
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Tu Carrito
            </h1>
            <MayaDivider variant="accent" className="max-w-xs mx-auto" />
          </div>

          {cart.items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="mx-auto w-16 h-16 text-obsidian-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-obsidian-400 text-lg mb-4">Tu carrito está vacío</p>
              <Link
                to="/productos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-fire-600 text-white font-heading font-semibold rounded-lg hover:bg-fire-700 transition-colors"
              >
                Ver Productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {cart.items.map((item) => (
                  <CartItem
                    key={`${item.productId}-${item.variantId || ""}`}
                    item={item}
                    onUpdateQuantity={updateItem}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              <div>
                <CartSummary subtotal={subtotal} />
              </div>
            </div>
          )}
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
