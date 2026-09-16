"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navigation from "./Navigation";
import { AppProvider, PageId } from "../context/AppContext";

const APP_PAGES = [
  "dashboard",
  "chart",
  "reading",
  "learn",
  "profile",
  "timeline",
  "relationships",
  "askai",
  "wellness",
  "palm",
];

interface ClientAppShellProps {
  children: React.ReactNode;
}

export default function ClientAppShell({ children }: ClientAppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentPage: PageId = useMemo(() => {
    if (!pathname || pathname === "/") return "home";
    const segment = pathname.replace(/^\//, "").split("/")[0];
    const validPages: PageId[] = [
      "home",
      "dashboard",
      "chart",
      "reading",
      "learn",
      "profile",
      "onboarding",
      "login",
      "signup",
      "timeline",
      "relationships",
      "askai",
      "wellness",
      "palm",
    ];
    if (validPages.includes(segment as PageId)) {
      return segment as PageId;
    }
    return "home";
  }, [pathname]);

  const navigate = (page: string) => {
    const targetPath = page === "home" ? "/" : `/${page}`;
    router.push(targetPath);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isAppPage = APP_PAGES.includes(currentPage);

  return (
    <AppProvider currentPage={currentPage} onNavigate={navigate}>
      <div className="min-h-full bg-[#0e0a17] text-[#eee5d3]">
        <Navigation currentPage={currentPage} onNavigate={navigate as (page: PageId) => void} />
        <main className={isAppPage ? "md:ml-16 pb-20 md:pb-0" : ""}>
          {children}
        </main>
      </div>
    </AppProvider>
  );
}
