import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  adminName: string;
}

export function AdminLayout({ children, adminName }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-obsidian-50">
      <AdminSidebar adminName={adminName} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
