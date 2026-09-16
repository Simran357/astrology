"use client";

import ReadingPage from "@/views/ReadingPage";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <ReadingPage onNavigate={navigate} />;
}
