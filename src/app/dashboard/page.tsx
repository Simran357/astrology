"use client";

import DashboardPage from "@/views/DashboardPage";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <DashboardPage onNavigate={navigate} />;
}
