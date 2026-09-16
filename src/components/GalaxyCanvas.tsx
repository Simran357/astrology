import { useId } from "react";

interface GalaxyCanvasProps {
  className?: string;
  opacity?: number;
}

const STARS = [
  [12, 18, 1.1], [24, 72, .8], [34, 30, .6], [46, 84, 1], [58, 16, .7], [71, 28, 1.2], [82, 64, .7], [92, 42, 1],
  [18, 46, .5], [29, 16, .45], [40, 58, .7], [54, 48, .5], [66, 76, .8], [78, 18, .5], [88, 82, .6], [7, 90, .6],
];

export default function GalaxyCanvas({ className = "", opacity = 1 }: GalaxyCanvasProps) {
  const id = useId().replace(/:/g, "");
  const glowId = `${id}-glow`;

  return (
    <svg className={className} style={{ opacity }} viewBox="0 0 100 100" role="img" aria-label="A slow-moving astrological spiral galaxy with crystals" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffe8a8" stopOpacity=".95" />
          <stop offset=".22" stopColor="#d89bff" stopOpacity=".7" />
          <stop offset=".7" stopColor="#6f54bf" stopOpacity=".16" />
          <stop offset="1" stopColor="#0e0a17" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="galaxy-stars">
        {STARS.map(([cx, cy, r], index) => <circle key={index} cx={cx} cy={cy} r={r} fill={index % 3 === 0 ? "#f7dca0" : "#d9c7ff"} opacity={.45 + (index % 4) * .12} />)}
      </g>
      <g className="galaxy-spiral" transform="translate(50 50)">
        <ellipse rx="39" ry="15" fill="none" stroke="#7053bb" strokeOpacity=".2" strokeWidth="7" />
        <path d="M-4 1C5-10 20-11 30-3 19 7 7 12-8 8-23 4-29-8-20-18" fill="none" stroke="#9a74dc" strokeOpacity=".46" strokeWidth="3" strokeLinecap="round" />
        <path d="M3-1C-8 9-21 10-31 2-20-8-8-13 8-9 23-5 29 7 20 17" fill="none" stroke="#4c78c9" strokeOpacity=".4" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0 0C9 4 15 10 16 18" fill="none" stroke="#e8b9ff" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" />
        <circle r="10" fill={`url(#${glowId})`} />
        <circle r="2.1" fill="#ffe9ad" />
      </g>
      <g className="galaxy-orbits" fill="none" stroke="#f3d38a" strokeOpacity=".4" strokeWidth=".35">
        <ellipse cx="50" cy="50" rx="38" ry="13" transform="rotate(-18 50 50)" />
        <ellipse cx="50" cy="50" rx="29" ry="10" transform="rotate(24 50 50)" />
      </g>
      <g className="galaxy-crystals" transform="translate(78 76)">
        <path d="M0 8 4-5 10 1 7 13Z" fill="#8dd4c0" fillOpacity=".8" stroke="#d1fff1" strokeWidth=".45" />
        <path d="m4-5 3 6-3 4-4 3Z" fill="#c4fff0" fillOpacity=".55" />
        <path d="M11 12 14 1 20 5 17 16Z" fill="#d58df0" fillOpacity=".75" stroke="#f1d6ff" strokeWidth=".45" />
        <path d="m14 1 3 4-3 4-3 3Z" fill="#f1c9ff" fillOpacity=".5" />
      </g>
    </svg>
  );
}
