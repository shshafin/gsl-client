"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/constants/sidebarItems";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser"; // 🆕 Import the hook

const SidebarContent = () => {
  const pathname = usePathname();
  const { user } = useUser(); // 🆕 Get current user info

  // 🛡️ Filter Logic
  const filteredItems = sidebarItems.filter((item) => {
    const role = user?.role;

    // If role hasn't loaded yet, strictly show nothing (or just Dashboard) to prevent flickering
    if (!role) return false;

    // 1. Super Admin: Access Everything
    if (role === "super_admin") return true;

    // 2. Admin: Access Everything EXCEPT "User Management"
    if (role === "admin") {
      return item.title !== "User Management";
    }

    // 3. Moderator: Specific Access Only
    if (role === "moderator") {
      const allowedItems = [
        "Dashboard",
        "Products",
        "Blogs & News",
        "Resources (PDF)",
        "FAQ",
      ];
      return allowedItems.includes(item.title);
    }

    return false;
  });

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-md font-bold tracking-wider text-center">
          GSL EXPORT LIMITED
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
                isActive
                  ? "bg-white text-black shadow-md font-bold"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}>
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Version Info */}
      <div className="p-4 border-t border-gray-800 text-xs text-center text-gray-500">
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default SidebarContent;
