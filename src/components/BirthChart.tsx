import { useEffect, useRef } from "react";
import { NatalPlacement, NatalAspect } from "../services/astrologyEngine";

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const ZODIAC_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

const DEFAULT_PLANETS = [
  { name: "Sun", glyph: "☉", sign: 4, degree: 15, house: 10, color: "#f0c870" },
  { name: "Moon", glyph: "☽", sign: 1, degree: 8, house: 4, color: "#bfb7aa" },
  { name: "Mercury", glyph: "☿", sign: 4, degree: 28, house: 10, color: "#a0c4ff" },
  { name: "Venus", glyph: "♀", sign: 3, degree: 5, house: 9, color: "#f4acb7" },
  { name: "Mars", glyph: "♂", sign: 8, degree: 22, house: 1, color: "#e07070" },
  { name: "Jupiter", glyph: "♃", sign: 11, degree: 3, house: 3, color: "#f0c060" },
  { name: "Saturn", glyph: "♄", sign: 6, degree: 18, house: 12, color: "#8aabcc" },
  { name: "Asc", glyph: "AC", sign: 8, degree: 14, house: 1, color: "#ee5d34" },
];

const DEFAULT_ASPECTS = [
  { p1: 0, p2: 2, type: "conjunction", color: "rgba(238,93,52,0.5)" },
  { p1: 0, p2: 4, type: "trine", color: "rgba(100,180,100,0.4)" },
  { p1: 1, p2: 3, type: "sextile", color: "rgba(100,160,220,0.4)" },
  { p1: 1, p2: 6, type: "opposition", color: "rgba(220,100,100,0.35)" },
  { p1: 2, p2: 5, type: "square", color: "rgba(220,150,60,0.35)" },
];

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
  Ascendant: "#ee5d34",
  Asc: "#ee5d34",
};

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

  // Map dynamic placements to chart internal planet array
  const activePlanets = placements && placements.length > 0
    ? placements.slice(0, 10).map((p) => {
        const signIdx = ZODIAC_SIGNS.findIndex(
          (s) => s.toLowerCase() === (p.sign || "").toLowerCase()
        );
        return {
          name: p.planet,
          glyph: PLANET_GLYPH_MAP[p.planet] || p.glyph || "✦",
          sign: signIdx >= 0 ? signIdx : p.signIndex || 0,
          degree: Math.round(p.degrees % 30),
          house: p.house || 1,
          color: PLANET_COLOR_MAP[p.planet] || p.color || "#eee5d3",
        };
      })
    : DEFAULT_PLANETS;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
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
    const innerR = houseInner;

    const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);

    const draw = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      if (animated) {
        const elapsed = timestamp - startTimeRef.current;
        progressRef.current = Math.min(elapsed / 1800, 1);
      }

      const p = progressRef.current;
      ctx.clearRect(0, 0, size, size);

      // Outer space bg
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR);
      bgGrad.addColorStop(0, "rgba(20, 15, 40, 0.95)");
      bgGrad.addColorStop(1, "rgba(5, 6, 15, 0.95)");

      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Background stars in chart
      if (p > 0.1) {
        const starAlpha = Math.min((p - 0.1) / 0.3, 1);
        for (let i = 0; i < 60; i++) {
          const angle = (i * 137.5) * (Math.PI / 180);
          const r = 20 + (i / 60) * innerR * 0.85;
          const sx = cx + r * Math.cos(angle);
          const sy = cy + r * Math.sin(angle);
          ctx.beginPath();
          ctx.arc(sx, sy, 0.5 + Math.random() * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 195, 240, ${starAlpha * 0.3 * Math.random()})`;
          ctx.fill();
        }
      }

      // Draw zodiac wheel
      const zodiacAlpha = Math.min(p / 0.3, 1);
      for (let i = 0; i < 12; i++) {
        const startAngle = toRad(i * 30);
        const endAngle = toRad((i + 1) * 30);

        // Alternating subtle fills
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, zodiacOuter, startAngle, endAngle);
        ctx.closePath();
        const isEarth = [1, 5, 9].includes(i);
        const isWater = [3, 7, 11].includes(i);
        const isFire = [0, 4, 8].includes(i);
        const fillA = isEarth ? 0.06 : isWater ? 0.07 : isFire ? 0.05 : 0.04;
        const fillColor = isEarth ? `rgba(139, 180, 100, ${fillA * zodiacAlpha})` :
          isWater ? `rgba(100, 140, 220, ${fillA * zodiacAlpha})` :
          isFire ? `rgba(220, 120, 80, ${fillA * zodiacAlpha})` :
          `rgba(200, 180, 100, ${fillA * zodiacAlpha})`;
        ctx.fillStyle = fillColor;
        ctx.fill();

        // Zodiac dividers
        ctx.beginPath();
        ctx.moveTo(cx + zodiacInner * Math.cos(startAngle), cy + zodiacInner * Math.sin(startAngle));
        ctx.lineTo(cx + zodiacOuter * Math.cos(startAngle), cy + zodiacOuter * Math.sin(startAngle));
        ctx.strokeStyle = `rgba(167, 139, 218, ${0.4 * zodiacAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Zodiac glyph
        const midAngle = toRad(i * 30 + 15);
        const glyphR = (zodiacOuter + zodiacInner) / 2;
        const gx = cx + glyphR * Math.cos(midAngle);
        const gy = cy + glyphR * Math.sin(midAngle);
        ctx.save();
        ctx.globalAlpha = zodiacAlpha;
        ctx.translate(gx, gy);
        ctx.font = `${size * 0.026}px serif`;
        ctx.fillStyle = "#bfb7aa";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ZODIAC_GLYPHS[i], 0, 0);
        ctx.restore();
      }

      // Zodiac ring borders
      ctx.beginPath();
      ctx.arc(cx, cy, zodiacOuter, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167, 139, 218, ${0.5 * zodiacAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, zodiacInner, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167, 139, 218, ${0.35 * zodiacAlpha})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // House wheel
      const houseAlpha = Math.min((p - 0.2) / 0.3, 1);
      if (houseAlpha > 0) {
        for (let i = 0; i < 12; i++) {
          const startAngle = toRad(i * 30 + 7);
          ctx.beginPath();
          ctx.moveTo(cx + houseInner * Math.cos(startAngle), cy + houseInner * Math.sin(startAngle));
          ctx.lineTo(cx + houseOuter * Math.cos(startAngle), cy + houseOuter * Math.sin(startAngle));
          ctx.strokeStyle = `rgba(167, 139, 218, ${0.25 * houseAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // House number
          const midAngle = toRad(i * 30 + 22);
          const numR = (houseOuter + houseInner) / 2;
          ctx.save();
          ctx.globalAlpha = houseAlpha;
          ctx.translate(cx + numR * Math.cos(midAngle), cy + numR * Math.sin(midAngle));
          ctx.font = `${size * 0.02}px 'DM Mono', monospace`;
          ctx.fillStyle = "rgba(167, 139, 218, 0.6)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(i + 1), 0, 0);
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, houseInner, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 139, 218, ${0.3 * houseAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // Inner circle
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR);
      innerGrad.addColorStop(0, "rgba(20, 12, 45, 0.8)");
      innerGrad.addColorStop(1, "rgba(8, 8, 20, 0.6)");
      ctx.fillStyle = innerGrad;
      ctx.fill();

      // Aspect lines
      const aspectAlpha = Math.min((p - 0.55) / 0.3, 1);
      if (aspectAlpha > 0) {
        for (const aspect of DEFAULT_ASPECTS) {
          if (aspect.p1 < activePlanets.length && aspect.p2 < activePlanets.length) {
            const p1 = activePlanets[aspect.p1];
            const p2 = activePlanets[aspect.p2];
            const a1 = toRad(p1.sign * 30 + p1.degree);
            const a2 = toRad(p2.sign * 30 + p2.degree);
            const r = innerR * 0.88;
            ctx.beginPath();
            ctx.moveTo(cx + r * Math.cos(a1), cy + r * Math.sin(a1));
            ctx.lineTo(cx + r * Math.cos(a2), cy + r * Math.sin(a2));
            ctx.strokeStyle = aspect.color.replace(")", `, ${aspectAlpha})`).replace("rgba(", "rgba(");
            ctx.lineWidth = 0.75;
            ctx.setLineDash(aspect.type === "square" ? [3, 3] : []);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Cross lines (cardinal axes)
      const axisAlpha = Math.min((p - 0.4) / 0.2, 1);
      if (axisAlpha > 0) {
        ctx.beginPath();
        ctx.moveTo(cx - innerR, cy);
        ctx.lineTo(cx + innerR, cy);
        ctx.moveTo(cx, cy - innerR);
        ctx.lineTo(cx, cy + innerR);
        ctx.strokeStyle = `rgba(167, 139, 218, ${0.2 * axisAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Planet points & highlight rings
      const planetAlpha = Math.min((p - 0.65) / 0.35, 1);
      if (planetAlpha > 0) {
        for (const planet of activePlanets) {
          const angle = toRad(planet.sign * 30 + planet.degree);
          const r = (houseOuter + houseInner) / 2 * 1.15;
          const px = cx + r * Math.cos(angle);
          const py = cy + r * Math.sin(angle);

          const isHighlighted =
            highlightedPlanet &&
            (planet.name.toLowerCase() === highlightedPlanet.toLowerCase() ||
             planet.glyph === highlightedPlanet);

          // Highlight pulse ring if active
          if (isHighlighted) {
            ctx.beginPath();
            ctx.arc(px, py, 11, 0, Math.PI * 2);
            ctx.strokeStyle = "#ee5d34";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(px, py, 16, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(238, 93, 52, 0.4)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Dot
          ctx.beginPath();
          ctx.arc(px, py, isHighlighted ? 4 : 3, 0, Math.PI * 2);
          ctx.fillStyle = isHighlighted ? "#ee5d34" : planet.color;
          ctx.globalAlpha = planetAlpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Glyph
          ctx.save();
          ctx.globalAlpha = planetAlpha;
          ctx.translate(px, py - 11);
          ctx.font = `bold ${size * 0.028}px serif`;
          ctx.fillStyle = isHighlighted ? "#ee5d34" : planet.color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(planet.glyph, 0, 0);
          ctx.restore();
        }
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${zodiacAlpha})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201, 169, 110, ${0.4 * zodiacAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (animated && progressRef.current < 1) {
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [animated, size, activePlanets, highlightedPlanet]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onSelectPlanet) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.46;
    const zodiacInner = outerR * 0.82;
    const houseOuter = zodiacInner;
    const houseInner = zodiacInner * 0.76;
    const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);

    for (const planet of activePlanets) {
      const angle = toRad(planet.sign * 30 + planet.degree);
      const r = (houseOuter + houseInner) / 2 * 1.15;
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      const dist = Math.hypot(clickX - px, clickY - py);
      if (dist < 22) {
        onSelectPlanet(planet.name);
        break;
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{ width: size, height: size, maxWidth: "100%", cursor: onSelectPlanet ? "pointer" : "default" }}
    />
  );
}
