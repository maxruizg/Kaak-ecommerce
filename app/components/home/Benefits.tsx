import { useScrollAnimation, useStaggeredAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { PageContainer } from "~/components/layout/PageContainer";
import { MayaDivider } from "~/components/maya/MayaDivider";

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    ),
    title: "Cocción Perfecta",
    description: "Control total de temperatura con nuestro sistema de ventilación patentado. Resultados profesionales en cada asado.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1 3.01 1.36-5.69L2.3 8.18l5.82-.5L11.42 2.5l3.3 5.18 5.82.5-4.38 4.31 1.36 5.69-5.1-3.01z" />
      </svg>
    ),
    title: "Calidad Premium",
    description: "Acero al carbón calibre 10 con pintura horneada de alta temperatura. Construido para durar generaciones.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Para Todo Evento",
    description: "Desde reuniones íntimas de 8 personas hasta grandes fiestas de 80. Tenemos el barril perfecto para ti.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Envío Gratis",
    description: "Envío gratuito en todos nuestros barriles a cualquier parte de México. Tu barril llega directo a tu puerta.",
  },
];

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation();
  const { setRef, visibleStates } = useStaggeredAnimation(benefits.length, { rootMargin: "50px" });

  return (
    <section className="py-20 md:py-28 bg-obsidian-900 relative">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={setRef(index)}
              className={cn(
                "text-center p-6 rounded-xl transition-all duration-500",
                visibleStates[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-fire-900/30 text-fire-400 border border-fire-800/40 rounded-xl mb-5">
                {benefit.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-obsidian-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
