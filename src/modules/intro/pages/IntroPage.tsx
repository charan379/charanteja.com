import React from "react";
import { FileText, Mail } from "lucide-react";
import { GlassButton } from "@/components/glass-button";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/glass-card";
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

const IntroPage: React.FC = () => {
  const avatar = appConfig.profile.avatar2 || appConfig.profile.avatar;

  return (
    <section id="intro" className="w-full flex flex-col gap-6">
      {/* Intro Hero Card */}
      <GlassCard
        className="w-full backdrop-blur shadow-none"
        glowEffect={false}
      >
        <GlassCardHeader></GlassCardHeader>
        <GlassCardContent className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <section className="flex gap-4 flex-col max-w-md">
            <p className="text-2xl font-mono">Hello, </p>
            <p className="text-xl font-mono">
              I am,{" "}
              <LetterFx
                words={appConfig.intro.letterFx.words}
                intervalMs={appConfig.intro.letterFx.intervalMs}
                speed={appConfig.intro.letterFx.speed}
                trigger="hover"
              />
            </p>
            {appConfig.intro.description && (
              <p className="text-sm font-sans text-white/80 leading-relaxed">
                {appConfig.intro.description}
              </p>
            )}
          </section>
          <section className="relative p-2 rounded-2xl">
            <GlassAvatar
              glowEffect={false}
              className="w-48 h-48 sm:w-60 sm:h-60 ring-2 ring-white/20"
            >
              <GlassAvatarImage
                className="object-cover object-right origin-center"
                src={avatar.src}
                alt={avatar.alt}
              />
              <GlassAvatarFallback className="font-display text-xl font-bold">
                {avatar.fallback}
              </GlassAvatarFallback>
            </GlassAvatar>
            {/* Typing Text overlay positioned at bottom-left */}
            <div className="absolute -bottom-3 sm:bottom-10 -left-4 sm:-left-10 z-10 flex items-center gap-2.5 rounded-xl border border-white/20 bg-black/60 px-3.5 py-2 backdrop-blur-xl shadow-xl">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <TypingText
                phrases={appConfig.intro.typingPhrases}
                className="font-mono text-xs font-medium text-white/95 tracking-wide"
              />
            </div>
          </section>
        </GlassCardContent>
        <GlassCardFooter>
          {appConfig.profile.resume && (
            <a
              href={appConfig.profile.resume.href}
              download={appConfig.profile.resume.download ? true : undefined}
              target="_blank"
              rel="noreferrer"
            >
              <GlassButton
                variant="outline"
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                {appConfig.profile.resume.label || ""}
              </GlassButton>
            </a>
          )}
        </GlassCardFooter>
      </GlassCard>

      {/* Latest Highlights (Experience, Project, Education) */}
      <LatestHighlights />

      {/* Contact Section Form Card at the end of Intro */}
      <GlassCard
        glowEffect={false}
        className="w-full backdrop-blur border-white/20 p-5 sm:p-6 shadow-2xl"
      >
        <GlassCardHeader className="p-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <div>
              <GlassCardTitle className="font-display text-xl font-bold tracking-tight text-white">
                Get In Touch
              </GlassCardTitle>
              <GlassCardDescription className="text-xs text-white/70">
                Have a project in mind, or a technical inquiry ? Send a direct
                message below.
              </GlassCardDescription>
            </div>
          </div>
        </GlassCardHeader>
        <GlassCardContent className="p-0 pt-3">
          <ContactForm />
        </GlassCardContent>
      </GlassCard>
    </section>
  );
};

export default IntroPage;
