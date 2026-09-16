"use client";

import HomePage from "@/views/HomePage";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <HomePage onNavigate={navigate} />;
}
