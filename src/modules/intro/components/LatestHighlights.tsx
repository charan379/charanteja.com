import React from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  FolderGit2,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { GlassCard, GlassCardContent } from "@/components/glass-card";
import { GlassBadge } from "@/components/glass-badge";
import { GlassMorphCard } from "@/components/glass-morph-card";
import { GlassButton } from "@/components/glass-button";
import ProjectCard from "@/modules/projects/components/ProjectCard";
import { appConfig } from "@/config/app-config";

export const LatestHighlights: React.FC = () => {
  // 1. Latest Work Experience
  const latestExperience = appConfig.work.experiences[0];

  // 2. Latest Project (sorted by published date)
  const sortedProjects = [...appConfig.projects.projects].sort((a, b) => {
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
  const latestProject = sortedProjects[0];

  // 3. Latest Study & Latest Certification
  const latestStudy = appConfig.education.studies[0];
  const latestCert = appConfig.education.certifications[0];

  return (
    <div className="flex flex-col gap-6 w-full mt-6">
      {/* 1. LATEST EXPERIENCE */}
      {latestExperience && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
              </div>
              <h2 className="text-lg font-bold font-display text-white">
                Currently Working At
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors group"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <GlassCard
            glowEffect={false}
            className="w-full backdrop-blur border-white/20 p-5"
          >
            <GlassCardContent className="flex flex-col gap-3 p-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold font-display text-white">
                    {latestExperience.company}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="font-semibold text-xs text-cyan-300 font-display">
                      {latestExperience.role}
                    </span>
                    {latestExperience.employmentType && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                        <Building2 className="h-2.5 w-2.5" />
                        {latestExperience.employmentType}
                      </span>
                    )}
                    {latestExperience.location && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/60 font-sans">
                        <MapPin className="h-2.5 w-2.5 text-cyan-400 shrink-0" />
                        {latestExperience.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] font-mono text-white/60">
                    {latestExperience.timeframe}
                  </span>
                  {latestExperience.status === "current" && (
                    <GlassBadge
                      variant="primary"
                      className="text-[10px] font-mono uppercase px-2 py-0.5 animate-pulse"
                    >
                      Current Role
                    </GlassBadge>
                  )}
                </div>
              </div>

              {/* Achievements summary */}
              <ul className="flex flex-col gap-1.5 list-none pl-0 font-sans mt-1">
                {latestExperience.achievements.slice(0, 3).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-white/75 leading-relaxed"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              {latestExperience.technologies && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10 mt-1">
                  <Code2 className="h-3 w-3 text-purple-400 mr-0.5 shrink-0" />
                  {latestExperience.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {latestExperience.technologies.length > 6 && (
                    <span className="text-[10px] font-mono text-white/40">
                      +{latestExperience.technologies.length - 6} more
                    </span>
                  )}
                </div>
              )}
            </GlassCardContent>
          </GlassCard>
        </section>
      )}

      {/* 2. LATEST PROJECT */}
      {latestProject && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">
                <FolderGit2 className="h-3.5 w-3.5" />
              </div>
              <h2 className="text-lg font-bold font-display text-white">
                Latest Project
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors group"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="w-full">
            <ProjectCard project={latestProject} />
          </div>
        </section>
      )}

      {/* 3. LATEST EDUCATION & Certifications */}
      {latestStudy && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
              <h2 className="text-lg font-bold font-display text-white">
                Latest Education & Certifications
              </h2>
            </div>
            <Link
              to="/education"
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors group"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Degree Card */}
            <GlassCard glowEffect={false} className="w-full backdrop-blur border-white/20 p-5">
              <GlassCardContent className="flex flex-col justify-between h-full gap-3 p-0">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-cyan-300">
                      {latestStudy.timeframe}
                    </span>
                    {latestStudy.status && (
                      <GlassBadge
                        variant="default"
                        className="text-[10px] font-mono uppercase px-2 py-0.5"
                      >
                        {latestStudy.status}
                      </GlassBadge>
                    )}
                  </div>
                  <h3 className="text-base font-bold font-display text-white mt-2 leading-snug">
                    {latestStudy.course}
                  </h3>
                  <p className="text-xs text-white/70 font-sans mt-1">
                    {latestStudy.institution}
                  </p>
                </div>
                {latestStudy.description && (
                  <p className="text-xs text-white/60 font-sans leading-relaxed pt-2 border-t border-white/10">
                    {latestStudy.description}
                  </p>
                )}
              </GlassCardContent>
            </GlassCard>

            {/* Latest Certification Card */}
            {latestCert && (
              <GlassMorphCard
                glowColor={latestCert.glowColor || "cyan"}
                intensity={8}
                className="w-full h-full"
              >
                <div className="flex flex-col justify-between h-full p-5 gap-3">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-cyan-300">
                        {latestCert.issuedOn}
                      </span>
                      <GlassBadge
                        variant="primary"
                        className="text-[10px] font-mono uppercase px-2 py-0.5"
                      >
                        {latestCert.issuedBy}
                      </GlassBadge>
                    </div>
                    <h3 className="text-base font-bold font-display text-white mt-2 leading-snug">
                      {latestCert.title}
                    </h3>
                    <p className="text-xs text-white/70 font-sans mt-1 line-clamp-2">
                      {latestCert.description}
                    </p>
                  </div>

                  {latestCert.verifyAt && (
                    <div className="pt-2 border-t border-white/10 mt-auto">
                      <a
                        href={latestCert.verifyAt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block"
                      >
                        <GlassButton
                          variant="outline"
                          className="w-full text-xs font-semibold py-1.5 justify-center cursor-pointer"
                        >
                          <span>Verify Credential</span>
                        </GlassButton>
                      </a>
                    </div>
                  )}
                </div>
              </GlassMorphCard>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default LatestHighlights;
