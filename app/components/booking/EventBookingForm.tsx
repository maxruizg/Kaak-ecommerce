import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";

interface EventBookingFormProps {
  errors?: Record<string, string>;
  isSubmitting?: boolean;
}

const serviceTypes = [
  { value: "chef", label: "Chef Asador — $4,000 MXN" },
  { value: "chef_waiter", label: "Chef + Mesero — $4,500 MXN" },
];

export function EventBookingForm({ errors = {}, isSubmitting }: EventBookingFormProps) {
  return (
    <Form method="post" className="space-y-6">
      <Select
        name="serviceType"
        label="Tipo de servicio"
        options={serviceTypes}
        placeholder="Selecciona un servicio"
        error={errors.serviceType}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="customerName" label="Nombre completo" placeholder="Tu nombre" error={errors.customerName} required />
        <Input name="customerEmail" label="Email" type="email" placeholder="tu@email.com" error={errors.customerEmail} required />
        <Input name="customerPhone" label="Teléfono" type="tel" placeholder="999 123 4567" error={errors.customerPhone} required />
        <Input name="guestCount" label="Número de invitados" type="number" min="1" placeholder="30" error={errors.guestCount} required />
        <Input name="eventDate" label="Fecha del evento" type="date" error={errors.eventDate} required />
        <Input name="eventDuration" label="Duración (horas)" type="number" min="2" defaultValue="4" error={errors.eventDuration} required />
        <Input name="eventAddress" label="Dirección del evento" placeholder="Calle, número, colonia, ciudad" error={errors.eventAddress} required className="md:col-span-2" />
      </div>

      <Textarea
        name="menuDetails"
        label="Detalles del menú (opcional)"
        placeholder="Tipo de cortes, acompañamientos, restricciones alimentarias..."
      />

      <Textarea
        name="notes"
        label="Notas adicionales (opcional)"
        placeholder="Requerimientos especiales, equipo adicional, etc."
      />

      <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
        Solicitar Servicio de Chef
      </Button>
    </Form>
  );
}
