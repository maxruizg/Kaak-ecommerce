import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { cn } from "~/lib/utils";
import { PageContainer } from "~/components/layout/PageContainer";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { Icon } from "~/components/ui/Icon";

const testimonials = [
  {
    name: "Roberto Martínez",
    role: "Parrillero Profesional",
    text: "El Jaguar es una bestia. Eventos de 70 personas, resultado impecable siempre.",
    rating: 5,
  },
  {
    name: "Ana García",
    role: "Amante del Asado",
    text: "El Colibrí cambió mis domingos. Compacto pero potente — lo mejor para mi terraza.",
    rating: 5,
  },
  {
    name: "Carlos Hernández",
    role: "Restaurantero",
    text: "Rentamos el Águila para el aniversario. Servicio excepcional, ya pedimos el nuestro.",
    rating: 5,
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonios" className="py-24 md:py-36 bg-obsidian-950 glyph-accent">
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

        <div className="overlap-cards">
          {testimonials.map((t, index) => (
            <figure
              key={index}
              className="bg-obsidian-900/60 backdrop-blur-sm rounded-xl p-8 border border-obsidian-700/50 maya-corner w-full md:max-w-sm"
            >
              {/* Stars */}
              <div
                className="flex gap-1 mb-4"
                role="img"
                aria-label={`Calificación: ${t.rating} de 5 estrellas`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Icon
                    key={i}
                    name="starFilled"
                    className="w-5 h-5 text-ember-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote>
                <p className="text-obsidian-300 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
              </blockquote>

              {/* Author */}
              <figcaption>
                <p className="font-heading font-semibold text-white">
                  {t.name}
                </p>
                <p className="text-sm text-obsidian-400">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
