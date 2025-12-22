"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

interface IProduct {
  _id: string;
  name?: string;
  category: "Soft Toy" | "Plastic Toy" | "Baby Accessories" | "Others";
  images: string[];
  description?: string;
  price?: number;
  isFeatured: boolean;
}

const CATEGORIES = [
  "All",
  "Soft Toy",
  "Plastic Toy",
  "Baby Accessories",
  "Others",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Soft Toy": "bg-rose-100 text-rose-600 border border-rose-200",
  "Plastic Toy": "bg-blue-100 text-blue-600 border border-blue-200",
  "Baby Accessories": "bg-amber-100 text-amber-600 border border-amber-200",
  Others: "bg-gray-100 text-gray-600 border border-gray-200",
  Default: "bg-gray-100 text-gray-800 border border-gray-200",
};

const ProductSkeleton = () => (
  <div className="rounded-3xl overflow-hidden bg-gray-100 animate-pulse aspect-square border border-gray-200">
    <div className="h-full w-full bg-gray-200/50" />
  </div>
);

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-brand-red">
          <Loader2 className="animate-spin" />
        </div>
      }>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 1. Logic to sync URL category to State
  useEffect(() => {
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("All");
    }
    setPage(1); // Always reset to page 1 on filter
  }, [categoryFromUrl]);

  // 2. Fetch Logic (Depends on activeCategory)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query: Record<string, any> = { page, limit, sort: sortOption };
      if (searchTerm) query.searchTerm = searchTerm;
      if (activeCategory !== "All") query.category = activeCategory;

      const response = await getAllProducts(query);
      setProducts(response.data || []);
      setTotalPages(response.meta?.totalPage || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, activeCategory, sortOption]);

  // 3. Trigger API call whenever fetchProducts (activeCategory) changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
    // Optional: Sync URL back if user manually changes tab
    window.history.pushState(
      null,
      "",
      cat === "All" ? "/products" : `/products?category=${cat}`
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const openLightbox = (product: IProduct) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  return (
    <main className="bg-white min-h-screen pt-16 md:pt-20 pb-24">
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-red/5 text-brand-red text-xs font-bold uppercase border border-brand-red/10">
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-white pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-105"
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
                className="bg-white px-4 py-3 rounded-xl border border-gray-200 outline-none font-medium text-gray-700 cursor-pointer">
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="py-0 min-h-125">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageOpen
              size={48}
              className="text-gray-300 mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              No products found
            </h3>
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
    </main>
  );
}

// Sub-components (ProductCard, etc.) remained from previous version
const ProductCard = ({
  product,
  onClick,
}: {
  product: IProduct;
  onClick: () => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
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
          CATEGORY_COLORS[product.category] || CATEGORY_COLORS["Default"]
        )}>
        {product.category}
      </span>
    </div>
    {product.isFeatured && (
      <div
        className="absolute top-4 left-4 z-20"
        title="Featured">
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
