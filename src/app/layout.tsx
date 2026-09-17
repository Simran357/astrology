import type { Metadata, Viewport } from "next";
import "../index.css";
import ClientAppShell from "@/components/ClientAppShell";

export const metadata: Metadata = {
  title: "AstroFindings — Your Stars. Your Story.",
  description:
    "Personalized astrology and tarot guidance to help you understand your journey. Same Stars. A Brighter You.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#052036",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#052036] font-sans antialiased selection:bg-[#EAC157] selection:text-[#052036] min-h-screen">
        <ClientAppShell>{children}</ClientAppShell>
      </body>
    </html>
  );
}
