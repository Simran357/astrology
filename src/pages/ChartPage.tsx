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
import { askAstrologyConsultant, AIResponse } from "../services/aiAstrologyService";

interface ChartPageProps {
  onNavigate: (page: string) => void;
}

const TABS = ["Placements", "Aspects", "Houses", "Overview"];

const PLANET_ICON_MAP: Record<string, (props: { size?: number; className?: string }) => React.ReactNode> = {
  Sun: (p) => <SunSymbol size={p.size || 18} className={p.className || "text-[#f0c870]"} />,
  Moon: (p) => <MoonSymbol size={p.size || 18} className={p.className || "text-[#bfb7aa]"} />,
  Mercury: (p) => <MercurySymbol size={p.size || 18} className={p.className || "text-[#a0c4ff]"} />,
  Venus: (p) => <VenusSymbol size={p.size || 18} className={p.className || "text-[#f4acb7]"} />,
  Mars: (p) => <MarsSymbol size={p.size || 18} className={p.className || "text-[#e07070]"} />,
  Jupiter: (p) => <JupiterSymbol size={p.size || 18} className={p.className || "text-[#f0c060]"} />,
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
      const res = await askAstrologyConsultant(user, liveTransits, text);
      setAiAnswer(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAskingAI(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0e0a17] text-[#eee5d3] flex flex-col items-center justify-center px-6 py-16 selection:bg-[#ee5d34] selection:text-[#0e0a17]">
        <div className="max-w-md w-full border border-[rgba(238,93,52,0.3)] bg-[rgba(31,24,48,0.9)] p-8 rounded-sm text-center space-y-6 shadow-2xl relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-dashed border-[#ee5d34] bg-[#171126] text-[10px] font-mono text-[#ee5d34] uppercase tracking-widest">
            <span>✦ PRIVATE NATAL VAULT · AUTHENTICATION REQUIRED</span>
          </div>

          <h1 className="font-serif text-2xl md:text-3xl text-[#eee5d3] leading-snug">
            Chart Access Protected
          </h1>

          <p className="text-xs text-[#bfb7aa] leading-relaxed">
            Your full interactive birth chart, whole-sign planetary degrees, and aspect geometry cannot be accessed without an active session. Please sign in or complete onboarding to unlock your wheel.
          </p>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => onNavigate("login")}
              className="w-full py-3.5 bg-[#ee5d34] text-[#0e0a17] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#f58a6b] transition-colors rounded-sm cursor-pointer shadow-lg"
            >
              Sign In to View Chart →
            </button>
            <button
              onClick={() => onNavigate("onboarding")}
              className="w-full py-3.5 border border-[rgba(238,93,52,0.3)] text-[#eee5d3] text-xs font-mono uppercase tracking-widest hover:border-[#ee5d34] transition-colors rounded-sm cursor-pointer"
            >
              New Seeker? Begin Onboarding →
            </button>
            <button
              onClick={() => onNavigate("home")}
              className="text-xs text-[#bfb7aa] hover:text-[#eee5d3] font-mono tracking-wider pt-1 transition-colors cursor-pointer"
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
    <div className="min-h-screen bg-[#0e0a17] text-[#eee5d3]">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 60% at 20% 50%, rgba(60,30,130,0.06) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-2">Natal chart</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-[#eee5d3]">{user.name}'s chart</h1>
            <p className="text-sm text-[#bfb7aa] mt-2">{user.birthDate} · {user.birthTime} · {user.birthLocation}</p>
          </div>
          <button onClick={() => onNavigate("reading")}
            className="px-5 py-2.5 bg-[#ee5d34] text-[#0e0a17] text-sm font-medium hover:bg-[#f58a6b] transition-colors rounded-sm hidden md:block cursor-pointer">
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

            {/* Key placements row */}
            <div className="w-full mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Sun", value: user.sunSign, icon: <SunSymbol size={14} className="text-[#f0c870]"/> },
                { label: "Moon", value: user.moonSign, icon: <MoonSymbol size={14} className="text-[#bfb7aa]"/> },
                { label: "Rising", value: user.risingSign, icon: <ZodiacIcon sign={user.risingSign.toLowerCase()} size={14} className="text-[#ee5d34]"/> },
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const target = p.label === "Sun" ? "Sun" : p.label === "Moon" ? "Moon" : "Ascendant";
                    setHighlightedPlanet(target);
                    setExpandedPlanet(target);
                  }}
                  className={`border p-3 rounded-sm text-left transition-colors cursor-pointer ${
                    highlightedPlanet?.toLowerCase() === p.label.toLowerCase()
                      ? "border-[#ee5d34] bg-[rgba(238,93,52,0.12)]"
                      : "border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)]"
                  }`}>
                  <div className="flex items-center gap-1.5 mb-1.5">{p.icon}
                    <span className="text-xs text-[#bfb7aa]">{p.label}</span>
                  </div>
                  <p className="text-sm font-serif text-[#eee5d3]">{p.value}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div>
            {/* Tabs */}
            <div className="flex gap-0 border-b border-[rgba(238,93,52,0.12)] mb-6">
              {TABS.map((tab, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className={`px-4 py-2.5 text-sm transition-colors relative cursor-pointer ${
                    activeTab === i
                      ? "text-[#eee5d3]"
                      : "text-[#bfb7aa] hover:text-[#eee5d3]"
                  }`}>
                  {tab}
                  {activeTab === i && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-[#ee5d34]"/>
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono pb-2 border-b border-[rgba(238,93,52,0.12)]">
                  <span className="text-[#bfb7aa]">FREE: Spatial Coordinates</span>
                  <span className="text-[#ee5d34]">PAID: Psychological Synthesis</span>
                </div>
                {placements.map((planet) => {
                  const iconRenderer = PLANET_ICON_MAP[planet.planet] || ((p: any) => <SunSymbol {...p} />);
                  const isHighlighted = highlightedPlanet?.toLowerCase() === planet.planet.toLowerCase();
                  const isExpanded = expandedPlanet === planet.planet;
                  return (
                    <div key={planet.planet} className="border border-[rgba(238,93,52,0.1)] bg-[rgba(31,24,48,0.6)] rounded-sm overflow-hidden">
                      <button
                        onClick={() => {
                          const next = isExpanded ? null : planet.planet;
                          setExpandedPlanet(next);
                          setHighlightedPlanet(next);
                        }}
                        className={`w-full flex items-center gap-4 py-3 px-3 transition-colors text-left cursor-pointer ${
                          isHighlighted ? "bg-[rgba(238,93,52,0.1)] border-l-2 border-[#ee5d34]" : "hover:bg-[rgba(238,93,52,0.04)]"
                        }`}>
                        <div className="shrink-0">{iconRenderer({ size: 18 })}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm font-serif text-[#eee5d3]">{planet.planet}</span>
                            <span className="font-mono text-xs text-[#ee5d34]">{planet.sign} {Math.round(planet.degrees % 30)}°</span>
                          </div>
                          <p className="text-xs text-[#bfb7aa] mt-0.5">{planet.house}th House · {HOUSE_LIFE_AREAS[planet.house]?.domainLabel || "Life Area"}</p>
                        </div>
                        <span className={`text-[#bfb7aa] text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-[rgba(238,93,52,0.08)] bg-[rgba(20,15,35,0.6)] space-y-3">
                          {/* Free Layer */}
                          <div>
                            <span className="text-[10px] font-mono text-[#bfb7aa] uppercase block">
                              Free Discovery · Placement Location
                            </span>
                            <p className="text-xs text-[#eee5d3] leading-relaxed mt-0.5">
                              {planet.planet} sits in {planet.sign} in your {planet.house}th House. {planet.meaning}
                            </p>
                          </div>

                          {/* Paid Deep Layer */}
                          <div className="p-3 border border-[rgba(238,93,52,0.25)] bg-[rgba(238,93,52,0.06)] rounded-sm space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-[#ee5d34] uppercase font-semibold">
                                ✦ Deep Psychological Meaning (Planet + Sign + House)
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[rgba(238,93,52,0.2)] text-[#ee5d34] rounded-sm">
                                AI SYNTHESIS
                              </span>
                            </div>
                            <p className="text-xs text-[#bfb7aa] leading-relaxed">
                              This exact combination explains why you react this way under pressure: your {planet.planet} instinct filters through {planet.sign}'s defense mechanisms inside your {planet.house}th House realm. It triggers your overthinking and dictates where you hold an unspoken soft corner.
                            </p>
                            <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
                              <button
                                onClick={() => onNavigate("askai")}
                                className="text-xs text-[#ee5d34] hover:text-[#f58a6b] font-mono cursor-pointer"
                              >
                                Ask AI: "What does my {planet.planet} say about my triggers?" →
                              </button>
                              <button
                                onClick={() => navigateWithHighlight("learn", planet.planet)}
                                className="text-xs text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
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
                  <div key={i} className="border-b border-[rgba(238,93,52,0.08)] pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-sm font-mono ${
                        aspect.influence === "Harmonious" ? "bg-[rgba(100,180,100,0.12)] text-[rgba(140,200,140,0.9)]" :
                        aspect.influence === "Challenging" ? "bg-[rgba(220,100,80,0.12)] text-[rgba(220,140,120,0.9)]" :
                        aspect.influence === "Intensifying" ? "bg-[rgba(200,150,60,0.12)] text-[rgba(200,170,90,0.9)]" :
                        "bg-[rgba(100,140,220,0.12)] text-[rgba(140,170,220,0.9)]"
                      }`}>{aspect.type}</span>
                      <span className="text-sm text-[#eee5d3]">{aspect.planet1} {aspect.type.toLowerCase()} {aspect.planet2}</span>
                    </div>
                    <p className="text-sm text-[#bfb7aa] leading-relaxed">{aspect.interpretation || "A key planetary dialogue shaping your temperament."}</p>
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
                    <div key={i} className="flex items-start gap-4 py-2.5 border-b border-[rgba(238,93,52,0.06)]">
                      <span className="font-mono text-xs text-[#bfb7aa] w-6 shrink-0 mt-0.5">{houseNum}</span>
                      <div className="flex-1">
                        <p className="text-sm text-[#eee5d3]">
                          {label}
                        </p>
                        <p className="text-xs text-[#bfb7aa] mt-0.5">
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
                <p className="text-sm text-[#bfb7aa] leading-relaxed">
                  Your chart is anchored by a <strong className="text-[#eee5d3]">{user.sunSign} Sun</strong>, illuminating your conscious creative drive and core vitality.
                </p>
                <p className="text-sm text-[#bfb7aa] leading-relaxed">
                  With your <strong className="text-[#eee5d3]">{user.moonSign} Moon</strong>, your emotional foundation requires genuine safety, steadiness, and authentic expression to feel at peace.
                </p>
                <p className="text-sm text-[#bfb7aa] leading-relaxed">
                  Your <strong className="text-[#eee5d3]">{user.risingSign} Ascendant</strong> shapes how you first meet the world — offering a perceptive and protective presence that guards your inner sanctuary.
                </p>
                <button
                  onClick={() => onNavigate("reading")}
                  className="mt-2 px-6 py-3 bg-[#ee5d34] text-[#0e0a17] text-sm font-medium hover:bg-[#f58a6b] transition-colors rounded-sm w-full cursor-pointer"
                >
                  Read the full interpretation →
                </button>
              </div>
            )}
            <div className="mt-8 border border-[rgba(238,93,52,0.25)] bg-[rgba(31,24,48,0.85)] p-5 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(238,93,52,0.12)] pb-2">
                <span className="text-xs font-mono uppercase text-[#ee5d34] tracking-wider">
                  ✦ Deep Psychological Chart Inquiry
                </span>
                <span className="text-[10px] font-mono text-[#bfb7aa]">
                  Grounded in Whole-Sign Ephemeris
                </span>
              </div>
              <p className="text-xs text-[#bfb7aa] leading-relaxed">
                Tap an unspoken inquiry below or ask your own question to understand why you react this way through your natal placements:
              </p>

              {/* Psychological Chips */}
              <div className="flex flex-wrap gap-1.5">
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
                    className="text-[11px] px-2.5 py-1.5 border border-[rgba(238,93,52,0.15)] bg-[rgba(20,15,35,0.7)] text-[#eee5d3] hover:border-[#ee5d34] rounded-sm transition-colors text-left cursor-pointer"
                  >
                    ✦ {q}
                  </button>
                ))}
              </div>

              {/* Input row */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={psychQuestion}
                  onChange={(e) => setPsychQuestion(e.target.value)}
                  placeholder="Ask why you react this way, or what triggers your heart..."
                  className="flex-1 bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.25)] rounded-sm px-3 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
                />
                <button
                  disabled={isAskingAI || !psychQuestion.trim()}
                  onClick={() => handleAskPsychAI()}
                  className="button-primary cursor-pointer text-xs py-2 px-3 whitespace-nowrap disabled:opacity-50"
                >
                  {isAskingAI ? "Consulting..." : "Send Inquiry →"}
                </button>
              </div>

              {/* AI Response Display */}
              {aiAnswer && (
                <div className="mt-4 p-4 border border-[#ee5d34] bg-[rgba(20,15,35,0.9)] rounded-sm space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[rgba(238,93,52,0.15)] pb-1.5">
                    <span className="text-[11px] font-mono text-[#ee5d34] uppercase font-semibold">
                      ✦ Astrological Mirror ({aiAnswer.category})
                    </span>
                    <button
                      onClick={() => setAiAnswer(null)}
                      className="text-[10px] text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>
                  <p className="text-xs text-[#eee5d3] leading-relaxed whitespace-pre-line">
                    {aiAnswer.text}
                  </p>
                  {aiAnswer.consultedPlanets && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {aiAnswer.consultedPlanets.map((p, idx) => (
                        <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 bg-[rgba(238,93,52,0.12)] text-[#bfb7aa] rounded-sm">
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
