"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Deco = {
  src: string;
  alt: string;
  className: string;
  style: React.CSSProperties;
  float: { x?: number; y?: number; r?: number; dur: number };
  parallax: number;
};

const STICKERS: Deco[] = [
  {
    src: "/stickers/sun.png",
    alt: "Smiling sun sticker",
    className: "chani-sticker",
    style: { width: "34%", top: "-4%", left: "-6%" },
    float: { y: -18, r: 8, dur: 4.5 },
    parallax: 60,
  },
  {
    src: "/stickers/moon.png",
    alt: "Crescent moon sticker",
    className: "chani-sticker",
    style: { width: "26%", top: "6%", right: "-4%" },
    float: { y: 16, r: -10, dur: 5.2 },
    parallax: -50,
  },
  {
    src: "/stickers/hand.png",
    alt: "Mystic hand and eye sticker",
    className: "chani-sticker",
    style: { width: "26%", bottom: "2%", left: "-8%" },
    float: { y: -14, x: 8, r: 6, dur: 6 },
    parallax: 40,
  },
  {
    src: "/stickers/saturn.png",
    alt: "Saturn sticker",
    className: "chani-sticker",
    style: { width: "27%", bottom: "-4%", right: "-6%" },
    float: { y: 18, r: 12, dur: 5.6 },
    parallax: -70,
  },
  {
    src: "/stickers/star.png",
    alt: "Sparkle star sticker",
    className: "chani-sticker",
    style: { width: "14%", top: "40%", right: "8%" },
    float: { y: -12, r: 18, dur: 3.8 },
    parallax: 30,
  },
  {
    src: "/stickers/comet.png",
    alt: "Comet sticker",
    className: "chani-sticker",
    style: { width: "16%", top: "36%", left: "6%" },
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
      const figure = stage.querySelector<HTMLElement>(".chani-stage-figure");

      // Entrance
      gsap.from(figure, {
        scale: 0.82,
        opacity: 0,
        y: 30,
        duration: 1.1,
        ease: "power3.out",
      });
      gsap.from(stickers, {
        scale: 0,
        opacity: 0,
        rotate: -40,
        transformOrigin: "50% 50%",
        duration: 0.9,
        ease: "back.out(1.7)",
        stagger: 0.12,
        delay: 0.25,
      });

      // Continuous float loops
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

      // Gentle breathing on figure
      gsap.to(figure, {
        y: -14,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Scroll parallax
      stickers.forEach((el, i) => {
        gsap.to(el, {
          yPercent: STICKERS[i].parallax,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <div className="chani-stage" ref={stageRef} aria-hidden="true">
      <div className="chani-orb" style={{ inset: "18% 20%" }} />
      <div className="chani-stage-figure">
        <img src="/stickers/celestial-figure.png" alt="" />
      </div>
      {STICKERS.map((s) => (
        <div key={s.src} className={s.className} style={s.style}>
          <img src={s.src} alt="" />
        </div>
      ))}
    </div>
  );
}
