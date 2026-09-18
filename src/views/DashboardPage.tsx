"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
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
  const dashboardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = dashboardRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".dashboard-kicker, .dashboard-title, .dashboard-subtitle", { opacity: 0, y: 18, duration: 0.7, stagger: 0.08, ease: "power2.out" });
      gsap.from(".dashboard-card", { opacity: 0, y: 24, duration: 0.7, stagger: 0.08, delay: 0.2, ease: "power2.out" });
      gsap.from(".dashboard-sticker", { opacity: 0, scale: 0.8, rotation: -8, duration: 0.8, delay: 0.35, ease: "back.out(1.7)" });
    }, root);
    return () => ctx.revert();
  }, []);
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
    <div ref={dashboardRef} className="astral-dashboard min-h-screen bg-[#0e0a17] text-[#eee5d3]">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 70% 20%, rgba(60,30,130,0.07) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-8">

        {/* Greeting */}
        <div className="dashboard-header mb-12">
          <div className="dashboard-visual-strip" aria-label="Astrology archive collage">
            <div className="dashboard-visual-label">YOUR<br />PERSONAL<br /><i>FIELD GUIDE</i></div>
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3xYsvjTvWnmVQwWwMC0qY1CjkmU5Wi.png" alt="Textured celestial eye collage" />
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kN1OXlGmBLemVfV2KYGHFil9UVVOPH.png" alt="Vintage hand holding a moon" />
            <span className="dashboard-orbit-note">read the<br /><i>evidence</i> ↗</span>
          </div>
          <div className="dashboard-sticker" aria-hidden="true"><span>YOUR<br />SKY<br />NOT<br />YOUR<br />FATE</span><i>✦</i></div>
          <p className="dashboard-kicker text-xs font-mono text-[#f0c870] tracking-widest uppercase mb-2">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="dashboard-title font-serif text-3xl md:text-4xl font-light text-[#eee5d3]">
            {greeting}, {firstName}
          </h1>
          <p className="dashboard-subtitle text-[#bfb7aa] mt-2 text-sm">Sun in {user.sunSign} · Moon in {user.moonSign} · {user.risingSign} rising</p>
        </div>

        {/* Archive shelf */}
        <div className="dashboard-shelf dashboard-card">
          <div><p className="dashboard-shelf-kicker">ARCHIVE / 01</p><h2>Your sky, in fragments.</h2><p>Save the symbols, patterns, and questions that keep returning.</p></div>
          <div className="dashboard-shelf-items">
            <button onClick={() => onNavigate("chart")}><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-17%20at%202.17.52%E2%80%AFPM-1qQs6XqWhhFl2NXhsokqiTweMdN4Fo.png" alt="Heart and eye symbol" /><span>your inner compass</span></button>
            <button onClick={() => onNavigate("learn")}><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-17%20at%202.25.38%E2%80%AFPM-5iRZYtjt5usmWOhrqhAcVNN94awP2a.png" alt="Pink watercolor rabbit" /><span>soft instincts</span></button>
            <button onClick={() => onNavigate("reading")}><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dFPASxJUCCJ2MzJdLGC1VJr9mpPA3l.png" alt="Gold star cutout" /><span>small omens</span></button>
          </div>
        </div>

        {/* Reading-room gallery */}
        <section className="reading-room dashboard-card" aria-labelledby="reading-room-title">
          <div className="reading-room-copy">
            <p className="reading-room-kicker">THE ASTROLOGY READING ROOM / 01</p>
            <h2 id="reading-room-title">A quieter way to<br /><i>read the sky.</i></h2>
            <p>Keep the parts of your chart that feel useful close at hand: one placement, one question, one small piece of evidence at a time.</p>
            <button className="button-primary" onClick={() => onNavigate("chart")}>Open your chart <span aria-hidden="true">↗</span></button>
          </div>
          <div className="reading-room-feature">
            <div className="reading-room-stamp">FIELD<br />NOTE<br /><b>002</b></div>
            <div className="phone-panel phone-panel-tall">
              <span className="phone-notch" />
              <p className="phone-overline">NATAL ARCHIVE</p>
              <div className="phone-moon">☾</div>
              <h3>{user.moonSign}<br /><i>Moon notes</i></h3>
              <p className="phone-rule">How you return to yourself.</p>
              <div className="phone-lines"><span /><span /><span /></div>
              <span className="phone-footer">01 / 04</span>
            </div>
            <div className="reading-room-note">save the<br /><i>feeling</i> ↗</div>
            <div className="phone-panel phone-panel-small">
              <span className="phone-notch" />
              <p className="phone-overline">TODAY</p>
              <div className="tiny-orbit">✦</div>
              <h3>Transit<br /><i>weather</i></h3>
              <p className="phone-rule">A useful pause before the next move.</p>
              <span className="phone-footer">SEP 18</span>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left column — chart + insight */}
          <div className="lg:col-span-3 space-y-8">

            {/* Today's Psychological Horoscope & Trigger Diagnosis */}
            <div className="dashboard-card border border-[rgba(238,93,52,0.22)] bg-[rgba(31,24,48,0.85)] rounded-sm p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SunSymbol size={16} className="text-[#f0c870]" />
                  <span className="text-xs font-mono text-[#ee5d34] tracking-widest uppercase font-bold">
                    Today's Emotional Climate · {user.sunSign} Sun × {user.moonSign} Moon
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#bfb7aa] uppercase px-2 py-0.5 border border-white/10 rounded-sm">
                  Free Discovery
                </span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-light text-[#eee5d3] leading-snug">
                Why your impulse today is to detach, step back into silence, and overthink.
              </h2>

              <p className="text-sm text-[#eee5d3]/90 leading-relaxed font-serif">
                Today's sky pressure acts directly on your {user.moonSign} Moon. When difficult emotions or unexpected friction surface, your immediate instinct is not to scream—it is to withdraw your energy, question what others feel about you, and retreat into your comfort zone where no one can hurt your feelings.
              </p>

              <div className="p-4 rounded-sm bg-[rgba(14,10,23,0.7)] border-l-2 border-[#ee5d34] space-y-1 text-xs">
                <span className="font-mono text-[10px] text-[#ee5d34] uppercase tracking-wider block font-bold">
                  What Triggers You Today:
                </span>
                <p className="text-[#bfb7aa] leading-relaxed">
                  The current Moon angle cross-examining your natal placements is amplifying feelings of loneliness and unexpressed anxiety. You are tempted to suppress what you feel to keep the peace.
                </p>
              </div>

              {/* Competitor-Style Curiosity & Paywall Teaser */}
              <div className="p-4 rounded-sm border border-dashed border-[#ee5d34]/40 bg-[rgba(238,93,52,0.06)] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#d4af37] font-semibold uppercase tracking-wider text-[11px]">
                    ✦ Premium Hope Window & Timing Unlock
                  </span>
                  <span className="font-mono text-[10px] text-[#bfb7aa]">PAID // THE RESOLUTION</span>
                </div>
                <p className="text-xs text-[#eee5d3]/90 leading-relaxed font-serif">
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
                    className="button-primary cursor-pointer text-xs py-2 px-4 w-full sm:w-auto font-bold"
                  >
                    Ask AstroFindings on Today's Triggers →
                  </button>
                  <button
                    onClick={() => onNavigate("timeline")}
                    className="text-xs font-mono text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
                  >
                    View Transit Timeline of Relief ↗
                  </button>
                </div>
              </div>
            </div>

            {/* Birth chart preview */}
            <div className="dashboard-card border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
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
            <div className="dashboard-card border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
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
            <div className="dashboard-card border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
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
            <div className="dashboard-card border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
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
