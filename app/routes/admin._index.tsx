import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { formatCurrency } from "~/lib/utils";
import { StatsCard } from "~/components/admin/StatsCard";
import { StatusBadge } from "~/components/admin/StatusBadge";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const [
      totalOrders,
      pendingOrders,
      totalRevenue,
      totalProducts,
      pendingRentals,
      pendingEvents,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.rentalBooking.count({ where: { status: "pending" } }),
      prisma.eventBooking.count({ where: { status: "pending" } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { customer: { select: { firstName: true, lastName: true } } },
      }),
    ]);

    return json({
      stats: {
        totalOrders,
        pendingOrders,
        revenue: totalRevenue._sum.total || 0,
        totalProducts,
        pendingRentals,
        pendingEvents,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("admin._index loader error:", error);
    return json({
      stats: {
        totalOrders: 0,
        pendingOrders: 0,
        revenue: 0,
        totalProducts: 0,
        pendingRentals: 0,
        pendingEvents: 0,
      },
      recentOrders: [],
    });
  }
}

export default function AdminDashboard() {
  const { stats, recentOrders } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900 mb-8">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatsCard
          title="Ingresos Totales"
          value={formatCurrency(stats.revenue)}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Pedidos Totales"
          value={stats.totalOrders}
          subtitle={`${stats.pendingOrders} pendientes`}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Productos Activos"
          value={stats.totalProducts}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          }
        />
        <StatsCard
          title="Rentas Pendientes"
          value={stats.pendingRentals}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          }
        />
        <StatsCard
          title="Eventos Pendientes"
          value={stats.pendingEvents}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            </svg>
          }
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm">
        <div className="px-6 py-4 border-b border-obsidian-200">
          <h2 className="font-heading font-semibold text-lg text-obsidian-900">
            Pedidos Recientes
          </h2>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-obsidian-500">
            No hay pedidos aún.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-obsidian-200">
                  <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Orden</th>
                  <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Cliente</th>
                  <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Estado</th>
                  <th className="text-right px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-obsidian-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-fire-600">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-obsidian-700">
                      {order.customer.firstName} {order.customer.lastName}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-obsidian-900">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
