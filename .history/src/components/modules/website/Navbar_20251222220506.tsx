"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import PoshButton from "@/components/ui/PoshButton";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteSettings } from "@/services/SiteSettingService";

// ... (Interfaces remain the same)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<ISiteSetting | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // ... (Existing useEffects for fetch and scroll)

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
      {/* --- 1. TOP BAR (Desktop Only) --- */}
      <div
        className={cn(
          "hidden xl:flex w-full h-10 bg-gradient-to-r from-brand-red to-red-900 text-white text-[11px] items-center justify-between px-8 z-50 relative transition-all duration-300",
          isScrolled && "opacity-0 -translate-y-10 pointer-events-none"
        )}>
        {/* ... (Keep existing Top Bar content) */}
      </div>

      {/* --- 2. MAIN NAVBAR --- */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed z-50 w-full transition-all duration-500 flex items-center",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg top-0 h-16 md:h-20"
            : "top-0 xl:top-8 h-20 md:h-24"
        )}>
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-6">
          {/* LOGO */}
          <Link
            href="/"
            className="relative flex items-center shrink-0">
            <div
              className={cn(
                "relative transition-all duration-500",
                isScrolled
                  ? "h-8 w-24 md:h-10 md:w-32"
                  : "h-10 w-28 md:h-14 md:w-40"
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
                    "text-[14px] font-bold tracking-tight uppercase transition-colors",
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

          {/* ACTIONS (Desktop) */}
          <div className="hidden xl:flex items-center shrink-0">
            <Link href="/contact">
              <PoshButton className="bg-brand-red text-white px-6 py-2 text-xs font-bold uppercase tracking-widest">
                Get Quote
              </PoshButton>
            </Link>
          </div>

          {/* MOBILE TOGGLE (Beautiful Hamburger) */}
          <button
            className="xl:hidden group flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gray-50 hover:bg-brand-red/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}>
            <div className="flex flex-col gap-1.5 items-end">
              <span className="w-6 h-0.5 bg-brand-red rounded-full"></span>
              <span className="w-4 h-0.5 bg-brand-red rounded-full"></span>
              <span className="w-6 h-0.5 bg-brand-red rounded-full"></span>
            </div>
          </button>
        </div>
      </motion.header>

      {/* --- 3. PREMIUM MOBILE DRAWER --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] xl:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl xl:hidden flex flex-col">
              {/* Drawer Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <div className="relative h-8 w-24">
                  <Image
                    src={siteInfo.logo}
                    alt="logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600">
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-4 group border-b border-gray-50 last:border-0">
                        <span className="text-lg font-bold text-gray-900 uppercase tracking-tight group-hover:text-brand-red transition-colors">
                          {link.name}
                        </span>
                        <ChevronRight
                          size={18}
                          className="text-gray-300 group-hover:text-brand-red transition-all group-hover:translate-x-1"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer (Info & CTA) */}
              <div className="p-6 bg-gray-50 space-y-6">
                <div className="space-y-3">
                  <a
                    href={`tel:${siteInfo.phone}`}
                    className="flex items-center gap-3 text-sm font-medium text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-red">
                      <Phone size={14} />
                    </div>
                    {siteInfo.phone}
                  </a>
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="flex items-center gap-3 text-sm font-medium text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-red">
                      <Mail size={14} />
                    </div>
                    {siteInfo.email}
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all">
                    Request a Quote
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
