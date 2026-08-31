import {
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";
import { appConfig } from "@/config/app-config";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-950 text-white">
      <div className="relative flex max-w-md flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
        <h1 className="font-display text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
          404
        </h1>
        <h2 className="mt-4 font-display text-2xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="mt-2 text-sm text-white/70">
          The page or section you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-cyan-500/20 px-6 py-2.5 text-sm font-semibold text-cyan-300 border border-cyan-500/30 backdrop-blur-md transition-all hover:bg-cyan-500/30 hover:text-white"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    const baseUrl = (appConfig.seo.baseUrl || "https://www.charanteja.com").replace(/\/$/, "");
    const ogRelative = appConfig.seo.ogImage || "/og";
    const ogAbsolute = ogRelative.startsWith("http")
      ? ogRelative
      : `${baseUrl}${ogRelative.startsWith("/") ? "" : "/"}${ogRelative}`;
    const rasterFallback = `${baseUrl}/images/charanteja-yandrapati.jpeg`;

    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: appConfig.seo.defaultTitle,
        },
        {
          name: "description",
          content: appConfig.seo.defaultDescription,
        },
        {
          name: "keywords",
          content: appConfig.seo.defaultKeywords.join(", "),
        },
        {
          name: "author",
          content: appConfig.seo.author,
        },
        {
          name: "robots",
          content: appConfig.seo.robots.index
            ? "index, follow"
            : "noindex, nofollow",
        },
        {
          name: "googlebot",
          content: appConfig.seo.robots.googleBot || "index, follow",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: appConfig.seo.siteName,
        },
        {
          property: "og:locale",
          content: appConfig.seo.locale,
        },
        {
          property: "og:url",
          content: baseUrl,
        },
        {
          property: "og:title",
          content: appConfig.seo.defaultTitle,
        },
        {
          property: "og:description",
          content: appConfig.seo.defaultDescription,
        },
        // Primary OG Image
        {
          property: "og:image",
          content: ogAbsolute,
        },
        {
          property: "og:image:secure_url",
          content: ogAbsolute,
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          property: "og:image:alt",
          content: appConfig.seo.defaultTitle,
        },
        // WhatsApp & Raster Scraper Fallback Image
        {
          property: "og:image",
          content: rasterFallback,
        },
        {
          property: "og:image:secure_url",
          content: rasterFallback,
        },
        {
          property: "og:image:type",
          content: "image/jpeg",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:creator",
          content: appConfig.seo.twitterHandle || "",
        },
        {
          name: "twitter:title",
          content: appConfig.seo.defaultTitle,
        },
        {
          name: "twitter:description",
          content: appConfig.seo.defaultDescription,
        },
        {
          name: "twitter:image",
          content: ogAbsolute,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: baseUrl,
        },
        {
          rel: "image_src",
          href: rasterFallback,
        },
        {
          rel: "icon",
          href: "/favicon.ico",
          type: "image/x-icon",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
    };
  },
  notFoundComponent: RootNotFound,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const gaId = appConfig.seo.googleAnalyticsId;

  return (
    <html lang="en" className="min-h-dvh">
      <head>
        <HeadContent />
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
