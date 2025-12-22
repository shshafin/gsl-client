"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import PoshButton from "@/components/ui/PoshButton";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteSettings } from "@/services/SiteSettingService";

interface ISiteSetting {
  siteName: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<ISiteSetting | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSiteSettings();
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Professional Nav Item Names
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Leadership", href: "/board-of-members" },
    { name: "Our Collection", href: "/products" },
    { name: "Corporate Profile", href: "/about" },
    { name: "Media & Insights", href: "/news" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  const siteInfo = {
    email: settings?.email || "info@goldensonbd.com",
    phone: settings?.phone || "+ 88 031 617934",
    address:
      settings?.address || "Khowaj Nagar, Ajimpara, Karnaphuli, Chattogram.",
    logo: settings?.logo || "/gsl-logo.webp",
    name: settings?.siteName || "GSL Export",
  };

  return (
    <>
      {/* --- 1. TOP BAR --- */}
      <div
        className={cn(
          "hidden lg:flex w-full h-10 bg-linear-to-r from-brand-red to-red-900 text-white text-[11px] items-center justify-between px-8 z-50 relative transition-all duration-300",
          isScrolled && "opacity-0 -translate-y-10 pointer-events-none"
        )}>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${siteInfo.email}`}
            className="flex items-center gap-2 hover:text-brand-yellow transition-colors">
            <Mail
              size={12}
              className="text-brand-yellow"
            />
            <span>{siteInfo.email}</span>
          </a>
          <a
            href={`tel:${siteInfo.phone}`}
            className="flex items-center gap-2 hover:text-brand-yellow transition-colors">
            <Phone
              size={12}
              className="text-brand-yellow"
            />
            <span>{siteInfo.phone}</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPin
            size={12}
            className="text-brand-yellow"
          />
          <span>{siteInfo.address}</span>
        </div>
      </div>

      {/* --- 2. MAIN NAVBAR --- */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 lg:top-10 z-40 w-full transition-all duration-500",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 lg:top-0 py-2"
            : "bg-transparent py-5"
        )}>
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          {/* LOGO */}
          <Link
            href="/"
            className="relative flex items-center shrink-0">
            <div
              className={cn(
                "relative transition-all duration-500",
                isScrolled
                  ? "h-9 w-28 md:h-10 md:w-32"
                  : "h-12 w-36 md:h-16 md:w-44"
              )}>
              <Image
                src={siteInfo.logo}
                alt={siteInfo.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* DESKTOP LINKS (Hidden on MD/Tablet to prevent layout breaks) */}
          <nav className="hidden lg:flex items-center xl:gap-7 lg:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2">
                <span
                  className={cn(
                    "text-[12px] font-bold tracking-tight uppercase transition-colors duration-300",
                    isScrolled
                      ? "text-gray-800"
                      : "text-gray-900 group-hover:text-brand-red"
                  )}>
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link href="/contact">
              <PoshButton
                className="shadow-lg h-10 px-6 text-[11px] font-black uppercase tracking-widest
                           bg-linear-to-r from-brand-red to-red-800 text-white
                           hover:shadow-red-500/20 transition-all active:scale-95">
                Inquiry
              </PoshButton>
            </Link>
          </div>

          {/* MOBILE/MD TOGGLE (Shows on all screens smaller than LG) */}
          <button
            className="lg:hidden p-2 rounded-lg bg-gray-100 text-brand-dark transition-colors active:bg-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE & MD MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed inset-0 top-15 md:top-18 w-full bg-white z-[60] lg:hidden overflow-y-auto">
              <div className="flex flex-col p-8 space-y-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}>
                    <Link
                      href={link.href}
                      className="text-2xl font-black text-gray-900 uppercase tracking-tighter hover:text-brand-red transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-10 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                    Global Support
                  </p>
                  <a
                    href={`tel:${siteInfo.phone}`}
                    className="text-brand-red font-black text-2xl block mb-2">
                    {siteInfo.phone}
                  </a>
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="text-gray-600 font-medium">
                    {siteInfo.email}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
