import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { formatCurrency, formatDate } from "~/lib/utils";
import { StatusBadge } from "~/components/admin/StatusBadge";
import { Button } from "~/components/ui/Button";
import { Select } from "~/components/ui/Select";
import { Card } from "~/components/ui/Card";

const orderStatuses = [
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmado" },
  { value: "processing", label: "Procesando" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
];

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        items: {
          include: { product: { select: { name: true, slug: true } } },
        },
        promotion: true,
      },
    });

    if (!order) throw new Response("Pedido no encontrado", { status: 404 });

    return json({ order });
  } catch (error) {
    if (error instanceof Response) throw error;
    console.error("admin.pedidos.$id loader error:", error);
    throw new Response("Pedido no encontrado", { status: 404 });
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const status = formData.get("status") as string;

    await prisma.order.update({
      where: { id: params.id },
      data: { status },
    });

    return json({ success: true });
  } catch (error) {
    console.error("admin.pedidos.$id action error:", error);
    return json({ error: "Error al actualizar el pedido. Intente de nuevo." }, { status: 500 });
  }
}

export default function AdminOrderDetail() {
  const { order } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const shippingAddress = order.shippingAddress as Record<string, string>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900">
            Pedido {order.orderNumber}
          </h1>
          <p className="text-sm text-obsidian-500 mt-1">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <StatusBadge status={order.status} size="md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card>
            <h2 className="font-heading font-semibold text-lg text-obsidian-900 mb-4">
              Artículos
            </h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-obsidian-100 last:border-0">
                  <div>
                    <p className="font-medium text-obsidian-900">{item.product.name}</p>
                    <p className="text-sm text-obsidian-400">
                      {formatCurrency(item.unitPrice)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-obsidian-900">{formatCurrency(item.total)}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-obsidian-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-obsidian-500">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-jade-600">
                  <span>Descuento</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-obsidian-500">Envío</span>
                <span>{order.shippingCost === 0 ? "Gratis" : formatCurrency(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-heading font-semibold text-lg pt-2 border-t border-obsidian-200">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </Card>

          {/* Shipping Address */}
          <Card>
            <h2 className="font-heading font-semibold text-lg text-obsidian-900 mb-4">
              Dirección de Envío
            </h2>
            <div className="text-sm text-obsidian-600 space-y-1">
              <p>{shippingAddress.street} #{shippingAddress.number}</p>
              <p>Col. {shippingAddress.colony}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
              {shippingAddress.references && (
                <p className="text-obsidian-400 mt-2">Ref: {shippingAddress.references}</p>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <Card>
            <h2 className="font-heading font-semibold text-lg text-obsidian-900 mb-4">
              Cliente
            </h2>
            <div className="text-sm text-obsidian-600 space-y-2">
              <p className="font-medium text-obsidian-900">{order.customer.firstName} {order.customer.lastName}</p>
              <p>{order.customer.email}</p>
              {order.customer.phone && <p>{order.customer.phone}</p>}
            </div>
          </Card>

          {/* Update Status */}
          <Card>
            <h2 className="font-heading font-semibold text-lg text-obsidian-900 mb-4">
              Actualizar Estado
            </h2>
            <Form method="post" className="space-y-3">
              <Select name="status" options={orderStatuses} defaultValue={order.status} />
              <Button type="submit" className="w-full" size="sm" isLoading={isSubmitting}>
                Actualizar
              </Button>
            </Form>
          </Card>

          {/* Payment */}
          <Card>
            <h2 className="font-heading font-semibold text-lg text-obsidian-900 mb-4">
              Pago
            </h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-obsidian-500">Estado</span>
                <StatusBadge status={order.paymentStatus} />
              </div>
              {order.paymentIntentId && (
                <div className="flex justify-between">
                  <span className="text-obsidian-500">ID</span>
                  <span className="font-mono text-xs text-obsidian-600 truncate max-w-[150px]">{order.paymentIntentId}</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
