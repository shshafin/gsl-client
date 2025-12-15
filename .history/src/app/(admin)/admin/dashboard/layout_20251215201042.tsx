import AdminNavbar from "@/components/modules/admin/AdminNavbar";
import AdminSidebar from "@/components/modules/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar (Fixed Width) */}
      <AdminSidebar />

      {/* Main Content Area (Offset by Sidebar Width) */}
      <div className="ml-64">
        <AdminNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
