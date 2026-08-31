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

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text: string, maxCharsPerLine = 58): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxCharsPerLine) {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
    if (lines.length >= 3) break;
  }
  if (currentLine && lines.length < 3) lines.push(currentLine);
  return lines;
}

function generateMinimalGlassOgSvg(title?: string, role?: string): string {
  const name = escapeXml(appConfig.profile.name || "Charan Teja Yandrapati");
  const displayRole = escapeXml(
    role || appConfig.profile.title || "Full-Stack Web Application Developer",
  );
  const rawDescription =
    title ||
    appConfig.intro.description ||
    "Building high-performance web applications, scalable architectures, and modern digital experiences.";
  const descriptionLines = wrapText(rawDescription, 62).map(escapeXml);

  const email = escapeXml(
    appConfig.contact.details.find((d) => d.label === "Email")?.value || "",
  );
  const phone = escapeXml(
    appConfig.contact.details.find((d) => d.label === "Phone")?.value || "",
  );
  const location = escapeXml(
    appConfig.contact.details.find((d) => d.label === "Location")?.value || "",
  );

  const avatarData = getAvatarBase64();

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Minimalist Deep Charcoal Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="100%" stop-color="#04060a" />
    </linearGradient>

    <!-- Subtle Slate Surface Gradient -->
    <linearGradient id="surfaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.05)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.015)" />
    </linearGradient>

    <!-- Refined Minimal Accent Line Gradient -->
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <!-- Minimal Avatar Border -->
    <linearGradient id="avatarBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(56, 189, 248, 0.6)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.2)" />
    </linearGradient>

    <!-- Avatar Circular Clip -->
    <clipPath id="avatarClip">
      <circle cx="110" cy="110" r="100" />
    </clipPath>
  </defs>

  <!-- Clean Dark Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Subtle Radial Accent Glow in Top Right and Bottom Left -->
  <circle cx="1080" cy="120" r="280" fill="#0284c7" opacity="0.08" />
  <circle cx="120" cy="520" r="240" fill="#06b6d4" opacity="0.06" />

  <!-- MAIN REFINED GLASS CONTAINER -->
  <rect
    x="40"
    y="40"
    width="1120"
    height="550"
    rx="24"
    fill="url(#surfaceGrad)"
    stroke="rgba(255, 255, 255, 0.12)"
    stroke-width="1.2"
  />

  <!-- Top Accent Highlight -->
  <line x1="68" y1="41" x2="1132" y2="41" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" stroke-linecap="round" />

  <!-- HEADER ROW -->
  <g transform="translate(80, 80)">
    <!-- Portfolio Badge -->
    <rect x="0" y="0" width="145" height="30" rx="15" fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1" />
    <circle cx="16" cy="15" r="4" fill="#38bdf8" />
    <text x="30" y="20" fill="#7dd3fc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">PORTFOLIO</text>

    <!-- Verified Domain Pill -->
    <g transform="translate(810, 0)">
      <rect x="0" y="0" width="150" height="30" rx="15" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      <circle cx="16" cy="15" r="3.5" fill="#34d399" />
      <text x="28" y="20" fill="#cbd5e1" font-family="'Courier New', monospace" font-size="12" font-weight="600" letter-spacing="0.5">charanteja.com</text>
    </g>
  </g>

  <!-- BODY CONTENT: TWO COLUMNS -->
  <g transform="translate(80, 150)">
    <!-- LEFT COLUMN: Typography -->
    <g transform="translate(0, 0)">
      <!-- Name Header (Clean Solid White) -->
      <text x="0" y="48" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="800" letter-spacing="-0.8">
        ${name}
      </text>

      <!-- Role & Title (Minimal Cyan Accent) -->
      <text x="0" y="88" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="600" letter-spacing="0.2">
        ${displayRole}
      </text>

      <!-- Minimal Accent Line -->
      <rect x="0" y="108" width="64" height="2.5" rx="1.25" fill="url(#accentGrad)" />

      <!-- Description Lines (Native SVG Text for 100% Renderer Compatibility) -->
      <text x="0" y="145" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" letter-spacing="0.1">
        ${descriptionLines.map((line, idx) => `<tspan x="0" dy="${idx === 0 ? "0" : "26"}">${line}</tspan>`).join("")}
      </text>
    </g>

    <!-- RIGHT COLUMN: Avatar -->
    ${
      avatarData
        ? `<g transform="translate(730, 0)">
      <!-- Outer Bezel -->
      <circle cx="110" cy="110" r="114" fill="none" stroke="url(#avatarBorderGrad)" stroke-width="2" />
      
      <!-- Inner Ring -->
      <circle cx="110" cy="110" r="106" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />

      <!-- Photo Image -->
      <g clip-path="url(#avatarClip)">
        <image href="${avatarData}" x="10" y="10" width="200" height="200" preserveAspectRatio="xMidYMid slice" />
      </g>
    </g>`
        : ""
    }
  </g>

  <!-- FOOTER CONTACT DETAILS BAR -->
  <g transform="translate(80, 475)">
    <line x1="0" y1="0" x2="960" y2="0" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />

    <g transform="translate(0, 32)">
      ${
        email
          ? `<g transform="translate(0, 0)">
        <rect x="0" y="-14" width="290" height="28" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
        <circle cx="14" cy="0" r="3.5" fill="#38bdf8" />
        <text x="26" y="4" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">
          ${email}
        </text>
      </g>`
          : ""
      }

      ${
        phone
          ? `<g transform="translate(310, 0)">
        <rect x="0" y="-14" width="200" height="28" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
        <circle cx="14" cy="0" r="3.5" fill="#34d399" />
        <text x="26" y="4" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">
          ${phone}
        </text>
      </g>`
          : ""
      }

      ${
        location
          ? `<g transform="translate(530, 0)">
        <rect x="0" y="-14" width="200" height="28" rx="6" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
        <circle cx="14" cy="0" r="3.5" fill="#a78bfa" />
        <text x="26" y="4" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">
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

        const svgContent = generateMinimalGlassOgSvg(title, role);

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
