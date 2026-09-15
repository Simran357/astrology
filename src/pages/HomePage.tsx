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
    numeral: "Movement I",
    theme: "The Deep Ocean",
    title: "Why You Feel What You Feel",
    quote: "Your sensitivity is not a design flaw. It is an antenna registering frequencies others are too numb to detect.",
    text: "Have you ever walked into a room and absorbed the unspoken tension before a single word was spoken? For years, people told you to stop overthinking and not take things so hard. So you began treating your feelings like feral animals that needed to be caged in dark rooms. In your birth chart, the Moon and the Water houses remind you: you did not arrive here to feel lightly.",
    stamp: "4TH HOUSE TIDAL SANCTUARY",
    rotate: "rotate-[-1deg]",
  },
  {
    numeral: "Movement II",
    theme: "The Flight Response",
    title: "Why You Stay Away When Things Get Tough",
    quote: "You don't scream during conflict. You vanish.",
    text: "When emotional demands become overwhelming, your first instinct is retreat. You delay messages, cancel dinners, and pull the drawbridge up behind you. People assume you are indifferent or arrogant. The truth is far more tender: your nervous system runs out of fuse. You pull away before anyone has the opportunity to cast you aside.",
    stamp: "CHIRON SHIELD · SILENT RETREAT",
    rotate: "rotate-[1.5deg]",
  },
  {
    numeral: "Movement III",
    theme: "The Freeze",
    title: "Why You Shut Down",
    quote: "Silence was the only fortress that never gave them ammunition.",
    text: "There is a moment in difficult confrontations where your throat tightens, your eyes glaze over, and you watch yourself from five feet above your own body. You cannot form words. You aren't being stubborn — you are in biological freeze. You learned early that crying or pleading gave people weapons, so you traded your voice for an impenetrable wall of silence.",
    stamp: "MARS FREEZE · VOICE SURRENDER",
    rotate: "rotate-[-2deg]",
  },
  {
    numeral: "Movement IV",
    theme: "The Sacred Core",
    title: "Why You Fiercely Preserve What You Value",
    quote: "You guard your tenderness with the vigilance of a curator protecting an ancient scroll.",
    text: "You have parts of yourself that almost no one has ever witnessed: the music that makes you weep in traffic, your private notebooks, the ambitions you haven't dared whisper out loud. You protect these things because once you hand something holy to someone who treats it like disposable plastic, a piece of you fractures.",
    stamp: "2ND HOUSE · UNTOUCHABLE CORE",
    rotate: "rotate-[1deg]",
  },
  {
    numeral: "Movement V",
    theme: "The Mirror of Love",
    title: "How Relationships Treat You",
    quote: "You fall in love with potential because it gives you an audition to win.",
    text: "Notice the recurring script in your romantic history: you become the therapist, the safe harbor, the patient anchor for partners who never think to ask how your day went. You anticipate their storms while swallowing your own. Six months later, you sit across from them and feel completely alone.",
    stamp: "7TH HOUSE · THE UNPAID ANCHOR",
    rotate: "rotate-[-1.5deg]",
  },
  {
    numeral: "Movement VI",
    theme: "The Ice Wall",
    title: "What Detachment Feels Like to You",
    quote: "You don't break dishes. You simply lean back and unclip your heart.",
    text: "People think your detachment is cruel. They don't know the physical exhaustion that precedes it. Detachment is the moment the invisible thread snaps. From that second forward, they could plead or rage, and you would only observe them like a scientist behind double-glazed glass. It feels peaceful, but it leaves you alone in the cold.",
    stamp: "SATURN WALL · UNCLIPPED HEART",
    rotate: "rotate-[2deg]",
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
          <a href="#method">Method</a>
          <a href="#readings">Readings</a>
          <a href="#questions">FAQ</a>
          <button className="button-quiet cursor-pointer" onClick={() => go("chart")}>
            Calculate your birth chart <Arrow />
          </button>
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
          <a href="#method" onClick={() => setMobileOpen(false)}>Method</a>
          <a href="#readings" onClick={() => setMobileOpen(false)}>Readings</a>
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
              {/* Talismanic stamp badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-dashed border-[#ee5d34] bg-[#171126]/90 text-[10px] font-mono uppercase tracking-[0.2em] text-[#ee5d34] mb-4 rotate-[-1deg] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ee5d34] animate-ping" />
                <span>✦ TALISMAN NO. 01 · A STORY OF SELF-DISCOVERY</span>
              </div>

              <h1 className="display">
                You didn't arrive here by accident.<br />
                Something went <em>quiet</em>,<br />
                or won't stop <em>repeating.</em>
              </h1>

              <p className="hero-lede">
                An artist's memoir of knowing the unknown things inside you — why you pull away when things get heavy, why you shut down in confrontation, how love repeatedly wounds you, and what your detachment has been desperately trying to protect.
              </p>

              {/* Clarification banner: NO REAL ASTROLOGER CALLS */}
              <div className="p-3 border border-[rgba(238,93,52,0.25)] bg-[rgba(31,24,48,0.7)] rounded-sm text-xs text-[#bfb7aa] leading-relaxed mb-6 space-y-1">
                <span className="text-[#ee5d34] font-medium">[ 🏷️ 100% SELF-GUIDED SANCTUARY ]: </span>
                No human astrologers selling expensive consultation calls. Pure mathematical cartography of the emotional patterns you are already living.
              </div>

              <div className="hero-actions">
                <button className="button-primary cursor-pointer" onClick={() => go("onboarding")}>
                  Begin Your Self-Discovery <Arrow />
                </button>
                <a className="button-quiet" href="#dilemmas">
                  What Keeps You Up Tonight? <Down />
                </a>
                <button className="button-quiet cursor-pointer" onClick={() => go("chart")}>
                  Calculate your birth chart <Arrow />
                </button>
              </div>

              <p className="hero-note">For the curious, the skeptical, and the suspiciously self-aware.</p>
            </div>

            {/* Original CSS/SVG hero art (No external images) */}
            <div className="hero-art">
              <div className="orbit">
                <span className="orbit-line" />
                <span className="orbit-dot" />
                <span className="orbit-dot sage" />
              </div>
              <span className="hero-side-label">A study in contradiction</span>
              <div className="chart-card">
                <div className="chart-top">
                  <span>Case 0047</span>
                  <span>Mutable / fixed</span>
                </div>
                <svg className="chart-glyph" viewBox="0 0 190 146" fill="none">
                  <circle cx="95" cy="73" r="55" stroke="hsl(42 33% 89%/.6)" />
                  <circle cx="95" cy="73" r="35" stroke="hsl(163 31% 58%/.8)" />
                  <path d="M40 73h110M95 18v110M56 34l78 78M134 34 56 112" stroke="hsl(42 72% 69%/.55)" />
                  <path d="M95 18 134 34 150 73 126 116 71 122 40 73 56 34z" stroke="hsl(16 79% 61%/.95)" strokeWidth="1.5" />
                  <circle cx="95" cy="18" r="4" fill="hsl(16 79% 61%)" />
                  <circle cx="150" cy="73" r="4" fill="hsl(163 31% 58%)" />
                  <circle cx="71" cy="122" r="4" fill="hsl(42 72% 69%)" />
                </svg>
                <h2 className="serif">The useful<br />discomfort.</h2>
                <p>A reading is not a verdict. It is a room with better lighting.</p>
              </div>
            </div>
          </div>
          <div className="scroll-cue"><span /> Scroll to disturb the pattern</div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 01 / AGAINST THE SCRIPT (ORIGINAL SECTION)                         */}
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
        {/* 02 / THE 6 MOVEMENTS: AN ARTIST EXPLAINING YOUR PATTERNS           */}
        {/* ------------------------------------------------------------------ */}
        <section className="manifesto border-t border-[rgba(238,93,52,0.15)]" id="story">
          <div className="section-shell">
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-dashed border-[rgba(238,93,52,0.3)] bg-[rgba(31,24,48,0.7)] text-[10px] font-mono uppercase tracking-widest text-[#ee5d34] mb-3">
                <span>✦ 02 / THE ILLUSTRATED MEMOIR</span>
              </div>
              <h2 className="display">Knowing what was previously unknown.</h2>
              <p className="text-sm text-[#bfb7aa] mt-3 leading-relaxed">
                Walk through the six movements of your interior architecture. From the emotions you swallow in silence to the cold peace of walking away.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STORY_CHAPTERS.map((chapter, idx) => (
                <article
                  key={idx}
                  className="editorial-card border border-[rgba(238,93,52,0.18)] bg-[rgba(31,24,48,0.75)] p-6 rounded-sm flex flex-col justify-between hover:border-[#ee5d34] transition-all duration-300 group relative">
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#ee5d34]">
                        {chapter.numeral} · {chapter.theme}
                      </span>
                      <div className={`border border-dashed border-[rgba(238,93,52,0.35)] bg-[#0e0a17]/80 px-2 py-0.5 rounded-sm text-[8px] font-mono uppercase text-[#bfb7aa] ${chapter.rotate}`}>
                        {chapter.stamp}
                      </div>
                    </div>

                    <h3 className="font-serif text-xl text-[#eee5d3] leading-snug group-hover:text-white transition-colors">
                      {chapter.title}
                    </h3>

                    <p className="font-serif italic text-xs text-[#ee5d34] leading-relaxed border-l-2 border-[#ee5d34] pl-2.5 bg-[rgba(238,93,52,0.04)] py-1">
                      "{chapter.quote}"
                    </p>

                    <p className="text-xs text-[#bfb7aa] leading-relaxed font-light pt-1">
                      {chapter.text}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[rgba(238,93,52,0.1)]">
                    <button
                      onClick={() => go("onboarding")}
                      className="text-xs text-[#ee5d34] hover:text-[#f58a6b] transition-colors flex items-center gap-1.5 cursor-pointer font-mono">
                      <span>Explore this in your chart</span>
                      <span>→</span>
                    </button>
                  </div>
                </article>
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
                <span>🪞 03 / THE INTERACTIVE MIRROR</span>
              </div>
              <h2 className="display">Which unsaid ache is taking up space?</h2>
              <p className="threshold-lede">
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
                  <span>🏷️ {activeDilemma.stampNote}</span>
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
        {/* 04 / THE METHOD (ORIGINAL SECTION)                                 */}
        {/* ------------------------------------------------------------------ */}
        <section className="method" id="method">
          <div className="section-shell">
            <div className="method-intro">
              <div>
                <span className="eyebrow">04 / The method</span>
                <h2 className="display">Read the tension.</h2>
              </div>
              <p>Western astrology, philosophy, and a healthy suspicion of easy answers.</p>
            </div>
            <div className="method-list">
              {[
                ["01", "Locate the pressure", "Squares, oppositions, the repeating ache — the parts of the chart that refuse to sit quietly."],
                ["02", "Name the bargain", "Every pattern protects something. We ask what yours has been buying — and what it costs to keep paying."],
                ["03", "Return the choice", "The sky offers a vocabulary, not a sentence. You leave with sharper questions and more room to move."],
              ].map((x) => (
                <div className="method-row" key={x[0]}>
                  <span className="method-number">{x[0]}</span>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                  <Arrow />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 05 / READINGS (ORIGINAL SECTION + APP ACCESS GRID)                 */}
        {/* ------------------------------------------------------------------ */}
        <section className="readings" id="readings">
          <div className="section-shell">
            <div className="readings-intro">
              <div>
                <span className="eyebrow">05 / Self-guided interpretive catalog</span>
                <h2 className="display">Choose your<br /><em className="serif">trouble.</em></h2>
              </div>
              <p>Direct, personal whole-sign chart calculations — without expensive consultation fees.</p>
            </div>

            <div className="reading-stack">
              {[
                ["I. The Aperture", "A first encounter with the machinery of your chart, Sun, Moon, and Rising.", "Instant digital synthesis", "Included"],
                ["II. The Undertow", "A focused excavation of one question or relational dilemma that will not leave you alone.", "Interactive dilemma mirror", "Included"],
                ["III. The Long Night", "A full natal portrait for the season when the old story stops working.", "Complete natal wheel & transits", "Included"],
              ].map((r, i) => (
                <article className="reading-card" key={r[0]}>
                  <div className="reading-index">0{i + 1}</div>
                  <div className="reading-main">
                    <h3>{r[0]}</h3>
                    <p>{r[1]}</p>
                  </div>
                  <div className="reading-details">
                    <span>Format</span>
                    <p>{r[2]}. Complete astrological cartography archive.</p>
                  </div>
                  <div className="reading-price">
                    <strong>{r[3]}</strong>
                    <button className="button-quiet cursor-pointer" onClick={() => go("onboarding")}>
                      Explore <Arrow />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="app-access-grid">
              <button onClick={() => go("chart")} className="cursor-pointer">
                <span>WHEEL</span>
                <strong>Interactive Birth Chart</strong>
                <small>Read the geometry of your natal sky →</small>
              </button>
              <button onClick={() => go("dashboard")} className="cursor-pointer">
                <span>TODAY</span>
                <strong>Sky Weather</strong>
                <small>Tension, opportunity, and live transits →</small>
              </button>
              <button onClick={() => go("reading")} className="cursor-pointer">
                <span>CONSULT</span>
                <strong>AI Salon Inquiry</strong>
                <small>Ask the Heretic about your chart →</small>
              </button>
              <button onClick={() => go("learn")} className="cursor-pointer">
                <span>LIBRARY</span>
                <strong>Learn the language</strong>
                <small>Explore signs, planets, houses, and aspects →</small>
              </button>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 06 / A NOTE FROM THE DESK (ORIGINAL SECTION)                       */}
        {/* ------------------------------------------------------------------ */}
        <section className="interlude" id="about">
          <div className="section-shell interlude-copy">
            <span className="eyebrow">06 / A note from the desk</span>
            <p>I am not here to make the universe seem nicer than it is. I am here to make your relationship to uncertainty more interesting.</p>
            <p className="pull-quote">“The chart is an argument. We get to edit the footnotes.”</p>
          </div>
          <blockquote className="interlude-quote">
            The point is not to become <em>more cosmic.</em><br />
            It is to become harder to fool.
          </blockquote>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 07 / BEFORE YOU CROSS THE THRESHOLD (ORIGINAL SECTION)             */}
        {/* ------------------------------------------------------------------ */}
        <section className="threshold" id="threshold">
          <div className="section-shell">
            <span className="eyebrow" style={{ color: "hsl(259 30% 8%/.65)" }}>
              07 / Before you cross the threshold
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
        {/* 08 / FAQ (ORIGINAL SECTION + NO REAL ASTROLOGERS)                 */}
        {/* ------------------------------------------------------------------ */}
        <section className="faq" id="questions">
          <div className="section-shell faq-grid">
            <div className="faq-intro">
              <span className="eyebrow">08 / Questions at the threshold</span>
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
      {/* FOOTER (ORIGINAL SECTION)                                          */}
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
