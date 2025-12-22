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

// --- Typewriter Component ---
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
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
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

const DepartmentsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % departments.length);
    }, 2500); // Slower loop (2.5s) for more elegance
    return () => clearInterval(interval);
  }, []);

  return (
    // 🔴 THEME: Radial Spotlight Gradient (Bright Center -> Deep Edges)
    <SectionWrapper className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E60000] via-[#990000] to-[#450a0a]">
      {/* Background Texture - Hexagonal Grid for "Factory" feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* --- HEADER --- */}
      <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
        <span className="inline-block py-1 px-4 rounded-full bg-black/40 text-brand-yellow text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-brand-yellow/30 backdrop-blur-md shadow-xl">
          Manufacturing Excellence
        </span>
        <TypewriterTitle text="The Manufacturing Journey" />
        <p className="text-white/80 mt-2 text-lg font-light tracking-wide">
          Precision engineering from start to finish.
        </p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 px-4 pb-12">
        {departments.map((dept, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={dept.id}
              className="group relative h-full"
              initial={{ opacity: 1 }}
              animate={{
                scale: isActive ? 1.05 : 1, // Subtle breathe effect when active
                y: isActive ? -5 : 0,
              }}
              transition={{ duration: 0.5 }}>
              {/* CARD VISUAL */}
              <div
                className={cn(
                  "relative h-full p-8 rounded-2xl transition-all duration-700 overflow-hidden backdrop-blur-md",
                  // 🎨 DYNAMIC STYLES
                  isActive
                    ? // ACTIVE: Golden Border, Lighter Red BG, Gold Glow
                      "bg-gradient-to-b from-brand-red/90 to-brand-red/60 border-2 border-brand-yellow shadow-[0_0_50px_-12px_rgba(255,215,0,0.6)] z-20"
                    : // INACTIVE: Frosted Ruby, Faint Border
                      "bg-white/5 border border-white/10 hover:bg-white/10"
                )}>
                {/* 1. SHINE EFFECT (Only on Active) */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent skew-x-12 transition-transform duration-[1500ms] ease-in-out",
                    isActive ? "translate-x-[200%]" : "-translate-x-[200%]"
                  )}
                />

                {/* 2. HEADER: Number & Icon */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span
                    className={cn(
                      "text-5xl font-black font-sans tracking-tighter transition-colors duration-500",
                      isActive
                        ? "text-brand-yellow drop-shadow-md"
                        : "text-white/20"
                    )}>
                    {dept.id}
                  </span>

                  {/* ICON BOX */}
                  <div
                    className={cn(
                      "p-3 rounded-xl border transition-all duration-500 shadow-xl",
                      isActive
                        ? "bg-brand-yellow border-brand-yellow text-black scale-110"
                        : "bg-white/5 border-white/10 text-white/60"
                    )}>
                    <dept.icon size={24} />
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
                      "text-sm leading-relaxed transition-colors duration-300 font-light",
                      isActive ? "text-white/90" : "text-white/50"
                    )}>
                    {dept.desc}
                  </p>
                </div>

                {/* 4. PROGRESS BAR */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                  <div
                    className={cn(
                      "h-full bg-brand-yellow shadow-[0_0_10px_#FFD700] transition-all duration-[2500ms] ease-linear",
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
