"use client";

import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Award } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    title: "Our Mission",
    description:
      "To bring joy to children worldwide by manufacturing safe, innovative, and eco-friendly toys that meet global standards.",
    icon: Target,
    color: "text-brand-red",
  },
  {
    title: "Our Vision",
    description:
      "To become the world's most trusted toy exporter, recognized for our commitment to quality, sustainability, and ethical manufacturing.",
    icon: Eye,
    color: "text-brand-yellow",
  },
  {
    title: "Premium Quality",
    description:
      "We adhere to strict international safety certifications (ISO 9001, CE). Every stitch is inspected to ensure durability and safety.",
    icon: ShieldCheck,
    color: "text-brand-red",
  },
];

const MissionQualitySection = () => {
  return (
    <SectionWrapper className="bg-white relative overflow-hidden">
      {/* Background Decor (Subtle Global Map or Abstract) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-[0.03] pointer-events-none">
        <Award size={400} />
      </div>

      <SectionHeading
        title="Excellence in Every Stitch"
        subtitle="Our Philosophy"
        className="relative z-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered animation
            whileHover={{ y: -10 }} // Lift effect on hover
            className="group relative bg-brand-light p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Hover Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-brand-yellow/50 transition-colors duration-300" />

            {/* Icon Container */}
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
              <feature.icon
                size={32}
                className={feature.color}
              />
            </div>

            <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default MissionQualitySection;
