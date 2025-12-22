"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // 👈 Added Variants type
import { Target, Eye, ShieldCheck } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

// --- Data ---
const features = [
  {
    title: "Our Mission",
    description:
      "To bring joy to children worldwide by manufacturing safe, innovative, and eco-friendly toys that meet global standards.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "To become the world's most trusted toy exporter, recognized for our commitment to quality, sustainability, and ethical manufacturing.",
    icon: Eye,
  },
  {
    title: "Premium Quality",
    description:
      "We adhere to strict international safety certifications (ISO 9001, CE). Every stitch is inspected to ensure durability and safety.",
    icon: ShieldCheck,
  },
];

// --- Looping Typewriter Component ---
const TypewriterTitle = ({ text }: { text: string }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Restart animation every 5 seconds (slightly faster loop too)
    const timer = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const letters = Array.from(text);

  // ⚡ FIXED: Explicitly typed as 'Variants' to solve the TS Error
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.025, // ⚡ UPDATED: Faster speed (was 0.05)
        delayChildren: 0.04 * i,
      },
    }),
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  // ⚡ FIXED: Explicitly typed as 'Variants'
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
          className="text-4xl md:text-5xl font-bold text-brand-red mb-4"
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

const MissionQualitySection = () => {
  return (
    <SectionWrapper className="relative overflow-hidden bg-gray-50/50">
      {/* --- HEADER --- */}
      <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-brand-red text-sm font-bold uppercase tracking-widest mb-4 border border-red-100">
          Corporate Philosophy
        </span>

        <TypewriterTitle text="Excellence in Every Stitch" />

        <p className="text-gray-500 mt-2 text-lg">
          We don&apos;t just make toys; we craft happiness with precision
          engineering.
        </p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative h-full">
            {/* THE CARD CONTAINER */}
            <div className="relative h-full bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-t-4 border-brand-red">
              {/* LAYER 0: Default BG */}
              <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/80 z-0" />

              {/* LAYER 1: Hover Red Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

              {/* LAYER 2: WATERMARK ICON */}
              <feature.icon
                className="absolute -bottom-8 -right-8 w-40 h-40 text-brand-red/5 group-hover:text-white/20 transition-all duration-700 group-hover:rotate-12 transform z-10 pointer-events-none"
                strokeWidth={1}
              />

              {/* LAYER 3: CONTENT */}
              <div className="relative z-20 flex flex-col items-start h-full">
                {/* ICON CONTAINER */}
                <div className="mb-6 p-4 rounded-2xl bg-brand-red/10 group-hover:bg-white/10 transition-colors duration-500 border border-brand-red/10 group-hover:border-white/20">
                  <feature.icon
                    size={32}
                    className="text-brand-red group-hover:text-brand-yellow transition-colors duration-500"
                  />
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 mb-4">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 group-hover:text-red-100 transition-colors duration-500 leading-relaxed text-base">
                  {feature.description}
                </p>

                {/* DECORATIVE LINE */}
                <div className="mt-auto pt-8 w-full">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 bg-brand-red group-hover:bg-brand-yellow transition-all duration-500 group-hover:w-full" />
                    <div className="h-1 w-2 bg-brand-yellow rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default MissionQualitySection;
