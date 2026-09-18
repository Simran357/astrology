"use client";

import { useState, useMemo } from "react";
import { calculateNatalEphemeris } from "../services/ephemerisEngine";
import { calculateLiveTransits } from "../services/transitEngine";
import { DateTime } from "luxon";

const darkLogo = "/image/AstroFindingsDarkLogo.svg";
const lightLogo = "/image/AstroFindingslightLogo.svg";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block shrink-0 ml-1">
    <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface DilemmaMirror {
  id: string;
  tag: string;
  trigger: string;
  glimpseOfTruth: string;
  lingeringQuestion: string;
  anchor: string;
  stampNote: string;
}

const DILEMMA_MIRRORS: DilemmaMirror[] = [
  {
    id: "golden_handcuffs",
    tag: "The Golden Handcuffs",
    trigger: "\"I earn great money, but every Sunday night feels like walking toward a prison sentence.\"",
    glimpseOfTruth:
      "You didn't choose security—you bought comfortable numbness. Every year you trade for a company bonus is a year your true talent quietly decays.",
    lingeringQuestion:
      "Are you staying for financial prudence—or because you're terrified you have nothing else to offer the world?",
    anchor: "2nd House Security vs. 10th House Purpose",
    stampNote: "CAREER // THE GOLDEN CAGE",
  },
  {
    id: "sunk_cost_love",
    tag: "The 5-Year Relationship",
    trigger: "\"We've been together 5 years. We don't fight, but there is zero physical or emotional spark left.\"",
    glimpseOfTruth:
      "Neither of you is evil, but you are slowly burning each other's finite youth out of habit, shared furniture, and fear of starting over.",
    lingeringQuestion:
      "How many more years will you waste holding their hand just to avoid the five-week guilt of breaking up?",
    anchor: "7th House Contracts vs. 8th House Severance",
    stampNote: "LOVE // SUNK COST",
  },
  {
    id: "family_debt",
    tag: "Parental Guilt & Control",
    trigger: "\"My parents expect me to obey their career and marriage demands because they paid for my upbringing.\"",
    glimpseOfTruth:
      "Their sacrifices were their responsibility as parents—not a permanent mortgage on your adulthood. They will happily ruin your peace to protect their reputation.",
    lingeringQuestion:
      "Can you accept being the 'ungrateful villain' in your family's story in order to live your own life?",
    anchor: "4th House Lineage vs. 1st House Sovereignty",
    stampNote: "FAMILY // EMOTIONAL BLACKMAIL",
  },
  {
    id: "partner_betrayal",
    tag: "Stolen Equity & Credit",
    trigger: "\"I did the heavy building behind the scenes, but my co-founder took the investor spotlight and reduced my shares.\"",
    glimpseOfTruth:
      "You built the engine; they played the politics. Swallowing the disrespect under the guise of 'keeping the peace' isn't wisdom—it is surrender.",
    lingeringQuestion:
      "Is your silence really 'strategic maturity'—or are you simply terrified of standing up and fighting for what you built?",
    anchor: "8th House Assets & Mars 10th House",
    stampNote: "BUSINESS // STOLEN CREDIT",
  },
  {
    id: "emotional_affair",
    tag: "The Secret Emotional Affair",
    trigger: "\"We haven't slept together, but this co-worker is the first person I text and the only one who understands me.\"",
    glimpseOfTruth:
      "Deleting your chat history and tilting your phone screen proves you know the truth. Starving your spouse to feed a workplace fantasy is already betrayal.",
    lingeringQuestion:
      "If your partner saw all your private chats with this person right now, could you look them in the eye without lying?",
    anchor: "Venus-Neptune Axis & 5th House Secrets",
    stampNote: "INFIDELITY // DOUBLE LIFE",
  },
  {
    id: "geographic_reset",
    tag: "Outgrown Childhood Friends",
    trigger: "\"Every time I hit a new milestone, my childhood circle mocks my ambition and tries to drag me back down.\"",
    glimpseOfTruth:
      "They don't miss the old times. They miss the broken, smaller version of you that made them feel safe about their own stagnation.",
    lingeringQuestion:
      "Will you stay small to protect their fragile egos, or walk away and face the loneliness of new territory?",
    anchor: "11th House Alliances vs. 9th House Exile",
    stampNote: "FRIENDSHIP // TOXIC NOSTALGIA",
  },
];

const STORY_CHAPTERS = [
  {
    numeral: "01",
    theme: "The Deep Ocean",
    title: "Why You Feel What You Feel",
    quote: "Your sensitivity is not a design flaw. It is an antenna registering frequencies others are too numb to detect.",
  },
  {
    numeral: "02",
    theme: "The Flight Response",
    title: "Why You Stay Away When Things Get Tough",
    quote: "You don't scream during conflict. You vanish.",
  },
  {
    numeral: "03",
    theme: "The Freeze",
    title: "Why You Shut Down",
    quote: "Silence was the only fortress that never gave them ammunition.",
  },
  {
    numeral: "04",
    theme: "The Sacred Core",
    title: "Why You Fiercely Preserve What You Value",
    quote: "You guard your tenderness with the vigilance of a curator protecting an ancient scroll.",
  },
  {
    numeral: "05",
    theme: "The Mirror of Love",
    title: "How Relationships Treat You",
    quote: "You fall in love with potential because it gives you an audition to win.",
  },
  {
    numeral: "06",
    theme: "The Ice Wall",
    title: "What Detachment Feels Like to You",
    quote: "You don't break dishes. You simply lean back and unclip your heart.",
  },
];

// 12 Zodiac signs data with Chani-style daily transits and psychological themes
const ZODIAC_DAILY_GUIDANCE = [
  {
    sign: "Aries",
    sticker: "/stickers/zodiac/aries.png",
    dates: "Mar 21 – Apr 19",
    element: "Fire",
    glyph: "♈",
    color: "#e07070",
    theme: "Courage Over Impatience",
    guidance: "Today asks you to slow down before you initiate. What feels like an urgent obstacle is simply a prompt to conserve your vitality for battles that actually matter.",
  },
  {
    sign: "Taurus",
    sticker: "/stickers/zodiac/taurus.png",
    dates: "Apr 20 – May 20",
    element: "Earth",
    glyph: "♉",
    color: "#a3b18a",
    theme: "Sanctuary & Somatic Rhythm",
    guidance: "Your nervous system requires quiet stability today. Protect your morning routine and decline commitments that drain your physical peace without reciprocity.",
  },
  {
    sign: "Gemini",
    sticker: "/stickers/zodiac/gemini.png",
    dates: "May 21 – Jun 20",
    element: "Air",
    glyph: "♊",
    color: "#a0c4ff",
    theme: "Mental Discernment",
    guidance: "Notice when curiosity turns into restless overstimulation. You do not need to reply to every ping or solve every conversational riddle today.",
  },
  {
    sign: "Cancer",
    sticker: "/stickers/zodiac/cancer.png",
    dates: "Jun 21 – Jul 22",
    element: "Water",
    glyph: "♋",
    color: "#90e0ef",
    theme: "Gentle Inner Boundaries",
    guidance: "You are registering everyone else's unexpressed feelings. Step back into your protective shell without guilt; your compassion works best when you are not depleted.",
  },
  {
    sign: "Leo",
    sticker: "/stickers/zodiac/leo.png",
    dates: "Jul 23 – Aug 22",
    element: "Fire",
    glyph: "♌",
    color: "#f0c870",
    theme: "Quiet Sovereign Radiance",
    guidance: "True confidence does not seek an audience. Shine generously through your work without waiting for applause to validate your rightful worth.",
  },
  {
    sign: "Virgo",
    sticker: "/stickers/zodiac/virgo.png",
    dates: "Aug 23 – Sep 22",
    element: "Earth",
    glyph: "♍",
    color: "#bfb7aa",
    theme: "Releasing Perfectionism",
    guidance: "What you perceive as a flaw is often the exact human texture that makes your contribution durable. Forgive yourself for being an evolving work in progress.",
  },
  {
    sign: "Libra",
    sticker: "/stickers/zodiac/libra.png",
    dates: "Sep 23 – Oct 22",
    element: "Air",
    glyph: "♎",
    color: "#f4acb7",
    theme: "Reciprocal Equilibrium",
    guidance: "Peace is not the absence of conflict; it is the presence of mutual honesty. Speak your boundary early rather than swallowing disappointment to keep everyone comfortable.",
  },
  {
    sign: "Scorpio",
    sticker: "/stickers/zodiac/scorpio.png",
    dates: "Oct 23 – Nov 21",
    element: "Water",
    glyph: "♏",
    color: "#c77dff",
    theme: "Emotional Alchemical Depth",
    guidance: "You don't need to test loyalty through distance or silence. Let trusted people see your vulnerability—it is your greatest source of sovereign power.",
  },
  {
    sign: "Sagittarius",
    sticker: "/stickers/zodiac/sagittarius.png",
    dates: "Nov 22 – Dec 21",
    element: "Fire",
    glyph: "♐",
    color: "#e76f51",
    theme: "Grounded Horizon",
    guidance: "A philosophical leap needs solid ground to launch from. Balance your hunger for freedom with the daily small duties required to build your sanctuary.",
  },
  {
    sign: "Capricorn",
    sticker: "/stickers/zodiac/capricorn.png",
    dates: "Dec 22 – Jan 19",
    element: "Earth",
    glyph: "♑",
    color: "#8aabcc",
    theme: "Durable Authorship",
    guidance: "You have carried more than your fair share for months. Notice where you are confusing suffering with virtue, and allow support into your container.",
  },
  {
    sign: "Aquarius",
    sticker: "/stickers/zodiac/aquarius.png",
    dates: "Jan 20 – Feb 18",
    element: "Air",
    glyph: "♒",
    color: "#38bdf8",
    theme: "Unapologetic Originality",
    guidance: "Your perspective is meant to disrupt tired consensus. Do not shrink your vision to soothe people who are committed to living in the past.",
  },
  {
    sign: "Pisces",
    sticker: "/stickers/zodiac/pisces.png",
    dates: "Feb 19 – Mar 20",
    element: "Water",
    glyph: "♓",
    color: "#b8c0ff",
    theme: "Sanctifying Your Sensitivity",
    guidance: "You feel the collective pulse deeply today. Dedicate time to creative flow, music, or restful waters. What you imagine is quietly preparing to materialize.",
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDilemma, setSelectedDilemma] = useState<string>("golden_handcuffs");
  const [selectedDailySign, setSelectedDailySign] = useState<string>("Sagittarius");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeDilemma = DILEMMA_MIRRORS.find((d) => d.id === selectedDilemma) || DILEMMA_MIRRORS[0];

  const go = (page: string) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  const todayIso = useMemo(() => DateTime.now().toISODate() || "2026-09-17", []);
  const liveTransits = useMemo(() => calculateLiveTransits(todayIso), [todayIso]);

  // Instant calculation for lazy users (no clicks required, auto-updates on input)
  const [birthDate, setBirthDate] = useState("1994-08-09");
  const quickNatal = useMemo(() => {
    try {
      if (!birthDate) return null;
      return calculateNatalEphemeris(birthDate, "12:00", 37.7749, -122.4194, "America/Los_Angeles", "Placidus");
    } catch {
      return null;
    }
  }, [birthDate]);

  const faq = [
    [
      "Is there a real human astrologer on this site?",
      "No. AstroFindings is a 100% self-guided, digital astrological cartography archive. We do not sell expensive 1-on-1 phone or video calls with human astrologers. Instead, you receive immediate, deeply personal psychological interpretations calculated directly from your exact astronomical birth coordinates.",
    ],
    [
      "What kind of astrology is this?",
      "Hellenistic and psychological western astrology using whole-sign houses and astronomical ephemeris algorithms. Less daily horoscope prophecy, more structural diagnostic of your recurring emotional tensions.",
    ],
    [
      "What if I don’t know my exact birth time?",
      "You can still generate your chart and explore your Sun, Moon, and planetary aspects. We calculate using solar noon and clearly mark house boundaries as provisional.",
    ],
    [
      "Will this tell me what to do with my life?",
      "No. The chart offers a precise vocabulary, not a command. It shows the recurring bargain you make with uncertainty, explains why you shut down or detach, and hands the sovereign decision back to you.",
    ],
  ];

  return (
    <div className="min-h-screen editorial-bg-dots text-[#052036] selection:bg-[#EAC157] selection:text-[#052036] font-inter">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER / NAVIGATION BAR                                            */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-50 border-b border-[#052036]/10 bg-[#FAF7F2]/90 backdrop-blur-md px-6 py-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={darkLogo} alt="AstroFindings" className="h-7 w-auto select-none inline-block align-middle" />
        </div>

        <nav className="hidden lg:flex items-center gap-5 text-xs font-mono uppercase tracking-widest text-[#052036]/70">
          <a href="#ask-your-chart" className="hover:text-[#052036] transition-colors">How It Works</a>
          <span className="text-[#EAC157]">✦</span>
          <a href="#story" className="hover:text-[#052036] transition-colors">Movements</a>
          <span className="text-[#EAC157]">✦</span>
          <a href="#transits" className="hover:text-[#052036] transition-colors">Transits</a>
          <span className="text-[#EAC157]">✦</span>
          <a href="#compatibility" className="hover:text-[#052036] transition-colors">Compatibility</a>
          <span className="text-[#EAC157]">✦</span>
          <a href="#dilemmas" className="hover:text-[#052036] transition-colors">Crossroads</a>
          <span className="text-[#EAC157]">✦</span>
          <a href="#pricing" className="hover:text-[#052036] transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4 text-xs font-mono">
          <button
            onClick={() => go("login")}
            className="hidden sm:inline-block text-[#052036]/80 hover:text-[#052036] tracking-wider uppercase cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => go("onboarding")}
            className="px-6 py-2.5 rounded-full bg-[#052036] text-[#FAF9F6] font-semibold hover:bg-[#082842] transition-all text-xs tracking-wider uppercase cursor-pointer shadow-md"
          >
            Get your chart →
          </button>
          <button
            className="lg:hidden text-2xl px-2 text-[#052036]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "×" : "☰"}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav is-open bg-[#FAF7F2] border-b border-[#052036]/10 p-6 space-y-3 text-xs font-mono uppercase tracking-widest lg:hidden">
          <a href="#ask-your-chart" onClick={() => setMobileOpen(false)} className="block py-1">✦ How It Works</a>
          <a href="#story" onClick={() => setMobileOpen(false)} className="block py-1">✦ The 6 Movements</a>
          <a href="#transits" onClick={() => setMobileOpen(false)} className="block py-1">✦ Transit Calendar</a>
          <a href="#compatibility" onClick={() => setMobileOpen(false)} className="block py-1">✦ Compatibility</a>
          <a href="#dilemmas" onClick={() => setMobileOpen(false)} className="block py-1">✦ Real Crossroads</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="block py-1">✦ Pricing</a>
          <a href="#questions" onClick={() => setMobileOpen(false)} className="block py-1">✦ FAQ</a>
          <button className="button-primary w-full cursor-pointer mt-2" onClick={() => go("onboarding")}>
            Begin Discovery →
          </button>
        </nav>
      )}

      <main>
        {/* ------------------------------------------------------------------ */}
        {/* HERO SECTION (Your stars. Your story. with Transparent Stickers)   */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
       

          {/* Sticker Mid-Left: Sliced Apple with Eye (Burned/Transparent Background) */}
          <div className="hidden lg:block absolute left-2 xl:left-8 top-32 z-10 pointer-events-auto transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="relative">
              <img
                src="/stickers/apple-eye.png"
                alt="Eye in Apple Collage Sticker"
                className="w-32 xl:w-38 h-auto filter drop-shadow-[0_20px_35px_rgba(5,32,54,0.18)] select-none mix-blend-multiply"
              />
            </div>
          </div>

          {/* Sticker Top-Right: Full Moon with Cicada Wing (Burned/Transparent Background) */}
         

          {/* Sticker Mid-Right: Radiant Sun Face (Burned/Transparent Background) */}
          <div className="hidden lg:block absolute right-4 xl:right-12 top-36 z-10 pointer-events-auto transform rotate-6 hover:rotate-12 transition-transform duration-300">
            <img
              src="/stickers/sun-face.png"
              alt="Radiant Sun Face Sticker"
              className="w-32 xl:w-42 h-auto filter drop-shadow-[0_20px_35px_rgba(5,32,54,0.2)] select-none mix-blend-multiply"
            />
          </div>



          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EAC157]/50 bg-white/80 shadow-sm text-xs font-mono tracking-widest text-[#052036] uppercase mb-8">
            <span className="text-[#EAC157]">✦</span>
            <span>GROUNDED IN YOUR REAL BIRTH CHART</span>
          </div>

          {/* Main Display Headline in Cormorant Garamond */}
          <h1 className="font-cormorant text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-[#052036] tracking-tight leading-[0.96] mb-8">
            Your stars.<br />
            <span className="italic font-normal">Your story.</span>
          </h1>

          {/* Subheading in Inter */}
          <p className="font-inter text-base sm:text-lg md:text-xl text-[#052036]/75 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Not another generic sun-sign horoscope. AstroFindings reads your exact birth chart and today's live planetary transits — then tells you what they actually mean for you.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => go("onboarding")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#052036] text-[#FAF9F6] font-semibold text-sm hover:bg-[#082842] transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              Build my free chart
            </button>
            <a
              href="#ask-your-chart"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#052036]/30 text-[#052036] font-semibold text-sm hover:border-[#052036] bg-white/40 backdrop-blur-sm transition-all cursor-pointer text-center"
            >
              See what it can do
            </a>
          </div>

          {/* 3 FLOATING COLLAGE PREVIEW CARDS (from Screenshot 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10 text-left items-center">
            {/* Card 1: Audio Horoscope with Sleeping Cat */}
            <div className="bg-white/90 p-5 rounded-3xl border border-[#052036]/10 shadow-[0_16px_36px_rgba(5,32,54,0.06)] space-y-3 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#052036]/60 font-bold">
                  Daily Voice Note
                </span>
                <span className="text-xs font-mono text-[#EAC157] font-bold">✦ Zzz</span>
              </div>
              <div className="flex items-center justify-center py-2 relative">
                <img
                  src="/stickers/moon-wing.png"
                  alt="Daily Voice Reading Preview"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#052036]/70 border-t border-[#052036]/10 pt-2">
                <span>Audio Transits</span>
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#052036]/15 hover:border-[#EAC157] cursor-pointer font-bold"
                >
                  {isPlayingAudio ? "⏸ Pause" : "▶ Play 04:20"}
                </button>
              </div>
            </div>

            {/* Card 2: Interactive Instant Date Snapshot & Somatic Transit Dial */}
            <div className="bg-white/95 p-5 rounded-3xl border-2 border-[#EAC157]/40 shadow-[0_20px_40px_rgba(5,32,54,0.08)] space-y-3 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#052036] font-bold">
                  ✦ Instant Sky Snapshot
                </span>
                <span className="text-[10px] font-mono text-[#052036]/60">0 clicks needed</span>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-[#052036]/60 block uppercase">Pick Birth Date</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#052036]/20 rounded-xl px-3 py-2 text-xs text-[#052036] focus:outline-none focus:border-[#EAC157] font-sans"
                />
              </div>

              {quickNatal && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#052036]/15 text-center">
                  <div className="p-2 rounded-xl bg-[#FAF7F2]">
                    <span className="text-[9px] font-mono text-[#052036]/60 block uppercase">Sun</span>
                    <strong className="text-xs font-cormorant text-[#EAC157]">☉ {quickNatal.sunSign}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF7F2]">
                    <span className="text-[9px] font-mono text-[#052036]/60 block uppercase">Moon</span>
                    <strong className="text-xs font-cormorant text-[#052036]">☽ {quickNatal.moonSign}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF7F2]">
                    <span className="text-[9px] font-mono text-[#052036]/60 block uppercase">Rising</span>
                    <strong className="text-xs font-cormorant text-[#38bdf8]">AC {quickNatal.risingSign}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Card 3: Astrological Totem & Charms (Rabbit with Sunglasses) */}
            <div className="bg-white/90 p-5 rounded-3xl border border-[#052036]/10 shadow-[0_16px_36px_rgba(5,32,54,0.06)] space-y-3 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#052036]/60 font-bold">
                  Archetypal Totems
                </span>
                <span className="text-xs font-mono text-[#EAC157] font-bold">✦ Charms</span>
              </div>
              <div className="flex items-center justify-center py-2">
                <img
                  src="/stickers/pink-rabbit.png"
                  alt="Astrological Totem Card"
                  className="h-50 rounded-2xl object-contain"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#052036]/70 border-t border-[#052036]/10 pt-2">
                <span>Personal Placements</span>
                <span className="text-[#EAC157] font-bold">✦ Active Orbit</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 01 / AGAINST THE SCRIPT (Editorial Cartography Philosophy)        */}
        {/* ------------------------------------------------------------------ */}
        <section className="manifesto border-t border-[#052036]/10" id="why">
          <div className="section-shell manifesto-grid items-start">
            <div className="flex flex-col justify-start space-y-6">
              <div>
                <span className="eyebrow">01 / Against the script</span>
              </div>
              <div className="hidden lg:block pt-3 w-full max-w-[370px] xl:max-w-[430px]">
                <img
                  src="/stickers/look-closer-card.png"
                  alt="Astro Archive 07 — Look Closer"
                  className="w-full h-auto object-contain filter drop-shadow-[0_24px_45px_rgba(5,32,54,0.16)] select-none pointer-events-auto transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                />
              </div>
            </div>

            <div>
              <h2 className="display">Astrology is a mirror, not a muzzle.</h2>
              <div className="manifesto-copy">
                <p><strong>Most readings hand you a personality sticker.</strong> You are told you are intense, nurturing, analytical — then sent back into the same old room.</p>
                <p>I am more interested in what the chart makes difficult to ignore: the desire beneath the performance, the power you keep lending away, the contradiction that might become a choice.</p>
                <div className="manifesto-aside">Not prediction. Not diagnosis. A practice of noticing.</div>

                {/* Mobile / Tablet View */}
                <div className="lg:hidden mt-10 flex justify-center w-full">
                  <img
                    src="/stickers/look-closer-card.png"
                    alt="Astro Archive 07 — Look Closer"
                    className="w-full max-w-[310px] sm:max-w-[360px] h-auto object-contain filter drop-shadow-[0_18px_35px_rgba(5,32,54,0.14)] select-none pointer-events-auto transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* ASK YOUR CHART (Interactive AI Chat Demonstration)                 */}
        {/* ------------------------------------------------------------------ */}
        <section id="ask-your-chart" className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-[#052036]/10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#052036]/80 font-bold">
                <span className="text-[#EAC157]">✦</span>
                <span>ASK YOUR CHART</span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#052036] leading-[1.05]">
                Finally, an astrology app you can actually talk to.
              </h2>

              <p className="font-inter text-base sm:text-lg text-[#052036]/75 leading-relaxed font-normal">
                Ask anything, in plain language. Every answer is grounded in your real placements and today's transits — never a recycled sun-sign paragraph, and never a funnel to a paid human psychic.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-4 py-2 rounded-full bg-white border border-[#052036]/15 text-xs font-mono text-[#052036] shadow-sm">
                  Grounded in your chart
                </span>
                <span className="px-4 py-2 rounded-full bg-white border border-[#052036]/15 text-xs font-mono text-[#052036] shadow-sm">
                  Remembers the conversation
                </span>
                <span className="px-4 py-2 rounded-full bg-white border border-[#052036]/15 text-xs font-mono text-[#052036] shadow-sm">
                  Available 24/7
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Chat UI Card with Transparent Palm Star */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="absolute -top-8 -left-8 z-10 pointer-events-auto transform -rotate-12 hidden sm:block">
                <img
                  src="/stickers/palm-star.png"
                  alt="Palm Star Sticker"
                  className="w-20 h-auto filter drop-shadow-[0_15px_25px_rgba(5,32,54,0.2)] select-none mix-blend-multiply"
                />
              </div>

              <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(5,32,54,0.08)] border border-[#052036]/10 space-y-4 text-left relative z-0">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#052036]/10">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-xs">
                      ✦
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#052036]">Your chart</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-medium">online</span>
                </div>

                {/* Chat Bubbles */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex justify-end">
                    <div className="bg-[#052036] text-[#FAF9F6] px-4 py-3 rounded-2xl rounded-tr-xs max-w-[85%] leading-relaxed shadow-sm">
                      Why does this week feel so heavy?
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-[#f4eff7] text-[#052036] px-4 py-3 rounded-2xl rounded-tl-xs max-w-[90%] leading-relaxed">
                      Because it isn't in your head. Saturn is squaring your natal Moon in the 4th house right now — that combo tends to press on home, family, and your sense of security. It passes by Sunday.
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#052036] text-[#FAF9F6] px-4 py-3 rounded-2xl rounded-tr-xs max-w-[85%] leading-relaxed shadow-sm">
                      Is it a bad time to start something?
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-[#f4eff7] text-[#052036] px-4 py-3 rounded-2xl rounded-tl-xs max-w-[90%] leading-relaxed">
                      For anything emotional or domestic, wait. But Mercury is trining your Midheaven — work and ideas have a clear runway. Start there.
                    </div>
                  </div>
                </div>

                {/* Input Bar Preview */}
                <div className="pt-2">
                  <div className="flex items-center justify-between px-4 py-3 rounded-full bg-[#FAF7F2] border border-[#052036]/15">
                    <span className="text-xs text-[#052036]/40 font-sans">Ask your chart anything...</span>
                    <button
                      onClick={() => go("askai")}
                      className="w-7 h-7 rounded-full bg-[#EAC157] text-[#052036] flex items-center justify-center font-bold hover:bg-[#d9b048] transition-all cursor-pointer shadow"
                    >
                      ↑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>        {/* ------------------------------------------------------------------ */}
        {/* 02 / THE 6 MOVEMENTS: THE ILLUSTRATED MEMOIR                       */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F3ECE1] text-[#052036] border-t border-[#052036]/10" id="story">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#052036]/20 bg-white/70 text-xs font-mono tracking-widest text-[#052036] uppercase mb-3">
                  <span className="text-[#C89B3C]">✦</span>
                  <span>02 / The Illustrated Memoir</span>
                </div>
                <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-[#052036] font-normal leading-[1.02]">
                  Knowing what was<br /><span className="italic">previously unknown.</span>
                </h2>
              </div>
              <p className="font-inter text-sm sm:text-base text-[#052036]/75 max-w-sm leading-relaxed font-normal">
                Six movements through your interior architecture — from the emotions you swallow in silence to the cold peace of walking away.
              </p>
            </div>

            <div className="divide-y divide-[#052036]/15 border-y border-[#052036]/15">
              {STORY_CHAPTERS.map((chapter) => (
                <div
                  className="py-7 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center cursor-pointer group hover:bg-white/50 px-4 -mx-4 rounded-2xl transition-all duration-300"
                  key={chapter.numeral}
                  onClick={() => go("onboarding")}
                >
                  <div className="md:col-span-1 text-[#C89B3C] font-mono text-base sm:text-lg font-bold">
                    {chapter.numeral}
                  </div>
                  <div className="md:col-span-5 space-y-1">
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#052036] group-hover:text-[#8C6B1B] transition-colors">
                      {chapter.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#8C6B1B] uppercase tracking-wider block font-bold">
                      ✦ {chapter.theme}
                    </span>
                  </div>
                  <div className="md:col-span-5 font-cormorant italic text-base sm:text-lg text-[#052036]/80 leading-snug">
                    "{chapter.quote}"
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                    <span className="w-9 h-9 rounded-full bg-white/80 border border-[#052036]/10 flex items-center justify-center text-[#052036] group-hover:bg-[#052036] group-hover:text-white transition-all">
                      <Arrow />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* ------------------------------------------------------------------ */}
        {/* TRANSIT CALENDAR (Screenshot 2 Design)                              */}
        {/* ------------------------------------------------------------------ */}
        <section id="transits" className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-[#052036]/10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Visual: Soft Lavender Card with Transparent Palm Sticker */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-md aspect-square bg-[#eeeaf4] rounded-3xl p-8 flex items-center justify-center relative shadow-sm overflow-hidden border border-[#052036]/5">
                <div className="relative transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/stickers/palm-star.png"
                    alt="Transit Palm Sticker"
                    className="w-48 sm:w-56 h-auto filter drop-shadow-[0_20px_35px_rgba(5,32,54,0.18)] select-none mix-blend-multiply"
                  />
                  <span className="absolute -top-4 -right-4 text-[#EAC157] text-2xl animate-pulse">✦</span>
                  <span className="absolute bottom-2 -left-4 text-[#EAC157] text-xl">✦</span>
                </div>
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#052036]/80 font-bold">
                <span className="text-[#EAC157]">✦</span>
                <span>TRANSIT CALENDAR</span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#052036] leading-[1.05]">
                Know your best days <span className="italic">before they arrive.</span>
              </h2>

              <p className="font-inter text-base sm:text-lg text-[#052036]/75 leading-relaxed font-normal">
                We precompute your transits for the next 90 days and score each one for love, money, and communication — so you can plan the big conversation, the launch, or the first date for a day the sky is on your side.
              </p>

              <div className="space-y-3 pt-2 font-sans text-xs sm:text-sm text-[#052036]">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>Color-coded good and challenging days</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>Scored by category: love, money, focus</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>Curated rules, consistent every time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* TRANSIT JOURNALING (NEW SECTION from Screenshot 2)                 */}
        {/* ------------------------------------------------------------------ */}
        <section id="journaling" className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-[#052036]/10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Visual: Warm Beige Card with Artistic Portrait Sticker */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md aspect-square bg-[#F5E9CE] rounded-3xl p-8 flex items-center justify-center relative shadow-sm overflow-hidden border border-[#052036]/5">
                <div className="relative transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <img
                    src="/stickers/journal-portrait.png"
                    alt="Artistic Transit Journaling Portrait"
                    className="max-h-64 sm:max-h-72 w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(5,32,54,0.12)] select-none mix-blend-multiply transform -rotate-2"
                  />
                  <span className="absolute -top-3 -right-3 text-[#EAC157] text-2xl animate-pulse">✦</span>
                </div>
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#052036]/80 font-bold">
                <span className="text-[#EAC157]">✦</span>
                <span>TRANSIT JOURNALING</span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#052036] leading-[1.05]">
                Track how the sky <span className="italic">actually lands.</span>
              </h2>

              <p className="font-inter text-base sm:text-lg text-[#052036]/75 leading-relaxed font-normal">
                Log a mood or a note and we auto-tag it with the day's transits. After a few weeks, AstroFindings surfaces your own patterns — 'you tend to feel restless during Mars transits' — turning astrology into self-knowledge you can prove.
              </p>

              <div className="space-y-3 pt-2 font-sans text-xs sm:text-sm text-[#052036]">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>Entries auto-tagged with live transits</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>Personal patterns revealed over time</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>Private by default, encrypted at rest</span>
                </div>
              </div>
            </div>
          </div>
        </section>{/* ------------------------------------------------------------------ */}
        {/* COMPATIBILITY (Screenshot 1 Design with Cutout Heart Sticker)       */}
        {/* ------------------------------------------------------------------ */}
        <section id="compatibility" className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-[#052036]/10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#052036]/80 font-bold">
                <span className="text-[#EAC157]">✦</span>
                <span>COMPATIBILITY</span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#052036] leading-[1.05]">
                See what's really <span className="italic">between you.</span>
              </h2>

              <p className="font-inter text-base sm:text-lg text-[#052036]/75 leading-relaxed font-normal">
                Add someone's birth details and we compute the synastry between both charts — where you click, where you clash, and an honest overall score. It's the reading everyone screenshots and sends to the group chat.
              </p>

              <div className="space-y-3 pt-2 font-sans text-xs sm:text-sm text-[#052036]">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>Real chart-to-chart synastry aspects</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>Strengths and friction, not just a number</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                    ✦
                  </span>
                  <span>One tap to share the result</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Soft Blush Container with Floating Transparent Heart Sticker */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md aspect-square bg-[#f5edf0] rounded-3xl p-8 flex items-center justify-center relative shadow-sm overflow-hidden border border-[#052036]/5">
                <div className="relative transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/stickers/heart-eye.png"
                    alt="Sacred Heart with Eye Sticker"
                    className="w-52 sm:w-64 h-auto filter drop-shadow-[0_20px_40px_rgba(5,32,54,0.18)] select-none mix-blend-multiply transform -rotate-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ------------------------------------------------------------------ */}
        {/* 03 / REAL CROSSROADS (Short & Concise Editorial Format)             */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-14 md:py-20 px-6 md:px-12 bg-[#FAF6F0] text-[#052036] border-t border-[#052036]/10" id="dilemmas">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#052036]/20 bg-white/80 text-xs font-mono tracking-widest text-[#052036] uppercase mb-2">
                  <span className="text-[#C89B3C]">✦</span>
                  <span>03 / REAL CROSSROADS</span>
                </div>
                <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#052036] font-normal leading-tight">
                  Tough crossroads. <span className="italic">Honest mirrors.</span>
                </h2>
              </div>
              <p className="font-inter text-xs sm:text-sm text-[#052036]/70 max-w-sm leading-relaxed">
                Decoded through the planetary tension of your birth chart — read straight through:
              </p>
            </div>

            {/* Concise 3-Column Dilemma Mirrors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {DILEMMA_MIRRORS.slice(0, 3).map((d) => (
                <div
                  key={d.id}
                  className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-[#052036]/10 shadow-[0_8px_20px_rgba(5,32,54,0.03)] hover:border-[#C89B3C]/50 transition-all duration-200 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#052036]/10">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF4EA] text-[10px] font-mono uppercase tracking-wider text-[#052036] font-bold">
                        <span className="text-[#C89B3C]">✦</span> {d.stampNote.split("//")[0].trim()}
                      </span>
                      <span className="text-[10px] font-mono text-[#8C6B1B] font-semibold">
                        🪐 {d.anchor.split("vs.")[0].trim()}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-cormorant text-lg sm:text-xl text-[#052036] font-semibold italic leading-snug">
                        {d.trigger}
                      </h3>
                    </div>

                    <p className="font-inter text-xs text-[#052036]/75 leading-relaxed line-clamp-3">
                      {d.glimpseOfTruth}
                    </p>

                    <div className="p-3 rounded-xl bg-[#FAF6EE] border-l-2 border-[#C89B3C]">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C6B1B] block font-bold mb-0.5">
                        The Question You Avoid
                      </span>
                      <p className="font-cormorant text-sm text-[#052036] font-medium italic leading-snug">
                        "{d.lingeringQuestion}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#052036]/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#052036]/50">{d.tag}</span>
                    <button
                      onClick={() => go("onboarding")}
                      className="text-[11px] font-mono uppercase tracking-wider text-[#052036] font-bold hover:text-[#8C6B1B] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Decode sky</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ------------------------------------------------------------------ */}
        {/* ✦ DAILY WEATHER FOR EVERY SIGN (Visual Zodiac Stickers Gallery)     */}
        {/* ------------------------------------------------------------------ */}
        <section id="daily-signs" className="py-14 md:py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-[#052036]/10 relative">
          {/* Subtle Celestial Sticker Flank Decoration */}
          <div className="hidden lg:block absolute -top-10 right-4 pointer-events-none opacity-40 transform rotate-12">
            <img src="/stickers/cosmic-eye-orbit.png" alt="Cosmic Eye" className="w-24 h-auto mix-blend-multiply select-none" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 text-left">
            <div>
              <span className="text-xs font-mono text-[#052036]/80 uppercase tracking-widest block font-bold mb-1">
                ✦ DAILY WEATHER FOR EVERY SIGN
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#052036] font-normal leading-tight">
                Today's celestial tone: <span className="italic font-normal">Moon in Sagittarius</span>
              </h2>
            </div>
            <p className="text-xs font-mono text-[#052036]/60 max-w-xs">
              Tap your zodiac talisman sticker to reveal today's reading
            </p>
          </div>

          {/* 12 Visual Zodiac Stickers Grid / Shelf */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 mb-8">
            {ZODIAC_DAILY_GUIDANCE.map((z, idx) => {
              const isSelected = (selectedDailySign || "Sagittarius") === z.sign;
              const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-3", "rotate-1"];
              const tilt = tilts[idx % tilts.length];

              return (
                <div
                  key={z.sign}
                  onClick={() => setSelectedDailySign(z.sign)}
                  className={`group relative p-3 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center select-none ${
                    isSelected
                      ? "bg-white shadow-[0_12px_28px_rgba(5,32,54,0.12)] ring-2 ring-[#EAC157] scale-105 z-10"
                      : "bg-white/60 hover:bg-white/95 hover:shadow-[0_8px_20px_rgba(5,32,54,0.06)] border border-[#052036]/8 hover:scale-102"
                  }`}
                >
                  {/* Active Celestial Dot */}
                  {isSelected && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#EAC157] text-[#052036] text-[9px] flex items-center justify-center font-bold shadow-sm animate-pulse">
                      ✦
                    </span>
                  )}

                  {/* Physical Sticker Graphic with Drop Shadow and Tilt */}
                  <div className={`w-16 sm:w-20 aspect-square flex items-center justify-center transition-transform duration-300 transform group-hover:rotate-0 group-hover:scale-110 ${tilt}`}>
                    <img
                      src={z.sticker}
                      alt={`${z.sign} Zodiac Sticker`}
                      className="w-full h-full object-contain filter drop-shadow-[0_8px_14px_rgba(5,32,54,0.14)] pointer-events-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Sign Name and Glyph */}
                  <div className="mt-2">
                    <span className="font-cormorant text-base sm:text-lg font-semibold text-[#052036] block leading-none">
                      {z.sign}
                    </span>
                    <span className="text-[10px] font-mono text-[#052036]/50 block mt-0.5">
                      {z.glyph} · {z.element}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Zodiac Spotlight Reading Card */}
          {(() => {
            const activeSign = ZODIAC_DAILY_GUIDANCE.find(
              (z) => z.sign === (selectedDailySign || "Sagittarius")
            ) || ZODIAC_DAILY_GUIDANCE[8];

            return (
              <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-[#052036]/10 shadow-[0_14px_32px_rgba(5,32,54,0.05)] text-left flex flex-col md:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden">
                {/* Visual Sticker Feature Display */}
                <div className="shrink-0 flex flex-col items-center justify-center w-28 sm:w-36 aspect-square bg-[#FAF7F2] rounded-2xl p-3 border border-[#052036]/8 relative">
                  <img
                    src={activeSign.sticker}
                    alt={activeSign.sign}
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(5,32,54,0.18)] transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                  <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#052036] text-[#FAF9F6] text-[9px] font-mono uppercase tracking-wider font-bold shadow-sm">
                    {activeSign.glyph} {activeSign.sign}
                  </span>
                </div>

                {/* Horoscope Interpretation */}
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8C6B1B] font-bold">
                      ✦ {activeSign.theme}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#052036]/10 text-[#052036]/70">
                      {activeSign.dates} · {activeSign.element}
                    </span>
                  </div>

                  <p className="font-inter text-sm sm:text-base text-[#052036]/85 leading-relaxed font-normal">
                    {activeSign.guidance}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => go("onboarding")}
                      className="px-5 py-2.5 rounded-full bg-[#052036] text-[#FAF9F6] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#082842] transition-colors cursor-pointer shadow-sm"
                    >
                      Calculate in Your Birth Degrees →
                    </button>
                    <span className="text-[11px] font-mono text-[#052036]/50">
                      ✦ Live Swiss Ephemeris transit alignment
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* PRICING SECTION (NEW SECTION from Screenshots 1, 4, 5)             */}
        {/* ------------------------------------------------------------------ */}
        <section id="pricing" className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-[#052036]/10 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#052036]/80 font-bold">
              <span className="text-[#EAC157]">✦</span>
              <span>PRICING</span>
            </div>

            <h2 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-normal text-[#052036] leading-[1.02]">
              Start free. Upgrade when <br />
              <span className="italic font-normal">the sky gets interesting.</span>
            </h2>

            <p className="font-inter text-base sm:text-lg text-[#052036]/75 max-w-xl mx-auto leading-relaxed font-normal">
              No confusing bills, no surprise renewals — cancel in two taps, anytime.
            </p>
          </div>

          {/* Dual Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch text-left">
            {/* Free Tier Card */}
            <div className="bg-white/95 rounded-3xl p-8 sm:p-10 border border-[#052036]/10 shadow-[0_16px_36px_rgba(5,32,54,0.06)] flex flex-col justify-between">
              <div>
                <h3 className="font-cormorant text-3xl font-bold text-[#052036] mb-1">Free</h3>
                <p className="text-xs font-inter text-[#052036]/70 mb-6">
                  Everything you need to meet your chart.
                </p>

                <div className="flex items-baseline gap-2 mb-8 border-b border-[#052036]/10 pb-6">
                  <span className="font-cormorant text-5xl font-bold text-[#052036]">$0</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#052036]/60">forever</span>
                </div>

                <ul className="space-y-4 font-sans text-xs sm:text-sm text-[#052036]">
                  {[
                    "Full birth chart, computed once",
                    "Personalized daily reading",
                    "Interactive chart wheel",
                    '3 "ask your chart" questions a day',
                    "Compatibility teaser score",
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#052036] text-[#EAC157] flex items-center justify-center text-[10px] shrink-0 font-bold">
                        ✦
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-10">
                <button
                  onClick={() => go("onboarding")}
                  className="w-full py-4 rounded-full bg-[#052036] text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase hover:bg-[#082842] transition-all shadow-md cursor-pointer text-center"
                >
                  Build my free chart
                </button>
              </div>
            </div>

            {/* Premium Tier Card (Most Loved) */}
            <div className="bg-[#052036] text-[#FAF9F6] rounded-3xl p-8 sm:p-10 border-2 border-[#EAC157]/40 shadow-2xl relative flex flex-col justify-between">
              {/* Badge */}
              <div className="absolute -top-3.5 left-8">
                <span className="px-3.5 py-1 rounded-full bg-[#EAC157] text-[#052036] text-[10px] font-mono uppercase tracking-wider font-bold shadow-md">
                  MOST LOVED
                </span>
              </div>

              <div>
                <h3 className="font-cormorant text-3xl font-bold text-[#FAF9F6] mb-1">Premium</h3>
                <p className="text-xs font-inter text-[#FAF9F6]/70 mb-6">
                  The whole sky, unlocked.
                </p>

                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-6">
                  <span className="font-cormorant text-5xl font-bold text-[#EAC157]">$8.99</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FAF9F6]/70">per month, or $59.99/yr</span>
                </div>

                <ul className="space-y-4 font-sans text-xs sm:text-sm text-[#FAF9F6]">
                  {[
                    'Unlimited "ask your chart" chat',
                    "Weekly & monthly forecasts",
                    "Best-days transit calendar",
                    "Full compatibility reports",
                    "Transit journaling & pattern insights",
                    "Shareable reading cards",
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#EAC157] text-[#052036] flex items-center justify-center text-[10px] shrink-0 font-bold">
                        ✦
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-10">
                <button
                  onClick={() => go("onboarding")}
                  className="w-full py-4 rounded-full bg-[#EAC157] text-[#052036] font-bold text-xs tracking-wider uppercase hover:bg-[#d9b048] transition-all shadow-lg hover:shadow-xl cursor-pointer text-center"
                >
                  Start 7-day free trial
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 05 / QUESTIONS AT THE THRESHOLD (Designed in Section 04 Style)     */}
        {/* ------------------------------------------------------------------ */}
        <section className="threshold border-t border-[#052036]/10" id="questions">
          <div className="section-shell">
            <span className="eyebrow" style={{ color: "#052036", opacity: 0.8 }}>
              05 / Questions at the threshold
            </span>
            <h2 className="display">Still skeptical? <em>Good.</em></h2>
            <div className="threshold-grid">
              <div>
                <p className="threshold-lede">
                  AstroFindings (astrofindings.com) is dedicated to clean, honest self-inquiry without cosmic pretension. You do not need to believe in astrology. You need only be willing to look at your patterns without turning them into a prison.
                </p>
                <div className="mt-8 space-y-3 font-mono text-xs text-[#163750]">
                  <div className="flex items-center gap-3">
                    <span className="text-[#EAC157] font-bold text-sm">✦</span>
                    <span>Curiosity over certainty.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#EAC157] font-bold text-sm">✦</span>
                    <span>Agency over inevitability.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#EAC157] font-bold text-sm">✦</span>
                    <span>Specific questions over cosmic fog.</span>
                  </div>
                </div>
              </div>

              <div className="threshold-list">
                {faq.map((x, i) => (
                  <div className="border-b border-[rgba(5,32,54,0.18)] py-4 transition-all" key={x[0]}>
                    <button
                      className="w-full flex items-center justify-between text-left cursor-pointer group text-[#052036] hover:text-[#082842] py-1"
                      onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                      aria-expanded={openQuestion === i}
                    >
                      <span className="font-serif text-lg md:text-xl font-bold leading-snug text-[#052036] group-hover:text-[#b8860b] transition-colors pr-4">
                        {x[0]}
                      </span>
                      <span className="text-[#052036] font-mono text-xl font-bold shrink-0 ml-2">
                        {openQuestion === i ? "−" : "+"}
                      </span>
                    </button>
                    {openQuestion === i && (
                      <div className="pt-3 pb-2 text-sm text-[#163750] leading-relaxed font-sans border-l-2 border-[#EAC157] pl-4 mt-2">
                        <p>{x[1]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER (Cosmic Gold Background with Deep Space Text & Pill Button)  */}
      {/* ------------------------------------------------------------------ */}
      <footer className="closing">
        <div className="section-shell closing-inner">
          <div className="mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="AstroFindings Home">
            <img src={darkLogo} alt="AstroFindings" className="h-9.5 w-auto select-none inline-block align-middle" />
          </div>
          <span className="eyebrow block mb-6 text-xs font-sans font-semibold tracking-[0.22em] uppercase text-[#052036]/80">
            The door is open
          </span>
          <h2 className="display">Come with a question.<br /><em>Leave with a choice.</em></h2>
          <div className="closing-actions">
            <button className="button-dark cursor-pointer" onClick={() => go("onboarding")}>
              Begin Your Journey of Discovery <Arrow />
            </button>
            <button className="button-quiet cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back to the beginning ↑
            </button>
          </div>
          <div className="footer-line">
            <span>AstroFindings © 2026</span>
            <span>astrofindings.com / Self-guided astrological cartography</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
