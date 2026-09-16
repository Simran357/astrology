"use client";

import { WellnessPage } from "@/views/UtilityPages";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <WellnessPage onNavigate={navigate} />;
}
