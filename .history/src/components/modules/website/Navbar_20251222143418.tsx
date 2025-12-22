"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Make sure you have lucide-react installed
import PoshButton from "@/components/ui/PoshButton";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect Scroll for Glass Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/#products" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}>
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* --- LOGO --- */}
        <Link
          href="/"
          className="relative flex items-center gap-2">
          {/* Replace '/gsl-logo.png' with your actual logo path */}
          <div className="relative h-12 w-32 md:h-14 md:w-40 transition-transform hover:scale-105">
            <Image
              src="/gsl-logo.png"
              alt="GSL Export"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-brand-dark transition-colors hover:text-brand-blue">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* --- CTA BUTTON --- */}
        <div className="hidden md:block">
          <Link href="/contact">
            <PoshButton
              variant="primary"
              size="sm">
              Get Quote
            </PoshButton>
          </Link>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t md:hidden animate-fade-in-up">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-brand-dark"
                onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}>
              <PoshButton
                variant="primary"
                className="w-full">
                Get Quote
              </PoshButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
