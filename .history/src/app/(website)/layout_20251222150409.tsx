import React from "react";
import Navbar from "@/components/modules/website/Navbar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light">
      {/* 1. The Sticky Navbar */}
      <Navbar />

      {/* 2. The Page Content */}
      <main className="flex-1">
        {/* REMOVED 'pt-20': 
           We want the Hero Section to touch the top of the screen 
           so the Navbar floats over the image.
        */}
        {children}
      </main>

      {/* 3. Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t bg-white">
        © 2025 Golden Son Ltd. All rights reserved.
      </footer>
    </div>
  );
}
