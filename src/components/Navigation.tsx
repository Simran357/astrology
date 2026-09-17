"use client";

import React from "react";
import { useApp } from "../context/AppContext";
const darkLogo = "/image/AstroFindingsDarkLogo.svg";

type Page =
  | "home"
  | "dashboard"
  | "chart"
  | "reading"
  | "learn"
  | "profile"
  | "onboarding"
  | "login"
  | "signup"
  | "timeline"
  | "relationships"
  | "askai"
  | "wellness"
  | "palm";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { isLoggedIn } = useApp();

  if (["home", "onboarding", "login", "signup"].includes(currentPage)) {
    return null;
  }

  const handleNavClick = (id: Page) => {
    if (id === "chart" && !isLoggedIn) {
      onNavigate("login");
      return;
    }
    onNavigate(id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const desktopNavItems: { id: Page; label: string; icon?: string }[] = [
    { id: "dashboard", label: "Today" },
    { id: "chart", label: "Birth Wheel" },
    { id: "reading", label: "Transits" },
    { id: "askai", label: "Ask AI" },
    { id: "timeline", label: "Shifts" },
    { id: "learn", label: "Library" },
    { id: "profile", label: "Me" },
  ];

  const mobileNavItems: { id: Page; label: string; icon: string }[] = [
    { id: "dashboard", label: "Today", icon: "☉" },
    { id: "chart", label: "Chart", icon: "🧭" },
    { id: "reading", label: "Transits", icon: "☽" },
    { id: "askai", label: "Ask AI", icon: "✦" },
    { id: "profile", label: "Me", icon: "🪞" },
  ];

  return (
    <>
      {/* =================================================================== */}
      {/* DESKTOP TOP NAVIGATION BAR                                          */}
      {/* =================================================================== */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-18 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#052036]/10 px-8 lg:px-12 items-center justify-between z-50 transition-all">
        {/* Left: Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => handleNavClick("home")}
          aria-label="AstroFindings Home"
        >
          <img src={darkLogo} alt="AstroFindings" className="h-7 w-auto inline-block" />
        </div>

        {/* Center: Curated Navigation Links */}
        <nav className="flex items-center gap-1 lg:gap-2">
          {desktopNavItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#052036] text-[#FAF9F6] font-bold shadow-sm"
                    : "text-[#052036]/70 hover:text-[#052036] hover:bg-black/5 font-medium"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Live Sky Status & Return */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#052036]/10 text-[11px] font-mono text-[#052036]/80 shadow-2xs">
            <span className="text-[#EAC157] font-bold">●</span>
            <span>Moon in Sagittarius</span>
          </div>

          <button
            onClick={() => handleNavClick("home")}
            className="text-xs font-mono text-[#052036]/70 hover:text-[#052036] px-2 py-1 transition-colors cursor-pointer"
            title="Return to Landing Salon"
          >
            Salon ↗
          </button>
        </div>
      </header>

      {/* =================================================================== */}
      {/* MOBILE TOP BAR (Header with Logo and Live Sky)                     */}
      {/* =================================================================== */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#052036]/10 px-4 flex items-center justify-between z-40">
        <div onClick={() => handleNavClick("home")} className="cursor-pointer">
          <img src={darkLogo} alt="AstroFindings" className="h-6 w-auto" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#052036]/70 px-2.5 py-1 rounded-full bg-white/80 border border-[#052036]/10">
            🌙 Sagittarius
          </span>
          <button
            onClick={() => handleNavClick("home")}
            className="text-[11px] font-mono text-[#052036]/60 hover:text-[#052036]"
          >
            Salon
          </button>
        </div>
      </header>

      {/* =================================================================== */}
      {/* MOBILE BOTTOM NAVIGATION BAR (Thumb-friendly Plantralia Style)      */}
      {/* =================================================================== */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FAF7F2]/98 backdrop-blur-lg border-t border-[#052036]/10 flex items-center justify-around px-2 z-50 shadow-[0_-4px_20px_rgba(5,32,54,0.06)]"
        aria-label="Mobile Navigation"
      >
        {mobileNavItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex-1 py-1 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                isActive ? "text-[#052036]" : "text-[#052036]/50 hover:text-[#052036]"
              }`}
            >
              <div
                className={`w-9 h-7 rounded-full flex items-center justify-center text-sm transition-all ${
                  isActive ? "bg-[#052036] text-[#FAF9F6] shadow-sm font-bold scale-105" : ""
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] font-mono tracking-wider ${
                  isActive ? "font-bold text-[#052036]" : "font-medium text-[#052036]/60"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
