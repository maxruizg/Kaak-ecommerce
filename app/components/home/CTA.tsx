import { Link } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { FireParticles } from "~/components/maya/FireParticles";

export function CTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="cta" className="py-24 md:py-36 bg-obsidian-950 relative overflow-hidden cta-gradient-overlay grain-overlay">
      <FireParticles withGlyphs>
        <div
          ref={ref}
          className={cn(
            "relative z-10 text-center px-4 max-w-3xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-10">
            ¿Listo para la Revolución?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/productos"
              className="glow-trail-cta inline-flex items-center px-8 py-4 bg-fire-600 text-white font-heading font-semibold text-lg rounded-lg hover:bg-fire-700 transition-all duration-300 shadow-lg hover:shadow-fire-500/25"
            >
              Comprar Ahora
            </Link>
            <Link
              to="/eventos"
              className="glow-trail-cta inline-flex items-center px-8 py-4 border-2 border-ember-500 text-ember-400 font-heading font-semibold text-lg rounded-lg hover:bg-ember-500/10 transition-all duration-300"
            >
              Servicio de Chef
            </Link>
          </div>
        </div>
      </FireParticles>
    </section>
  );
}
