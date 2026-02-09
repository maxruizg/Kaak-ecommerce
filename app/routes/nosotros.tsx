import type { MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { GlyphAccent } from "~/components/maya/GlyphAccent";

export const meta: MetaFunction = () => [
  { title: "Nosotros — K'Á-AK | Fuego en Maya" },
  { name: "description", content: "Conoce la historia de K'Á-AK, la marca mexicana de barriles asadores inspirada en K'AWIIL, el dios Maya del fuego. Fundada por el Chef Marco HG." },
];

export default function Nosotros() {
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();
  const { ref: section1Ref, isVisible: section1Visible } = useScrollAnimation();
  const { ref: section2Ref, isVisible: section2Visible } = useScrollAnimation();
  const { ref: section3Ref, isVisible: section3Visible } = useScrollAnimation();

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="pt-20 md:pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-obsidian-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-fire-900)_0%,_transparent_50%)] opacity-30" />
          <PageContainer size="narrow">
            <div className="text-center relative z-10">
              <p className="font-heading text-sm uppercase tracking-[0.3em] text-ember-400 mb-3">
                Nuestra Historia
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                K'Á-AK
              </h1>
              <p className="font-heading text-xl text-ember-300 mb-2">
                Fuego en Maya
              </p>
              <MayaDivider variant="accent" className="max-w-xs mx-auto my-8" />
              <p className="text-obsidian-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Somos una empresa mexicana que fusiona la tradición culinaria
                del asado al carbón con la sabiduría y estética de la civilización Maya.
              </p>
            </div>
          </PageContainer>
        </section>

        {/* K'AWIIL Section */}
        <section className="py-20 md:py-28 bg-obsidian-950 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-fire-900)_0%,_transparent_50%)] opacity-10 pointer-events-none" />
          <PageContainer size="narrow">
            <GlyphAccent>
              <div
                ref={section1Ref}
                className={cn(
                  "transition-all duration-700",
                  section1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                  K'AWIIL — Dios del Fuego
                </h2>
                <MayaDivider variant="accent" className="max-w-xs mx-auto mb-8" />
                <div className="prose prose-lg mx-auto text-obsidian-300 space-y-4">
                  <p>
                    En la cosmogonía Maya, K'AWIIL es el dios del fuego, los relámpagos
                    y la abundancia. Representado con una pierna en forma de serpiente de
                    fuego, K'AWIIL simboliza la transformación y el poder creativo del
                    fuego.
                  </p>
                  <p>
                    Los antiguos Mayas comprendían que el fuego no solo cocina los
                    alimentos: los transforma, les da vida y los eleva. Esta sabiduría
                    ancestral es el corazón de K'Á-AK.
                  </p>
                  <p>
                    Cada barril asador que creamos lleva dentro la esencia de K'AWIIL: la
                    capacidad de transformar lo ordinario en extraordinario a través del
                    poder del fuego.
                  </p>
                </div>
              </div>
            </GlyphAccent>
          </PageContainer>
        </section>

        {/* Chef Marco Section */}
        <section className="py-20 md:py-28 bg-obsidian-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-fire-900)_0%,_transparent_50%)] opacity-10 pointer-events-none" />
          <PageContainer size="narrow">
            <div
              ref={section2Ref}
              className={cn(
                "transition-all duration-700",
                section2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                Chef Marco HG
              </h2>
              <MayaDivider variant="accent" className="max-w-xs mx-auto mb-8" />
              <div className="text-obsidian-300 space-y-4 text-lg leading-relaxed">
                <p>
                  Con más de 15 años de experiencia en la gastronomía mexicana, el Chef
                  Marco HG ha dedicado su carrera a perfeccionar el arte del asado al
                  carbón. Su pasión por la cocina al fuego lo llevó a diseñar los
                  barriles asadores K'Á-AK.
                </p>
                <p>
                  Inspirado por sus raíces yucatecas y la rica tradición culinaria Maya,
                  el Chef Marco creó una línea de barriles que no solo son herramientas de
                  cocción: son instrumentos de transformación culinaria.
                </p>
                <p>
                  Hoy, además de diseñar y producir los barriles, el Chef Marco ofrece
                  su servicio profesional de asador para eventos privados, llevando la
                  experiencia completa de K'Á-AK a hogares y celebraciones.
                </p>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Mission/Vision/Values */}
        <section className="py-20 md:py-28 bg-obsidian-950">
          <PageContainer>
            <div
              ref={section3Ref}
              className={cn(
                "transition-all duration-700",
                section3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-xl bg-obsidian-900/40 border border-obsidian-700/50">
                  <h3 className="font-display text-xl font-bold text-white mb-4">
                    Misión
                  </h3>
                  <p className="text-obsidian-400">
                    Revolucionar la cultura del asado al carbón en México, ofreciendo
                    barriles asadores de calidad profesional que honren la tradición Maya
                    del fuego.
                  </p>
                </div>
                <div className="text-center p-8 rounded-xl bg-obsidian-900/40 border border-obsidian-700/50">
                  <h3 className="font-display text-xl font-bold text-white mb-4">
                    Visión
                  </h3>
                  <p className="text-obsidian-400">
                    Ser la marca líder de barriles asadores en México y Latinoamérica,
                    reconocida por nuestra calidad, innovación e identidad cultural Maya.
                  </p>
                </div>
                <div className="text-center p-8 rounded-xl bg-obsidian-900/40 border border-obsidian-700/50">
                  <h3 className="font-display text-xl font-bold text-white mb-4">
                    Valores
                  </h3>
                  <p className="text-obsidian-400">
                    Calidad artesanal, respeto por nuestras raíces culturales, innovación
                    constante, servicio excepcional y pasión por el fuego.
                  </p>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}
