/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  Variants,
} from "framer-motion";
import {
  Award,
  Calendar,
  TrendingUp,
  Leaf,
  ShieldCheck,
  Factory,
  ChevronDown,
  Heart,
  Globe,
  Zap,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getAllFaqs } from "@/services/FaqService";
import { cn } from "@/lib/utils";

// --- TYPES ---
interface IFaq {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

// --- GALLERY DATA ---
const departmentGallery = [
  {
    id: "cutting",
    title: "Cutting",
    images: [
      "/gallery/_A9A0137.JPG",
      "/gallery/_A9A0138.JPG",
      "/gallery/_A9A0139.JPG",
      "/gallery/_A9A0141.JPG",
      "/gallery/_A9A0142.JPG",
      "/gallery/_A9A0143.JPG",
      "/gallery/_A9A0144.JPG",
      "/gallery/IMG_8533.JPG",
      "/gallery/IMG_8563.JPG",
      "/gallery/IMG_8564.JPG",
      "/gallery/IMG_8565.JPG",
      "/gallery/IMG_8566.JPG",
      "/gallery/IMG_8567.JPG",
    ],
  },
  {
    id: "embroidery",
    title: "Embroidery",
    images: [
      "/gallery/emb-1.jpg",
      "/gallery/emb-2.jpg",
      "/gallery/emb-3.jpg",
      "/gallery/emb-4.jpg",
      "/gallery/emb-5.jpg",
      "/gallery/emb-6.jpg",
      "/gallery/emb-7.jpg",
      "/gallery/emb-8.jpg",
      "/gallery/emb-9.jpg",
      "/gallery/emb-10.jpg",
      "/gallery/emb-11.jpg",
      "/gallery/emb-12.jpg",
      "/gallery/emb-13.jpg",
      "/gallery/emb-14.jpg",
      "/gallery/emb-15.jpg",
      "/gallery/emb-16.jpg",
      "/gallery/emb-17.jpg",
      "/gallery/emb-18.jpg",
      "/gallery/emb-19.jpg",
      "/gallery/emb-20.jpg",
      "/gallery/emb-21.jpg",
      "/gallery/emb-22.jpg",
      "/gallery/emb-23.jpg",
      "/gallery/emb-24.jpg",
      "/gallery/emb-25.jpg",
      "/gallery/emb-26.jpg",
      "/gallery/emb-27.jpg",
      "/gallery/emb-28.jpg",
      "/gallery/emb-29.jpg",
      "/gallery/emb-30.jpg",
    ],
  },
  {
    id: "handwork",
    title: "Hand Work",
    images: [
      "/gallery/hand-1.jpg",
      "/gallery/hand-2.jpg",
      "/gallery/hand-3.jpg",
      "/gallery/hand-4.jpg",
      "/gallery/hand-5.jpg",
      "/gallery/hand-6.jpg",
      "/gallery/hand-7.jpg",
      "/gallery/hand-8.jpg",
      "/gallery/hand-9.jpg",
      "/gallery/hand-10.jpg",
      "/gallery/hand-11.jpg",
      "/gallery/hand-12.jpg",
      "/gallery/hand-13.jpg",
      "/gallery/hand-14.jpg",
      "/gallery/hand-15.jpg",
    ],
  },
  {
    id: "packing",
    title: "Packing",
    images: [
      "/gallery/pack-1.jpg",
      "/gallery/pack-2.jpg",
      "/gallery/pack-3.jpg",
      "/gallery/pack-4.jpg",
      "/gallery/pack-5.jpg",
      "/gallery/pack-6.jpg",
      "/gallery/pack-7.jpg",
      "/gallery/pack-8.jpg",
      "/gallery/pack-9.jpg",
      "/gallery/pack-10.jpg",
      "/gallery/pack-11.jpg",
      "/gallery/pack-12.jpg",
      "/gallery/pack-13.jpg",
      "/gallery/pack-14.jpg",
    ],
  },
  {
    id: "qc",
    title: "Quality Control",
    images: [
      "/gallery/qc-1.jpg",
      "/gallery/qc-2.jpg",
      "/gallery/qc-3.jpg",
      "/gallery/qc-4.jpg",
      "/gallery/qc-5.jpg",
      "/gallery/qc-6.jpg",
      "/gallery/qc-7.jpg",
      "/gallery/qc-8.jpg",
      "/gallery/qc-9.jpg",
      "/gallery/qc-10.jpg",
      "/gallery/qc-11.jpg",
      "/gallery/qc-12.jpg",
      "/gallery/qc-13.jpg",
      "/gallery/qc-14.jpg",
     
    ],
  },
  {
    id: "store",
    title: "Store",
    images: [
      "/gallery/store-1.jpg",
      "/gallery/store-2.jpg",
      "/gallery/store-3.jpg",
      "/gallery/store-4.jpg",
      "/gallery/store-5.jpg",
      "/gallery/store-6.jpg",
      "/gallery/store-7.jpg",
      "/gallery/store-8.jpg",
      "/gallery/store-9.jpg",
      "/gallery/store-10.jpg",
    ],
  },
  {
    id: "stuffing",
    title: "Stuffing",
    images: [
      "/gallery/stuff-1.jpg",
      "/gallery/stuff-2.jpg",
      "/gallery/stuff-3.jpg",
      "/gallery/stuff-4.jpg",
      "/gallery/stuff-5.jpg",
      "/gallery/stuff-6.jpg",
      "/gallery/stuff-7.jpg",
      "/gallery/stuff-8.jpg",
      "/gallery/stuff-9.jpg",
      "/gallery/stuff-10.jpg",
    ],
  },
  {
    id: "sewing",
    title: "Sewing",
    images: [
      "/gallery/sew-1.jpg",
      "/gallery/sew-2.jpg",
      "/gallery/sew-3.jpg",
      "/gallery/sew-4.jpg",
      "/gallery/sew-5.jpg",
      "/gallery/sew-6.jpg",
      "/gallery/sew-7.jpg",
      "/gallery/sew-8.jpg",
      "/gallery/sew-9.jpg",
      "/gallery/sew-10.jpg",
    ],
  },
];

const machineImages = ["/m-1.png", "/m-2.png", "/m-3.png", "/m-4.png"];

// --- ANIMATED TEXT COMPONENT ---
const AnimatedText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className={cn("flex flex-wrap", className)}>
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="mr-1.5 md:mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- FAQ ITEM ---
const FaqItem = ({
  faq,
  isOpen,
  onClick,
}: {
  faq: IFaq;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group">
        <span
          className={cn(
            "text-base md:text-lg font-bold transition-colors duration-300 pr-8",
            isOpen
              ? "text-brand-red"
              : "text-gray-800 group-hover:text-brand-red"
          )}>
          {faq.question}
        </span>
        <div
          className={cn(
            "p-2 rounded-full transition-all duration-300 shrink-0",
            isOpen
              ? "bg-brand-red text-white rotate-180"
              : "bg-gray-100 text-gray-500 group-hover:bg-brand-red/10 group-hover:text-brand-red"
          )}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden">
            <p className="text-gray-500 pb-6 leading-relaxed text-sm md:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AboutPage() {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Gallery State
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getAllFaqs();
        setFaqs(response.data || response);
      } catch (error) {
        console.error("Failed to load FAQs", error);
      } finally {
        setLoadingFaqs(false);
      }
    };
    fetchFaqs();
  }, []);

  // --- AUTOPLAY & SWIPE LOGIC ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeGallery !== null) {
      interval = setInterval(() => {
        setCurrentImgIndex(
          (prev) => (prev + 1) % departmentGallery[activeGallery].images.length
        );
      }, 5000); // 5 Second Autoplay
    }
    return () => clearInterval(interval);
  }, [activeGallery, currentImgIndex]);

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeGallery === null) return;
      if (e.key === "ArrowRight")
        setCurrentImgIndex(
          (prev) => (prev + 1) % departmentGallery[activeGallery].images.length
        );
      if (e.key === "ArrowLeft")
        setCurrentImgIndex((prev) =>
          prev === 0
            ? departmentGallery[activeGallery].images.length - 1
            : prev - 1
        );
      if (e.key === "Escape") setActiveGallery(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeGallery]);

  return (
    <main className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 w-full h-[120%]">
          <Image
            src="/office-cover.jpeg"
            alt="GSL Export Office"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 z-10 pb-20 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-brand-red text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-red/20">
                Since 2014
              </span>
              <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                BSCI Certified
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Captivating Imaginations <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-yellow to-orange-400">
                Worldwide.
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-xl max-w-2xl leading-relaxed font-light">
              Creating high-quality toys that combine classic designs with
              innovative creations, ensuring safe and engaging play experiences
              for every child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <div className="relative z-20 px-4 -mt-10 md:-mt-16 mb-20">
        <div className="max-w-7xl mx-auto bg-brand-red rounded-3xl shadow-2xl shadow-brand-red/30 p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { icon: Calendar, val: "2014", label: "Year Established" },
              { icon: Award, val: "BSCI", label: "International Certified" },
              { icon: TrendingUp, val: "100%", label: "Success Ratio" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="pt-4 md:pt-0 md:px-4">
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-4 text-brand-yellow" />
                <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                  {stat.val}
                </h3>
                <p className="text-white/80 text-xs md:text-sm uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. WHO WE ARE */}
      <SectionWrapper className="pt-0 pb-12 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6">
            <span className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm">
              <span className="w-8 h-0.5 bg-brand-red" />
              Who We Are
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Setting benchmarks with exceptional craftsmanship.
            </h2>
            <div className="prose prose-base md:prose-lg text-gray-500 leading-relaxed">
              <p>
                From classic designs to innovative creations, GSL Export ensures
                safe and engaging play experiences. We use{" "}
                <strong>non-toxic materials</strong> and undergo rigorous
                testing.
              </p>
              <p>
                With a focus on sustainability, we implement{" "}
                <strong>eco-friendly practices</strong>. GSL continues to set
                industry benchmarks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-3 text-gray-900 font-bold bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <ShieldCheck
                  className="text-brand-red"
                  size={24}
                />{" "}
                Safety First
              </div>
              <div className="flex items-center gap-3 text-gray-900 font-bold bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <Leaf
                  className="text-green-600"
                  size={24}
                />{" "}
                Eco-Friendly
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-100 md:h-150 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src="/factory-4.png"
              alt="Toys craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* 4. WHY WE ARE BEST? */}
      <div className="bg-neutral-950 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
        <SectionWrapper className="relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
              Our Promise
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Why We Are <span className="text-brand-red">Best?</span>
            </h2>
            <AnimatedText
              text="At GSL Export, we put children first in everything we create. Our products are specially designed for kids’ play, made from premium, non-toxic materials."
              className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed justify-center mb-12"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Child First", icon: Heart, desc: "Designed for joy." },
              {
                title: "Non-Toxic",
                icon: ShieldCheck,
                desc: "Hypoallergenic materials.",
              },
              {
                title: "Global Trust",
                icon: Globe,
                desc: "Chosen with confidence.",
              },
              { title: "Durability", icon: Zap, desc: "Endless joy." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 group">
                <div className="w-12 h-12 bg-brand-red/20 rounded-full flex items-center justify-center text-brand-red mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>

      {/* 5. NEW DEPARTMENT GALLERY (Bento + Lightbox with Swipe & Autoplay) */}
      <SectionWrapper className="bg-gray-50 py-24 overflow-hidden">
        <div className="text-center mb-16">
          <span className="text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
            Production Excellence
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
            Our <span className="text-brand-red">Departments</span>
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[180px] md:auto-rows-[280px]">
          {departmentGallery.map((dept, idx) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => {
                setActiveGallery(idx);
                setCurrentImgIndex(0);
              }}
              className={cn(
                "group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-xl",
                idx === 0 || idx === 7
                  ? "col-span-2 md:col-span-2"
                  : "col-span-1"
              )}>
              <Image
                src={dept.images[0]}
                alt={dept.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-xl md:text-3xl font-black uppercase tracking-tight">
                      {dept.title}
                    </h3>
                    <p className="text-brand-yellow text-[10px] md:text-xs font-bold">
                      {dept.images.length}+ Images
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {activeGallery !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10">
              <button
                onClick={() => setActiveGallery(null)}
                className="absolute top-8 right-8 text-white/50 hover:text-white z-[110] transition-colors">
                <X
                  size={40}
                  strokeWidth={1}
                />
              </button>

              <button
                onClick={() =>
                  setCurrentImgIndex((prev) =>
                    prev === 0
                      ? departmentGallery[activeGallery].images.length - 1
                      : prev - 1
                  )
                }
                className="hidden md:block absolute left-4 md:left-10 text-white/30 hover:text-white z-[110] transition-all">
                <ChevronLeft
                  size={60}
                  strokeWidth={1}
                />
              </button>
              <button
                onClick={() =>
                  setCurrentImgIndex(
                    (prev) =>
                      (prev + 1) %
                      departmentGallery[activeGallery].images.length
                  )
                }
                className="hidden md:block absolute right-4 md:right-10 text-white/30 hover:text-white z-[110] transition-all">
                <ChevronRight
                  size={60}
                  strokeWidth={1}
                />
              </button>

              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImgIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    drag="x" // Enable Swipe
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 50)
                        setCurrentImgIndex((prev) =>
                          prev === 0
                            ? departmentGallery[activeGallery].images.length - 1
                            : prev - 1
                        );
                      else if (info.offset.x < -50)
                        setCurrentImgIndex(
                          (prev) =>
                            (prev + 1) %
                            departmentGallery[activeGallery].images.length
                        );
                    }}
                    transition={{ type: "spring", damping: 25, stiffness: 120 }}
                    className="relative w-full h-[60vh] md:h-[80vh] cursor-grab active:cursor-grabbing">
                    <Image
                      src={
                        departmentGallery[activeGallery].images[currentImgIndex]
                      }
                      alt="Work step"
                      fill
                      className="object-contain pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* AUTOPLAY PROGRESS BAR */}
                <div className="w-full max-w-xs h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
                  <motion.div
                    key={`${activeGallery}-${currentImgIndex}`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full bg-brand-red"
                  />
                </div>

                <div className="mt-4 text-center">
                  <h4 className="text-white text-lg md:text-2xl font-black uppercase tracking-widest mb-2">
                    {departmentGallery[activeGallery].title}
                  </h4>
                  <p className="text-white/40 text-[10px] md:hidden">
                    Slide left or right to browse
                  </p>
                  <div className="hidden md:flex gap-2 justify-center mt-4">
                    {departmentGallery[activeGallery].images.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 transition-all duration-300 rounded-full",
                          i === currentImgIndex
                            ? "w-8 bg-brand-red"
                            : "w-2 bg-white/20"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionWrapper>

      {/* 6. ADVANCED MACHINERY */}
      <SectionWrapper className="py-24">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm mb-3">
            <Factory size={16} /> Our Infrastructure
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Advanced Machinery
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {machineImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-16/10 overflow-hidden rounded-[2rem] shadow-lg">
              <Image
                src={src}
                alt={`Machine ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-red/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-1">
                  Unit {index + 1}
                </p>
                <h3 className="text-white text-2xl font-bold">
                  Production Line
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* 7. FAQ SECTION */}
      <div className="bg-gray-50 border-t border-gray-200 py-24">
        <SectionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <span className="text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                Support Center
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked <br /> Questions
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Everything you need to know about our manufacturing process.
              </p>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 inline-block">
                <p className="text-sm font-bold text-gray-900 mb-1">
                  Still have questions?
                </p>
                <a
                  href="/contact"
                  className="text-brand-red font-bold text-sm flex items-center gap-2 hover:underline">
                  Contact Support <ShieldCheck size={16} />
                </a>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl border border-gray-100">
                {loadingFaqs ? (
                  <div className="flex justify-center py-12">
                    <Loader2
                      className="animate-spin text-brand-red"
                      size={32}
                    />
                  </div>
                ) : faqs.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">
                    No FAQs available.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {faqs.map((faq, index) => (
                      <FaqItem
                        key={faq._id}
                        faq={faq}
                        isOpen={openFaqIndex === index}
                        onClick={() =>
                          setOpenFaqIndex(openFaqIndex === index ? null : index)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </main>
  );
}
