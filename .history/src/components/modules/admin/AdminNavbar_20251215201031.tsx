"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("accessToken");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-end px-6 sticky top-0 z-10">
      <Button
        variant="destructive"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2">
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </header>
  );
};

export default AdminNavbar;
