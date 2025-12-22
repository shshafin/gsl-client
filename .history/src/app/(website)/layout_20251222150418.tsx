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
      <main className="flex-1 pt-20">
        {/* ^ pt-20 pushes content down so it's not hidden behind the fixed Navbar */}
        {children}
      </main>

      {/* 3. Footer (We will build this later) */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © 2025 GSL Export. All rights reserved.
      </footer>
    </div>
  );
}
