import type React from "react";
import { ExternalLink, Github } from "lucide-react";
import { GlassMorphCard } from "@/components/glass-morph-card";
import { GlassButton } from "@/components/glass-button";
import { GlassBadge } from "@/components/glass-badge";
import type { ProjectItem } from "@/config/app-config.d";

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const hasActions = Boolean(project.liveUrl || project.githubUrl);

  return (
    <GlassMorphCard
      glowColor={project.glowColor || "cyan"}
      intensity={5}
      className="w-full h-full transition-all duration-300"
    >
      <div className="flex flex-col p-5 h-full justify-between gap-4">
        <div className="flex flex-col gap-4">
          {/* Large Thumbnail Image */}
          {project.image && (
            <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden border border-white/20 bg-slate-950/40 shadow-inner group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top-left transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {project.featured && (
                <div className="absolute top-2.5 right-2.5">
                  <GlassBadge
                    variant="primary"
                    className="text-[10px] uppercase font-mono px-2 py-0.5 shadow-md flex items-center gap-1"
                  >
                    <span>Featured</span>
                  </GlassBadge>
                </div>
              )}
            </div>
          )}

          {/* Title & Published Date */}
          <div>
            <h3 className="font-display text-lg font-bold text-white leading-snug">
              {project.title}
            </h3>
            {project.publishedAt && (
              <span className="text-[11px] font-mono text-white/50 mt-1 block">
                {project.publishedAt}
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="text-xs text-white/75 leading-relaxed font-sans line-clamp-3">
            {project.summary}
          </p>

          {/* Tech Stack Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons (Live URL & GitHub URL) */}
        {hasActions && (
          <div className="flex flex-wrap justify-start items-center gap-1 pt-3 border-t border-white/10 mt-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassButton
                  variant="default"
                  className="w-full justify-center text-xs font-semibold gap-1.5 py-2 cursor-pointer flex flex-row items-center"
                >
                  <span>Live URL</span>
                  <ExternalLink className="h-3 w-3 ml-0.5 opacity-80" />
                </GlassButton>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassButton
                  variant="outline"
                  className="w-full text-xs font-semibold gap-1.5 py-2 justify-center cursor-pointer flex flex-row items-center"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </GlassButton>
              </a>
            )}
          </div>
        )}
      </div>
    </GlassMorphCard>
  );
};

export default ProjectCard;
