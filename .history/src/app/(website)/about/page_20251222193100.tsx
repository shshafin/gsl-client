"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
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

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className={className}>
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
            transition={{ duration: 0.3 }}
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

  // Parallax Scroll Effect
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

  return (
    <main className="bg-white min-h-screen">
      {/* =========================================
          1. HERO SECTION (Parallax)
      ========================================= */}
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

        {/* Cinematic Overlay */}
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

      {/* =========================================
          2. STATS STRIP (Floating)
      ========================================= */}
      <div className="relative z-20 px-4 -mt-10 md:-mt-16 mb-20">
        <div className="max-w-7xl mx-auto bg-brand-red rounded-3xl shadow-2xl shadow-brand-red/30 p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-4 md:pt-0">
              <Calendar className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-4 text-brand-yellow" />
              <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                2014
              </h3>
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-widest font-bold">
                Year Established
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="pt-8 md:pt-0">
              <Award className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-4 text-brand-yellow" />
              <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                BSCI
              </h3>
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-widest font-bold">
                International Certified
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pt-8 md:pt-0">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-4 text-brand-yellow" />
              <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                100%
              </h3>
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-widest font-bold">
                Success Ratio
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================
          3. WHO WE ARE
      ========================================= */}
      <SectionWrapper className="pt-0 pb-12 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8">
            <span className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm">
              <span className="w-8 h-0.5 bg-brand-red" />
              Who We Are
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Setting benchmarks with exceptional craftsmanship.
            </h2>
            <div className="prose prose-base md:prose-lg text-gray-500 leading-relaxed">
              <p>
                From classic designs to innovative creations, GSL Export ensures
                safe and engaging play experiences. Committed to the highest
                safety standards, we use <strong>non-toxic materials</strong>{" "}
                and undergo rigorous testing to ensure every toy’s durability
                and safety.
              </p>
              <p>
                With a focus on sustainability, we implement{" "}
                <strong>eco-friendly manufacturing practices</strong>. GSL
                Export continues to set industry benchmarks with its exceptional
                dedication to quality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4">
              <div className="flex items-center gap-3 text-gray-900 font-bold bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <ShieldCheck
                  className="text-brand-red shrink-0"
                  size={24}
                />{" "}
                Safety First
              </div>
              <div className="flex items-center gap-3 text-gray-900 font-bold bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <Leaf
                  className="text-green-600 shrink-0"
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
            className="relative h-100 md:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 border-8 border-white">
            <Image
              src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1000&auto=format&fit=crop"
              alt="Toys craftsmanship"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-60" />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* =========================================
          4. WHY WE ARE BEST (New Section)
      ========================================= */}
      <div className="bg-neutral-950 py-24 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

        <SectionWrapper className="relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
              Our Promise
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Why We Are <span className="text-brand-red">Best?</span>
            </h2>

            {/* ANIMATED TEXT BLOCK */}
            <AnimatedText
              text="At GSL Export, we put children first in everything we create. Our products are specially designed for kids’ play, made from premium, non-toxic, and hypoallergenic materials to ensure complete safety."
              className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed justify-center mb-12"
            />
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Child First",
                icon: Heart,
                desc: "Designed purely for joy & comfort.",
              },
              {
                title: "Non-Toxic",
                icon: ShieldCheck,
                desc: "Hypoallergenic premium materials.",
              },
              {
                title: "Global Trust",
                icon: Globe,
                desc: "Families choose us with confidence.",
              },
              {
                title: "Durability",
                icon: Zap,
                desc: "Crafted to inspire endless joy.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
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

          {/* CONCLUSION TEXT */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-gray-400 text-base md:text-lg italic">
              "We combine creativity, comfort, and durability to make toys that
              children love and parents trust. With strict quality control and
              international safety standards, every toy is crafted to inspire
              learning, imagination, and endless joy."
            </p>
          </div>
        </SectionWrapper>
      </div>

      {/* =========================================
          5. MACHINE GALLERY (4 Images)
      ========================================= */}
      <SectionWrapper className="py-24">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm mb-3">
            <Factory size={16} /> Our Infrastructure
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Advanced Machinery
          </h2>
        </div>

        {/* 2x2 Grid for 4 Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {machineImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lg">
              <Image
                src={src}
                alt={`Machine ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-linear-to-t from-brand-red/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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

      {/* =========================================
          6. FAQ SECTION
      ========================================= */}
      <div className="bg-gray-50 border-t border-gray-200 py-24">
        <SectionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Content */}
            <div className="lg:col-span-5">
              <span className="text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                Support Center
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked <br /> Questions
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Everything you need to know about our manufacturing process,
                safety standards, and export capabilities.
              </p>

              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 inline-block">
                <p className="text-sm font-bold text-gray-900 mb-1">
                  Still have questions?
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Can't find the answer you're looking for?
                </p>
                <a
                  href="/contact"
                  className="text-brand-red font-bold text-sm flex items-center gap-2 hover:underline">
                  Contact Support <ShieldCheck size={16} />
                </a>
              </div>
            </div>

            {/* Right: Accordion */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                {loadingFaqs ? (
                  <div className="flex justify-center py-12">
                    <Loader2
                      className="animate-spin text-brand-red"
                      size={32}
                    />
                  </div>
                ) : faqs.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">
                    No FAQs available at the moment.
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
