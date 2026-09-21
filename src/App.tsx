import { useMemo, useState } from "react";

type View = "today" | "chart" | "sky" | "readings" | "relationships" | "explore" | "profile";

const nav: { id: View; label: string; icon: string }[] = [
  { id: "today", label: "Today", icon: "○" },
  { id: "chart", label: "My chart", icon: "·" },
  { id: "sky", label: "The sky", icon: "◐" },
  { id: "readings", label: "Readings", icon: "=" },
  { id: "relationships", label: "People", icon: "+" },
  { id: "explore", label: "Explore", icon: "*" },
];

const planets = [
  ["Sun", "Virgo", "your way of becoming visible"],
  ["Moon", "Pisces", "the places you go to feel safe"],
  ["Rising", "Scorpio", "the first impression you leave"],
  ["Venus", "Libra", "what you value and return to"],
];

function App() {
  const [view, setView] = useState<View>("today");
  const [saved, setSaved] = useState(false);
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(false);

  const heading = useMemo(() => nav.find((item) => item.id === view)?.label ?? "Today", [view]);
  const go = (next: View) => { setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <button className="wordmark" onClick={() => go("today")} aria-label="Go to today"><span>✳</span><strong>astral</strong></button>
        <nav aria-label="Primary navigation" className="primary-nav">
          {nav.map((item) => <button key={item.id} className={view === item.id ? "nav-item active" : "nav-item"} onClick={() => go(item.id)}><span>{item.icon}</span>{item.label}</button>)}
        </nav>
        <div className="rail-bottom"><button className="nav-item" onClick={() => go("profile")}><span>◒</span>Profile</button><div className="mini-avatar">A</div></div>
      </aside>

      <main className="main-column">
        <header className="topbar"><div className="mobile-brand">astral</div><div className="date-label">Monday, September 21, 2026</div><div className="top-actions"><button className="icon-button" aria-label="Search">⌕</button><button className="icon-button" aria-label="Notifications">♧</button><button className="avatar-button" onClick={() => go("profile")}>A</button></div></header>
        <div className="content-wrap">
          <div className="page-kicker">{heading} <span>·</span> For Aanya</div>
          {view === "today" && <Today go={go} saved={saved} setSaved={setSaved} question={question} setQuestion={setQuestion} asked={asked} setAsked={setAsked} />}
          {view === "chart" && <Chart go={go} />}
          {view === "sky" && <Sky go={go} />}
          {view === "readings" && <Readings go={go} />}
          {view === "relationships" && <Relationships go={go} />}
          {view === "explore" && <Explore go={go} />}
          {view === "profile" && <Profile go={go} />}
        </div>
      </main>
    </div>
  );
}

function Today({ go, saved, setSaved, question, setQuestion, asked, setAsked }: any) {
  return <>
    <section className="today-hero"><div><p className="eyebrow">Your day, in perspective</p><h1>Make room for<br /><em>the honest thing.</em></h1><p className="hero-copy">The Moon is moving through Pisces today. Notice what your body understands before your mind finds the words.</p><button className="ink-button" onClick={() => document.getElementById("reading")?.scrollIntoView({ behavior: "smooth" })}>Read today&apos;s guidance <span>↗</span></button></div><div className="moon-art" aria-label="A hand-drawn moon illustration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="moon-face">◐</div><span className="art-note">moon / pisces</span></div></section>
    <div className="section-rule"><span>01</span><span>The reading</span><span>Scroll to continue</span></div>
    <section id="reading" className="reading-grid"><article className="reading-copy"><p className="eyebrow">A note for today</p><h2>You don&apos;t have to make a decision just because you can.</h2><p>There is a particular kind of clarity that arrives when you stop asking yourself to be certain. Today asks for a softer kind of attention. Let the first answer be a feeling, not a plan.</p><p>Give yourself a little more time around the people and choices that matter. You may notice that what feels like hesitation is actually your intuition asking for a quieter room.</p><div className="reading-footer"><span>Based on your Moon in Pisces</span><button className={saved ? "save-button saved" : "save-button"} onClick={() => setSaved(!saved)}>{saved ? "Saved" : "Save reading"} ♡</button></div></article><aside className="aside-note"><span className="note-number">02</span><h3>Try this</h3><p>Before replying, place one hand on your chest. Ask: what would feel true if nobody needed an explanation?</p><div className="note-line" /><span className="note-symbol">✳</span></aside></section>
    <section className="three-up"><button onClick={() => go("sky")}><span>☽</span><strong>What&apos;s moving</strong><small>See the sky behind your day →</small></button><button onClick={() => go("chart")}><span>◌</span><strong>Your chart</strong><small>Find this feeling in your chart →</small></button><button onClick={() => go("readings")}><span>▤</span><strong>Go deeper</strong><small>Open a personal reading →</small></button></section>
    <section className="ask-strip"><div><p className="eyebrow">A question for the stars</p><h2>What are you trying to understand?</h2></div><div className="ask-form"><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about your life, not just your chart" /><button onClick={() => setAsked(true)}>↗</button>{asked && <p className="answer-preview">Start with the feeling underneath the question. Your chart can help you name it.</p>}</div></section>
  </>;
}

function Chart({ go }: { go: (v: View) => void }) { return <><PageIntro eyebrow="Your personal sky" title="My chart" copy="A map of the sky at the moment you arrived. Not a verdict — a language for noticing yourself." action="Ask about my chart" onAction={() => go("readings")} /><section className="chart-layout"><div className="chart-wheel"><div className="chart-inner"><span>♈</span><span>♋</span><span>♎</span><span>♑</span><strong>YOUR<br />SKY</strong></div></div><div className="placement-list">{planets.map(([planet, sign, text]) => <button className="placement" key={planet} onClick={() => go("readings")}><span className="placement-glyph">{planet === "Sun" ? "☉" : planet === "Moon" ? "☽" : planet === "Rising" ? "↑" : "♀"}</span><span><b>{planet} in {sign}</b><small>{text}</small></span><i>↗</i></button>)}</div></section><div className="pull-quote">“The chart is not who you are. It is a set of doors you can choose to open.”</div></>; }
function Sky({ go }: { go: (v: View) => void }) { return <><PageIntro eyebrow="The current sky" title="What is moving" copy="The planets are always in conversation. Here is the part of that conversation that touches your life this week." action="Ask the sky" onAction={() => go("readings")} /><section className="sky-list">{[["Today", "Moon enters Pisces", "A softer pace. Let intuition have a seat at the table."],["Sep 23", "Mercury trine Jupiter", "A good day for the message you have been rewriting."],["Sep 28", "New Moon in Libra", "A reset around reciprocity, beauty, and belonging."]].map(([date, title, copy]) => <article key={date}><span>{date}</span><div><h2>{title}</h2><p>{copy}</p></div><button onClick={() => go("readings")}>Read more ↗</button></article>)}</section></>; }
function Readings({ go }: { go: (v: View) => void }) { return <><PageIntro eyebrow="Your private library" title="Readings" copy="A place for the questions you keep returning to, and the answers that become clearer with time." action="Start a reading" onAction={() => go("today")} /><div className="reading-library"><article className="feature-reading"><span className="eyebrow">Latest · September 21</span><h2>Make room for the honest thing.</h2><p>A personal reflection on your Moon, your boundaries, and the quiet power of waiting.</p><button onClick={() => go("today")}>Continue reading →</button></article>{["The shape of your yes", "When closeness feels complicated", "Your Venus, in plain language"].map((title, i) => <button className="library-row" key={title} onClick={() => go("today")}><span>0{i + 1}</span><strong>{title}</strong><small>{i === 0 ? "Saved yesterday" : "Explore your chart"}</small><i>↗</i></button>)}</div></>; }
function Relationships({ go }: { go: (v: View) => void }) { return <><PageIntro eyebrow="The people in your sky" title="Relationships" copy="Understand the patterns between you and the people you love — without reducing either of you to a sign." action="Add someone" onAction={() => go("readings")} /><div className="people-grid">{[["M", "Mira", "Friend · Gemini", "A bright, curious connection"],["J", "Jai", "Partner · Taurus", "Where steadiness meets feeling"],["+", "Add someone", "Compare charts", "See what you bring out in each other"]].map(([initial, name, label, text]) => <button key={name} className="person-card" onClick={() => go(name === "Add someone" ? "readings" : "readings")}><span className="person-avatar">{initial}</span><small>{label}</small><h2>{name}</h2><p>{text}</p><i>↗</i></button>)}</div></>; }
function Explore({ go }: { go: (v: View) => void }) { return <><PageIntro eyebrow="A place to begin" title="Explore" copy="Astrology is a practice of attention. Follow the thread that feels alive today." action="Ask a question" onAction={() => go("readings")} /><div className="explore-index">{[["01", "Learn astrology", "Signs, planets, houses, and the language of your chart"],["02", "Tarot", "Draw a card for the question you cannot quite name"],["03", "Wellness", "Small practices for the season you are in"],["04", "AI reflections", "A thoughtful conversation with your personal sky"]].map(([number, title, copy]) => <button key={number} onClick={() => go("readings")}><span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div><i>↗</i></button>)}</div></>; }
function Profile({ go }: { go: (v: View) => void }) { return <><PageIntro eyebrow="Your space" title="Profile" copy="Keep your birth details, saved people, and private readings in one quiet place." action="Edit birth details" onAction={() => go("chart")} /><div className="profile-menu">{["Birth details", "Saved readings", "People I know", "Notifications", "Privacy & data"].map((item, i) => <button key={item}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item}</strong><i>↗</i></button>)}</div></>; }
function PageIntro({ eyebrow, title, copy, action, onAction }: any) { return <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p><button className="ink-button" onClick={onAction}>{action} <span>↗</span></button></section>; }

export default App;
