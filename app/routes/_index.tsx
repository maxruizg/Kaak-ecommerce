import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getFeaturedProducts } from "~/lib/products.data";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { Hero } from "~/components/home/Hero";
import { FeaturedProducts } from "~/components/home/FeaturedProducts";
import { BrandStory } from "~/components/home/BrandStory";
import { Benefits } from "~/components/home/Benefits";
import { Testimonials } from "~/components/home/Testimonials";
import { CTA } from "~/components/home/CTA";

export const meta: MetaFunction = () => [
  { title: "K'Á-AK — Barriles Asadores Profesionales | Fuego en Maya" },
  {
    name: "description",
    content:
      "K'Á-AK: Barriles asadores profesionales inspirados en la cultura Maya. Compra, renta o contrata nuestro servicio de Chef. La Revolución de los Asados al Carbón.",
  },
];

export async function loader() {
  const featuredProducts = getFeaturedProducts();
  return json({ featuredProducts });
}

export default function Index() {
  const { featuredProducts } = useLoaderData<typeof loader>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main>
        <Hero />
        <FeaturedProducts products={featuredProducts} />
        <BrandStory />
        <Benefits />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
