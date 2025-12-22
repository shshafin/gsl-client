"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  User,
  Clock,
  ArrowRight,

  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllBlogs } from "@/services/BlogService"; // Adjust path

// --- TYPES ---
interface IBlog {
  _id: string;
  title: string;
  content: string; // HTML string
  coverImage: string;
  category: "News" | "Event" | "Tips" | "Stories";
  author: string;
  createdAt: string;
}

// --- CONFIG ---
const CATEGORIES = ["All", "News", "Event", "Tips", "Stories"];

const CATEGORY_STYLES: Record<string, string> = {
  News: "bg-blue-100 text-blue-700 border-blue-200",
  Event: "bg-purple-100 text-purple-700 border-purple-200",
  Tips: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Stories: "bg-amber-100 text-amber-700 border-amber-200",
};

// --- HELPERS ---
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  // Strip HTML tags to count words
  const text = content.replace(/<[^>]*>?/gm, "");
  const words = text.split(/\s/g).length;
  return Math.ceil(words / wordsPerMinute);
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function NewsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBlogs();
        // Assuming response.data is the array. Adjust if response structure is different.
        const sorted = (response.data || []).sort(
          (a: IBlog, b: IBlog) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBlogs(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Split into Hero (First Item) and Grid (Rest)
  const heroPost = filteredBlogs[0];
  const gridPosts = filteredBlogs.slice(1);

  return (
    <main className="bg-white min-h-screen pt-24 md:pt-32 pb-24">
      {/* --- HEADER --- */}
      <section className="px-4 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-red/5 text-brand-red text-xs font-bold uppercase tracking-widest mb-6 border border-brand-red/10">
            <Newspaper size={14} />
            The Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-8">
            Stories, Updates &{" "}
            <span className="text-brand-red">Parenting Tips</span>
          </h1>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 p-2 rounded-[2rem] border border-gray-100 max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto p-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-white text-gray-900 shadow-md scale-105"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                  )}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64 px-2">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 outline-none text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT AREA --- */}
      <section className="px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="space-y-8">
            <div className="h-100 bg-gray-100 rounded-3xl animate-pulse" />
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-100 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <h3 className="text-xl font-bold text-gray-400">
              No stories found
            </h3>
          </div>
        ) : (
          <>
            {/* HERO POST (Only show if on page 1 / no search active for best UX, or just always show first result) */}
            {heroPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 group relative rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-gray-900 text-white shadow-2xl">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <Image
                    src={heroPost.coverImage}
                    alt={heroPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent lg:bg-linear-to-r" />
                </div>

                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/10"
                      )}>
                      {heroPost.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                      <Clock size={12} />{" "}
                      {calculateReadingTime(heroPost.content)} min read
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight group-hover:text-brand-red transition-colors duration-300">
                    {heroPost.title}
                  </h2>

                  <div
                    className="prose prose-invert line-clamp-3 text-gray-300 mb-8"
                    dangerouslySetInnerHTML={{
                      __html: heroPost.content.substring(0, 150) + "...",
                    }}
                  />

                  <Link
                    href={`/news/${heroPost._id}`}
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-brand-red hover:text-white transition-all">
                    Read Article <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* MASONRY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {gridPosts.map((blog) => (
                  <motion.div
                    key={blog._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Image */}
                    <Link
                      href={`/news/${blog._id}`}
                      className="relative h-60 overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                            CATEGORY_STYLES[blog.category]
                          )}>
                          {blog.category}
                        </span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {formatDate(blog.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} /> {blog.author}
                        </span>
                      </div>

                      <Link href={`/news/${blog._id}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-brand-red transition-colors">
                          {blog.title}
                        </h3>
                      </Link>

                      {/* Text Snippet */}
                      <div
                        className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1"
                        dangerouslySetInnerHTML={{
                          // Strip HTML for the preview
                          __html:
                            blog.content
                              .replace(/<[^>]+>/g, "")
                              .substring(0, 100) + "...",
                        }}
                      />

                      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                        <span className="text-xs font-bold text-gray-400">
                          {calculateReadingTime(blog.content)} min read
                        </span>
                        <Link
                          href={`/news/${blog._id}`}
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-black group-hover:text-white transition-all">
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
