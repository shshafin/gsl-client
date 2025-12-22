"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import PoshButton from "@/components/ui/PoshButton";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Board Of Members", href: "/board-of-members" },
    { name: "Collections", href: "/products" },
    { name: "About Us", href: "/about" },
    
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* --- 1. TOP BAR (Red Gradient + Real Info) --- */}
      <div className="hidden md:flex w-full h-10 bg-linear-to-r from-brand-red to-red-900 text-white text-xs items-center justify-between px-4 md:px-8 z-50 relative">
        <div className="flex items-center gap-6">
          {/* EMAIL */}
          <div className="flex items-center gap-2 hover:text-brand-yellow transition-colors cursor-pointer">
            <Mail
              size={14}
              className="text-brand-yellow"
            />
            <span>info@goldensonbd.com</span>
          </div>
          {/* PHONE */}
          <div className="flex items-center gap-2 hover:text-brand-yellow transition-colors cursor-pointer">
            <Phone
              size={14}
              className="text-brand-yellow"
            />
            <span>+ 88 031 617934</span>
          </div>
        </div>
        {/* ADDRESS */}
        <div className="flex items-center gap-2">
          <MapPin
            size={14}
            className="text-brand-yellow"
          />
          <span>Khowaj Nagar, Ajimpara, Karnaphuli, Chattogram.</span>
        </div>
      </div>

      {/* --- 2. MAIN NAVBAR --- */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 md:top-10 z-40 w-full transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-white/20 top-0! py-2"
            : "bg-transparent py-4"
        )}>
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          {/* LOGO */}
          <Link
            href="/"
            className="relative flex items-center">
            <div
              className={cn(
                "relative transition-all duration-300",
                isScrolled ? "h-10 w-32" : "h-14 w-40"
              )}>
              <Image
                src="/gsl-logo.webp"
                alt="GSL Export"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2">
                <span className="text-sm font-bold tracking-wide uppercase text-brand-dark transition-colors group-hover:text-brand-red">
                  {link.name}
                </span>
                {/* Yellow Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact">
              <PoshButton
                className="shadow-none border-none
                           h-9 px-6 text-xs uppercase tracking-widest
                           bg-linear-to-r from-brand-red to-red-900 text-brand-yellow
                           hover:from-brand-yellow hover:to-yellow-500 hover:text-brand-red">
                Get Quote
              </PoshButton>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-brand-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white shadow-xl border-t overflow-hidden md:hidden">
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-bold text-brand-dark hover:text-brand-red"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Need Help?</p>
                  <p className="text-brand-red font-bold">+ 88 031 617934</p>
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
