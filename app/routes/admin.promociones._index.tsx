import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { formatCurrency, formatDateShort } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { Badge } from "~/components/ui/Badge";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { orders: true } } },
    });
    return json({ promotions });
  } catch (error) {
    console.error("admin.promociones._index loader error:", error);
    return json({ promotions: [] });
  }
}

export default function AdminPromotionsIndex() {
  const { promotions } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900">
          Promociones
        </h1>
        <Link to="/admin/promociones/nuevo">
          <Button>+ Nueva Promoción</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-obsidian-200 bg-obsidian-50">
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Nombre</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Código</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Tipo</th>
                <th className="text-center px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Usos</th>
                <th className="text-center px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Estado</th>
                <th className="text-right px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-100">
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-obsidian-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-obsidian-900">{promo.name}</p>
                    {promo.description && <p className="text-xs text-obsidian-400">{promo.description}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-fire-600">{promo.code}</td>
                  <td className="px-6 py-4 text-sm text-obsidian-600">
                    {promo.type === "percentage" && `${promo.value}%`}
                    {promo.type === "fixed" && formatCurrency(promo.value)}
                    {promo.type === "freeShipping" && "Envío Gratis"}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-obsidian-600">
                    {promo.usedCount}{promo.maxUses ? `/${promo.maxUses}` : ""}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={promo.isActive ? "jade" : "default"}>
                      {promo.isActive ? "Activa" : "Inactiva"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/promociones/${promo.id}`} className="text-sm text-fire-600 hover:text-fire-700 font-medium transition-colors">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {promotions.length === 0 && (
          <div className="p-8 text-center text-obsidian-500">
            No hay promociones creadas.
          </div>
        )}
      </div>
    </div>
  );
}
