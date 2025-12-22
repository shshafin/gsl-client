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
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md"
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
    // 🔴 THEME: Deep Red Gradient Background
    <SectionWrapper className="relative overflow-hidden bg-gradient-to-b from-[#8B0000] via-[#500000] to-black">
      {/* Background Texture (Noise) to make the red look premium */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Background Animated Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* --- HEADER --- */}
      <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-black/30 text-brand-yellow text-sm font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20 backdrop-blur-md">
          Our Process
        </span>

        <TypewriterTitle text="The Manufacturing Journey" />

        <p className="text-red-100/80 mt-2 text-lg">
          From raw material to final export, perfection at every step.
        </p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            // 🌀 CONTINUOUS FLOATING ANIMATION
            animate={{
              y: [0, -10, 0], // Move up and down
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2, // Randomize the movement so they don't move together
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }} // Initial fade in override
            viewport={{ once: true }}
            className="group relative h-full">
            {/* CARD VISUAL */}
            {/* Glassmorphism on Red: Black/20 background with White/10 border */}
            <div className="relative h-full bg-black/20 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-black/40 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]">
              {/* HOVER: Yellow Flash Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* HEADER: Number & Icon */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-5xl font-black text-white/10 group-hover:text-brand-yellow transition-colors duration-500 font-sans tracking-tighter">
                  {dept.id}
                </span>

                {/* ICON BOX */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-black transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <dept.icon
                    size={24}
                    className="text-white/80 group-hover:text-black transition-colors duration-500"
                  />
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors duration-300">
                  {dept.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                  {dept.desc}
                </p>
              </div>

              {/* BOTTOM LINE ACCENT */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-yellow group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default DepartmentsSection;
