"use client";

import React, { useMemo, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navigation from "./Navigation";
import { AppProvider, PageId, PROTECTED_PAGES, useApp } from "../context/AppContext";

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

function RouteGuardWrapper({
  children,
  currentPage,
  navigate,
}: {
  children: React.ReactNode;
  currentPage: PageId;
  navigate: (page: string) => void;
}) {
  const { isLoggedIn, isAuthLoading, setIntendedPage } = useApp();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isLoggedIn && PROTECTED_PAGES.includes(currentPage)) {
      setIntendedPage(currentPage);
      navigate("login");
    }
  }, [isLoggedIn, isAuthLoading, currentPage, navigate, setIntendedPage]);

  return <>{children}</>;
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
      <RouteGuardWrapper currentPage={currentPage} navigate={navigate}>
        <div className="min-h-full bg-[#FAF9F6] text-[#052036]">
          <Navigation currentPage={currentPage} onNavigate={navigate as (page: PageId) => void} />
          <main className={isAppPage ? "pt-14 md:pt-18 pb-24 md:pb-12" : ""}>
            {children}
          </main>
        </div>
      </RouteGuardWrapper>
    </AppProvider>
  );
}
