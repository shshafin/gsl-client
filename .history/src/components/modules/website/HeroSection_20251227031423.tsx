"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ShieldCheck } from "lucide-react";
import PoshButton from "@/components/ui/PoshButton";
import SectionWrapper from "@/components/ui/SectionWrapper";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* --- 1. BACKGROUND IMAGE & OVERLAYS --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="GSL Factory"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Subtle radial gradient to keep center text readable */}
        <div className="absolute inset-0 bg-radial-[at_center_center] from-transparent via-brand-dark/60 to-brand-dark" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <SectionWrapper className="relative z-10 w-full pt-32 pb-20">
        <div className="flex flex-col items-center justify-center text-center">
          {/* --- TEXT CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-white max-w-4xl">
            {/* BADGE */}
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
            <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
              <span className="block text-white">GSL EXPORT</span>
              <span className="text-transparent bg-clip-text bg-linear-to-b from-brand-yellow to-yellow-600">
                LIMITED
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Bringing joy to the world through premium manufacturing. We are a
              government-certified leader in soft toys, plastic toys, and baby
              accessories, exporting to 6+ countries.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4 justify-center">
              <Link href="/products">
                <PoshButton className="h-16 px-10 text-lg bg-brand-red text-white hover:bg-white hover:text-brand-red shadow-2xl shadow-red-900/40">
                  Explore Collections
                </PoshButton>
              </Link>
              <Link href="/contact">
                <PoshButton
                  variant="outline"
                  className="h-16 px-10 text-lg border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark">
                  Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </PoshButton>
              </Link>
            </div>

            {/* Trust Badges - Center Aligned */}
            <div className="pt-12 flex flex-wrap items-center justify-center gap-10 md:gap-16 border-t border-white/10 mt-12">
              <div className="flex items-center gap-4">
                <Globe className="text-brand-yellow h-10 w-10" />
                <div className="text-left">
                  <p className="font-bold text-2xl leading-none">6+</p>
                  <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">
                    Countries Served
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-brand-yellow h-10 w-10" />
                <div className="text-left">
                  <p className="font-bold text-2xl leading-none">BSCI</p>
                  <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">
                    Certified Quality
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Optional: A very subtle floating image of a signature product below the text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-16 pointer-events-none select-none">
            <Image
              src="/hero.png"
              alt="Product"
              width={300}
              height={300}
              className="grayscale brightness-150"
            />
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default HeroSection;
