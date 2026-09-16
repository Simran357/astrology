"use client";

import { SignupPage } from "@/views/UtilityPages";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <SignupPage onNavigate={navigate} />;
}
