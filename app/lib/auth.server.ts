import { redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { prisma } from "./db.server";
import { getSession, commitSession, destroySession } from "./session.server";

const ADMIN_SESSION_KEY = "adminUserId";

export async function getAdminId(request: Request): Promise<string | undefined> {
  const session = await getSession(request);
  return session.get(ADMIN_SESSION_KEY);
}

export async function getAdmin(request: Request) {
  const adminId = await getAdminId(request);
  if (!adminId) return null;

  const admin = await prisma.adminUser.findUnique({
    where: { id: adminId },
    select: { id: true, email: true, name: true, role: true },
  });

  return admin;
}

export async function requireAdmin(request: Request) {
  const admin = await getAdmin(request);
  if (!admin) {
    throw redirect("/admin/login");
  }
  return admin;
}

export async function login(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!admin) return null;

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) return null;

  return { id: admin.id, email: admin.email, name: admin.name, role: admin.role };
}

export async function createAdminSession(adminId: string, request: Request) {
  const session = await getSession(request);
  session.set(ADMIN_SESSION_KEY, adminId);

  return redirect("/admin", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/admin/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
