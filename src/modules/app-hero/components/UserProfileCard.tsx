import type React from "react";
import {
  Briefcase,
  Clock,
  Github,
  GraduationCap,
  Instagram,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import {
  GlassAvatar,
  GlassAvatarFallback,
  GlassAvatarImage,
} from "../../../components/glass-avatar";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "../../../components/glass-card";
import { GlassButton } from "../../../components/glass-button";
import { appConfig } from "../../../config/app-config";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const iconMap = {
  github: Github,
  instagram: Instagram,
  phone: Phone,
  email: Mail,
  Linkedin,
  whatsapp: WhatsAppIcon,
};

const calculateExperience = (startDateStr?: string): string => {
  if (!startDateStr) return "4.0 Years";
  const start = new Date(startDateStr);
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const yearsDecimal = (totalMonths / 12).toFixed(1);
  return `${yearsDecimal} Years`;
};

const UserProfileCard: React.FC = () => {
  const { profile, work, education } = appConfig;

  // Total IT Experience
  const totalExperience = calculateExperience(work.startDate);

  // Current employment role @ company
  const currentJob =
    work.experiences?.find((e) => e.status === "current") ||
    work.experiences?.[0];

  // Latest education study
  const latestEducation = education.studies?.[0];

  return (
    <GlassCard
      glowEffect={false}
      className="relative w-full backdrop-blur shadow-2xl"
    >
      {/* Avatar */}
      <GlassAvatar className="absolute -top-30 left-1/2 h-36 w-36 -translate-x-1/2 z-10 shadow-2xl ring-4 ring-white/20">
        <GlassAvatarImage src={profile.avatar.src} alt={profile.avatar.alt} />
        <GlassAvatarFallback className="font-display text-xl font-bold">
          {profile.avatar.fallback}
        </GlassAvatarFallback>
      </GlassAvatar>

      {/* Bio */}
      <GlassCardHeader className="items-center mt-10 text-center pb-2">
        <GlassCardTitle className="mt-4 font-display text-2xl font-bold tracking-normal">
          {profile.name}
        </GlassCardTitle>
        <GlassCardDescription className="text-sm font-medium text-white/90">
          {profile.title}
        </GlassCardDescription>
      </GlassCardHeader>

      {/* Highlights: Experience, Current Role, Latest Education */}
      <GlassCardContent className="text-center flex flex-col gap-3.5 pt-0">
        <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-left backdrop-blur-md">
          {/* Total IT Experience */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stale-500/20 text-stale-400">
              <Clock className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col min-w-0 gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                IT Experience
              </span>
              <span className="text-xs font-medium text-white/95 truncate">
                <span className="text-stale-300 font-semibold">
                  {totalExperience}
                </span>{" "}
                <span className="text-white/70">
                  of Professional Experience
                </span>
              </span>
            </div>
          </div>

          {/* Current Role @ Company */}
          {currentJob && (
            <div className="flex items-center gap-2.5 min-w-0 border-t border-white/5 pt-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stale-500/20 text-stale-400">
                <Briefcase className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col min-w-0 gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Current Role
                </span>
                <span className="text-xs font-medium text-white/95 truncate">
                  <span className="text-stale-300 font-semibold">
                    {currentJob.role}
                  </span>{" "}
                  <span className="text-white/60">@</span>{" "}
                  <span>{currentJob.company}</span>
                </span>
              </div>
            </div>
          )}

          {/* Latest Education */}
          {latestEducation && (
            <div className="flex items-center gap-2.5 min-w-0 border-t border-white/5 pt-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stale-500/20 text-stale-400">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col min-w-0 gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Highest Qualification
                </span>
                <span
                  className="text-xs font-medium text-white/95 truncate"
                  title={`${latestEducation.course} - ${latestEducation.institution}`}
                >
                  <span className="text-stale-300 font-semibold">
                    {latestEducation.course}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-2">
          {profile.socialLinks.map((social) => {
            const Icon =
              iconMap[social.platform as keyof typeof iconMap] || Mail;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.target}
                rel={social.target === "_blank" ? "noreferrer" : undefined}
                aria-label={social.label}
              >
                <GlassButton variant="outline">
                  <Icon className="h-4 w-4" />
                </GlassButton>
              </a>
            );
          })}
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default UserProfileCard;
