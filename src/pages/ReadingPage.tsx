import { useState } from "react";
import { SunSymbol, MoonSymbol, MarsSymbol, VenusSymbol, SaturnSymbol, ZodiacIcon } from "../components/icons/CelestialIcons";
import { useApp } from "../context/AppContext";

interface ReadingPageProps {
  onNavigate: (page: string) => void;
}

export default function ReadingPage({ onNavigate }: ReadingPageProps) {
  const { user, liveTransits } = useApp();
  const [activeSection, setActiveSection] = useState("core");

  const sunP = user.placements.find(p => p.planet === "Sun") || user.placements[0] || { sign: user.sunSign, house: 10 };
  const moonP = user.placements.find(p => p.planet === "Moon") || user.placements[1] || { sign: user.moonSign, house: 4 };
  const venusP = user.placements.find(p => p.planet === "Venus") || user.placements[3] || { sign: "Cancer", house: 9 };
  const marsP = user.placements.find(p => p.planet === "Mars") || user.placements[4] || { sign: "Sagittarius", house: 1 };
  const saturnP = user.placements.find(p => p.planet === "Saturn") || user.placements[6] || { sign: "Libra", house: 12 };

  const sections = [
    {
      id: "core",
      label: "Core energy",
      icon: <SunSymbol size={18} className="text-[#f0c870]"/>,
      accent: "#f0c870",
      headline: `Your ${sunP.sign} Sun in the ${sunP.house}th house is your primary source of vitality.`,
      body: `Your Sun in ${sunP.sign} in the ${sunP.house}th house is the central engine of your public presence and creative agency. There is a fundamental necessity to express who you are without unnecessary pretense. When this energy flows, you are magnetic, warm, and decisive.\n\nThe ${sunP.house}th house gives this purpose: what you construct in the world must have personal meaning. You are not satisfied by routine compliance; you need genuine authorship over your projects.\n\nYour ${moonP.sign} Moon creates a crucial counterweight. The active creator needs an internal sanctuary of steadiness. Without that quiet foundation, the outer momentum begins to deplete itself.`,
      highlight: `With Sun in ${sunP.sign}, creative authorship is your true oxygen.`,
    },
    {
      id: "emotional",
      label: "Emotional patterns",
      icon: <MoonSymbol size={18} className="text-[#bfb7aa]"/>,
      accent: "#bfb7aa",
      headline: `Your Moon in ${moonP.sign} in the ${moonP.house}th house requires sanctuary before vulnerability.`,
      body: `Moon in ${moonP.sign} in your ${moonP.house}th house means your emotional world is instinctual, deep, and tied to safety. You process emotional weather through grounded environments, quiet spaces, and loyal companions. Rushing your emotional process creates natural resistance.\n\nOnce trust is established, your loyalty is enduring. The core lesson is recognizing when to hold fast to genuine love versus when familiarity has become an unexamined comfort zone.\n\nYour ${user.risingSign} rising presence complements this: people register your intuitive discernment before you choose to speak. You observe the room deeply before opening the door.`,
      highlight: `Your ${moonP.sign} Moon needs solid ground to feel truly free.`,
    },
    {
      id: "relationships",
      label: "Relationships",
      icon: <VenusSymbol size={18} className="text-[#f4acb7]"/>,
      accent: "#f4acb7",
      headline: `Venus in ${venusP.sign} in the ${venusP.house}th house shapes how you bond and love.`,
      body: `Venus in ${venusP.sign} in the ${venusP.house}th house invites relationships that widen your intellectual or philosophical horizons. You value partners who respect your emotional interior while challenging you to grow.\n\nSurface-level interactions exhaust you quickly. You remember private conversations that touched genuine vulnerability long after casual small talk fades.\n\nIn intimacy, the ongoing journey is learning that being loved does not require an audition. Real kinship is rooted in mutual presence, not continuous performance.`,
      highlight: "Love thrives when curiosity and emotional safety meet.",
    },
    {
      id: "career",
      label: "Career & purpose",
      icon: <MarsSymbol size={18} className="text-[#e07070]"/>,
      accent: "#e07070",
      headline: `Mars in ${marsP.sign} in the ${marsP.house}th house powers your momentum.`,
      body: `Mars in ${marsP.sign} gives you an instinct for direct action. When a goal aligns with your core values, your energy mobilizes with exceptional speed. You thrive when building systems with room for personal vision.\n\nWork that feels repetitive or stripped of purpose creates low-grade resistance. You need to know that your contribution carries real weight.\n\nYour greatest achievements occur when your vision and patience work together — pairing ${marsP.sign} initiative with disciplined follow-through.`,
      highlight: "You work best from conviction, not mere obligation.",
    },
    {
      id: "challenges",
      label: "Challenges",
      icon: <SaturnSymbol size={18} className="text-[#8aabcc]"/>,
      accent: "#8aabcc",
      headline: `Saturn in ${saturnP.sign} in the ${saturnP.house}th house asks for quiet discipline.`,
      body: `Saturn in ${saturnP.sign} governs where you face recurring tests of endurance and self-reliance. It is the part of your chart that asks you to dismantle self-doubt through consistent, quiet craftsmanship.\n\nYou may occasionally hold yourself to impossible standards that you would never demand of friends. The medicine is patient self-compassion.\n\nWhat you develop with care in this area becomes your most durable gift to others over the long arc of your life.`,
      highlight: "Durable mastery is forged through patient consistency.",
    },
    {
      id: "current",
      label: "Current sky",
      icon: <ZodiacIcon sign="aquarius" size={18} className="text-[#ee5d34]"/>,
      accent: "#ee5d34",
      headline: `The current sky with Moon in ${liveTransits.moonPhase?.sign || "the sky"} asks for focus.`,
      body: `With the Moon currently in ${liveTransits.moonPhase?.sign || "the sky"} (${liveTransits.moonPhase?.phaseName || "current phase"}), celestial cycles are highlighting your natal chart angles. This is a favorable window for clarifying priorities.\n\nTake note of the recurring thoughts that arise in quiet moments. What you choose to focus on now sets the tone for the coming transit window.\n\nReview the foundations you have laid in recent weeks before rushing to open too many new doors at once.`,
      highlight: "Honor the timing of your current chapter.",
    },
  ];

  const current = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div className="min-h-screen bg-[#0e0a17] text-[#eee5d3]">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 35% 50% at 85% 30%, rgba(50,25,110,0.08) 0%, transparent 65%)" }}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-2">
            Personal reading · {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[#eee5d3] mb-2">
            {user.name}'s natal reading
          </h1>
          <p className="text-sm text-[#bfb7aa]">Sun {user.sunSign} · Moon {user.moonSign} · {user.risingSign} rising</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Navigation sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-1 sticky top-8">
              {sections.map((section) => (
                <button key={section.id} onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-all duration-200 cursor-pointer ${
                    activeSection === section.id
                      ? "bg-[rgba(238,93,52,0.08)] text-[#eee5d3]"
                      : "text-[#bfb7aa] hover:text-[#eee5d3] hover:bg-[rgba(238,93,52,0.04)]"
                  }`}>
                  <div className={activeSection === section.id ? "opacity-100" : "opacity-50"}>
                    {section.icon}
                  </div>
                  <span className="text-sm">{section.label}</span>
                </button>
              ))}

              <div className="h-px bg-[rgba(238,93,52,0.1)] my-4"/>

              <button onClick={() => onNavigate("chart")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left text-[#bfb7aa] hover:text-[#eee5d3] transition-colors text-sm cursor-pointer">
                ← View chart
              </button>
            </div>
          </div>

          {/* Reading content */}
          <div className="lg:col-span-3">
            <div className="animate-fade-up">
              {/* Section label */}
              <div className="flex items-center gap-2 mb-6">
                {current.icon}
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: current.accent }}>
                  {current.label}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-2xl md:text-3xl font-light text-[#eee5d3] leading-snug mb-8">
                {current.headline}
              </h2>

              {/* Highlighted insight */}
              <div className="border-l-2 pl-5 mb-8" style={{ borderColor: current.accent }}>
                <p className="font-serif italic text-lg font-light" style={{ color: current.accent }}>
                  {current.highlight}
                </p>
              </div>

              {/* Body text */}
              <div className="space-y-5">
                {current.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[#bfb7aa] text-base leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>

              {/* Section divider */}
              <div className="flex items-center gap-4 mt-12 mb-8">
                <div className="h-px flex-1 bg-[rgba(238,93,52,0.1)]"/>
                <div style={{ color: current.accent }} className="text-sm opacity-40">✦</div>
                <div className="h-px flex-1 bg-[rgba(238,93,52,0.1)]"/>
              </div>

              {/* Next section nav */}
              <div className="flex justify-between items-center">
                <div/>
                {sections.findIndex(s => s.id === activeSection) < sections.length - 1 && (
                  <button
                    onClick={() => {
                      const idx = sections.findIndex(s => s.id === activeSection);
                      setActiveSection(sections[idx + 1].id);
                    }}
                    className="flex items-center gap-2 text-sm text-[#bfb7aa] hover:text-[#eee5d3] transition-colors cursor-pointer">
                    Next: {sections[sections.findIndex(s => s.id === activeSection) + 1]?.label}
                    <span className="text-[#ee5d34]">→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
