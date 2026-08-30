import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import PageLoading from "@/components/PageLoading";
import { appConfig } from "@/config/app-config";

export const Route = createFileRoute("/_index/projects")({
  head: () => {
    const seo = appConfig.seo.pages.projects;
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { name: "keywords", content: (seo.keywords || []).join(", ") },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:url", content: `${appConfig.seo.baseUrl}/projects` },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
      ],
    };
  },
  component: lazyRouteComponent(
    () => import("@/modules/projects/pages/ProjectsPage"),
  ),
  pendingComponent: PageLoading,
  pendingMinMs: 100,
});
