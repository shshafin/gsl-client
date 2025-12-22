"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { Play, X } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

// --- REUSABLE TYPEWRITER COMPONENT ---
const TypewriterTitle = ({ text }: { text: string }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const child: Variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <div className="min-h-20 md:min-h-22.5 lg:min-h-17.5 flex items-center flex-wrap">
      <AnimatePresence mode="wait">
        <motion.h2
          key={key}
          // RESPONSIVE SIZES:
          // mobile: text-3xl
          // medium (tablet): text-5xl (Not too big)
          // large (desktop): text-6xl
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight wrap-break-words"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit">
          {letters.map((letter, index) => (
            <motion.span
              variants={child}
              key={index}
              // Logic: "Inside The " (white), "Powerhouse" (Red)
              className={index >= 11 ? "text-brand-red" : "text-white"}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

const FactoryInsight = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Effect
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
    <SectionWrapper className="relative bg-neutral-950 overflow-hidden py-16 md:py-20 lg:py-24">
      {/* =========================================
          BACKGROUND EFFECTS
      ========================================= */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-neutral-950 to-neutral-950 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* --- SECTION HEADER --- */}
        {/* CHANGED: 'md:flex-row' -> 'lg:flex-row'. 
            On Medium screens (tablets), it stays stacked (column) so it doesn't break. 
        */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6 md:gap-8">
          <div className="max-w-full lg:max-w-2xl">
            <span className="text-brand-yellow font-mono text-xs tracking-[0.2em] uppercase mb-3 block border border-brand-yellow/20 w-fit px-3 py-1 rounded-full bg-brand-yellow/5">
              Exclusive Access
            </span>

            <TypewriterTitle text="Inside The Powerhouse" />
          </div>

          <p className="text-gray-400 max-w-full lg:max-w-sm text-sm md:text-base leading-relaxed border-l-2 border-brand-red/50 pl-6 pt-1">
            Witness our world-class manufacturing hub. From sustainable sourcing
            to precision engineering, see how we meet the highest global safety
            standards.
          </p>
        </div>

        {/* --- THE FLOATING CINEMA CARD --- */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl shadow-brand-red/10 border border-white/10"
          onClick={handlePlay}>
          {/* IMAGE */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              style={{ y }}
              className="relative w-full h-[120%] -top-[10%]">
              <Image
                src="/office-cover.jpeg"
                alt="Factory Office Wide Shot"
                fill
                className="object-cover transition-transform duration-[1500ms] group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
              />
            </motion.div>
          </div>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

          {/* TOP UI */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-600/90 backdrop-blur-md rounded-full shadow-lg shadow-red-900/50">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-[10px] font-bold tracking-widest uppercase">
                REC
              </span>
            </div>
            <span className="text-white/60 text-xs font-mono tracking-widest hidden md:inline-block">
              LIVE FEED • CAM 01
            </span>
          </div>

          {/* PLAY BUTTON */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite] opacity-90 group-hover:opacity-100 transition-opacity">
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
              <div className="w-10 h-10 md:w-16 md:h-16 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play
                  size={20}
                  className="text-black fill-black ml-1 md:w-6 md:h-6"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM INFO */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 bg-linear-to-t from-black/90 to-transparent flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                Main Production Floor
              </h3>
              <p className="text-white/60 text-xs md:text-sm">
                Chittagong, Bangladesh
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-brand-yellow text-xs font-bold border border-brand-yellow/30 px-3 py-1 rounded-full bg-brand-yellow/10 backdrop-blur-md">
                BSCI CERTIFIED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- VIDEO MODAL --- */}
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
