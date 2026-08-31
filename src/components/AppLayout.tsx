import React from "react";
import { Outlet } from "@tanstack/react-router";
import AppBackground from "./AppBackground";
import AppHero from "../modules/app-hero/components/AppHero";
import AppTabs from "./AppTabs";

const AppLayout: React.FC = () => {
  return (
    <div className="relative grid min-h-screen gap-5 grid-cols-1 lg:h-screen lg:grid-cols-12 lg:overflow-hidden">
      <AppBackground />

      {/* Left section: AppHero */}
      <section className="h-auto w-full col-span-12 hidden lg:block lg:col-span-4 lg:h-full lg:overflow-y-auto no-scrollbar">
        <AppHero />
      </section>

      {/* Right section: AppTabs & Route Outlet */}
      <section
        id="content-scroll-container"
        className="flex h-auto w-full col-span-12 lg:col-span-8 flex-col lg:h-full lg:overflow-y-auto no-scrollbar scroll-smooth"
      >
        <AppTabs />
        <main className="flex-1 w-full p-4 lg:mt-4">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default AppLayout;
