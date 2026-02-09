import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getCart, getCartTotal } from "~/lib/cart.server";

import styles from "~/styles/global.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@400;500;600;700&family=Josefin+Sans:wght@300;400;500;600;700&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => {
  return [
    { title: "K'Á-AK — Barriles Asadores Profesionales" },
    {
      name: "description",
      content:
        "K'Á-AK, Fuego en Maya. Barriles asadores profesionales inspirados en la cultura Maya milenaria. La Revolución de los Asados al Carbón.",
    },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "K'Á-AK — Barriles Asadores Profesionales" },
    {
      property: "og:description",
      content: "Barriles asadores profesionales inspirados en la cultura Maya milenaria.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const cart = await getCart(request);
    const { itemCount } = getCartTotal(cart);
    return json({ cartItemCount: itemCount });
  } catch {
    return json({ cartItemCount: 0 });
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-body antialiased bg-obsidian-950 text-obsidian-100">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { cartItemCount } = useLoaderData<typeof loader>();
  return <Outlet context={{ cartItemCount }} />;
}

export function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-fire-600 mb-4">
          Oops!
        </h1>
        <p className="text-obsidian-600 mb-6">
          Lo sentimos, ha ocurrido un error inesperado.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-fire-600 text-white font-heading font-semibold rounded-lg hover:bg-fire-700 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
