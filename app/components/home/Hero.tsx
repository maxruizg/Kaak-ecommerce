import { useMemo } from "react";
import { Link } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";

function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 1 + Math.random() * 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
    opacity: 0.2 + Math.random() * 0.4,
    color: ["bg-ember-400", "bg-fire-400", "bg-fire-500", "bg-ember-300"][
      Math.floor(Math.random() * 4)
    ],
  }));
}

export function Hero() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const particles = useMemo(() => generateParticles(14), []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-950 grain-overlay"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-fire-950 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-fire-900)_0%,_transparent_60%)] opacity-40" />

      {/* Maya decorative corners */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 w-10 h-10 md:w-16 md:h-16 border-t-2 border-l-2 border-fire-500/30" />
      <div className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-16 md:h-16 border-t-2 border-r-2 border-fire-500/30" />
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 w-10 h-10 md:w-16 md:h-16 border-b-2 border-l-2 border-fire-500/30" />
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-16 md:h-16 border-b-2 border-r-2 border-fire-500/30" />

      {/* Ember particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={cn("absolute rounded-full animate-ember-float pointer-events-none", p.color)}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <div
        className={cn(
          "relative z-10 text-center px-4 max-w-4xl mx-auto bg-letter",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        data-letter="K"
      >
        {/* Maya fire glyph (K'AWIIL inspired) */}
        <div
          className={cn(
            "mb-6",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <svg
            className="inline-block w-16 h-16 md:w-20 md:h-20 text-fire-500/25"
            viewBox="0 0 64 64"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M32 4L36 16L48 8L40 20L52 24L40 28L48 40L36 32L32 48L28 32L16 40L24 28L12 24L24 20L16 8L28 16Z" />
            <circle cx="32" cy="26" r="6" fill="currentColor" opacity="0.5" />
          </svg>
        </div>

        {/* Brand Name */}
        <h1
          className={cn(
            "font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gradient-fire text-weathered tracking-wider mb-4",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          K'Á-AK
        </h1>

        {/* Tagline */}
        <p
          className={cn(
            "font-heading text-xl sm:text-2xl md:text-3xl text-ember-400 font-light tracking-[0.2em] mb-2",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          Fuego en Maya
        </p>

        {/* Maya divider line */}
        <div
          className={cn(
            "mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-fire-500 to-transparent my-6",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        />

        {/* Slogan */}
        <p
          className={cn(
            "font-heading text-sm sm:text-base md:text-lg text-obsidian-300 uppercase tracking-[0.3em] mb-10",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
          style={{ animationDelay: "1s", animationFillMode: "both" }}
        >
          Forjados en Fuego
        </p>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
          style={{ animationDelay: "1.2s", animationFillMode: "both" }}
        >
          <Link
            to="/productos"
            className="glow-trail-cta inline-flex items-center px-8 py-4 bg-fire-600 text-white font-heading font-semibold text-lg rounded-lg hover:bg-fire-700 transition-all duration-300 shadow-lg hover:shadow-fire-500/25"
          >
            Ver Productos
          </Link>
          <Link
            to="/productos"
            className="glow-trail-cta inline-flex items-center px-8 py-4 border-2 border-ember-500 text-ember-400 font-heading font-semibold text-lg rounded-lg hover:bg-ember-500/10 transition-all duration-300"
          >
            Rentar un Barril
          </Link>
        </div>

        {/* Scroll indicator with bounce */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-bounce">
          <svg className="w-6 h-6 text-obsidian-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
