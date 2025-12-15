"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User, Settings } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarContent from "./SidebarContent"; // Import the helper we just made

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("accessToken");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 shadow-sm">
      {/* 📱 Mobile: Hamburger Menu (Hidden on Desktop) */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          {/* Mobile Sidebar Content */}
          <SheetContent
            side="left"
            className="p-0 w-64 border-r-0 bg-gray-900 text-white">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Spacer for Desktop (keeps Profile on right) */}
      <div className="hidden lg:block"></div>

      {/* 👤 Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border border-gray-200">
              {/* Replace with actual user image if you have one */}
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Super Admin</p>
              <p className="text-xs leading-none text-muted-foreground">
                admin@gsl.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/admin/dashboard/settings")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/admin/dashboard/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default AdminNavbar;
