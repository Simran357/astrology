"use client";

import { AskAIPage } from "@/views/UtilityPages";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <AskAIPage onNavigate={navigate} />;
}
