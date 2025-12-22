"use client";

import { motion } from "framer-motion";
import {
  PenTool,
  Layers,
  Scissors,
  Divide,
  Feather,
  Cloud,
  Puzzle,
  CheckCircle,
  PackageCheck,
  Zap,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

// --- Process Data (Ordered logically by production flow) ---
const departments = [
  {
    id: "01",
    title: "Sample & Product Development",
    desc: "Where ideas come to life. Creating prototypes and testing designs.",
    icon: PenTool,
  },
  {
    id: "02",
    title: "Raw Materials Store",
    desc: "Sourcing premium, eco-friendly materials for global standards.",
    icon: Layers,
  },
  {
    id: "03",
    title: "Cutting",
    desc: "Precision laser and manual cutting for perfect shapes.",
    icon: Scissors,
  },
  {
    id: "04",
    title: "Embroidery",
    desc: "Detailed computerized embroidery for unique branding.",
    icon: Zap,
  },
  {
    id: "05",
    title: "Sewing & Hand Sewing",
    desc: "Expert craftsmanship blending machine speed with hand detail.",
    icon: Feather,
  },
  {
    id: "06",
    title: "Stuffing",
    desc: "Filling toys with care to achieve the perfect huggable density.",
    icon: Cloud,
  },
  {
    id: "07",
    title: "Accessories (Plastic & Poly)",
    desc: "Adding eyes, noses, and high-quality safety components.",
    icon: Puzzle,
  },
  {
    id: "08",
    title: "Quality Section",
    desc: "Rigorous testing (Metal Detection, Pull Test) and inspection.",
    icon: CheckCircle,
  },
  {
    id: "09",
    title: "Packing & Finishing",
    desc: "Professional finishing, tagging, and export-ready packaging.",
    icon: PackageCheck,
  },
];

const DepartmentsSection = () => {
  return (
    // DARK THEME for Industrial Feel
    <SectionWrapper className="bg-brand-dark text-white relative overflow-hidden">
      {/* Background Industrial Grids/Glows */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-red/20 rounded-full blur-[120px] pointer-events-none" />

      <SectionHeading
        title="Our Manufacturing Process"
        subtitle="Departments"
        className="relative z-10 mb-20"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative">
            {/* CARD CONTAINER */}
            <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              {/* HOVER GLOW EFFECT (Red) */}
              <div className="absolute inset-0 rounded-2xl bg-brand-red/0 group-hover:bg-brand-red/10 transition-colors duration-500" />

              {/* HEADER: Number & Icon */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-black text-white/10 group-hover:text-brand-yellow transition-colors duration-500 font-mono">
                  {dept.id}
                </span>
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 text-brand-yellow">
                  <dept.icon size={24} />
                </div>
              </div>

              {/* TEXT CONTENT */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors">
                {dept.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200">
                {dept.desc}
              </p>

              {/* DECORATIVE LINE */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-red group-hover:w-full transition-all duration-500 rounded-b-2xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default DepartmentsSection;
