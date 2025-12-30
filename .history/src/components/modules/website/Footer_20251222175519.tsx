"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* =========================================
            TOP SECTION: 4 COLUMNS
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* COL 1: BRAND INFO */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter">
              K<span className="text-brand-red">F</span>T
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              World-class toy manufacturing and export. Creating smiles across
              the globe with safety, quality, and precision engineering.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-300 group">
                  <Icon
                    size={18}
                    className="text-gray-400 group-hover:text-white"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* COL 2: QUICK LINKS */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
              Company
            </h3>
            <ul className="space-y-4">
              {[
                "About Us",
                "Our Factory",
                "Sustainability",
                "Careers",
                "News & Media",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">
                    <ArrowRight
                      size={14}
                      className="opacity-0 hover:opacity-100 transition-opacity"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: PRODUCTS & SUPPORT */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red"></span>
              Support
            </h3>
            <ul className="space-y-4">
              {[
                "Soft Toys",
                "Pet Toys",
                "Custom Manufacturing",
                "Quality Policy",
                "Contact Support",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">
                    <ArrowRight
                      size={14}
                      className="opacity-0 hover:opacity-100 transition-opacity"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: CONTACT INFO */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span>
                  123 Industrial Area, Tejgaon,
                  <br />
                  Dhaka - 1208, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-brand-red shrink-0" />
                <span>hello@kft-toys.com</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-brand-red shrink-0" />
                <span>+880 1234 567 890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================
            BOTTOM BAR: COPYRIGHT
        ========================================= */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} KFT Toys. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-brand-yellow text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-brand-yellow text-xs transition-colors">
              Terms of Service
            </Link>
          </div>

          <p className="text-gray-600 text-xs font-mono">
            Designed by{" "}
            <span className="text-brand-yellow">Marceline Studios</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
