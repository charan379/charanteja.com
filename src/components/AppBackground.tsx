import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type BackgroundMedia, appConfig } from "../config/app-config";

interface BackgroundVideoItemProps {
  src: string;
  poster?: string;
  onEnded?: () => void;
}

const BackgroundVideoItem: React.FC<BackgroundVideoItemProps> = ({
  src,
  poster,
  onEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) {
      el.defaultMuted = true;
      el.muted = true;
      el.playsInline = true;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch((err: unknown) => {
          // AbortError is expected browser behavior when tab is in background or saving power
          if (
            err &&
            typeof err === "object" &&
            "name" in err &&
            (err.name === "AbortError" || err.name === "NotAllowedError")
          ) {
            return;
          }
        });
      }
    }
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Poster Image: visible immediately and smoothly cross-fades out once video frames play */}
      {poster && (
        <motion.img
          src={poster}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: isPlaying ? 0 : 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Video Element: smoothly fades in once actual playback begins */}
      <motion.video
        ref={handleVideoRef}
        key={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        onPlaying={() => setIsPlaying(true)}
        onLoadedData={() => {
          if (videoRef.current && videoRef.current.currentTime > 0) {
            setIsPlaying(true);
          }
        }}
        onEnded={onEnded}
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
        <source src={src} />
      </motion.video>
    </div>
  );
};

interface AppBackgroundProps {
  /** Optional custom list of media items. Defaults to appConfig.backgrounds */
  mediaList?: BackgroundMedia[];
  /** Duration in milliseconds before rotating an image. Defaults to appConfig.backgroundSettings.imageIntervalMs (8000ms) */
  imageIntervalMs?: number;
  /** Duration in milliseconds before rotating a video (or when video finishes). Defaults to appConfig.backgroundSettings.videoIntervalMs (16000ms) */
  videoIntervalMs?: number;
  /** Whether auto-rotate is enabled. Defaults to appConfig.backgroundSettings.autoRotate (true) */
  autoRotate?: boolean;
  /** Blur intensity on the background overlay (in px). Defaults to 4 */
  blurAmount?: number;
}

export const AppBackground: React.FC<AppBackgroundProps> = ({
  mediaList = appConfig.backgrounds,
  imageIntervalMs = appConfig.backgroundSettings.imageIntervalMs,
  videoIntervalMs = appConfig.backgroundSettings.videoIntervalMs,
  autoRotate = appConfig.backgroundSettings.autoRotate,
  blurAmount = appConfig.backgroundSettings.blurAmount,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Client-side mount check & eager preloading of all images, videos, and posters
  useEffect(() => {
    setIsMounted(true);

    if (typeof window === "undefined" || !mediaList.length) return;

    // Eagerly buffer every background image and video immediately
    mediaList.forEach((media) => {
      if (media.type === "image") {
        const img = new Image();
        img.src = media.src;
      } else if (media.type === "video") {
        const vid = document.createElement("video");
        vid.preload = "auto";
        vid.muted = true;
        vid.playsInline = true;
        vid.src = media.src;
        vid.load();
      }

      if (media.type === "video" && media.poster) {
        const posterImg = new Image();
        posterImg.src = media.poster;
      }
    });
  }, [mediaList]);

  const nextMedia = useCallback(() => {
    if (mediaList.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
  }, [mediaList.length]);

  const currentMedia =
    isMounted && mediaList.length > 0
      ? mediaList[currentIndex % mediaList.length]
      : null;

  // Distinct auto-rotation interval based on current media type (image vs video)
  useEffect(() => {
    if (!autoRotate || !currentMedia || mediaList.length <= 1) {
      return;
    }

    const intervalDuration =
      currentMedia.type === "video" ? videoIntervalMs : imageIntervalMs;

    if (!intervalDuration || intervalDuration <= 0) return;

    const timer = setTimeout(() => {
      nextMedia();
    }, intervalDuration);

    return () => clearTimeout(timer);
  }, [
    autoRotate,
    currentMedia,
    imageIntervalMs,
    videoIntervalMs,
    mediaList.length,
    nextMedia,
  ]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-slate-950"
    >
      {/* Simultaneous cross-fade prevents any dark/blank flashing during transitions */}
      <AnimatePresence mode="sync">
        {currentMedia && (
          <motion.div
            key={currentMedia.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 h-full w-full"
          >
            {currentMedia.type === "video" ? (
              <BackgroundVideoItem
                src={currentMedia.src}
                poster={currentMedia.poster}
                onEnded={nextMedia}
              />
            ) : (
              <img
                src={currentMedia.src}
                alt={currentMedia.alt || ""}
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deep dark glass & vignette overlay for high-contrast readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/70 to-slate-950/85"
        style={{
          backdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        }}
      />

      {/* Subtle radial ambient glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_120%] from-cyan-500/15 via-blue-500/10 to-transparent" />
    </div>
  );
};

export default AppBackground;
