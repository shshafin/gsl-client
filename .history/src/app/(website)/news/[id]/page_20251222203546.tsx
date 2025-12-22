"use client";

import { useState, useEffect, use } from "react"; // 1. Import 'use'
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { getSingleBlog } from "@/services/BlogService";

// --- HELPERS ---
const calculateReadingTime = (content: string) => {
  if (!content) return 0;
  const text = content.replace(/<[^>]*>?/gm, "");
  return Math.ceil(text.split(/\s/g).length / 200);
};

// 2. Update type to Promise
export default function SingleBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 3. Unwrap params using React.use()
  const { id } = use(params);

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // 4. Use 'id' instead of 'params.id'
        const response = await getSingleBlog(id);
        setBlog(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-white pt-32 text-center">Loading...</div>
    );
  if (!blog)
    return (
      <div className="min-h-screen bg-white pt-32 text-center">
        Blog not found
      </div>
    );

  return (
    <main className="bg-white min-h-screen pb-24">
      {/* --- READING PROGRESS BAR --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-red origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- HEADER IMAGE SECTION --- */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* Title Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl w-full text-center text-white">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 font-medium">
              <ArrowLeft size={20} /> Back to News
            </Link>

            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="bg-brand-red px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">
                {blog.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-white/80">
                <Clock size={14} /> {calculateReadingTime(blog.content)} MIN
                READ
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-8">
              {blog.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-sm font-medium text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <User size={18} />
                </div>
                <span>By {blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Calendar size={18} />
                </div>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ARTICLE CONTENT --- */}
      <article className="max-w-3xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl border border-gray-100">
          {/* Social Share */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">
              Share this story
            </span>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center hover:bg-indigo-700 hover:text-white transition-all">
                <Linkedin size={18} />
              </button>
            </div>
          </div>

          {/* HTML CONTENT RENDERER */}
          <div
            className="prose prose-lg md:prose-xl max-w-none text-gray-600 prose-headings:font-black prose-headings:text-gray-900 prose-a:text-brand-red prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags / Footer */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-400 text-sm font-medium">
              Posted in{" "}
              <span className="text-gray-900 font-bold">{blog.category}</span>
            </div>
            <Link
              href="/news"
              className="text-brand-red font-bold hover:underline">
              Read Next Article &rarr;
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
