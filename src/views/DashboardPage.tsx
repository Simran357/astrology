"use client";

import { useApp } from "../context/AppContext";
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
      time: "2 days ago",
    },
    {
      title: `Your Venus in ${venusP?.sign || user.moonSign}`,
      subtitle: "Love, values and what brings you peace",
      planet: "Venus",
      time: "5 days ago",
    },
    {
      title: `Your ${user.moonSign} Moon in ${user.placements.find(p=>p.planet==="Moon")?.house || 4}th House`,
      subtitle: "Emotional sanctuary and interior instinct",
      planet: "Moon",
      time: "1 week ago",
    },
  ];

  const cosmicEvents = liveTransits.activeShifts && liveTransits.activeShifts.length > 0
    ? liveTransits.activeShifts.slice(0, 3).map((s) => ({
        name: s.title,
        date: s.date,
        personal: s.isMajorShift || Boolean(s.personalActivationPrompt),
        icon: s.title.includes("Mars") ? <MarsSymbol size={16} className="text-[#e07070]"/> :
              s.title.includes("Moon") ? <MoonSymbol size={16} className="text-[#bfb7aa]"/> :
              s.title.includes("Saturn") ? <SaturnSymbol size={16} className="text-[#8aabcc]"/> :
              <JupiterSymbol size={16} className="text-[#f0c060]"/>,
      }))
    : [
        { name: "Mars enters Capricorn", date: "Sep 14", personal: true, icon: <MarsSymbol size={16} className="text-[#e07070]"/> },
        { name: "Full Moon in Pisces", date: "Sep 17", personal: false, icon: <MoonSymbol size={16} className="text-[#bfb7aa]"/> },
        { name: "Saturn direct", date: "Sep 22", personal: true, icon: <SaturnSymbol size={16} className="text-[#8aabcc]"/> },
      ];

  return (
    <div className="min-h-screen bg-[#052036] text-[#FAF9F6]">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 70% 20%, rgba(234,193,87,0.06) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-8">

        {/* Greeting */}
        <div className="mb-12">
          <p className="text-xs font-sans text-[#EAC157] tracking-widest uppercase mb-2 font-semibold">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#FFFFFF]">
            {greeting}, {firstName}
          </h1>
          <p className="text-[#c5d3df] mt-2 text-sm">Sun in {user.sunSign} · Moon in {user.moonSign} · {user.risingSign} rising</p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left column — chart + insight */}
          <div className="lg:col-span-3 space-y-8">

            {/* Today's Psychological Horoscope & Trigger Diagnosis */}
            <div className="border border-[rgba(234,193,87,0.3)] bg-[#082842] rounded-xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SunSymbol size={16} className="text-[#EAC157]" />
                  <span className="text-xs font-sans text-[#EAC157] tracking-widest uppercase font-bold">
                    Today's Emotional Climate · {user.sunSign} Sun × {user.moonSign} Moon
                  </span>
                </div>
                <span className="text-[10px] font-sans text-[#EAC157] uppercase px-2.5 py-0.5 border border-[#EAC157]/40 rounded-full font-semibold">
                  Free Discovery
                </span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#FFFFFF] leading-snug">
                Why your impulse today is to detach, step back into silence, and overthink.
              </h2>

              <p className="text-sm text-[#FAF9F6]/90 leading-relaxed font-sans">
                Today's sky pressure acts directly on your {user.moonSign} Moon. When difficult emotions or unexpected friction surface, your immediate instinct is not to scream—it is to withdraw your energy, question what others feel about you, and retreat into your comfort zone where no one can hurt your feelings.
              </p>

              <div className="p-4 rounded-lg bg-[#052036] border-l-2 border-[#EAC157] space-y-1 text-xs">
                <span className="font-sans text-[11px] text-[#EAC157] uppercase tracking-wider block font-bold">
                  What Triggers You Today:
                </span>
                <p className="text-[#c5d3df] leading-relaxed">
                  The current Moon angle cross-examining your natal placements is amplifying feelings of loneliness and unexpressed anxiety. You are tempted to suppress what you feel to keep the peace.
                </p>
              </div>

              {/* Competitor-Style Curiosity & Paywall Teaser */}
              <div className="p-4 rounded-lg border border-dashed border-[#EAC157]/45 bg-[rgba(234,193,87,0.08)] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-sans text-[#EAC157] font-semibold uppercase tracking-wider text-[11px]">
                    ✦ Premium Hope Window & Timing Unlock
                  </span>
                  <span className="font-sans text-[10px] text-[#c5d3df] font-semibold">PAID // THE RESOLUTION</span>
                </div>
                <p className="text-xs text-[#FAF9F6]/90 leading-relaxed font-sans">
                  You know the trigger. But when does the emotional fog lift? Our deep transit engine has mapped your <strong>Hope Window</strong>—the exact date this karmic tension resolves, how to handle the conversation without guilt, and how to step into what makes you shine.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "astrofindings_pending_inquiry",
                        `Today's Sky Analysis: What is triggering my detachment and overthinking today based on my ${user.sunSign} Sun and ${user.moonSign} Moon, and when will my hope window open?`
                      );
                      onNavigate("askai");
                    }}
                    className="button-primary cursor-pointer text-xs py-2 px-5 rounded-full w-full sm:w-auto font-bold"
                  >
                    Ask AstroFindings on Today's Triggers →
                  </button>
                  <button
                    onClick={() => onNavigate("timeline")}
                    className="text-xs font-sans text-[#c5d3df] hover:text-[#EAC157] transition-colors cursor-pointer"
                  >
                    View Transit Timeline of Relief ↗
                  </button>
                </div>
              </div>
            </div>

            {/* Birth chart preview */}
            <div className="border border-[rgba(234,193,87,0.25)] bg-[#082842] rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-sans text-[#EAC157] tracking-widest uppercase mb-1 font-semibold">Your natal chart</p>
                  <h3 className="font-serif text-lg font-semibold text-[#FFFFFF]">{user.name} — {user.birthDate}</h3>
                </div>
                <button onClick={() => onNavigate("chart")}
                  className="text-xs text-[#052036] bg-[#EAC157] hover:bg-[#FFFFFF] font-semibold transition-all px-4 py-1.5 rounded-full cursor-pointer shadow-sm">
                  Full chart →
                </button>
              </div>
              <div className="flex justify-center">
                <BirthChart size={340} animated={false} placements={user.placements} aspects={user.aspects} />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Moon phase */}
            <div className="border border-[rgba(234,193,87,0.25)] bg-[#082842] rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <MoonSymbol size={14} className="text-[#EAC157]"/>
                <span className="text-xs font-sans text-[#EAC157] tracking-widest uppercase font-semibold">Moon</span>
              </div>
              <div className="flex items-center gap-4">
                <WaxingCrescent size={52} className="text-[#EAC157]"/>
                <div>
                  <p className="font-serif text-lg font-semibold text-[#FFFFFF]">{liveTransits.moonPhase?.phaseName || "Waxing Crescent"}</p>
                  <p className="text-sm text-[#c5d3df] mt-0.5">Moon in {liveTransits.moonPhase?.sign || "Libra"} — {liveTransits.moonPhase?.illumination || 28}%</p>
                  <p className="text-xs text-[#c5d3df] mt-3 leading-relaxed">
                    "A time for setting intentions and beginning new ventures with care."
                  </p>
                  <button
                    onClick={() => navigateWithHighlight("chart", "Moon")}
                    className="mt-3 text-xs text-[#EAC157] hover:text-[#FFFFFF] transition-colors flex items-center gap-1 cursor-pointer font-semibold">
                    See your Moon in chart <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cosmic events */}
            <div className="border border-[rgba(234,193,87,0.25)] bg-[#082842] rounded-xl p-6 shadow-lg">
              <p className="text-xs font-sans text-[#EAC157] tracking-widest uppercase mb-4 font-semibold">Upcoming</p>
              <div className="space-y-4">
                {cosmicEvents.map((event, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5">{event.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-[#FAF9F6] truncate">{event.name}</p>
                        <span className="text-xs font-sans text-[#c5d3df] shrink-0">{event.date}</span>
                      </div>
                      {event.personal && (
                        <p className="text-xs text-[#EAC157] mt-0.5 font-semibold">Activates your chart</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent readings */}
            <div className="border border-[rgba(234,193,87,0.25)] bg-[#082842] rounded-xl p-6 shadow-lg">
              <p className="text-xs font-sans text-[#EAC157] tracking-widest uppercase mb-4 font-semibold">Recent readings</p>
              <div className="space-y-4">
                {recentReadings.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => navigateWithHighlight("chart", r.planet)}
                    className="w-full text-left group cursor-pointer">
                    <p className="text-sm text-[#FAF9F6] group-hover:text-[#EAC157] transition-colors font-medium">{r.title}</p>
                    <p className="text-xs text-[#c5d3df] mt-0.5">{r.subtitle}</p>
                    <p className="text-xs text-[#c5d3df] mt-1 font-mono opacity-60">{r.time}</p>
                    {i < recentReadings.length - 1 && (
                      <div className="h-px bg-[rgba(234,193,87,0.15)] mt-4"/>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
