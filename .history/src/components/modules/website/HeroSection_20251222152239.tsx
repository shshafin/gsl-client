"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ShieldCheck, Award } from "lucide-react";
import PoshButton from "@/components/ui/PoshButton";
import SectionWrapper from "@/components/ui/SectionWrapper";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* --- 1. BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg" // Ensure this exists in public folder
          alt="GSL Factory"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      </div>

      <SectionWrapper className="relative z-10 w-full pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- LEFT: TEXT CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-white text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow"></span>
              </span>
              <span className="text-brand-yellow text-sm font-bold tracking-wider uppercase">
                #1 Toy Exporter in Bangladesh
              </span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-white">GSL EXPORT</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">
                LIMITED
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Bringing joy to the world through premium manufacturing. We are a
              government-certified leader in soft toys, plastic toys, and baby
              accessories, exporting to 50+ countries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link href="/#products">
                <PoshButton className="h-14 px-8 text-base bg-brand-red text-white hover:bg-white hover:text-brand-red shadow-xl shadow-red-900/20">
                  Explore Collections
                </PoshButton>
              </Link>
              <Link href="/contact">
                <PoshButton
                  variant="outline"
                  className="h-14 px-8 text-base border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark">
                  Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </PoshButton>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-white/10 mt-8">
              <div className="flex items-center gap-3">
                <Globe className="text-brand-yellow h-8 w-8" />
                <div>
                  <p className="font-bold text-lg">50+</p>
                  <p className="text-xs text-gray-400 uppercase">
                    Countries Served
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-yellow h-8 w-8" />
                <div>
                  <p className="font-bold text-lg">ISO 9001</p>
                  <p className="text-xs text-gray-400 uppercase">
                    Certified Quality
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: VISUAL (Adjusted Size for Mobile) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center relative mt-10 lg:mt-0">
            {/* UPDATED SIZE:
                Mobile: w-[240px] h-[240px] (Smaller)
                Desktop: w-[450px] h-[450px] (Big & Premium)
            */}
            <div className="relative w-60 h-60 md:w-112.5 md:h-112.5">
              {/* 1. THE RED BACK LAYER */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [6, 10, 6],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-linear-to-br from-brand-red to-red-900 rounded-3xl shadow-2xl z-0 transform translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8"
              />

              {/* 2. THE GLASS FRONT LAYER */}
              <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/gsl-logo.webp"
                    alt="GSL Export Limited"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-20 bg-brand-yellow text-brand-dark p-3 md:p-4 rounded-xl shadow-lg border border-white/50">
                <Award className="h-6 w-6 md:h-8 md:w-8 mb-1 text-brand-red" />
                <p className="font-bold text-xs md:text-sm">Best Exporter</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default HeroSection;
