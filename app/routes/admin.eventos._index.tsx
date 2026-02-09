import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { formatCurrency, formatDateShort } from "~/lib/utils";
import { StatusBadge } from "~/components/admin/StatusBadge";

const bookingStatuses = [
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmado" },
  { value: "completed", label: "Completado" },
  { value: "cancelled", label: "Cancelado" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const bookings = await prisma.eventBooking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return json({ bookings });
  } catch (error) {
    console.error("admin.eventos._index loader error:", error);
    return json({ bookings: [] });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const bookingId = formData.get("bookingId") as string;
    const status = formData.get("status") as string;

    await prisma.eventBooking.update({
      where: { id: bookingId },
      data: { status },
    });

    return json({ success: true });
  } catch (error) {
    console.error("admin.eventos._index action error:", error);
    return json({ error: "Error al actualizar la reservación. Intente de nuevo." }, { status: 500 });
  }
}

export default function AdminEventsIndex() {
  const { bookings } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900 mb-8">
        Eventos / Chef
      </h1>

      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-obsidian-200 bg-obsidian-50">
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Reservación</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Servicio</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Evento</th>
                <th className="text-center px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Estado</th>
                <th className="text-right px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Costo</th>
                <th className="text-right px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Actualizar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-obsidian-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-fire-600">{b.bookingNumber}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-obsidian-900">{b.customerName}</p>
                    <p className="text-xs text-obsidian-400">{b.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-obsidian-600">
                    {b.serviceType === "chef" ? "Chef Asador" : "Chef + Mesero"}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-obsidian-600">{formatDateShort(b.eventDate)}</p>
                    <p className="text-xs text-obsidian-400">{b.guestCount} invitados · {b.eventDuration}h</p>
                  </td>
                  <td className="px-6 py-4 text-center"><StatusBadge status={b.status} /></td>
                  <td className="px-6 py-4 text-sm text-right font-medium">{formatCurrency(b.totalCost)}</td>
                  <td className="px-6 py-4">
                    <Form method="post" className="flex items-center gap-2 justify-end">
                      <input type="hidden" name="bookingId" value={b.id} />
                      <select name="status" defaultValue={b.status} className="text-xs border border-obsidian-300 rounded px-2 py-1">
                        {bookingStatuses.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <button type="submit" className="text-xs text-fire-600 hover:text-fire-700 font-medium">
                        OK
                      </button>
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="p-8 text-center text-obsidian-500">No hay reservaciones de eventos.</div>
        )}
      </div>
    </div>
  );
}
