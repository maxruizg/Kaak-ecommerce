import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { validateForm, promotionSchema } from "~/lib/validators";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";

const promoTypes = [
  { value: "percentage", label: "Porcentaje" },
  { value: "fixed", label: "Monto Fijo" },
  { value: "freeShipping", label: "Envío Gratis" },
];

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const result = validateForm(promotionSchema, data);
    if (!result.success) {
      return json({ errors: result.errors }, { status: 400 });
    }

    await prisma.promotion.create({
      data: {
        name: result.data.name,
        code: result.data.code,
        description: result.data.description || null,
        type: result.data.type,
        value: result.data.value,
        minPurchase: result.data.minPurchase ?? null,
        maxUses: result.data.maxUses ?? null,
        isActive: result.data.isActive,
        startDate: result.data.startDate ? new Date(result.data.startDate) : null,
        endDate: result.data.endDate ? new Date(result.data.endDate) : null,
      },
    });

    return redirect("/admin/promociones");
  } catch (error) {
    console.error("admin.promociones.nuevo action error:", error);
    return json({ errors: { _form: "Error al crear la promoción. Intente de nuevo." } as Record<string, string> }, { status: 500 });
  }
}

export default function AdminPromotionNew() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900 mb-8">
        Nueva Promoción
      </h1>

      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm p-6 md:p-8 max-w-2xl">
        <Form method="post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" label="Nombre" placeholder="Descuento de Verano" error={actionData?.errors?.name} required />
            <Input name="code" label="Código" placeholder="VERANO2026" error={actionData?.errors?.code} required />
            <Select name="type" label="Tipo" options={promoTypes} placeholder="Selecciona..." error={actionData?.errors?.type} required />
            <Input name="value" label="Valor" type="number" step="0.01" placeholder="15" error={actionData?.errors?.value} required />
            <Input name="minPurchase" label="Compra Mínima (opcional)" type="number" step="0.01" placeholder="5000" />
            <Input name="maxUses" label="Usos Máximos (opcional)" type="number" placeholder="100" />
            <Input name="startDate" label="Fecha Inicio (opcional)" type="date" />
            <Input name="endDate" label="Fecha Fin (opcional)" type="date" />
          </div>

          <Textarea name="description" label="Descripción (opcional)" placeholder="Descripción de la promoción..." />

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isActive" value="true" defaultChecked className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
            <span className="text-sm text-obsidian-700">Activa</span>
          </label>

          <div className="flex gap-3 pt-4">
            <Button type="submit" isLoading={isSubmitting}>Crear Promoción</Button>
            <a href="/admin/promociones" className="inline-flex items-center px-5 py-2.5 text-sm font-heading font-semibold text-obsidian-600 hover:text-obsidian-800 transition-colors">
              Cancelar
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
