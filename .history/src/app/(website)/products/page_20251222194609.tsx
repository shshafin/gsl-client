"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PackageOpen,
  ArrowUpRight,
  SortAsc,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getAllProducts } from "@/services/"; // Adjust path
import { cn } from "@/lib/utils";

// --- TYPES ---
interface IProduct {
  _id: string;
  name?: string;
  category: "Soft Toy" | "Plastic Toy" | "Baby Accessories" | "Others";
  images: string[];
  description?: string;
  price?: number;
  isFeatured: boolean;
}

// --- CATEGORIES ---
const CATEGORIES = [
  "All",
  "Soft Toy",
  "Plastic Toy",
  "Baby Accessories",
  "Others",
];

// --- SKELETON LOADER ---
const ProductSkeleton = () => (
  <div className="rounded-3xl overflow-hidden bg-gray-100 animate-pulse aspect-square border border-gray-200">
    <div className="h-full w-full bg-gray-200/50" />
  </div>
);

export default function ProductsPage() {
  // --- STATE ---
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("-createdAt"); // Default: Newest first

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12; // Products per page

  // --- FETCH DATA ---
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query: Record<string, any> = {
        page,
        limit,
        sort: sortOption,
      };

      if (searchTerm) query.searchTerm = searchTerm;
      if (activeCategory !== "All") query.category = activeCategory;

      const response = await getAllProducts(query);

      // Handle backend response structure
      // Assuming structure: { data: [...], meta: { totalPage: 5, ... } }
      const productList = response.data || [];
      const meta = response.meta || {};

      setProducts(productList);
      setTotalPages(meta.totalPage || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, activeCategory, sortOption]);

  // Effect to trigger fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- HANDLERS ---
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1); // Reset to page 1 on filter change
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <main className="bg-white min-h-screen pt-24 md:pt-32 pb-24">
      {/* =========================================
          1. HEADER & CONTROLS
      ========================================= */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-red/5 text-brand-red text-xs font-bold uppercase tracking-widest mb-4 border border-brand-red/10">
            <PackageOpen size={14} />
            Our Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
            Explore <span className="text-brand-red">Possibilities</span>
          </h1>
        </div>

        {/* --- TOOLBAR (Search & Filter) --- */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 p-4 rounded-[2rem] border border-gray-100 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-white pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all"
              />
            </div>

            {/* Category Tabs (Desktop) */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  )}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Mobile Category Dropdown (Visible only on small screens) */}
              <select
                className="md:hidden flex-1 bg-white px-4 py-3 rounded-xl border border-gray-200 outline-none font-medium text-gray-700"
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <option
                    key={cat}
                    value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="relative shrink-0">
                <SortAsc
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white pl-10 pr-8 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-red font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                  <option value="-createdAt">Newest</option>
                  <option value="createdAt">Oldest</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. PRODUCT GRID
      ========================================= */}
      <SectionWrapper className="py-0 min-h-[500px]">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <PackageOpen
                size={48}
                className="text-gray-300"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              No products found
            </h3>
            <p className="text-gray-400">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="mt-6 text-brand-red font-bold hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* =========================================
            3. PAGINATION
        ========================================= */}
        {!loading && products.length > 0 && (
          <div className="mt-20 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {/* Simple Page Indicator */}
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Page <span className="text-gray-900 text-lg">{page}</span> of{" "}
                {totalPages}
              </span>
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </SectionWrapper>
    </main>
  );
}

// --- PRODUCT CARD COMPONENT ---
// Displays Image Only by default. Details reveal on Hover.
const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
      <Link
        href={`/products/${product._id}`}
        className="block w-full h-full">
        {/* IMAGE */}
        <Image
          src={product.images[0] || "/placeholder-toy.jpg"}
          alt={product.name || "Product Image"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* OVERLAY (Only visible on hover) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          {/* Category Tag */}
          <span className="inline-block px-3 py-1 rounded-full bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest w-fit mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {product.category}
          </span>

          {/* Name (If exists, otherwise placeholder) */}
          <h3 className="text-white font-bold text-lg md:text-xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {product.name || "View Details"}
          </h3>

          {/* View Button */}
          <div className="mt-4 flex items-center gap-2 text-brand-yellow text-sm font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            View Product <ArrowUpRight size={16} />
          </div>
        </div>

        {/* DEFAULT STATE (Clean, no text, maybe just a 'Featured' badge if applicable) */}
        {product.isFeatured && (
          <div className="absolute top-4 right-4 bg-brand-yellow text-brand-red text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-lg z-10">
            New
          </div>
        )}
      </Link>
    </motion.div>
  );
};
