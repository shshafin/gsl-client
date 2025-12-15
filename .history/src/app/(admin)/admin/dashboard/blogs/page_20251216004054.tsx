/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import {
  Plus,
  Trash,
  Edit,
  ChevronLeft,
  ChevronRight,
  Search,
  FileText,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { getAllBlogs, deleteBlog } from "@/services/BlogService";
import { IBlog, TBlogCategory } from "@/types/blog.types";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 📄 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (error) {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter & Pagination Logic
  const filteredData = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBlog(deleteId);
      toast.success("Blog post deleted successfully");
      const newData = blogs.filter((b) => b._id !== deleteId);
      setBlogs(newData);
      if (paginatedData.length === 1 && currentPage > 1)
        setCurrentPage((p) => p - 1);
    } catch (error) {
      toast.error("Failed to delete blog post");
    } finally {
      setDeleteId(null);
    }
  };

  const getCategoryBadge = (category: TBlogCategory) => {
    switch (category) {
      case "News":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            News
          </Badge>
        );
      case "Event":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
            Event
          </Badge>
        );
      case "Tips":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
            Tips
          </Badge>
        );
      case "Stories":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
            Stories
          </Badge>
        );
      default:
        return <Badge variant="secondary">Other</Badge>;
    }
  };

  const getStatusBadge = (isPublished: boolean) => {
    return isPublished ? (
      <Badge className="bg-green-50 text-green-600 border-green-100 hover:bg-green-100">
        Published
      </Badge>
    ) : (
      <Badge className="bg-red-50 text-red-600 border-red-100 hover:bg-red-100">
        Draft
      </Badge>
    );
  };

  const columns: ColumnDef<IBlog>[] = [
    {
      accessorKey: "coverImage",
      header: "Image",
      cell: ({ row }) => (
        <div className="h-10 w-16 relative rounded-md overflow-hidden bg-gray-100">
          {row.original.coverImage && (
            <Image
              src={row.original.coverImage}
              alt={row.original.title}
              fill
              className="object-cover"
            />
          )}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title & Author",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 line-clamp-2">
            {row.original.title}
          </span>
          <span className="text-xs text-gray-500 mt-1">
            By: {row.original.author}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => getCategoryBadge(row.original.category),
    },
    {
      accessorKey: "isPublished",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.isPublished),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
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
          <Link href={`/admin/dashboard/blogs/edit/${row.original._id}`}>
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
          <h1 className="text-2xl font-bold tracking-tight">
            Blog & News Management
          </h1>
          <p className="text-gray-500">
            Create, edit, and publish articles for your website.
          </p>
        </div>
        <Link href="/admin/dashboard/blogs/create">
          <Button className="bg-black text-white hover:bg-gray-800 shadow-md">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search blogs by title or author..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500 hidden md:block">
          Total Posts: {blogs.length}
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={paginatedData}
        />
      )}

      {/* Pagination Controls */}
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
            <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600">
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
