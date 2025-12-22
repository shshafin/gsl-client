"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FactoryInsight = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle Video Modal
  const handlePlay = () => {
    setIsVideoOpen(true);
    // Optional: Auto-play logic if needed
  };

  const handleClose = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <SectionWrapper className="p-0 py-0 relative bg-black overflow-hidden">
      {/* =========================================
          1. THE CINEMATIC COVER (Thumbnail)
      ========================================= */}
      <div className="relative h-[600px] md:h-[800px] w-full group">
        {/* Background Image (Office Cover) */}
        <Image
          src="/office-cover.png" // 👈 Make sure to rename your image to this!
          alt="Factory Office Overview"
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
        />

        {/* Dark Overlay (Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8">
            <span className="inline-block py-1 px-4 rounded-full bg-brand-red/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[0.2em] border border-white/20 shadow-xl">
              Inside The Factory
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-12 drop-shadow-2xl max-w-4xl">
            See Where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">
              Happiness
            </span>{" "}
            Is Made
          </motion.h2>

          {/* PLAY BUTTON (Pulsing Effect) */}
          <motion.button
            onClick={handlePlay}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative group/btn">
            {/* Pulse Ring 1 */}
            <div className="absolute inset-0 bg-brand-yellow rounded-full blur opacity-40 group-hover/btn:opacity-60 animate-ping" />

            {/* Pulse Ring 2 */}
            <div className="absolute inset-0 bg-brand-red rounded-full blur-xl opacity-20 animate-pulse" />

            {/* The Button */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:bg-brand-red group-hover/btn:border-transparent">
              <Play
                size={40}
                className="ml-2 text-white fill-white transition-colors"
              />
            </div>

            <p className="mt-4 text-white/80 text-sm font-bold tracking-widest uppercase opacity-0 translate-y-2 group-hover/btn:opacity-100 group-hover/btn:translate-y-0 transition-all duration-300">
              Watch Tour
            </p>
          </motion.button>
        </div>
      </div>

      {/* =========================================
          2. THE VIDEO MODAL (Overlay)
      ========================================= */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-brand-red text-white transition-colors">
              <X size={32} />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* THE VIDEO PLAYER */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline>
                {/* 🔴 IMPORTANT: Put your video file in /public/factory-tour.mp4 */}
                <source
                  src="/factory-tour.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default FactoryInsight;
