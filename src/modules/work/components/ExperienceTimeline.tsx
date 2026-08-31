import React from "react";
import { BriefcaseBusiness, Building2, Code2, MapPin } from "lucide-react";
import { GlassTimeline } from "@/components/glass-timeline";
import { GlassBadge } from "@/components/glass-badge";
import { appConfig } from "@/config/app-config";

function calculateYearsExperience(startDateStr?: string): string {
  if (!startDateStr) return "";
  const start = new Date(startDateStr);
  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = (diffInMonths / 12).toFixed(1);
  return years;
}

export const ExperienceTimeline: React.FC = () => {
  const { work } = appConfig;
  const years = calculateYearsExperience(work.startDate);

  const timelineItems = work.experiences.map((exp) => ({
    id: exp.id,
    title: exp.company,
    date: exp.timeframe,
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    description: (
      <div className="flex flex-col gap-3 text-xs text-white/80 mt-1">
        {/* Role, Employment Type & Location */}
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-cyan-100 font-display">{exp.role}</span>

          {exp.employmentType && (
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-purple-100">
              <Building2 className="h-3 w-3" />
              {exp.employmentType}
            </span>
          )}

          {exp.location && (
            <span className="inline-flex items-center gap-1 text-[11px] text-white/80 font-sans">
              <MapPin className="h-3 w-3 text-cyan-100 shrink-0" />
              {exp.location}
            </span>
          )}

          {exp.status === "current" && (
            <GlassBadge
              variant="primary"
              className="text-[10px] font-mono uppercase px-2 py-0.5 animate-pulse ml-auto"
            >
              Current Role
            </GlassBadge>
          )}
        </div>

        {/* Bullet Achievements */}
        <ul className="flex flex-col gap-2 list-none pl-0 font-sans">
          {exp.achievements.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-white/75 leading-relaxed"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-100" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies Tags */}
        {exp.technologies && exp.technologies.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Code2 className="h-3.5 w-3.5 text-purple-100 mr-0.5 shrink-0" />
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Company / Brand Icons */}
        {exp.images && exp.images.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/10 mt-1">
            {exp.images.map((img, idx) => (
              <div
                key={idx}
                className="h-15 rounded-lg border overflow-hidden border-white/15 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="max-h-15 max-w-[120px] object-scale-down brightness-95 contrast-125"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-5">
      {/* Header with Total IT Experience banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold font-display text-white tracking-wide">
            Career Timeline
          </h2>
        </div>

        {years && (
          <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 backdrop-blur-md text-xs font-mono text-cyan-300">
            <span>Total IT Experience:</span>
            <span className="font-bold text-white text-sm">{years} Years</span>
          </div>
        )}
      </div>

      <div className="mt-2 pl-1">
        <GlassTimeline items={timelineItems} />
      </div>
    </div>
  );
};

export default ExperienceTimeline;
