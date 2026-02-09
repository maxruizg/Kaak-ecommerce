import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
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

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const promotion = await prisma.promotion.findUnique({ where: { id: params.id } });
    if (!promotion) throw new Response("Promoción no encontrada", { status: 404 });
    return json({ promotion });
  } catch (error) {
    if (error instanceof Response) throw error;
    console.error("admin.promociones.$id loader error:", error);
    throw new Response("Promoción no encontrada", { status: 404 });
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "delete") {
      await prisma.promotion.delete({ where: { id: params.id } });
      return redirect("/admin/promociones");
    }

    const data = Object.fromEntries(formData);
    const result = validateForm(promotionSchema, data);
    if (!result.success) {
      return json({ errors: result.errors, success: false }, { status: 400 });
    }

    await prisma.promotion.update({
      where: { id: params.id },
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

    return json({ success: true, errors: undefined });
  } catch (error) {
    console.error("admin.promociones.$id action error:", error);
    return json({ errors: { _form: "Error al actualizar la promoción. Intente de nuevo." }, success: false }, { status: 500 });
  }
}

export default function AdminPromotionEdit() {
  const { promotion } = useLoaderData<typeof loader>();
  const actionData = useActionData<{ errors?: Record<string, string>; success?: boolean }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formatDateInput = (date: string | null) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900">
          Editar: {promotion.name}
        </h1>
        <Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <Button type="submit" variant="danger" size="sm" onClick={(e) => {
            if (!confirm("¿Estás seguro de eliminar esta promoción?")) e.preventDefault();
          }}>
            Eliminar
          </Button>
        </Form>
      </div>

      {actionData && "success" in actionData && actionData.success && (
        <div className="mb-6 p-4 bg-jade-400/10 border border-jade-400/30 rounded-lg text-jade-700 text-sm">
          Promoción actualizada exitosamente.
        </div>
      )}

      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm p-6 md:p-8 max-w-2xl">
        <Form method="post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" label="Nombre" defaultValue={promotion.name} error={actionData?.errors?.name} required />
            <Input name="code" label="Código" defaultValue={promotion.code} error={actionData?.errors?.code} required />
            <Select name="type" label="Tipo" options={promoTypes} defaultValue={promotion.type} error={actionData?.errors?.type} required />
            <Input name="value" label="Valor" type="number" step="0.01" defaultValue={promotion.value} error={actionData?.errors?.value} required />
            <Input name="minPurchase" label="Compra Mínima" type="number" step="0.01" defaultValue={promotion.minPurchase || ""} />
            <Input name="maxUses" label="Usos Máximos" type="number" defaultValue={promotion.maxUses || ""} />
            <Input name="startDate" label="Fecha Inicio" type="date" defaultValue={formatDateInput(promotion.startDate)} />
            <Input name="endDate" label="Fecha Fin" type="date" defaultValue={formatDateInput(promotion.endDate)} />
          </div>

          <Textarea name="description" label="Descripción" defaultValue={promotion.description || ""} />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isActive" value="true" defaultChecked={promotion.isActive} className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Activa</span>
            </label>
            <p className="text-sm text-obsidian-400">
              Usada {promotion.usedCount} {promotion.usedCount === 1 ? "vez" : "veces"}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" isLoading={isSubmitting}>Guardar Cambios</Button>
            <a href="/admin/promociones" className="inline-flex items-center px-5 py-2.5 text-sm font-heading font-semibold text-obsidian-600 hover:text-obsidian-800 transition-colors">
              Cancelar
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
