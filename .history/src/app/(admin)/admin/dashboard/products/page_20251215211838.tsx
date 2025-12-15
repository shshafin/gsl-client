/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { 
  Edit, Plus, Trash, Eye, Crown, 
  Search, Filter, ChevronLeft, ChevronRight, RotateCcw 
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // npx shadcn@latest add input
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogTrigger,
} from "@/components/ui/dialog";
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
  // Data State
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 🔍 Query State
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("-createdAt"); // Default: Newest first
  
  // 📄 Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [meta, setMeta] = useState({ total: 0, totalPage: 1 });

  // Helper: Category Colors
  const getCategoryColor = (cat: TProductCategory) => {
    switch (cat) {
      case "Plush": return "bg-pink-100 text-pink-800 border-pink-200";
      case "Plastic": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Wooden": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Electronic": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Educational": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // 🔄 Fetch Logic
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Pass all our state variables to the service
      const query = {
        searchTerm,
        category,
        sort,
        page,
        limit,
      };

      const res = await getAllProducts(query);
      if (res.success) {
        setProducts(res.data);
        // Assuming your backend returns meta info
        if (res.meta) {
          setMeta(res.meta);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when any filter changes
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, page]); 
  // Note: We don't put searchTerm here to avoid API call on every keystroke. 
  // We will trigger search manually or via debounce.

  // 🗑️ Delete Logic
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

  // 📋 Columns Definition
  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="h-12 w-12 relative rounded-md border overflow-hidden bg-gray-50">
          {row.original.images?.[0] ? (
            <Image src={row.original.images[0]} alt="Prod" fill className="object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">No Img</div>
          )}
        </div>
      ),
    },
    { accessorKey: "name", header: "Name", cell: ({ row }) => <span className="font-semibold text-gray-700">{row.original.name}</span> },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className={`border ${getCategoryColor(row.original.category)}`}>
          {row.original.category}
        </Badge>
      ),
    },
    { accessorKey: "price", header: "Price", cell: ({ row }) => row.original.price ? <span className="font-mono">${row.original.price}</span> : "--" },
    {
      accessorKey: "isFeatured",
      header: "Status",
      cell: ({ row }) => row.original.isFeatured ? (
        <Badge className="bg-linear-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-sm gap-1 pl-1.5 pr-2.5">
          <Crown className="h-3.5 w-3.5" /> Featured
        </Badge>
      ) : <span className="text-gray-400 text-xs pl-2">Standard</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* View Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" className="h-8 w-8 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 shadow-none border border-blue-200">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden">
               <div className="flex flex-col md:flex-row h-[600px]">
                <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                  {row.original.images && row.original.images.length > 0 ? (
                    <Carousel className="w-full max-w-xs">
                      <CarouselContent>
                        {row.original.images.map((img, index) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-square w-full rounded-lg overflow-hidden border bg-white shadow-sm">
                              <Image src={img} alt="Product" fill className="object-contain" />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  ) : <div className="text-gray-400">No Images</div>}
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                  <Badge className={`w-fit mb-4 ${getCategoryColor(row.original.category)}`}>{row.original.category}</Badge>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{row.original.name}</h2>
                  <p className="text-2xl font-mono text-gray-700 mb-6">${row.original.price || "N/A"}</p>
                  <p className="text-gray-600 leading-relaxed">{row.original.description}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Link href={`/admin/dashboard/products/edit/${row.original._id}`}>
            <Button size="icon" className="h-8 w-8 bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700 shadow-none border border-orange-200">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          
          <Button 
            size="icon" 
            className="h-8 w-8 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 shadow-none border border-red-200"
            onClick={() => setDeleteId(row.original._id)} 
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // 🧹 Reset Filters
  const handleReset = () => {
    setSearchTerm("");
    setCategory("all");
    setSort("-createdAt");
    setPage(1);
    fetchProducts(); // Manually trigger fetch
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-gray-500">Manage inventory ({meta.total} total)</p>
        </div>
        <Link href="/admin/dashboard/products/create">
          <Button className="bg-black text-white hover:bg-gray-800 shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      {/* 🛠️ Filters Bar */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Left: Search */}
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search products..." 
              className="pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProducts()} 
            />
          </div>
          <Button variant="secondary" onClick={fetchProducts}>Search</Button>
        </div>

        {/* Right: Filters */}
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-37.5">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Plush">Plush</SelectItem>
              <SelectItem value="Plastic">Plastic</SelectItem>
              <SelectItem value="Educational">Educational</SelectItem>
              <SelectItem value="Electronic">Electronic</SelectItem>
              <SelectItem value="Wooden">Wooden</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">Newest First</SelectItem>
              <SelectItem value="createdAt">Oldest First</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="-price">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={handleReset} title="Reset Filters">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      {loading ? <TableSkeleton /> : <GSLTable columns={columns} data={products} />}

      {/* 📄 Pagination Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
        <p className="text-sm text-gray-500">
          Showing page {page} of {meta.totalPage}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={page === meta.totalPage}
            onClick={() => setPage(p => p + 1)}
          >
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Delete Modal (Hidden) */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}