"use client";

import { PalmReadingPage } from "@/views/UtilityPages";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <PalmReadingPage onNavigate={navigate} />;
}
