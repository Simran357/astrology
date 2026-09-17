"use client";

import React from "react";

export interface AstroFindingsLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "dark" | "light"; // "dark" = for dark backgrounds (#052036), "light" = for light/gold backgrounds (#FAF9F6, #EAC157)
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  showTagline?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const SIZE_CLASSES: Record<string, string> = {
  sm: "h-7 w-auto",
  md: "h-9.5 w-auto",
  lg: "h-12 w-auto",
  xl: "h-14 w-auto",
  custom: "",
};

const LOGO_SRCS = {
  dark: "/images/AstroFindings%20dark%20Logo.svg",
  light: "/images/AstroFindings%20light%20Logo%20(1).svg",
};

export function AstroFindingsDarkLogo(props: Omit<AstroFindingsLogoProps, "variant">) {
  return <AstroFindingsLogo variant="dark" {...props} />;
}

export function AstroFindingsLightLogo(props: Omit<AstroFindingsLogoProps, "variant">) {
  return <AstroFindingsLogo variant="light" {...props} />;
}

export default function AstroFindingsLogo({
  variant = "dark",
  size = "md",
  className = "",
  alt = "AstroFindings — Your Stars. Your Story",
  onClick,
  style,
  ...rest
}: AstroFindingsLogoProps) {
  const src = LOGO_SRCS[variant] || LOGO_SRCS.dark;
  const sizeClass = size !== "custom" ? SIZE_CLASSES[size] || SIZE_CLASSES.md : "";

  return (
    <img
      src={src}
      alt={alt}
      className={`select-none inline-block object-contain transition-opacity duration-200 ${sizeClass} ${className}`}
      style={{ verticalAlign: "middle", ...style }}
      onClick={onClick}
      loading="eager"
      decoding="async"
      {...rest}
    />
  );
}
