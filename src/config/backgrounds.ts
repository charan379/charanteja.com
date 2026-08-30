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
  // {
  //   id: "abstract-mesh-1",
  //   type: "image",
  //   src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  //   alt: "Abstract 3D Liquid Waves",
  // },
  // {
  //   id: "dark-nebula",
  //   type: "image",
  //   src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2564&auto=format&fit=crop",
  //   alt: "Deep Space Nebula",
  // },
  {
    id: "neon-cyber-waves",
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-waves-and-lines-41551-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2564&auto=format&fit=crop",
  },
  // {
  //   id: "gradient-flow",
  //   type: "image",
  //   src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
  //   alt: "Vibrant Gradient Glow",
  // },
  // {
  //   id: "abstract-geometric",
  //   type: "image",
  //   src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2564&auto=format&fit=crop",
  //   alt: "Abstract Geometry Gradient",
  // },
];
