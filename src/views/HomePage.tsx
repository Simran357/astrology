"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";
import HeroArt from "../components/home/HeroArt";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const NAV = [
  ["Rituals", "#rituals"],
  ["The Sky", "#movements"],
  ["Philosophy", "#philosophy"],
  ["Questions", "#questions"],
];

const FEATURES: { icon: string; title: string; body: string }[] = [
  {
    icon: "/stickers/sun.png",
    title: "Your daily sky",
    body: "Wake up to a warm, plain-language reading of the transits touching your chart — no jargon, just what actually matters today.",
  },
  {
    icon: "/stickers/moon.png",
    title: "Moon-led rituals",
    body: "Gentle practices tuned to each lunar phase. Journal prompts, affirmations, and small rituals to move with the moon, not against it.",
  },
  {
    icon: "/stickers/hand.png",
    title: "Ask the stars",
    body: "Bring a real question. Get a grounded, specific reflection rooted in your birth chart — curiosity over cosmic fog.",
  },
];

const MOVEMENTS: { n: string; title: string; body: string }[] = [
  { n: "i.", title: "Enter your birth", body: "Date, time, and place. We cast your natal chart with astronomical precision in seconds." },
  { n: "ii.", title: "Meet your sky", body: "See your sun, moon, and rising — and what the current planets are stirring in you now." },
  { n: "iii.", title: "Move with it", body: "Daily guidance and rituals translate the sky into small, doable, human choices." },
  { n: "iv.", title: "Return often", body: "Track shifts over time. Notice patterns. Come back with new questions as you grow." },
];

const FAQ: [string, string][] = [
  ["Is this fortune telling?", "No. We treat astrology as a language for self-reflection — a mirror, not a map of fate. You always keep your agency."],
  ["Do I need my exact birth time?", "It helps a lot — your rising sign and house placements depend on it. If you don't know it, you'll still get a rich sun-and-moon reading."],
  ["Is it based on real astronomy?", "Yes. Chart positions are calculated from real ephemeris data. The interpretation is poetic; the planets are precise."],
  ["What makes this different?", "Warmth without the woo. Specific questions over vague horoscopes. Curiosity over certainty, agency over inevitability."],
];

export default function HomePage() {
  const { navigate } = useApp();
  const [open, setOpen] = useState<number | null>(0);
  const go = (page: string) => navigate(page);

  return (
    <div className="chani-root">
      {/* header */}
      <header className="chani-header">
        <div className="chani-wrap chani-header-in">
          <button className="chani-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="chani-brand-mark">A</span>
            <span className="chani-brand-name">Astra</span>
          </button>
          <nav className="chani-nav">
            {NAV.map(([label, href]) => (
              <a key={href} onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })}>
                {label}
              </a>
            ))}
          </nav>
          <button className="chani-cta" onClick={() => go("onboarding")}>
            Begin free <Arrow />
          </button>
        </div>
      </header>

      {/* hero */}
      <section className="chani-hero">
        <div className="chani-wrap chani-hero-grid">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.span className="chani-eyebrow" variants={reveal}>
              ✦ Astrology for the tender & curious
            </motion.span>
            <motion.h1 className="chani-title" variants={reveal}>
              Read the sky<br />
              like a <em>love letter</em>
            </motion.h1>
            <motion.p className="chani-lead" variants={reveal}>
              Astra turns the movements of the planets into warm, practical guidance — so you can meet each day with a little more grace and a lot more you.
            </motion.p>
            <motion.div className="chani-hero-actions" variants={reveal}>
              <button className="chani-cta" onClick={() => go("onboarding")}>
                Cast my chart <Arrow />
              </button>
              <button className="chani-cta ghost" onClick={() => go("login")}>
                I have an account
              </button>
            </motion.div>
          </motion.div>

          <HeroArt />
        </div>

        {/* marquee */}
        <div className="chani-marquee" aria-hidden="true">
          <div className="chani-marquee-track">
            {[0, 1].map((k) => (
              <span key={k}>
                Moon phases Birth charts Daily transits Lunar rituals Self-reflection Real astronomy Tender guidance
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="chani-section" id="rituals">
        <div className="chani-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={reveal}>
            <span className="chani-kicker">01 / What you get</span>
            <h2 className="chani-h2">
              A softer way to<br /><em>meet yourself</em>
            </h2>
          </motion.div>
          <div className="chani-features">
            {FEATURES.map((f, i) => (
              <motion.article
                className="chani-card"
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={reveal}>
                <div className="chani-card-ico">
                  <img src={f.icon || "/placeholder.svg"} alt="" />
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* movements / steps */}
      <section className="chani-section" id="movements" style={{ paddingTop: 0 }}>
        <div className="chani-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={reveal}>
            <span className="chani-kicker">02 / How it moves</span>
            <h2 className="chani-h2">
              Four small steps into<br /><em>your own orbit</em>
            </h2>
          </motion.div>
          <div className="chani-steps">
            {MOVEMENTS.map((m, i) => (
              <motion.div
                className="chani-step"
                key={m.n}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={reveal}>
                <span className="chani-step-n">{m.n}</span>
                <div>
                  <h4>{m.title}</h4>
                  <p>{m.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* philosophy quote */}
      <section className="chani-quote" id="philosophy">
        <QuoteStickers />
        <motion.div
          className="chani-wrap chani-quote-inner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={reveal}>
          <blockquote>
            The stars <em>incline</em>,<br />they do not compel.
          </blockquote>
          <cite>— The Astra philosophy</cite>
        </motion.div>
      </section>

      {/* faq */}
      <section className="chani-section" id="questions">
        <div className="chani-wrap chani-faq-grid">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
            <span className="chani-kicker">03 / At the threshold</span>
            <h2 className="chani-h2">
              Still<br /><em>skeptical?</em>
            </h2>
            <p className="chani-sub">Good. Astra is built for honest self-inquiry — bring your doubt with you.</p>
          </motion.div>
          <div>
            {FAQ.map(([q, a], i) => (
              <motion.div
                className="chani-faq-item"
                key={q}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={reveal}>
                <button className="chani-faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  <span>{q}</span>
                  <span>{open === i ? "−" : "+"}</span>
                </button>
                <div className={`chani-faq-a ${open === i ? "open" : ""}`}>
                  <p>{a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* footer CTA */}
      <footer className="chani-footer">
        <FooterStickers />
        <motion.div
          className="chani-wrap chani-quote-inner"
          style={{ textAlign: "center" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}>
          <span className="chani-kicker" style={{ color: "var(--gold)" }}>The door is open</span>
          <h2 className="chani-h2">
            Come with a question.<br /><em>Leave with a choice.</em>
          </h2>
          <div className="chani-footer-actions" style={{ justifyContent: "center" }}>
            <button className="chani-cta" onClick={() => go("onboarding")}>
              Begin your journey <Arrow />
            </button>
            <button className="chani-cta ghost" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back to the top ↑
            </button>
          </div>
          <div className="chani-footer-line">
            <span>Astra © 2026</span>
            <span>Warm astrological cartography for the curious</span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteStickers() {
  return (
    <>
      <motion.div
        className="chani-sticker"
        style={{ width: 120, top: "12%", left: "8%" }}
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <img src="/stickers/eye.png" alt="" />
      </motion.div>
      <motion.div
        className="chani-sticker"
        style={{ width: 96, bottom: "14%", right: "10%" }}
        animate={{ y: [0, 16, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}>
        <img src="/stickers/star.png" alt="" />
      </motion.div>
    </>
  );
}

function FooterStickers() {
  return (
    <>
      <motion.div
        className="chani-sticker"
        style={{ width: 130, top: "10%", right: "6%", opacity: 0.9 }}
        animate={{ y: [0, -16, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}>
        <img src="/stickers/moon.png" alt="" />
      </motion.div>
      <motion.div
        className="chani-sticker"
        style={{ width: 110, bottom: "12%", left: "5%", opacity: 0.85 }}
        animate={{ y: [0, 14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <img src="/stickers/comet.png" alt="" />
      </motion.div>
    </>
  );
}
