import type React from "react";
import ExperienceTimeline from "../components/ExperienceTimeline";

export const WorkPage: React.FC = () => {
  return (
    <section id="work-page" className="w-full flex flex-col gap-6">
      <ExperienceTimeline />
    </section>
  );
};

export default WorkPage;
