import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext, Link } from "@remix-run/react";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { MayaDivider } from "~/components/maya/MayaDivider";

export const meta: MetaFunction = () => [
  { title: "Confirmación de Pedido — K'Á-AK" },
];

export async function loader({ params }: LoaderFunctionArgs) {
  const orderNumber = params.orderId || "";
  // Stub: no DB lookup, just return the order number
  return json({ orderNumber });
}

export default function OrderConfirmation() {
  const { orderNumber } = useLoaderData<typeof loader>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="pt-20 md:pt-24 pb-16 min-h-screen">
        <PageContainer size="narrow">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-jade-400/20 text-jade-600 rounded-full mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-obsidian-400 text-lg mb-1">
              Gracias por tu compra.
            </p>
            <p className="text-sm text-obsidian-400">
              Orden: <span className="font-mono font-semibold text-fire-600">{orderNumber}</span>
            </p>
            <MayaDivider variant="accent" className="max-w-xs mx-auto mt-6" />
          </div>

          <div className="bg-obsidian-900/60 rounded-xl border border-obsidian-700/50 p-6 md:p-8 mb-6 text-center">
            <p className="text-obsidian-300">
              Te enviaremos un correo con los detalles de tu pedido. Si tienes alguna duda, contáctanos.
            </p>
          </div>

          <div className="text-center">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-fire-600 text-white font-heading font-semibold rounded-lg hover:bg-fire-700 transition-colors"
            >
              Seguir Comprando
            </Link>
          </div>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
