import DepartmentsSection from "@/components/modules/website/DepartmentsSection";
import FeaturedCollections from "@/components/modules/website/FeaturedCollections";
import HeroSection from "@/components/modules/website/HeroSection";
import MissionQualitySection from "@/components/modules/website/MissionQualitySection";

export default function HomePage() {
  return (
    <>
      {/* The Hero Section (Banner) */}
      <HeroSection />
      <MissionQualitySection />
      <DepartmentsSection />
      <FeaturedCollections />

      {/* We will add more sections here next (Products, About, etc.) */}
    </>
  );
}
