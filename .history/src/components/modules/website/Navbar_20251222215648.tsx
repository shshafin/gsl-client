/* eslint-disable @typescript-eslint/no-unused-vars */
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
      {/* Hidden on screens smaller than XL (1280px) to maximize space */}
      <div
        className={cn(
          "hidden xl:flex w-full h-10 bg-gradient-to-r from-brand-red to-red-900 text-white text-[11px] items-center justify-between px-8 z-50 relative transition-all duration-300",
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
          "fixed z-40 w-full transition-all duration-500",
          // Position adjustments for scrolled vs non-scrolled
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 top-0 py-2"
            : "top-0 xl:top-10 py-4"
        )}>
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-6">
          {/* LOGO - Responsive widths */}
          <Link
            href="/"
            className="relative flex items-center shrink-0">
            <div
              className={cn(
                "relative transition-all duration-500",
                isScrolled
                  ? "h-8 w-24 md:h-10 md:w-32"
                  : "h-10 w-28 md:h-14 md:w-40 xl:h-16 xl:w-48"
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

          {/* DESKTOP LINKS - Triggered only at XL (1280px+) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
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

          {/* ACTIONS - Hidden on MD/Tablet to prevent collision */}
          <div className="hidden xl:flex items-center shrink-0">
            <Link href="/contact">
              <PoshButton
                className="shadow-lg h-10 px-6 text-[11px] font-black uppercase tracking-widest
                           bg-gradient-to-r from-brand-red to-red-800 text-white
                           hover:shadow-red-500/20 transition-all active:scale-95">
                Get Quote
              </PoshButton>
            </Link>
          </div>

          {/* MOBILE TOGGLE - Shows for everything under 1280px (md, lg, etc) */}
          <button
            className="xl:hidden p-2 rounded-xl bg-gray-50 text-brand-dark transition-all hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 xl:hidden overflow-hidden">
              <div className="flex flex-col p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-black text-gray-900 uppercase tracking-tight hover:text-brand-red py-2 border-b border-gray-50 last:border-0"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 space-y-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-full py-4 bg-brand-red text-white text-center rounded-xl font-bold uppercase tracking-widest">
                      Get Quote
                    </div>
                  </Link>
                  <div className="flex flex-col gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Phone size={14} /> {siteInfo.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} /> {siteInfo.email}
                    </div>
                  </div>
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
