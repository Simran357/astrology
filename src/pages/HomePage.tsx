import { useState } from "react";

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
    id: "silence",
    tag: "The Unsaid Words",
    trigger: "They went quiet, and my pride won't let me text first.",
    glimpseOfTruth:
      "Silence between two people is never empty — it is active friction. You let them all the way into your private orbit, and when they pulled back, your instinct was not to ask, but to freeze. You pretend you don't care while replaying every sentence in the dark.",
    lingeringQuestion:
      "Are you genuinely waiting for them to reach out, or are you waiting for permission to stop holding space for a ghost?",
    anchor: "7th House Descendant & Venus-Mars Boundary Axis",
    stampNote: "POSTMARK // 7TH HOUSE POLARITY",
  },
  {
    id: "career_hollow",
    tag: "The Career Crossroads",
    trigger: "I perform competence at work, but I feel hollow and terrified of wasting my life.",
    glimpseOfTruth:
      "You are exhausted not because you lack talent, but because you've been succeeding inside a container you outgrew twelve months ago. You are so terrified of failing at what you actually care about that you keep over-performing at things that don't matter to you at all.",
    lingeringQuestion:
      "If you stopped worrying about looking foolish, what is the exact leap you would take by tomorrow morning?",
    anchor: "10th House Midheaven & Saturn Threshold Cycles",
    stampNote: "POSTMARK // 10TH HOUSE MIDHEAVEN",
  },
  {
    id: "detachment_armor",
    tag: "The Ice Wall",
    trigger: "I pull away the second someone gets close enough to see my real mess.",
    glimpseOfTruth:
      "Your detachment isn't coldness — it is an emergency brake your nervous system built after being dropped in the past. You unclip your heart from the cable car before the other person has the chance to let go. It feels like control, but it leaves you standing in an empty cathedral.",
    lingeringQuestion:
      "Who did you quietly cut the cord on before they even knew you were dangling by a thread?",
    anchor: "12th House of Sanctuary & Chiron Silencing Aspects",
    stampNote: "POSTMARK // 12TH HOUSE SANCTUARY",
  },
  {
    id: "bond_doubts",
    tag: "The Fragile Circles",
    trigger: "If I stopped being the convenient listener, I wonder who would still check on me.",
    glimpseOfTruth:
      "You learned early that inclusion had a price tag: cheerfulness, usefulness, and never being needy. So you became the anchor for everyone else. But love that requires continuous performance is not love — it's an unpaid job.",
    lingeringQuestion:
      "Which friend would you call at 3 AM if everything fell apart, and why have you been hiding your struggle from them?",
    anchor: "11th House of Alliances & Tribal Belonging",
    stampNote: "POSTMARK // 11TH HOUSE ALLIANCE",
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
  const [selectedDilemma, setSelectedDilemma] = useState<string>("silence");
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
    <div className="home-root selection:bg-[#ee5d34] selection:text-[#0e0a17]">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER & NAVIGATION                                                */}
      {/* ------------------------------------------------------------------ */}
      <header className="site-header">
        <button className="brand cursor-pointer" onClick={() => go("home")}>
          <span className="brand-mark">AF</span>
          <span className="brand-name">AstroFindings</span>
        </button>

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
      {/* HERO SECTION: ORIGINAL LAYOUT & SVG ART (NO EXTERNAL PICTURES)      */}
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
              <button className="button-quiet cursor-pointer" onClick={() => go("chart")}>Interactive birth wheel <Arrow/></button>
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
        {/* 01 / AGAINST THE SCRIPT                                            */}
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
        <section className="method border-t border-[rgba(238,93,52,0.15)]" id="story">
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
                    <span className="text-[10px] font-mono text-[#ee5d34] uppercase tracking-wider block mt-1">
                      {chapter.theme}
                    </span>
                  </div>
                  <p className="font-serif italic text-[#eee5d3]">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-dashed border-[#0e0a17]/30 bg-[#eee5d3]/60 text-[10px] font-mono uppercase tracking-widest text-[#0e0a17] mb-3">
                <span>03 / THE INTERACTIVE MIRROR</span>
              </div>
              <h2 className="display" style={{ marginBottom: "28px" }}>Which unsaid ache is taking up space?</h2>
              <p className="threshold-lede" style={{ marginTop: "20px" }}>
                Select what you are secretly wrestling with tonight. You will receive an immediate glimpse of truth and the lingering question that guides your discovery.
              </p>
            </div>

            {/* Selector Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {DILEMMA_MIRRORS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDilemma(d.id)}
                  className={`px-4 py-2.5 rounded-sm text-xs font-serif transition-all duration-200 cursor-pointer ${
                    selectedDilemma === d.id
                      ? "bg-[#0e0a17] text-[#eee5d3] shadow-md border-2 border-[#ee5d34]"
                      : "bg-[#0e0a17]/10 hover:bg-[#0e0a17]/20 text-[#0e0a17] border border-[#0e0a17]/20"
                  }`}>
                  {d.tag}
                </button>
              ))}
            </div>

            {/* Dilemma Mirror Box */}
            <div className="editorial-card border border-[rgba(238,93,52,0.25)] bg-[#0e0a17] text-[#eee5d3] p-6 md:p-8 rounded-sm space-y-6 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(238,93,52,0.15)] pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-dashed border-[#ee5d34] bg-[#171126] text-[10px] font-mono text-[#ee5d34] uppercase tracking-wider rotate-[-1deg]">
                  <span>{activeDilemma.stampNote}</span>
                </div>
                <span className="text-[10px] font-mono text-[#bfb7aa] tracking-widest uppercase">
                  {activeDilemma.anchor}
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#bfb7aa] block">
                  The Raw Situation
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-[#eee5d3] leading-snug font-light">
                  "{activeDilemma.trigger}"
                </h3>
                <p className="text-sm text-[#eee5d3] leading-relaxed font-light pt-1">
                  {activeDilemma.glimpseOfTruth}
                </p>
              </div>

              <div className="p-5 rounded-sm border-l-2 border-[#ee5d34] bg-[rgba(238,93,52,0.06)] space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ee5d34] block font-semibold">
                  The Question That Lingers In The Dark
                </span>
                <p className="font-serif text-base md:text-lg text-[#eee5d3] italic leading-relaxed">
                  "{activeDilemma.lingeringQuestion}"
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#bfb7aa]">
                  Your natal wheel contains the exact planetary degree governing this cycle.
                </p>
                <button
                  onClick={() => go("onboarding")}
                  className="button-primary cursor-pointer text-xs whitespace-nowrap">
                  Decode This in Your Birth Sky →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 04 / A NOTE FROM THE DESK                                          */}
        {/* ------------------------------------------------------------------ */}
        <section className="interlude" id="about">
          <div className="section-shell interlude-copy">
            <span className="eyebrow">04 / A note from the desk</span>
            <p>I am not here to make the universe seem nicer than it is. I am here to make your relationship to uncertainty more interesting.</p>
            <p className="pull-quote">“The chart is an argument. We get to edit the footnotes.”</p>
          </div>
          <blockquote className="interlude-quote">
            The point is not to become <em>more cosmic.</em><br />
            It is to become harder to fool.
          </blockquote>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 05 / BEFORE YOU CROSS THE THRESHOLD                                */}
        {/* ------------------------------------------------------------------ */}
        <section className="threshold" id="threshold">
          <div className="section-shell">
            <span className="eyebrow" style={{ color: "hsl(259 30% 8%/.65)" }}>
              05 / Before you cross the threshold
            </span>
            <h2 className="display">Bring the question you keep making smaller.</h2>
            <div className="threshold-grid">
              <p className="threshold-lede">
                You do not need to believe in astrology. You need only be willing to look at your patterns without turning them into a prison.
              </p>
              <div className="threshold-list">
                {["Curiosity over certainty.", "Agency over inevitability.", "Specific questions over cosmic fog."].map((x) => (
                  <div className="threshold-item" key={x}>
                    <span>✦</span>
                    <p>{x}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 06 / FAQ                                                           */}
        {/* ------------------------------------------------------------------ */}
        <section className="faq" id="questions">
          <div className="section-shell faq-grid">
            <div className="faq-intro">
              <span className="eyebrow">06 / Questions at the threshold</span>
              <h2 className="display">Still skeptical?<br />Good.</h2>
              <p className="text-xs text-[#bfb7aa] mt-2 leading-relaxed">
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
                    <span>{openQuestion === i ? "−" : "+"}</span>
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
      {/* FOOTER                                                             */}
      {/* ------------------------------------------------------------------ */}
      <footer className="closing">
        <div className="section-shell closing-inner">
          <span className="eyebrow" style={{ color: "hsl(259 30% 8%/.65)" }}>The door is open</span>
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
