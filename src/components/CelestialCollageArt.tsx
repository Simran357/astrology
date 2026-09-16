"use client";

import React from "react";

/**
 * CelestialCollageArt
 * 
 * Graphic Designer Artwork:
 * - Milky Way galactic core with warm star clouds & dark interstellar dust lanes
 * - Astrological armillary sphere with 12-sign zodiac wheel & ecliptic degree markers
 * - Faceted astral quartz crystals channeling celestial light with prism reflections
 * - 100% GPU-accelerated CSS animations (0 JS requestAnimationFrame tick overhead)
 * - Optimized for low screen resolution, low frame rate, and budget mobile GPUs
 */
export default function CelestialCollageArt() {
  return (
    <div
      className="hero-art select-none"
      style={{
        position: "relative",
        width: "100%",
        minHeight: 520,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Astrological Milky Way Galaxy and Astral Crystal Art"
    >
      <style>{`
        /* Pure CSS Hardware Accelerated Animations - 0 CPU Tick Load */
        @keyframes astro-galaxy-pulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes astro-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes astro-spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes astro-crystal-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(0.8deg); }
        }
        @keyframes astro-shard-a {
          0%, 100% { transform: translate(0px, 0px) rotate(-3deg); }
          50% { transform: translate(4px, -10px) rotate(4deg); }
        }
        @keyframes astro-shard-b {
          0%, 100% { transform: translate(0px, 0px) rotate(5deg); }
          50% { transform: translate(-5px, -8px) rotate(-2deg); }
        }
        @keyframes astro-beam-shimmer {
          0%, 100% { opacity: 0.35; transform: scaleY(0.96); }
          50% { opacity: 0.75; transform: scaleY(1.04); }
        }
        @keyframes astro-starlight {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }
        
        .anim-galaxy-core {
          animation: astro-galaxy-pulse 8s ease-in-out infinite;
          transform-origin: 270px 220px;
          will-change: transform, opacity;
        }
        .anim-zodiac-wheel {
          animation: astro-spin-cw 75s linear infinite;
          transform-origin: 270px 220px;
          will-change: transform;
        }
        .anim-orbit-inner {
          animation: astro-spin-ccw 45s linear infinite;
          transform-origin: 270px 220px;
          will-change: transform;
        }
        .anim-crystal-cluster {
          animation: astro-crystal-float 6s ease-in-out infinite;
          transform-origin: 270px 420px;
          will-change: transform;
        }
        .anim-shard-left {
          animation: astro-shard-a 5.5s ease-in-out infinite;
          transform-origin: 165px 380px;
          will-change: transform;
        }
        .anim-shard-right {
          animation: astro-shard-b 6.8s ease-in-out infinite;
          transform-origin: 375px 390px;
          will-change: transform;
        }
        .anim-prism-beam {
          animation: astro-beam-shimmer 4s ease-in-out infinite;
          transform-origin: 270px 330px;
          will-change: transform, opacity;
        }
        .anim-star-twinkle-1 { animation: astro-starlight 3.2s ease-in-out infinite; transform-origin: center; }
        .anim-star-twinkle-2 { animation: astro-starlight 4.5s ease-in-out infinite 1.5s; transform-origin: center; }
        .anim-star-twinkle-3 { animation: astro-starlight 3.8s ease-in-out infinite 0.7s; transform-origin: center; }
      `}</style>

      <svg
        viewBox="0 0 540 570"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "min(100%, 540px)",
          height: "auto",
          overflow: "visible",
          filter: "drop-shadow(0 12px 32px rgba(10,6,22,0.6))",
        }}
        shapeRendering="geometricPrecision"
      >
        <defs>
          {/* 1. Milky Way Galactic Bulge & Ambient Space Gradients */}
          <radialGradient id="galactic-core-glow" cx="45%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#f7e2a8" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#ee7c44" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#5d2c6e" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#140f26" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0e0a17" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="milky-way-band" x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#1c1236" stopOpacity="0" />
            <stop offset="28%" stopColor="#3d1d52" stopOpacity="0.45" />
            <stop offset="48%" stopColor="#dca860" stopOpacity="0.65" />
            <stop offset="54%" stopColor="#f3deb0" stopOpacity="0.8" />
            <stop offset="62%" stopColor="#d56b3e" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#2a1645" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0e0a17" stopOpacity="0" />
          </linearGradient>

          {/* 2. Crystal Facet Shading Gradients (Prismatic Quartz & Amethyst) */}
          <linearGradient id="crystal-main-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8f4eb" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#d8ccdf" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4f386b" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="crystal-main-center" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="30%" stopColor="#faecd0" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#e89e6c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#844572" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="crystal-main-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2d8ea" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#473063" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1b122e" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="crystal-teal-facet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c5f7ed" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#3ba393" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#16393b" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="prism-ray-grad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f5dd98" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#ee5d34" stopOpacity="0.35" />
            <stop offset="75%" stopColor="#8be4d8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* 3. Celestial Rings & Metal Gold */}
          <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7e8b8" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#966d1f" />
          </linearGradient>

          <linearGradient id="copper-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f29b7a" />
            <stop offset="100%" stopColor="#c84620" />
          </linearGradient>

          {/* Simple crisp glow filter that is lightweight on GPU */}
          <filter id="soft-shimmer" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 1: DEEP COSMOS & MILKY WAY GALAXY CORE                 */}
        {/* ------------------------------------------------------------- */}
        <g id="galaxy-deep-space">
          {/* Outer Cosmic Vignette */}
          <circle cx="270" cy="220" r="230" fill="url(#galactic-core-glow)" className="anim-galaxy-core" />

          {/* Diagonal Milky Way River Stream */}
          <g transform="rotate(-34 270 220)">
            {/* Luminous Core Stream */}
            <ellipse
              cx="270"
              cy="220"
              rx="240"
              ry="75"
              fill="url(#milky-way-band)"
              filter="url(#soft-shimmer)"
            />

            {/* Dense Stellar Bulge Center */}
            <ellipse
              cx="270"
              cy="220"
              rx="120"
              ry="45"
              fill="#fff4d4"
              opacity="0.38"
            />
            <ellipse
              cx="270"
              cy="220"
              rx="60"
              ry="22"
              fill="#ffffff"
              opacity="0.65"
            />

            {/* Milky Way Interstellar Dark Dust Lanes (Branching silhouetted gas clouds) */}
            <path
              d="M100 215 C150 205, 180 230, 225 218 C255 210, 280 228, 320 216 C370 200, 410 222, 450 215 C410 226, 370 214, 325 226 C280 238, 250 218, 220 227 C175 238, 140 218, 100 215 Z"
              fill="#100b1d"
              opacity="0.82"
            />
            <path
              d="M140 200 C190 195, 230 212, 275 204 C310 198, 350 210, 390 198 C355 205, 315 196, 280 209 C235 218, 185 202, 140 200 Z"
              fill="#0b0816"
              opacity="0.75"
            />
            <path
              d="M210 235 C240 230, 270 242, 305 236 C335 230, 365 240, 395 232 C360 240, 330 232, 295 242 C265 250, 235 236, 210 235 Z"
              fill="#180e29"
              opacity="0.65"
            />
          </g>

          {/* Micro Star Clusters (Vector points, extremely low GPU memory) */}
          <g fill="#fbeece">
            <circle cx="160" cy="140" r="1.4" opacity="0.8" className="anim-star-twinkle-1" />
            <circle cx="195" cy="110" r="1.8" opacity="0.9" className="anim-star-twinkle-2" />
            <circle cx="340" cy="120" r="1.5" opacity="0.85" className="anim-star-twinkle-3" />
            <circle cx="390" cy="155" r="1.2" opacity="0.7" className="anim-star-twinkle-1" />
            <circle cx="120" cy="280" r="1.6" opacity="0.85" className="anim-star-twinkle-2" />
            <circle cx="430" cy="270" r="1.3" opacity="0.75" className="anim-star-twinkle-3" />
            <circle cx="210" cy="90" r="2.2" opacity="0.9" filter="url(#soft-shimmer)" />
            <circle cx="320" cy="85" r="2" opacity="0.9" filter="url(#soft-shimmer)" />
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 2: ASTROLOGICAL ARMILLARY SPHERES & ZODIAC WHEEL       */}
        {/* ------------------------------------------------------------- */}
        <g id="astrological-spheres">
          {/* Ecliptic Plane Coordinates Ring (23.4° Tilt) */}
          <ellipse
            cx="270"
            cy="220"
            rx="212"
            ry="92"
            stroke="url(#gold-metallic)"
            strokeWidth="1.2"
            strokeDasharray="3 6"
            opacity="0.45"
            transform="rotate(-23.4 270 220)"
          />

          {/* Meridian & Equator Great Circles */}
          <ellipse
            cx="270"
            cy="220"
            rx="92"
            ry="212"
            stroke="#9f8cc0"
            strokeWidth="0.9"
            strokeDasharray="2 8"
            opacity="0.3"
            transform="rotate(15 270 220)"
          />

          {/* INNER ORBIT WITH CELESTIAL BODIES (CCW Rotation) */}
          <g className="anim-orbit-inner">
            <circle cx="270" cy="220" r="138" stroke="url(#copper-accent)" strokeWidth="1" strokeDasharray="5 10" opacity="0.55" />
            {/* Sun Luminary Disc */}
            <g transform="translate(408 220)">
              <circle cx="0" cy="0" r="8" fill="#ffd56b" filter="url(#soft-shimmer)" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffd56b" strokeWidth="1" opacity="0.7" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffd56b" strokeWidth="1" opacity="0.7" />
            </g>
            {/* Crescent Moon Disc */}
            <g transform="translate(132 220)">
              <circle cx="0" cy="0" r="7" fill="#d2c9e3" />
              <circle cx="2.5" cy="-1.5" r="6" fill="#0e0a17" />
            </g>
            {/* Mars Node */}
            <circle cx="270" cy="82" r="4.5" fill="#ee5d34" filter="url(#soft-shimmer)" />
            {/* Venus Node */}
            <circle cx="270" cy="358" r="4" fill="#69cbb8" filter="url(#soft-shimmer)" />
          </g>

          {/* OUTER ZODIAC WHEEL RING (Slow Clockwise Rotation) */}
          <g className="anim-zodiac-wheel">
            {/* Concentric Calibration Rims */}
            <circle cx="270" cy="220" r="186" stroke="url(#gold-metallic)" strokeWidth="1.6" opacity="0.65" />
            <circle cx="270" cy="220" r="172" stroke="url(#gold-metallic)" strokeWidth="0.8" opacity="0.35" />

            {/* 12 House Dividing Ray Notches */}
            {Array.from({ length: 12 }).map((_, i) => {
              const deg = i * 30;
              const rad = (deg * Math.PI) / 180;
              const x1 = 270 + 172 * Math.cos(rad);
              const y1 = 220 + 172 * Math.sin(rad);
              const x2 = 270 + 186 * Math.cos(rad);
              const y2 = 220 + 186 * Math.sin(rad);
              return (
                <line
                  key={`ray-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#f0c870"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
              );
            })}

            {/* Authentic 12 Zodiac Glyphs Inscribed on Circumference */}
            {[
              { glyph: "♈", deg: 15 },
              { glyph: "♉", deg: 45 },
              { glyph: "♊", deg: 75 },
              { glyph: "♋", deg: 105 },
              { glyph: "♌", deg: 135 },
              { glyph: "♍", deg: 165 },
              { glyph: "♎", deg: 195 },
              { glyph: "♏", deg: 225 },
              { glyph: "♐", deg: 255 },
              { glyph: "♑", deg: 285 },
              { glyph: "♒", deg: 315 },
              { glyph: "♓", deg: 345 },
            ].map(({ glyph, deg }) => {
              const rad = (deg * Math.PI) / 180;
              const gx = 270 + 179 * Math.cos(rad);
              const gy = 220 + 179 * Math.sin(rad);
              return (
                <text
                  key={glyph}
                  x={gx}
                  y={gy + 3.5}
                  fontSize="11"
                  fill="#fbeece"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  opacity="0.85"
                >
                  {glyph}
                </text>
              );
            })}

            {/* Sacred Geometric Aspect Lines (Trine & Grand Cross) */}
            <polygon
              points="270,48 419,306 121,306"
              stroke="#f0c870"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              fill="none"
              opacity="0.25"
            />
            <polygon
              points="270,392 121,134 419,134"
              stroke="#8feaff"
              strokeWidth="0.7"
              strokeDasharray="3 7"
              fill="none"
              opacity="0.2"
            />
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 3: PRISMATIC LIGHT BEAMS FROM CRYSTAL APEX             */}
        {/* ------------------------------------------------------------- */}
        <g id="refractive-crystal-beams" className="anim-prism-beam">
          {/* Central Vertical Pillar of Light */}
          <polygon
            points="270,332 235,90 305,90"
            fill="url(#prism-ray-grad)"
          />
          {/* Refractive Left Flare */}
          <polygon
            points="270,332 140,140 180,120"
            fill="url(#prism-ray-grad)"
            opacity="0.5"
          />
          {/* Refractive Right Flare */}
          <polygon
            points="270,332 360,120 400,140"
            fill="url(#prism-ray-grad)"
            opacity="0.5"
          />
          {/* Apex Focal Starburst */}
          <circle cx="270" cy="332" r="6" fill="#ffffff" filter="url(#soft-shimmer)" />
          <line x1="250" y1="332" x2="290" y2="332" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="270" y1="312" x2="270" y2="352" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 4: FACETED ASTRAL QUARTZ & AMETHYST CRYSTAL CLUSTER    */}
        {/* ------------------------------------------------------------- */}
        <g id="astral-crystals" className="anim-crystal-cluster">
          {/* Crystal Bed Base Shadow */}
          <ellipse cx="270" cy="512" rx="140" ry="22" fill="#07040d" opacity="0.9" />

          {/* LEFT SUPPORTING CRYSTAL (Teal/Emerald Shading) */}
          <g id="crystal-left">
            {/* Base Body Facet */}
            <polygon points="195,400 170,480 205,505 225,435" fill="#13272d" />
            {/* Front Left Facet */}
            <polygon points="195,400 225,435 240,495 205,505" fill="url(#crystal-teal-facet)" opacity="0.75" />
            {/* Top Termination Apex */}
            <polygon points="195,400 175,370 215,365 225,405" fill="#cbfbf3" opacity="0.9" />
            <polygon points="175,370 195,400 170,430" fill="#245d5a" />
            {/* Edge Specular Lines */}
            <line x1="175" y1="370" x2="195" y2="400" stroke="#e8fffb" strokeWidth="1.2" />
            <line x1="195" y1="400" x2="225" y2="435" stroke="#ffffff" strokeWidth="1" />
          </g>

          {/* RIGHT SUPPORTING CRYSTAL (Deep Amethyst/Rust) */}
          <g id="crystal-right">
            {/* Body */}
            <polygon points="340,390 315,445 330,505 375,475" fill="#281335" />
            {/* Front Illuminated Facet */}
            <polygon points="340,390 330,505 355,510 385,450" fill="url(#crystal-main-right)" />
            {/* Top Termination Apex */}
            <polygon points="340,390 360,355 330,360 315,395" fill="#ecd9f7" opacity="0.85" />
            <polygon points="360,355 340,390 380,410" fill="#693082" />
            {/* Edge Highlights */}
            <line x1="360" y1="355" x2="340" y2="390" stroke="#fcf6ff" strokeWidth="1.2" />
            <line x1="340" y1="390" x2="330" y2="505" stroke="#ffffff" strokeWidth="0.9" />
          </g>

          {/* CENTER MONOLITHIC QUARTZ OBELISK (The Hero Crystal) */}
          <g id="crystal-center-hero">
            {/* Lower Stem Facet - Left Shadow */}
            <polygon
              points="235,420 220,515 260,525 270,440"
              fill="#221535"
            />
            {/* Lower Stem Facet - Center Prismatic Face */}
            <polygon
              points="270,440 260,525 285,525 305,435"
              fill="url(#crystal-main-center)"
            />
            {/* Lower Stem Facet - Right Ambient Face */}
            <polygon
              points="305,435 285,525 320,510 315,425"
              fill="url(#crystal-main-right)"
            />

            {/* Mid Prismatic Bevel Bands */}
            <polygon
              points="245,375 235,420 270,440 280,385"
              fill="url(#crystal-main-left)"
            />
            <polygon
              points="280,385 270,440 305,435 298,380"
              fill="#f8e7c4"
              opacity="0.95"
            />
            <polygon
              points="298,380 305,435 315,425 308,375"
              fill="#523267"
            />

            {/* PYRAMIDAL APEX TERMINATION (Reaching towards 270, 332) */}
            {/* Apex Face 1: Left Light Reflection */}
            <polygon
              points="270,332 245,375 280,385"
              fill="#ffffff"
              opacity="0.95"
            />
            {/* Apex Face 2: Front Golden Reflection */}
            <polygon
              points="270,332 280,385 298,380"
              fill="#faebd0"
            />
            {/* Apex Face 3: Right Amethyst Slope */}
            <polygon
              points="270,332 298,380 308,375"
              fill="#8e4d9c"
              opacity="0.9"
            />
            {/* Apex Face 4: Back Left Slope */}
            <polygon
              points="270,332 258,355 245,375"
              fill="#9adfd6"
              opacity="0.75"
            />

            {/* RAZOR-SHARP SPECULAR RIDGE HIGHLIGHTS (Gives true glass/quartz feel) */}
            <line x1="270" y1="332" x2="280" y2="385" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="280" y1="385" x2="270" y2="440" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="270" y1="440" x2="260" y2="525" stroke="#fff4dc" strokeWidth="1" strokeLinecap="round" />
            <line x1="270" y1="332" x2="245" y2="375" stroke="#d5fffa" strokeWidth="1.2" />
            <line x1="270" y1="332" x2="298" y2="380" stroke="#fbf1ff" strokeWidth="1.2" />
          </g>

          {/* Small Clustered Point Crystals at Base */}
          <polygon points="215,485 205,455 220,465 225,495" fill="#fce4a6" opacity="0.85" />
          <polygon points="318,480 332,450 338,475 328,498" fill="#a4e4d7" opacity="0.85" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 5: FLOATING SATELLITE CRYSTAL SHARDS                    */}
        {/* ------------------------------------------------------------- */}
        {/* Left Floating Shard */}
        <g id="shard-left" className="anim-shard-left">
          <polygon points="160,345 150,375 162,382 170,355" fill="url(#crystal-teal-facet)" />
          <polygon points="160,345 170,355 168,340" fill="#ffffff" opacity="0.9" />
          <line x1="160" y1="345" x2="162" y2="382" stroke="#ffffff" strokeWidth="0.9" />
        </g>

        {/* Right Floating Shard */}
        <g id="shard-right" className="anim-shard-right">
          <polygon points="380,355 368,385 382,392 390,365" fill="url(#crystal-main-right)" />
          <polygon points="380,355 390,365 388,350" fill="#faebd0" opacity="0.9" />
          <line x1="380" y1="355" x2="382" y2="392" stroke="#ffffff" strokeWidth="0.9" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 6: EDITORIAL CARTOGRAPHY & ARCHIVAL LABELS              */}
        {/* ------------------------------------------------------------- */}
        {/* Four Precision Corner Reticles */}
        <g stroke="#f0c870" strokeWidth="1" opacity="0.35" fill="none">
          <path d="M24 24 L24 48 M24 24 L48 24" />
          <path d="M516 24 L516 48 M516 24 L492 24" />
          <path d="M24 546 L24 522 M24 546 L48 546" />
          <path d="M516 546 L516 522 M516 546 L492 546" />
        </g>

        {/* Editorial Index Labels */}
        <text
          x="32"
          y="42"
          fontSize="7.5"
          fill="#ee5d34"
          fontFamily="monospace"
          letterSpacing="2"
          opacity="0.8"
        >
          00 / GALACTIC MERIDIAN
        </text>

        <text
          x="508"
          y="42"
          fontSize="7.5"
          fill="#f0c870"
          fontFamily="monospace"
          letterSpacing="1.5"
          textAnchor="end"
          opacity="0.75"
        >
          23.4° ECLIPTIC AXIS
        </text>

        {/* Archival Footnote */}
        <text
          x="270"
          y="556"
          fontSize="7"
          fill="#bfb7aa"
          fontFamily="monospace"
          letterSpacing="2.5"
          textAnchor="middle"
          opacity="0.6"
        >
          ✦ VIA LACTEA ✦ SACRED CARTOGRAPHY ✦ ASTRAL HERETIC ✦
        </text>
      </svg>
    </div>
  );
}
