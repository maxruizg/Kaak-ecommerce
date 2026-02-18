import type { MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { Card } from "~/components/ui/Card";
import { FireParticles } from "~/components/maya/FireParticles";
import { Icon } from "~/components/ui/Icon";

export const meta: MetaFunction = () => [
  { title: "Contacto — K'Á-AK | Escríbenos por WhatsApp" },
  {
    name: "description",
    content:
      "Contáctanos por WhatsApp para comprar, rentar barriles asadores o contratar nuestro servicio de Chef para eventos. Respuesta inmediata.",
  },
];

const WHATSAPP_NUMBER = "521234567890";

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const contactReasons = [
  {
    title: "Quiero Comprar un Barril",
    description: "Adquiere tu barril asador profesional K'Á-AK.",
    message:
      "Hola K'Á-AK, me interesa comprar un barril asador. ¿Podrían darme información sobre modelos y precios?",
    icon: (
      <Icon name="fire" className="w-7 h-7" />
    ),
    accent: "fire",
  },
  {
    title: "Rentar para Evento",
    description: "Barril asador listo para tu celebración.",
    message:
      "Hola K'Á-AK, me interesa rentar un barril asador para un evento. ¿Cuáles son las opciones disponibles?",
    icon: (
      <Icon name="sparkle" className="w-7 h-7" />
    ),
    accent: "ember",
  },
  {
    title: "Servicio de Chef",
    description: "Chef Marco HG directo a tu evento privado.",
    message:
      "Hola K'Á-AK, me interesa el servicio de Chef para un evento. ¿Podrían darme más detalles sobre paquetes y disponibilidad?",
    icon: (
      <Icon name="people" className="w-7 h-7" />
    ),
    accent: "cenote",
  },
  {
    title: "Otra Consulta",
    description: "Dudas, sugerencias o cualquier otra pregunta.",
    message:
      "Hola K'Á-AK, tengo una consulta sobre sus productos y servicios.",
    icon: (
      <Icon name="star" className="w-7 h-7" />
    ),
    accent: "cochineal",
  },
] as const;

const accentStyles = {
  fire: {
    iconBg: "bg-fire-900/30 text-fire-400 border-fire-800/40",
    hoverBorder: "hover:border-fire-600/60",
    hoverShadow: "hover:shadow-fire-500/15",
    arrow: "text-fire-400",
  },
  ember: {
    iconBg: "bg-ember-900/30 text-ember-400 border-ember-800/40",
    hoverBorder: "hover:border-ember-600/60",
    hoverShadow: "hover:shadow-ember-500/15",
    arrow: "text-ember-400",
  },
  cenote: {
    iconBg: "bg-cenote-900/30 text-cenote-400 border-cenote-800/40",
    hoverBorder: "hover:border-cenote-600/60",
    hoverShadow: "hover:shadow-cenote-500/15",
    arrow: "text-cenote-400",
  },
  cochineal: {
    iconBg: "bg-cochineal-800/30 text-cochineal-400 border-cochineal-800/40",
    hoverBorder: "hover:border-cochineal-600/60",
    hoverShadow: "hover:shadow-cochineal-500/15",
    arrow: "text-cochineal-400",
  },
} as const;

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contacto() {
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main id="main-content" className="pt-20 md:pt-24">
        {/* ============================================
            Hero Section — WhatsApp CTA
            ============================================ */}
        <FireParticles density={16} withGlyphs>
          <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-fire-900)_0%,_transparent_60%)] opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-cenote-900)_0%,_transparent_50%)] opacity-10 pointer-events-none" />

            <PageContainer size="narrow">
              <div className="relative z-10 text-center">
                <p className="font-heading text-sm uppercase tracking-[0.3em] text-fire-500 mb-3 animate-fade-in">
                  Contacto
                </p>
                <h1
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up"
                  style={{ animationDelay: "0.15s", animationFillMode: "both" }}
                >
                  Hablemos
                </h1>
                <MayaDivider variant="accent" className="max-w-xs mx-auto mb-6" />
                <p
                  className="text-obsidian-300 text-lg md:text-xl max-w-xl mx-auto mb-10 animate-fade-in-up"
                  style={{ animationDelay: "0.3s", animationFillMode: "both" }}
                >
                  Respuesta directa y personal. Escríbenos por WhatsApp y
                  te atenderemos de inmediato.
                </p>

                {/* Primary WhatsApp CTA */}
                <div
                  className="animate-fade-in-up"
                  style={{ animationDelay: "0.45s", animationFillMode: "both" }}
                >
                  <a
                    href={whatsappLink("Hola K'Á-AK, me gustaría obtener más información.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-trail-cta inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-heading font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="w-7 h-7" />
                    Escríbenos por WhatsApp
                  </a>
                </div>

                <p
                  className="mt-4 text-obsidian-500 text-sm animate-fade-in"
                  style={{ animationDelay: "0.6s", animationFillMode: "both" }}
                >
                  Respondemos en menos de 2 horas durante horario laboral
                </p>
              </div>
            </PageContainer>
          </section>
        </FireParticles>

        {/* ============================================
            Quick Contact Reason Cards
            ============================================ */}
        <section className="py-16 md:py-24 dark-section-alt relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-fire-900)_0%,_transparent_50%)] opacity-10 pointer-events-none" />
          <PageContainer>
            <div className="text-center mb-12 relative z-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                ¿En qué podemos ayudarte?
              </h2>
              <p className="text-obsidian-400 max-w-lg mx-auto">
                Selecciona el motivo de tu mensaje y te contactaremos con la
                información que necesitas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
              {contactReasons.map((reason) => {
                const style = accentStyles[reason.accent];
                return (
                  <a
                    key={reason.title}
                    href={whatsappLink(reason.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block bg-obsidian-900/60 backdrop-blur-sm rounded-xl border border-obsidian-700/50 p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${style.hoverBorder} ${style.hoverShadow}`}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl border mb-4 transition-transform duration-300 group-hover:scale-110 ${style.iconBg}`}
                    >
                      {reason.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-white text-lg mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-obsidian-400 text-sm mb-4 leading-relaxed">
                      {reason.description}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 text-sm font-heading font-medium ${style.arrow} transition-transform duration-300 group-hover:translate-x-1`}
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      Enviar mensaje
                      <Icon name="arrowRight" className="w-4 h-4" />
                    </span>
                  </a>
                );
              })}
            </div>
          </PageContainer>
        </section>

        {/* ============================================
            Contact Info Strip + Business Hours
            ============================================ */}
        <section className="py-16 md:py-20 bg-obsidian-950">
          <PageContainer>
            <MayaDivider variant="default" className="mb-12" />

            {/* Contact info — horizontal strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
              {/* WhatsApp */}
              <a
                href={whatsappLink("Hola K'Á-AK, me gustaría obtener más información.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="flex-shrink-0 p-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-lg transition-colors group-hover:bg-[#25D366]/20">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm">
                    WhatsApp
                  </p>
                  <p className="text-obsidian-400 text-sm group-hover:text-[#25D366] transition-colors">
                    +52 999 123 4567
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+529991234567" className="flex items-center gap-4 group">
                <div className="flex-shrink-0 p-3 bg-fire-900/30 text-fire-400 border border-fire-800/40 rounded-lg transition-colors group-hover:bg-fire-900/50">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm">
                    Teléfono
                  </p>
                  <p className="text-obsidian-400 text-sm group-hover:text-fire-400 transition-colors">
                    +52 999 123 4567
                  </p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:hola@kaak.mx" className="flex items-center gap-4 group">
                <div className="flex-shrink-0 p-3 bg-ember-900/30 text-ember-400 border border-ember-800/40 rounded-lg transition-colors group-hover:bg-ember-900/50">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm">
                    Email
                  </p>
                  <p className="text-obsidian-400 text-sm group-hover:text-ember-400 transition-colors">
                    hola@kaak.mx
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-cenote-900/30 text-cenote-400 border border-cenote-800/40 rounded-lg">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm">
                    Ubicación
                  </p>
                  <p className="text-obsidian-400 text-sm">
                    Mérida, Yucatán, México
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <Card padding="lg" className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-fire-900/30 text-fire-400 border border-fire-800/40 rounded-xl mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                Horario de Atención
              </h3>
              <p className="text-obsidian-500 text-sm mb-5">
                Respondemos mensajes en los siguientes horarios
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700/40">
                  <p className="font-heading font-semibold text-white mb-1">
                    Lunes a Viernes
                  </p>
                  <p className="text-fire-400">9:00 — 19:00</p>
                </div>
                <div className="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700/40">
                  <p className="font-heading font-semibold text-white mb-1">
                    Sábados
                  </p>
                  <p className="text-fire-400">10:00 — 15:00</p>
                </div>
                <div className="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700/40">
                  <p className="font-heading font-semibold text-white mb-1">
                    Domingos
                  </p>
                  <p className="text-obsidian-500">Cerrado</p>
                </div>
              </div>
              <p className="mt-5 text-obsidian-500 text-xs">
                Fuera de horario, deja tu mensaje y te responderemos al siguiente día hábil.
              </p>
            </Card>

            <MayaDivider variant="default" className="mt-12" />
          </PageContainer>
        </section>

        {/* ============================================
            Bottom CTA — Floating WhatsApp reminder
            ============================================ */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-fire-900)_0%,_transparent_50%)] opacity-20 pointer-events-none" />
          <PageContainer size="narrow">
            <div className="relative z-10 text-center">
              <p className="font-heading text-sm uppercase tracking-[0.3em] text-ember-400 mb-3">
                La Revolución de los Asados al Carbón
              </p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para Encender el Fuego?
              </h2>
              <a
                href={whatsappLink("Hola K'Á-AK, me gustaría obtener más información.")}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-trail-cta inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-heading font-semibold text-base rounded-xl transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-[1.03] active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-6 h-6" />
                Iniciar Conversación
              </a>
            </div>
          </PageContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}
