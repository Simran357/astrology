"use client";

import ChartPage from "@/views/ChartPage";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <ChartPage onNavigate={navigate} />;
}
