"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { getCurrentSession } from "../services/supabaseClient";
import {
  MoonSymbol,
  SunSymbol,
  WaxingCrescent,
  JupiterSymbol,
  SaturnSymbol,
  MarsSymbol,
} from "../components/icons/CelestialIcons";
import BirthChart from "../components/BirthChart";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user, liveTransits, navigateWithHighlight } = useApp();
  const [dailyHoroscope, setDailyHoroscope] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const session = await getCurrentSession();
        const headers: Record<string, string> = {};
        if (session?.access_token) {
          headers["Authorization"] = "Bearer " + session.access_token;
        }
        const res = await fetch("/api/horoscope/today", { headers });
        if (res.ok) {
          const data = await res.json();
          setDailyHoroscope(data);
        }
      } catch (e) {}
    };
    fetchHoroscope();
  }, [user.birthDate]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = user.name ? user.name.split(" ")[0] : "Seeker";

  const marsP = user.placements.find((p) => p.planet === "Mars");
  const venusP = user.placements.find((p) => p.planet === "Venus");

  const recentReadings = [
    {
      title: `Your Mars in ${marsP?.sign || user.sunSign}`,
      subtitle: "Drive, ambition & what ignites you",
      planet: "Mars",
      icon: "♂",
      time: "2 days ago",
    },
    {
      title: `Your Venus in ${venusP?.sign || user.moonSign}`,
      subtitle: "Love, values and what brings you peace",
      planet: "Venus",
      icon: "♀",
      time: "5 days ago",
    },
    {
      title: `Your ${user.moonSign} Moon in ${user.placements.find(p=>p.planet==="Moon")?.house || 4}th House`,
      subtitle: "Emotional sanctuary and interior instinct",
      planet: "Moon",
      icon: "☽",
      time: "1 week ago",
    },
  ];

  const cosmicEvents = liveTransits.activeShifts && liveTransits.activeShifts.length > 0
    ? liveTransits.activeShifts.slice(0, 4).map((s) => ({
        name: s.title,
        date: s.date,
        personal: s.isMajorShift || Boolean(s.personalActivationPrompt),
        icon: s.title.includes("Mars") ? <MarsSymbol size={16} className="text-[#e07070]"/> :
              s.title.includes("Moon") ? <MoonSymbol size={16} className="text-[#8C6B1B]"/> :
              s.title.includes("Saturn") ? <SaturnSymbol size={16} className="text-[#8aabcc]"/> :
              <JupiterSymbol size={16} className="text-[#f0c060]"/>,
      }))
    : [
        { name: "Mars enters Capricorn", date: "Sep 14", personal: true, icon: <MarsSymbol size={16} className="text-[#e07070]"/> },
        { name: "Full Moon in Pisces", date: "Sep 17", personal: false, icon: <MoonSymbol size={16} className="text-[#8C6B1B]"/> },
        { name: "Saturn direct", date: "Sep 22", personal: true, icon: <SaturnSymbol size={16} className="text-[#8aabcc]"/> },
      ];

  const filterTabs = ["ALL", "TODAY'S SKY", "TRANSITS", "NATAL CORE", "HOPE WINDOW"];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#052036] font-inter">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-6 md:py-10 space-y-8">
        
        {/* ================================================================= */}
        {/* 1. TOP HEADER & GREETING (Plantralia / Editorial Style with Sticker)*/}
        {/* ================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C6B1B] font-semibold">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white border border-[#052036]/10 text-[#052036] shadow-2xs">
                ✦ Swiss Ephemeris Connected
              </span>
            </div>

            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-[#052036] font-normal leading-tight">
              {greeting}, <span className="italic">{firstName}</span>
            </h1>

            {/* Core Placements Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-white border border-[#052036]/10 text-xs font-mono text-[#052036] shadow-2xs">
                ☉ Sun in {user.sunSign}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#052036]/10 text-xs font-mono text-[#052036] shadow-2xs">
                ☽ Moon in {user.moonSign}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#052036]/10 text-xs font-mono text-[#052036] shadow-2xs">
                🧭 {user.risingSign} Rising
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <img
              src={"/stickers/zodiac/" + (user.sunSign || "leo").toLowerCase() + ".png"}
              alt={user.sunSign}
              className="w-18 h-18 sm:w-22 sm:h-22 object-contain filter drop-shadow-md hover:scale-105 transition-transform"
              onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. TOPIC FILTER CHIPS (Like Image 2 Plantralia Filter Bar)        */}
        {/* ================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#052036] text-[#FAF9F6] font-bold shadow-sm"
                    : "bg-white text-[#052036]/70 hover:text-[#052036] hover:bg-white/80 border border-[#052036]/10"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 3. FEATURED DAILY CLIMATE CARD (High Readability & Contrast)      */}
        {/* ================================================================= */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-9 border border-[#052036]/10 shadow-[0_14px_36px_rgba(5,32,54,0.04)] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#052036]/10 pb-4">
            <div className="flex items-center gap-2">
              <SunSymbol size={16} className="text-[#8C6B1B] shrink-0" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C6B1B] font-bold">
                Today's Emotional Climate · {user.sunSign} Sun × {user.moonSign} Moon
              </span>
            </div>
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#052036]/10 text-[#052036] font-semibold">
              Live Transit Analysis
            </span>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#052036] font-semibold leading-snug">
              {dailyHoroscope?.headline || "Why your impulse today is to detach, step back into silence, and overthink."}
            </h2>

            {/* Key Characteristic Pills (Like Image 2) */}
            <div className="grid grid-cols-3 gap-2 my-4 max-w-lg">
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#052036]/8 text-center">
                <span className="text-[9px] font-mono uppercase text-[#052036]/50 block">TRANSIT MOON</span>
                <span className="text-xs font-mono font-bold text-[#052036]">Sagittarius</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#052036]/8 text-center">
                <span className="text-[9px] font-mono uppercase text-[#052036]/50 block">NATAL MOON</span>
                <span className="text-xs font-mono font-bold text-[#052036]">{user.moonSign}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#052036]/8 text-center">
                <span className="text-[9px] font-mono uppercase text-[#052036]/50 block">KEY HOUSE</span>
                <span className="text-xs font-mono font-bold text-[#052036]">4th / 10th Axis</span>
              </div>
            </div>

            <p className="font-inter text-sm sm:text-base text-[#052036]/85 leading-relaxed">
              Today's celestial pressure acts directly on your {user.moonSign} Moon. When difficult emotions or unexpected friction surface, your immediate instinct is not to scream—it is to withdraw your energy, question what others feel about you, and retreat into your comfort zone where no one can hurt your feelings.
            </p>
          </div>

          {/* Trigger Diagnosis Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#C89B3C] space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6B1B] block font-bold">
              What Triggers You Today:
            </span>
            <p className="font-inter text-xs sm:text-sm text-[#052036]/80 leading-relaxed font-normal">
              The current Moon angle cross-examining your natal placements is amplifying feelings of loneliness and unexpressed anxiety. You are tempted to suppress what you feel to keep the peace.
            </p>
          </div>

          {/* Hope Window & Action */}
          <div className="p-5 rounded-2xl border border-[#052036]/10 bg-[#FAF9F6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#052036] font-bold">
                ✦ Resolution Window & Timing
              </span>
              <span className="text-[10px] font-mono text-[#8C6B1B] font-semibold">Active Transit</span>
            </div>
            <p className="text-xs sm:text-sm text-[#052036]/80 leading-relaxed font-normal">
              Our deep transit engine has mapped your <strong>Hope Window</strong>—how this karmic tension resolves, how to communicate without guilt, and how to step into quiet clarity.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  localStorage.setItem(
                    "astrofindings_pending_inquiry",
                    `Today's Sky Analysis: What is triggering my detachment and overthinking today based on my ${user.sunSign} Sun and ${user.moonSign} Moon?`
                  );
                  onNavigate("askai");
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#052036] text-[#FAF9F6] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#082842] transition-all shadow-sm cursor-pointer"
              >
                Ask AstroFindings on Today's Triggers →
              </button>
              <button
                onClick={() => onNavigate("timeline")}
                className="text-xs font-mono text-[#052036]/70 hover:text-[#052036] transition-colors cursor-pointer"
              >
                View Transit Timeline of Relief ↗
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. TWO FEATURED COLLECTIONS (Birth Wheel + Moon Phase)            */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Collection 1: Birth Wheel */}
          <div className="bg-white/95 rounded-3xl p-6 border border-[#052036]/10 shadow-[0_10px_28px_rgba(5,32,54,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6B1B] block font-bold">
                    NATAL ARCHITECTURE
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-[#052036]">
                    Your Birth Wheel
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate("chart")}
                  className="px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#052036]/10 text-xs font-mono text-[#052036] hover:bg-[#052036] hover:text-[#FAF9F6] transition-all cursor-pointer"
                >
                  Inspect →
                </button>
              </div>
              <div className="flex justify-center py-2">
                <BirthChart size={240} animated={false} placements={user.placements} aspects={user.aspects} />
              </div>
            </div>
            <p className="text-xs font-inter text-[#052036]/70 pt-2 border-t border-[#052036]/8 text-center">
              Tap any planet in the wheel to view degree, house, and aspects
            </p>
          </div>

          {/* Collection 2: Moon Phase & Void of Course */}
          <div className="bg-white/95 rounded-3xl p-6 border border-[#052036]/10 shadow-[0_10px_28px_rgba(5,32,54,0.03)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6B1B] block font-bold">
                    LUNAR CYCLE
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-[#052036]">
                    {liveTransits.moonPhase?.phaseName || "Waxing Crescent"}
                  </h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#052036]/10 text-[#052036]">
                  {liveTransits.moonPhase?.illumination || 28}% Illumination
                </span>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#052036]/8">
                <img
                  src="/stickers/moon-wing.png"
                  alt="Lunar Transit"
                  className="w-16 h-16 object-contain shrink-0 filter drop-shadow-xs"
                  onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                />
                <div className="space-y-1">
                  <span className="font-cormorant text-xl font-semibold text-[#052036] block leading-snug">
                    Moon in {liveTransits.moonPhase?.sign || "Sagittarius"}
                  </span>
                  <p className="font-inter text-xs text-[#052036]/75 leading-relaxed">
                    "A time for setting intentions and moving forward with grounded courage."
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#052036]/75">
                <div className="flex justify-between py-1 border-b border-[#052036]/8">
                  <span>Void of Course:</span>
                  <span className="font-bold text-[#052036]">None today (Active)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#052036]/8">
                  <span>Next New Moon:</span>
                  <span className="font-bold text-[#052036]">In 14 days</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateWithHighlight("chart", "Moon")}
              className="mt-4 w-full py-2.5 rounded-full bg-white border border-[#052036]/15 text-xs font-mono text-[#052036] hover:bg-[#052036] hover:text-white transition-all cursor-pointer text-center"
            >
              See your Moon in natal chart →
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 5. LIST ITEMS (Plantralia Style "Common Plants" with Thumbnails)   */}
        {/* ================================================================= */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-[#052036]/10 shadow-[0_10px_28px_rgba(5,32,54,0.03)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#052036]/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6B1B] block font-bold">
                TIMELINE OF THE SKY
              </span>
              <h3 className="font-cormorant text-2xl font-bold text-[#052036]">
                Upcoming Cosmic Shifts
              </h3>
            </div>
            <button
              onClick={() => onNavigate("timeline")}
              className="text-xs font-mono text-[#052036]/70 hover:text-[#052036] cursor-pointer"
            >
              See all shifts →
            </button>
          </div>

          <div className="divide-y divide-[#052036]/8">
            {cosmicEvents.map((event, i) => (
              <div
                key={i}
                onClick={() => onNavigate("timeline")}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#FAF7F2] px-3 -mx-3 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#052036]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {event.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-cormorant text-lg font-semibold text-[#052036] group-hover:text-[#8C6B1B] transition-colors leading-snug truncate">
                      {event.name}
                    </h4>
                    <span className="text-xs font-mono text-[#052036]/60 block">
                      {event.personal ? "✦ Activates your personal chart" : "Collective background transit"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-[#052036]/60">
                    {event.date}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white border border-[#052036]/10 flex items-center justify-center text-xs text-[#052036] group-hover:bg-[#052036] group-hover:text-white transition-all">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 6. RECENT READINGS SHELF (Plantralia Style)                       */}
        {/* ================================================================= */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-[#052036]/10 shadow-[0_10px_28px_rgba(5,32,54,0.03)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#052036]/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6B1B] block font-bold">
                ARCHIVED INSIGHTS
              </span>
              <h3 className="font-cormorant text-2xl font-bold text-[#052036]">
                Recent Interpretations
              </h3>
            </div>
            <button
              onClick={() => onNavigate("reading")}
              className="text-xs font-mono text-[#052036]/70 hover:text-[#052036] cursor-pointer"
            >
              Browse reading salon →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentReadings.map((r, i) => (
              <div
                key={i}
                onClick={() => navigateWithHighlight("chart", r.planet)}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#052036]/8 hover:border-[#052036]/20 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-serif text-[#8C6B1B] font-bold">{r.icon}</span>
                    <span className="text-[10px] font-mono text-[#052036]/50">{r.time}</span>
                  </div>
                  <h5 className="font-cormorant text-base font-semibold text-[#052036] group-hover:text-[#8C6B1B] transition-colors leading-snug">
                    {r.title}
                  </h5>
                  <p className="font-inter text-xs text-[#052036]/70 leading-relaxed line-clamp-2">
                    {r.subtitle}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#052036]/8 flex items-center justify-between text-[11px] font-mono text-[#052036]/60">
                  <span>Re-examine</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
