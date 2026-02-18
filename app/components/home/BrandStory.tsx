import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { PageContainer } from "~/components/layout/PageContainer";

export function BrandStory() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="historia" className="py-24 md:py-36 bg-obsidian-900 text-white relative overflow-hidden texture-paper">
      <PageContainer size="narrow">
        <div
          ref={ref}
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-ember-400 mb-3">
            Nuestra Historia
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-reveal">
            K'AWIIL
          </h2>
          <p className="font-heading text-lg text-ember-300 mb-2">
            Dios Maya del Fuego
          </p>
          <MayaDivider variant="accent" className="max-w-xs mx-auto my-8" />

          <p className="text-obsidian-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            K'Á-AK nace de la fusión entre la tradición culinaria mexicana y la sabiduría ancestral Maya, honrando a K'AWIIL — dios del fuego, los relámpagos y la transformación.
          </p>

          <blockquote className="relative max-w-xl mx-auto">
            <span className="absolute -top-6 -left-4 text-6xl text-fire-500/20 font-display select-none" aria-hidden="true">"</span>
            <p className="font-display text-2xl md:text-3xl text-fire-400 italic leading-snug">
              El fuego transforma. Nosotros también.
            </p>
          </blockquote>
        </div>
      </PageContainer>
    </section>
  );
}
