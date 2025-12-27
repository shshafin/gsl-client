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
          className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md flex flex-wrap justify-center gap-x-3"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit">
          {words.map((word, wordIndex) => (
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

  // 🌀 EFFECT: Move the highlight every 5 seconds (slower)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % departments.length);
    }, 5000); // Speed of the loop - increased to 5000ms for slower animation
    return () => clearInterval(interval);
  }, []);

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    // 🔴 THEME: Pure Red Gradient (Rich Ruby to Dark Cherry)
    <div className="relative overflow-hidden bg-gradient-to-b from-red-700 to-red-950 py-20">
      {/* Background Texture for Detail */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-black/20 text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4 border border-yellow-400/20 backdrop-blur-md shadow-lg">
          Our Process
        </span>

        {/* RESPONSIVE TITLE IMPLEMENTED */}
        <TypewriterTitle text="The Manufacturing Journey" />

        <p className="text-red-100 mt-2 text-lg font-light px-4">
          From raw material to final export, perfection at every step.
        </p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 px-4 max-w-7xl mx-auto">
        {departments.map((dept, index) => {
          // Check if this card is currently the "Active" one in the loop
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={dept.id}
              className="group relative h-full"
              initial={{ opacity: 1 }}>
              {/* CARD VISUAL */}
              <div
                className={cn(
                  "relative h-full p-8 rounded-2xl transition-all duration-1000 border overflow-hidden",
                  // 🎨 DYNAMIC STYLES based on Active State
                  isActive
                    ? "bg-gradient-to-br from-yellow-400/20 to-red-700/40 border-yellow-400/50 shadow-[0_0_40px_rgba(255,215,0,0.3)] scale-105 z-10"
                    : "bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-white/30"
                )}>
                {/* 1. FLASH EFFECT (Travels across card when active) */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1500",
                    isActive ? "translate-x-full" : "-translate-x-full"
                  )}
                />

                {/* 2. HEADER: Number & Icon */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span
                    className={cn(
                      "text-5xl font-black font-sans tracking-tighter transition-colors duration-500",
                      isActive ? "text-yellow-400" : "text-black/20"
                    )}>
                    {dept.id}
                  </span>

                  {/* ICON BOX */}
                  <div
                    className={cn(
                      "p-3 rounded-xl border transition-all duration-500 shadow-lg",
                      isActive
                        ? "bg-yellow-400 border-yellow-400 scale-110 rotate-6"
                        : "bg-white/10 border-white/10 text-white/80"
                    )}>
                    <dept.icon
                      size={24}
                      className={isActive ? "text-red-700" : "text-white"}
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
                      "text-sm leading-relaxed transition-colors duration-300",
                      isActive ? "text-white" : "text-red-100/70"
                    )}>
                    {dept.desc}
                  </p>
                </div>

                {/* 4. BOTTOM PROGRESS BAR (Fills when active) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                  <div
                    className={cn(
                      "h-full bg-yellow-400 transition-all ease-linear",
                      isActive ? "w-full" : "w-0"
                    )}
                    style={{ transitionDuration: "4000ms" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentsSection;
