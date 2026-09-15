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
  const { user, highlightedPlanet, setHighlightedPlanet } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);

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
              <div className="space-y-1">
                {placements.map((planet) => {
                  const iconRenderer = PLANET_ICON_MAP[planet.planet] || ((p: any) => <SunSymbol {...p} />);
                  const isHighlighted = highlightedPlanet?.toLowerCase() === planet.planet.toLowerCase();
                  return (
                    <div key={planet.planet}>
                      <button
                        onClick={() => {
                          const next = expandedPlanet === planet.planet ? null : planet.planet;
                          setExpandedPlanet(next);
                          setHighlightedPlanet(next);
                        }}
                        className={`w-full flex items-center gap-4 py-3 px-3 transition-colors rounded-sm group text-left cursor-pointer ${
                          isHighlighted ? "bg-[rgba(238,93,52,0.1)] border-l-2 border-[#ee5d34]" : "hover:bg-[rgba(238,93,52,0.04)]"
                        }`}>
                        <div className="shrink-0">{iconRenderer({ size: 18 })}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm text-[#eee5d3]">{planet.planet}</span>
                            <span className="font-mono text-xs text-[#bfb7aa]">{planet.sign} {Math.round(planet.degrees % 30)}°</span>
                          </div>
                          <p className="text-xs text-[#bfb7aa] mt-0.5">{planet.house}th House</p>
                        </div>
                        <span className={`text-[#bfb7aa] text-xs transition-transform ${expandedPlanet === planet.planet ? "rotate-180" : ""}`}>▾</span>
                      </button>
                      {expandedPlanet === planet.planet && (
                        <div className="px-4 pb-3 ml-10">
                          <p className="text-sm text-[#bfb7aa] leading-relaxed">
                            {planet.meaning || `${planet.planet} in ${planet.sign} in your ${planet.house}th House.`}
                          </p>
                          <button onClick={() => onNavigate("reading")} className="mt-2 text-xs text-[#ee5d34] hover:text-[#f58a6b] transition-colors cursor-pointer">
                            Deep dive →
                          </button>
                        </div>
                      )}
                      <div className="h-px bg-[rgba(238,93,52,0.06)] mx-3"/>
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
                <button onClick={() => onNavigate("reading")}
                  className="mt-2 px-6 py-3 bg-[#ee5d34] text-[#0e0a17] text-sm font-medium hover:bg-[#f58a6b] transition-colors rounded-sm w-full cursor-pointer">
                  Read the full interpretation →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
