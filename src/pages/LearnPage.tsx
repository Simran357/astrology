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

interface LearnPageProps {
  onNavigate: (page: string) => void;
}

type Category = "all" | "signs" | "planets" | "houses" | "aspects" | "moon";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "signs", label: "Zodiac signs" },
  { id: "planets", label: "Planets" },
  { id: "houses", label: "Houses" },
  { id: "aspects", label: "Aspects" },
  { id: "moon", label: "Moon phases" },
];

interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  time: string;
  personal: boolean;
  targetPlanet?: string;
  targetHouse?: number;
  targetPage?: string;
  detailText?: string;
  icon: React.ReactNode;
}

export default function LearnPage({ onNavigate }: LearnPageProps) {
  const { user, navigateWithHighlight } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  const marsSign = user.placements.find((p) => p.planet === "Mars")?.sign || "Sagittarius";
  const moonSign = user.moonSign || "Taurus";
  const sunSign = user.sunSign || "Leo";

  const featuredArticles = [
    {
      title: "What your Saturn return actually means",
      subtitle: "Planets · 8 min read",
      tag: "In your chart",
      icon: <SaturnSymbol size={32} className="text-[#8aabcc]"/>,
      personal: true,
      targetPlanet: "Saturn",
      bg: "from-[rgba(40,60,100,0.4)] to-[rgba(20,20,40,0.3)]",
    },
    {
      title: "The North Node: your soul's direction",
      subtitle: "Chart fundamentals · 6 min read",
      tag: "Recommended",
      icon: <AquariusSymbol size={32} className="text-[#ee5d34]"/>,
      personal: false,
      targetPlanet: "North Node",
      bg: "from-[rgba(60,40,100,0.4)] to-[rgba(20,20,40,0.3)]",
    },
  ];

  const articles: Article[] = [
    {
      id: "1",
      title: `Your Mars in ${marsSign} — ambition as philosophy`,
      subtitle: `In your chart: how Mars shapes your drive`,
      category: "planets",
      time: "5 min",
      personal: true,
      targetPlanet: "Mars",
      detailText: `In your birth chart, Mars in ${marsSign} directs your willpower through meaning, curiosity, and bold steps. You operate best when you feel ideological freedom rather than rigid micromanagement.`,
      icon: <ZodiacIcon sign={marsSign.toLowerCase()} size={18} className="text-[#e07070]"/>,
    },
    {
      id: "2",
      title: "Understanding the 12 houses",
      subtitle: "The framework that places everything in context",
      category: "houses",
      time: "10 min",
      personal: false,
      targetPage: "chart",
      detailText: "Houses divide your natal wheel into twelve life areas — from personal identity (1st) to vocation (10th) and subconscious sanctuary (12th). Each planet acts inside its assigned house room.",
      icon: <CelestialRing size={18} className="text-[#bfb7aa]"/>,
    },
    {
      id: "3",
      title: "Moon phases and your emotional rhythm",
      subtitle: "Working with the lunar cycle intentionally",
      category: "moon",
      time: "6 min",
      personal: false,
      targetPlanet: "Moon",
      targetPage: "timeline",
      detailText: "The Moon shifts signs every 2.5 days, altering the collective emotional atmosphere. Tracking its phase helps identify when to launch initiatives versus when to consolidate.",
      icon: <MoonSymbol size={18} className="text-[#bfb7aa]"/>,
    },
    {
      id: "4",
      title: `${sunSign} Sun: identity through creation`,
      subtitle: "In your chart: why being seen matters to you",
      category: "signs",
      time: "4 min",
      personal: true,
      targetPlanet: "Sun",
      detailText: `Your ${sunSign} Sun is your conscious battery. Expressing yourself with genuine integrity and creative authorship restores your vitality whenever life feels demanding.`,
      icon: <SunSymbol size={18} className="text-[#f0c870]"/>,
    },
    {
      id: "5",
      title: "Trines, squares & oppositions explained",
      subtitle: "The geometry of your chart relationships",
      category: "aspects",
      time: "7 min",
      personal: false,
      targetPage: "chart",
      detailText: "Aspects are angular conversations between celestial bodies. Trines flow effortlessly, squares create necessary tension that drives growth, and oppositions demand balance.",
      icon: <TrineSymbol size={18} className="text-[#ee5d34]"/>,
    },
    {
      id: "6",
      title: "Jupiter in your chart: growth through ideas",
      subtitle: "In your chart: where expansion finds you",
      category: "planets",
      time: "5 min",
      personal: true,
      targetPlanet: "Jupiter",
      detailText: "Jupiter marks where the universe grants you natural optimism, perspective, and abundance. Looking at its house position reveals your fertile ground for personal growth.",
      icon: <JupiterSymbol size={18} className="text-[#f0c060]"/>,
    },
    {
      id: "7",
      title: `The 4th house: home, roots, and emotional foundation`,
      subtitle: `Why your Moon in ${moonSign} here is significant`,
      category: "houses",
      time: "6 min",
      personal: true,
      targetPlanet: "Moon",
      detailText: `With your Moon in ${moonSign} in the 4th House, having a quiet, private refuge is essential to your mental health. You cannot thrive in chaos; your roots require steady soil.`,
      icon: <MoonSymbol size={18} className="text-[#bfb7aa]"/>,
    },
    {
      id: "8",
      title: "Water signs: Cancer, Scorpio, Pisces",
      subtitle: "Emotion, intuition, and the unconscious",
      category: "signs",
      time: "8 min",
      personal: false,
      detailText: "Water elements register what remains unspoken. They navigate life through resonance, gut instinct, and deep memory rather than detached intellectual analysis.",
      icon: <ZodiacIcon sign="cancer" size={18} className="text-[#a0c4ff]"/>,
    },
  ];

  const filtered = articles.filter(a =>
    (activeCategory === "all" || a.category === activeCategory) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.subtitle.toLowerCase().includes(search.toLowerCase()))
  );

  const handleArticleClick = (article: Article) => {
    if (expandedArticleId === article.id) {
      setExpandedArticleId(null);
    } else {
      setExpandedArticleId(article.id);
    }
  };

  const handleAction = (targetPage?: string, targetPlanet?: string) => {
    if (targetPlanet) {
      navigateWithHighlight("chart", targetPlanet);
    } else if (targetPage) {
      onNavigate(targetPage);
    } else {
      onNavigate("chart");
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0a17] text-[#eee5d3]">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 30% at 50% 0%, rgba(50,30,100,0.06) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-2">Library</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[#eee5d3] mb-2">
            Learn astrology,<br/>through your chart.
          </h1>
          <p className="text-sm text-[#bfb7aa] max-w-md mt-3 leading-relaxed">
            Every topic connects back to your placements. Learning Mars in {marsSign}, for instance, means learning about yourself.
          </p>
        </div>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {featuredArticles.map((f, i) => (
            <button
              key={i}
              onClick={() => handleAction("chart", f.targetPlanet)}
              className={`w-full text-left p-6 bg-gradient-to-br ${f.bg} border border-[rgba(238,93,52,0.12)] rounded-sm hover:border-[rgba(238,93,52,0.25)] transition-all duration-200 group cursor-pointer`}>
              <div className="flex items-start justify-between mb-6">
                <div className="opacity-70">{f.icon}</div>
                {f.personal && (
                  <span className="text-xs px-2 py-0.5 bg-[rgba(238,93,52,0.12)] text-[#ee5d34] rounded-sm font-mono">
                    In your chart
                  </span>
                )}
              </div>
              <h3 className="font-serif text-xl font-light text-[#eee5d3] mb-2 leading-snug group-hover:text-white transition-colors">
                {f.title}
              </h3>
              <p className="text-xs text-[#bfb7aa]">{f.subtitle}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-[#ee5d34] font-medium">
                <span>See {f.targetPlanet || "placement"} in your chart</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search topics..."
            className="w-full bg-[rgba(31,24,48,0.8)] border border-[rgba(238,93,52,0.15)] rounded-sm px-4 py-3 text-sm text-[#eee5d3] placeholder:text-[#bfb7aa] focus:outline-none focus:border-[rgba(238,93,52,0.4)] transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bfb7aa] text-sm">✦</span>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm border transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? "border-[#ee5d34] bg-[rgba(238,93,52,0.15)] text-[#eee5d3]"
                  : "border-[rgba(238,93,52,0.12)] text-[#bfb7aa] hover:border-[rgba(238,93,52,0.3)] hover:text-[#eee5d3]"
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-3">
          {filtered.map(article => (
            <div key={article.id} className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.6)] rounded-sm overflow-hidden">
              <button
                onClick={() => handleArticleClick(article)}
                className="w-full p-4 md:p-5 flex items-start gap-4 text-left hover:bg-[rgba(238,93,52,0.04)] transition-colors cursor-pointer group">
                <div className="mt-0.5 shrink-0 opacity-80">{article.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-serif text-base text-[#eee5d3] group-hover:text-white transition-colors">
                      {article.title}
                    </h4>
                    {article.personal && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-[rgba(238,93,52,0.12)] text-[#ee5d34] rounded-sm">
                        In your chart
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#bfb7aa]">{article.subtitle}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#bfb7aa]">{article.time}</span>
                  <span className={`block text-[#bfb7aa] text-xs transition-transform mt-1 ${expandedArticleId === article.id ? "rotate-180" : ""}`}>▾</span>
                </div>
              </button>

              {expandedArticleId === article.id && (
                <div className="px-5 pb-5 pt-1 border-t border-[rgba(238,93,52,0.08)] bg-[rgba(20,15,35,0.4)]">
                  <p className="text-sm text-[#bfb7aa] leading-relaxed mb-4">
                    {article.detailText}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAction(article.targetPage, article.targetPlanet)}
                      className="px-4 py-2 bg-[#ee5d34] text-[#0e0a17] text-xs font-medium hover:bg-[#f58a6b] transition-colors rounded-sm flex items-center gap-1.5 cursor-pointer">
                      <span>{article.targetPlanet ? `See your ${article.targetPlanet} in chart` : "Explore in your chart"}</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => onNavigate("reading")}
                      className="text-xs text-[#bfb7aa] hover:text-[#eee5d3] transition-colors cursor-pointer">
                      Request consultation →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
