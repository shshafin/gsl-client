"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  TrendingUp,
  Leaf,
  ShieldCheck,
  Factory,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getAllFaqs } from "@/services/faq.service"; // Adjust path if needed

// --- TYPES ---
interface IFaq {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

// --- ACCORDION COMPONENT ---
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
          className={`text-lg font-bold transition-colors duration-300 ${
            isOpen
              ? "text-brand-red"
              : "text-gray-800 group-hover:text-brand-red"
          }`}>
          {faq.question}
        </span>
        <div
          className={`p-2 rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-brand-red text-white rotate-180"
              : "bg-gray-100 text-gray-500 group-hover:bg-brand-red/10 group-hover:text-brand-red"
          }`}>
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
            <p className="text-gray-500 pb-6 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AboutPage() {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // First one open by default

  // Fetch FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getAllFaqs();
        // Handle response structure (response.data or direct array)
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
          1. HERO SECTION (Office Cover)
      ========================================= */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/office-cover.jpeg" // 👈 Your specific image
          alt="GSL Export Office"
          fill
          priority
          className="object-cover"
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-red text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Since 2014
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                BSCI Certified
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Captivating Imaginations <br />
              <span className="text-brand-yellow">Worldwide.</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              GSL Export specializes in creating high-quality toys that combine
              classic designs with innovative creations, ensuring safe and
              engaging play experiences for every child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          2. STATS STRIP
      ========================================= */}
      <div className="bg-brand-red text-white py-12 relative z-20 -mt-2">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="p-4">
            <Calendar className="w-10 h-10 mx-auto mb-4 text-brand-yellow opacity-80" />
            <h3 className="text-4xl font-black mb-1">2014</h3>
            <p className="text-white/80 text-sm uppercase tracking-widest font-bold">
              Year Established
            </p>
          </div>

          <div className="p-4">
            <Award className="w-10 h-10 mx-auto mb-4 text-brand-yellow opacity-80" />
            <h3 className="text-4xl font-black mb-1">BSCI</h3>
            <p className="text-white/80 text-sm uppercase tracking-widest font-bold">
              International Certified
            </p>
          </div>

          <div className="p-4">
            <TrendingUp className="w-10 h-10 mx-auto mb-4 text-brand-yellow opacity-80" />
            <h3 className="text-4xl font-black mb-1">100%</h3>
            <p className="text-white/80 text-sm uppercase tracking-widest font-bold">
              Success Ratio
            </p>
          </div>
        </div>
      </div>

      <SectionWrapper>
        {/* =========================================
            3. MAIN NARRATIVE
        ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm">
              Who We Are
            </span>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Setting benchmarks with exceptional craftsmanship.
            </h2>
            <div className="prose prose-lg text-gray-500">
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

            <div className="flex gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-700 font-bold">
                <ShieldCheck className="text-brand-red" /> Safety First
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-bold">
                <Leaf className="text-brand-red" /> Eco-Friendly
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
            {/* Abstract representation or another nice shot */}
            <Image
              src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=1000&auto=format&fit=crop"
              alt="Toys craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* =========================================
            4. MACHINE GALLERY
        ========================================= */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-widest text-sm mb-2">
              <Factory size={16} /> Our Infrastructure
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Advanced Manufacturing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-4 h-[600px] md:h-[500px]">
            {/* Large Left Item */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3 md:row-span-2 relative rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1565514020176-db6d36e89006?q=80&w=1000&auto=format&fit=crop"
                alt="Machine 1"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* Top Middle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 md:row-span-1 relative rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
                alt="Machine 2"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop"
                alt="Machine 3"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            {/* Bottom Middle/Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-3 md:row-span-1 relative rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1635350736475-c8cef4b21906?q=80&w=1000&auto=format&fit=crop"
                alt="Machine 4"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          </div>
        </div>

        {/* =========================================
            5. FAQ SECTION (Dynamic)
        ========================================= */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about our manufacturing and export
              process.
            </p>
          </div>

          <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm">
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
      </SectionWrapper>
    </main>
  );
}
