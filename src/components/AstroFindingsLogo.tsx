"use client";

import React from "react";
import AstroFindingsDarkLogo, { AstroFindingsDarkLogoProps } from "./AstroFindingsDarkLogo";
import AstroFindingsLightLogo, { AstroFindingsLightLogoProps } from "./AstroFindingsLightLogo";

export { AstroFindingsDarkLogo, AstroFindingsLightLogo };
export type { AstroFindingsDarkLogoProps, AstroFindingsLightLogoProps };

export interface AstroFindingsLogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "dark" | "light"; // "dark" = for dark backgrounds (#052036), "light" = for light backgrounds (#FAF9F6, #EAC157)
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  showTagline?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * AstroFindings Brand Logo Component
 * Renders the official AstroFindings celestial vector logo directly via TSX.
 *
 * @param variant "dark" (white letters for dark navy backgrounds) | "light" (navy letters for light/gold backgrounds)
 * @param size "sm" | "md" | "lg" | "xl" | "custom"
 * @param showTagline boolean - whether to display the official "YOUR STARS. YOUR STORY" tagline
 */
export default function AstroFindingsLogo({
  variant = "dark",
  ...props
}: AstroFindingsLogoProps) {
  if (variant === "light") {
    return <AstroFindingsLightLogo {...props} />;
  }
  return <AstroFindingsDarkLogo {...props} />;
}
