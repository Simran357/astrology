import { useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import ChartPage from "./pages/ChartPage";
import ReadingPage from "./pages/ReadingPage";
import LearnPage from "./pages/LearnPage";
import ProfilePage from "./pages/ProfilePage";
import { LoginPage, SignupPage, TimelinePage, RelationshipsPage, TarotPage, AskAIPage } from "./pages/UtilityPages";
import { AppProvider, PageId } from "./context/AppContext";

type Page = PageId;

const APP_PAGES = ["dashboard", "chart", "reading", "learn", "profile", "timeline", "relationships", "tarot", "askai"];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAppPage = APP_PAGES.includes(currentPage);

  return (
    <AppProvider currentPage={currentPage} onNavigate={navigate}>
      <div className="min-h-full bg-[#0e0a17] text-[#eee5d3]">
        <Navigation currentPage={currentPage} onNavigate={navigate as (page: Page) => void}/>

        <main className={isAppPage ? "md:ml-16 pb-20 md:pb-0" : ""}>
          {currentPage === "home" && <HomePage onNavigate={navigate}/>}
          {currentPage === "onboarding" && <OnboardingPage onNavigate={navigate}/>}
          {currentPage === "login" && <LoginPage onNavigate={navigate}/>}
          {currentPage === "signup" && <SignupPage onNavigate={navigate}/>}
          {currentPage === "timeline" && <TimelinePage onNavigate={navigate}/>}
          {currentPage === "relationships" && <RelationshipsPage onNavigate={navigate}/>}
          {currentPage === "tarot" && <TarotPage onNavigate={navigate}/>}
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
