/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, Trash, Eye, Crown } from "lucide-react"; // Crown for Golden Badge
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllProducts, deleteProduct } from "@/services/ProductService";
import { IProduct, TProductCategory } from "@/types/product.types";

export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 1. Category Color Helper
  const getCategoryColor = (category: TProductCategory) => {
    switch (category) {
      case "Plush":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "Plastic":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Wooden":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Electronic":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Educational":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      if (res.success) setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct(deleteId);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error: any) {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="h-12 w-12 relative rounded-md border overflow-hidden bg-gray-50">
          {row.original.images?.[0] ? (
            <Image
              src={row.original.images[0]}
              alt="Prod"
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
              No Img
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-700">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`border ${getCategoryColor(row.original.category)}`}>
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) =>
        row.original.price ? (
          <span className="font-mono">${row.original.price}</span>
        ) : (
          "--"
        ),
    },
    {
      accessorKey: "isFeatured",
      header: "Status",
      cell: ({ row }) =>
        row.original.isFeatured ? (
          // 🏆 Golden Badge
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-sm gap-1 pl-1.5 pr-2.5">
            <Crown className="h-3.5 w-3.5" /> Featured
          </Badge>
        ) : (
          <span className="text-gray-400 text-xs pl-2">Standard</span>
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* 👁️ View Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{row.original.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="relative h-64 w-full rounded-lg overflow-hidden border">
                  {row.original.images?.[0] && (
                    <Image
                      src={row.original.images[0]}
                      alt="Product"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Category
                    </p>
                    <p>{row.original.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Price</p>
                    <p>${row.original.price || "N/A"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Description
                  </p>
                  <p className="text-sm text-gray-600">
                    {row.original.description}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Link href={`/admin/dashboard/products/edit/${row.original._id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-orange-600 hover:bg-orange-50">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
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
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-gray-500">Manage your inventory</p>
        </div>
        <Link href="/admin/dashboard/products/create">
          <Button className="bg-black text-white hover:bg-gray-800 shadow-md transition-all">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={products}
        />
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <b>{products.find((p) => p._id === deleteId)?.name}</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
