"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Image as ImageIcon,
  File,
  Download,
  Calendar,
  PackageOpen,
  ChevronDown,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllResources } from "@/services/ResourceService"; // Adjust path to where you saved the frontend api code

// --- TYPES ---
interface IResource {
  _id: string;
  title: string;
  fileUrl: string;
  createdAt: string;
}

// --- STATIC FAQS (Since these aren't in DB yet, we keep them static) ---
const FAQS = [
  {
    question: "How do I download these files?",
    answer:
      "Simply click the download button on any resource card. The file will open in a new tab or download automatically depending on your browser settings.",
  },
  {
    question: "Are these documents up to date?",
    answer:
      "Yes, our team regularly updates manuals and safety guides. The 'Added on' date shows the last upload time.",
  },
  {
    question: "I can't open a PDF file.",
    answer:
      "Please ensure you have a PDF reader installed, such as Adobe Acrobat, or try opening the file in a modern browser like Chrome or Edge.",
  },
];

export default function ResourcesPage() {
  // --- STATE ---
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllResources();
        // Assuming response.data contains the array based on standard API patterns
        // If your API returns the array directly, use setResources(response)
        setResources(response.data || []);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- HELPERS ---
  const filteredResources = resources.filter((res) =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine Icon based on file extension from URL
  const getFileIcon = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "webp"].includes(ext || ""))
      return <ImageIcon size={24} />;
    if (["pdf"].includes(ext || "")) return <FileText size={24} />;
    return <File size={24} />;
  };

  const getFileColor = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (["pdf"].includes(ext || ""))
      return "bg-rose-50 text-rose-600 group-hover:bg-rose-100";
    if (["jpg", "jpeg", "png", "webp"].includes(ext || ""))
      return "bg-blue-50 text-blue-600 group-hover:bg-blue-100";
    return "bg-gray-50 text-gray-600 group-hover:bg-gray-100";
  };

  // Format Date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="bg-white min-h-screen pt-24 md:pt-32 pb-24">
      {/* =========================================
          1. HERO SECTION
      ========================================= */}
      <section className="px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-red/5 text-brand-red text-xs font-bold uppercase tracking-widest mb-6 border border-brand-red/10">
            <Sparkles size={14} />
            Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
            Resources & <span className="text-brand-red">Downloads</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Access product manuals, safety certificates, and important
            documents.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-brand-red/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search resources by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 outline-none transition-all text-gray-800 placeholder:text-gray-400 font-medium shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. RESOURCES GRID
      ========================================= */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            // SKELETON LOADER
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-50 rounded-2xl animate-pulse border border-gray-100"
                />
              ))}
            </div>
          ) : filteredResources.length === 0 ? (
            // EMPTY STATE
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <PackageOpen
                  size={32}
                  className="text-gray-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-400 max-w-sm mx-auto">
                We couldn&apos;t find anything matching &quot;{searchTerm}
                &quot;. Try a different keyword.
              </p>
            </div>
          ) : (
            // GRID LIST
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                      {/* Icon Container */}
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0",
                          getFileColor(resource.fileUrl)
                        )}>
                        {getFileIcon(resource.fileUrl)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-bold text-gray-900 truncate pr-2 group-hover:text-brand-red transition-colors"
                          title={resource.title}>
                          {resource.title}
                        </h3>

                        <div className="flex items-center gap-2 mt-2 text-xs font-medium text-gray-400">
                          <Calendar size={12} />
                          <span>Added {formatDate(resource.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Download Button Area */}
                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {resource.fileUrl.split(".").pop()?.toUpperCase()} File
                      </span>

                      <a
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-brand-red transition-colors shadow-lg shadow-gray-200 group-hover:shadow-brand-red/20">
                        <Download size={14} />
                        Download
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          3. FAQ SECTION (Static but nice)
      ========================================= */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  openFaqIndex === idx
                    ? "bg-white border-gray-200 shadow-lg scale-[1.02]"
                    : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200"
                )}>
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between p-6 text-left">
                  <span
                    className={cn(
                      "font-bold text-lg transition-colors",
                      openFaqIndex === idx ? "text-brand-red" : "text-gray-800"
                    )}>
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      openFaqIndex === idx
                        ? "bg-brand-red text-white rotate-180"
                        : "bg-gray-200 text-gray-500"
                    )}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}>
                      <div className="px-6 pb-6 text-gray-500 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
