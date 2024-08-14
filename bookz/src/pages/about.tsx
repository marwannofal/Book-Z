import { useEffect } from "react";
import MissionSection from "@/components/about/mission";
import HeaderSection from "@/components/about/header";
import TeamSection from "@/components/about/team";
import TestimonialsSection from "@/components/about/testimnials";
import useScrollFadeIn from "@/hooks/useScrollFadeIn";

const AboutUs: React.FC = () => {
  useScrollFadeIn();

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 py-16 ">
      <HeaderSection />
      <MissionSection />
      <TeamSection />
      <TestimonialsSection />
    </div>
  );
};

export default AboutUs;
