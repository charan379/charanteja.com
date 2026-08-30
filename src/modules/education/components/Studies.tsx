import type React from "react";
import { GraduationCap, BookOpen, MapPin, School } from "lucide-react";
import { GlassTimeline } from "@/components/glass-timeline";
import { appConfig } from "@/config/app-config";

export const Studies: React.FC = () => {
  const { studies } = appConfig.education;

  const timelineItems = studies.map((item) => ({
    id: item.id,
    title: item.course,
    date: item.timeframe,
    status: item.status,
    icon: <GraduationCap className="h-5 w-5" />,
    description: (
      <div className="flex flex-col gap-1.5 text-xs text-white/80 mt-1">
        {item.university && (
          <div className="flex items-center gap-1.5 font-medium text-cyan-100">
            <School className="h-3.5 w-3.5 shrink-0 text-cyan-100" />
            <span>{item.university}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-purple-100">
          <BookOpen className="h-3.5 w-3.5 shrink-0 text-purple-100" />
          <span>{item.institution}</span>
        </div>
        {item.location && (
          <div className="flex items-center gap-1.5 text-slate-200">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-200" />
            <span>{item.location}</span>
          </div>
        )}
        {item.description && (
          <p className="mt-1 text-white/60 leading-relaxed font-sans">
            {item.description}
          </p>
        )}
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <h2 className="text-xl font-bold font-display text-white tracking-wide">
          Academic Studies
        </h2>
      </div>

      <div className="mt-2 pl-1">
        <GlassTimeline items={timelineItems} />
      </div>
    </div>
  );
};

export default Studies;
