// src/app/(website)/page.tsx
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <SectionWrapper>
      <SectionHeading
        title="Navbar Test"
        subtitle="Success"
      />
      <p className="text-center">The Navbar should be visible above! ☝️</p>
    </SectionWrapper>
  );
}
