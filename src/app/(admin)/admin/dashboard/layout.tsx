import AdminNavbar from "@/components/modules/admin/AdminNavbar";
import SidebarContent from "@/components/modules/admin/SidebarContent"; // Reusing the content

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 🖥️ Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden lg:block fixed left-0 top-0 z-20 h-screen w-64 border-r bg-gray-900 text-white">
        <SidebarContent />
      </aside>

      {/* Main Content Wrapper */}
      {/* On Mobile: ml-0 (Full width). On Desktop: ml-64 (Push content) */}
      <div className="lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <AdminNavbar />

        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
