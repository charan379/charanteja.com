import type React from "react";
import {
  ExternalLink,
  Calendar,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { GlassMorphCard } from "@/components/glass-morph-card";
import { GlassButton } from "@/components/glass-button";
import { GlassBadge } from "@/components/glass-badge";
import { appConfig } from "@/config/app-config";

export const Certifications: React.FC = () => {
  const { certifications } = appConfig.education;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <h2 className="text-xl font-bold font-display text-white tracking-wide">
          Professional Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {certifications.map((cert) => (
          <GlassMorphCard
            key={cert.id}
            glowColor={cert.glowColor || "cyan"}
            intensity={12}
            className="w-full transition-all duration-300"
          >
            <div className="flex flex-col p-5 h-full justify-between gap-4">
              {/* Top Header with Badge / Thumbnail */}
              <div className="flex items-start gap-4">
                {cert.images && cert.images.length > 0 ? (
                  <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-white/5 p-1 flex items-center justify-center shadow-lg">
                    <img
                      src={cert.images[0].src}
                      alt={cert.images[0].alt || cert.title}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <GlassBadge
                      variant="primary"
                      className="text-[10px] uppercase font-mono px-2 py-0.5"
                    >
                      {cert.issuedBy}
                    </GlassBadge>
                  </div>
                  <h3 className="font-display text-base font-bold text-white leading-snug line-clamp-2">
                    {cert.title}
                  </h3>
                </div>
              </div>

              {/* Meta Date info */}
              <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                <Calendar className="h-3.5 w-3.5 text-cyan-100" />
                <span>Issued: {cert.issuedOn}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-white/75 leading-relaxed line-clamp-4 font-sans">
                {cert.description}
              </p>

              {/* Action Verification Link */}
              {cert.verifyAt && (
                <div className="pt-2 border-t border-white/10 mt-auto">
                  <a
                    href={cert.verifyAt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <GlassButton
                      variant="outline"
                      className="w-full flex flex-row justify-center text-xs font-semibold gap-1.5 py-2 cursor-pointer"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-100" />
                      <span>Verify</span>
                      <ExternalLink className="h-3 w-3 ml-1 opacity-60" />
                    </GlassButton>
                  </a>
                </div>
              )}
            </div>
          </GlassMorphCard>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
