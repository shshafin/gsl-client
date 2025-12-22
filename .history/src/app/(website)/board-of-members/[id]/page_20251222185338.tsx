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
          Back to Team
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      <SectionWrapper>
        {/* Back Button */}
        <Link
          href="/board-of-members"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-red transition-colors mb-12 font-medium">
          <ArrowLeft size={18} /> Back to Board
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* --- LEFT: PHOTO CARD --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100">
              <Image
                src={member.photo || "/placeholder-user.jpg"}
                alt={member.name}
                fill
                className="object-cover"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

              {/* Bottom Info on Image */}
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{member.name}</h1>
                <p className="text-brand-yellow font-mono uppercase tracking-widest text-sm">
                  {member.designation}
                </p>
              </div>
            </div>

            {/* Decorative Element behind */}
            <div className="absolute top-12 -left-12 w-full h-full border-2 border-gray-100 rounded-[2.5rem] -z-10 hidden lg:block" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* --- RIGHT: BIO & DETAILS --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-12 h-1 bg-brand-red rounded-full"></span>
                Biography
              </h2>

              <div className="relative pl-8 border-l-4 border-gray-100 mb-8">
                <Quote
                  className="absolute -top-2 -left-3 text-brand-yellow bg-white p-1"
                  size={32}
                  fill="currentColor"
                />
                <p className="text-gray-600 leading-relaxed text-lg italic">
                  {member.bio || "No biography available."}
                </p>
              </div>

              {/* Social Links Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                  Connect with {member.name.split(" ")[0]}
                </h3>
                <div className="flex items-center gap-4">
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.socialLinks?.facebook && (
                    <a
                      href={member.socialLinks.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                      <Facebook size={20} />
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a
                      href={member.socialLinks.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-[#E4405F] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </main>
  );
}
