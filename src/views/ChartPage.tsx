"use client";

import { useState, useEffect } from "react";
import BirthChart from "../components/BirthChart";
import {
  SunSymbol,
  MoonSymbol,
  MercurySymbol,
  VenusSymbol,
  MarsSymbol,
  JupiterSymbol,
  SaturnSymbol,
  ZodiacIcon,
} from "../components/icons/CelestialIcons";
import { useApp } from "../context/AppContext";
import { HOUSE_LIFE_AREAS } from "../data/houseLifeAreas";
import { askAIAstrologer, AIResponse } from "../services/aiAstrologyService";

interface ChartPageProps {
  onNavigate: (page: string) => void;
}

const TABS = ["Placements", "Aspects", "Houses", "Overview"];

const PLANET_ICON_MAP: Record<string, (props: { size?: number; className?: string }) => React.ReactNode> = {
  Sun: (p) => <SunSymbol size={p.size || 18} className={p.className || "text-[#EAC157]"} />,
  Moon: (p) => <MoonSymbol size={p.size || 18} className={p.className || "text-[#052036]/70"} />,
  Mercury: (p) => <MercurySymbol size={p.size || 18} className={p.className || "text-[#a0c4ff]"} />,
  Venus: (p) => <VenusSymbol size={p.size || 18} className={p.className || "text-[#f4acb7]"} />,
  Mars: (p) => <MarsSymbol size={p.size || 18} className={p.className || "text-[#e07070]"} />,
  Jupiter: (p) => <JupiterSymbol size={p.size || 18} className={p.className || "text-[#EAC157]"} />,
  Saturn: (p) => <SaturnSymbol size={p.size || 18} className={p.className || "text-[#8aabcc]"} />,
};

export default function ChartPage({ onNavigate }: ChartPageProps) {
  const { user, highlightedPlanet, setHighlightedPlanet, isLoggedIn, liveTransits, navigateWithHighlight } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);
  const [psychQuestion, setPsychQuestion] = useState("");
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<AIResponse | null>(null);

  const handleAskPsychAI = async (qText?: string) => {
    const text = qText || psychQuestion;
    if (!text.trim()) return;
    setIsAskingAI(true);
    try {
      const res = await askAIAstrologer(user, liveTransits, text);
      setAiAnswer(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAskingAI(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#052036] font-inter flex flex-col items-center justify-center px-6 py-16 selection:bg-[#EAC157] selection:text-[#052036]">
        <div className="max-w-md w-full border border-[#052036]/15 bg-white p-8 rounded-2xl text-center space-y-6 shadow-2xl relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#052036] bg-[#052036] text-[10px] font-mono text-[#EAC157] uppercase tracking-widest">
            <span>✦ PRIVATE NATAL VAULT · AUTHENTICATION REQUIRED</span>
          </div>

          <h1 className="font-cormorant text-2xl md:text-3xl text-[#052036] leading-snug">
            Chart Access Protected
          </h1>

          <p className="text-xs text-[#052036]/70 leading-relaxed font-sans">
            Your full interactive birth chart, whole-sign planetary degrees, and aspect geometry cannot be accessed without an active session. Please sign in or complete onboarding to unlock your wheel.
          </p>

          <div className="pt-2 flex flex-col gap-3 font-sans">
            <button
              onClick={() => onNavigate("login")}
              className="w-full py-3.5 bg-[#EAC157] text-[#052036] text-xs font-semibold uppercase tracking-widest hover:bg-[#d9b048] transition-colors rounded-full cursor-pointer shadow-lg"
            >
              Sign In to View Chart →
            </button>
            <button
              onClick={() => onNavigate("onboarding")}
              className="w-full py-3.5 border border-[rgba(234,193,87,0.4)] text-[#052036] text-xs uppercase tracking-widest hover:border-[#052036] transition-colors rounded-full cursor-pointer"
            >
              New Seeker? Begin Onboarding →
            </button>
            <button
              onClick={() => onNavigate("home")}
              className="text-xs text-[#052036]/70 hover:text-[#052036] tracking-wider pt-1 transition-colors cursor-pointer"
            >
              ← Return to Salon Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Scroll to chart container and expand planet if highlightedPlanet is set
  useEffect(() => {
    if (highlightedPlanet) {
      setExpandedPlanet(highlightedPlanet);
      const el = document.getElementById("birth-chart-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightedPlanet]);

  const placements = user.placements && user.placements.length > 0 ? user.placements : [
    { planet: "Sun", sign: "Leo", degrees: 15, house: 10, meaning: "Your core identity shines through public life and creative leadership." },
    { planet: "Moon", sign: "Taurus", degrees: 8, house: 4, meaning: "Emotional security comes through stability, comfort, and rootedness." },
    { planet: "Mercury", sign: "Leo", degrees: 28, house: 10, meaning: "You communicate with presence, warmth, and natural authority." },
    { planet: "Venus", sign: "Cancer", degrees: 5, house: 9, meaning: "Love and beauty are tied to philosophy, travel, and emotional depth." },
    { planet: "Mars", sign: "Sagittarius", degrees: 22, house: 1, meaning: "You act with directness and philosophical purpose. Freedom fuels your drive." },
    { planet: "Jupiter", sign: "Aquarius", degrees: 3, house: 3, meaning: "Your growth comes through ideas, community, and intellectual exploration." },
    { planet: "Saturn", sign: "Libra", degrees: 18, house: 12, meaning: "Discipline and structure meet hidden realms. Lessons come through solitude." },
  ];

  const aspects = user.aspects && user.aspects.length > 0 ? user.aspects : [
    { planet1: "Sun", planet2: "Moon", type: "Trine" as const, influence: "Harmonious" as const, interpretation: "Your conscious self and emotional nature align naturally. Others experience you as integrated and grounded." },
    { planet1: "Mercury", planet2: "Sun", type: "Conjunction" as const, influence: "Intensifying" as const, interpretation: "Mind and identity fuse — your intellect IS your self-expression. You think through doing and speak with conviction." },
    { planet1: "Venus", planet2: "Saturn", type: "Square" as const, influence: "Challenging" as const, interpretation: "Tension between love and discipline. Relationships require work and may feel constrained before they feel freeing." },
    { planet1: "Mars", planet2: "Jupiter", type: "Sextile" as const, influence: "Supportive" as const, interpretation: "Your drive and your philosophy work together. Action taken from a place of meaning tends to find success." },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#052036] font-inter">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 60% at 20% 50%, rgba(234,193,87,0.06) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-6 pb-12 font-sans">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <img 
              src="/stickers/cosmic-orbit-hand.png" 
              alt="Cosmic Wheel" 
              className="w-14 h-14 md:w-16 md:h-16 object-contain filter drop-shadow-sm shrink-0" 
              onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
            />
            <div>
              <p className="text-xs text-[#8C6B1B] tracking-widest uppercase mb-1 font-mono font-semibold">Natal Architecture · Whole-Sign Sky</p>
              <h1 className="font-cormorant text-3xl md:text-4xl font-normal text-[#052036]">{user.name}'s Chart</h1>
              <p className="text-xs text-[#052036]/70 mt-1 font-mono">{user.birthDate} · {user.birthTime} · {user.birthLocation}</p>
            </div>
          </div>
          <button onClick={() => onNavigate("reading")}
            className="px-6 py-2.5 bg-[#EAC157] text-[#052036] text-sm font-semibold hover:bg-[#d9b048] transition-colors rounded-full cursor-pointer shadow-md shrink-0 self-start sm:self-auto">
            Read my chart →
          </button>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Chart */}
          <div id="birth-chart-container" className="flex flex-col items-center">
            <BirthChart
              size={440}
              animated={true}
              placements={user.placements}
              aspects={user.aspects}
              highlightedPlanet={highlightedPlanet}
              onSelectPlanet={(planet) => {
                setHighlightedPlanet(planet);
                setExpandedPlanet(planet);
              }}
            />

            {/* Key placements row with Stickers */}
            <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Sun", value: user.sunSign, sign: user.sunSign },
                { label: "Moon", value: user.moonSign, sign: user.moonSign },
                { label: "Rising", value: user.risingSign, sign: user.risingSign },
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const target = p.label === "Sun" ? "Sun" : p.label === "Moon" ? "Moon" : "Ascendant";
                    setHighlightedPlanet(target);
                    setExpandedPlanet(target);
                  }}
                  className={`border p-3 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs ${
                    highlightedPlanet?.toLowerCase() === p.label.toLowerCase()
                      ? "border-[#052036] bg-[#FAF7F2] ring-1 ring-[#052036]/20"
                      : "border-[#052036]/10 bg-white hover:border-[#8C6B1B]/40 hover:bg-[#FAF7F2]/50"
                  }`}>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6B1B] font-semibold block">{p.label} Sign</span>
                    <p className="text-base font-cormorant font-semibold text-[#052036] leading-snug">{p.value}</p>
                  </div>
                  <img
                    src={"/stickers/zodiac/" + (p.sign || "aries").toLowerCase() + ".png"}
                    alt={p.value}
                    className="w-10 h-10 object-contain shrink-0"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div>
            {/* Tabs */}
            <div className="flex gap-0 border-b border-[#052036]/10 mb-6">
              {TABS.map((tab, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className={`px-4 py-2.5 text-sm transition-colors relative cursor-pointer font-sans ${
                    activeTab === i
                      ? "text-[#EAC157] font-semibold"
                      : "text-[#052036]/70 hover:text-[#052036]"
                  }`}>
                  {tab}
                  {activeTab === i && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EAC157]"/>
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono pb-2 border-b border-[rgba(234,193,87,0.15)]">
                  <span className="text-[#052036]/70">FREE: Spatial Coordinates</span>
                  <span className="text-[#EAC157] font-semibold">PAID: Psychological Synthesis</span>
                </div>
                {placements.map((planet) => {
                  const iconRenderer = PLANET_ICON_MAP[planet.planet] || ((p: any) => <SunSymbol {...p} />);
                  const isHighlighted = highlightedPlanet?.toLowerCase() === planet.planet.toLowerCase();
                  const isExpanded = expandedPlanet === planet.planet;
                  return (
                    <div key={planet.planet} className="border border-[#052036]/10 bg-white rounded-xl overflow-hidden transition-colors">
                      <button
                        onClick={() => {
                          const next = isExpanded ? null : planet.planet;
                          setExpandedPlanet(next);
                          setHighlightedPlanet(next);
                        }}
                        className={`w-full flex items-center gap-4 py-3.5 px-4 transition-colors text-left cursor-pointer ${
                          isHighlighted ? "bg-[#FAF7F2] border-l-2 border-[#052036]" : "hover:bg-[#FAF7F2]"
                        }`}>
                        <div className="shrink-0">{iconRenderer({ size: 18 })}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm font-cormorant text-[#052036]">{planet.planet}</span>
                            <span className="font-mono text-xs text-[#EAC157]">{planet.sign} {Math.round(planet.degrees % 30)}°</span>
                          </div>
                          <p className="text-xs text-[#052036]/70 mt-0.5">{planet.house}th House · {HOUSE_LIFE_AREAS[planet.house]?.domainLabel || "Life Area"}</p>
                        </div>
                        <span className={`text-[#052036]/70 text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-[#052036]/8 bg-[#FAF7F2] space-y-3">
                          {/* Free Layer */}
                          <div>
                            <span className="text-[10px] font-mono text-[#052036]/70 uppercase block">
                              Free Discovery · Placement Location
                            </span>
                            <p className="text-xs text-[#052036] leading-relaxed mt-0.5">
                              {planet.planet} sits in {planet.sign} in your {planet.house}th House. {planet.meaning}
                            </p>
                          </div>

                          {/* Paid Deep Layer */}
                          <div className="p-4 border border-[#052036]/12 bg-[#FAF7F2] rounded-lg space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[10px] font-mono text-[#EAC157] uppercase font-semibold break-words">
                                ✦ Deep Psychological Synthesis (Planet + Sign + House)
                              </span>
                              <span className="text-[9px] font-mono px-2 py-0.5 bg-[rgba(234,193,87,0.2)] text-[#EAC157] rounded-full font-semibold shrink-0">
                                AI SYNTHESIS
                              </span>
                            </div>
                            <p className="text-xs text-[#052036]/70 leading-relaxed">
                              This exact combination explains why you react this way under pressure: your {planet.planet} instinct filters through {planet.sign}'s defense mechanisms inside your {planet.house}th House realm. It triggers your overthinking and dictates where you hold an unspoken soft corner.
                            </p>

                            {/* 3 Core Psychological Dimensions */}
                            <div className="grid sm:grid-cols-3 gap-2.5 pt-1">
                              <div className="border border-[#052036]/10 bg-white p-3 rounded-lg shadow-2xs">
                                <span className="text-[10px] font-mono text-[#8C6B1B] uppercase block font-semibold">
                                  Triggers & Reactions
                                </span>
                                <p className="text-[11px] text-[#052036]/80 mt-1 leading-snug">
                                  Why you detach, step back into silence, and what makes you feel overwhelmed or defensive.
                                </p>
                              </div>
                              <div className="border border-[#052036]/10 bg-white p-3 rounded-lg shadow-2xs">
                                <span className="text-[10px] font-mono text-[#8C6B1B] uppercase block font-semibold">
                                  Soft Corners & Heartbreak
                                </span>
                                <p className="text-[11px] text-[#052036]/80 mt-1 leading-snug">
                                  Why you still have feelings despite betrayal, and what makes you suppress yourself and cry.
                                </p>
                              </div>
                              <div className="border border-[#052036]/10 bg-white p-3 rounded-lg shadow-2xs">
                                <span className="text-[10px] font-mono text-[#8C6B1B] uppercase block font-semibold">
                                  What Makes You Shine
                                </span>
                                <p className="text-[11px] text-[#052036]/80 mt-1 leading-snug">
                                  Breaking free from your comfort zone trap into undeniable authenticity and magnetic power.
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
                              <button
                                onClick={() => {
                                  localStorage.setItem(
                                    "astrofindings_pending_inquiry",
                                    `Examine my ${planet.planet} in ${planet.sign} in House ${planet.house}: Why do I react this way under stress, what triggers make me suppress myself or cry, why do I hold a soft corner, and what makes me shine?`
                                  );
                                  onNavigate("askai");
                                }}
                                className="text-xs text-[#EAC157] hover:underline font-mono cursor-pointer"
                              >
                                Ask AstroFindings on {planet.planet} in {planet.sign} (House {planet.house}) →
                              </button>
                              <button
                                onClick={() => navigateWithHighlight("learn", planet.planet)}
                                className="text-xs text-[#052036]/70 hover:text-[#052036] cursor-pointer"
                              >
                                Learn more about {planet.planet} →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-4">
                {aspects.map((aspect, i) => (
                  <div key={i} className="border-b border-[#052036]/10 pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                        aspect.influence === "Harmonious" ? "bg-[rgba(100,180,100,0.15)] text-[rgba(140,220,140,0.95)]" :
                        aspect.influence === "Challenging" ? "bg-[rgba(220,100,80,0.15)] text-[rgba(240,150,130,0.95)]" :
                        aspect.influence === "Intensifying" ? "bg-[rgba(234,193,87,0.2)] text-[#EAC157]" :
                        "bg-[rgba(100,140,220,0.15)] text-[rgba(150,180,240,0.95)]"
                      }`}>{aspect.type}</span>
                      <span className="text-sm font-medium text-[#052036]">{aspect.planet1} {aspect.type.toLowerCase()} {aspect.planet2}</span>
                    </div>
                    <p className="text-sm text-[#052036]/70 leading-relaxed">{aspect.interpretation || "A key planetary dialogue shaping your temperament."}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const houseNum = i + 1;
                  const houseMeta = HOUSE_LIFE_AREAS[houseNum];
                  const label = houseMeta ? houseMeta.domainLabel : `House ${houseNum}`;
                  const subtitle = houseMeta ? houseMeta.simpleTitle : "Life domain";
                  const matchingPlacement = placements.find((p) => p.house === houseNum);
                  return (
                    <div key={i} className="flex items-start gap-4 py-2.5 border-b border-[rgba(234,193,87,0.08)]">
                      <span className="font-mono text-xs text-[#052036]/70 w-6 shrink-0 mt-0.5">{houseNum}</span>
                      <div className="flex-1">
                        <p className="text-sm text-[#052036]">
                          {label}
                        </p>
                        <p className="text-xs text-[#052036]/70 mt-0.5">
                          {matchingPlacement ? `${matchingPlacement.planet} in ${matchingPlacement.sign}` : subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-5">
                <p className="text-sm text-[#052036]/85 leading-relaxed">
                  Your chart is anchored by a <strong className="text-[#052036] font-bold">{user.sunSign} Sun</strong>, illuminating your conscious creative drive and core vitality.
                </p>
                <p className="text-sm text-[#052036]/85 leading-relaxed">
                  With your <strong className="text-[#052036] font-bold">{user.moonSign} Moon</strong>, your emotional foundation requires genuine safety, steadiness, and authentic expression to feel at peace.
                </p>
                <p className="text-sm text-[#052036]/85 leading-relaxed">
                  Your <strong className="text-[#052036] font-bold">{user.risingSign} Ascendant</strong> shapes how you first meet the world — offering a perceptive and protective presence that guards your inner sanctuary.
                </p>
                <button
                  onClick={() => onNavigate("reading")}
                  className="mt-2 px-6 py-3.5 bg-[#EAC157] text-[#052036] text-sm font-semibold hover:bg-[#d9b048] transition-colors rounded-full w-full cursor-pointer shadow-lg"
                >
                  Read the full interpretation →
                </button>
              </div>
            )}
            <div className="mt-8 border border-[#052036]/12 bg-white p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[rgba(234,193,87,0.15)] pb-3">
                <span className="text-xs font-mono uppercase text-[#EAC157] tracking-wider font-semibold">
                  ✦ Deep Psychological Chart Inquiry
                </span>
                <span className="text-[10px] font-mono text-[#052036]/70">
                  Grounded in Whole-Sign Ephemeris
                </span>
              </div>
              <p className="text-xs text-[#052036]/70 leading-relaxed">
                Tap an unspoken inquiry below or ask your own question to understand why you react this way through your natal placements:
              </p>

              {/* Psychological Chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Why do I detach and step back into silence?",
                  "What triggers my overthinking and anxiety?",
                  "Why do I still hold a soft corner for those who hurt me?",
                  "What makes me suppress myself, and what makes me shine?",
                  "What triggers make me cry, and what is my comfort zone?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setPsychQuestion(q);
                      handleAskPsychAI(q);
                    }}
                    className="text-[11px] px-3 py-1.5 border border-[#052036]/10 bg-[#FAF9F6] text-[#052036] font-inter hover:border-[#052036] hover:bg-[rgba(234,193,87,0.08)] rounded-full transition-colors text-left cursor-pointer"
                  >
                    ✦ {q}
                  </button>
                ))}
              </div>

              {/* Input row */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="text"
                  value={psychQuestion}
                  onChange={(e) => setPsychQuestion(e.target.value)}
                  placeholder="Ask why you react this way, or what triggers your heart..."
                  className="flex-1 min-w-0 bg-[#052036] border border-[#052036]/12 rounded-full px-4 py-2.5 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#052036] placeholder:text-[#052036]/70/60"
                />
                <button
                  disabled={isAskingAI || !psychQuestion.trim()}
                  onClick={() => handleAskPsychAI()}
                  className="px-5 py-2.5 bg-[#EAC157] text-[#052036] rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap disabled:opacity-50 hover:bg-[#d9b048] transition-colors shadow-md shrink-0 self-start sm:self-auto"
                >
                  {isAskingAI ? "Consulting..." : "Send Inquiry →"}
                </button>
              </div>

              {/* AI Response Display */}
              {aiAnswer && (
                <div className="mt-4 p-4 border border-[#052036] bg-[#FAF7F2] rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[#052036]/10 pb-1.5">
                    <span className="text-[11px] font-mono text-[#EAC157] uppercase font-semibold">
                      ✦ Astrological Mirror ({aiAnswer.category})
                    </span>
                    <button
                      onClick={() => setAiAnswer(null)}
                      className="text-[10px] text-[#052036]/70 hover:text-[#052036] cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>
                  <p className="text-xs text-[#052036] leading-relaxed whitespace-pre-line font-sans">
                    {aiAnswer.text}
                  </p>
                  {aiAnswer.consultedPlanets && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {aiAnswer.consultedPlanets.map((p, idx) => (
                        <span key={idx} className="text-[9px] font-mono px-2 py-0.5 bg-[rgba(234,193,87,0.15)] text-[#EAC157] rounded-full">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
