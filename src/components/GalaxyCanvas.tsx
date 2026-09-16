import { useId } from "react";

interface GalaxyCanvasProps {
  className?: string;
  opacity?: number;
}

const BACKGROUND_STARS = Array.from({ length: 52 }, (_, index) => {
  const x = (index * 47 + 13) % 100;
  const y = (index * 71 + 9) % 100;
  return { x, y, r: index % 9 === 0 ? 0.28 : 0.12 + (index % 4) * 0.04, opacity: 0.28 + (index % 5) * 0.1 };
});

const GALAXY_PARTICLES = Array.from({ length: 430 }, (_, index) => {
  const arm = index % 2 === 0 ? 1 : -1;
  const distance = 1.5 + ((index * 29) % 100) * 0.47;
  const angle = index * 0.205 + distance * 0.105 * arm;
  const scatter = (((index * 19) % 17) - 8) * (0.12 + distance * 0.008);
  const flatten = 0.43;
  const x = 50 + Math.cos(angle) * distance + scatter;
  const y = 50 + Math.sin(angle) * distance * flatten + scatter * 0.45;
  const edgeFade = Math.max(0.18, 1 - distance / 58);
  return {
    x,
    y,
    r: index % 31 === 0 ? 0.36 : index % 7 === 0 ? 0.23 : 0.105 + (index % 3) * 0.035,
    opacity: edgeFade * (0.42 + (index % 5) * 0.11),
  };
});

export default function GalaxyCanvas({ className = "", opacity = 1 }: GalaxyCanvasProps) {
  const id = useId().replace(/:/g, "");
  const coreId = `${id}-core`;
  const hazeId = `${id}-haze`;

  return (
    <svg
      className={className}
      style={{ opacity }}
      viewBox="0 0 100 100"
      role="img"
      aria-label="A still particle galaxy shaped like an astrological chart"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={coreId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff9e9" stopOpacity="1" />
          <stop offset="0.12" stopColor="#f2d6ff" stopOpacity="0.96" />
          <stop offset="0.34" stopColor="#bd83e8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#6e3caf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={hazeId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#d7a9ff" stopOpacity="0.2" />
          <stop offset="0.55" stopColor="#7b43c3" stopOpacity="0.08" />
          <stop offset="1" stopColor="#05030a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="galaxy-particles">
        <rect width="100" height="100" fill="#05030a" />
        <g fill="#eee6ff">
          {BACKGROUND_STARS.map((star, index) => (
            <circle key={`background-star-${index}`} cx={star.x} cy={star.y} r={star.r} opacity={star.opacity} />
          ))}
        </g>
        <ellipse cx="50" cy="50" rx="44" ry="25" fill={`url(#${hazeId})`} transform="rotate(-18 50 50)" />
        <g fill="#f7efff">
          {GALAXY_PARTICLES.map((particle, index) => (
            <circle key={`galaxy-particle-${index}`} cx={particle.x} cy={particle.y} r={particle.r} opacity={particle.opacity} />
          ))}
        </g>
        <g fill="none" strokeLinecap="round">
          <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(-18 50 50)" stroke="#c99bf6" strokeOpacity=".22" strokeWidth=".22" />
          <ellipse cx="50" cy="50" rx="31" ry="10" transform="rotate(-18 50 50)" stroke="#f0caff" strokeOpacity=".16" strokeWidth=".18" />
          <path d="M19 44C29 26 57 18 77 31C86 38 78 51 66 58C51 67 28 65 22 54" stroke="#b776e6" strokeOpacity=".23" strokeWidth=".3" />
        </g>
        <circle cx="50" cy="50" r="12" fill={`url(#${coreId})`} />
        <circle cx="50" cy="50" r="1.05" fill="#fff8dc" />
        <g fill="none" stroke="#d9b5f6" strokeOpacity=".34" strokeWidth=".22">
          <circle cx="50" cy="50" r="22" />
          <path d="M50 27V73M27 50H73" />
        </g>
        <g fill="#d9bbf6" fillOpacity=".5" fontFamily="serif" fontSize="3.4" textAnchor="middle">
          <text x="50" y="24">✦</text>
          <text x="77" y="52">♒</text>
          <text x="50" y="79">♍</text>
        </g>
        <g fill="none" stroke="#e4c8ff" strokeWidth=".3" strokeOpacity=".42">
          <path d="M15 73 19 60 24 69 21 82Z" fill="#9d70c9" fillOpacity=".22" />
          <path d="M79 24 83 14 88 22 85 32Z" fill="#b88de5" fillOpacity=".2" />
          <path d="M15 73 19 60 21 70 21 82Z" />
          <path d="M79 24 83 14 85 23 85 32Z" />
        </g>
      </g>
    </svg>
  );
}
