"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

// --- 3D TILT CARD COMPONENT (Reused logic) ---
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]); // Reduced tilt slightly for elegance
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
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
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-[2rem] overflow-hidden bg-white shadow-xl cursor-pointer group perspective-1000 border border-gray-100">
        {children}
      </motion.div>
    </Link>
  );
};

const FeaturedCollections = () => {
  return (
    <SectionWrapper className="bg-gray-50 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none" />

      <SectionHeading
        title="Our Premium Collections"
        subtitle="Browse Categories"
        className="mb-12 relative z-10"
      />

      {/* --- BENTO GRID LAYOUT (4 ITEMS) --- */}
      {/* Desktop: 3 Columns 
          - Left: Soft Toys (Col 1 & 2 / Row 1 & 2) -> Actually let's do Left 1 Col (Tall), Right 1 Col (Stacked)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[650px]">
        {/* 1. SOFT TOYS (The Main Category - Left Tall) */}
        <TiltCard
          href="/products?category=soft-toys"
          className="lg:col-span-1 h-[400px] lg:h-full">
          <div className="relative h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1559715541-5daf8a0296d0?q=80&w=1000&auto=format&fit=crop" // Soft Toy Image
              alt="Soft Toys"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            <div
              className="absolute bottom-0 left-0 p-8 w-full"
              style={{ transform: "translateZ(50px)" }}>
              <h3 className="text-4xl font-bold text-white mb-2">Soft Toys</h3>
              <p className="text-gray-200 text-sm mb-4">
                Premium plush & stuffed animals.
              </p>
              <span className="inline-flex items-center text-brand-yellow font-bold text-sm uppercase tracking-widest group-hover:underline decoration-brand-yellow underline-offset-4">
                View Collection <ArrowUpRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </div>
        </TiltCard>

        {/* RIGHT SIDE CONTAINER (Spans 2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          {/* 2. PLASTIC TOYS (Top Wide) */}
          <TiltCard
            href="/products?category=plastic-toys"
            className="flex-1">
            <div className="relative h-full w-full">
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop" // Plastic Toy Image
                alt="Plastic Toys"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div
                className="absolute bottom-0 left-0 p-8 w-full"
                style={{ transform: "translateZ(40px)" }}>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      Plastic Toys
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Durable, safe, and fun.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* BOTTOM SPLIT (Baby Accessories + Others) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 3. BABY ACCESSORIES */}
            <TiltCard
              href="/products?category=baby-accessories"
              className="h-[250px] md:h-full">
              <div className="relative h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop" // Accessories Image
                  alt="Baby Accessories"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-red/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                <div
                  className="absolute bottom-0 left-0 p-6 w-full"
                  style={{ transform: "translateZ(30px)" }}>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Baby Accessories
                  </h3>
                  <p className="text-red-100 text-xs">
                    Eyes, noses & safety parts.
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* 4. OTHERS */}
            <TiltCard
              href="/products?category=others"
              className="h-[250px] md:h-full">
              <div className="relative h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=800&auto=format&fit=crop" // Abstract/Other Image
                  alt="Other Products"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                <div
                  className="absolute bottom-0 left-0 p-6 w-full"
                  style={{ transform: "translateZ(30px)" }}>
                  <h3 className="text-2xl font-bold text-white mb-1">Others</h3>
                  <p className="text-gray-300 text-xs">
                    Specialty items & more.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FeaturedCollections;
