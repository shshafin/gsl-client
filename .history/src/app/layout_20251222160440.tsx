import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // 👈 Changed from Inter to Outfit
import "./globals.css";
import { Toaster } from "sonner";

// 1. Configure the premium font
const outfit = Outfit({
  subsets: ["latin"],
  // This variable allows us to use it in Tailwind/CSS as var(--font-outfit)
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GSL Export Ltd. | Global Toy Leader", // 👈 Improved title
  description:
    "Premium manufacturer and exporter of soft toys, plastic toys, and baby accessories.",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth">
      {" "}
      {/* 👈 Added smooth scrolling */}
      <body
        className={`${outfit.variable} antialiased bg-brand-light text-brand-dark`}>
        {children}
        <Toaster
          position="top-center"
          richColors
          theme="light" // Force light theme for consistency
          closeButton
        />
      </body>
    </html>
  );
}
