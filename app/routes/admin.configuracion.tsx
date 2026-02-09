import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    for (const s of settings) {
      settingsMap[s.key] = s.value;
    }
    return json({ settings: settingsMap });
  } catch (error) {
    console.error("admin.configuracion loader error:", error);
    return json({ settings: {} as Record<string, string> });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    const keys = ["phone", "email", "whatsapp", "instagram", "facebook", "address"];

    for (const key of keys) {
      const value = formData.get(key) as string;
      if (value !== null) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    return json({ success: true });
  } catch (error) {
    console.error("admin.configuracion action error:", error);
    return json({ success: false, error: "Error al guardar la configuración. Intente de nuevo." }, { status: 500 });
  }
}

export default function AdminSettings() {
  const { settings } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900 mb-8">
        Configuración del Sitio
      </h1>

      {actionData?.success && (
        <div className="mb-6 p-4 bg-jade-400/10 border border-jade-400/30 rounded-lg text-jade-700 text-sm">
          Configuración guardada exitosamente.
        </div>
      )}

      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm p-6 md:p-8 max-w-2xl">
        <Form method="post" className="space-y-6">
          <h2 className="font-heading font-semibold text-lg text-obsidian-900">
            Información de Contacto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="phone" label="Teléfono" defaultValue={settings.phone || ""} placeholder="+52 999 123 4567" />
            <Input name="email" label="Email" type="email" defaultValue={settings.email || ""} placeholder="hola@kaak.mx" />
            <Input name="whatsapp" label="WhatsApp (número)" defaultValue={settings.whatsapp || ""} placeholder="5219991234567" />
            <Input name="address" label="Dirección" defaultValue={settings.address || ""} placeholder="Mérida, Yucatán" />
          </div>

          <h2 className="font-heading font-semibold text-lg text-obsidian-900 pt-4">
            Redes Sociales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="instagram" label="Instagram URL" defaultValue={settings.instagram || ""} placeholder="https://instagram.com/kaak.mx" />
            <Input name="facebook" label="Facebook URL" defaultValue={settings.facebook || ""} placeholder="https://facebook.com/kaak.mx" />
          </div>

          <div className="pt-4">
            <Button type="submit" isLoading={isSubmitting}>
              Guardar Configuración
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
