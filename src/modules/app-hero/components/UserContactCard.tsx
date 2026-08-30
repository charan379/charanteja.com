import React, { useState } from "react";
import { Check, Clock, Copy, Globe, Mail, MapPin, Phone } from "lucide-react";
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

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
};

export const UserContactCard: React.FC = () => {
  const { contact, profile } = appConfig;

  const whatsapp = profile.socialLinks?.find(
    (link) => link.platform === "whatsapp",
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <GlassCard glowEffect={false} className="relative w-full backdrop-blur">
      {/* Header */}
      <GlassCardHeader className="p-5 pb-3">
        <GlassCardTitle className="font-display text-xl font-bold tracking-tight">
          {contact.title || "Contact Details"}
        </GlassCardTitle>
        <GlassCardDescription className="text-xs text-white/70">
          {contact.subtitle ||
            "Feel free to reach out for collaborations or inquiries."}
        </GlassCardDescription>
      </GlassCardHeader>

      {/* Contact Details List */}
      <GlassCardContent className="flex flex-col gap-2.5 p-5 pt-0">
        {contact.details.map((item) => {
          const Icon = iconMap[item.icon] || Mail;
          const isCopied = copiedKey === item.label;

          return (
            <div
              key={item.label}
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10 hover:border-white/20"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/90 shadow-inner">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="truncate text-sm font-medium text-white/90 hover:text-cyan-300 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="truncate text-sm font-medium text-white/90">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>

              {item.copyable && (
                <button
                  type="button"
                  onClick={() => handleCopy(item.value, item.label)}
                  title={`Copy ${item.label}`}
                  className="flex h-8 w-8 cursor-pointer shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-all hover:bg-white/15 hover:text-white active:scale-95"
                >
                  {isCopied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
            </div>
          );
        })}

        {/* WhatsApp Action */}
        {whatsapp ? (
          <div className="mt-2 flex justify-center items-center">
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className="w-full flex justify-center items-center"
            >
              <GlassButton
                variant="default"
                className="w-full flex flex-row justify-center items-center text-sm font-semibold cursor-pointer"
              >
                <WhatsAppIcon className="h-4 w-4 mr-1.5 text-stale-100" />
                Say Hello on WhatsApp
              </GlassButton>
            </a>
          </div>
        ) : null}
      </GlassCardContent>
    </GlassCard>
  );
};

export default UserContactCard;
