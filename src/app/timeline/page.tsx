"use client";

import { TimelinePage } from "@/views/UtilityPages";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <TimelinePage onNavigate={navigate} />;
}
