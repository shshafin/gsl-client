"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, Trash, Eye, Crown } from "lucide-react";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// Carousel Imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllProducts, deleteProduct } from "@/services/ProductService";
import { IProduct, TProductCategory } from "@/types/product.types";

export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
          <Badge className="bg-linear-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-sm gap-1 pl-1.5 pr-2.5">
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
          {/* 👁️ Premium View Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="h-8 w-8 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 shadow-none border border-blue-200">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden">
              <div className="flex flex-col md:flex-row h-[600px]">
                {/* Left: Image Carousel (Full Height) */}
                <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                  {row.original.images && row.original.images.length > 0 ? (
                    <Carousel className="w-full max-w-xs">
                      <CarouselContent>
                        {row.original.images.map((img, index) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-square w-full rounded-lg overflow-hidden border bg-white shadow-sm">
                              <Image
                                src={img}
                                alt="Product"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  ) : (
                    <div className="text-gray-400">No Images Available</div>
                  )}
                </div>

                {/* Right: Details (Scrollable) */}
                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                  <Badge
                    className={`w-fit mb-4 ${getCategoryColor(
                      row.original.category
                    )}`}>
                    {row.original.category}
                  </Badge>

                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {row.original.name}
                  </h2>
                  <p className="text-2xl font-mono text-gray-700 mb-6">
                    ${row.original.price || "N/A"}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed mt-1">
                        {row.original.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <span className="text-xs font-uppercase text-gray-400 tracking-wider">
                          STATUS
                        </span>
                        <p className="font-medium text-gray-900">
                          {row.original.isFeatured
                            ? "Featured Product"
                            : "Standard Product"}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-uppercase text-gray-400 tracking-wider">
                          STOCK ID
                        </span>
                        <p className="font-medium text-gray-900 font-mono">
                          #{row.original._id.slice(-6).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* ✏️ Edit Button (Orange) */}
          <Link href={`/admin/dashboard/products/edit/${row.original._id}`}>
            <Button
              size="icon"
              className="h-8 w-8 bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700 shadow-none border border-orange-200">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>

          {/* 🗑️ Delete Button (Red) */}
          <Button
            size="icon"
            className="h-8 w-8 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 shadow-none border border-red-200"
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
