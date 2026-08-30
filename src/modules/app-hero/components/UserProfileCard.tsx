import type React from "react";
import { Github, Instagram, Mail, Phone, Linkedin } from "lucide-react";
import {
  GlassAvatar,
  GlassAvatarFallback,
  GlassAvatarImage,
} from "../../../components/glass-avatar";
import { GlassBadge } from "../../../components/glass-badge";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "../../../components/glass-card";
import { GlassButton } from "../../../components/glass-button";
import { appConfig } from "../../../config/app-config";

const WhatsAppIcon: React.FC<{ className?: string }> = ({
  className = "h-4 w-4",
}) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const iconMap = {
  github: Github,
  instagram: Instagram,
  phone: Phone,
  email: Mail,
  Linkedin,
  whatsapp: WhatsAppIcon,
};

const UserProfileCard: React.FC = () => {
  const { profile } = appConfig;

  return (
    <GlassCard
      glowEffect={false}
      className="relative mt-18 w-full backdrop-blur"
    >
      {/* Avatar */}
      <GlassAvatar className="absolute -top-30 left-1/2 h-36 w-36 -translate-x-1/2 z-10 shadow-2xl ring-4 ring-white/20">
        <GlassAvatarImage src={profile.avatar.src} alt={profile.avatar.alt} />
        <GlassAvatarFallback className="font-display text-xl font-bold">
          {profile.avatar.fallback}
        </GlassAvatarFallback>
      </GlassAvatar>
      {/* Bio */}
      <GlassCardHeader className="items-center mt-10 text-center">
        <GlassCardTitle className="mt-4 font-display text-2xl font-bold tracking-normal">
          {profile.name}
        </GlassCardTitle>
        <GlassCardDescription className="text-sm font-medium text-white/90">
          {profile.title}
        </GlassCardDescription>
      </GlassCardHeader>
      {/* Skills */}
      <GlassCardContent className="text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {profile.skills.map((skill) => (
            <GlassBadge
              key={skill.label}
              className="font-mono text-xs"
              variant={skill.variant || "default"}
            >
              {skill.label}
            </GlassBadge>
          ))}
        </div>
      </GlassCardContent>
      {/* Social Links & Resume */}
      <GlassCardContent className="text-center flex flex-col gap-3">
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
