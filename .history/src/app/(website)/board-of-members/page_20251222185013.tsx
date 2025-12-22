"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Loader2,
  Users,
  ArrowUpRight,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getAllTeamMembers } from "@/services/TeamService";

// --- TYPES ---
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
  displayOrder: number;
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
    <Link
      href={`/team/${member._id}`}
      className="block h-full">
      <motion.div
        variants={cardVariants}
        className="group relative h-[450px] w-full rounded-[2rem] overflow-hidden bg-gray-100 shadow-lg border border-gray-200 cursor-pointer">
        {/* 1. IMAGE LAYER (Full Color Default) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={member.photo || "/placeholder-user.jpg"}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* 2. HOVER OVERLAY (Red Blend Shadow) */}
          {/* Default: Transparent / Hover: Red Gradient from bottom */}
          <div className="absolute inset-0 bg-linear-to-t from-brand-red/90 via-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Permanent subtle gradient for text readability at bottom */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
        </div>

        {/* 3. CONTENT LAYER */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-10 transition-transform duration-500 group-hover:-translate-y-2">
          {/* Name & Title */}
          <div className="relative z-20">
            <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
              {member.name}
            </h3>
            <p className="text-brand-yellow font-medium uppercase tracking-wider text-xs font-mono mb-4">
              {member.designation}
            </p>
          </div>

          {/* Social Icons (Reveal on Hover) */}
          <div className="flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {member.socialLinks?.linkedin && (
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-brand-red transition-colors">
                <Linkedin size={16} />
              </div>
            )}
            {member.socialLinks?.twitter && (
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-brand-red transition-colors">
                <Twitter size={16} />
              </div>
            )}

            <span className="ml-auto text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1">
              View Profile <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function BoardPage() {
  const [members, setMembers] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getAllTeamMembers();
        const memberList = response.data || response;

        // ⚡ FIX: Explicitly Sort by Display Order
        const sortedList = [...memberList].sort(
          (a: ITeamMember, b: ITeamMember) => {
            return (a.displayOrder || 0) - (b.displayOrder || 0);
          }
        );

        setMembers(sortedList);
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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-red to-red-800">
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
