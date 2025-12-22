"use client";

import { useState, useEffect, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
} from "lucide-react";
import { getSingleBlog } from "@/services/BlogService";
import { cn } from "@/lib/utils";

export default function SingleBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getSingleBlog(id);
        setBlog(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  const totalReadingTime = useMemo(() => {
    if (!blog?.content) return 0;
    const text = blog.content.replace(/<[^>]*>?/gm, "");
    return Math.ceil(text.split(/\s/g).length / 200);
  }, [blog]);

  const minutesRemaining = useTransform(
    scrollYProgress,
    [0, 1],
    [totalReadingTime, 0]
  );

  const [displayMinutes, setDisplayMinutes] = useState(totalReadingTime);
  useEffect(() => {
    return minutesRemaining.on("change", (latest) => {
      setDisplayMinutes(Math.ceil(latest));
    });
  }, [minutesRemaining]);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(blog?.title || "")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`,
  };

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
      {/* READING PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-red origin-left z-50 shadow-sm"
        style={{ scaleX }}
      />

      {/* DYNAMIC TIMER */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-10 right-10 z-40 hidden md:flex items-center gap-3 bg-white shadow-2xl border border-gray-100 px-5 py-3 rounded-2xl">
        <div className="bg-brand-red/10 p-2 rounded-lg text-brand-red">
          <Clock
            size={20}
            className="animate-pulse"
          />
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">
            Reading Time
          </p>
          <p className="text-sm font-black text-gray-900">
            {displayMinutes <= 0 ? "Finished" : `${displayMinutes} min left`}
          </p>
        </div>
      </motion.div>

      {/* HEADER SECTION */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-white" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl w-full text-center text-white">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all mb-8 font-medium">
              <ArrowLeft size={20} /> Back to News
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6">
              <span className="bg-brand-red px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                {blog.category}
              </span>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <Clock size={14} /> {totalReadingTime} MIN READ
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-10 drop-shadow-2xl">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-8 text-sm font-bold text-white/90">
              <div className="flex items-center gap-2">
                <User
                  size={18}
                  className="text-brand-red"
                />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar
                  size={18}
                  className="text-brand-red"
                />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <article className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-gray-50">
          {/* Share Section */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-10 mb-12 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                <Share2 size={20} />
              </div>
              <span className="text-gray-900 font-black text-sm uppercase">
                Share Story
              </span>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Facebook, color: "#1877F2", link: shareLinks.facebook },
                { icon: Twitter, color: "#1DA1F2", link: shareLinks.twitter },
                { icon: Linkedin, color: "#0A66C2", link: shareLinks.linkedin },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:-translate-y-1 shadow-sm"
                  style={{
                    backgroundColor: `${social.color}15`,
                    color: social.color,
                  }}>
                  <social.icon
                    size={22}
                    fill="currentColor"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* HTML CONTENT RENDERER - FIXED FOR OVERFLOW */}
          <div
            className={cn(
              "prose prose-lg md:prose-xl lg:prose-2xl max-w-none text-gray-700",
              "wrap-break-word overflow-hidden [word-break:break-word] [hyphens:auto]", // Key fix for overflow
              "prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight",
              "prose-p:leading-relaxed prose-p:mb-6",
              "prose-img:rounded-3xl prose-img:shadow-lg prose-img:mx-auto",
              "prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline",
              "prose-blockquote:border-l-4 prose-blockquote:border-brand-red prose-blockquote:bg-gray-50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl",
              "prose-ol:list-decimal prose-ul:list-disc prose-li:marker:text-brand-red prose-li:my-1" // Fix for lists
            )}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Footer Tags */}
          <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                Category
              </p>
              <span className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">
                {blog.category}
              </span>
            </div>
            <Link
              href="/news"
              className="group flex items-center gap-3 text-brand-red font-black text-lg hover:gap-5 transition-all">
              Explore More Articles{" "}
              <ArrowLeft
                className="rotate-180"
                size={24}
              />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
