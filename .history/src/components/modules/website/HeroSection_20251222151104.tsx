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
          src="/hero-bg.jpg" // 👈 Make sure to add this image to public folder
          alt="GSL Factory and Toys"
          fill
          className="object-cover opacity-40" // Darkened for text readability
          priority
        />
        {/* Gradient Overlay for professional look */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <SectionWrapper className="relative z-10 w-full pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- LEFT: TEXT CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow"></span>
              </span>
              <span className="text-brand-yellow text-sm font-bold tracking-wider uppercase">
                #1 Toy Exporter in Bangladesh
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Bringing Joy to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">
                The World
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              Golden Son Ltd. manufactures premium soft toys, plastic toys, and
              baby accessories. Certified safety, global standards, and
              delivered to 50+ countries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/#products">
                <PoshButton className="h-14 px-8 text-base bg-brand-red text-white hover:bg-red-700 shadow-xl shadow-red-900/20">
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
            <div className="pt-8 flex items-center gap-8 border-t border-white/10 mt-8">
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

          {/* --- RIGHT: VISUAL (Floating Cards) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative">
            {/* Main Visual - Could be a featured product or collage */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* NOTE: You can put a transparent PNG of your best toy here.
                  For now, I'm using a placeholder logic.
               */}
              <div className="absolute inset-0 bg-brand-blue/20 rounded-full blur-[100px]" />

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl">
                <Image
                  src="/gsl-logo.webp"
                  alt="Featured"
                  width={400}
                  height={400}
                  className="w-full h-auto drop-shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <p className="text-brand-yellow font-bold text-xl">
                    Premium Quality
                  </p>
                  <p className="text-white text-sm">Since 2005</p>
                </div>
              </motion.div>

              {/* Floating Badge 1 */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -top-10 -right-10 bg-brand-red text-white p-4 rounded-xl shadow-lg border border-red-400/50">
                <Award className="h-8 w-8 mb-1 text-brand-yellow" />
                <p className="font-bold text-sm">Best Exporter</p>
                <p className="text-xs opacity-80">Award Winner</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default HeroSection;
