"use client";

import LearnPage from "@/views/LearnPage";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <LearnPage onNavigate={navigate} />;
}
