import { Link } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";

export function Hero() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-obsidian-950"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-fire-950 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-fire-900)_0%,_transparent_60%)] opacity-40" />

      {/* Maya decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-fire-500/30 hidden md:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-fire-500/30 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-fire-500/30 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-fire-500/30 hidden md:block" />

      {/* Ember particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-ember-400 rounded-full animate-ember-float opacity-40" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-fire-400 rounded-full animate-ember-float opacity-30" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-ember-300 rounded-full animate-ember-float opacity-50" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 text-center px-4 max-w-4xl mx-auto",
          isVisible ? "animate-fade-in-up" : "opacity-0"
        )}
      >
        {/* Maya glyph accent */}
        <div className="mb-6">
          <span className="inline-block text-fire-500/20 text-6xl md:text-8xl font-display select-none" aria-hidden="true">
            ◆
          </span>
        </div>

        {/* Brand Name */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider mb-4">
          K'Á-AK
        </h1>

        {/* Tagline */}
        <p className="font-heading text-xl sm:text-2xl md:text-3xl text-ember-400 font-light tracking-[0.2em] mb-2">
          Fuego en Maya
        </p>

        {/* Maya divider line */}
        <div className="mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-fire-500 to-transparent my-6" />

        {/* Slogan */}
        <p className="font-heading text-sm sm:text-base md:text-lg text-obsidian-300 uppercase tracking-[0.3em] mb-10">
          La Revolución de los Asados al Carbón
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/productos"
            className="inline-flex items-center px-8 py-4 bg-fire-600 text-white font-heading font-semibold text-lg rounded-lg hover:bg-fire-700 transition-all duration-300 shadow-lg hover:shadow-fire-500/25 animate-fire-glow"
          >
            Ver Productos
          </Link>
          <Link
            to="/productos"
            className="inline-flex items-center px-8 py-4 border-2 border-ember-500 text-ember-400 font-heading font-semibold text-lg rounded-lg hover:bg-ember-500/10 transition-all duration-300"
          >
            Rentar un Barril
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-slow">
          <svg className="w-6 h-6 text-obsidian-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
