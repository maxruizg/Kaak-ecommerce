import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { PageContainer } from "~/components/layout/PageContainer";
import { GlyphAccent } from "~/components/maya/GlyphAccent";

export function BrandStory() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-obsidian-900 text-white relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--color-fire-900)_0%,_transparent_50%)] opacity-20" />

      <PageContainer size="narrow">
        <GlyphAccent>
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
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              K'AWIIL
            </h2>
            <p className="font-heading text-lg text-ember-300 mb-2">
              Dios Maya del Fuego
            </p>
            <MayaDivider variant="accent" className="max-w-xs mx-auto my-8" />

            <div className="space-y-6 text-obsidian-300 text-lg leading-relaxed max-w-3xl mx-auto">
              <p>
                K'Á-AK nace de la fusión entre la tradición culinaria mexicana y la
                sabiduría ancestral Maya. Nuestro nombre, que significa{" "}
                <span className="text-fire-400 font-semibold">"Fuego"</span> en lengua
                Maya, honra a K'AWIIL, el dios del fuego, los relámpagos y la
                transformación.
              </p>
              <p>
                Fundada por el Chef Marco HG, K'Á-AK revoluciona el arte del asado al
                carbón con barriles asadores diseñados para alcanzar la perfección en
                cada corte. Cada pieza es una obra de ingeniería inspirada en la
                cosmogonía Maya.
              </p>
              <p>
                Así como el fuego transformó la civilización Maya, nuestros barriles
                transforman cada evento en una experiencia{" "}
                <span className="text-ember-400 font-semibold">inolvidable</span>.
              </p>
            </div>
          </div>
        </GlyphAccent>
      </PageContainer>
    </section>
  );
}
