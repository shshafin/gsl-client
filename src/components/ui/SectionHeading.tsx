import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "mb-12 space-y-4",
        align === "center" ? "text-center" : "text-left",
        className
      )}>
      {subtitle && (
        <span className="block text-sm font-bold uppercase tracking-widest text-brand-yellow animate-fade-in-up">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl font-bold leading-tight text-brand-blue md:text-5xl animate-fade-in-up [animation-delay:200ms]">
        {title}
      </h2>
      <div
        className={cn(
          "h-1.5 w-24 rounded-full bg-brand-yellow",
          align === "center" ? "mx-auto" : ""
        )}
      />
    </div>
  );
};

export default SectionHeading;
