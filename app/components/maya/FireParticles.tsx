import { useMemo } from "react";
import { cn } from "~/lib/utils";

interface FireParticlesProps {
  children: React.ReactNode;
  className?: string;
  withGlyphs?: boolean;
  density?: number;
}

const glyphs = ["𝌆", "◆", "❖", "✦"];
const particleColors = ["bg-ember-400", "bg-fire-400", "bg-fire-500", "bg-ember-300"];

export function FireParticles({ children, className, withGlyphs, density = 12 }: FireParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 6,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
        opacity: 0.15 + Math.random() * 0.35,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      })),
    [density]
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {particles.map((p) => (
        <span
          key={p.id}
          className={cn(
            "absolute rounded-full animate-ember-float pointer-events-none",
            p.color
          )}
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
      {withGlyphs && (
        <>
          {glyphs.map((g, i) => (
            <span
              key={i}
              className="floating-glyph"
              style={{
                top: `${15 + i * 22}%`,
                left: i % 2 === 0 ? "5%" : undefined,
                right: i % 2 !== 0 ? "5%" : undefined,
                animationDelay: `${i * 1.2}s`,
                fontSize: `${2 + (i % 2)}rem`,
              }}
              aria-hidden="true"
            >
              {g}
            </span>
          ))}
        </>
      )}
      {children}
    </div>
  );
}
