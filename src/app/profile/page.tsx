"use client";

import ProfilePage from "@/views/ProfilePage";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <ProfilePage onNavigate={navigate} />;
}
