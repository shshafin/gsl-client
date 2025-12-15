"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/constants/sidebarItems";
import { cn } from "@/lib/utils";

const SidebarContent = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wider text-center">
          Golden Son LTD.
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarItems.map((item) => {
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
