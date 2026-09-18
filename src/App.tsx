import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./views/HomePage";
import OnboardingPage from "./views/OnboardingPage";
import DashboardPage from "./views/DashboardPage";
import ChartPage from "./views/ChartPage";
import ReadingPage from "./views/ReadingPage";
import LearnPage from "./views/LearnPage";
import ProfilePage from "./views/ProfilePage";
import {
  LoginPage,
  SignupPage,
  TimelinePage,
  RelationshipsPage,
  AskAIPage,
  WellnessPage,
  PalmReadingPage,
} from "./views/UtilityPages";
import {
  AppProvider,
  PageId,
  PUBLIC_PAGES,
  PROTECTED_PAGES,
  useApp,
} from "./context/AppContext";

type Page = PageId;

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

function AppRouter({
  currentPage,
  onNavigate,
}: {
  currentPage: Page;
  onNavigate: (page: string) => void;
}) {
  const { isLoggedIn, isAuthLoading, setIntendedPage, hasCompletedOnboarding } = useApp();

  // Protected route enforcement
  useEffect(() => {
    if (isAuthLoading) return;

    if (!isLoggedIn && PROTECTED_PAGES.includes(currentPage)) {
      setIntendedPage(currentPage);
      onNavigate("login");
      return;
    }

    // Direct users who haven't set their birth data to onboarding when accessing chart features
    const chartDependent: Page[] = ["chart", "reading", "dashboard", "timeline", "askai"];
    if (chartDependent.includes(currentPage) && !hasCompletedOnboarding) {
      onNavigate("onboarding");
    }
  }, [isLoggedIn, isAuthLoading, currentPage, hasCompletedOnboarding, onNavigate, setIntendedPage]);

  const isAppPage = APP_PAGES.includes(currentPage);

  return (
    <div className="min-h-full bg-[#FAF9F6] text-[#052036]">
      <Navigation currentPage={currentPage} onNavigate={onNavigate} />

      <main className={isAppPage ? "pt-14 md:pt-18 pb-24 md:pb-12" : ""}>
        {currentPage === "home" && <HomePage onNavigate={onNavigate} />}
        {currentPage === "onboarding" && <OnboardingPage onNavigate={onNavigate} />}
        {currentPage === "login" && <LoginPage onNavigate={onNavigate} />}
        {currentPage === "signup" && <SignupPage onNavigate={onNavigate} />}
        {currentPage === "timeline" && <TimelinePage onNavigate={onNavigate} />}
        {currentPage === "relationships" && <RelationshipsPage onNavigate={onNavigate} />}
        {currentPage === "wellness" && <WellnessPage onNavigate={onNavigate} />}
        {currentPage === "palm" && <PalmReadingPage onNavigate={onNavigate} />}
        {currentPage === "askai" && <AskAIPage onNavigate={onNavigate} />}
        {currentPage === "dashboard" && <DashboardPage onNavigate={onNavigate} />}
        {currentPage === "chart" && <ChartPage onNavigate={onNavigate} />}
        {currentPage === "reading" && <ReadingPage onNavigate={onNavigate} />}
        {currentPage === "learn" && <LearnPage onNavigate={onNavigate} />}
        {currentPage === "profile" && <ProfilePage onNavigate={onNavigate} />}
      </main>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: string) => {
    const target = page as Page;
    setCurrentPage(target);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AppProvider currentPage={currentPage} onNavigate={navigate}>
      <AppRouter currentPage={currentPage} onNavigate={navigate} />
    </AppProvider>
  );
}
