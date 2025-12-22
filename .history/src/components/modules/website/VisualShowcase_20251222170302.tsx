"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// =========================================================================
// 📸 DATA
// =========================================================================
const galleryImages = [
  // COLUMN 1 / MOBILE ROW 1
  ["/factory-1.png", "/factory-2.png", "/factory-3.png"],
  // COLUMN 2 / MOBILE ROW 1 & 2 MIX
  ["/factory-4.png", "/factory-5.png", "/factory-6.png"],
  // COLUMN 3 / MOBILE ROW 2
  ["/factory-7.png", "/factory-8.png", "/factory-1.png"],
];

// Combine for Mobile Rows
const allImages = [
  ...galleryImages[0],
  ...galleryImages[1],
  ...galleryImages[2],
];
const mobileRow1 = allImages.slice(0, 5); // First half
const mobileRow2 = allImages.slice(5, 9); // Second half

// --- HEADER COMPONENT ---
const TypewriterTitle = ({ text }: { text: string }) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setKey((prev) => prev + 1), 6000);
    return () => clearInterval(timer);
  }, []);
  const letters = Array.from(text);
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.025, delayChildren: 0.04 * i },
    }),
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
  const child: Variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 20 },
  };
  return (
    <div className="min-h-[60px] flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.h2
          key={key}
          className="text-4xl md:text-5xl font-bold text-brand-red mb-4 drop-shadow-sm"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit">
          {letters.map((letter, index) => (
            <motion.span
              variants={child}
              key={index}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

// --- DESKTOP: VERTICAL COLUMN ---
const InfiniteColumn = ({
  images,
  direction = "down",
  speed = 20,
}: {
  images: string[];
  direction?: "up" | "down";
  speed?: number;
}) => {
  const repeatedImages = [...images, ...images, ...images];
  return (
    <div className="relative h-full overflow-hidden group/col">
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex flex-col gap-6"
        animate={{
          y: direction === "down" ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
        }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}>
        {repeatedImages.map((src, index) => (
          <GalleryItem
            key={index}
            src={src}
            className="h-75 w-full"
          />
        ))}
      </motion.div>
    </div>
  );
};

// --- MOBILE: HORIZONTAL ROW ---
const InfiniteRow = ({
  images,
  direction = "left",
  speed = 20,
}: {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const repeatedImages = [...images, ...images, ...images, ...images]; // Repeat more for horizontal smoothness
  return (
    <div className="relative w-full overflow-hidden group/row">
      {/* Side Gradients for Mobile */}
      <div className="absolute top-0 left-0 h-full w-12 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}>
        {repeatedImages.map((src, index) => (
          // Fixed width for mobile items
          <GalleryItem
            key={index}
            src={src}
            className="h-50 w-50 shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

// --- REUSABLE IMAGE CARD ---
const GalleryItem = ({
  src,
  className,
}: {
  src: string;
  className: string;
}) => (
  <div
    className={`relative rounded-2xl overflow-hidden border border-brand-red/10 shadow-sm group/item ${className}`}>
    <Image
      src={src}
      alt="Gallery Item"
      fill
      className="object-cover transition-transform duration-700 group-hover/item:scale-110"
    />
    <div className="absolute inset-0 bg-linear-to-t from-brand-red/90 via-brand-red/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
    <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-500">
      <div className="w-8 h-1 bg-brand-yellow mb-2 rounded-full" />
      <span className="text-white font-bold tracking-wider uppercase text-sm">
        View
      </span>
    </div>
  </div>
);

const VisualShowcase = () => {
  return (
    <SectionWrapper className="bg-white overflow-hidden relative border-t border-gray-100">
      <div className="absolute top-0 left-0 w-125 h-125 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
          Visual Tour
        </span>
        <TypewriterTitle text="Moments of Craftsmanship" />
        <p className="text-gray-500 mt-2 text-lg font-light">
          Precision manufacturing that never stops.
        </p>
      </div>

      {/* =========================================
          DESKTOP VIEW (Vertical Columns)
          Visible on md (768px) and larger
      ========================================= */}
      <div className="hidden md:grid h-150 lg:h-200 grid-cols-3 gap-8 px-4 overflow-hidden">
        <InfiniteColumn
          images={galleryImages[0]}
          direction="down"
          speed={30}
        />
        <InfiniteColumn
          images={galleryImages[1]}
          direction="up"
          speed={40}
        />
        <InfiniteColumn
          images={galleryImages[2]}
          direction="down"
          speed={35}
        />
      </div>

      {/* =========================================
          MOBILE VIEW (Horizontal Rows)
          Visible on small screens only
      ========================================= */}
      <div className="flex md:hidden flex-col gap-6 w-full overflow-hidden pb-8">
        {/* Row 1: Moves Left */}
        <InfiniteRow
          images={mobileRow1}
          direction="left"
          speed={25}
        />
        {/* Row 2: Moves Right */}
        <InfiniteRow
          images={mobileRow2}
          direction="right"
          speed={30}
        />
      </div>
    </SectionWrapper>
  );
};

export default VisualShowcase;
