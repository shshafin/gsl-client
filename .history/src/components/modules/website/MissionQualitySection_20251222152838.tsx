"use client";

import { motion } from "framer-motion";
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

// --- Typewriter Component ---
const TypewriterTitle = ({ text }: { text: string }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
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
    <motion.h2
      className="text-4xl md:text-5xl font-bold text-brand-red mb-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
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
        <p className="text-gray-500 mt-4 text-lg">
          We don&apos;t just make toys; we craft happiness with precision
          engineering.
        </p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative h-full">
            {/* THE CARD CONTAINER 
               - Default: White bg, Gray text
               - Hover: Red Gradient bg, White text
            */}
            <div className="relative h-full bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-transparent">
              {/* HOVER BACKGROUND (The Sweep Effect) */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* WATERMARK ICON (Background Decor) */}
              <feature.icon
                className="absolute -bottom-10 -right-10 w-48 h-48 text-white opacity-0 group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12 transform"
                strokeWidth={1}
              />

              {/* CONTENT CONTAINER */}
              <div className="relative z-10 flex flex-col items-start h-full">
                {/* ICON */}
                <div className="mb-8 p-4 rounded-2xl bg-red-50 group-hover:bg-white/10 transition-colors duration-500">
                  <feature.icon
                    size={36}
                    className="text-brand-red group-hover:text-brand-yellow transition-colors duration-500"
                  />
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 mb-4">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-500 group-hover:text-red-100 transition-colors duration-500 leading-relaxed text-base">
                  {feature.description}
                </p>

                {/* DECORATIVE LINE */}
                <div className="mt-auto pt-8">
                  <div className="h-1 w-12 bg-gray-200 group-hover:bg-brand-yellow transition-all duration-500 group-hover:w-full" />
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
