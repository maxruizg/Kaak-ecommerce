import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getFeaturedProducts } from "~/lib/products.data";
import { useScrollProgress } from "~/hooks/useScrollProgress";
import { cn } from "~/lib/utils";
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

const homeSections = [
  { id: "hero", label: "Inicio" },
  { id: "productos-destacados", label: "Productos" },
  { id: "historia", label: "Historia" },
  { id: "beneficios", label: "Beneficios" },
  { id: "testimonios", label: "Testimonios" },
  { id: "cta", label: "Contacto" },
];

export async function loader() {
  const featuredProducts = getFeaturedProducts();
  return json({ featuredProducts });
}

export default function Index() {
  const { featuredProducts } = useLoaderData<typeof loader>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();
  const { activeSection } = useScrollProgress(homeSections);

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main id="main-content">
        <Hero />
        <FeaturedProducts products={featuredProducts} />
        <BrandStory />
        <Benefits />
        <Testimonials />
        <CTA />
      </main>
      <Footer />

      {/* Scroll progress bar — desktop only */}
      <div className="scroll-progress-bar hidden md:block" aria-hidden="true" />

      {/* Section dot navigation — desktop only */}
      <nav className="section-dots hidden md:flex" aria-label="Secciones de la página">
        {homeSections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn("section-dot", i === activeSection && "active")}
            aria-label={s.label}
            title={s.label}
          />
        ))}
      </nav>
    </>
  );
}
