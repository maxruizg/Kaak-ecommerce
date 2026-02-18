import type { LoaderFunction } from "@remix-run/node";
import { getAllProducts } from "~/lib/products.data";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const products = getAllProducts();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>${baseUrl}/productos</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>${baseUrl}/eventos</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>${baseUrl}/nosotros</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
  <url><loc>${baseUrl}/contacto</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
  ${products.map((p) => `<url><loc>${baseUrl}/productos/${p.slug}</loc><priority>0.7</priority><changefreq>weekly</changefreq></url>`).join("\n  ")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
