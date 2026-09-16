"use client";

import { LoginPage } from "@/views/UtilityPages";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <LoginPage onNavigate={navigate} />;
}
