"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, Trash, Star, StarOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { getAllProducts, deleteProduct } from "@/services/ProductService";
import { IProduct } from "@/types/product.types";

export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Function
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      if (res.success) {
        setProducts(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Delete Handler
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    }
  };

  // 3. Define Table Columns (Matched to Backend Interface)
  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.images?.[0];
        return (
          <div className="h-12 w-12 relative rounded border overflow-hidden bg-gray-50">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Product"
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                No Img
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.category}</Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.original.price;
        return price ? (
          <span>${price}</span>
        ) : (
          <span className="text-gray-400 text-xs">N/A</span>
        );
      },
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) => {
        return row.original.isFeatured ? (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white gap-1">
            <Star className="h-3 w-3 fill-current" /> Featured
          </Badge>
        ) : (
          <span className="text-gray-400 text-xs">Standard</span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <div className="flex gap-2">
            <Link href={`/admin/dashboard/products/edit/${id}`}>
              <Button
                variant="outline"
                size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-gray-500">Manage your toy inventory</p>
        </div>
        <Link href="/admin/dashboard/products/create">
          <Button className="bg-black hover:bg-gray-800">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="h-40 flex items-center justify-center text-gray-500">
          Loading products...
        </div>
      ) : (
        <GSLTable
          columns={columns}
          data={products}
        />
      )}
    </div>
  );
}
