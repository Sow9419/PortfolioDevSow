
import React from "react";
import Showcase from "./components/project/showcase";
import EducationSection from "./components/education/education-section";
import HeroSection from "./components/hero/herosection";
import StackSection from "./components/stack/stack-section";
import { FloatingIconsHero } from "./components/ui/floating-icons-hero-section";

const heroIcons = [
  { id: 1, name: "React", comment: "Frontend Core", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", className: "top-[15%] left-[10%]" },
  { id: 2, name: "Next.js", comment: "Fullstack Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", className: "top-[25%] right-[15%]" },
  { id: 3, name: "TypeScript", comment: "Type Safety", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", className: "bottom-[20%] left-[20%]" },
  { id: 4, name: "Tailwind", comment: "Styling", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", className: "bottom-[30%] right-[10%]" },
  { id: 5, name: "Supabase", comment: "Backend as a Service", logo: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg", className: "top-[40%] left-[5%]" },
  { id: 6, name: "Firebase", comment: "Cloud Platform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", className: "top-[60%] right-[5%]" },
  { id: 7, name: "Docker", comment: "Containerization", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", className: "bottom-[10%] left-[40%]" },
  { id: 8, name: "Figma", comment: "Design Tool", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", className: "top-[10%] right-[40%]" },
];

export default function App() {
  return (
    <div className="flex flex-col w-full bg-black">
      <FloatingIconsHero 
        title="DRAMANE SOW"
        subtitle="Développeur Fullstack & Expert en Automatisation IA. Je conçois des solutions innovantes pour propulser vos projets."
        ctaText="Découvrir mon travail"
        ctaHref="#projects"
        icons={heroIcons}
      />
      <HeroSection />
      <div id="projects">
        <Showcase />
      </div>
      <StackSection />
      <EducationSection />
    </div>
  );
}
