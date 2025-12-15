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
import SidebarContent from "./SidebarContent";
import { useUser } from "@/hooks/useUser"; // 🆕 Import the hook

const AdminNavbar = () => {
  const router = useRouter();
  const { user } = useUser(); // 🆕 Get dynamic user data
  console.log(user);

  const handleLogout = () => {
    deleteCookie("accessToken"); // Matches your auth method
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 shadow-sm">
      {/* 📱 Mobile: Hamburger Menu */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-64 border-r-0 bg-gray-900 text-white">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Spacer for Desktop */}
      <div className="hidden lg:block"></div>

      <div className="flex items-center gap-4">
        {/* 🆕 Desktop: User Info Text */}
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium leading-none">
            {user?.email || "Loading..."}
          </p>
          <p className="text-xs text-gray-500 capitalize mt-1">
            {user?.role?.replace("_", " ") || "Guest"}
          </p>
        </div>

        {/* 👤 Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border border-gray-200">
                <AvatarImage
                  src=""
                  alt="User"
                />
                <AvatarFallback className="bg-black text-white">
                  {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56"
            align="end"
            forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                {/* 🆕 Dynamic Name/Role in Dropdown */}
                <p className="text-sm font-medium leading-none capitalize">
                  {user?.role?.replace("_", " ")}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* 🆕 Link to Profile Page */}
            <DropdownMenuItem
              onClick={() => router.push("/admin/dashboard/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/admin/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminNavbar;
