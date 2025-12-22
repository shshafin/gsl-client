"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Loader2,
  Users,
  Quote,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getAllTeamMembers } from "@/services/TeamService"; // Adjust path if needed

// --- TYPES (Based on your Backend Schema) ---
interface ISocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

interface ITeamMember {
  _id: string;
  name: string;
  designation: string;
  photo: string;
  bio?: string;
  socialLinks?: ISocialLinks;
}

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- TEAM CARD COMPONENT ---
const TeamCard = ({ member }: { member: ITeamMember }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative h-[450px] w-full rounded-[2rem] overflow-hidden bg-gray-100 shadow-lg border border-gray-200">
      {/* 1. IMAGE LAYER */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={member.photo || "/placeholder-user.jpg"} // Fallback image
          alt={member.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      {/* 2. CONTENT LAYER (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {/* Name & Title */}
        <div className="relative z-20 pb-4 border-b border-white/20 mb-4">
          <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
          <p className="text-brand-yellow font-medium uppercase tracking-wider text-xs">
            {member.designation}
          </p>
        </div>

        {/* Hidden Bio & Socials (Reveal on Hover) */}
        <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          {member.bio && (
            <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
              <Quote
                size={12}
                className="inline-block text-brand-red mr-1 rotate-180"
              />
              {member.bio}
            </p>
          )}

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {member.socialLinks?.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-full text-white hover:bg-brand-red hover:text-white transition-colors">
                <Linkedin size={16} />
              </a>
            )}
            {member.socialLinks?.twitter && (
              <a
                href={member.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-full text-white hover:bg-brand-red hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
            )}
            {member.socialLinks?.facebook && (
              <a
                href={member.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-full text-white hover:bg-brand-red hover:text-white transition-colors">
                <Facebook size={16} />
              </a>
            )}
            {member.socialLinks?.instagram && (
              <a
                href={member.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-full text-white hover:bg-brand-red hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Brand Accent */}
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-brand-yellow/50 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default function BoardPage() {
  const [members, setMembers] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Assuming your API returns { success: true, data: [...] } or just [...]
        // Adjust based on your actual response structure
        const response = await getAllTeamMembers();

        // Handle if response is wrapped in { data: ... }
        const memberList = response.data || response;

        setMembers(memberList);
      } catch (err) {
        setError("Failed to load team members.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      {/* --- HERO HEADER --- */}
      <section className="text-center px-4 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-red/5 shadow-sm text-brand-red text-xs font-bold uppercase tracking-widest mb-6 border border-brand-red/10">
            <Users size={14} />
            Our Leadership
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Visionaries Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-800">
              The Excellence
            </span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Meet the board of members and executive team driving innovation,
            quality, and global standards at our manufacturing facility.
          </p>
        </motion.div>
      </section>

      {/* --- TEAM GRID --- */}
      <SectionWrapper className="py-0">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2
              className="animate-spin text-brand-red"
              size={48}
            />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-20 bg-red-50 rounded-2xl">
            {error}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <h3 className="text-xl font-bold text-gray-400">
              No team members found.
            </h3>
            <p className="text-gray-400 text-sm">
              Please add members from the admin panel.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <TeamCard
                key={member._id}
                member={member}
              />
            ))}
          </motion.div>
        )}
      </SectionWrapper>
    </main>
  );
}
