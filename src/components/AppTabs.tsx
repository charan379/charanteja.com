import type React from "react";
import { Link } from "@tanstack/react-router";
import {
  User,
  GraduationCap,
  BriefcaseBusiness,
  Home,
  FolderGit2,
  Code2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { appConfig } from "../config/app-config";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  User,
  GraduationCap,
  BriefcaseBusiness,
  Home,
  FolderGit2,
  Code2,
  Sparkles,
};

export const AppTabs: React.FC = () => {
  return (
    <header
      id="main-tabs-header"
      className="sticky top-0 z-50 flex w-full items-center justify-center p-4"
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-lg"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
        <nav
          className="relative inline-flex h-12 items-center justify-center gap-1 rounded-xl p-1 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          aria-label="Main Navigation"
        >
          {appConfig.navItems.map((item) => {
            const Icon = iconMap[item.icon] || User;
            return (
              <Link
                key={item.label}
                to={item.to as any}
                viewTransition
                activeOptions={{ exact: item.exact }}
                className="group relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white/80 hover:bg-white/5"
                activeProps={{
                  className:
                    "bg-white/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
                }}
              >
                <Icon className="h-4 w-4" />
                <span className="ml-2 hidden group-[.active]:inline sm:inline">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default AppTabs;
