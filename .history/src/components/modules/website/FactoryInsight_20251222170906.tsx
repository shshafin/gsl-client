"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Play, X, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FactoryInsight = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Effect for the image inside the card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const handlePlay = () => setIsVideoOpen(true);

  const handleClose = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <SectionWrapper className="relative bg-neutral-950 overflow-hidden py-20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red/20 via-neutral-950 to-neutral-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-brand-yellow font-mono text-xs tracking-[0.2em] uppercase mb-2 block">
              Exclusive Access
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Inside The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">
                Powerhouse
              </span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed border-l-2 border-brand-red/30 pl-4">
            Take a virtual journey through our 50,000 sq. ft. facility. Witness
            the precision, safety, and care behind every toy we export.
          </p>
        </div>

        {/* --- THE FLOATING CINEMA CARD --- */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl shadow-brand-red/10 border border-white/10"
          onClick={handlePlay}>
          {/* 1. PARALLAX IMAGE BACKGROUND */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              style={{ y }}
              className="relative w-full h-[120%] -top-[10%]">
              <Image
                src="/office-cover.jpeg"
                alt="Factory Office Wide Shot"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
              />
            </motion.div>
          </div>

          {/* 2. OVERLAY GRADIENT */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

          {/* 3. UI ELEMENTS ("Camera View" Look) */}
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-600/90 backdrop-blur-md rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-[10px] font-bold tracking-widest uppercase">
                REC
              </span>
            </div>
            <span className="text-white/60 text-xs font-mono tracking-widest">
              00:02:14:29
            </span>
          </div>

          <div className="absolute top-8 right-8">
            <ArrowRight className="text-white/60 w-8 h-8 -rotate-45 group-hover:rotate-0 group-hover:text-brand-yellow transition-all duration-500" />
          </div>

          {/* 4. CENTER PLAY BUTTON WITH ROTATING TEXT */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              {/* Rotating Text Ring */}
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity">
                <svg
                  viewBox="0 0 100 100"
                  width="100%"
                  height="100%">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text className="fill-white text-[11px] font-bold uppercase tracking-[0.18em]">
                    <textPath href="#circlePath">
                      • Watch The Factory Tour • Play Video
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Center Icon */}
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play
                  size={24}
                  className="text-black fill-black ml-1"
                />
              </div>
            </div>
          </div>

          {/* 5. BOTTOM INFO */}
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div>
              <h3 className="text-white font-bold text-xl mb-1">
                Main Production Floor
              </h3>
              <p className="text-white/60 text-sm">Dhaka, Bangladesh</p>
            </div>
            <div className="hidden md:block">
              <span className="text-brand-yellow text-xs font-bold border border-brand-yellow/30 px-3 py-1 rounded-full bg-brand-yellow/10">
                4K QUALITY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- VIDEO MODAL (Same Functional Logic) --- */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-brand-red text-white transition-colors">
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline>
                <source
                  src="/factory-tour.mp4"
                  type="video/mp4"
                />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default FactoryInsight;
