import type React from "react";
import { GlassSeparator } from "@/components/glass-separator";
import Studies from "../components/Studies";
import Certifications from "../components/Certifications";

export const EducationPage: React.FC = () => {
  return (
    <section id="education-page" className="w-full flex flex-col gap-6">
      {/* Studies Timeline Component */}
      <Studies />

      <GlassSeparator className="bg-white/10 my-2" />

      {/* Certifications 3D Morph Card Component */}
      <Certifications />
    </section>
  );
};

export default EducationPage;
