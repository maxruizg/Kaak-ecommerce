import { useScrollAnimation, useStaggeredAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { PageContainer } from "~/components/layout/PageContainer";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { Icon, type IconName } from "~/components/ui/Icon";

const benefits: {
  icon: IconName;
  title: string;
  description: string;
  accent: string;
}[] = [
  {
    icon: "fire",
    title: "Cocción Perfecta",
    description: "Control total de temperatura",
    accent: "bg-fire-900/30 text-fire-400 border-fire-800/40",
  },
  {
    icon: "star",
    title: "Calidad Premium",
    description: "Acero calibre 10, hecho para durar",
    accent: "bg-cenote-800/30 text-cenote-400 border-cenote-700/40",
  },
  {
    icon: "people",
    title: "Para Todo Evento",
    description: "De 8 a 80 personas",
    accent: "bg-cochineal-800/30 text-cochineal-400 border-cochineal-700/40",
  },
  {
    icon: "truck",
    title: "Envío Gratis",
    description: "A todo México, puerta a puerta",
    accent: "bg-terracotta-800/30 text-terracotta-400 border-terracotta-700/40",
  },
];

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation();
  const { setRef, visibleStates } = useStaggeredAnimation(benefits.length, { rootMargin: "50px" });

  return (
    <section id="beneficios" className="py-24 md:py-36 bg-obsidian-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-fire-900)_0%,_transparent_50%)] opacity-15 pointer-events-none" />
      <PageContainer>
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-fire-500 mb-3">
            ¿Por qué K'Á-AK?
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            La Diferencia del Fuego
          </h2>
          <MayaDivider variant="accent" className="max-w-xs mx-auto" />
        </div>

        <div className="bento-grid">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={setRef(index)}
              className={cn(
                "p-6 lg:p-8 rounded-xl bg-obsidian-800/40 border border-obsidian-700/30 transition-all duration-500",
                index === 0 ? "flex flex-col items-center justify-center text-center" : "text-center",
                visibleStates[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "inline-flex items-center justify-center w-16 h-16 border rounded-xl mb-5",
                benefit.accent
              )}>
                <Icon name={benefit.icon} className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-obsidian-400 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
