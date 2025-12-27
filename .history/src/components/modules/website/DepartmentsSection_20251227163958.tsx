"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  PenTool,
  Layers,
  Scissors,
  Feather,
  Cloud,
  Puzzle,
  CheckCircle,
  PackageCheck,
  Zap,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

// --- Data ---
const departments = [
  {
    id: "01",
    title: "Sample Development",
    desc: "Where ideas come to life. Creating prototypes.",
    icon: PenTool,
  },
  {
    id: "02",
    title: "Raw Materials",
    desc: "Sourcing premium, eco-friendly materials.",
    icon: Layers,
  },
  {
    id: "03",
    title: "Cutting",
    desc: "Precision laser and manual cutting.",
    icon: Scissors,
  },
  {
    id: "04",
    title: "Embroidery",
    desc: "Detailed computerized embroidery branding.",
    icon: Zap,
  },
  {
    id: "05",
    title: "Sewing & Hand Work",
    desc: "Expert craftsmanship blending machine & hand.",
    icon: Feather,
  },
  {
    id: "06",
    title: "Stuffing",
    desc: "Perfect huggable density filling.",
    icon: Cloud,
  },
  {
    id: "07",
    title: "Accessories",
    desc: "Eyes, noses, and safety components.",
    icon: Puzzle,
  },
  {
    id: "08",
    title: "Quality Control",
    desc: "Metal Detection, Pull Test, and inspection.",
    icon: CheckCircle,
  },
  {
    id: "09",
    title: "Packing & Finishing",
    desc: "Final tagging and export-ready packaging.",
    icon: PackageCheck,
  },
];

// --- Typewriter Component (RESPONSIVE FIX) ---
const TypewriterTitle = ({ text }: { text: string }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // FIX: Split by Words
  const words = text.split(" ");

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
    <div className="min-h-15 flex justify-center items-center px-4">
      <AnimatePresence mode="wait">
        <motion.h2
          key={key}
          // UPDATED: text-3xl for mobile, flex-wrap, justify-center
          className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md flex flex-wrap justify-center gap-x-3"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit">
          {words.map((word, wordIndex) => (
            // Wrap words in span to keep them together
            <span
              key={wordIndex}
              className="inline-block whitespace-nowrap">
              {Array.from(word).map((letter, letterIndex) => (
                <motion.span
                  variants={child}
                  key={letterIndex}>
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

const DepartmentsSection = () => {
  // 🌀 STATE: Tracks which card is currently "Active" in the loop
  const [activeIndex, setActiveIndex] = useState(0);

  // 🌀 EFFECT: Move the highlight every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % departments.length);
    }, 2000); // Speed of the loop
    return () => clearInterval(interval);
  }, []);

  return (
    // 🔴 THEME: Pure Red Gradient (Rich Ruby to Dark Cherry)
    <SectionWrapper className="relative overflow-hidden bg-linear-to-b from-[#B91C1C] to-[#450a0a]">
      {/* Background Texture for Detail */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-black/20 text-brand-yellow text-sm font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20 backdrop-blur-md shadow-lg">
          Our Process
        </span>

        {/* RESPONSIVE TITLE IMPLEMENTED */}
        <TypewriterTitle text="The Manufacturing Journey" />

        <p className="text-red-100 mt-2 text-lg font-light px-4">
          From raw material to final export, perfection at every step.
        </p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 px-4">
        {departments.map((dept, index) => {
          // Check if this card is currently the "Active" one in the loop
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={dept.id}
              className="group relative h-full"
              initial={{ opacity: 1 }} // Always visible
            >
              {/* CARD VISUAL */}
              <div
                className={cn(
                  "relative h-full p-8 rounded-2xl transition-all duration-700 border overflow-hidden",
                  // 🎨 DYNAMIC STYLES based on Active State
                  isActive
                    ? "bg-linear-to-br from-brand-yellow/20 to-brand-red/40 border-brand-yellow/50 shadow-[0_0_40px_rgba(255,215,0,0.3)] scale-105 z-10"
                    : "bg-linear-to-br from-white/10 to-white/5 border-white/10 hover:border-white/30"
                )}>
                {/* 1. FLASH EFFECT (Travels across card when active) */}
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000",
                    isActive ? "translate-x-full" : "-translate-x-full"
                  )}
                />

                {/* 2. HEADER: Number & Icon */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span
                    className={cn(
                      "text-5xl font-black font-sans tracking-tighter transition-colors duration-500",
                      isActive ? "text-brand-yellow" : "text-black/20"
                    )}>
                    {dept.id}
                  </span>

                  {/* ICON BOX */}
                  <div
                    className={cn(
                      "p-3 rounded-xl border transition-all duration-500 shadow-lg",
                      isActive
                        ? "bg-brand-yellow border-brand-yellow scale-110 rotate-6"
                        : "bg-white/10 border-white/10 text-white/80"
                    )}>
                    <dept.icon
                      size={24}
                      className={isActive ? "text-brand-red" : "text-white"}
                    />
                  </div>
                </div>

                {/* 3. TEXT CONTENT */}
                <div className="relative z-10">
                  <h3
                    className={cn(
                      "text-xl font-bold mb-3 transition-colors duration-300",
                      isActive ? "text-white" : "text-white/90"
                    )}>
                    {dept.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm leading-relaxed transition-colors duration-00",
                      isActive ? "text-white" : "text-red-100/70"
                    )}>
                    {dept.desc}
                  </p>
                </div>

                {/* 4. BOTTOM PROGRESS BAR (Fills when active) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                  <div
                    className={cn(
                      "h-full bg-brand-yellow transition-all duration-4000 ease-linear",
                      isActive ? "w-full" : "w-0"
                    )}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default DepartmentsSection;
