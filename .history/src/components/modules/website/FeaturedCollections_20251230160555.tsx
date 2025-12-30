/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FeaturedCollections = () => {
  return (
    <SectionWrapper className="bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-150 h-150 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-red text-sm font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
          Our Collections
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-brand-red mb-4 drop-shadow-sm">
          Explore Premium Products
        </h2>
        <p className="text-gray-500 mt-2 text-lg font-light px-4">
          Export quality toys and accessories for the global market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto lg:h-162.5 px-4 md:px-0">
        {/* 1. SOFT TOY */}
        <TiltCard
          href="/products?category=Soft Toy"
          className="md:col-span-1 lg:col-span-1 h-100 lg:h-full">
          <div className="relative h-full w-full">
            <Image
              src="/soft-toy.png"
              alt="Soft Toy"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-red/90 via-transparent to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-4xl font-bold text-white mb-2 shadow-sm">
                Soft Toy
              </h3>
              <p className="text-white/90 text-sm mb-4">
                Cotton & fabric plush toys.
              </p>
              <span className="inline-flex items-center text-brand-yellow font-bold text-sm uppercase group-hover:underline decoration-brand-yellow underline-offset-4">
                View Collection <ArrowUpRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </div>
        </TiltCard>

        <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-6 h-full">
          {/* 2. PLASTIC TOY */}
          <TiltCard
            href="/products?category=Pet Toy"
            className="h-75 lg:flex-1">
            <div className="relative h-full w-full">
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200"
                alt="Pet Toy"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-r from-brand-red/90 via-brand-red/10 to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1 shadow-sm">
                      Pet Toy
                    </h3>
                    <p className="text-white/90 text-sm">
                      Durable, safe, and fun.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform shadow-lg">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6">
            {/* 3. BABY ACCESSORIES */}
            <TiltCard
              href="/products?category=Baby Accessories"
              className="h-62.5 md:h-72 lg:h-full">
              <div className="relative h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800"
                  alt="Accessories"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-red/90 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-1 shadow-sm">
                    Baby Accessories
                  </h3>
                  <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest">
                    Eyes, noses & parts
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* 4. OTHERS */}
            <TiltCard
              href="/products?category=Others"
              className="h-62.5 md:h-72 lg:h-full">
              <div className="relative h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=800"
                  alt="Others"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-red/90 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-1 shadow-sm">
                    Others
                  </h3>
                  <p className="text-white/80 text-xs">
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
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
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
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full rounded-[2rem] overflow-hidden bg-white shadow-xl cursor-pointer group border border-brand-red/10 hover:border-brand-yellow/50 transition-colors">
        {children}
      </motion.div>
    </Link>
  );
};

export default FeaturedCollections;
