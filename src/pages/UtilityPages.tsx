import { useState, FormEvent } from "react";
import { useApp } from "../context/AppContext";
import { calculateCompatibility, PersonProfile } from "../services/astrologyEngine";
import { askAstrologyConsultant, AIResponse } from "../services/aiAstrologyService";
import { TAROT_DECK } from "../data/tarotData";

interface Props {
  onNavigate: (page: string) => void;
}

function Shell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <div className="app-page-shell astral-app-surface">
    <div className="section-shell">
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h1 className="display app-display-title">{title}</h1>
      <p className="app-page-intro">{intro}</p>
      {children}
    </div>
  </div>;
}

export function LoginPage({ onNavigate }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true); };
  return <div className="auth-page astral-app-surface"><div className="auth-card">
    <button className="brand auth-brand" onClick={() => onNavigate("home")}><span className="brand-mark">AF</span><span className="brand-name">AstroFindings</span></button>
    <span className="eyebrow">Private access</span><h1 className="display">Return to the salon.</h1>
    <p className="app-page-intro">Sign in to continue to your chart, readings, timeline, bonds, and saved library.</p>
    <form onSubmit={submit} className="form-stack">
      <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
      <label>Password<input required type="password" name="password" placeholder="••••••••" /></label>
      <button className="button-primary" type="submit">Enter the salon ↗</button>
    </form>
    {submitted && <div className="form-feedback">Sign-in submitted. Connect your existing auth provider here; this UI does not alter API/auth configuration.</div>}
    <button className="button-quiet" onClick={() => onNavigate("signup")}>New here? Create an account →</button>
  </div></div>;
}

export function SignupPage({ onNavigate }: Props) {
  const [submitted, setSubmitted] = useState(false);
  return <div className="auth-page astral-app-surface"><div className="auth-card">
    <button className="brand auth-brand" onClick={() => onNavigate("home")}><span className="brand-mark">AF</span><span className="brand-name">AstroFindings</span></button>
    <span className="eyebrow">Begin a private practice</span><h1 className="display">Make room for the question.</h1>
    <p className="app-page-intro">Create your account and continue into the existing astrology experience.</p>
    <form onSubmit={(e)=>{e.preventDefault();setSubmitted(true)}} className="form-stack">
      <label>Name<input required name="name" placeholder="Your name" /></label>
      <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
      <label>Password<input required minLength={6} type="password" name="password" placeholder="At least 6 characters" /></label>
      <button className="button-primary" type="submit">Create account ↗</button>
    </form>
    {submitted && <div className="form-feedback">Account form submitted. Your existing auth/API layer remains untouched.</div>}
    <button className="button-quiet" onClick={() => onNavigate("login")}>Already a member? Sign in →</button>
  </div></div>;
}

export function TimelinePage({ onNavigate }: Props) {
  const { liveTransits, user, navigateWithHighlight } = useApp();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Derive timeline events from liveTransits or calendar
  const events = liveTransits.activeShifts && liveTransits.activeShifts.length > 0
    ? liveTransits.activeShifts.map(s => ({
        id: s.id,
        date: s.date.slice(5),
        title: s.title,
        copy: s.description || "A shift in planetary influence; examine what it calls you to notice.",
        planet: s.planet,
        impact: s.personalActivationPrompt || s.impact || "Examine where this energy meets your natal houses.",
      }))
    : [
        { id: "1", date: "TODAY", title: "Daily sky weather", copy: "The tension and the opportunity in the current sky.", planet: "Sun", impact: "Ground your intentions in what matters today." },
        { id: "2", date: "SEP 18", title: "Moon changes sign", copy: "A shift in emotional emphasis; use it as a prompt, not a verdict.", planet: "Moon", impact: "Notice changes in emotional temperature." },
        { id: "3", date: "SEP 23", title: "Venus meets Saturn", copy: "A useful moment to examine what your relationships are asking you to take seriously.", planet: "Venus", impact: "Check your 7th House contracts." },
        { id: "4", date: "OCT 02", title: "Mercury turns", copy: "Review the story before you rush to rewrite it.", planet: "Mercury", impact: "Look before speaking on impulse." },
      ];

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return <Shell eyebrow="04 / Shifts" title="Your astrology timeline." intro="A living calendar of sky movements, personal timing, and the moments worth noticing.">
    <div className="feature-grid two">
      <div className="editorial-card">
        <span className="eyebrow">Now</span>
        <h2 className="serif">Today's sky weather</h2>
        <p>Moon in {liveTransits.moonPhase?.sign || "air"} ({liveTransits.moonPhase?.phaseName || "current"}). Track current transits, then move from the event to your chart and the question underneath it.</p>
        <button className="button-primary cursor-pointer" onClick={()=>onNavigate("dashboard")}>Open Today →</button>
      </div>
      <div className="editorial-card">
        <span className="eyebrow">Personal</span>
        <h2 className="serif">Your natal anchor</h2>
        <p>Your {user.sunSign} Sun and {user.moonSign} Moon respond to each shift. Follow the thread into your chart when you want more detail.</p>
        <button className="button-quiet cursor-pointer" onClick={()=>onNavigate("chart")}>Open my chart →</button>
      </div>
    </div>

    {selectedEvent && (
      <div className="editorial-card mb-6 border border-[#ee5d34] bg-[rgba(31,24,48,0.9)] p-5 rounded-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#ee5d34] uppercase tracking-wider">{selectedEvent.title}</span>
          <button onClick={() => setSelectedEventId(null)} className="text-xs text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer">✕ Close</button>
        </div>
        <p className="text-sm text-[#eee5d3] mb-2">{selectedEvent.copy}</p>
        <p className="text-xs text-[#bfb7aa] leading-relaxed mb-4">{selectedEvent.impact}</p>
        <button
          onClick={() => navigateWithHighlight("chart", selectedEvent.planet)}
          className="button-primary cursor-pointer text-xs py-1.5 px-3">
          See {selectedEvent.planet} in your chart →
        </button>
      </div>
    )}

    <div className="timeline-list">
      {events.map((evt) => (
        <div
          className="timeline-row cursor-pointer"
          key={evt.id}
          onClick={() => setSelectedEventId(evt.id === selectedEventId ? null : evt.id)}>
          <span className="method-number">{evt.date}</span>
          <div>
            <h3>{evt.title}</h3>
            <p>{evt.copy}</p>
          </div>
          <span className="transition-transform duration-200" style={{ transform: evt.id === selectedEventId ? "rotate(90deg)" : "none" }}>→</span>
        </div>
      ))}
    </div>
  </Shell>;
}

export function RelationshipsPage({ onNavigate }: Props) {
  const { people, addPerson, deletePerson, user, navigateWithHighlight } = useApp();
  const [name, setName] = useState("");
  const [relationType, setRelationType] = useState<"Partner" | "Friend" | "Family" | "Crush">("Partner");
  const [birthDate, setBirthDate] = useState("1995-05-15");
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    await addPerson({
      name: cleanName,
      relationship: relationType,
      birthDate,
      birthTime: "12:00",
      birthLocation: "New York, NY",
      sunSign: "Taurus",
      moonSign: "Virgo",
      risingSign: "Cancer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",
      notes: "Saved bond in your private circle",
    });
    setName("");
    setIsAdding(false);
  };

  const selectedPerson = people.find(p => p.id === selectedPersonId) || (people.length > 0 ? people[0] : null);
  const compatibility = selectedPerson ? calculateCompatibility(user, selectedPerson) : null;

  return <Shell eyebrow="05 / Bonds" title="Relationships, without the horoscope clichés." intro="Compare two charts as a conversation between patterns, needs, timing, and choice.">
    <div className="feature-grid two">
      <div className="editorial-card">
        <span className="eyebrow">Synastry dossier</span>
        <h2 className="serif">Add a person</h2>
        <form onSubmit={handleCreate} className="space-y-3 pt-2">
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Their name"
            required
            className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-sm text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              value={relationType}
              onChange={e=>setRelationType(e.target.value as any)}
              className="bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-2 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]">
              <option value="Partner">Partner</option>
              <option value="Friend">Friend</option>
              <option value="Family">Family</option>
              <option value="Crush">Crush</option>
            </select>
            <input
              type="date"
              value={birthDate}
              onChange={e=>setBirthDate(e.target.value)}
              className="bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-2 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34] [color-scheme:dark]"
            />
          </div>
          <button className="button-primary cursor-pointer w-full py-2.5" type="submit">
            Create bond →
          </button>
        </form>
      </div>

      <div className="editorial-card">
        <span className="eyebrow">What we examine</span>
        <ul className="editorial-list">
          <li>Sun, Moon & rising dynamics between your {user.sunSign} Sun and their placements</li>
          <li>Venus & Mars attraction and communication patterns</li>
          <li>Saturn, Nodes & long-term commitment lessons</li>
          <li>Current sky timing around the bond</li>
        </ul>
      </div>
    </div>

    {/* Saved Bonds List */}
    <div className="mt-8 mb-6">
      <span className="eyebrow mb-3 block">Saved bonds ({people.length})</span>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {people.map(p => {
          const isSelected = selectedPerson?.id === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPersonId(p.id)}
              className={`border p-4 rounded-sm transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-[#ee5d34] bg-[rgba(238,93,52,0.1)]"
                  : "border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.6)] hover:border-[rgba(238,93,52,0.3)]"
              }`}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-base text-[#eee5d3]">{p.name}</h3>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-[rgba(238,93,52,0.15)] text-[#ee5d34] rounded-sm">{p.relationship}</span>
                </div>
                <p className="text-xs text-[#bfb7aa]">☉ {p.sunSign} · ☽ {p.moonSign}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-2 border-t border-[rgba(238,93,52,0.08)]">
                <span className="text-xs text-[#ee5d34]">View synastry →</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); deletePerson(p.id); }}
                  className="text-xs text-[#bfb7aa] hover:text-[rgba(220,100,80,1)]">
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Synastry Analysis Detail Card */}
    {selectedPerson && compatibility && (
      <div className="editorial-card border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.85)] p-6 rounded-sm mb-6 space-y-4">
        <div className="flex items-baseline justify-between border-b border-[rgba(238,93,52,0.1)] pb-3">
          <div>
            <h3 className="font-serif text-xl text-[#eee5d3]">{user.name} & {selectedPerson.name}</h3>
            <p className="text-xs text-[#bfb7aa]">{user.sunSign} Sun / {user.moonSign} Moon × {selectedPerson.sunSign} Sun / {selectedPerson.moonSign} Moon</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-serif text-[#ee5d34]">{compatibility.overallScore}%</span>
            <span className="block text-[10px] font-mono text-[#bfb7aa] uppercase">Harmony index</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center py-2">
          <div className="border border-[rgba(238,93,52,0.1)] p-2 rounded-sm">
            <span className="text-xs text-[#bfb7aa] block">Emotional</span>
            <strong className="text-sm text-[#eee5d3]">{compatibility.emotionalScore}%</strong>
          </div>
          <div className="border border-[rgba(238,93,52,0.1)] p-2 rounded-sm">
            <span className="text-xs text-[#bfb7aa] block">Dialogue</span>
            <strong className="text-sm text-[#eee5d3]">{compatibility.communicationScore}%</strong>
          </div>
          <div className="border border-[rgba(238,93,52,0.1)] p-2 rounded-sm">
            <span className="text-xs text-[#bfb7aa] block">Passion</span>
            <strong className="text-sm text-[#eee5d3]">{compatibility.passionScore}%</strong>
          </div>
          <div className="border border-[rgba(238,93,52,0.1)] p-2 rounded-sm">
            <span className="text-xs text-[#bfb7aa] block">Long-Term</span>
            <strong className="text-sm text-[#eee5d3]">{compatibility.longTermScore}%</strong>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <span className="text-xs font-mono uppercase text-[#ee5d34] tracking-wider block">Key Dynamics</span>
          {compatibility.strengths.slice(0, 2).map((s, idx) => (
            <p key={idx} className="text-xs text-[#bfb7aa] leading-relaxed">✦ {s}</p>
          ))}
        </div>
      </div>
    )}

    <button className="button-quiet cursor-pointer" onClick={()=>onNavigate("chart")}>Return to my chart →</button>
  </Shell>;
}

export function TarotPage({ onNavigate }: Props) {
  const { savedTarotDraws, saveTarotDraw } = useApp();
  const [drawnCards, setDrawnCards] = useState<Array<{ name: string; position: string; meaning: string; glyph: string }> | null>(null);

  const drawSpread = () => {
    // Pick 3 unique cards from TAROT_DECK
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, 3);
    const positions = ["Past / Pressure", "Present / Choice", "Next / Opening"];
    const cards = picked.map((c, i) => ({
      name: c.name,
      position: positions[i],
      meaning: c.uprightMeaning || "A threshold of conscious attention.",
      glyph: String(c.number >= 0 ? c.number : "✦"),
    }));
    setDrawnCards(cards);
    saveTarotDraw({
      spreadType: "Three Card Threshold",
      cardName: cards.map(c => c.name).join(", "),
      cardId: picked[0].id,
      question: "Three card reflection",
      insight: cards[1].meaning,
    });
  };

  return <Shell eyebrow="06 / Divination" title="Tarot for the question astrology cannot hold." intro="A simple card-based reflection layer: draw, notice, then decide what deserves your attention.">
    <div className="tarot-stage">
      <div className="tarot-cards">
        {[0, 1, 2].map((i) => {
          const card = drawnCards ? drawnCards[i] : null;
          return (
            <div
              className={`tarot-card ${card ? "revealed" : ""}`}
              key={i}
              onClick={drawSpread}
              style={{ cursor: "pointer" }}>
              <span>{card ? card.glyph : "✦"}</span>
              <small>{card ? card.name : ["Past / pressure", "Present / choice", "Next / opening"][i]}</small>
            </div>
          );
        })}
      </div>
      <button className="button-primary cursor-pointer" onClick={drawSpread}>
        {drawnCards ? "Draw again" : "Draw the spread"} →
      </button>
    </div>

    {drawnCards && (
      <div className="editorial-card border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.8)] p-6 rounded-sm my-6 space-y-4">
        <span className="eyebrow block">Reading synthesis</span>
        <div className="grid md:grid-cols-3 gap-4">
          {drawnCards.map((c, idx) => (
            <div key={idx} className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#ee5d34]">{c.position}</span>
              <h4 className="font-serif text-base text-[#eee5d3]">{c.name}</h4>
              <p className="text-xs text-[#bfb7aa] leading-relaxed pt-1">{c.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    <button className="button-quiet cursor-pointer" onClick={()=>onNavigate("reading")}>Ask for a deeper reading →</button>
  </Shell>;
}

export function AskAIPage({ onNavigate }: Props) {
  const { user, liveTransits } = useApp();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const prompts = [
    "Where is the repeating ache in my chart?",
    "What bargain is my Sun-Saturn aspect trying to protect?",
    "How does my rising sign show up when I am under pressure?",
  ];

  const handleConsult = async (qText?: string) => {
    const textToSubmit = qText || question;
    if (!textToSubmit.trim()) return;
    setIsLoading(true);
    try {
      const res = await askAstrologyConsultant(user, liveTransits, textToSubmit);
      setResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return <Shell eyebrow="07 / Consultation" title="Ask AstroFindings." intro="The salon consultation for specific questions about your existing chart and current sky.">
    <div className="ai-console">
      <div className="prompt-row">
        {prompts.map(p => (
          <button
            key={p}
            onClick={() => { setQuestion(p); handleConsult(p); }}
            className="cursor-pointer">
            {p}
          </button>
        ))}
      </div>
      <textarea
        value={question}
        onChange={e=>setQuestion(e.target.value)}
        placeholder="Bring the question you keep making smaller."
      />
      <button
        className="button-primary cursor-pointer disabled:opacity-50"
        disabled={isLoading || !question.trim()}
        onClick={() => handleConsult()}>
        {isLoading ? "Consulting celestial blueprint..." : "Send inquiry →"}
      </button>

      {response && (
        <div className="form-feedback border border-[#ee5d34] bg-[rgba(31,24,48,0.9)] p-5 rounded-sm mt-4 space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-[rgba(238,93,52,0.15)] pb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#ee5d34]">
              ✦ Chart-Anchored Response ({response.category})
            </span>
            <span className="text-[10px] font-mono text-[#bfb7aa]">
              {response.isApiGenerated ? "Live LLM Engine" : "Astrological Ephemeris Engine"}
            </span>
          </div>
          <div className="text-xs text-[#eee5d3] leading-relaxed whitespace-pre-line">
            {response.text}
          </div>
          {response.consultedPlanets && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {response.consultedPlanets.map((p, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-[rgba(238,93,52,0.12)] text-[#bfb7aa] rounded-sm">
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    <button className="button-quiet cursor-pointer mt-4" onClick={()=>onNavigate("chart")}>Read the chart first →</button>
  </Shell>;
}
