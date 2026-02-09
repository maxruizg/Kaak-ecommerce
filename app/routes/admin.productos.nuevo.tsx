import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { validateForm, productSchema } from "~/lib/validators";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return json({ categories });
  } catch (error) {
    console.error("admin.productos.nuevo loader error:", error);
    return json({ categories: [] });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const result = validateForm(productSchema, data);
    if (!result.success) {
      return json({ errors: result.errors }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: result.data.name,
        slug: result.data.slug,
        description: result.data.description,
        mayaName: result.data.mayaName || null,
        categoryId: result.data.categoryId,
        basePrice: result.data.basePrice,
        comparePrice: result.data.comparePrice ?? null,
        sku: result.data.sku,
        isActive: result.data.isActive,
        isFeatured: result.data.isFeatured,
        isRentable: result.data.isRentable,
        freeShipping: result.data.freeShipping,
        weight: result.data.weight ?? null,
        guestCapacity: result.data.guestCapacity || null,
        grillSize: result.data.grillSize || null,
        material: result.data.material || null,
      },
    });

    return redirect(`/admin/productos/${product.id}`);
  } catch (error) {
    console.error("admin.productos.nuevo action error:", error);
    return json({ errors: { _form: "Error al crear el producto. Intente de nuevo." } as Record<string, string> }, { status: 500 });
  }
}

export default function AdminProductNew() {
  const { categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900 mb-8">
        Nuevo Producto
      </h1>

      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm p-6 md:p-8 max-w-3xl">
        <Form method="post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" label="Nombre" placeholder="Colibrí" error={actionData?.errors?.name} required />
            <Input name="slug" label="Slug (URL)" placeholder="colibri" error={actionData?.errors?.slug} required />
            <Input name="sku" label="SKU" placeholder="KAAK-BAR-COL" error={actionData?.errors?.sku} required />
            <Select name="categoryId" label="Categoría" options={categoryOptions} placeholder="Selecciona..." error={actionData?.errors?.categoryId} required />
            <Input name="basePrice" label="Precio Base (MXN)" type="number" step="0.01" placeholder="12000" error={actionData?.errors?.basePrice} required />
            <Input name="comparePrice" label="Precio Comparación (opcional)" type="number" step="0.01" placeholder="14500" />
            <Input name="mayaName" label="Nombre Maya (opcional)" placeholder="Tz'unun" />
            <Input name="weight" label="Peso (kg)" type="number" step="0.1" placeholder="35" />
            <Input name="guestCapacity" label="Capacidad Invitados" placeholder="8-15 personas" />
            <Input name="grillSize" label="Tamaño Parrilla" placeholder="40cm diámetro" />
          </div>

          <Input name="material" label="Material" placeholder="Acero al carbón calibre 10..." />
          <Textarea name="description" label="Descripción" placeholder="Descripción completa del producto..." error={actionData?.errors?.description} required />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isActive" value="true" defaultChecked className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Activo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" value="true" className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Destacado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isRentable" value="true" className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Rentable</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="freeShipping" value="true" className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Envío Gratis</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" isLoading={isSubmitting}>Crear Producto</Button>
            <a href="/admin/productos" className="inline-flex items-center px-5 py-2.5 text-sm font-heading font-semibold text-obsidian-600 hover:text-obsidian-800 transition-colors">
              Cancelar
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
