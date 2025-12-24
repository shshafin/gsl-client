"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
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

  // Fetch Site Settings
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

  // Handle Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

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
      {/* --- 1. TOP BAR (Hidden on Mobile/Tablet) --- */}
      <div
        className={cn(
          "hidden xl:flex w-full h-10 bg-linear-to-r bg-[#bedae5] text-black text-[11px] items-center justify-between px-8 z-51 relative transition-all duration-300",
          isScrolled && "opacity-0 -translate-y-10 pointer-events-none"
        )}>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${siteInfo.email}`}
            className="flex items-center gap-2 hover:text-brand-red transition-colors">
            <Mail
              size={12}
              className="text-brand-red"
            />
            <span>{siteInfo.email}</span>
          </a>
          <a
            href={`tel:${siteInfo.phone}`}
            className="flex items-center gap-2 hover:text-brand-red transition-colors">
            <Phone
              size={12}
              className="text-brand-red"
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
          "fixed z-50 w-full transition-all duration-500 flex items-center",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl top-0 h-16 md:h-20 border-b border-gray-100"
            : "top-0 xl:top-8 h-20 md:h-24"
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
                  ? "h-8 w-24 md:h-10 md:w-32"
                  : "h-10 w-28 md:h-12 md:w-36 xl:h-16 xl:w-48"
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

          {/* DESKTOP LINKS (Hidden on md/mobile) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group">
                <span
                  className={cn(
                    "text-[14px] font-bold tracking-tight uppercase transition-colors duration-300",
                    isScrolled
                      ? "text-gray-800"
                      : "text-gray-900 group-hover:text-brand-red"
                  )}>
                  {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ACTIONS (Desktop Only) */}
          <div className="hidden xl:flex items-center shrink-0">
            <Link href="/contact">
              <PoshButton className="shadow-lg h-11 px-6 text-[11px] font-black uppercase tracking-widest bg-linear-to-r from-brand-red to-red-800 text-white hover:shadow-red-500/20 active:scale-95">
                Get Quote
              </PoshButton>
            </Link>
          </div>

          {/* MOBILE & TABLET TOGGLE */}
          <button
            className="xl:hidden p-3 rounded-full bg-gray-50 text-brand-red transition-all hover:bg-brand-red hover:text-white group"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu">
            <div className="flex flex-col gap-1.5 items-end">
              <span className="w-6 h-0.5 bg-current rounded-full transition-all group-hover:w-4"></span>
              <span className="w-4 h-0.5 bg-current rounded-full transition-all group-hover:w-6"></span>
              <span className="w-6 h-0.5 bg-current rounded-full"></span>
            </div>
          </button>
        </div>
      </motion.header>

      {/* --- 3. MOBILE/TABLET DRAWER MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 xl:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] sm:w-100 bg-white z-70 shadow-2xl xl:hidden flex flex-col">
              {/* Drawer Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <div className="relative h-10 w-28">
                  <Image
                    src={siteInfo.logo}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white text-gray-400 hover:text-brand-red shadow-sm transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-4 px-6">
                <nav className="flex flex-col">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-5 border-b border-gray-50 group">
                        <span className="text-lg font-bold text-gray-900 uppercase tracking-tight group-hover:text-brand-red transition-colors">
                          {link.name}
                        </span>
                        <ChevronRight
                          size={18}
                          className="text-gray-300 group-hover:text-brand-red transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer (Contact Info) */}
              <div className="p-6 bg-gray-50 space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Contact Us
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`tel:${siteInfo.phone}`}
                      className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-red">
                        <Phone size={14} />
                      </div>
                      {siteInfo.phone}
                    </a>
                    <a
                      href={`mailto:${siteInfo.email}`}
                      className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-red">
                        <Mail size={14} />
                      </div>
                      {siteInfo.email}
                    </a>
                  </div>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block">
                  <button className="w-full py-4 bg-linear-to-r from-brand-red to-red-800 text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-900/10 active:scale-[0.98] transition-all">
                    Get A Quote
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
