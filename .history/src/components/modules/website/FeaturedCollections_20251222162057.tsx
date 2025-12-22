"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse Position Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Spring Physics
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Convert Mouse Position to Rotation Degrees (Tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Handle Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Calculate mouse position relative to the center of the card
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    // Normalize values between -0.5 and 0.5
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link
      href={href}
      className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d", // Critical for 3D effect
        }}
        className="relative h-full w-full rounded-[2rem] overflow-hidden bg-white shadow-xl cursor-pointer group perspective-1000">
        {children}
      </motion.div>
    </Link>
  );
};

const FeaturedCollections = () => {
  return (
    <SectionWrapper className="bg-gray-50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none" />

      <SectionHeading
        title="Our Premium Collections"
        subtitle="Explore Products"
        className="mb-12 relative z-10"
      />

      {/* --- BENTO GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[600px]">
        {/* 1. LARGE CARD (Soft Toys) - Spans 2 Columns */}
        <TiltCard
          href="/collections/soft-toys"
          className="lg:col-span-2 h-[400px] lg:h-full">
          <div className="relative h-full w-full">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1555445054-8488d05b7b95?q=80&w=1000&auto=format&fit=crop"
              alt="Soft Toys"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Floating Content (Parallax Z-Index) */}
            <div
              className="absolute bottom-0 left-0 p-8 md:p-12 w-full"
              style={{ transform: "translateZ(50px)" }} // Pushes text forward in 3D
            >
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    Soft Toys
                  </h3>
                  <p className="text-gray-200 text-lg max-w-sm">
                    Premium plush, teddy bears, and stuffed animals made with
                    ultra-soft fabrics.
                  </p>
                </div>
                {/* Button */}
                <div className="w-16 h-16 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg shadow-yellow-500/50">
                  <ArrowUpRight size={32} />
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* RIGHT COLUMN (2 Stacked Cards) */}
        <div className="flex flex-col gap-8 h-full">
          {/* 2. TOP RIGHT (Plastic Toys) */}
          <TiltCard
            href="/collections/plastic-toys"
            className="flex-1 h-[300px] lg:h-auto">
            <div className="relative h-full w-full">
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop"
                alt="Plastic Toys"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              <div
                className="absolute bottom-0 left-0 p-8 w-full"
                style={{ transform: "translateZ(40px)" }}>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Plastic Toys
                </h3>
                <p className="text-red-100 text-sm">Safe, durable, and fun.</p>
              </div>
            </div>
          </TiltCard>

          {/* 3. BOTTOM RIGHT (Baby Accessories) */}
          <TiltCard
            href="/collections/accessories"
            className="flex-1 h-[300px] lg:h-auto">
            <div className="relative h-full w-full">
              <Image
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop"
                alt="Baby Accessories"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div
                className="absolute bottom-0 left-0 p-8 w-full"
                style={{ transform: "translateZ(40px)" }}>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Accessories
                </h3>
                <p className="text-gray-300 text-sm">
                  Eyes, noses & safety parts.
                </p>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FeaturedCollections;
