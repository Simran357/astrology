"use client";

import { useState } from "react";
import AstroFindingsLogo from "../components/AstroFindingsLogo";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block shrink-0 ml-1">
    <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Down = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block shrink-0 ml-1">
    <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function HomePage({ onNavigate }: HomePageProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDilemma, setSelectedDilemma] = useState<string>("golden_handcuffs");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const activeDilemma = DILEMMA_MIRRORS.find((d) => d.id === selectedDilemma) || DILEMMA_MIRRORS[0];

  const go = (page: string) => {
    setMobileOpen(false);
    onNavigate(page);
  };

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
    <div className="home-root selection:bg-[#EAC157] selection:text-[#052036]">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER & NAVIGATION (Brand Logo + Pill CTA)                        */}
      {/* ------------------------------------------------------------------ */}
      <header className="site-header">
        <div className="cursor-pointer" onClick={() => go("home")}>
          <AstroFindingsLogo size="sm" variant="dark" />
        </div>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#why">Against the Script</a>
          <a href="#story">The 6 Movements</a>
          <a href="#dilemmas">The Dilemmas</a>
          <a href="#about">The Philosophy</a>
          <a href="#questions">FAQ</a>
        </nav>

        <button className="header-cta cursor-pointer" onClick={() => go("onboarding")}>
          Begin Discovery →
        </button>
        <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? "×" : "☰"}
        </button>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav is-open">
          <a href="#why" onClick={() => setMobileOpen(false)}>Against the Script</a>
          <a href="#story" onClick={() => setMobileOpen(false)}>The 6 Movements</a>
          <a href="#dilemmas" onClick={() => setMobileOpen(false)}>The Dilemmas</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>The Philosophy</a>
          <a href="#questions" onClick={() => setMobileOpen(false)}>FAQ</a>
          <button className="button-primary w-full cursor-pointer" onClick={() => go("onboarding")}>
            Begin Discovery →
          </button>
        </nav>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* HERO SECTION: BRAND GUIDE DARK THEME                                */}
      {/* "Same Stars. A Brighter You."                                      */}
      {/* ------------------------------------------------------------------ */}
      <main>
              <section className="hero" id="top">
        <div className="section-shell hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">00 / A private practice in public</div>
            <h1 className="display">Your chart<br/>is not your <em>fate.</em></h1>
            <p className="hero-lede">I read the sky as a language of pressure, longing, and choice. No horoscopes. No cosmic customer service. Just a sharper story about the life you are already living.</p>
            <div className="hero-actions">
              <button className="button-primary cursor-pointer" onClick={() => go("onboarding")}>Decode your birth sky <Arrow/></button>
              <a className="button-quiet" href="#story">How I read <Down/></a>
            </div>
            <p className="hero-note">For the curious, the skeptical, and the suspiciously self-aware.</p>
          </div>
          <div className="hero-art">
            <div className="orbit"><span className="orbit-line"/><span className="orbit-dot"/><span className="orbit-dot sage"/></div>
            <span className="hero-side-label">A study in contradiction</span>
            <div className="chart-card">
              <div className="chart-top"><span>Case 0047</span><span>Mutable / fixed</span></div>
              <svg className="chart-glyph" viewBox="0 0 190 146" fill="none">
                <circle cx="95" cy="73" r="55" stroke="hsl(42 33% 89%/.6)"/><circle cx="95" cy="73" r="35" stroke="hsl(163 31% 58%/.8)"/>
                <path d="M40 73h110M95 18v110M56 34l78 78M134 34 56 112" stroke="hsl(42 72% 69%/.55)"/>
                <path d="M95 18 134 34 150 73 126 116 71 122 40 73 56 34z" stroke="hsl(16 79% 61%/.95)" strokeWidth="1.5"/>
                <circle cx="95" cy="18" r="4" fill="hsl(16 79% 61%)"/><circle cx="150" cy="73" r="4" fill="hsl(163 31% 58%)"/><circle cx="71" cy="122" r="4" fill="hsl(42 72% 69%)"/>
              </svg>
              <h2 className="serif">The useful<br/>discomfort.</h2><p>A reading is not a verdict. It is a room with better lighting.</p>
            </div>
          </div>
        </div>
      </section>

        {/* ------------------------------------------------------------------ */}
        {/* 01 / AGAINST THE SCRIPT (Light Theme Showcase)                    */}
        {/* "Discover Clarity in Every Chapter"                               */}
        {/* ------------------------------------------------------------------ */}
        <section className="manifesto" id="why">
          <div className="section-shell manifesto-grid">
            <div><span className="eyebrow">01 / Against the script</span></div>
            <div>
              <h2 className="display">Astrology is a mirror, not a muzzle.</h2>
              <div className="manifesto-copy">
                <p><strong>Most readings hand you a personality sticker.</strong> You are told you are intense, nurturing, analytical — then sent back into the same old room.</p>
                <p>I am more interested in what the chart makes difficult to ignore: the desire beneath the performance, the power you keep lending away, the contradiction that might become a choice.</p>
                <div className="manifesto-aside">Not prediction. Not diagnosis. A practice of noticing.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 02 / THE 6 MOVEMENTS: RENDERED IN THE METHOD ROW UI                */}
        {/* ------------------------------------------------------------------ */}
        <section className="method border-t border-[rgba(234,193,87,0.2)]" id="story">
          <div className="section-shell">
            <div className="method-intro">
              <div>
                <span className="eyebrow">02 / The Illustrated Memoir</span>
                <h2 className="display">Knowing what was<br />previously unknown.</h2>
              </div>
              <p>Six movements through your interior architecture — from the emotions you swallow in silence to the cold peace of walking away.</p>
            </div>

            <div className="method-list">
              {STORY_CHAPTERS.map((chapter) => (
                <div
                  className="method-row cursor-pointer group"
                  key={chapter.numeral}
                  onClick={() => go("onboarding")}
                >
                  <span className="method-number">{chapter.numeral}</span>
                  <div>
                    <h3>{chapter.title}</h3>
                    <span className="text-[11px] font-sans text-[#EAC157] font-semibold uppercase tracking-wider block mt-1">
                      {chapter.theme}
                    </span>
                  </div>
                  <p className="font-serif italic text-[#FAF9F6]">
                    "{chapter.quote}"
                  </p>
                  <Arrow />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 03 / INTERACTIVE MIRROR: WHAT KEEPS YOU UP TONIGHT?                */}
        {/* ------------------------------------------------------------------ */}
        <section className="threshold" id="dilemmas">
          <div className="section-shell">
            <div className="max-w-2xl mb-10 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#052036]/30 bg-[#FAF9F6] text-[10px] font-sans uppercase tracking-widest text-[#052036] font-bold mb-3">
                <span> 03 / REAL CROSSROADS</span>
              </div>
              <h2 className="display" style={{ marginBottom: "16px" }}>Tough crossroads.</h2>
              <p className="threshold-lede text-base font-medium text-[#052036]/90" style={{ marginTop: "10px" }}>
                When staying destroys you and leaving costs everything. Select the standoff keeping you awake tonight:
              </p>
            </div>

            {/* Selector Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {DILEMMA_MIRRORS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDilemma(d.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedDilemma === d.id
                      ? "bg-[#052036] text-[#FAF9F6] shadow-md border-2 border-[#EAC157] font-bold"
                      : "bg-[#052036]/10 hover:bg-[#052036]/20 text-[#052036] border border-[#052036]/20 font-semibold"
                  }`}>
                  {d.tag}
                </button>
              ))}
            </div>

            {/* Dilemma Mirror Box */}
            <div className="editorial-card border-2 border-[rgba(234,193,87,0.45)] bg-[#052036] text-[#FAF9F6] p-6 md:p-8 rounded-xl space-y-6 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(234,193,87,0.25)] pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[#EAC157] bg-[#082842] text-[10px] font-sans text-[#EAC157] uppercase tracking-wider font-bold">
                  <span>{activeDilemma.stampNote}</span>
                </div>
                <span className="text-[10px] font-sans text-[#c5d3df] tracking-widest uppercase font-bold">
                  {activeDilemma.anchor}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#c5d3df] block font-bold mb-1">
                    The Real-World Dilemma
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#FAF9F6] leading-snug font-bold italic">
                    {activeDilemma.trigger}
                  </h3>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#c5d3df] block font-bold mb-1">
                    The Psychological Truth:
                  </span>
                  <p className="text-sm md:text-base text-[#FAF9F6]/90 leading-relaxed font-normal">
                    {activeDilemma.glimpseOfTruth}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg border-l-4 border-[#EAC157] bg-[rgba(234,193,87,0.12)] space-y-2">
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#EAC157] block font-bold">
                  The Hard Question You Keep Avoiding
                </span>
                <p className="font-serif text-xl md:text-2xl text-[#FAF9F6] font-bold italic leading-snug">
                  "{activeDilemma.lingeringQuestion}"
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4">
                <p className="text-xs text-[#c5d3df] font-sans">
                  Your birth chart holds the exact planetary degrees driving this dynamic.
                </p>
                <button
                  onClick={() => go("onboarding")}
                  className="button-primary cursor-pointer text-xs font-bold whitespace-nowrap">
                  Decode in Your Birth Sky →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 04 / BEFORE YOU CROSS THE THRESHOLD                                */}
        {/* ------------------------------------------------------------------ */}
        <section className="threshold" id="threshold">
          <div className="section-shell">
            <span className="eyebrow" style={{ color: "#052036", opacity: 0.8 }}>
              04 / Before you cross the threshold
            </span>
            <h2 className="display">Bring the question you keep making smaller.</h2>
            <div className="threshold-grid">
              <p className="threshold-lede">
                You do not need to believe in astrology. You need only be willing to look at your patterns without turning them into a prison.
              </p>
              <div className="threshold-list">
                {["Curiosity over certainty.", "Agency over inevitability.", "Specific questions over cosmic fog."].map((x) => (
                  <div className="threshold-item" key={x}>
                    <span className="text-[#EAC157] font-bold">✦</span>
                    <p>{x}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 05 / FAQ                                                           */}
        {/* ------------------------------------------------------------------ */}
        <section className="faq" id="questions">
          <div className="section-shell faq-grid">
            <div className="faq-intro">
              <span className="eyebrow">05 / Questions at the threshold</span>
              <h2 className="display">Still skeptical?<br />Good.</h2>
              <p className="text-xs text-[#c5d3df] mt-2 leading-relaxed">
                AstroFindings (astrofindings.com) is dedicated to clean, honest self-inquiry without cosmic pretension.
              </p>
            </div>
            <div className="faq-list">
              {faq.map((x, i) => (
                <div className="faq-item" key={x[0]}>
                  <button
                    className="faq-trigger cursor-pointer"
                    onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                    aria-expanded={openQuestion === i}>
                    <span>{x[0]}</span>
                    <span className="text-[#EAC157] text-xl">{openQuestion === i ? "−" : "+"}</span>
                  </button>
                  <div className={`faq-answer ${openQuestion === i ? "is-open" : ""}`}>
                    <p>{x[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER (Cosmic Gold Background with Deep Space Text & Pill Button)  */}
      {/* ------------------------------------------------------------------ */}
      <footer className="closing">
        <div className="section-shell closing-inner">
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
