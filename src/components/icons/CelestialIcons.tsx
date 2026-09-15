import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

// Zodiac Signs
export function AriesSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 20 C12 12, 6 8, 6 4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M12 20 C12 12, 18 8, 18 4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="6" cy="3.5" r="1.5" stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="18" cy="3.5" r="1.5" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  );
}

export function TaurusSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="14" r="6" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M6 10 Q6 5, 12 5 Q18 5, 18 10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M4 7 Q6 5, 8 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M16 7 Q18 5, 20 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function GeminiSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 5 L8 19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M16 5 L16 19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M5 7 Q12 10, 19 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M5 17 Q12 14, 19 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function CancerSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 12 Q6 7, 12 7 Q18 7, 18 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M18 12 Q18 17, 12 17 Q6 17, 6 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="4.5" cy="12" r="1.5" stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="19.5" cy="12" r="1.5" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  );
}

export function LeoSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M12 8 Q16 8, 16 13 Q16 18, 20 19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M18 17 Q20 19, 18 21" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function VirgoSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 5 L6 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M11 5 L11 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M6 11 Q8.5 13, 11 11" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M11 14 Q14 17, 17 14 Q18 12, 17 10 Q16 8, 14 8 Q12 8, 11 10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M17 17 Q18 19, 17 21" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M16 18 Q18 20, 19 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function LibraSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 17 L20 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M4 20 L20 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M8 17 Q8 11, 12 11 Q16 11, 16 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function ScorpioSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 5 L6 14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M11 5 L11 14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M6 11 Q8.5 13, 11 11" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M11 14 Q14 17, 17 14 L17 10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M17 14 L20 17 L17 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SagittariusSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 19 L19 5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M12 5 L19 5 L19 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9 L15 15" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function CapricornSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 5 Q6 12, 10 14 Q14 16, 14 19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M10 10 Q14 8, 17 11 Q20 14, 17 17 Q14 20, 14 19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M14 19 Q18 21, 19 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function AquariusSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 10 Q7 7, 10 10 Q13 13, 16 10 Q19 7, 22 10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M4 15 Q7 12, 10 15 Q13 18, 16 15 Q19 12, 22 15" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function PiscesSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5 L12 19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M5 7 Q8 12, 5 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M19 7 Q16 12, 19 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M9 12 L15 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// Planet Symbols
export function SunSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <path d="M12 4 L12 6M12 18 L12 20M4 12 L6 12M18 12 L20 12M6.34 6.34 L7.76 7.76M16.24 16.24 L17.66 17.66M17.66 6.34 L16.24 7.76M7.76 16.24 L6.34 17.66" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function MoonSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MercurySymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="10" r="5" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M12 15 L12 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M9 18 L15 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M9 5 Q12 3, 15 5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function VenusSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M12 14.5 L12 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M9 17.5 L15 17.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function MarsSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="10" cy="14" r="5.5" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M14.5 9.5 L20 4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M16 4 L20 4 L20 8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function JupiterSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M11 4 Q7 6, 7 11 Q7 16, 11 16 L18 16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M5 12 L18 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M15 8 L15 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

export function SaturnSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M11 4 Q8 6, 8 10 Q8 15, 12 18 Q16 21, 17 19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M7 10 L16 10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M13 4 L13 10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// Moon Phases
export function NewMoon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="12" cy="12" r="7" fill="currentColor" opacity="0.15"/>
    </svg>
  );
}

export function WaxingCrescent({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      <path d="M12 3 A9 9 0 0 1 12 21 A5 5 0 0 0 12 3z" fill="currentColor"/>
    </svg>
  );
}

export function FirstQuarter({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      <path d="M12 3 A9 9 0 0 1 12 21 L12 3z" fill="currentColor"/>
    </svg>
  );
}

export function FullMoon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9" fill="currentColor"/>
      <circle cx="9" cy="10" r="1.5" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
      <circle cx="14" cy="14" r="1" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
    </svg>
  );
}

export function WaningGibbous({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      <path d="M12 3 A9 9 0 0 0 12 21 A3 3 0 0 1 12 3z" fill="currentColor"/>
    </svg>
  );
}

// Constellation dots
export function OrionConstellation({ size = 48, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="6" r="1.5" fill="currentColor" opacity="0.9"/>
      <circle cx="18" cy="14" r="1" fill="currentColor" opacity="0.7"/>
      <circle cx="30" cy="14" r="1" fill="currentColor" opacity="0.7"/>
      <circle cx="16" cy="22" r="2" fill="currentColor"/>
      <circle cx="24" cy="22" r="1.5" fill="currentColor" opacity="0.8"/>
      <circle cx="32" cy="22" r="2" fill="currentColor"/>
      <circle cx="20" cy="30" r="1" fill="currentColor" opacity="0.7"/>
      <circle cx="28" cy="30" r="1" fill="currentColor" opacity="0.7"/>
      <circle cx="18" cy="40" r="1.5" fill="currentColor" opacity="0.9"/>
      <circle cx="30" cy="40" r="1.5" fill="currentColor" opacity="0.9"/>
      <path d="M24 6 L18 14 L16 22 M24 6 L30 14 L32 22 M16 22 L24 22 L32 22 M16 22 L20 30 L18 40 M32 22 L28 30 L30 40" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

// Aspect line symbol
export function OppositionSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="5" cy="12" r="3" stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="19" cy="12" r="3" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M8 12 L16 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray="2 2"/>
    </svg>
  );
}

export function TrineSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 4 L21 19 L3 19 Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ConjunctionSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M12 4 L12 8 M12 16 L12 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// Ascendant symbol
export function AscendantSymbol({ size = 24, className = "", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 4 L12 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M4 12 L20 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M8 8 L12 4 L16 8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Celestial geometry ring
export function CelestialRing({ size = 200, className = "", strokeWidth = 0.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className}>
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.3" strokeDasharray="4 8"/>
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2"/>
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.3" strokeDasharray="2 6"/>
      {/* 12 marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 100 + 84 * Math.cos(angle);
        const y1 = 100 + 84 * Math.sin(angle);
        const x2 = 100 + 90 * Math.cos(angle);
        const y2 = 100 + 90 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.4"/>;
      })}
    </svg>
  );
}

// Generic zodiac icon component
const ZODIAC_COMPONENTS: Record<string, React.FC<IconProps>> = {
  aries: AriesSymbol, taurus: TaurusSymbol, gemini: GeminiSymbol,
  cancer: CancerSymbol, leo: LeoSymbol, virgo: VirgoSymbol,
  libra: LibraSymbol, scorpio: ScorpioSymbol, sagittarius: SagittariusSymbol,
  capricorn: CapricornSymbol, aquarius: AquariusSymbol, pisces: PiscesSymbol,
};

export function ZodiacIcon({ sign, size = 24, className = "", strokeWidth = 1.5 }: { sign: string } & IconProps) {
  const Comp = ZODIAC_COMPONENTS[sign.toLowerCase()];
  if (!Comp) return null;
  return <Comp size={size} className={className} strokeWidth={strokeWidth}/>;
}

const PLANET_COMPONENTS: Record<string, React.FC<IconProps>> = {
  sun: SunSymbol, moon: MoonSymbol, mercury: MercurySymbol,
  venus: VenusSymbol, mars: MarsSymbol, jupiter: JupiterSymbol, saturn: SaturnSymbol,
};

export function PlanetIcon({ planet, size = 24, className = "", strokeWidth = 1.5 }: { planet: string } & IconProps) {
  const Comp = PLANET_COMPONENTS[planet.toLowerCase()];
  if (!Comp) return null;
  return <Comp size={size} className={className} strokeWidth={strokeWidth}/>;
}
