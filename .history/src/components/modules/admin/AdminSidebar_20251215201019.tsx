"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/constants/sidebarItems";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0 overflow-y-auto border-r border-gray-800">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wider">GSL ADMIN</h1>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
                isActive
                  ? "bg-white text-black shadow-md"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}>
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
