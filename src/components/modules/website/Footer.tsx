"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Music, // For TikTok
  Disc, // For Reddit
  Pin, // For Pinterest
} from "lucide-react";
import { getSiteSettings } from "@/services/SiteSettingService";
import { ISiteSetting } from "@/types/siteSettings.types";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<ISiteSetting | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSiteSettings();
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching site settings for footer:", error);
      }
    };
    fetchSettings();
  }, []);

  // --- COMPREHENSIVE SOCIAL MEDIA MAPPING ---
  const socialIcons = [
    { Icon: Facebook, link: settings?.socialLinks?.facebook },
    { Icon: Instagram, link: settings?.socialLinks?.instagram },
    { Icon: Linkedin, link: settings?.socialLinks?.linkedin },
    { Icon: Twitter, link: settings?.socialLinks?.twitter },
    { Icon: Music, link: settings?.socialLinks?.tiktok },
    { Icon: Pin, link: settings?.socialLinks?.pinterest },
    { Icon: Disc, link: settings?.socialLinks?.reddit },
  ].filter((social) => social.link);

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Changed to 3 columns for a cleaner look since Support is removed */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16 mb-16">
          {/* COL 1: BRAND INFO & SOCIALS */}
          <div className="space-y-8">
            <div className="relative w-40 h-14">
              <Image
                src={settings?.logo || "/gsl-logo.webp"}
                alt={settings?.siteName || "Logo"}
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {settings?.siteName || "KFT Toys"} - Premium manufacturing and
              global export solutions. Dedicated to safety, quality, and
              child-friendly engineering since day one.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {socialIcons.map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-300 group shadow-lg">
                  <Icon
                    size={20}
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* COL 2: QUICK NAVIGATION */}
          <div className="lg:pl-20">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red"></span>
              Quick Links
            </h3>
            <ul className="space-y-5">
              {[
                { label: "Home", path: "/" },
                { label: "Our Collection", path: "/products" },
                { label: "About Our Story", path: "/about" },
                { label: "News & Guides", path: "/news" },
                { label: "Resources", path: "/resources" },
                { label: "Contact Support", path: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className="text-gray-400 hover:text-brand-red transition-all duration-300 flex items-center gap-3 text-sm group">
                    <ArrowRight
                      size={14}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: CONTACT DETAILS */}
          <div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
              Get In Touch
            </h3>
            <ul className="space-y-7">
              <li className="flex items-start gap-4 text-gray-400 text-sm">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin
                    size={18}
                    className="text-brand-red"
                  />
                </div>
                <span className="leading-relaxed">
                  {settings?.address || "Loading factory address..."}
                </span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors">
                  <Mail
                    size={18}
                    className="text-brand-red group-hover:text-white"
                  />
                </div>
                <a
                  href={`mailto:${settings?.email}`}
                  className="hover:text-white transition-colors">
                  {settings?.email || "Loading email..."}
                </a>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors">
                  <Phone
                    size={18}
                    className="text-brand-red group-hover:text-white"
                  />
                </div>
                <a
                  href={`tel:${settings?.phone}`}
                  className="hover:text-white transition-colors">
                  {settings?.phone || "Loading contact number..."}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs tracking-wide">
            © {currentYear} {settings?.siteName || "KFT Toys"}. All rights
            Reserved.
          </p>

          <div className="flex items-center gap-2 text-gray-600 text-[10px] font-mono uppercase tracking-widest">
            <span>Powered by</span>
            <Link
              href="https://marcelinestudios.com/"
              target="_blank"
              className="text-brand-red font-bold hover:text-white transition-colors px-2 py-1 bg-white/5 rounded">
              Marceline Studios
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
