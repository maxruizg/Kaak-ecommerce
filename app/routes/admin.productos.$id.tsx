import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, unstable_parseMultipartFormData, unstable_createMemoryUploadHandler } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { validateForm, productSchema } from "~/lib/validators";
import { uploadImage } from "~/lib/storage.server";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";
import { ImageUploader } from "~/components/admin/ImageUploader";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
      },
    });

    if (!product) throw new Response("Producto no encontrado", { status: 404 });

    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    return json({ product, categories });
  } catch (error) {
    if (error instanceof Response) throw error;
    console.error("admin.productos.$id loader error:", error);
    throw new Response("Producto no encontrado", { status: 404 });
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const uploadHandler = unstable_createMemoryUploadHandler({ maxPartSize: 5_000_000 });
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);

    const intent = formData.get("intent") as string;

    if (intent === "delete") {
      await prisma.product.delete({ where: { id: params.id } });
      return redirect("/admin/productos");
    }

    // Handle image uploads
    const imageFiles = formData.getAll("images") as File[];
    for (const file of imageFiles) {
      if (file.size > 0) {
        const url = await uploadImage(file, "products");
        await prisma.productImage.create({
          data: {
            productId: params.id!,
            url,
            alt: file.name,
            sortOrder: 0,
          },
        });
      }
    }

    const data = Object.fromEntries(formData);
    const result = validateForm(productSchema, data);
    if (!result.success) {
      return json({ errors: result.errors }, { status: 400 });
    }

    await prisma.product.update({
      where: { id: params.id },
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

    return json({ success: true, errors: undefined });
  } catch (error) {
    console.error("admin.productos.$id action error:", error);
    return json({ errors: { _form: "Error al actualizar el producto. Intente de nuevo." } }, { status: 500 });
  }
}

export default function AdminProductEdit() {
  const { product, categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<{ errors?: Record<string, string>; success?: boolean }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900">
          Editar: {product.name}
        </h1>
        <Form method="post" encType="multipart/form-data">
          <input type="hidden" name="intent" value="delete" />
          <Button type="submit" variant="danger" size="sm" onClick={(e) => {
            if (!confirm("¿Estás seguro de eliminar este producto?")) {
              e.preventDefault();
            }
          }}>
            Eliminar
          </Button>
        </Form>
      </div>

      {actionData && "success" in actionData && actionData.success && (
        <div className="mb-6 p-4 bg-jade-400/10 border border-jade-400/30 rounded-lg text-jade-700 text-sm">
          Producto actualizado exitosamente.
        </div>
      )}

      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm p-6 md:p-8 max-w-3xl">
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" label="Nombre" defaultValue={product.name} error={actionData?.errors?.name} required />
            <Input name="slug" label="Slug (URL)" defaultValue={product.slug} error={actionData?.errors?.slug} required />
            <Input name="sku" label="SKU" defaultValue={product.sku} error={actionData?.errors?.sku} required />
            <Select name="categoryId" label="Categoría" options={categoryOptions} defaultValue={product.categoryId} error={actionData?.errors?.categoryId} required />
            <Input name="basePrice" label="Precio Base (MXN)" type="number" step="0.01" defaultValue={product.basePrice} error={actionData?.errors?.basePrice} required />
            <Input name="comparePrice" label="Precio Comparación" type="number" step="0.01" defaultValue={product.comparePrice || ""} />
            <Input name="mayaName" label="Nombre Maya" defaultValue={product.mayaName || ""} />
            <Input name="weight" label="Peso (kg)" type="number" step="0.1" defaultValue={product.weight || ""} />
            <Input name="guestCapacity" label="Capacidad Invitados" defaultValue={product.guestCapacity || ""} />
            <Input name="grillSize" label="Tamaño Parrilla" defaultValue={product.grillSize || ""} />
          </div>

          <Input name="material" label="Material" defaultValue={product.material || ""} />
          <Textarea name="description" label="Descripción" defaultValue={product.description} error={actionData?.errors?.description} required />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isActive" value="true" defaultChecked={product.isActive} className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Activo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" value="true" defaultChecked={product.isFeatured} className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Destacado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isRentable" value="true" defaultChecked={product.isRentable} className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Rentable</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="freeShipping" value="true" defaultChecked={product.freeShipping} className="rounded border-obsidian-300 text-fire-600 focus:ring-fire-500" />
              <span className="text-sm text-obsidian-700">Envío Gratis</span>
            </label>
          </div>

          {/* Image Upload */}
          <ImageUploader name="images" currentImages={product.images.map(i => ({ id: i.id, url: i.url, alt: i.alt || undefined }))} />

          <div className="flex gap-3 pt-4">
            <Button type="submit" isLoading={isSubmitting}>Guardar Cambios</Button>
            <a href="/admin/productos" className="inline-flex items-center px-5 py-2.5 text-sm font-heading font-semibold text-obsidian-600 hover:text-obsidian-800 transition-colors">
              Cancelar
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
