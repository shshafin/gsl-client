"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, ArrowUpRight, Ship, MapPin } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

// --- DATA: YOUR EXPORT DESTINATIONS ---
// coordinates are in % (top, left) relative to the map image
const locations = [
  {
    country: "United Kingdom",
    details: "Ports: Southampton, Liverpool",
    top: "23%",
    left: "46%",
  },
  {
    country: "Germany",
    details: "Hamburg / Berlin Hubs",
    top: "25%",
    left: "50%",
  },
  {
    country: "Netherlands",
    details: "Rotterdam Port",
    top: "24%",
    left: "48.5%",
  },
  {
    country: "Spain",
    details: "Valencia / Barcelona",
    top: "33%",
    left: "46%",
  },
  {
    country: "Lithuania",
    details: "Klaipėda Port",
    top: "22%",
    left: "54%",
  },
  {
    country: "Australia",
    details: "Sydney / Melbourne",
    top: "75%",
    left: "88%",
  },
];

const GlobalReach = () => {
  return (
    <SectionWrapper className="bg-white overflow-hidden relative border-t border-gray-100">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
        {/* =========================================
            LEFT CONTENT: TEXT & STATS
        ========================================= */}
        <div className="lg:w-1/3 z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-6 border border-brand-yellow/20">
            Global Logistics
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Exporting to <br />
            <span className="text-brand-red">The World</span>
          </h2>

          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            From the heart of Bangladesh to the shelves of Europe and Oceania.
            We handle complex logistics, ensuring timely delivery to major
            global ports.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <Ship className="text-brand-red w-8 h-8 mb-2" />
              <h4 className="text-2xl font-bold text-gray-900">6+</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                Major Countries
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <Globe className="text-brand-yellow w-8 h-8 mb-2" />
              <h4 className="text-2xl font-bold text-gray-900">100%</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                Export Oriented
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all group">
            View Shipping Policy{" "}
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
        </div>

        {/* =========================================
            RIGHT CONTENT: INTERACTIVE MAP
        ========================================= */}
        <div className="lg:w-2/3 relative h-[400px] md:h-[500px] w-full bg-slate-50 rounded-3xl border border-gray-200 overflow-hidden shadow-inner group/map">
          {/* 1. DOTTED MAP IMAGE BACKGROUND 
                Note: Using a reliable Wikimedia SVG map source. 
                You can replace this with your own map image if you have one.
            */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply">
            {/* <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/World_map_blank_with_blue_sea.svg" // Placeholder clean map
              alt="World Map"
              fill
              className="object-cover object-center grayscale opacity-50"
            /> */}
          </div>

          {/* Grid Overlay for Tech Feel */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* 2. PLACING THE BEACONS (DOTS) */}
          {locations.map((loc, index) => (
            <div
              key={index}
              className="absolute group/pin cursor-pointer"
              style={{ top: loc.top, left: loc.left }}>
              {/* Pulsing Effect */}
              <div className="absolute -inset-4 bg-brand-red/30 rounded-full animate-ping opacity-75" />
              <div className="absolute -inset-8 bg-brand-yellow/20 rounded-full animate-pulse opacity-50 animation-delay-500" />

              {/* The Dot */}
              <div className="relative w-4 h-4 bg-brand-red border-2 border-white shadow-lg rounded-full z-10 hover:scale-125 transition-transform" />

              {/* TOOLTIP (Appears on Hover) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover/pin:opacity-100 translate-y-2 group-hover/pin:translate-y-0 transition-all duration-300 z-20 pointer-events-none">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">
                      {loc.country}
                    </h5>
                    <p className="text-xs text-gray-500 leading-tight mt-1">
                      {loc.details}
                    </p>
                  </div>
                </div>
                {/* Little Arrow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100" />
              </div>
            </div>
          ))}

          {/* Decorative Connection Lines (Optional - adds 'Network' feel) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {/* Curve from BD (Approx 38%, 68%) to UK (23%, 46%) */}
            <motion.path
              d="M 680 250 Q 550 150 460 140" // Simplified coords for demo
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Bottom Tag */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur border border-gray-200 px-3 py-1 rounded-full text-xs font-mono text-gray-500">
            LIVE LOGISTICS VIEW
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default GlobalReach;
