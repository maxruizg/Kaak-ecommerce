import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { getAdminId } from "~/lib/auth.server";
import { login, createAdminSession } from "~/lib/auth.server";
import { validateForm, loginSchema } from "~/lib/validators";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";

export const meta: MetaFunction = () => [
  { title: "Admin Login — K'Á-AK" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const adminId = await getAdminId(request);
    if (adminId) return redirect("/admin");
    return json({});
  } catch (error) {
    console.error("admin.login loader error:", error);
    return json({});
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const result = validateForm(loginSchema, data);
    if (!result.success) {
      return json({ errors: result.errors }, { status: 400 });
    }

    const admin = await login(result.data.email, result.data.password);
    if (!admin) {
      return json({ errors: { email: "Credenciales inválidas" } }, { status: 400 });
    }

    return createAdminSession(admin.id, request);
  } catch (error) {
    console.error("admin.login action error:", error);
    return json({ errors: { email: "Error de conexión. Intente de nuevo." } }, { status: 500 });
  }
}

export default function AdminLogin() {
  const actionData = useActionData<{ errors?: Record<string, string> }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-fire-500 tracking-wider mb-2">
            K'Á-AK
          </h1>
          <p className="text-obsidian-400 font-heading text-sm uppercase tracking-widest">
            Panel de Administración
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="font-heading font-semibold text-xl text-obsidian-900 mb-6">
            Iniciar Sesión
          </h2>

          <Form method="post" className="space-y-4">
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="admin@kaak.mx"
              error={actionData?.errors?.email}
              required
            />
            <Input
              name="password"
              label="Contraseña"
              type="password"
              placeholder="••••••"
              error={actionData?.errors?.password}
              required
            />
            <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
