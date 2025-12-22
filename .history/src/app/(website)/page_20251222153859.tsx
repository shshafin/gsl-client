import DepartmentsSection from "@/components/modules/website/DepartmentsSection";
import HeroSection from "@/components/modules/website/HeroSection";
import MissionQualitySection from "@/components/modules/website/MissionQualitySection";

export default function HomePage() {
  return (
    <>
      {/* The Hero Section (Banner) */}
      <HeroSection />
      <MissionQualitySection />
      <DepartmentsSection />

      {/* We will add more sections here next (Products, About, etc.) */}
    </>
  );
}
