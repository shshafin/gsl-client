"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

// =========================================================================
// 📸 DATA: Local Images
// =========================================================================
const galleryImages = [
  // COLUMN 1 (Slides DOWN)
  ["/factory-1.png", "/factory-2.png", "/factory-3.png"],
  // COLUMN 2 (Slides UP)
  ["/factory-4.png", "/factory-5.png", "/factory-6.png"],
  // COLUMN 3 (Slides DOWN)
  ["/factory-7.png", "/factory-8.png", "/factory-1.png"],
];

// --- TYPEWRITER HEADER ---
const TypewriterTitle = ({ text }: { text: string }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 6000);
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

// --- INFINITE COLUMN COMPONENT ---
const InfiniteColumn = ({
  images,
  direction = "down",
  speed = 20,
}: {
  images: string[];
  direction?: "up" | "down";
  speed?: number;
}) => {
  // Triple the images to ensure absolutely no gaps during loop
  const repeatedImages = [...images, ...images, ...images];

  return (
    <div className="relative h-full overflow-hidden group/col pointer-events-auto">
      {/* Top/Bottom Gradient Masks for Smooth Fade In/Out */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex flex-col gap-6"
        animate={{
          y: direction === "down" ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        // PAUSE ON HOVER (Optional - remove this line if you want continuous movement even on hover)
        whileHover={{ animationPlayState: "paused" }}>
        {repeatedImages.map((src, index) => (
          <div
            key={index}
            className="relative h-[300px] w-full shrink-0 rounded-2xl overflow-hidden border border-brand-red/10 shadow-sm group/item">
            <Image
              src={src}
              alt="Gallery Item"
              fill
              className="object-cover transition-transform duration-700 group-hover/item:scale-110"
            />

            {/* Hover Overlay (Red & Yellow) */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-red/90 via-brand-red/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />

            {/* Hover Text */}
            <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-500">
              <div className="w-8 h-1 bg-brand-yellow mb-2 rounded-full" />
              <span className="text-white font-bold tracking-wider uppercase text-sm">
                View
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const VisualShowcase = () => {
  return (
    <SectionWrapper className="bg-white overflow-hidden relative border-t border-gray-100">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
          Visual Tour
        </span>
        <TypewriterTitle text="Moments of Craftsmanship" />
        <p className="text-gray-500 mt-2 text-lg font-light">
          Precision manufacturing that never stops.
        </p>
      </div>

      {/* --- INFINITE GALLERY GRID --- */}
      <div className="h-[600px] md:h-[800px] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 overflow-hidden mask-linear-gradient">
        {/* COL 1: DOWN */}
        <InfiniteColumn
          images={galleryImages[0]}
          direction="down"
          speed={25}
        />

        {/* COL 2: UP (Slower for contrast) */}
        <InfiniteColumn
          images={galleryImages[1]}
          direction="up"
          speed={35}
        />

        {/* COL 3: DOWN */}
        <InfiniteColumn
          images={galleryImages[2]}
          direction="down"
          speed={28}
        />
      </div>
    </SectionWrapper>
  );
};

export default VisualShowcase;
