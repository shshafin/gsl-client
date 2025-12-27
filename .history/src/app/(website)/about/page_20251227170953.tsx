"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

// --- DATA STRUCTURE ---
const galleryData = [
  {
    id: "cutting",
    title: "Cutting",
    images: [
      "/gallery/cut-1.jpg",
      "/gallery/cut-2.jpg",
      "/gallery/cut-3.jpg",
      "/gallery/cut-4.jpg",
      "/gallery/cut-5.jpg",
      "/gallery/cut-6.jpg",
      "/gallery/cut-7.jpg",
      "/gallery/cut-8.jpg",
      "/gallery/cut-9.jpg",
      "/gallery/cut-10.jpg",
    ],
  },
  {
    id: "embroidery",
    title: "Embroidery",
    images: [
      "/gallery/emb-1.jpg",
      "/gallery/emb-2.jpg",
      "/gallery/emb-3.jpg",
      "/gallery/emb-4.jpg",
      "/gallery/emb-5.jpg",
      "/gallery/emb-6.jpg",
      "/gallery/emb-7.jpg",
      "/gallery/emb-8.jpg",
      "/gallery/emb-9.jpg",
      "/gallery/emb-10.jpg",
    ],
  },
  {
    id: "handwork",
    title: "Hand Work",
    images: [
      "/gallery/hand-1.jpg",
      "/gallery/hand-2.jpg",
      "/gallery/hand-3.jpg",
      "/gallery/hand-4.jpg",
      "/gallery/hand-5.jpg",
      "/gallery/hand-6.jpg",
      "/gallery/hand-7.jpg",
      "/gallery/hand-8.jpg",
      "/gallery/hand-9.jpg",
      "/gallery/hand-10.jpg",
    ],
  },
  {
    id: "packing",
    title: "Packing",
    images: [
      "/gallery/pack-1.jpg",
      "/gallery/pack-2.jpg",
      "/gallery/pack-3.jpg",
      "/gallery/pack-4.jpg",
      "/gallery/pack-5.jpg",
      "/gallery/pack-6.jpg",
      "/gallery/pack-7.jpg",
      "/gallery/pack-8.jpg",
      "/gallery/pack-9.jpg",
      "/gallery/pack-10.jpg",
    ],
  },
  {
    id: "qc",
    title: "Quality Control",
    images: [
      "/gallery/qc-1.jpg",
      "/gallery/qc-2.jpg",
      "/gallery/qc-3.jpg",
      "/gallery/qc-4.jpg",
      "/gallery/qc-5.jpg",
      "/gallery/qc-6.jpg",
      "/gallery/qc-7.jpg",
      "/gallery/qc-8.jpg",
      "/gallery/qc-9.jpg",
      "/gallery/qc-10.jpg",
    ],
  },
  {
    id: "store",
    title: "Store",
    images: [
      "/gallery/store-1.jpg",
      "/gallery/store-2.jpg",
      "/gallery/store-3.jpg",
      "/gallery/store-4.jpg",
      "/gallery/store-5.jpg",
      "/gallery/store-6.jpg",
      "/gallery/store-7.jpg",
      "/gallery/store-8.jpg",
      "/gallery/store-9.jpg",
      "/gallery/store-10.jpg",
    ],
  },
  {
    id: "stuffing",
    title: "Stuffing",
    images: [
      "/gallery/stuff-1.jpg",
      "/gallery/stuff-2.jpg",
      "/gallery/stuff-3.jpg",
      "/gallery/stuff-4.jpg",
      "/gallery/stuff-5.jpg",
      "/gallery/stuff-6.jpg",
      "/gallery/stuff-7.jpg",
      "/gallery/stuff-8.jpg",
      "/gallery/stuff-9.jpg",
      "/gallery/stuff-10.jpg",
    ],
  },
  {
    id: "sewing",
    title: "Sewing",
    images: [
      "/gallery/sew-1.jpg",
      "/gallery/sew-2.jpg",
      "/gallery/sew-3.jpg",
      "/gallery/sew-4.jpg",
      "/gallery/sew-5.jpg",
      "/gallery/sew-6.jpg",
      "/gallery/sew-7.jpg",
      "/gallery/sew-8.jpg",
      "/gallery/sew-9.jpg",
      "/gallery/sew-10.jpg",
    ],
  },
];

export const WorkSectionGallery = () => {
  const [activeCategory, setActiveCategory] = useState<null | number>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCategory === null) return;
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "Escape") setActiveCategory(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCategory, currentImgIndex]);

  const nextImg = () => {
    if (activeCategory === null) return;
    setCurrentImgIndex(
      (prev) => (prev + 1) % galleryData[activeCategory].images.length
    );
  };

  const prevImg = () => {
    if (activeCategory === null) return;
    setCurrentImgIndex((prev) =>
      prev === 0 ? galleryData[activeCategory].images.length - 1 : prev - 1
    );
  };

  return (
    <SectionWrapper className="bg-gray-50 py-24">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
          Production Excellence
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
          Our <span className="text-brand-red">Departments</span>
        </h2>
      </div>

      {/* --- BENTO GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
        {galleryData.map((dept, idx) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => {
              setActiveCategory(idx);
              setCurrentImgIndex(0);
            }}
            className={cn(
              "group relative rounded-[2rem] overflow-hidden cursor-pointer bg-white shadow-xl",
              idx === 0 || idx === 7 ? "md:col-span-2" : "col-span-1" // Bento logic
            )}>
            <Image
              src={dept.images[0]}
              alt={dept.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white text-xl md:text-3xl font-black uppercase tracking-tight">
                    {dept.title}
                  </h3>
                  <p className="text-brand-yellow text-xs font-bold">
                    {dept.images.length}+ Assets
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <Maximize2 size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- FULLSCREEN GALLERY MODAL --- */}
      <AnimatePresence>
        {activeCategory !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10">
            {/* Close Button */}
            <button
              onClick={() => setActiveCategory(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]">
              <X
                size={40}
                strokeWidth={1}
              />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImg}
              className="absolute left-4 md:left-10 text-white/30 hover:text-white z-[110] transition-all">
              <ChevronLeft
                size={60}
                strokeWidth={1}
              />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-4 md:right-10 text-white/30 hover:text-white z-[110] transition-all">
              <ChevronRight
                size={60}
                strokeWidth={1}
              />
            </button>

            {/* Image Stage */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImgIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="relative w-full h-[70vh] md:h-[80vh]">
                  <Image
                    src={galleryData[activeCategory].images[currentImgIndex]}
                    alt="Gallery item"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Progress & Title */}
              <div className="mt-8 text-center">
                <h4 className="text-white text-2xl font-black uppercase tracking-widest mb-2">
                  {galleryData[activeCategory].title}
                </h4>
                <div className="flex gap-2 justify-center">
                  {galleryData[activeCategory].images.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1 transition-all duration-300 rounded-full",
                        i === currentImgIndex
                          ? "w-8 bg-brand-red"
                          : "w-2 bg-white/20"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};
