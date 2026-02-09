import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { PageContainer } from "~/components/layout/PageContainer";
import { MayaDivider } from "~/components/maya/MayaDivider";

const testimonials = [
  {
    name: "Roberto Martínez",
    role: "Parrillero Profesional",
    text: "El Jaguar es una bestia. He cocinado para eventos de 70 personas y el resultado siempre es impecable. La mejor inversión que he hecho.",
    rating: 5,
  },
  {
    name: "Ana García",
    role: "Amante del Asado",
    text: "Compré el Colibrí para mi terraza y no puedo estar más feliz. Es compacto pero potente. Mis domingos de asado cambiaron por completo.",
    rating: 5,
  },
  {
    name: "Carlos Hernández",
    role: "Restaurantero",
    text: "Rentamos el Águila para el aniversario del restaurante. El servicio del Chef Marco fue excepcional. Ya pedimos nuestro propio barril.",
    rating: 5,
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-obsidian-950 glyph-accent">
      <PageContainer>
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-fire-500 mb-3">
            Testimonios
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <MayaDivider variant="accent" className="max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-obsidian-900/60 backdrop-blur-sm rounded-xl p-8 border border-obsidian-700/50 maya-corner"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-ember-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-obsidian-300 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-heading font-semibold text-white">
                  {t.name}
                </p>
                <p className="text-sm text-obsidian-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
