import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useOutletContext, useActionData, useNavigation } from "@remix-run/react";
import { validateForm, eventBookingSchema } from "~/lib/validators";
import { generateBookingNumber } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { EventBookingForm } from "~/components/booking/EventBookingForm";
import { MayaDivider } from "~/components/maya/MayaDivider";
import { Card } from "~/components/ui/Card";
import { Icon } from "~/components/ui/Icon";

export const meta: MetaFunction = () => [
  { title: "Servicio de Chef para Eventos — K'Á-AK" },
  { name: "description", content: "Contrata al Chef Marco HG para tu evento. Servicio profesional de asado con barril K'Á-AK incluido." },
  { property: "og:image", content: "/og-image.jpg" },
  { name: "twitter:card", content: "summary_large_image" },
];

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const result = validateForm(eventBookingSchema, data);
    if (!result.success) {
      return json({ errors: result.errors, success: false }, { status: 400 });
    }

    const totalCost = result.data.serviceType === "chef" ? 4000 : 4500;

    // Stub: log booking instead of saving to DB
    console.log("[Eventos Stub] Event booking created:", {
      bookingNumber: generateBookingNumber("EVT"),
      serviceType: result.data.serviceType,
      customerName: result.data.customerName,
      customerEmail: result.data.customerEmail,
      customerPhone: result.data.customerPhone,
      eventDate: result.data.eventDate,
      eventDuration: result.data.eventDuration,
      guestCount: result.data.guestCount,
      eventAddress: result.data.eventAddress,
      menuDetails: result.data.menuDetails || null,
      notes: result.data.notes || null,
      totalCost,
    });

    return json({ success: true, errors: undefined });
  } catch (error) {
    console.error("eventos action error:", error);
    return json({ errors: { _form: "Error al procesar la solicitud. Intente de nuevo." }, success: false }, { status: 500 });
  }
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <Icon name="check" className="w-4 h-4 text-jade-600 flex-shrink-0" strokeWidth={2} />
      {children}
    </li>
  );
}

export default function Eventos() {
  const actionData = useActionData<{ errors?: Record<string, string>; success?: boolean }>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main id="main-content" className="pt-20 md:pt-24 pb-16">
        <PageContainer>
          <div className="text-center mb-12">
            <p className="font-heading text-sm uppercase tracking-[0.3em] text-fire-500 mb-3">
              Servicio de Chef
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Chef para Tu Evento
            </h1>
            <MayaDivider variant="accent" className="max-w-xs mx-auto mb-6" />
            <p className="text-obsidian-400 max-w-2xl mx-auto text-lg">
              Asado profesional con barril incluido, directo a tu evento.
            </p>
          </div>

          {/* Service Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-3xl mx-auto">
            <Card hover className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-fire-900/30 text-fire-400 border border-fire-800/40 rounded-xl mb-4">
                <Icon name="fire" className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Chef Asador
              </h3>
              <p className="text-3xl font-heading font-bold text-fire-600 mb-3">
                $4,000 MXN
              </p>
              <ul className="text-sm text-obsidian-400 space-y-2 text-left">
                <CheckItem>Chef profesional</CheckItem>
                <CheckItem>Barril asador incluido</CheckItem>
                <CheckItem>Carbón y herramientas</CheckItem>
                <CheckItem>4 horas de servicio</CheckItem>
              </ul>
            </Card>

            <Card hover className="text-center border-fire-700/50 shadow-fire-500/10 shadow-md relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-fire-600 text-white text-xs font-heading font-semibold rounded-full uppercase tracking-wider">
                Recomendado
              </span>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-ember-900/30 text-ember-400 border border-ember-800/40 rounded-xl mb-4">
                <Icon name="sparkle" className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Chef + Mesero
              </h3>
              <p className="text-3xl font-heading font-bold text-fire-600 mb-3">
                $4,500 MXN
              </p>
              <ul className="text-sm text-obsidian-400 space-y-2 text-left">
                <CheckItem>Todo lo del paquete Chef</CheckItem>
                <CheckItem>Mesero profesional</CheckItem>
                <CheckItem>Servicio de mesa</CheckItem>
                <CheckItem>Montaje de buffet</CheckItem>
              </ul>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">
              Solicitar Servicio
            </h2>

            {actionData?.success ? (
              <Card className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-jade-400/20 text-jade-600 rounded-full mb-4">
                  <Icon name="check" className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-2">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-obsidian-400">
                  Hemos recibido tu solicitud. El Chef Marco te contactará en las próximas 24 horas para coordinar los detalles de tu evento.
                </p>
              </Card>
            ) : (
              <EventBookingForm errors={actionData?.errors} isSubmitting={isSubmitting} />
            )}
          </div>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
