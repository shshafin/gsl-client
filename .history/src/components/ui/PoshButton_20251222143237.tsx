import React from "react";
import { cn } from "@/lib/utils"; // Ensure you have a cn utility or use clsx

interface PoshButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const PoshButton = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: PoshButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95";

  const variants = {
    primary:
      "bg-brand-blue text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-blue/90 hover:shadow-brand-blue/50 hover:-translate-y-1",
    secondary:
      "bg-brand-yellow text-brand-dark shadow-md hover:bg-brand-yellow/80 hover:-translate-y-1",
    outline:
      "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
    ghost: "text-brand-blue hover:bg-brand-blue/10",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-8 text-base",
    lg: "h-14 px-10 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}>
      {children}
    </button>
  );
};

export default PoshButton;
