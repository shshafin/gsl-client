"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ShieldCheck } from "lucide-center";
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
          className="object-cover opacity-25" // Lowered opacity for better text contrast
          priority
        />
        {/* Darkening overlays for maximum readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-b from-brand-dark/20 via-transparent to-brand-dark" />
      </div>

      <SectionWrapper className="relative z-10 w-full pt-20 pb-20">
        <div className="flex flex-col items-center justify-center text-center">
          {/* --- CONTENT BLOCK --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10 text-white max-w-4xl">
            {/* 1. TOP BADGE */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-yellow"></span>
              </span>
              <span className="text-brand-yellow text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
                #1 Toy Exporter in Bangladesh
              </span>
            </div>

            {/* 2. MAIN HEADLINE */}
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter">
              <span className="block text-white">GSL EXPORT</span>
              <span className="text-transparent bg-clip-text bg-linear-to-b from-brand-yellow via-yellow-400 to-yellow-700">
                LIMITED
              </span>
            </h1>

            {/* 3. SUBHEADLINE */}
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light px-4">
              Bringing joy to the world through premium manufacturing. We are a
              government-certified leader in soft toys, plastic toys, and baby
              accessories, exporting to 6+ countries.
            </p>

            {/* 4. ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6 justify-center items-center">
              <Link href="/products">
                <PoshButton className="h-16 px-10 text-lg bg-brand-red text-white hover:bg-white hover:text-brand-red shadow-2xl shadow-red-900/40 border-none transition-all duration-500">
                  Explore Collections
                </PoshButton>
              </Link>
              <Link href="/contact">
                <PoshButton
                  variant="outline"
                  className="h-16 px-10 text-lg border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark transition-all duration-500">
                  Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </PoshButton>
              </Link>
            </div>

            {/* 5. TRUST FOOTER */}
            <div className="pt-16 flex flex-wrap items-center justify-center gap-12 md:gap-20 border-t border-white/10 mt-16">
              <div className="flex items-center gap-4 group">
                <Globe className="text-brand-yellow h-10 w-10 transition-transform group-hover:rotate-12" />
                <div className="text-left">
                  <p className="font-black text-2xl md:text-3xl leading-none">
                    6+
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1.5">
                    Countries Served
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <ShieldCheck className="text-brand-yellow h-10 w-10 transition-transform group-hover:scale-110" />
                <div className="text-left">
                  <p className="font-black text-2xl md:text-3xl leading-none">
                    BSCI
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1.5">
                    Certified Quality
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default HeroSection;
