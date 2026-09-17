import { useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./views/HomePage";
import OnboardingPage from "./views/OnboardingPage";
import DashboardPage from "./views/DashboardPage";
import ChartPage from "./views/ChartPage";
import ReadingPage from "./views/ReadingPage";
import LearnPage from "./views/LearnPage";
import ProfilePage from "./views/ProfilePage";
import { LoginPage, SignupPage, TimelinePage, RelationshipsPage, AskAIPage, WellnessPage, PalmReadingPage } from "./views/UtilityPages";
import { AppProvider, PageId } from "./context/AppContext";

type Page = PageId;

const APP_PAGES = ["dashboard", "chart", "reading", "learn", "profile", "timeline", "relationships", "askai", "wellness", "palm"];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: string) => {
    // Route guard: Prevent accessing chart-dependent features without valid birth data onboarding
    const chartDependent = ["chart", "reading", "dashboard", "timeline", "askai"];
    let hasCompletedOnboarding = false;
    try {
      hasCompletedOnboarding = localStorage.getItem("astrofindings_onboarding_done") === "true";
    } catch {}

    if (chartDependent.includes(page) && !hasCompletedOnboarding) {
      setCurrentPage("onboarding");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAppPage = APP_PAGES.includes(currentPage);

  return (
    <AppProvider currentPage={currentPage} onNavigate={navigate}>
      <div className="min-h-full bg-[#FAF9F6] text-[#052036]">
        <Navigation currentPage={currentPage} onNavigate={navigate as (page: Page) => void}/>

        <main className={isAppPage ? "pt-14 md:pt-18 pb-24 md:pb-12" : ""}>
          {currentPage === "home" && <HomePage onNavigate={navigate}/>}
          {currentPage === "onboarding" && <OnboardingPage onNavigate={navigate}/>}
          {currentPage === "login" && <LoginPage onNavigate={navigate}/>}
          {currentPage === "signup" && <SignupPage onNavigate={navigate}/>}
          {currentPage === "timeline" && <TimelinePage onNavigate={navigate}/>}
          {currentPage === "relationships" && <RelationshipsPage onNavigate={navigate}/>}
          {currentPage === "wellness" && <WellnessPage onNavigate={navigate}/>}
          {currentPage === "palm" && <PalmReadingPage onNavigate={navigate}/>}
          {currentPage === "askai" && <AskAIPage onNavigate={navigate}/>}
          {currentPage === "dashboard" && <DashboardPage onNavigate={navigate}/>}
          {currentPage === "chart" && <ChartPage onNavigate={navigate}/>}
          {currentPage === "reading" && <ReadingPage onNavigate={navigate}/>}
          {currentPage === "learn" && <LearnPage onNavigate={navigate}/>}
          {currentPage === "profile" && <ProfilePage onNavigate={navigate}/>}
        </main>
      </div>
    </AppProvider>
  );
}
