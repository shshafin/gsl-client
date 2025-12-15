"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import {
  Edit,
  Plus,
  Trash,
  Shield,
  ShieldCheck,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllUsers, deleteUser } from "@/services/UserService";
import { IUser, TUserRole } from "@/types/user.types";

export default function UserListPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 📄 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 1. Filter Logic (Search first)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Pagination Logic (Slice the filtered results)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteUser(deleteId);
      toast.success("User deleted successfully");

      // Optimistic Update: Remove from local state immediately
      const newUsers = users.filter((u) => u._id !== deleteId);
      setUsers(newUsers);

      // If current page becomes empty, go back one page
      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleteId(null);
    }
  };

  const getRoleBadge = (role: TUserRole) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200">
            <Shield className="w-3 h-3 mr-1" /> Super Admin
          </Badge>
        );
      case "admin":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">
            <ShieldCheck className="w-3 h-3 mr-1" /> Admin
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="text-gray-600">
            <User className="w-3 h-3 mr-1" /> Moderator
          </Badge>
        );
    }
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "image",
      header: "Avatar",
      cell: ({ row }) => (
        <div className="h-10 w-10 relative rounded-full border overflow-hidden bg-gray-100">
          {row.original.image ? (
            <Image
              src={row.original.image}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              <User className="h-5 w-5" />
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "User Details",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {row.original.name}
          </span>
          <span className="text-xs text-gray-500">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => getRoleBadge(row.original.role),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/dashboard/users/edit/${row.original._id}`}>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8 bg-red-50 text-red-600 hover:bg-red-100 border-red-100 shadow-none"
            onClick={() => setDeleteId(row.original._id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-gray-500">Control access and roles</p>
        </div>
        <Link href="/admin/dashboard/users/create">
          <Button className="bg-black text-white hover:bg-gray-800 shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500 hidden md:block">
          Total Users: {users.length}
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={paginatedUsers}
        />
      )}

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">
            Page <span className="font-bold">{currentPage}</span> of{" "}
            {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }>
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The user will lose access
              immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
