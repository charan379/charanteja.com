import React from "react";
import { Download, Github, Linkedin, Mail, Send } from "lucide-react";
import { GlassButton } from "@/components/glass-button";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/glass-card";
import { GlassBadge } from "@/components/glass-badge";
import TypingText from "@/components/TypingText";
import { appConfig } from "@/config/app-config";
import {
  GlassAvatar,
  GlassAvatarFallback,
  GlassAvatarImage,
} from "@/components/glass-avatar";
import { LetterFx } from "@/components/LetterFx";
import { ContactForm } from "@/components/ContactForm";
import LatestHighlights from "../components/LatestHighlights";
import AppHero from "@/modules/app-hero/components/AppHero";

const IntroPage: React.FC = () => {
  const avatar = appConfig.profile.avatar2 || appConfig.profile.avatar;
  const github = appConfig.profile.socialLinks?.find(
    (l) => l.platform.toLowerCase() === "github",
  );
  const linkedin = appConfig.profile.socialLinks?.find(
    (l) => l.platform.toLowerCase() === "linkedin",
  );

  const scrollToContact = () => {
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="intro" className="w-full flex flex-col gap-8">
      <section className="h-auto w-full block lg:hidden lg:h-full">
        <AppHero />
      </section>
      {/* Enhanced Hero Glass Card */}
      <GlassCard
        className="relative w-full overflow-hidden backdrop-blur border-white/20 shadow-2xl p-6 sm:p-8"
        glowEffect={false}
      >
        {/* Subtle Ambient Radial Glow */}
        {/* <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" /> */}
        {/* <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl" /> */}
        {/* Main Content Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
          {/* Left Column: Greeting, Dynamic LetterFx, Bio, & Skills */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                Hello, I am
              </span>
              <h1 className="font-display text-2xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                <LetterFx
                  words={appConfig.intro.letterFx.words}
                  intervalMs={appConfig.intro.letterFx.intervalMs}
                  speed={appConfig.intro.letterFx.speed}
                  trigger="hover"
                />
              </h1>
              <p className="text-xs sm:text-sm font-medium text-white/70">
                {appConfig.profile.title || ""}
              </p>
            </div>

            {appConfig.intro.description && (
              <p className="text-sm font-sans text-white/85 leading-relaxed">
                {appConfig.intro.description}
              </p>
            )}

            {/* Core Tech Stack Pills */}
            <div className="pt-2 flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Core Technologies & Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {appConfig.profile.skills?.map((skill) => (
                  <GlassBadge
                    key={skill.label}
                    variant={
                      skill.variant === "primary"
                        ? "primary"
                        : skill.variant === "success"
                          ? "success"
                          : "default"
                    }
                    size="sm"
                    className="text-[11px] px-2.5 py-0.5 border-white/15 hover:border-cyan-400/40 transition-colors"
                  >
                    {skill.label}
                  </GlassBadge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 2.5D Concentric Glass Avatar & Terminal Overlay */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative p-1 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl shadow-2xl">
              {/* Decorative Concentric Rings */}
              <div className="absolute -inset-2 rounded-full border border-white/10 opacity-50 pointer-events-none" />

              <GlassAvatar
                glowEffect={false}
                className="w-52 h-52 sm:w-64 sm:h-64 rounded-full ring-2 ring-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              >
                <GlassAvatarImage
                  className="object-cover object-right origin-center"
                  src={avatar.src}
                  alt={avatar.alt}
                />
                <GlassAvatarFallback className="font-display text-2xl font-bold">
                  {avatar.fallback}
                </GlassAvatarFallback>
              </GlassAvatar>

              {/* Floating Terminal-Style Status Overlay */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 z-20 flex flex-col gap-1.5 rounded-xl border border-white/25 bg-black/80 p-2.5 sm:px-3.5 sm:py-2.5 backdrop-blur-2xl shadow-2xl max-w-[260px] sm:max-w-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="h-2 w-2 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-1 text-[10px] font-mono text-white/50">
                    status.sh
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                  </span>
                  <TypingText
                    phrases={appConfig.intro.typingPhrases}
                    className="font-mono text-xs font-medium text-white tracking-tight truncate"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {appConfig.profile.resume && (
              <a
                href={appConfig.profile.resume.href}
                download={appConfig.profile.resume.download ? true : undefined}
                target="_blank"
                rel="noreferrer"
              >
                <GlassButton
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2 cursor-pointer font-semibold shadow-[0_0_16px_rgba(6,182,212,0.2)]"
                >
                  <Download className="h-4 w-4" />
                  {appConfig.profile.resume.label || "Download CV"}
                </GlassButton>
              </a>
            )}

            <GlassButton
              variant="outline"
              size="sm"
              onClick={scrollToContact}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5 text-stale-100" />
              Get In Touch
            </GlassButton>
          </div>

          {/* Quick Social Icon Buttons */}
          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/15 hover:border-white/30 transition-all active:scale-95"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/15 hover:border-white/30 transition-all active:scale-95"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Latest Highlights (Experience, Project, Education) */}
      <LatestHighlights />

      {/* Contact Section Form Card at the end of Intro */}
      <section id="contact-section" className="w-full scroll-mt-20">
        <GlassCard
          glowEffect={false}
          className="w-full backdrop-blur border-white/20 p-5 sm:p-8 shadow-2xl"
        >
          <GlassCardHeader className="p-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_16px_rgba(6,182,212,0.2)]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <GlassCardTitle className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Get In Touch
                </GlassCardTitle>
                <GlassCardDescription className="text-xs sm:text-sm text-white/70">
                  Have a project proposal or inquiry? Send a direct message
                  below.
                </GlassCardDescription>
              </div>
            </div>
          </GlassCardHeader>
          <GlassCardContent className="p-0 pt-3">
            <ContactForm />
          </GlassCardContent>
        </GlassCard>
      </section>
    </section>
  );
};

export default IntroPage;
