import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link, useSearchParams } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { formatCurrency, formatDateShort } from "~/lib/utils";
import { StatusBadge } from "~/components/admin/StatusBadge";
import { cn } from "~/lib/utils";

const statusFilters = [
  { value: "", label: "Todos" },
  { value: "pending", label: "Pendientes" },
  { value: "confirmed", label: "Confirmados" },
  { value: "shipped", label: "Enviados" },
  { value: "delivered", label: "Entregados" },
  { value: "cancelled", label: "Cancelados" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") || "";

    const orders = await prisma.order.findMany({
      where: status ? { status } : {},
      include: {
        customer: { select: { firstName: true, lastName: true, email: true } },
        _count: { select: { items: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return json({ orders, status });
  } catch (error) {
    console.error("admin.pedidos._index loader error:", error);
    return json({ orders: [], status: "" });
  }
}

export default function AdminOrdersIndex() {
  const { orders, status } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900 mb-8">
        Pedidos
      </h1>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              if (f.value) {
                setSearchParams({ status: f.value });
              } else {
                setSearchParams({});
              }
            }}
            className={cn(
              "px-4 py-2 text-sm font-heading font-medium rounded-full transition-colors",
              (status || "") === f.value
                ? "bg-fire-600 text-white"
                : "bg-obsidian-100 text-obsidian-600 hover:bg-obsidian-200"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-obsidian-200 bg-obsidian-50">
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Orden</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Fecha</th>
                <th className="text-center px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Artículos</th>
                <th className="text-center px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Estado</th>
                <th className="text-right px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Total</th>
                <th className="text-right px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-obsidian-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-fire-600">{order.orderNumber}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-obsidian-900">{order.customer.firstName} {order.customer.lastName}</p>
                    <p className="text-xs text-obsidian-400">{order.customer.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-obsidian-600">{formatDateShort(order.createdAt)}</td>
                  <td className="px-6 py-4 text-sm text-center text-obsidian-600">{order._count.items}</td>
                  <td className="px-6 py-4 text-center"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-obsidian-900">{formatCurrency(order.total)}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/pedidos/${order.id}`} className="text-sm text-fire-600 hover:text-fire-700 font-medium transition-colors">
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="p-8 text-center text-obsidian-500">
            No hay pedidos {status ? `con estado "${status}"` : ""}.
          </div>
        )}
      </div>
    </div>
  );
}
