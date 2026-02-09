import { Link } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { FireParticles } from "~/components/maya/FireParticles";

export function CTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-obsidian-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-fire-900)_0%,_transparent_60%)] opacity-30" />

      <FireParticles>
        <div
          ref={ref}
          className={cn(
            "relative z-10 text-center px-4 max-w-3xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para la Revolución?
          </h2>
          <p className="text-lg text-obsidian-300 mb-10 leading-relaxed">
            Únete a la revolución del asado al carbón. Compra tu barril, renta para tu
            próximo evento, o contrata nuestro servicio de Chef profesional.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/productos"
              className="inline-flex items-center px-8 py-4 bg-fire-600 text-white font-heading font-semibold text-lg rounded-lg hover:bg-fire-700 transition-all duration-300 shadow-lg hover:shadow-fire-500/25"
            >
              Comprar Ahora
            </Link>
            <Link
              to="/eventos"
              className="inline-flex items-center px-8 py-4 border-2 border-ember-500 text-ember-400 font-heading font-semibold text-lg rounded-lg hover:bg-ember-500/10 transition-all duration-300"
            >
              Servicio de Chef
            </Link>
          </div>

          {/* WhatsApp */}
          <p className="mt-10 text-obsidian-500 text-sm">
            ¿Dudas? Escríbenos por{" "}
            <a
              href="https://wa.me/5219991234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-jade-500 hover:text-jade-400 font-medium transition-colors"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </FireParticles>
    </section>
  );
}
