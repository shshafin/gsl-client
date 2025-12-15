/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import {
  Plus,
  Trash,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { getAllResources, deleteResource } from "@/services/ResourceService";
import { IResource } from "@/types/resource.types";

export default function ResourceListPage() {
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 📄 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust as needed

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await getAllResources();
      if (res.success) {
        setResources(res.data);
      }
    } catch (error) {
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Filter & Pagination Logic
  const filteredData = resources.filter((res) =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteResource(deleteId);
      toast.success("Resource deleted");
      // Optimistic update
      const newData = resources.filter((r) => r._id !== deleteId);
      setResources(newData);
      if (paginatedData.length === 1 && currentPage > 1)
        setCurrentPage((p) => p - 1);
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<IResource>[] = [
    {
      accessorKey: "title",
      header: "Document Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500 border border-red-100">
            <FileText className="h-5 w-5" />
          </div>
          <span className="font-semibold text-gray-700">
            {row.original.title}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Upload Date",
      cell: ({ row }) => (
        <span className="text-xs text-gray-500">
          {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            href={row.original.fileUrl}
            target="_blank"
            download>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 text-blue-600 hover:text-blue-700">
              <Download className="h-4 w-4" />
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
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Resources
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Manage downloadable PDFs
            </p>
          </div>

          <Link
            href="/admin/dashboard/resources/create"
            className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 shadow-md">
              <Plus className="mr-2 h-4 w-4" /> Add PDF
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500">Total: {resources.length}</div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={paginatedData}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}>
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
            <AlertDialogTitle>Delete Resource?</AlertDialogTitle>
            <AlertDialogDescription>
              This file will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
