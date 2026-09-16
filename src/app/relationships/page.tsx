"use client";

import { RelationshipsPage } from "@/views/UtilityPages";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { navigate } = useApp();
  return <RelationshipsPage onNavigate={navigate} />;
}
