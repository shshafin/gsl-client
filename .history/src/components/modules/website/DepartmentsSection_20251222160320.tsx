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

// --- Data ---
const departments = [
  {
    id: "01",
    title: "Sample Development",
    desc: "Where ideas come to life. Creating prototypes and testing designs.",
    icon: PenTool,
  },
  {
    id: "02",
    title: "Raw Materials",
    desc: "Sourcing premium, eco-friendly materials for global standards.",
    icon: Layers,
  },
  {
    id: "03",
    title: "Cutting",
    desc: "Precision laser and manual cutting for perfect shapes.",
    icon: Scissors,
  },
  {
    id: "04",
    title: "Embroidery",
    desc: "Detailed computerized embroidery for unique branding.",
    icon: Zap,
  },
  {
    id: "05",
    title: "Sewing & Hand Work",
    desc: "Expert craftsmanship blending machine speed with hand detail.",
    icon: Feather,
  },
  {
    id: "06",
    title: "Stuffing",
    desc: "Filling toys with care to achieve the perfect huggable density.",
    icon: Cloud,
  },
  {
    id: "07",
    title: "Accessories",
    desc: "Adding eyes, noses, and high-quality safety components.",
    icon: Puzzle,
  },
  {
    id: "08",
    title: "Quality Control",
    desc: "Rigorous testing (Metal Detection, Pull Test) and inspection.",
    icon: CheckCircle,
  },
  {
    id: "09",
    title: "Packing & Finishing",
    desc: "Professional finishing, tagging, and export-ready packaging.",
    icon: PackageCheck,
  },
];

// --- Reused Typewriter Component (Adapted for Dark Mode) ---
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
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.04 * i,
      },
    }),
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <div className="min-h-[60px] flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.h2
          key={key}
          className="text-4xl md:text-5xl font-bold text-white mb-4" // White text for Dark Background
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
  return (
    // DARK THEME BACKGROUND
    <SectionWrapper className="bg-neutral-900 relative overflow-hidden">
      {/* Background Ambience (Red Glows) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HEADER (Matches Previous Design Style) --- */}
      <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-4 border border-brand-red/20">
          Our Process
        </span>

        {/* Typewriter Title (White Text) */}
        <TypewriterTitle text="The Manufacturing Journey" />

        <p className="text-gray-400 mt-2 text-lg">
          From raw material to final export, perfection at every step.
        </p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full">
            {/* CARD CONTAINER */}
            <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-neutral-800 transition-all duration-500 overflow-hidden group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(204,0,0,0.3)]">
              {/* HOVER EFFECT: Red Gradient Background Reveal */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* TOP ACCENT: Number Display */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-5xl font-black text-white/5 group-hover:text-brand-yellow transition-colors duration-500 font-sans tracking-tighter">
                  {dept.id}
                </span>

                {/* ICON BOX */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <dept.icon
                    size={24}
                    className="text-gray-300 group-hover:text-brand-yellow transition-colors duration-500"
                  />
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors duration-300">
                  {dept.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {dept.desc}
                </p>
              </div>

              {/* BOTTOM LASER LINE Animation */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-red to-brand-yellow group-hover:w-full transition-all duration-700 ease-out" />

              {/* Corner Glow Accent */}
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-brand-red/40 blur-2xl rounded-full group-hover:bg-brand-yellow/40 transition-colors duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default DepartmentsSection;
