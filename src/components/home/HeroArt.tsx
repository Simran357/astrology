"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalaxyUniverse from "./GalaxyUniverse";

gsap.registerPlugin(ScrollTrigger);

type Deco = {
  src: string;
  alt: string;
  style: React.CSSProperties;
  float: { x?: number; y?: number; r?: number; dur: number };
  parallax: number;
};

const STICKERS: Deco[] = [
  {
    src: "/stickers/sun.png",
    alt: "Smiling sun sticker",
    style: { width: "24%", top: "-5%", left: "-4%" },
    float: { y: -18, r: 8, dur: 4.5 },
    parallax: 60,
  },
  {
    src: "/stickers/moon.png",
    alt: "Crescent moon sticker",
    style: { width: "20%", top: "2%", right: "-4%" },
    float: { y: 16, r: -10, dur: 5.2 },
    parallax: -50,
  },
  {
    src: "/stickers/zodiac.png",
    alt: "Zodiac wheel sticker",
    style: { width: "22%", bottom: "-3%", left: "-5%" },
    float: { y: -14, x: 8, r: 6, dur: 6 },
    parallax: 40,
  },
  {
    src: "/stickers/saturn.png",
    alt: "Saturn sticker",
    style: { width: "22%", bottom: "-4%", right: "-5%" },
    float: { y: 18, r: 12, dur: 5.6 },
    parallax: -70,
  },
  {
    src: "/stickers/star.png",
    alt: "Sparkle star sticker",
    style: { width: "12%", top: "44%", right: "-3%" },
    float: { y: -12, r: 18, dur: 3.8 },
    parallax: 30,
  },
  {
    src: "/stickers/comet.png",
    alt: "Comet sticker",
    style: { width: "13%", top: "40%", left: "-3%" },
    float: { y: 14, x: -6, r: -14, dur: 4.2 },
    parallax: -30,
  },
];

export default function HeroArt() {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      const stickers = gsap.utils.toArray<HTMLElement>(".chani-sticker", stage);
      const cosmos = stage.querySelector<HTMLElement>(".chani-cosmos");

      gsap.from(cosmos, { scale: 0.8, opacity: 0, duration: 1.2, ease: "power3.out" });
      gsap.from(stickers, {
        scale: 0,
        opacity: 0,
        rotate: -40,
        transformOrigin: "50% 50%",
        duration: 0.9,
        ease: "back.out(1.7)",
        stagger: 0.12,
        delay: 0.3,
      });

      stickers.forEach((el, i) => {
        const f = STICKERS[i].float;
        gsap.to(el, {
          y: f.y ?? 0,
          x: f.x ?? 0,
          rotate: f.r ?? 0,
          duration: f.dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.6 + i * 0.15,
        });
      });

      stickers.forEach((el, i) => {
        gsap.to(el, {
          yPercent: STICKERS[i].parallax,
          ease: "none",
          scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <div className="chani-stage" ref={stageRef} aria-hidden="true">
      <div className="chani-cosmos">
        <GalaxyUniverse />
      </div>
      {STICKERS.map((s) => (
        <div key={s.src} className="chani-sticker" style={s.style}>
          <img src={s.src || "/placeholder.svg"} alt={s.alt} />
        </div>
      ))}
    </div>
  );
}
