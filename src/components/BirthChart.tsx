"use client";

import { useEffect, useRef, useState } from "react";
import { NatalPlacement, NatalAspect } from "../services/astrologyEngine";

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const ZODIAC_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

const PLANET_GLYPH_MAP: Record<string, string> = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "♅",
  Neptune: "♆",
  Pluto: "♇",
  Chiron: "⚷",
  "North Node": "☊",
  Ascendant: "AC",
  Midheaven: "MC",
  Asc: "AC",
};

const PLANET_COLOR_MAP: Record<string, string> = {
  Sun: "#f0c870",
  Moon: "#bfb7aa",
  Mercury: "#a0c4ff",
  Venus: "#f4acb7",
  Mars: "#e07070",
  Jupiter: "#f0c060",
  Saturn: "#8aabcc",
  Uranus: "#90e0ef",
  Neptune: "#b8c0ff",
  Pluto: "#c77dff",
  Chiron: "#e9c46a",
  "North Node": "#f4a261",
  Ascendant: "#EAC157",
  Midheaven: "#38bdf8",
  Asc: "#EAC157",
};

// Standard Astrological Aspect Colors & Stroke Styles
const ASPECT_COLOR_MAP: Record<string, { color: string; dashed: boolean }> = {
  Conjunction: { color: "#EAC157", dashed: false },
  Trine: { color: "#38bdf8", dashed: false },
  Sextile: { color: "#34d399", dashed: false },
  Square: { color: "#ef4444", dashed: true },
  Opposition: { color: "#f43f5e", dashed: false },
  Quincunx: { color: "#a855f7", dashed: true },
  Inconjunction: { color: "#a855f7", dashed: true },
};

interface InternalPlanet {
  name: string;
  glyph: string;
  sign: number;
  signName: string;
  degree: number;
  house: number;
  color: string;
  isRetrograde: boolean;
  formatted: string;
  meaning: string;
  element: string;
}

interface BirthChartProps {
  animated?: boolean;
  size?: number;
  placements?: NatalPlacement[];
  aspects?: NatalAspect[];
  highlightedPlanet?: string | null;
  onSelectPlanet?: (planetName: string) => void;
}

export default function BirthChart({
  animated = true,
  size = 440,
  placements,
  aspects,
  highlightedPlanet,
  onSelectPlanet,
}: BirthChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const progressRef = useRef<number>(animated ? 0 : 1);
  const startTimeRef = useRef<number | null>(null);
  const [selectedPlanetDetail, setSelectedPlanetDetail] = useState<InternalPlanet | null>(null);

  // Normalize active planets from ephemeris placements
  const activePlanets: InternalPlanet[] = (placements && placements.length > 0)
    ? placements.slice(0, 14).map((p) => {
        const pName = p.planet || p.name || "Planet";
        const signIdx = ZODIAC_SIGNS.findIndex(
          (s) => s.toLowerCase() === (p.sign || "").toLowerCase()
        );
        const deg = typeof p.degrees === "number" ? p.degrees : (typeof p.degree === "number" ? p.degree : 15);
        return {
          name: pName,
          glyph: PLANET_GLYPH_MAP[pName] || pName.slice(0, 2),
          sign: signIdx >= 0 ? signIdx : 0,
          signName: p.sign || ZODIAC_SIGNS[signIdx >= 0 ? signIdx : 0],
          degree: Math.round(deg * 10) / 10,
          house: p.house || 1,
          color: PLANET_COLOR_MAP[pName] || "#f0c870",
          isRetrograde: Boolean(p.isRetrograde),
          formatted: p.formatted || `${Math.floor(deg)}° ${p.sign}`,
          meaning: p.meaning || "Planetary energy influencing personal growth and expression.",
          element: p.element || "Fire",
        };
      })
    : [
        { name: "Sun", glyph: "☉", sign: 4, signName: "Leo", degree: 15.2, house: 10, color: "#f0c870", isRetrograde: false, formatted: "15° Leo", meaning: "Core sovereign self and creative purpose.", element: "Fire" },
        { name: "Moon", glyph: "☽", sign: 1, signName: "Taurus", degree: 8.4, house: 4, color: "#bfb7aa", isRetrograde: false, formatted: "8° Taurus", meaning: "Emotional sanctuary and instinctual rhythm.", element: "Earth" },
        { name: "Mercury", glyph: "☿", sign: 4, signName: "Leo", degree: 28.1, house: 10, color: "#a0c4ff", isRetrograde: false, formatted: "28° Leo", meaning: "Intellectual cadence and communicative style.", element: "Fire" },
        { name: "Venus", glyph: "♀", sign: 3, signName: "Cancer", degree: 5.0, house: 9, color: "#f4acb7", isRetrograde: false, formatted: "5° Cancer", meaning: "Relational architecture and aesthetic devotion.", element: "Water" },
        { name: "Mars", glyph: "♂", sign: 8, signName: "Sagittarius", degree: 22.3, house: 1, color: "#e07070", isRetrograde: false, formatted: "22° Sagittarius", meaning: "Drive, courage, and instinctual initiative.", element: "Fire" },
        { name: "Jupiter", glyph: "♃", sign: 11, signName: "Pisces", degree: 3.5, house: 3, color: "#f0c060", isRetrograde: false, formatted: "3° Pisces", meaning: "Philosophical expansion and intuitive trust.", element: "Water" },
        { name: "Saturn", glyph: "♄", sign: 6, signName: "Libra", degree: 18.7, house: 12, color: "#8aabcc", isRetrograde: true, formatted: "18° Libra ℞", meaning: "Structural discipline and boundary discernment.", element: "Air" },
        { name: "Ascendant", glyph: "AC", sign: 8, signName: "Sagittarius", degree: 14.1, house: 1, color: "#EAC157", isRetrograde: false, formatted: "14° Sagittarius", meaning: "The threshold of dawn and instinctive lens on life.", element: "Fire" },
      ];

  // Resolve dynamic aspect geometry between actual active planets
  const dynamicAspects = (aspects && aspects.length > 0)
    ? aspects.map((asp) => {
        const p1Idx = activePlanets.findIndex(
          (p) => p.name.toLowerCase() === (asp.planet1 || "").toLowerCase()
        );
        const p2Idx = activePlanets.findIndex(
          (p) => p.name.toLowerCase() === (asp.planet2 || "").toLowerCase()
        );
        const aspCfg = ASPECT_COLOR_MAP[asp.type] || { color: "rgba(234,193,87,0.5)", dashed: false };
        return {
          p1Idx,
          p2Idx,
          planet1: asp.planet1,
          planet2: asp.planet2,
          type: asp.type,
          orb: asp.orb,
          angle: asp.angle,
          color: aspCfg.color,
          dashed: aspCfg.dashed,
        };
      }).filter((a) => a.p1Idx >= 0 && a.p2Idx >= 0)
    : [
        { p1Idx: 0, p2Idx: 2, planet1: "Sun", planet2: "Mercury", type: "Conjunction", color: "#EAC157", dashed: false },
        { p1Idx: 0, p2Idx: 4, planet1: "Sun", planet2: "Mars", type: "Trine", color: "#38bdf8", dashed: false },
        { p1Idx: 1, p2Idx: 3, planet1: "Moon", planet2: "Venus", type: "Sextile", color: "#34d399", dashed: false },
        { p1Idx: 1, p2Idx: 6, planet1: "Moon", planet2: "Saturn", type: "Opposition", color: "#f43f5e", dashed: false },
        { p1Idx: 2, p2Idx: 5, planet1: "Mercury", planet2: "Jupiter", type: "Square", color: "#ef4444", dashed: true },
      ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.46;
    const zodiacOuter = outerR;
    const zodiacInner = outerR * 0.82;
    const houseOuter = zodiacInner;
    const houseInner = zodiacInner * 0.76;
    const innerR = houseInner * 0.95;

    const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      if (animated) {
        progressRef.current = Math.min(elapsed / 1200, 1);
      } else {
        progressRef.current = 1;
      }

      const p = progressRef.current;
      ctx.clearRect(0, 0, size, size);

      // Outer glow / background
      const bgGrad = ctx.createRadialGradient(cx, cy, innerR * 0.2, cx, cy, outerR * 1.05);
      bgGrad.addColorStop(0, "rgba(8, 40, 66, 0.4)");
      bgGrad.addColorStop(0.8, "rgba(5, 32, 54, 0.8)");
      bgGrad.addColorStop(1, "rgba(3, 18, 32, 0.95)");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(234, 193, 87, ${0.4 * p})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Zodiac ring segments
      const zodiacAlpha = Math.min(p / 0.5, 1);
      for (let i = 0; i < 12; i++) {
        const startAngle = toRad(i * 30);

        // Segment divider line
        ctx.beginPath();
        ctx.moveTo(cx + zodiacInner * Math.cos(startAngle), cy + zodiacInner * Math.sin(startAngle));
        ctx.lineTo(cx + zodiacOuter * Math.cos(startAngle), cy + zodiacOuter * Math.sin(startAngle));
        ctx.strokeStyle = `rgba(234, 193, 87, ${0.35 * zodiacAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Zodiac glyph
        const midAngle = toRad(i * 30 + 15);
        const glyphR = (zodiacOuter + zodiacInner) / 2;
        const gx = cx + glyphR * Math.cos(midAngle);
        const gy = cy + glyphR * Math.sin(midAngle);
        ctx.save();
        ctx.globalAlpha = zodiacAlpha * 0.9;
        ctx.translate(gx, gy);
        ctx.font = `${Math.round(size * 0.03)}px serif`;
        ctx.fillStyle = i % 2 === 0 ? "#EAC157" : "#c5d3df";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ZODIAC_GLYPHS[i], 0, 0);
        ctx.restore();
      }

      // Zodiac inner and outer boundary circles
      ctx.beginPath();
      ctx.arc(cx, cy, zodiacOuter, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(234, 193, 87, ${0.45 * zodiacAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, zodiacInner, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(234, 193, 87, ${0.35 * zodiacAlpha})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // 12 Houses ring
      const houseAlpha = Math.min((p - 0.2) / 0.3, 1);
      if (houseAlpha > 0) {
        for (let i = 0; i < 12; i++) {
          const startAngle = toRad(i * 30);
          ctx.beginPath();
          ctx.moveTo(cx + houseInner * Math.cos(startAngle), cy + houseInner * Math.sin(startAngle));
          ctx.lineTo(cx + houseOuter * Math.cos(startAngle), cy + houseOuter * Math.sin(startAngle));
          ctx.strokeStyle = `rgba(197, 211, 223, ${0.2 * houseAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // House number
          const midAngle = toRad(i * 30 + 15);
          const numR = (houseOuter + houseInner) / 2;
          ctx.save();
          ctx.globalAlpha = houseAlpha * 0.8;
          ctx.translate(cx + numR * Math.cos(midAngle), cy + numR * Math.sin(midAngle));
          ctx.font = `${Math.round(size * 0.02)}px monospace`;
          ctx.fillStyle = "#c5d3df";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(i + 1), 0, 0);
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, houseInner, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(234, 193, 87, ${0.3 * houseAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // Inner aspect disc
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR);
      innerGrad.addColorStop(0, "rgba(8, 40, 66, 0.75)");
      innerGrad.addColorStop(1, "rgba(5, 32, 54, 0.95)");
      ctx.fillStyle = innerGrad;
      ctx.fill();

      // Verified dynamic aspect lines from ephemeris
      const aspectAlpha = Math.min((p - 0.45) / 0.35, 1);
      if (aspectAlpha > 0) {
        for (const aspect of dynamicAspects) {
          const p1 = activePlanets[aspect.p1Idx];
          const p2 = activePlanets[aspect.p2Idx];
          if (!p1 || !p2) continue;

          const a1 = toRad(p1.sign * 30 + p1.degree);
          const a2 = toRad(p2.sign * 30 + p2.degree);
          const r = innerR * 0.92;

          ctx.beginPath();
          ctx.moveTo(cx + r * Math.cos(a1), cy + r * Math.sin(a1));
          ctx.lineTo(cx + r * Math.cos(a2), cy + r * Math.sin(a2));
          ctx.strokeStyle = aspect.color;
          ctx.globalAlpha = aspectAlpha * 0.65;
          ctx.lineWidth = 1;
          if (aspect.dashed) {
            ctx.setLineDash([4, 4]);
          } else {
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
      }

      // Cardinal axes (Ascendant/Descendant & MC/IC)
      const axisAlpha = Math.min((p - 0.4) / 0.2, 1);
      if (axisAlpha > 0) {
        ctx.beginPath();
        ctx.moveTo(cx - innerR, cy);
        ctx.lineTo(cx + innerR, cy);
        ctx.moveTo(cx, cy - innerR);
        ctx.lineTo(cx, cy + innerR);
        ctx.strokeStyle = `rgba(234, 193, 87, ${0.25 * axisAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // Real planet glyphs and coordinates
      const planetAlpha = Math.min((p - 0.6) / 0.4, 1);
      if (planetAlpha > 0) {
        for (const planet of activePlanets) {
          const angle = toRad(planet.sign * 30 + planet.degree);
          const r = (houseOuter + houseInner) / 2 * 1.15;
          const px = cx + r * Math.cos(angle);
          const py = cy + r * Math.sin(angle);

          const isHighlighted =
            (highlightedPlanet &&
              (planet.name.toLowerCase() === (highlightedPlanet || "").toLowerCase() ||
                planet.glyph === highlightedPlanet)) ||
            (selectedPlanetDetail && selectedPlanetDetail.name === planet.name);

          // Highlight pulse rings
          if (isHighlighted) {
            ctx.beginPath();
            ctx.arc(px, py, 13, 0, Math.PI * 2);
            ctx.strokeStyle = "#EAC157";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(px, py, 18, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(234, 193, 87, 0.4)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Planet point
          ctx.beginPath();
          ctx.arc(px, py, isHighlighted ? 5 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isHighlighted ? "#EAC157" : planet.color;
          ctx.globalAlpha = planetAlpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Planet glyph
          ctx.save();
          ctx.globalAlpha = planetAlpha;
          ctx.translate(px, py - 12);
          ctx.font = `bold ${Math.round(size * 0.032)}px serif`;
          ctx.fillStyle = isHighlighted ? "#EAC157" : planet.color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(planet.glyph, 0, 0);

          // Retrograde symbol if applicable
          if (planet.isRetrograde) {
            ctx.font = `bold ${Math.round(size * 0.016)}px sans-serif`;
            ctx.fillStyle = "#ef4444";
            ctx.fillText("℞", 10, -2);
          }
          ctx.restore();
        }
      }

      // Center pivot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#EAC157";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(234, 193, 87, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (animated && progressRef.current < 1) {
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [animated, size, activePlanets, dynamicAspects, highlightedPlanet, selectedPlanetDetail]);

  // Interactive tap / click planet detection
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scale = rect.width > 0 ? size / rect.width : 1;
    const clickX = (e.clientX - rect.left) * scale;
    const clickY = (e.clientY - rect.top) * scale;

    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.46;
    const zodiacInner = outerR * 0.82;
    const houseOuter = zodiacInner;
    const houseInner = zodiacInner * 0.76;
    const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);

    let found = false;
    for (const planet of activePlanets) {
      const angle = toRad(planet.sign * 30 + planet.degree);
      const r = (houseOuter + houseInner) / 2 * 1.15;
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      const dist = Math.hypot(clickX - px, clickY - py);
      if (dist < 26) {
        setSelectedPlanetDetail(planet);
        if (onSelectPlanet) {
          onSelectPlanet(planet.name);
        }
        found = true;
        break;
      }
    }

    if (!found) {
      setSelectedPlanetDetail(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative" style={{ maxWidth: size }}>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="w-full aspect-square block mx-auto select-none touch-manipulation cursor-pointer"
        style={{
          width: "100%",
          maxWidth: size,
          aspectRatio: "1 / 1",
          height: "auto",
        }}
        aria-label="Interactive Natal Chart Wheel"
      />

      {/* Selected Planet Details Inspector */}
      {selectedPlanetDetail && (
        <div className="mt-3 w-full border border-[#052036]/15 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-xs font-sans shadow-xl relative z-20 text-[#052036]">
          <div className="flex items-center justify-between gap-2 border-b border-[#EAC157]/20 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-serif" style={{ color: selectedPlanetDetail.color }}>
                {selectedPlanetDetail.glyph}
              </span>
              <span className="font-cormorant text-base font-semibold text-[#052036]">
                {selectedPlanetDetail.name}
              </span>
              {selectedPlanetDetail.isRetrograde && (
                <span className="px-1.5 py-0.5 rounded bg-red-950/80 border border-red-500/50 text-[10px] font-mono text-red-300 font-bold">
                  ℞ Retrograde
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedPlanetDetail(null)}
              className="text-[#052036]/60 hover:text-[#052036] p-1 cursor-pointer font-mono"
              aria-label="Close inspector"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] mb-2 font-mono">
            <div className="p-2 rounded bg-[#FAF7F2] border border-[#052036]/10">
              <span className="text-[#052036]/60 block text-[10px] uppercase">Zodiac & Degree</span>
              <span className="text-[#EAC157] font-semibold">{selectedPlanetDetail.formatted}</span>
            </div>
            <div className="p-2 rounded bg-[#FAF7F2] border border-[#052036]/10">
              <span className="text-[#052036]/60 block text-[10px] uppercase">House Placement</span>
              <span className="text-[#052036] font-semibold">House {selectedPlanetDetail.house} ({selectedPlanetDetail.element})</span>
            </div>
          </div>

          <p className="text-[#052036]/80 leading-relaxed font-sans text-[11px]">
            {selectedPlanetDetail.meaning}
          </p>
        </div>
      )}

      {/* Aspect Legend Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono text-[#052036]/70">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-0.5 bg-[#38bdf8] inline-block rounded" /> Trine (120°)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-0.5 bg-[#34d399] inline-block rounded" /> Sextile (60°)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-0.5 bg-[#ef4444] border-t border-dashed border-[#ef4444] inline-block" /> Square (90°)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-0.5 bg-[#f43f5e] inline-block rounded" /> Opposition (180°)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-0.5 bg-[#EAC157] inline-block rounded" /> Conjunction (0°)
        </span>
      </div>
    </div>
  );
}
