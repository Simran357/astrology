import type { Metadata, Viewport } from "next";
import "../index.css";
import ClientAppShell from "@/components/ClientAppShell";

export const metadata: Metadata = {
  title: "AstroFindings — The Astral Heretic",
  description:
    "Astrological intelligence grounded in real ephemeris coordinates, planetary transits, and deep psychological insight.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0a17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0e0a17] text-[#eee5d3] antialiased selection:bg-[#ee5d34] selection:text-[#0e0a17] min-h-screen">
        <ClientAppShell>{children}</ClientAppShell>
      </body>
    </html>
  );
}
