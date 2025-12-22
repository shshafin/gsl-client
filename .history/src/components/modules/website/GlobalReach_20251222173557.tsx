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

// --- 2. FULL HEADER TYPEWRITER ---
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
    <div className="min-h-[60px] flex items-center flex-wrap">
      <AnimatePresence mode="wait">
        <motion.h2
          key={key}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit">
          {letters.map((letter, index) => (
            <motion.span
              variants={child}
              key={index}
              // "Exporting to " is 13 characters.
              // So start coloring Red from index 13 ("The World")
              className={index >= 13 ? "text-brand-red" : "text-gray-900"}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
        {/* LEFT CONTENT */}
        <div className="lg:w-1/3 z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-6 border border-brand-yellow/20">
            Global Logistics
          </span>

          {/* FULL ANIMATED HEADER */}
          <div className="mb-6">
            <TypewriterTitle text="Exporting to The World" />
          </div>

          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            From the heart of Bangladesh to the shelves of Europe and Oceania.
            We handle complex logistics, ensuring timely delivery to major
            global ports.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-brand-red/20 transition-colors group">
              <Ship className="text-brand-red w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-3xl font-bold text-gray-900">
                <AnimatedCounter
                  from={0}
                  to={6}
                  suffix="+"
                />
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                Major Countries
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-brand-yellow/50 transition-colors group">
              <Globe className="text-brand-yellow w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-3xl font-bold text-gray-900">
                <AnimatedCounter
                  from={0}
                  to={100}
                  suffix="%"
                />
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
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
        <div className="lg:w-2/3 relative h-[450px] md:h-[550px] w-full bg-slate-50 rounded-3xl border border-gray-200 overflow-hidden shadow-inner group/map">
          {/* 1. MAP IMAGE (COLORFUL DEFAULT) */}
          <div className="absolute inset-0 opacity-80 mix-blend-multiply">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop"
              alt="Global Logistics Map"
              fill
              // REMOVED 'grayscale' class. It is now colorful by default.
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
              // group/pin allows us to control the child tooltip on hover
              className="absolute group/pin cursor-pointer hover:z-50"
              style={{ top: loc.top, left: loc.left }}>
              {/* Pulsing Effect */}
              <div className="absolute -inset-4 bg-brand-red/30 rounded-full animate-ping opacity-75" />
              <div className="absolute -inset-8 bg-brand-yellow/20 rounded-full animate-pulse opacity-50 animation-delay-500" />

              {/* The Dot (Beacon) */}
              <div className="relative w-4 h-4 bg-brand-red border-2 border-white shadow-lg rounded-full z-10 transition-transform group-hover/pin:scale-125" />

              {/* TOOLTIP: Hover to Reveal (Solves Overlap Issue) */}
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
                {/* Little Arrow */}
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
