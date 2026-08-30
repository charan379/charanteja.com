import fs from "node:fs";
import path from "node:path";
import { createFileRoute } from "@tanstack/react-router";
import { appConfig } from "@/config/app-config";

function getAvatarBase64(): string {
  try {
    const avatarRelative = (
      appConfig.profile.avatar.src || "images/charanteja-yandrapati.jpeg"
    ).replace(/^\//, "");
    const avatarPath = path.resolve(process.cwd(), "public", avatarRelative);
    if (fs.existsSync(avatarPath)) {
      const buffer = fs.readFileSync(avatarPath);
      const ext = path.extname(avatarPath).toLowerCase();
      const mime = ext === ".webp" ? "image/webp" : "image/jpeg";
      return `data:${mime};base64,${buffer.toString("base64")}`;
    }
  } catch {
    // fallback
  }
  return appConfig.profile.avatar.src || "";
}

function generateGlassOgSvg(title?: string, role?: string): string {
  const name = appConfig.profile.name || "";
  const displayRole = role || appConfig.profile.title || "";
  const introDescription =
    title ||
    appConfig.intro.description ||
    "";
  const email =
    appConfig.contact.details.find((d) => d.label === "Email")?.value || "";
  const phone =
    appConfig.contact.details.find((d) => d.label === "Phone")?.value || "";
  const location =
    appConfig.contact.details.find((d) => d.label === "Location")?.value || "";

  const avatarData = getAvatarBase64();

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05070d" />
      <stop offset="50%" stop-color="#0a0f1d" />
      <stop offset="100%" stop-color="#04060a" />
    </linearGradient>

    <!-- Glass Surface Gradient -->
    <linearGradient id="glassCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.07)" />
      <stop offset="50%" stop-color="rgba(255, 255, 255, 0.03)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.01)" />
    </linearGradient>

    <!-- Glass Outer Rim Border -->
    <linearGradient id="glassBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.4)" />
      <stop offset="30%" stop-color="rgba(6, 182, 212, 0.35)" />
      <stop offset="70%" stop-color="rgba(168, 85, 247, 0.25)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.1)" />
    </linearGradient>

    <!-- Chrome / Title Gradient -->
    <linearGradient id="titleChrome" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="40%" stop-color="#38bdf8" />
      <stop offset="85%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>

    <!-- Avatar Gradient Ring -->
    <linearGradient id="avatarRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>

    <!-- Ambient Glow Filters -->
    <filter id="glowCyan" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="90" result="blur" />
    </filter>
    <filter id="glowPurple" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="110" result="blur" />
    </filter>
    <filter id="avatarAura" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="35" result="blur" />
    </filter>
    <filter id="cardDropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="28" stdDeviation="36" flood-color="rgba(0, 0, 0, 0.75)" />
    </filter>

    <!-- Subtle Geometric Grid Pattern -->
    <pattern id="dotGrid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="rgba(255, 255, 255, 0.08)" />
    </pattern>

    <!-- Avatar Circular Clip -->
    <clipPath id="avatarClip">
      <circle cx="120" cy="120" r="110" />
    </clipPath>
  </defs>

  <!-- Deep Obsidian Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Geometric Grid Overlay -->
  <rect width="1200" height="630" fill="url(#dotGrid)" opacity="0.6" />

  <!-- Ambient Light Halos -->
  <circle cx="120" cy="100" r="220" fill="#06b6d4" opacity="0.28" filter="url(#glowCyan)" />
  <circle cx="1100" cy="520" r="240" fill="#9333ea" opacity="0.25" filter="url(#glowPurple)" />
  <circle cx="980" cy="160" r="180" fill="#0284c7" opacity="0.2" filter="url(#glowCyan)" />

  <!-- MAIN FROSTED GLASS CANVAS -->
  <rect
    x="45"
    y="40"
    width="1110"
    height="550"
    rx="32"
    fill="url(#glassCardGrad)"
    stroke="url(#glassBorder)"
    stroke-width="1.5"
    filter="url(#cardDropShadow)"
  />

  <!-- Top Glass Highlight Specular Line -->
  <line x1="77" y1="41" x2="1123" y2="41" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1" stroke-linecap="round" />

  <!-- HEADER BAR INSIDE GLASS -->
  <g transform="translate(85, 80)">
    <!-- Brand Logo Mark -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="168" height="32" rx="16" fill="rgba(6, 182, 212, 0.12)" stroke="rgba(6, 182, 212, 0.35)" stroke-width="1" />
      <circle cx="16" cy="16" r="4" fill="#22d3ee" />
      <text x="32" y="21" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5">PORTFOLIO</text>
    </g>

    <!-- Verified Domain Pill -->
    <g transform="translate(860, 0)">
      <rect x="0" y="0" width="165" height="32" rx="16" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
      <circle cx="18" cy="16" r="3.5" fill="#34d399" />
      <text x="32" y="21" fill="#e2e8f0" font-family="monospace" font-size="12" font-weight="600" letter-spacing="0.5">charanteja.com</text>
    </g>
  </g>

  <!-- BODY CONTENT: TWO COLUMNS -->
  <g transform="translate(85, 145)">
    <!-- LEFT COLUMN: Typography & Intro Description -->
    <g transform="translate(0, 0)">
      <!-- Main Display Name -->
      ${
        name
          ? `<text x="0" y="55" fill="url(#titleChrome)" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="800" letter-spacing="-1">
        ${name}
      </text>`
          : ""
      }

      <!-- Professional Subtitle -->
      ${
        displayRole
          ? `<text x="0" y="98" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" letter-spacing="-0.2">
        ${displayRole}
      </text>`
          : ""
      }

      <!-- Intro Description -->
      ${
        introDescription
          ? `<foreignObject x="0" y="130" width="670" height="150">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: system-ui, -apple-system, sans-serif; font-size: 16.5px; line-height: 1.65; color: rgba(226, 232, 240, 0.85); letter-spacing: 0.2px;">
          ${introDescription}
        </div>
      </foreignObject>`
          : ""
      }
    </g>

    <!-- RIGHT COLUMN: Avatar Glass Ring -->
    ${
      avatarData
        ? `<g transform="translate(740, -10)">
      <!-- Avatar Glow Aura -->
      <circle cx="120" cy="120" r="125" fill="#06b6d4" opacity="0.3" filter="url(#avatarAura)" />
      
      <!-- Outer Concentric Glass Ring -->
      <circle cx="120" cy="120" r="126" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

      <!-- Gradient Core Ring -->
      <circle cx="120" cy="120" r="118" fill="none" stroke="url(#avatarRingGrad)" stroke-width="3.5" />

      <!-- Photo -->
      <g clip-path="url(#avatarClip)">
        <image href="${avatarData}" x="10" y="10" width="220" height="220" preserveAspectRatio="xMidYMid slice" />
      </g>

      <!-- Specular Bevel Highlight Arc -->
      <path d="M 35 65 A 110 110 0 0 1 205 65" stroke="rgba(255, 255, 255, 0.65)" stroke-width="2.5" fill="none" stroke-linecap="round" />
    </g>`
        : ""
    }
  </g>

  <!-- FOOTER BAR: CONTACT DETAILS -->
  <g transform="translate(85, 480)">
    <!-- Thin Glass Divider -->
    <line x1="0" y1="0" x2="1025" y2="0" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />

    <!-- Meta Details Row -->
    <g transform="translate(0, 36)">
      <!-- Email -->
      ${
        email
          ? `<g transform="translate(0, 0)">
        <rect x="0" y="-14" width="310" height="30" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
        <circle cx="14" cy="1" r="4" fill="#38bdf8" />
        <text x="28" y="5" fill="rgba(241, 245, 249, 0.85)" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500">
          ${email}
        </text>
      </g>`
          : ""
      }

      <!-- Phone -->
      ${
        phone
          ? `<g transform="translate(340, 0)">
        <rect x="0" y="-14" width="210" height="30" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
        <circle cx="14" cy="1" r="4" fill="#34d399" />
        <text x="28" y="5" fill="rgba(241, 245, 249, 0.85)" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500">
          ${phone}
        </text>
      </g>`
          : ""
      }

      <!-- Location -->
      ${
        location
          ? `<g transform="translate(580, 0)">
        <rect x="0" y="-14" width="210" height="30" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
        <circle cx="14" cy="1" r="4" fill="#c084fc" />
        <text x="28" y="5" fill="rgba(241, 245, 249, 0.85)" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500">
          ${location}
        </text>
      </g>`
          : ""
      }
    </g>
  </g>
</svg>`;
}

export const Route = createFileRoute("/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const title = url.searchParams.get("title") || undefined;
        const role = url.searchParams.get("role") || undefined;

        const svgContent = generateGlassOgSvg(title, role);

        return new Response(svgContent, {
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control":
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
