import { useId } from "react";

interface GalaxyCanvasProps {
  className?: string;
  opacity?: number;
}

const stars = Array.from({ length: 84 }, (_, index) => ({
  x: (index * 47 + 11) % 100,
  y: (index * 73 + 7) % 100,
  r: index % 17 === 0 ? 0.22 : 0.07 + (index % 4) * 0.035,
  opacity: 0.24 + (index % 6) * 0.1,
}));

const particles = Array.from({ length: 560 }, (_, index) => {
  const radius = 3 + ((index * 37) % 100) * 0.48;
  const arm = index % 2 ? 1 : -1;
  const angle = index * 0.19 + radius * 0.12 * arm;
  const spread = (((index * 23) % 19) - 9) * (0.08 + radius * 0.006);
  const x = 50 + Math.cos(angle) * radius + spread;
  const y = 50 + Math.sin(angle) * radius * 0.46 + spread * 0.34;
  return {
    x,
    y,
    r: index % 37 === 0 ? 0.24 : index % 9 === 0 ? 0.16 : 0.055 + (index % 3) * 0.025,
    opacity: Math.max(0.18, 0.86 - radius / 70) * (0.62 + (index % 5) * 0.08),
  };
});

function Crystal({ x, y, scale = 1, rotate = 0 }: { x: number; y: number; scale?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} fill="none" stroke="#d9caff" strokeWidth=".22" strokeLinejoin="round">
      <path d="M0-9 2.5-4 2 8 0 11-2 8-2.5-4Z" fill="#bda7f4" fillOpacity=".7" />
      <path d="M0-9 2.5-4 0-2-2.5-4Z" fill="#f0e9ff" fillOpacity=".8" />
      <path d="M0-2 2 8 0 11-1.1 2Z" fill="#8f7bda" fillOpacity=".62" />
      <path d="M0-2-2 8-1.1 2Z" fill="#ded5ff" fillOpacity=".55" />
    </g>
  );
}

export default function GalaxyCanvas({ className = "", opacity = 1 }: GalaxyCanvasProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={className} style={{ opacity }} viewBox="0 0 100 100" role="img" aria-label="A still purple astrological galaxy with stars, planets, zodiac symbols, and crystals" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff9df" />
          <stop offset=".13" stopColor="#ffd9c8" stopOpacity=".98" />
          <stop offset=".36" stopColor="#d69bff" stopOpacity=".58" />
          <stop offset="1" stopColor="#6f3fd0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-mist`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#c48cff" stopOpacity=".28" />
          <stop offset=".62" stopColor="#6244d5" stopOpacity=".1" />
          <stop offset="1" stopColor="#02040d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-planet`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f0d7ff" /><stop offset="1" stopColor="#8160df" /></linearGradient>
      </defs>
      <rect width="100" height="100" fill="#02040d" />
      <g className="galaxy-particles">
        <g fill="#f5edff">{stars.map((star, index) => <circle key={`star-${index}`} cx={star.x} cy={star.y} r={star.r} opacity={star.opacity} />)}</g>
        <ellipse cx="50" cy="50" rx="48" ry="27" fill={`url(#${id}-mist)`} transform="rotate(-18 50 50)" />
        <g fill="#c6a9ff">{particles.map((particle, index) => <circle key={`particle-${index}`} cx={particle.x} cy={particle.y} r={particle.r} opacity={particle.opacity} />)}</g>
        <g fill="none" stroke="#a47bea" strokeOpacity=".38" strokeWidth=".2">
          <ellipse cx="50" cy="50" rx="43" ry="16" transform="rotate(-18 50 50)" />
          <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(-18 50 50)" />
          <ellipse cx="50" cy="50" rx="48" ry="29" transform="rotate(-18 50 50)" />
        </g>
        <circle cx="50" cy="50" r="15" fill={`url(#${id}-core)`} />
        <circle cx="50" cy="50" r="1.4" fill="#fff8db" />
        <g fill="#f2e8ff" stroke="#bea8e9" strokeWidth=".16" textAnchor="middle" fontFamily="serif">
          <circle cx="60" cy="12" r="3.2" fill="none" /><text x="60" y="13.4" fontSize="4">♊</text>
          <circle cx="19" cy="78" r="3.2" fill="none" /><text x="19" y="79.5" fontSize="4">♓</text>
          <circle cx="87" cy="70" r="3.2" fill="none" /><text x="87" y="71.5" fontSize="4">♒</text>
        </g>
        <path d="M25 24a4.2 4.2 0 1 0 4.8 6.9A5.4 5.4 0 1 1 25 24Z" fill="#dca6ff" />
        <g transform="translate(85 31)"><circle r="3.2" fill="#f2d9ff" /><path d="M0-6 1-3 3-5 2-2 5-3 3 0 6 1 3 2 5 5 2 3 1 6 0 3-2 5-1 2-4 3-2 0-5-1-2-2-3-5-1-3Z" fill="#e5c9ff" /></g>
        <g transform="translate(84 54)"><circle r="3.5" fill={`url(#${id}-planet)`} /><ellipse rx="6" ry="1.2" fill="none" stroke="#c8b4ff" strokeWidth=".45" transform="rotate(-22)" /></g>
        <Crystal x={13} y={36} scale={1.1} rotate={5} /><Crystal x={73} y={77} scale={1.2} rotate={16} />
        <g fill="#f2d5ff"><path d="m42 87 1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1Z" /><path d="m48 31 .7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7Z" /><path d="m19 52 .6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" /></g>
      </g>
    </svg>
  );
}
