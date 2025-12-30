/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
  SortAsc,
  X,
  Crown,
  Loader2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getAllProducts } from "@/services/ProductService";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Soft Toy", "Pet Toy", "Baby Accessories", "Others"];

const CATEGORY_COLORS: Record<string, string> = {
  "Soft Toy": "bg-rose-100 text-rose-600 border border-rose-200",
  "Pet Toy": "bg-blue-100 text-blue-600 border border-blue-200",
  "Baby Accessories": "bg-amber-100 text-amber-600 border border-amber-200",
  Others: "bg-gray-100 text-gray-600 border border-gray-200",
  Default: "bg-gray-100 text-gray-800 border border-gray-200",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-brand-red" />
        </div>
      }>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Reactive URL States
  const categoryFromUrl = searchParams.get("category") || "All";
  const searchFromUrl = searchParams.get("searchTerm") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // FETCH FUNCTION
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query: Record<string, any> = {
        page,
        limit: 12,
        sort: sortOption,
      };

      // Apply URL filters to API Query
      if (searchFromUrl) query.searchTerm = searchFromUrl;
      if (categoryFromUrl !== "All") query.category = categoryFromUrl;

      const response = await getAllProducts(query);
      setProducts(response.data || []);
      setTotalPages(response.meta?.totalPage || 1);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  }, [page, searchFromUrl, categoryFromUrl, sortOption]);

  // TRIGGER FETCH: When URL or Sort changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (!e.target.value) params.delete("searchTerm");
    else params.set("searchTerm", e.target.value);
    router.replace(`/products?${params.toString()}`);
  };

  const openLightbox = (product: any) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  return (
    <main className="bg-white min-h-screen pt-16 md:pt-20 pb-24">
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-red/5 text-brand-red text-xs font-bold uppercase border border-brand-red/10 mb-4">
            <PackageOpen size={14} /> Our Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
            Explore <span className="text-brand-red">Possibilities</span>
          </h1>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 p-4 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="relative w-full md:w-96 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                defaultValue={searchFromUrl}
                onChange={handleSearch}
                className="w-full bg-white pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-red transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                    categoryFromUrl === cat
                      ? "bg-brand-red text-white shadow-lg scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                  )}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <SortAsc
                className="text-gray-400"
                size={18}
              />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white px-4 py-3 rounded-xl border border-gray-200 outline-none text-gray-700 cursor-pointer">
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="py-0 min-h-125">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageOpen
              size={48}
              className="text-gray-300 mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-400">
              No products found
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => openLightbox(product)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </SectionWrapper>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
              <X size={32} />
            </button>
            <div className="relative w-full max-w-5xl h-[85vh] flex flex-col items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={selectedProduct.images[0]}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                <p className="text-gray-400 text-sm">
                  {selectedProduct.category}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const ProductCard = ({
  product,
  onClick,
}: {
  product: any;
  onClick: () => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    onClick={onClick}
    className="group relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 cursor-zoom-in shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-200">
    <Image
      src={product.images[0] || "/placeholder-toy.jpg"}
      alt={product.name || "Product"}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    <div className="absolute bottom-4 left-4 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 z-20">
      <span
        className={cn(
          "inline-block rounded-full backdrop-blur-sm font-bold uppercase tracking-widest shadow-sm px-2 py-0.5 text-[8px] md:px-3 md:py-1 md:text-[10px]",
          CATEGORY_COLORS[product.category as string] ||
            CATEGORY_COLORS["Default"]
        )}>
        {product.category}
      </span>
    </div>
    {product.isFeatured && (
      <div className="absolute top-4 left-4 z-20">
        <div className="relative flex items-center justify-center rounded-full bg-linear-to-br from-yellow-300 via-yellow-500 to-yellow-600 shadow-lg border border-white/20 group-hover:scale-110 transition-transform w-8 h-8 md:w-10 md:h-10">
          <Crown
            className="text-white drop-shadow-sm w-3.5 h-3.5 md:w-4.5 md:h-4.5"
            fill="currentColor"
          />
        </div>
      </div>
    )}
  </motion.div>
);
