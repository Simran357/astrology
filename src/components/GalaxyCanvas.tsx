import { useId } from "react";

interface GalaxyCanvasProps {
  className?: string;
  opacity?: number;
}

const STARS = [
  [8, 14, 0.28], [15, 27, 0.18], [22, 10, 0.2], [31, 18, 0.25], [42, 9, 0.18], [54, 13, 0.2], [67, 8, 0.18], [80, 18, 0.22], [91, 11, 0.18],
  [5, 42, 0.2], [13, 57, 0.24], [22, 70, 0.18], [31, 88, 0.22], [45, 78, 0.2], [61, 91, 0.18], [77, 83, 0.2], [91, 68, 0.22],
  [4, 82, 0.16], [18, 91, 0.2], [86, 42, 0.18], [96, 54, 0.18], [72, 31, 0.16], [37, 45, 0.18], [64, 54, 0.2], [27, 38, 0.16],
];

const GALAXY_PARTICLES = Array.from({ length: 92 }, (_, index) => {
  const arm = index % 2 === 0 ? 1 : -1;
  const distance = 7 + (index % 23) * 1.42;
  const angle = index * 0.72 + distance * 0.11 * arm;
  const spread = ((index * 17) % 9) - 4;
  return {
    x: 50 + Math.cos(angle) * (distance * 0.92) + spread * 0.34,
    y: 50 + Math.sin(angle) * (distance * 0.42) + spread * 0.22,
    r: index % 11 === 0 ? 0.48 : index % 4 === 0 ? 0.34 : 0.22,
    opacity: index % 5 === 0 ? 0.9 : 0.56,
  };
});

export default function GalaxyCanvas({ className = "", opacity = 1 }: GalaxyCanvasProps) {
  const id = useId().replace(/:/g, "");
  const glowId = `${id}-glow`;

  return (
    <svg className={className} style={{ opacity }} viewBox="0 0 100 100" role="img" aria-label="A still astrological galaxy made from starlight and crystal forms" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff4d0" stopOpacity=".95" />
          <stop offset=".18" stopColor="#d9b8ff" stopOpacity=".72" />
          <stop offset=".6" stopColor="#8152c8" stopOpacity=".16" />
          <stop offset="1" stopColor="#05030a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" rx="3" fill="#05030a" />
      <g className="galaxy-stars" fill="#f5efff">
        {STARS.map(([cx, cy, r], index) => <circle key={`star-${index}`} cx={cx} cy={cy} r={r} opacity={0.45 + (index % 3) * 0.15} />)}
      </g>
      <g className="galaxy-particles" fill="#fff9ec">
        {GALAXY_PARTICLES.map((particle, index) => <circle key={`particle-${index}`} cx={particle.x} cy={particle.y} r={particle.r} opacity={particle.opacity} />)}
      </g>
      <g fill="none" strokeLinecap="round">
        <path d="M21 40C31 23 58 18 76 30C86 37 81 50 69 58C52 70 29 68 22 56C18 49 19 44 21 40Z" stroke="#d9b7ff" strokeOpacity=".2" strokeWidth="1.4" />
        <path d="M27 32C42 19 65 24 73 37C80 48 67 60 53 63C37 67 25 58 28 48" stroke="#8f63cf" strokeOpacity=".24" strokeWidth="1" />
        <ellipse cx="50" cy="50" rx="35" ry="13" transform="rotate(-18 50 50)" stroke="#ecd29b" strokeOpacity=".25" strokeWidth=".35" />
      </g>
      <circle cx="50" cy="50" r="9" fill={`url(#${glowId})`} />
      <circle cx="50" cy="50" r="1.45" fill="#fff2c7" />
      <g transform="translate(78 76)" stroke="#ead7ff" strokeWidth=".4">
        <path d="M0 8 4-5 10 1 7 13Z" fill="#89d1c0" fillOpacity=".8" />
        <path d="m4-5 3 6-3 4-4 3Z" fill="#d5fff1" fillOpacity=".5" />
        <path d="M11 12 14 1 20 5 17 16Z" fill="#c884e7" fillOpacity=".75" />
        <path d="m14 1 3 4-3 4-3 3Z" fill="#f2d7ff" fillOpacity=".5" />
      </g>
    </svg>
  );
}
