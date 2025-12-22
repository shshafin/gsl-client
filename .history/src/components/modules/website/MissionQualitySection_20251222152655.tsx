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
  // Split text into characters
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
    <SectionWrapper className="relative overflow-hidden bg-white">
      {/* Background Ambience (Red/Yellow Glows) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none" />

      {/* --- HEADER WITH TYPEWRITER EFFECT --- */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
          Our Philosophy
        </span>

        {/* The Animated Typewriter Title */}
        <TypewriterTitle text="Excellence in Every Stitch" />

        <div className="h-1 w-24 bg-gradient-to-r from-brand-red to-brand-yellow mx-auto rounded-full mt-4" />
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative h-full">
            {/* The Card */}
            <div className="relative h-full bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden z-10">
              {/* Hover Effect: Gradient Background Slide */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Bottom Line Accent (Red to Yellow) */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-red to-red-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon
                    size={32}
                    className="text-white"
                  />
                </div>
                {/* Floating Shadow behind icon */}
                <div className="absolute inset-0 bg-brand-red blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-bold text-black group-hover:text-brand-red transition-colors duration-300 mb-4 relative z-10">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed relative z-10 group-hover:text-gray-800">
                {feature.description}
              </p>
            </div>

            {/* Decorative Offset Border (Yellow) - Creates a stacked card look */}
            <div className="absolute inset-0 bg-brand-yellow/20 rounded-3xl transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default MissionQualitySection;
