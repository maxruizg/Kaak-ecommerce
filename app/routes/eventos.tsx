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

export const meta: MetaFunction = () => [
  { title: "Servicio de Chef para Eventos — K'Á-AK" },
  { name: "description", content: "Contrata al Chef Marco HG para tu evento. Servicio profesional de asado con barril K'Á-AK incluido." },
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

export default function Eventos() {
  const actionData = useActionData<{ errors?: Record<string, string>; success?: boolean }>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="pt-20 md:pt-24 pb-16">
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
              El Chef Marco HG lleva la experiencia K'Á-AK directamente a tu evento.
              Asado profesional con barril incluido.
            </p>
          </div>

          {/* Service Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-3xl mx-auto">
            <Card hover className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-fire-900/30 text-fire-400 border border-fire-800/40 rounded-xl mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Chef Asador
              </h3>
              <p className="text-3xl font-heading font-bold text-fire-600 mb-3">
                $4,000 MXN
              </p>
              <ul className="text-sm text-obsidian-400 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Chef profesional
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Barril asador incluido
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Carbón y herramientas
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  4 horas de servicio
                </li>
              </ul>
            </Card>

            <Card hover className="text-center border-fire-700/50 shadow-fire-500/10 shadow-md">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-ember-900/30 text-ember-400 border border-ember-800/40 rounded-xl mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Chef + Mesero
              </h3>
              <p className="text-3xl font-heading font-bold text-fire-600 mb-3">
                $4,500 MXN
              </p>
              <ul className="text-sm text-obsidian-400 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Todo lo del paquete Chef
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Mesero profesional
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Servicio de mesa
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Montaje de buffet
                </li>
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
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
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
