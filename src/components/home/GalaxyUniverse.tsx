"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

/* ---- deterministic pseudo-random so SSR & client match ---- */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CENTER = 300;

/* CHANI-leaning cosmic palette (warm plum → coral → gold → white core) */
const ARM_COLORS = ["#f6e6c8", "#e5a63c", "#dc6b4f", "#b0568f", "#7b5bd6", "#4b3b9c"];

type Star = { x: number; y: number; r: number; o: number; c: string };

function buildGalaxy() {
  const rand = mulberry32(20260916);
  const arms = 3;
  const perArm = 150;
  const spiral: Star[] = [];

  for (let a = 0; a < arms; a++) {
    const armOffset = (Math.PI * 2 * a) / arms;
    for (let i = 0; i < perArm; i++) {
      const t = i / perArm;
      const theta = t * Math.PI * 3.3 + armOffset;
      const radius = 18 + t * 258;
      const spread = (1 - t) * 5 + t * 30;
      const jr = (rand() - 0.5) * spread * 2.2;
      const jx = (rand() - 0.5) * spread;
      const jy = (rand() - 0.5) * spread;
      const r = radius + jr;
      const x = CENTER + Math.cos(theta) * r + jx;
      const y = CENTER + Math.sin(theta) * r + jy;
      const size = rand() * 1.5 + 0.5 + (1 - t) * 1.4;
      const o = 0.35 + rand() * 0.6;
      const ci = Math.min(ARM_COLORS.length - 1, Math.floor(t * ARM_COLORS.length + (rand() - 0.5)));
      spiral.push({ x, y, r: size, o, c: ARM_COLORS[Math.max(0, ci)] });
    }
  }

  // scattered background stars (fixed field)
  const field: Star[] = [];
  for (let i = 0; i < 130; i++) {
    field.push({
      x: rand() * 600,
      y: rand() * 600,
      r: rand() * 1.3 + 0.3,
      o: 0.25 + rand() * 0.6,
      c: rand() > 0.7 ? "#f6e6c8" : "#d9c9ff",
    });
  }
  return { spiral, field };
}

export default function GalaxyUniverse() {
  const rootRef = useRef<SVGSVGElement>(null);
  const { spiral, field } = useMemo(buildGalaxy, []);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(".gx-spin", { rotation: 360, transformOrigin: "300px 300px", duration: 90, repeat: -1, ease: "none" });
      gsap.to(".gx-spin-rev", { rotation: -360, transformOrigin: "300px 300px", duration: 130, repeat: -1, ease: "none" });
      gsap.to(".gx-core", {
        scale: 1.12,
        transformOrigin: "300px 300px",
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      // orbiting bodies
      gsap.to(".gx-orbit-1", { rotation: 360, transformOrigin: "300px 300px", duration: 26, repeat: -1, ease: "none" });
      gsap.to(".gx-orbit-2", { rotation: -360, transformOrigin: "300px 300px", duration: 40, repeat: -1, ease: "none" });
      gsap.to(".gx-orbit-3", { rotation: 360, transformOrigin: "300px 300px", duration: 60, repeat: -1, ease: "none" });
      gsap.to(".gx-earth-spin", { rotation: 360, transformOrigin: "center", duration: 18, repeat: -1, ease: "none" });
      // twinkle
      gsap.to(".gx-twinkle", {
        opacity: 0.15,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.04, from: "random" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      className="gx-svg"
      viewBox="0 0 600 600"
      role="img"
      aria-label="An animated spiral galaxy with orbiting planets"
    >
      <defs>
        <radialGradient id="gx-bg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#2a1c46" />
          <stop offset="55%" stopColor="#1a1030" />
          <stop offset="100%" stopColor="#0c0718" />
        </radialGradient>
        <radialGradient id="gx-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7e6" />
          <stop offset="30%" stopColor="#ffe6a6" />
          <stop offset="60%" stopColor="#e5a63c" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#dc6b4f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gx-haze" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b0568f" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#7b5bd6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#4b3b9c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gx-earth" cx="38%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#8fd0ff" />
          <stop offset="45%" stopColor="#3f7fd4" />
          <stop offset="100%" stopColor="#243f8c" />
        </radialGradient>
        <radialGradient id="gx-planet" cx="38%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#f6d9a8" />
          <stop offset="60%" stopColor="#dc6b4f" />
          <stop offset="100%" stopColor="#8a3b39" />
        </radialGradient>
        <filter id="gx-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* space backdrop */}
      <rect x="0" y="0" width="600" height="600" fill="url(#gx-bg)" />

      {/* background starfield */}
      <g>
        {field.map((s, i) => (
          <circle key={`f${i}`} className="gx-twinkle" cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity={s.o} />
        ))}
      </g>

      {/* galaxy haze + spiral */}
      <circle className="gx-haze" cx="300" cy="300" r="270" fill="url(#gx-haze)" />
      <g className="gx-spin">
        {spiral.map((s, i) => (
          <circle key={`s${i}`} cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity={s.o} />
        ))}
      </g>

      {/* glowing core */}
      <circle className="gx-core" cx="300" cy="300" r="120" fill="url(#gx-core)" filter="url(#gx-glow)" />
      <circle cx="300" cy="300" r="9" fill="#fffaf0" filter="url(#gx-glow)" />

      {/* orbit rings */}
      <g className="gx-spin-rev" opacity="0.35" fill="none" stroke="#e5a63c" strokeWidth="0.8">
        <ellipse cx="300" cy="300" rx="200" ry="196" strokeDasharray="2 8" />
        <ellipse cx="300" cy="300" rx="252" ry="248" strokeDasharray="1 10" stroke="#b0568f" />
      </g>

      {/* orbiting Earth */}
      <g className="gx-orbit-1">
        <g transform="translate(300 92)">
          <g className="gx-earth-spin">
            <circle r="17" fill="url(#gx-earth)" />
            <path
              d="M-9 -6 q6 -3 10 2 q-2 5 -7 4 q-5 3 -8 -2 q2 -4 5 -4z M2 6 q6 -1 8 4 q-4 4 -9 1z"
              fill="#5fae6b"
              opacity="0.85"
            />
          </g>
          <circle r="17" fill="none" stroke="#bfe4ff" strokeOpacity="0.5" strokeWidth="1" />
        </g>
      </g>

      {/* orbiting warm planet with ring */}
      <g className="gx-orbit-2">
        <g transform="translate(548 300)">
          <ellipse rx="22" ry="7" fill="none" stroke="#f6d9a8" strokeWidth="2.4" opacity="0.75" transform="rotate(-18)" />
          <circle r="12" fill="url(#gx-planet)" />
        </g>
      </g>

      {/* small moon */}
      <g className="gx-orbit-3">
        <g transform="translate(300 552)">
          <circle r="8" fill="#e9dcc4" />
          <circle cx="-2" cy="-2" r="2" fill="#c8b79a" />
          <circle cx="3" cy="2" r="1.4" fill="#c8b79a" />
        </g>
      </g>
    </svg>
  );
}
