"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
// Removed SectionWrapper import to use standard <section> for the ref
// import SectionWrapper from "@/components/ui/SectionWrapper";

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3); // Magnetic strength
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="cursor-pointer">
      {children}
    </motion.div>
  );
};

const PartnerCTA = () => {
  // 1. Define the ref
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Link useScroll to the ref
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    // 3. ATTACH THE REF HERE (Changed SectionWrapper to section)
    <section
      ref={containerRef}
      className="relative bg-brand-red overflow-hidden py-32 flex flex-col items-center justify-center min-h-[600px]">
      {/* BACKGROUND MARQUEE TEXT */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-10 pointer-events-none select-none overflow-hidden">
        {/* ROW 1: Moves Left */}
        <motion.div
          style={{ x: xLeft }}
          className="whitespace-nowrap">
          <span className="text-[15vw] md:text-[12vw] font-black text-white uppercase leading-none">
            Manufacturing • Quality • Export • Manufacturing • Quality • Export
            •
          </span>
        </motion.div>

        {/* ROW 2: Moves Right */}
        <motion.div
          style={{ x: xRight }}
          className="whitespace-nowrap">
          <span className="text-[15vw] md:text-[12vw] font-black text-transparent stroke-white stroke-2 border-text uppercase leading-none">
            Global • Logistics • Trust • Global • Logistics • Trust •
          </span>
          <style jsx>{`
            .stroke-white {
              -webkit-text-stroke: 2px white;
            }
          `}</style>
        </motion.div>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <span className="inline-block py-2 px-4 rounded-full bg-white/10 backdrop-blur-md text-brand-yellow text-sm font-bold uppercase tracking-[0.2em] mb-8 border border-white/20">
            Ready to Start?
          </span>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Let&apos;s Build Your <br />
            <span className="text-brand-yellow">Product Line</span>
          </h2>

          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
            Join 50+ global brands trusting us with their manufacturing. From
            prototype to mass production, we handle it all.
          </p>

          {/* MAGNETIC BUTTON */}
          <div className="flex justify-center">
            <MagneticButton>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center w-64 h-20 bg-white text-brand-red rounded-full overflow-hidden transition-all hover:w-72">
                {/* Hover Fill Effect (Yellow) */}
                <div className="absolute inset-0 bg-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="relative z-10 flex items-center gap-3">
                  <span className="text-lg font-bold uppercase tracking-widest group-hover:text-black transition-colors">
                    Get A Quote
                  </span>
                  <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center group-hover:bg-black group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-yellow/20 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default PartnerCTA;
