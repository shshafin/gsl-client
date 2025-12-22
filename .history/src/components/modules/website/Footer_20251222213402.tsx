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
  Youtube,
  Globe,
} from "lucide-react";
import { getSiteSettings } from "@/services/SiteSettingService";


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

  // Helper to map social icons to backend links
  const socialIcons = [
    { Icon: Facebook, link: settings?.socialLinks?.facebook },
    { Icon: Instagram, link: settings?.socialLinks?.instagram },
    { Icon: Linkedin, link: settings?.socialLinks?.linkedin },
    { Icon: Twitter, link: settings?.socialLinks?.twitter },
  ].filter((social) => social.link); // Only show if link exists

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* COL 1: DYNAMIC BRAND INFO */}
          <div className="space-y-6">
            <div className="relative w-32 h-12">
              <Image
                src={settings?.logo || "/gsl-logo.webp"}
                alt={settings?.siteName || "Logo"}
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {settings?.siteName || "KFT Toys"} - World-class toy manufacturing
              and export. Creating smiles across the globe with safety, quality,
              and precision engineering.
            </p>

            {/* Dynamic Social Icons */}
            <div className="flex items-center gap-4">
              {socialIcons.map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
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
                { label: "About Us", path: "/about" },
                { label: "Our Products", path: "/products" },
                { label: "Board Members", path: "/board-of-members" },
                { label: "News & Media", path: "/news" },
                { label: "Resources", path: "/resources" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: SUPPORT */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red"></span>
              Support
            </h3>
            <ul className="space-y-4">
              {[
                "Quality Policy",
                "Safety Standards",
                "Custom Manufacturing",
                "Terms of Service",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: CONTACT INFO (Real Data) */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span>{settings?.address || "Loading address..."}</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-brand-red shrink-0" />
                <a
                  href={`mailto:${settings?.email}`}
                  className="hover:text-white">
                  {settings?.email || "Loading email..."}
                </a>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-brand-red shrink-0" />
                <a
                  href={`tel:${settings?.phone}`}
                  className="hover:text-white">
                  {settings?.phone || "Loading phone..."}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} {settings?.siteName || "KFT Toys"}. All rights
            reserved.
          </p>

          <p className="text-gray-600 text-xs font-mono">
            Designed by{" "}
            <Link
              href="https://marcelinestudios.com/"
              target="_blank"
              className="text-brand-red font-bold hover:text-white transition-colors">
              Marceline Studios
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
