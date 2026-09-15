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
    <div className="min-h-screen bg-[#0e0a17] text-[#eee5d3]">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 70% 20%, rgba(60,30,130,0.07) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-8">

        {/* Greeting */}
        <div className="mb-12">
          <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-2">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[#eee5d3]">
            {greeting}, {firstName}
          </h1>
          <p className="text-[#bfb7aa] mt-2 text-sm">Sun in {user.sunSign} · Moon in {user.moonSign} · {user.risingSign} rising</p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left column — chart + insight */}
          <div className="lg:col-span-3 space-y-8">

            {/* Today's insight */}
            <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <SunSymbol size={16} className="text-[#f0c870]"/>
                <span className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase">Today's cosmic influence</span>
              </div>
              <p className="font-serif text-xl font-light text-[#eee5d3] leading-relaxed mb-4">
                With the current planetary weather meeting your natal {user.sunSign} Sun, communication and choices carry notable weight.
              </p>
              <p className="text-sm text-[#bfb7aa] leading-relaxed">
                Your {user.risingSign} rising amplifies this timing — moments that feel quiet on the surface may reveal long-term clarity. Trust your instinct to observe before reacting.
              </p>
              <button onClick={() => onNavigate("reading")}
                className="mt-5 text-sm text-[#ee5d34] hover:text-[#f58a6b] transition-colors flex items-center gap-1.5 cursor-pointer">
                Full reading for today <span>→</span>
              </button>
            </div>

            {/* Birth chart preview */}
            <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-1">Your natal chart</p>
                  <h3 className="font-serif text-lg font-light text-[#eee5d3]">{user.name} — {user.birthDate}</h3>
                </div>
                <button onClick={() => onNavigate("chart")}
                  className="text-xs text-[#ee5d34] hover:text-[#f58a6b] transition-colors border border-[rgba(238,93,52,0.25)] px-3 py-1.5 rounded-sm cursor-pointer">
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
            <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <MoonSymbol size={14} className="text-[#bfb7aa]"/>
                <span className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase">Moon</span>
              </div>
              <div className="flex items-center gap-4">
                <WaxingCrescent size={52} className="text-[#bfb7aa]"/>
                <div>
                  <p className="font-serif text-lg font-light text-[#eee5d3]">{liveTransits.moonPhase?.phaseName || "Waxing Crescent"}</p>
                  <p className="text-sm text-[#bfb7aa] mt-0.5">Moon in {liveTransits.moonPhase?.sign || "Libra"} — {liveTransits.moonPhase?.illumination || 28}%</p>
                  <p className="text-xs text-[#bfb7aa] mt-3 leading-relaxed">
                    "A time for setting intentions and beginning new ventures with care."
                  </p>
                  <button
                    onClick={() => navigateWithHighlight("chart", "Moon")}
                    className="mt-3 text-xs text-[#ee5d34] hover:text-[#f58a6b] transition-colors flex items-center gap-1 cursor-pointer">
                    See your Moon in chart <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cosmic events */}
            <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
              <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-4">Upcoming</p>
              <div className="space-y-4">
                {cosmicEvents.map((event, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5">{event.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-[#eee5d3] truncate">{event.name}</p>
                        <span className="text-xs font-mono text-[#bfb7aa] shrink-0">{event.date}</span>
                      </div>
                      {event.personal && (
                        <p className="text-xs text-[#ee5d34] mt-0.5">Activates your chart</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent readings */}
            <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
              <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-4">Recent readings</p>
              <div className="space-y-4">
                {recentReadings.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => navigateWithHighlight("chart", r.planet)}
                    className="w-full text-left group cursor-pointer">
                    <p className="text-sm text-[#eee5d3] group-hover:text-[#ee5d34] transition-colors">{r.title}</p>
                    <p className="text-xs text-[#bfb7aa] mt-0.5">{r.subtitle}</p>
                    <p className="text-xs text-[#bfb7aa] mt-1 font-mono opacity-60">{r.time}</p>
                    {i < recentReadings.length - 1 && (
                      <div className="h-px bg-[rgba(238,93,52,0.08)] mt-4"/>
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
