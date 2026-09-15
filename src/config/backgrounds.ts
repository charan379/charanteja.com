export type BackgroundMedia =
  | {
      id: string;
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      id: string;
      type: "video";
      src: string;
      poster?: string;
    };

/**
 * Configurable list of background images and videos.
 * You can add local paths (e.g. '/images/bg.jpg', '/videos/bg.mp4')
 * or remote URLs.
 */
export const backgroundMediaList: BackgroundMedia[] = [
  {
    id: "dark-nebula",
    type: "image",
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2564&auto=format&fit=crop",
    alt: "Deep Space Nebula",
  },
  {
    id: "gradient-flow",
    type: "image",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
    alt: "Vibrant Gradient Glow",
  },
];
