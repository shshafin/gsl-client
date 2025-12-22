"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
  Variants,
  animate,
} from "framer-motion";
import { Globe, ArrowRight, Ship, MapPin } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

// --- 1. ANIMATED COUNTER ---
const AnimatedCounter = ({
  from,
  to,
  suffix = "",
}: {
  from: number;
  to: number;
  suffix?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2 });
      return controls.stop;
    }
  }, [inView, from, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- 2. DUAL-LINE TYPEWRITER HEADER ---
const TypewriterTitle = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const line1 = "Exporting to";
  const line2 = "The World";

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const child: Variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <div className="min-h-[90px] md:min-h-30 flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.h2
          key={key}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit">
          {/* LINE 1: Black Text */}
          <div className="block text-gray-900 mb-1">
            {Array.from(line1).map((letter, index) => (
              <motion.span
                variants={child}
                key={`l1-${index}`}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* LINE 2: Red Text */}
          <div className="block text-brand-red">
            {Array.from(line2).map((letter, index) => (
              <motion.span
                variants={child}
                key={`l2-${index}`}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

// --- DATA: LOCATIONS ---
const locations = [
  {
    country: "United Kingdom",
    details: "Southampton",
    top: "25%",
    left: "46%",
  },
  { country: "Germany", details: "Hamburg Hub", top: "30%", left: "53%" },
  { country: "Netherlands", details: "Rotterdam", top: "25%", left: "51%" },
  { country: "Spain", details: "Valencia", top: "38%", left: "47%" },
  { country: "Lithuania", details: "Klaipėda", top: "22%", left: "56%" },
  { country: "Australia", details: "Sydney Port", top: "75%", left: "85%" },
];

const GlobalReach = () => {
  return (
    <SectionWrapper className="bg-white overflow-hidden relative border-t border-gray-100">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
        {/* LEFT CONTENT */}
        <div className="lg:w-1/3 z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-6 border border-brand-yellow/20">
            Global Logistics
          </span>

          {/* DUAL LINE HEADER */}
          <div className="mb-6">
            <TypewriterTitle />
          </div>

          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            From the heart of Bangladesh to the shelves of Europe and Oceania.
            We handle complex logistics, ensuring timely delivery to major
            global ports.
          </p>

          {/* COLORFUL STATS GRID (UPDATED GRADIENTS) */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* 1. MAJOR COUNTRIES: SMOOTH RED (Light Red -> Brand Red) */}
            <div className="p-4 md:p-6 rounded-2xl bg-linear-to-br from-red-400 to-brand-red text-white shadow-lg shadow-brand-red/20 transform hover:-translate-y-1 transition-transform duration-300">
              <Ship className="text-white w-8 h-8 mb-3 opacity-90" />
              <h4 className="text-3xl md:text-4xl font-bold">
                <AnimatedCounter
                  from={0}
                  to={6}
                  suffix="+"
                />
              </h4>
              <p className="text-xs text-white/90 uppercase tracking-wider font-bold mt-1">
                Major Countries
              </p>
            </div>

            {/* 2. EXPORT ORIENTED: SMOOTH YELLOW (Light Yellow -> Brand Yellow) */}
            <div className="p-4 md:p-6 rounded-2xl bg-linear-to-br from-yellow-300 to-brand-yellow text-black shadow-lg shadow-brand-yellow/20 transform hover:-translate-y-1 transition-transform duration-300">
              <Globe className="text-black w-8 h-8 mb-3 opacity-90" />
              <h4 className="text-3xl md:text-4xl font-bold">
                <AnimatedCounter
                  from={0}
                  to={100}
                  suffix="%"
                />
              </h4>
              <p className="text-xs text-black/80 uppercase tracking-wider font-bold mt-1">
                Export Oriented
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <Link href="/about">
            <button className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all group">
              View About Company{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* RIGHT CONTENT: MAP */}
        <div className="lg:w-2/3 relative h-112.5 md:h-137.5 w-full bg-slate-50 rounded-3xl border border-gray-200 overflow-hidden shadow-inner group/map">
          {/* MAP IMAGE */}
          <div className="absolute inset-0 opacity-80 mix-blend-multiply">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop"
              alt="Global Logistics Map"
              fill
              className="object-cover object-center transition-all duration-1000"
            />
          </div>

          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {locations.map((loc, index) => (
            <div
              key={index}
              className="absolute group/pin cursor-pointer hover:z-50"
              style={{ top: loc.top, left: loc.left }}>
              {/* Pulsing Effect */}
              <div className="absolute -inset-4 bg-brand-red/30 rounded-full animate-ping opacity-75" />
              <div className="absolute -inset-8 bg-brand-yellow/20 rounded-full animate-pulse opacity-50 animation-delay-500" />

              {/* The Dot */}
              <div className="relative w-4 h-4 bg-brand-red border-2 border-white shadow-lg rounded-full z-10 transition-transform group-hover/pin:scale-125" />

              {/* TOOLTIP (HOVER TO REVEAL) */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 md:w-40 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-2xl border border-gray-100 z-20 
                    opacity-0 translate-y-2 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:translate-y-0 group-hover/pin:pointer-events-auto transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <h5 className="font-bold text-gray-900 text-xs md:text-sm">
                    {loc.country}
                  </h5>
                  <p className="text-[10px] text-gray-500 leading-tight mt-1 hidden md:block">
                    {loc.details}
                  </p>
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100" />
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-gray-200 px-3 py-1 rounded-full text-xs font-mono text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            LIVE LOGISTICS
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default GlobalReach;
