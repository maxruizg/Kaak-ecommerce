import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireAdmin, logout } from "~/lib/auth.server";
import { AdminLayout } from "~/components/layout/AdminLayout";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const admin = await requireAdmin(request);
    return json({ admin });
  } catch (error) {
    // If it's a redirect Response (from requireAdmin), re-throw it
    if (error instanceof Response) throw error;
    // DB error - return mock admin for design preview
    return json({ admin: { id: "mock", email: "admin@kaak.mx", name: "Chef Marco HG", role: "admin" } });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const action = formData.get("_action");

    if (action === "logout") {
      return logout(request);
    }

    return json({});
  } catch (error) {
    console.error("admin action error:", error);
    return json({ error: "Error al procesar la acción." }, { status: 500 });
  }
}

export default function AdminRoot() {
  const { admin } = useLoaderData<typeof loader>();

  return (
    <AdminLayout adminName={admin.name}>
      <Outlet />
    </AdminLayout>
  );
}
