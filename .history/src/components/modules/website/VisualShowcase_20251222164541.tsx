"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

// =========================================================================
// 📸 JSON DATA: ADD YOUR IMAGE LINKS HERE
// =========================================================================
const galleryImages = [
  // COLUMN 1 IMAGES
  [
    "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop", // Toy Production
    "https://images.unsplash.com/photo-1596464716127-f9a86b5b3f4d?q=80&w=1000&auto=format&fit=crop", // Stuffed Bear
    "https://images.unsplash.com/photo-1555596873-103328ce7803?q=80&w=1000&auto=format&fit=crop", // Sewing Detail
  ],
  // COLUMN 2 IMAGES (Middle Column - Moves Opposite Direction)
  [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop", // Accessories
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop", // Factory Worker
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1000&auto=format&fit=crop", // Cute Bunny
  ],
  // COLUMN 3 IMAGES
  [
    "https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=1000&auto=format&fit=crop", // Fabric Texture
    "https://images.unsplash.com/photo-1581557991964-125469da3b8a?q=80&w=1000&auto=format&fit=crop", // Plushies Pile
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop", // Final Product
  ]
];

// --- TYPEWRITER HEADER (Reused for Consistency) ---
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
    exit: { opacity: 0, transition: { duration: 0.5 } } 
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
          exit="exit"
        >
          {letters.map((letter, index) => (
            <motion.span variants={child} key={index}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

const VisualShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- PARALLAX TRANSFORMS ---
  // Col 1 & 3 move UP as you scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  
  // Col 2 moves DOWN (Opposite)
  const y2 = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  const columns = [y1, y2, y3];

  return (
    <SectionWrapper className="bg-white overflow-hidden relative">
      
      {/* Background Decor (Red/Yellow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
          Visual Tour
        </span>
        <TypewriterTitle text="Moments of Craftsmanship" />
        <p className="text-gray-500 mt-2 text-lg font-light">
          A glimpse into our world of precision and care.
        </p>
      </div>

      {/* --- PARALLAX GALLERY --- */}
      <div 
        ref={containerRef} 
        className="h-[800px] md:h-[1000px] overflow-hidden relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 h-full">
          
          {/* Map through the 3 Columns */}
          {galleryImages.map((columnImages, colIndex) => (
            <motion.div
              key={colIndex}
              style={{ y: columns[colIndex] }} // Apply Parallax
              className={cn(
                "flex flex-col gap-6 md:gap-8",
                // Mobile: Reset transforms so it doesn't break layout
                "max-md:!transform-none"
              )}
            >
              {columnImages.map((src, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className="relative group rounded-2xl overflow-hidden shadow-lg border border-brand-red/10"
                >
                  {/* Image */}
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src={src}
                      alt="Gallery Image"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay: Red Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-red/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover Content */}
                    <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-10 h-1 bg-brand-yellow mb-2 rounded-full" />
                      <p className="text-white text-sm font-bold uppercase tracking-wider">
                        View Detail
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}

        </div>
        
        {/* Top/Bottom Fade to blend smoothly into page */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      </div>

    </SectionWrapper>
  );
};

export default VisualShowcase;