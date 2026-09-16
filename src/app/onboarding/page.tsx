"use client";

import OnboardingPage from "@/views/OnboardingPage";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <OnboardingPage onNavigate={navigate} />;
}
