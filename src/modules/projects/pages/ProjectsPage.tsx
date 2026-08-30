import React, { useMemo } from "react";
import ProjectCard from "../components/ProjectCard";
import { appConfig } from "@/config/app-config";

export const ProjectsPage: React.FC = () => {
  const { projects } = appConfig;

  const sortedProjects = useMemo(() => {
    return [...projects.projects].sort((a, b) => {
      if (!a.publishedAt) return 1;
      if (!b.publishedAt) return -1;
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
  }, [projects.projects]);

  return (
    <section id="projects-page" className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white tracking-wide">
            {projects.title}
          </h2>
        </div>
      </div>

      {/* Responsive Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
