"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Quote,
  Loader2,
} from "lucide-react";
import { getSingleTeamMember } from "@/services/TeamService";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface ITeamMember {
  _id: string;
  name: string;
  designation: string;
  photo: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export default function TeamMemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState<ITeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await getSingleTeamMember(id as string);
        setMember(response.data || response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2
          className="animate-spin text-brand-red"
          size={48}
        />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-400">Member not found</h2>
        <Link
          href="/board-of-members"
          className="text-brand-red font-bold mt-4 hover:underline">
          Back to Board
        </Link>
      </div>
    );
  }

  return (
    // FIX: Reduced top padding on mobile (pt-24) vs desktop (md:pt-32)
    <main className="bg-white min-h-screen pt-24 md:pt-32 pb-24">
      <SectionWrapper>
        {/* Back Button */}
        <Link
          href="/board-of-members"
          // FIX: Reduced margin bottom on mobile
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-red transition-colors mb-8 md:mb-12 font-medium">
          <ArrowLeft size={18} /> Back to Board
        </Link>

        {/* FIX: Reduced gap on mobile (gap-8) vs desktop (lg:gap-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* --- LEFT: PHOTO CARD --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative">
            {/* FIX: Changed aspect-3/4 to aspect-[3/4] for valid Tailwind JIT */}
            <div className="relative aspect-3/4 w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-gray-100">
              <Image
                src={member.photo || "/placeholder-user.jpg"}
                alt={member.name}
                fill
                className="object-cover"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

              {/* Bottom Info on Image */}
              {/* FIX: Adjusted padding for mobile */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
                {/* FIX: Smaller font on mobile */}
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {member.name}
                </h1>
                <p className="text-brand-yellow font-mono uppercase tracking-widest text-xs md:text-sm">
                  {member.designation}
                </p>
              </div>
            </div>

            {/* Decorative Element behind */}
            <div className="absolute top-12 -left-12 w-full h-full border-2 border-gray-100 rounded-[2.5rem] -z-10 hidden lg:block" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* --- RIGHT: BIO & DETAILS --- */}
        </div>
      </SectionWrapper>
    </main>
  );
}
