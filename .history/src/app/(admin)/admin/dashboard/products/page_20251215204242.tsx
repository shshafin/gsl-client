/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, Trash, Star } from "lucide-react";
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

import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton"; // 👈 Better Loading
import { getAllProducts, deleteProduct } from "@/services/ProductService";
import { IProduct } from "@/types/product.types";

export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // State for Delete Modal
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
      setDeleteId(null); // Close modal
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const img = row.original.images?.[0];
        return (
          <div className="h-12 w-12 relative rounded border overflow-hidden bg-gray-50">
            {img ? (
              <Image
                src={img}
                alt="Prod"
                fill
                className="object-cover"
              />
            ) : null}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category}</Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) =>
        row.original.price ? `$${row.original.price}` : "N/A",
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) =>
        row.original.isFeatured && (
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`/admin/dashboard/products/edit/${row.original._id}`}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          {/* Open Modal on Click */}
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8"
            onClick={() => setDeleteId(row.original._id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/dashboard/products/create">
          <Button className="bg-black">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Better Loading State */}
      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={products}
        />
      )}

      {/* Custom Delete Modal */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from the database.
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
