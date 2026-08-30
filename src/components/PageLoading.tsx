import type React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { GlassCard } from "./glass-card";

export const PageLoading: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center py-16 px-4">
      <GlassCard className="flex flex-col items-center justify-center p-8 backdrop-blur-xl border-white/20 shadow-2xl min-w-[240px]">
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute -inset-2 rounded-full bg-linear-to-r from-cyan-500/30 to-purple-500/30 blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/70">
          <span>Loading...</span>
        </div>
      </GlassCard>
    </div>
  );
};

export default PageLoading;
