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

// --- TYPES & CONFIG ---
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

// --- SKELETON ---
const ProductSkeleton = () => (
  <div className="rounded-3xl overflow-hidden bg-gray-100 animate-pulse aspect-square border border-gray-200">
    <div className="h-full w-full bg-gray-200/50" />
  </div>
);

// --- MAIN WRAPPER WITH SUSPENSE ---
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

// --- ACTUAL CONTENT COMPONENT ---
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

  // 1. Sync URL Category to State
  useEffect(() => {
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("All");
    }
  }, [categoryFromUrl]);

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

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProduct.images.length
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <main className="bg-white min-h-screen pt-16 md:pt-20 pb-24">
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-red/5 text-brand-red text-xs font-bold uppercase tracking-widest mb-4 border border-brand-red/10">
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
              <div className="relative shrink-0 w-full md:w-auto">
                <SortAsc
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none w-full md:w-auto bg-white pl-10 pr-8 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-red font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
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

        {!loading && products.length > 0 && (
          <div className="mt-20 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red disabled:opacity-30 transition-all">
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Page <span className="text-gray-900 text-lg">{page}</span> of{" "}
              {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red disabled:opacity-30 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </SectionWrapper>

      <AnimatePresence>
        {lightboxOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition-all z-50">
              <X size={32} />
            </button>
            <div className="relative w-full max-w-5xl h-[85vh] flex flex-col items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {selectedProduct.images.length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-0 md:-left-12 p-3 text-white hover:text-brand-yellow z-20 bg-black/20 rounded-full">
                    <ChevronLeft size={36} />
                  </button>
                )}
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  src={
                    selectedProduct.images[currentImageIndex] ||
                    "/placeholder-toy.jpg"
                  }
                  alt={selectedProduct.name}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                />
                {selectedProduct.images.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-0 md:-right-12 p-3 text-white hover:text-brand-yellow z-20 bg-black/20 rounded-full">
                    <ChevronRight size={36} />
                  </button>
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-bold tracking-wide">
                  {selectedProduct.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {selectedProduct.category}
                </p>
              </div>
              {selectedProduct.images.length > 1 && (
                <div className="mt-6 flex gap-3 overflow-x-auto pb-2 max-w-full">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                        currentImageIndex === idx
                          ? "border-brand-yellow opacity-100"
                          : "border-transparent opacity-50 hover:opacity-100"
                      )}>
                      <Image
                        src={img}
                        alt="thumb"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
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
        <div className="relative flex items-center justify-center rounded-full bg-linear-to-br from-yellow-300 via-yellow-500 to-yellow-600 shadow-[0_4px_15px_rgba(234,179,8,0.5)] border border-white/20 group-hover:scale-110 transition-transform w-8 h-8 md:w-10 md:h-10">
          <div className="absolute inset-0 rounded-full bg-linear-to-t from-transparent to-white/20" />
          <Crown
            className="text-white drop-shadow-sm w-3.5 h-3.5 md:w-4.5 md:h-4.5"
            fill="currentColor"
            strokeWidth={1.5}
          />
        </div>
      </div>
    )}
  </motion.div>
);
