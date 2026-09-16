import { useState } from "react";
import {
  ZodiacIcon,
  SunSymbol,
  MoonSymbol,
  JupiterSymbol,
  SaturnSymbol,
  AquariusSymbol,
  TrineSymbol,
  CelestialRing,
} from "../components/icons/CelestialIcons";
import { useApp } from "../context/AppContext";
import { PLANETS_DATA } from "../data/planetsData";
import { ZODIAC_SIGNS_DATA } from "../data/zodiacData";
import { HOUSES_DATA } from "../data/housesData";
import { NUMEROLOGY_DATA, calculateLifePath } from "../data/numerologyData";

interface LearnPageProps {
  onNavigate: (page: string) => void;
}

type LibraryTab =
  | "basics"
  | "signs"
  | "planets"
  | "houses"
  | "placements"
  | "aspects"
  | "transits"
  | "tarot"
  | "numerology"
  | "palm";

const LIBRARY_TABS: { id: LibraryTab; label: string; icon: string }[] = [
  { id: "basics", label: "Astrology Basics", icon: "✦" },
  { id: "signs", label: "12 Zodiac Signs", icon: "♈" },
  { id: "planets", label: "Planetary Bodies", icon: "☉" },
  { id: "houses", label: "12 Houses", icon: "⌂" },
  { id: "placements", label: "Placements (P+S+H)", icon: "⚝" },
  { id: "aspects", label: "Aspects & Angles", icon: "△" },
  { id: "transits", label: "Shifts & Transits", icon: "☿" },
  { id: "tarot", label: "Tarot Library", icon: "🎴" },
  { id: "numerology", label: "Numerology", icon: "🔢" },
  { id: "palm", label: "Palm Lines", icon: "✋" },
];

export default function LearnPage({ onNavigate }: LearnPageProps) {
  const { user, navigateWithHighlight } = useApp();
  const [activeTab, setActiveTab] = useState<LibraryTab>("basics");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSignId, setSelectedSignId] = useState<string>("scorpio");
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("venus");
  const [selectedHouseNum, setSelectedHouseNum] = useState<number>(7);

  // Placement Formula Interactive State
  const [placementPlanet, setPlacementPlanet] = useState("Venus");
  const [placementSign, setPlacementSign] = useState("Aries");
  const [placementHouse, setPlacementHouse] = useState(7);

  const userLifePath = calculateLifePath(user.birthDate || "1994-08-09");

  const goToChartWithPlanet = (planet: string) => {
    navigateWithHighlight("chart", planet);
  };

  return (
    <div className="min-h-screen bg-[#0e0a17] text-[#eee5d3] selection:bg-[#ee5d34] selection:text-[#0e0a17]">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(50,30,100,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ee5d34] block mb-2">
            01 / Comprehensive Library
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-[#eee5d3] leading-tight">
            Learn astrology,<br />
            <em className="serif text-[#ee5d34]">understand yourself.</em>
          </h1>
          <p className="text-sm md:text-base text-[#bfb7aa] max-w-2xl mt-3 leading-relaxed">
            No jargon without emotional truth. Every concept connects back to your psyche:
            why you overthink, why you detach, what triggers your anxiety, and where you hold a soft corner.
          </p>
        </div>

        {/* Tab Navigation Scrollable Bar */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-thin border-b border-[rgba(238,93,52,0.15)]">
          {LIBRARY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery("");
                }}
                className={`px-4 py-2.5 rounded-sm text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[rgba(238,93,52,0.18)] border border-[#ee5d34] text-[#eee5d3] shadow-sm"
                    : "border border-[rgba(238,93,52,0.1)] text-[#bfb7aa] hover:border-[rgba(238,93,52,0.25)] hover:text-[#eee5d3]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ASTROLOGY BASICS                                                  */}
        {/* ========================================================================= */}
        {activeTab === "basics" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 rounded-sm space-y-4">
                <span className="text-[10px] font-mono text-[#ee5d34] uppercase tracking-wider block">
                  Foundational Primer
                </span>
                <h2 className="font-serif text-2xl text-[#eee5d3]">What is a Birth Chart?</h2>
                <p className="text-xs md:text-sm text-[#bfb7aa] leading-relaxed">
                  A birth chart (natal chart) is a snapshot of the exact sky at the second of your first breath.
                  It is not a prediction of fate; it is a psychological map of your instincts, emotional triggers,
                  and repeating mental habits.
                </p>
                <p className="text-xs text-[#bfb7aa] leading-relaxed">
                  When you know where the planets were positioned across the 12 signs and houses, you finally understand:
                  <strong> why you react this way</strong>, why certain relationships overwhelm you, and where your hidden comfort zone lies.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("chart")}
                    className="button-primary cursor-pointer text-xs py-2 px-4"
                  >
                    View Your Birth Chart Wheel →
                  </button>
                </div>
              </div>

              <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 rounded-sm space-y-4">
                <span className="text-[10px] font-mono text-[#ee5d34] uppercase tracking-wider block">
                  Exact Coordinates
                </span>
                <h2 className="font-serif text-2xl text-[#eee5d3]">Why Date, Time & Location Matter</h2>
                <p className="text-xs md:text-sm text-[#bfb7aa] leading-relaxed">
                  The Earth rotates 360 degrees every 24 hours. That means every two hours, a completely new zodiac sign
                  rises on the eastern horizon — changing your <strong>Rising Sign (Ascendant)</strong> and rotating every single house in your chart.
                </p>
                <p className="text-xs text-[#bfb7aa] leading-relaxed">
                  Without an exact birth time, you know your Sun sign, but you cannot pinpoint:
                  <em> why you detach under stress, what triggers your heartbreak, or what area of life makes you cry.</em>
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("onboarding")}
                    className="button-quiet cursor-pointer text-xs"
                  >
                    Update or verify your exact birth coordinates →
                  </button>
                </div>
              </div>
            </div>

            {/* Core Distinction Grid */}
            <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(20,15,35,0.8)] p-6 rounded-sm">
              <h3 className="font-serif text-xl text-[#eee5d3] mb-4">
                The Sacred Trinity: Planet, Sign & House
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="border border-[rgba(238,93,52,0.12)] p-4 rounded-sm bg-[rgba(31,24,48,0.5)]">
                  <span className="text-xs font-mono text-[#ee5d34] uppercase block mb-1">1. The Planet (WHAT)</span>
                  <h4 className="font-serif text-lg text-[#eee5d3]">The Psychological Actor</h4>
                  <p className="text-xs text-[#bfb7aa] mt-2 leading-relaxed">
                    Represents the urge inside you. Venus is how you love and feel hurt; Mars is what triggers your defensiveness; Mercury is how you overthink.
                  </p>
                </div>

                <div className="border border-[rgba(238,93,52,0.12)] p-4 rounded-sm bg-[rgba(31,24,48,0.5)]">
                  <span className="text-xs font-mono text-[#ee5d34] uppercase block mb-1">2. The Sign (HOW)</span>
                  <h4 className="font-serif text-lg text-[#eee5d3]">The Emotional Flavor</h4>
                  <p className="text-xs text-[#bfb7aa] mt-2 leading-relaxed">
                    Represents the style of expression. Aries reacts instantly; Scorpio protects a soft corner with silence; Taurus retreats into its comfort zone.
                  </p>
                </div>

                <div className="border border-[rgba(238,93,52,0.12)] p-4 rounded-sm bg-[rgba(31,24,48,0.5)]">
                  <span className="text-xs font-mono text-[#ee5d34] uppercase block mb-1">3. The House (WHERE)</span>
                  <h4 className="font-serif text-lg text-[#eee5d3]">The Life Arena</h4>
                  <p className="text-xs text-[#bfb7aa] mt-2 leading-relaxed">
                    Represents where that feeling plays out. 7th House is partnership & betrayal; 4th House is family roots; 10th House is vocation & shining.
                  </p>
                </div>
              </div>

              {/* Curiosity Hook */}
              <div className="mt-6 p-4 border border-[rgba(238,93,52,0.3)] bg-[rgba(238,93,52,0.06)] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base text-[#eee5d3]">
                    Ready to see your unique combination?
                  </h4>
                  <p className="text-xs text-[#bfb7aa]">
                    Your chart connects these three parts into a single personal diagnosis.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("chart")}
                  className="button-primary cursor-pointer text-xs whitespace-nowrap py-2 px-4"
                >
                  Decode My Placements →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: 12 ZODIAC SIGNS                                                   */}
        {/* ========================================================================= */}
        {activeTab === "signs" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Sign Selector Chips */}
            <div className="flex flex-wrap gap-2 pb-2">
              {ZODIAC_SIGNS_DATA.map((sign) => {
                const isSelected = selectedSignId === sign.id;
                return (
                  <button
                    key={sign.id}
                    onClick={() => setSelectedSignId(sign.id)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#ee5d34] text-[#0e0a17] font-medium"
                        : "border border-[rgba(238,93,52,0.15)] bg-[rgba(31,24,48,0.6)] text-[#eee5d3] hover:border-[#ee5d34]"
                    }`}
                  >
                    <span>{sign.symbol}</span>
                    <span>{sign.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Sign Detail Card */}
            {(() => {
              const sign =
                ZODIAC_SIGNS_DATA.find((s) => s.id === selectedSignId) ||
                ZODIAC_SIGNS_DATA[0];
              const isUserSun = user.sunSign.toLowerCase() === sign.name.toLowerCase();
              const isUserMoon = user.moonSign.toLowerCase() === sign.name.toLowerCase();

              return (
                <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(238,93,52,0.12)] pb-4 gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl text-[#ee5d34]">{sign.symbol}</span>
                        <h2 className="font-serif text-3xl text-[#eee5d3]">{sign.name}</h2>
                        {(isUserSun || isUserMoon) && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[rgba(238,93,52,0.18)] text-[#ee5d34] rounded-sm uppercase">
                            {isUserSun ? "Your Sun Sign" : "Your Moon Sign"}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#bfb7aa] mt-1 block">
                        {sign.element} Element · {sign.modality} Modality · Ruled by {sign.rulingPlanet} · {sign.dates}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate("chart")}
                      className="button-primary cursor-pointer text-xs py-1.5 px-3 self-start sm:self-auto"
                    >
                      Where is {sign.name} in MY chart? →
                    </button>
                  </div>

                  <p className="text-sm text-[#eee5d3] leading-relaxed">{sign.overview}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          ⚡ Psychological Triggers & Reaction Pattern
                        </span>
                        <p className="text-xs text-[#bfb7aa] leading-relaxed">
                          {sign.emotionalTendencies ||
                            "When feeling hurt or overwhelmed, this sign instinctively retreats or reacts strongly before finding stillness."}
                        </p>
                      </div>

                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          💔 Love, Soft Corners & Betrayal
                        </span>
                        <p className="text-xs text-[#bfb7aa] leading-relaxed">{sign.love}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          👑 What Makes You Shine & Career Instinct
                        </span>
                        <p className="text-xs text-[#bfb7aa] leading-relaxed">{sign.career}</p>
                      </div>

                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          💬 Communication & Defense Style
                        </span>
                        <p className="text-xs text-[#bfb7aa] leading-relaxed">{sign.communication}</p>
                      </div>
                    </div>
                  </div>

                  {/* Curiosity Loop Footer */}
                  <div className="pt-4 border-t border-[rgba(238,93,52,0.1)] flex items-center justify-between flex-wrap gap-3">
                    <p className="text-xs text-[#bfb7aa]">
                      Does {sign.name} rule your Love (Venus), Mind (Mercury), or Emotions (Moon)?
                    </p>
                    <button
                      onClick={() => onNavigate("chart")}
                      className="text-xs text-[#ee5d34] hover:text-[#f58a6b] font-mono cursor-pointer"
                    >
                      See {sign.name} in My Whole-Sign Chart →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PLANETS & BODIES                                                  */}
        {/* ========================================================================= */}
        {activeTab === "planets" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap gap-2 pb-2">
              {PLANETS_DATA.map((planet) => {
                const isSelected = selectedPlanetId === planet.id;
                return (
                  <button
                    key={planet.id}
                    onClick={() => setSelectedPlanetId(planet.id)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#ee5d34] text-[#0e0a17] font-medium"
                        : "border border-[rgba(238,93,52,0.15)] bg-[rgba(31,24,48,0.6)] text-[#eee5d3] hover:border-[#ee5d34]"
                    }`}
                  >
                    <span>{planet.symbol}</span>
                    <span>{planet.name}</span>
                  </button>
                );
              })}
            </div>

            {(() => {
              const planet =
                PLANETS_DATA.find((p) => p.id === selectedPlanetId) || PLANETS_DATA[0];
              const userPlacement = user.placements.find(
                (pl) => pl.planet.toLowerCase() === planet.name.toLowerCase()
              );

              return (
                <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(238,93,52,0.12)] pb-4 gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl text-[#ee5d34]">{planet.symbol}</span>
                        <h2 className="font-serif text-3xl text-[#eee5d3]">{planet.name}</h2>
                        {userPlacement && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[rgba(238,93,52,0.18)] text-[#ee5d34] rounded-sm">
                            In Your Chart: {userPlacement.sign} (H{userPlacement.house})
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#bfb7aa] mt-1 block">
                        {planet.archetype} · Ruled by {planet.rulingSign} · {planet.represents}
                      </span>
                    </div>

                    <button
                      onClick={() => goToChartWithPlanet(planet.name)}
                      className="button-primary cursor-pointer text-xs py-1.5 px-3 self-start sm:self-auto"
                    >
                      Where is {planet.name} in MY chart? →
                    </button>
                  </div>

                  <p className="text-sm text-[#eee5d3] leading-relaxed">{planet.meaning}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          🧠 Emotional Impact: Overthinking & Detachment
                        </span>
                        <p className="text-xs text-[#bfb7aa] leading-relaxed">{planet.emotionalRole}</p>
                      </div>

                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          💔 Relational Soft Corners & Vulnerability
                        </span>
                        <p className="text-xs text-[#bfb7aa] leading-relaxed">{planet.loveRole}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          🛡️ Difficult Expression (Why You React This Way)
                        </span>
                        <p className="text-xs text-[#bfb7aa] leading-relaxed">{planet.difficultExpression}</p>
                      </div>

                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          ✨ Sovereignty: How This Planet Makes You Shine
                        </span>
                        <p className="text-xs text-[#bfb7aa] leading-relaxed">{planet.positiveExpression}</p>
                      </div>
                    </div>
                  </div>

                  {/* Curiosity Loop */}
                  <div className="pt-4 border-t border-[rgba(238,93,52,0.1)] flex items-center justify-between flex-wrap gap-3">
                    <p className="text-xs text-[#bfb7aa]">
                      The general meaning of {planet.name} is free. Discover what it means specifically in your birth house:
                    </p>
                    <button
                      onClick={() => goToChartWithPlanet(planet.name)}
                      className="text-xs text-[#ee5d34] hover:text-[#f58a6b] font-mono cursor-pointer"
                    >
                      Inspect {planet.name} in My Chart →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: 12 HOUSES                                                         */}
        {/* ========================================================================= */}
        {activeTab === "houses" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap gap-2 pb-2">
              {HOUSES_DATA.map((house) => {
                const isSelected = selectedHouseNum === house.number;
                return (
                  <button
                    key={house.number}
                    onClick={() => setSelectedHouseNum(house.number)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#ee5d34] text-[#0e0a17] font-medium"
                        : "border border-[rgba(238,93,52,0.15)] bg-[rgba(31,24,48,0.6)] text-[#eee5d3] hover:border-[#ee5d34]"
                    }`}
                  >
                    House {house.number}
                  </button>
                );
              })}
            </div>

            {(() => {
              const house =
                HOUSES_DATA.find((h) => h.number === selectedHouseNum) || HOUSES_DATA[0];
              const planetsInThisHouse = user.placements.filter(
                (p) => p.house === house.number
              );

              return (
                <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(238,93,52,0.12)] pb-4 gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-serif text-3xl text-[#eee5d3]">
                          {house.number}
                          {house.number === 1
                            ? "st"
                            : house.number === 2
                            ? "nd"
                            : house.number === 3
                            ? "rd"
                            : "th"}{" "}
                          House
                        </h2>
                        <span className="text-xs font-mono text-[#ee5d34]">
                          {house.traditionalName}
                        </span>
                      </div>
                      <span className="text-xs text-[#bfb7aa] mt-1 block">
                        Archetype: {house.archetype} · Naturally aligned with {house.naturalSign}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate("chart")}
                      className="button-primary cursor-pointer text-xs py-1.5 px-3 self-start sm:self-auto"
                    >
                      See what is in your {house.number}th House →
                    </button>
                  </div>

                  <p className="text-sm text-[#eee5d3] leading-relaxed">{house.overview}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)] space-y-2">
                      <span className="text-xs font-mono uppercase text-[#ee5d34] block">
                        Psychological & Inner Meaning
                      </span>
                      <p className="text-xs text-[#bfb7aa] leading-relaxed">
                        {house.psychologicalMeaning}
                      </p>
                    </div>

                    <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)] space-y-2">
                      <span className="text-xs font-mono uppercase text-[#ee5d34] block">
                        What a Planet in This House Means
                      </span>
                      <p className="text-xs text-[#bfb7aa] leading-relaxed">
                        {house.planetsInHouseMeaning}
                      </p>
                    </div>
                  </div>

                  {planetsInThisHouse.length > 0 && (
                    <div className="p-4 border border-[rgba(238,93,52,0.25)] bg-[rgba(238,93,52,0.08)] rounded-sm">
                      <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                        ✦ In Your Personal Birth Sky
                      </span>
                      <p className="text-xs text-[#eee5d3]">
                        You have{" "}
                        <strong>
                          {planetsInThisHouse.map((p) => `${p.planet} in ${p.sign}`).join(", ")}
                        </strong>{" "}
                        occupying this house.
                      </p>
                    </div>
                  )}

                  {/* Curiosity Loop */}
                  <div className="pt-4 border-t border-[rgba(238,93,52,0.1)] flex items-center justify-between flex-wrap gap-3">
                    <p className="text-xs text-[#bfb7aa]">
                      Empty house or loaded house? Discover the secret ruler of your {house.number}th house:
                    </p>
                    <button
                      onClick={() => onNavigate("chart")}
                      className="text-xs text-[#ee5d34] hover:text-[#f58a6b] font-mono cursor-pointer"
                    >
                      Open House {house.number} in Chart →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: PLACEMENTS FORMULA (PLANET + SIGN + HOUSE)                         */}
        {/* ========================================================================= */}
        {activeTab === "placements" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] tracking-wider block mb-1">
                  The Core Formula
                </span>
                <h2 className="font-serif text-3xl text-[#eee5d3]">
                  Planet + Sign + House = Your Personal Truth
                </h2>
                <p className="text-xs md:text-sm text-[#bfb7aa] mt-2 max-w-2xl leading-relaxed">
                  General horoscopes fail because they isolate only one variable. True astrology synthesizes
                  the <strong>Actor (Planet)</strong> with the <strong>Costume (Sign)</strong> inside the <strong>Stage (House)</strong>.
                </p>
              </div>

              {/* Interactive Formula Playground */}
              <div className="p-6 border border-[rgba(238,93,52,0.15)] bg-[rgba(20,15,35,0.7)] rounded-sm space-y-5">
                <span className="text-xs font-mono uppercase text-[#ee5d34] block">
                  Interactive Formula Simulator
                </span>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#bfb7aa] uppercase block mb-1">Planet</label>
                    <select
                      value={placementPlanet}
                      onChange={(e) => setPlacementPlanet(e.target.value)}
                      className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
                    >
                      {PLANETS_DATA.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name} ({p.archetype})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#bfb7aa] uppercase block mb-1">Zodiac Sign</label>
                    <select
                      value={placementSign}
                      onChange={(e) => setPlacementSign(e.target.value)}
                      className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
                    >
                      {ZODIAC_SIGNS_DATA.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} ({s.element})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#bfb7aa] uppercase block mb-1">House (Life Realm)</label>
                    <select
                      value={placementHouse}
                      onChange={(e) => setPlacementHouse(Number(e.target.value))}
                      className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
                    >
                      {HOUSES_DATA.map((h) => (
                        <option key={h.number} value={h.number}>
                          House {h.number}: {h.archetype}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Synthesized Output */}
                <div className="p-4 border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.9)] rounded-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base text-[#ee5d34]">⚝</span>
                    <h4 className="font-serif text-lg text-[#eee5d3]">
                      Synthesis: {placementPlanet} in {placementSign} in House {placementHouse}
                    </h4>
                  </div>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    How you express your {placementPlanet.toLowerCase()} needs is shaped by the instinct of {placementSign},
                    and plays out most acutely in the realm of your {placementHouse}th House.
                    This configuration directly shapes whether you detach under stress, how you handle heartbreak,
                    and what triggers make you withdraw into silence.
                  </p>
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-mono text-[#ee5d34]">
                      Free: See where it sits in your chart · Paid: Deep psychological AI interpretation
                    </span>
                    <button
                      onClick={() => onNavigate("chart")}
                      className="button-primary cursor-pointer text-xs py-1.5 px-3"
                    >
                      Check this in My Chart →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: ASPECTS (HOW PLANETS INTERACT)                                     */}
        {/* ========================================================================= */}
        {activeTab === "aspects" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] tracking-wider block mb-1">
                  Planetary Conversations
                </span>
                <h2 className="font-serif text-3xl text-[#eee5d3]">
                  How Do Planets Interact With Each Other?
                </h2>
                <p className="text-xs md:text-sm text-[#bfb7aa] mt-2 max-w-2xl leading-relaxed">
                  Planets do not operate in isolation. They look at each other across geometric angles called <strong>Aspects</strong>.
                  Some aspects flow smoothly; others create intense internal friction that causes overthinking and emotional overwhelm.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "Conjunction (0°)",
                    glyph: "☌",
                    tone: "Fused Energy",
                    desc: "Two planets occupy the exact same degree. Their desires melt together into an intense, non-negotiable drive.",
                    psyche: "Why you can't separate your heart from your mind.",
                  },
                  {
                    name: "Opposition (180°)",
                    glyph: "☍",
                    tone: "The Tug-of-War",
                    desc: "Planets sit directly across from each other. They create a polarizing see-saw between inner needs and outer relationships.",
                    psyche: "Why you feel torn between deep closeness and total detachment.",
                  },
                  {
                    name: "Square (90°)",
                    glyph: "□",
                    tone: "Sacred Friction",
                    desc: "Planets collide at a harsh 90-degree corner. This causes internal tension that forces you to take action or break an old habit.",
                    psyche: "What triggers your anxiety and forces you out of your comfort zone.",
                  },
                  {
                    name: "Trine (120°)",
                    glyph: "△",
                    tone: "Effortless Grace",
                    desc: "Planets connect in the exact same element. Natural talents, instinctive ease, and areas where life flows without resistance.",
                    psyche: "Where your genuine peace and natural gifts live.",
                  },
                  {
                    name: "Sextile (60°)",
                    glyph: "⚹",
                    tone: "Open Opportunity",
                    desc: "A cooperative angle that presents doors you can choose to walk through with a bit of conscious effort.",
                    psyche: "Your capacity to build new habits and recover after heartbreak.",
                  },
                ].map((aspect) => (
                  <div
                    key={aspect.name}
                    className="border border-[rgba(238,93,52,0.12)] bg-[rgba(20,15,35,0.6)] p-5 rounded-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base text-[#eee5d3]">{aspect.name}</h3>
                      <span className="text-lg text-[#ee5d34]">{aspect.glyph}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#ee5d34] uppercase block">
                      {aspect.tone}
                    </span>
                    <p className="text-xs text-[#bfb7aa] leading-relaxed">{aspect.desc}</p>
                    <p className="text-[11px] text-[#eee5d3] italic pt-1 border-t border-[rgba(238,93,52,0.08)]">
                      ✦ {aspect.psyche}
                    </p>
                  </div>
                ))}
              </div>

              {/* Curiosity Loop */}
              <div className="p-4 border border-[rgba(238,93,52,0.25)] bg-[rgba(238,93,52,0.06)] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base text-[#eee5d3]">
                    What planetary tensions are active in your chart?
                  </h4>
                  <p className="text-xs text-[#bfb7aa]">
                    See your exact Sun, Moon, and Saturn aspects in your interactive wheel.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("chart")}
                  className="button-primary cursor-pointer text-xs py-2 px-4 whitespace-nowrap"
                >
                  See My Planetary Connections →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: TRANSITS (HOW CURRENT PLANETS AFFECT YOU)                         */}
        {/* ========================================================================= */}
        {activeTab === "transits" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] tracking-wider block mb-1">
                  Living Sky Timing
                </span>
                <h2 className="font-serif text-3xl text-[#eee5d3]">
                  How Do Current Planets Affect Your Life?
                </h2>
                <p className="text-xs md:text-sm text-[#bfb7aa] mt-2 max-w-2xl leading-relaxed">
                  Your birth chart is your permanent foundation, but the sky in the heavens keeps moving.
                  A <strong>Transit</strong> occurs when a planet right now in the sky passes over or aspects
                  a sensitive spot in your birth chart.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(20,15,35,0.6)] p-5 rounded-sm space-y-3">
                  <span className="text-xs font-mono uppercase text-[#ee5d34]">
                    Short-Term Movement (Days to Weeks)
                  </span>
                  <h3 className="font-serif text-lg text-[#eee5d3]">Moon & Inner Planets</h3>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    The Moon changes signs every 2.5 days, altering collective emotional tides.
                    Mercury and Venus create short shifts in communication, sudden nostalgia, or brief relationship tensions.
                  </p>
                  <p className="text-[11px] text-[#eee5d3] italic">
                    "Why did I suddenly feel overwhelmed or miss someone yesterday?"
                  </p>
                </div>

                <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(20,15,35,0.6)] p-5 rounded-sm space-y-3">
                  <span className="text-xs font-mono uppercase text-[#ee5d34]">
                    Long-Term Shifts (Months to Years)
                  </span>
                  <h3 className="font-serif text-lg text-[#eee5d3]">Saturn, Uranus & Pluto</h3>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    Heavy planets stay in one area of your chart for years, dismantling old defense mechanisms,
                    testing relationships, and stripping away pretense until only what is authentic survives.
                  </p>
                  <p className="text-[11px] text-[#eee5d3] italic">
                    "Why did that entire past period feel so agonizingly heavy?"
                  </p>
                </div>
              </div>

              {/* Curiosity Loop */}
              <div className="p-5 border border-[#ee5d34] bg-[rgba(31,24,48,0.9)] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base text-[#eee5d3]">
                    What is happening in your sky right now?
                  </h4>
                  <p className="text-xs text-[#bfb7aa]">
                    Explore your personal timeline, upcoming shifts, and the moments when the emotional fog lifts.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("timeline")}
                  className="button-primary cursor-pointer text-xs py-2 px-4 whitespace-nowrap"
                >
                  Open My Timeline & Shifts →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: TAROT LIBRARY                                                     */}
        {/* ========================================================================= */}
        {activeTab === "tarot" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] tracking-wider block mb-1">
                  Card Archetypes
                </span>
                <h2 className="font-serif text-3xl text-[#eee5d3]">The Tarot Reflection System</h2>
                <p className="text-xs md:text-sm text-[#bfb7aa] mt-2 max-w-2xl leading-relaxed">
                  Tarot is not fortune-telling; it is a visual language for the unconscious.
                  When your rational mind is caught in an overthinking loop, choosing a card bypasses logic
                  to reveal what your intuition already knows.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border border-[rgba(238,93,52,0.12)] p-4 rounded-sm bg-[rgba(20,15,35,0.6)] space-y-2">
                  <span className="text-xs font-mono uppercase text-[#ee5d34]">1. The Major Arcana</span>
                  <h3 className="font-serif text-base text-[#eee5d3]">The Soul's Crossroads (22 Cards)</h3>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    Represents major karmic shifts, life-altering decisions, and spiritual thresholds (The Tower, The Moon, Death, The Sun).
                  </p>
                </div>

                <div className="border border-[rgba(238,93,52,0.12)] p-4 rounded-sm bg-[rgba(20,15,35,0.6)] space-y-2">
                  <span className="text-xs font-mono uppercase text-[#ee5d34]">2. The Minor Arcana</span>
                  <h3 className="font-serif text-base text-[#eee5d3]">Daily Realities (56 Cards)</h3>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    Four suits mirroring the four astrological elements: Wands (Fire), Cups (Water/Heartbreak), Swords (Air/Overthinking), Pentacles (Earth/Grounding).
                  </p>
                </div>

                <div className="border border-[rgba(238,93,52,0.12)] p-4 rounded-sm bg-[rgba(20,15,35,0.6)] space-y-2">
                  <span className="text-xs font-mono uppercase text-[#ee5d34]">3. Reading Spreads</span>
                  <h3 className="font-serif text-base text-[#eee5d3]">Past, Present & Opening</h3>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    How cards interact in relationship dilemmas, career crossroads, and releasing emotional attachments without guilt.
                  </p>
                </div>
              </div>

              {/* Curiosity Loop */}
              <div className="p-4 border border-[rgba(238,93,52,0.25)] bg-[rgba(238,93,52,0.06)] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base text-[#eee5d3]">Have a specific question weighing on you?</h4>
                  <p className="text-xs text-[#bfb7aa]">
                    Draw a 3-card spread now to mirror your current crossroads.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("tarot")}
                  className="button-primary cursor-pointer text-xs py-2 px-4 whitespace-nowrap"
                >
                  Consult the Cards →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: NUMEROLOGY                                                        */}
        {/* ========================================================================= */}
        {activeTab === "numerology" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(238,93,52,0.12)] pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#ee5d34] tracking-wider block mb-1">
                    Vibrational Geometry
                  </span>
                  <h2 className="font-serif text-3xl text-[#eee5d3]">Life Path & Numerology</h2>
                  <p className="text-xs text-[#bfb7aa] mt-1">
                    Your birth date holds a vibrational sum that points toward your core life purpose.
                  </p>
                </div>

                <div className="p-3 border border-[#ee5d34] bg-[rgba(238,93,52,0.1)] rounded-sm text-center">
                  <span className="text-[10px] font-mono text-[#bfb7aa] uppercase block">Your Life Path</span>
                  <span className="text-2xl font-serif text-[#ee5d34]">{userLifePath}</span>
                </div>
              </div>

              {/* Number Detail from user's calculation */}
              {(() => {
                const info =
                  NUMEROLOGY_DATA[String(userLifePath)] || NUMEROLOGY_DATA["7"];
                return (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl text-[#eee5d3]">
                        Life Path {info.number}: {info.archetype}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {info.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-[10px] font-mono px-2 py-0.5 bg-[rgba(238,93,52,0.12)] text-[#ee5d34] rounded-sm"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-[#eee5d3] leading-relaxed">{info.overview}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          Strengths & Natural Power
                        </span>
                        <ul className="text-xs text-[#bfb7aa] space-y-1">
                          {info.strengths.map((st, i) => (
                            <li key={i}>✦ {st}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.5)]">
                        <span className="text-xs font-mono uppercase text-[#ee5d34] block mb-1">
                          Challenges & Unexplored Traps
                        </span>
                        <ul className="text-xs text-[#bfb7aa] space-y-1">
                          {info.challenges.map((ch, i) => (
                            <li key={i}>✦ {ch}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: PALM LINE MEANING                                                */}
        {/* ========================================================================= */}
        {activeTab === "palm" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 md:p-8 rounded-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] tracking-wider block mb-1">
                  Somatics & Palmistry
                </span>
                <h2 className="font-serif text-3xl text-[#eee5d3]">The Three Primary Palm Lines</h2>
                <p className="text-xs md:text-sm text-[#bfb7aa] mt-2 max-w-2xl leading-relaxed">
                  Your hands are nervous system conduits. The creases reflect how your brain processes
                  stress, emotional defense, and vital life energy over decades.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(20,15,35,0.6)] p-5 rounded-sm space-y-2">
                  <span className="text-xs font-mono uppercase text-[#ee5d34]">1. Heart Line</span>
                  <h3 className="font-serif text-lg text-[#eee5d3]">Heartbreak & Detachment</h3>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    Runs horizontally below the fingers. Indicates how easily your feelings get hurt,
                    whether you hold a soft corner for those who hurt you, or whether you freeze and step back into emotional numbness.
                  </p>
                  <p className="text-[11px] text-[#eee5d3] italic pt-1">
                    Curved = emotionally expressive; Straight = suppresses feelings until boiling.
                  </p>
                </div>

                <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(20,15,35,0.6)] p-5 rounded-sm space-y-2">
                  <span className="text-xs font-mono uppercase text-[#ee5d34]">2. Head Line</span>
                  <h3 className="font-serif text-lg text-[#eee5d3]">Overthinking & Mental Patterns</h3>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    Runs across the palm center. Shows how you process information, what triggers your anxiety spirals,
                    and how your nervous system handles sudden crisis or betrayal.
                  </p>
                  <p className="text-[11px] text-[#eee5d3] italic pt-1">
                    Deep & clear = focused execution; Sloping = intuitive imagination prone to overthinking.
                  </p>
                </div>

                <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(20,15,35,0.6)] p-5 rounded-sm space-y-2">
                  <span className="text-xs font-mono uppercase text-[#ee5d34]">3. Life Line</span>
                  <h3 className="font-serif text-lg text-[#eee5d3]">Vitality & Comfort Zone</h3>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">
                    Curves around the base of the thumb. Measures your physical resilience, your relationship
                    to rest versus burnout, and your ability to ground yourself after emotional overwhelm.
                  </p>
                  <p className="text-[11px] text-[#eee5d3] italic pt-1">
                    Does not measure life length — it measures your grounded presence.
                  </p>
                </div>
              </div>

              {/* Curiosity Loop */}
              <div className="p-4 border border-[rgba(238,93,52,0.25)] bg-[rgba(238,93,52,0.06)] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base text-[#eee5d3]">
                    What do your hands reveal about your emotional defenses?
                  </h4>
                  <p className="text-xs text-[#bfb7aa]">
                    Scan and synthesize your palm lines with our astrological AI engine.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("askai")}
                  className="button-primary cursor-pointer text-xs py-2 px-4 whitespace-nowrap"
                >
                  Consult AI on My Lines →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
