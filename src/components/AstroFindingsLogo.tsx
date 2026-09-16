"use client";

import React from "react";

interface AstroFindingsLogoProps {
  variant?: "dark" | "light"; // dark = for dark backgrounds (#052036), light = for light backgrounds (#FAF9F6)
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function AstroFindingsLogo({
  variant = "dark",
  size = "md",
  showTagline = true,
  className = "",
  onClick,
}: AstroFindingsLogoProps) {
  // Guide colors:
  // Deep Space: #052036
  // Cosmic Gold: #EAC157
  const textColor = variant === "dark" ? "#FFFFFF" : "#052036";
  const goldColor = "#EAC157";

  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.25 : 1;
  const fontSize = size === "sm" ? "1.1rem" : size === "lg" ? "1.9rem" : "1.45rem";
  const taglineSize = size === "sm" ? "0.48rem" : size === "lg" ? "0.7rem" : "0.58rem";

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center select-none cursor-pointer ${className}`}
      style={{ lineHeight: 1 }}
    >
      {/* WORDMARK: ASTRO [Wheel] FINDINGS */}
      <div
        className="flex items-center tracking-[0.14em] font-semibold"
        style={{
          fontFamily: "'Arima', serif",
          color: textColor,
          fontSize,
          letterSpacing: "0.12em",
        }}
      >
        <span>ASTR</span>

        {/* Celestial Wheel inside the 'O' */}
        <span
          className="inline-flex items-center justify-center mx-[0.06em] relative"
          style={{ width: "1.05em", height: "1.05em" }}
        >
          <svg
            viewBox="0 0 28 28"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Ring */}
            <circle cx="14" cy="14" r="12" stroke={goldColor} strokeWidth="1.8" />
            {/* Inner Ring */}
            <circle cx="14" cy="14" r="7" stroke={goldColor} strokeWidth="1.2" />
            {/* Center Core */}
            <circle cx="14" cy="14" r="2.2" fill={goldColor} />
            {/* 8 Radial Astrological Spokes */}
            <line x1="14" y1="2" x2="14" y2="7" stroke={goldColor} strokeWidth="1.4" strokeLinecap="round" />
            <line x1="14" y1="21" x2="14" y2="26" stroke={goldColor} strokeWidth="1.4" strokeLinecap="round" />
            <line x1="2" y1="14" x2="7" y2="14" stroke={goldColor} strokeWidth="1.4" strokeLinecap="round" />
            <line x1="21" y1="14" x2="26" y2="14" stroke={goldColor} strokeWidth="1.4" strokeLinecap="round" />
            <line x1="5.5" y1="5.5" x2="9" y2="9" stroke={goldColor} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="19" y1="19" x2="22.5" y2="22.5" stroke={goldColor} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="22.5" y1="5.5" x2="19" y2="9" stroke={goldColor} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="9" y1="19" x2="5.5" y2="22.5" stroke={goldColor} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>

        <span>FINDINGS</span>
      </div>

      {/* OFFICIAL BRAND TAGLINE */}
      {showTagline && (
        <div
          className="flex items-center justify-center gap-1.5 uppercase font-medium tracking-[0.26em] mt-[3px]"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: goldColor,
            fontSize: taglineSize,
            letterSpacing: "0.26em",
          }}
        >
          <span className="opacity-70 text-[0.8em]">✦</span>
          <span>YOUR STARS. YOUR STORY</span>
          <span className="opacity-70 text-[0.8em]">✦</span>
        </div>
      )}
    </div>
  );
}
