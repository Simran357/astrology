"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);
import GalaxyCanvas from "../components/GalaxyCanvas";

interface HomePageProps { onNavigate: (page: string) => void; }

const faqs = [
  ["Do I need to believe in astrology?", "No. Bring curiosity, skepticism, or a question you cannot stop circling."],
  ["What do I get from my chart?", "A visual map of your patterns, pressure points, and possibilities — not a verdict."],
  ["What if I do not know my birth time?", "You can still explore your planetary placements. We make uncertainty visible instead of hiding it."],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function HomePage({ onNavigate }: HomePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".story-hero > *", { opacity: 0, y: 28, duration: .8, stagger: .1, ease: "power3.out" });
      gsap.from(".sticker", { opacity: 0, scale: .7, rotation: -14, duration: .9, delay: .45, ease: "back.out(1.8)" });
      gsap.utils.toArray<HTMLElement>(".story-reveal").forEach((el) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 84%" }, opacity: 0, y: 34, duration: .7, ease: "power2.out" });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="new-landing">
      <header className="new-nav">
        <button className="new-wordmark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span>✳</span> AstroFindings</button>
        <nav><a href="#method">The method</a><a href="#chart">Your chart</a><a href="#questions">Questions</a></nav>
        <button className="new-nav-cta" onClick={() => onNavigate("onboarding")}>Find your sky <Arrow /></button>
      </header>

      <main>
        <section className="story-hero">
          <div className="hero-copy-new">
            <p className="new-label">FIELD NOTES / 001</p>
            <h1>The sky is not<br />a <i>sentence.</i></h1>
            <p className="hero-deck">Astrology for people who would rather ask a better question than receive a prediction.</p>
            <div className="new-actions"><button className="new-primary" onClick={() => onNavigate("onboarding")}>Meet your birth chart <Arrow /></button><a href="#method">See how it works ↓</a></div>
          </div>
          <div className="hero-collage" aria-label="Illustration of a star map, moon, and crystal">
            <motion.div className="sticker sticker-yellow" whileHover={{ scale: 1.08, rotate: -4 }} transition={{ type: "spring", stiffness: 280, damping: 14 }}>YOUR<br />PATTERNS<br />ARE<br />CLUES</motion.div>
            <motion.div className="sticker sticker-pink" whileHover={{ scale: 1.08, rotate: 5 }} transition={{ type: "spring", stiffness: 280, damping: 14 }}>NOT<br />YOUR<br /><i>FATE</i></motion.div>
            <motion.div className="mini-sticker sticker-blue" initial={{ opacity: 0, y: 14, rotate: 8 }} animate={{ opacity: 1, y: 0, rotate: 8 }} transition={{ delay: .7, duration: .6 }}>ASK<br />BETTER<br />QUESTIONS</motion.div>
            <motion.div className="star-badge" whileHover={{ rotate: 180, scale: 1.1 }} transition={{ duration: .5 }}>✦</motion.div>
            <GalaxyCanvas className="new-galaxy" opacity={1} />
            <div className="moon-shape" aria-hidden="true" />
            <div className="crystal-shape" aria-hidden="true"><span /><b /><i /></div>
            <span className="collage-caption">a small map<br />of the interior</span>
          </div>
        </section>

        <section className="ticker" aria-label="AstroFindings principles"><span>curiosity over certainty</span><b>✦</b><span>agency over inevitability</span><b>✦</b><span>specific questions over cosmic fog</span><b>✦</b></section>

        <section id="method" className="story-section story-reveal method-new">
          <div className="orbit-sticker" aria-hidden="true"><span>READ<br />THE<br />WEATHER</span><b>✦</b></div>
          <div className="section-index">01 / THE METHOD</div>
          <div><h2>Read the weather.<br /><em>Choose the clothes.</em></h2><p className="section-lede">Your birth chart is a snapshot of the sky when you arrived. We turn that snapshot into a living, visual language for the parts of you that repeat.</p><div className="method-steps"><div><b>01</b><span>Enter your sky</span><small>Date, time, and place — held gently.</small></div><div><b>02</b><span>See the pattern</span><small>Planets become relationships, not labels.</small></div><div><b>03</b><span>Keep your agency</span><small>The interpretation is yours to use.</small></div></div></div>
        </section>

        <section id="chart" className="chart-story story-reveal">
          <div className="chart-stamp" aria-hidden="true"><span>YOUR<br />SKY<br />HAS<br />RECEIPTS</span><b>✦</b></div>
          <div className="chart-copy"><p className="new-label">FIELD NOTES / 002</p><h2>A diagram<br />with a pulse.</h2><p>Not a personality quiz. Not a cosmic mood board. A precise map of tension, talent, longing, and timing — made personal to you.</p><button className="new-outline" onClick={() => onNavigate("onboarding")}>Make my map <Arrow /></button></div>
          <div className="chart-art"><motion.div className="chart-label-sticker" whileHover={{ y: -6, rotate: -5 }} transition={{ type: "spring", stiffness: 220 }}>MAP<br />THE<br />MYSTERY</motion.div><div className="chart-orbit orbit-a" /><div className="chart-orbit orbit-b" /><div className="chart-orbit orbit-c" /><div className="chart-sun">☼</div><span className="chart-note note-a">the part<br />that wants more</span><span className="chart-note note-b">the part<br />that protects</span></div>
        </section>

        <section className="quote-break story-reveal"><div className="quote-sun" aria-hidden="true">☼</div><span className="quote-sticker">LOOK<br />UP,<br />THEN<br /><i>IN.</i></span><blockquote>“The point is not to become someone else. It is to notice the exact moment you start abandoning yourself.”</blockquote><cite>— AstroFindings field guide</cite></section>

        <section id="questions" className="questions-new story-reveal"><div className="question-moon" aria-hidden="true" /><div><p className="new-label">FIELD NOTES / 003</p><h2>Keep your<br /><i>questions.</i></h2></div><div className="faq-new">{faqs.map(([question, answer], index) => <div key={question} className="faq-new-item"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

        <section className="final-card story-reveal"><motion.div className="final-scribble" animate={{ rotate: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>✳</motion.div><div className="final-tape" aria-hidden="true">KEEP<br />LOOKING</div><p className="new-label">THE DOOR IS OPEN</p><h2>Bring the question<br /><i>you keep making smaller.</i></h2><button className="new-primary" onClick={() => onNavigate("onboarding")}>Begin your reading <Arrow /></button></section>
      </main>
      <footer className="new-footer"><span>AstroFindings © 2026</span><span>Astrology for the suspiciously self-aware.</span></footer>
    </div>
  );
}
