"use client";

import { useState } from "react";
import {
  ZodiacIcon,
  SunSymbol,
  MoonSymbol,
  VenusSymbol,
  MarsSymbol,
  SaturnSymbol,
} from "../components/icons/CelestialIcons";
import { useApp } from "../context/AppContext";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const RECENT_INQUIRIES = [
  {
    topic: "Detachment & Overthinking",
    question: "Why do I detach and step back into silence when overwhelmed?",
    category: "Emotions",
    date: "Today",
  },
  {
    topic: "Relational Soft Corners",
    question: "Why do I still hold a soft corner for them despite past betrayal?",
    category: "Relationships",
    date: "2 days ago",
  },
  {
    topic: "Career Breakthrough",
    question: "What makes me suppress myself, and what is my comfort zone trap?",
    category: "Purpose",
    date: "This week",
  },
  {
    topic: "Hope Window & Timing",
    question: "When will the emotional heaviness lift in my birth chart?",
    category: "Timing",
    date: "Aug 28, 2026",
  },
];

const AVAILABLE_INTERESTS = [
  "Relationships & intimacy",
  "Career & sovereign purpose",
  "Inner child & shadow patterns",
  "Creativity & expression",
  "Planetary timing & shifts",
  "Karmic boundaries & guilt release",
];

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const {
    user,
    updateUser,
    isCalculating,
    isMembershipActive,
    toggleMembership,
    isSupabaseReady,
    logout,
    navigateWithHighlight,
  } = useApp();

  // Edit Birth Info State
  const [isEditingBirth, setIsEditingBirth] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editDate, setEditDate] = useState(user.birthDate);
  const [editTime, setEditTime] = useState(user.birthTime);
  const [editLocation, setEditLocation] = useState(user.birthLocation);

  // Edit Interests State
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [editInterests, setEditInterests] = useState<string[]>(user.interests || []);

  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleSaveBirth = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({
      name: editName.trim() || user.name,
      birthDate: editDate,
      birthTime: editTime,
      birthLocation: editLocation.trim() || user.birthLocation,
    });
    setIsEditingBirth(false);
  };

  const handleSaveInterests = async () => {
    await updateUser({
      interests: editInterests,
    });
    setIsEditingInterests(false);
  };

  const toggleInterest = (item: string) => {
    setEditInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSignOut = async () => {
    await logout();
    onNavigate("login");
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${user.name.toLowerCase().replace(/\s+/g, "_")}_chart_profile.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const launchInquiry = (questionText: string) => {
    try {
      localStorage.setItem("astrofindings_pending_inquiry", questionText);
    } catch {}
    onNavigate("askai");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#052036] font-inter selection:bg-[#EAC157] selection:text-[#052036]">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 20% 20%, rgba(50,30,100,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-8 md:py-12 space-y-8">
        {/* Header Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#052036]/10 pb-4 gap-3">
          <div>
            <p className="text-[11px] font-mono text-[#EAC157] tracking-widest uppercase">
              ✦ Personal Sky Vault · Account & Settings
            </p>
            <h1 className="font-cormorant text-3xl md:text-4xl font-light text-[#052036] mt-1">
              Your Seeker Profile
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs font-mono px-3 py-1.5 border border-[rgba(220,100,80,0.4)] text-[rgba(220,140,120,0.9)] hover:bg-[rgba(220,100,80,0.1)] hover:border-[rgba(220,100,80,0.8)] transition-all rounded-xl cursor-pointer"
          >
            Sign Out ↗
          </button>
        </div>

        {/* User Identity & Avatar Card */}
        <div className="border border-[rgba(234,193,87,0.22)] bg-white shadow-md p-6 sm:p-8 rounded-xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-[#FAF7F2] border-2 border-[#8C6B1B]/30 flex items-center justify-center shadow-md p-1">
                  <img
                    src={"/stickers/zodiac/" + (user.sunSign || "leo").toLowerCase() + ".png"}
                    alt={user.name}
                    className="w-full h-full object-contain filter drop-shadow-xs"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#052036] border border-[#EAC157] flex items-center justify-center shadow">
                  <ZodiacIcon
                    sign={user.risingSign.toLowerCase()}
                    size={13}
                    className="text-[#EAC157]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="font-cormorant text-2xl text-[#052036]">{user.name}</h2>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-xl uppercase tracking-wider ${
                      isMembershipActive
                        ? "bg-[#EAC157] text-[#052036] font-semibold"
                        : "bg-[rgba(234,193,87,0.15)] text-[#EAC157] border border-[#052036]/15"
                    }`}
                  >
                    {isMembershipActive ? "✦ Premium Dossier" : "Free Discovery"}
                  </span>
                </div>
                <p className="text-xs text-[#052036]/70 mt-1 font-mono">
                  {user.email || "seeker.astral@gmail.com"} · Connected via{" "}
                  {user.authProvider === "google" ? "Google Account" : "Email & Password"}
                </p>
                <p className="text-[11px] text-[#052036]/70/80 mt-0.5">
                  Member since {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })} · Whole-Sign Ephemeris
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                onClick={() => onNavigate("chart")}
                className="button-primary cursor-pointer text-xs py-2 px-3.5"
              >
                Inspect Chart Wheel →
              </button>
            </div>
          </div>

          {/* Astrological Big Three Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              {
                label: "Sun Sign",
                value: user.sunSign,
                desc: "Conscious Will & Authorship",
                icon: <SunSymbol size={16} className="text-[#f0c870]" />,
              },
              {
                label: "Moon Sign",
                value: user.moonSign,
                desc: "Somatic Nervous System",
                icon: <MoonSymbol size={16} className="text-[#052036]/70" />,
              },
              {
                label: "Rising Sign",
                value: user.risingSign,
                desc: "Life Horizon & First Boundary",
                icon: (
                  <ZodiacIcon
                    sign={user.risingSign.toLowerCase()}
                    size={16}
                    className="text-[#EAC157]"
                  />
                ),
              },
            ].map((p, i) => (
              <button
                key={i}
                onClick={() =>
                  navigateWithHighlight(
                    "chart",
                    p.label === "Sun Sign" ? "Sun" : p.label === "Moon Sign" ? "Moon" : "Ascendant"
                  )
                }
                className="border border-[rgba(234,193,87,0.15)] bg-[#FAF7F2] p-4 rounded-xl text-left hover:border-[#EAC157] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {p.icon}
                    <span className="text-[11px] font-mono text-[#052036]/70">{p.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#EAC157] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <p className="font-cormorant text-lg text-[#052036] font-medium">{p.value}</p>
                <p className="text-[10px] text-[#052036]/70 mt-0.5 line-clamp-1">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Membership & Free vs Paid Control Card */}
        <div className="border border-[#052036]/10 bg-white shadow-sm p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#052036]/8 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#EAC157]">✦</span>
              <span className="text-xs font-mono uppercase text-[#052036] font-semibold">
                Membership & Access Level
              </span>
            </div>
            <button
              onClick={toggleMembership}
              className="text-xs font-mono px-3 py-1.5 bg-[rgba(234,193,87,0.15)] border border-[#EAC157] text-[#FAF9F6] hover:bg-[#EAC157] hover:text-[#052036] transition-all rounded-xl cursor-pointer"
            >
              {isMembershipActive ? "Switch to Free View" : "Activate Premium Vault (Simulate) ✦"}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 border border-[#052036]/10 bg-[#FAF7F2] rounded-xl space-y-1.5">
              <span className="font-mono text-[#052036]/70 uppercase block text-[10px]">
                Free Tier (Always Available)
              </span>
              <p className="text-[#052036] font-cormorant text-sm">Discovery & Emotional Diagnosis</p>
              <ul className="text-[#052036]/70 space-y-1 text-[11px] pt-1">
                <li>✦ Full interactive whole-sign natal wheel</li>
                <li>✦ Daily sky weather & Moon transit themes</li>
                <li>✦ Core Energy & Emotional Pattern chapters</li>
                <li>✦ Basic synastry compatibility scores</li>
              </ul>
            </div>

            <div className="p-4 border border-[#052036]/15 bg-[rgba(234,193,87,0.06)] rounded-xl space-y-1.5">
              <span className="font-mono text-[#EAC157] uppercase block text-[10px] font-semibold">
                {isMembershipActive ? "✦ Active Access" : "🔒 Premium Tier"}
              </span>
              <p className="text-[#052036] font-cormorant text-sm">Resolution & Hope Windows</p>
              <ul className="text-[#052036]/70 space-y-1 text-[11px] pt-1">
                <li>✦ Exact Breakthrough calendar dates & hours</li>
                <li>✦ Verbatim conversation scripts without guilt</li>
                <li>✦ Synastric mind intent (What they secretly feel)</li>
                <li>✦ Full 6-part psychological natal reading</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Birth Coordinates & Ephemeris Inputs */}
        <div className="border border-[#052036]/10 bg-white shadow-sm rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#052036]/8 pb-3">
            <div>
              <p className="text-xs font-mono uppercase text-[#EAC157]">
                Astrological Coordinates
              </p>
              <p className="text-xs text-[#052036]/70 mt-0.5">
                Exact date, time, and city used to calculate your houses and live transits.
              </p>
            </div>
            <button
              onClick={() => {
                if (!isEditingBirth) {
                  setEditName(user.name);
                  setEditDate(user.birthDate);
                  setEditTime(user.birthTime);
                  setEditLocation(user.birthLocation);
                }
                setIsEditingBirth(!isEditingBirth);
              }}
              className="text-xs font-mono text-[#EAC157] hover:text-[#d9b048] transition-colors cursor-pointer"
            >
              {isEditingBirth ? "Cancel" : "Edit Details →"}
            </button>
          </div>

          {isEditingBirth ? (
            <form onSubmit={handleSaveBirth} className="space-y-4 pt-1">
              <div>
                <label className="text-xs text-[#052036]/70 font-mono block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white border border-[#052036]/20 rounded-xl px-3 py-2 text-xs text-[#052036] focus:outline-none focus:border-[#EAC157]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#052036]/70 font-mono block mb-1">Birth Date</label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full bg-white border border-[#052036]/20 rounded-xl px-3 py-2 text-xs text-[#052036] focus:outline-none focus:border-[#EAC157] [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#052036]/70 font-mono block mb-1">Birth Time</label>
                  <input
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="w-full bg-white border border-[#052036]/20 rounded-xl px-3 py-2 text-xs text-[#052036] focus:outline-none focus:border-[#EAC157] [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#052036]/70 font-mono block mb-1">Birth Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="City, Country (e.g. New York, USA)"
                  className="w-full bg-white border border-[#052036]/20 rounded-xl px-3 py-2 text-xs text-[#052036] focus:outline-none focus:border-[#EAC157]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingBirth(false)}
                  className="px-4 py-2 text-xs text-[#052036]/70 hover:text-[#052036] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="button-primary cursor-pointer text-xs py-2 px-5 disabled:opacity-50"
                >
                  {isCalculating ? "Calculating Ephemeris..." : "Save & Recalculate Chart"}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 border border-[#052036]/8 rounded-xl bg-[#FAF7F2]">
                <span className="text-[10px] font-mono text-[#052036]/70 uppercase block">Birth Date</span>
                <p className="text-xs text-[#052036] font-mono mt-0.5">{user.birthDate}</p>
              </div>
              <div className="p-3 border border-[#052036]/8 rounded-xl bg-[#FAF7F2]">
                <span className="text-[10px] font-mono text-[#052036]/70 uppercase block">Birth Time</span>
                <p className="text-xs text-[#052036] font-mono mt-0.5">{user.birthTime || "12:00"}</p>
              </div>
              <div className="p-3 border border-[#052036]/8 rounded-xl bg-[#FAF7F2]">
                <span className="text-[10px] font-mono text-[#052036]/70 uppercase block">City & Timezone</span>
                <p className="text-xs text-[#052036] font-mono mt-0.5 truncate">{user.birthLocation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Focus Areas & Astrological Themes */}
        <div className="border border-[#052036]/10 bg-white shadow-sm rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#052036]/8 pb-3">
            <div>
              <p className="text-xs font-mono uppercase text-[#EAC157]">Your Inquiry Interests</p>
              <p className="text-xs text-[#052036]/70 mt-0.5">
                Topics prioritized during your personalized AI readings and transit insights.
              </p>
            </div>
            <button
              onClick={() => {
                if (isEditingInterests) {
                  handleSaveInterests();
                } else {
                  setEditInterests(user.interests || []);
                  setIsEditingInterests(true);
                }
              }}
              className="text-xs font-mono text-[#EAC157] hover:text-[#d9b048] transition-colors cursor-pointer"
            >
              {isEditingInterests ? "Save Focus" : "Customize →"}
            </button>
          </div>

          {isEditingInterests ? (
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`text-xs px-3 py-1.5 border rounded-xl transition-colors cursor-pointer ${
                      editInterests.includes(interest)
                        ? "bg-[#052036] text-[#FAF9F6] border-[#052036] font-semibold shadow-xs"
                        : "border-[rgba(234,193,87,0.15)] text-[#052036]/70 hover:border-[rgba(234,193,87,0.4)]"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {(user.interests && user.interests.length > 0
                ? user.interests
                : ["Relationships & intimacy", "Career & sovereign purpose", "Inner child & shadow patterns"]
              ).map((interest) => (
                <span
                  key={interest}
                  className="text-xs px-3 py-1.5 border border-[rgba(234,193,87,0.18)] bg-[#FAF7F2] text-[#FAF9F6] rounded-xl"
                >
                  ✦ {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Psychological Inquiries & Saved Vault */}
        <div className="border border-[#052036]/10 bg-white shadow-sm rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#052036]/8 pb-3">
            <div>
              <p className="text-xs font-mono uppercase text-[#EAC157]">
                Inquiry Journal Vault
              </p>
              <p className="text-xs text-[#052036]/70 mt-0.5">
                Quickly re-examine your recent unspoken questions with live ephemeris transits.
              </p>
            </div>
            <button
              onClick={() => onNavigate("askai")}
              className="text-xs font-mono text-[#EAC157] hover:underline cursor-pointer"
            >
              Ask New Inquiry →
            </button>
          </div>

          <div className="space-y-2 pt-1">
            {RECENT_INQUIRIES.map((inq, i) => (
              <div
                key={i}
                className="p-3.5 border border-[#052036]/10 bg-[#FAF7F2] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[rgba(234,193,87,0.35)] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-cormorant text-[#052036] font-medium">
                      {inq.topic}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[rgba(234,193,87,0.15)] text-[#EAC157] rounded-xl uppercase">
                      {inq.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#052036]/70 mt-1 leading-relaxed">{inq.question}</p>
                </div>

                <button
                  onClick={() => launchInquiry(inq.question)}
                  className="text-xs font-mono text-[#EAC157] hover:text-[#d9b048] self-start sm:self-auto cursor-pointer shrink-0"
                >
                  Consult AI ↗
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Controls, Cloud Sync & Data Security */}
        <div className="border border-[#052036]/10 bg-white shadow-sm rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#052036]/8 pb-3">
            <span className="text-xs font-mono uppercase text-[#EAC157]">
              Data Privacy & Security
            </span>
            <span className="text-[10px] font-mono text-[#052036]/70">
              {isSupabaseReady ? "✦ Supabase Cloud Enabled" : "✦ Local Vault Active"}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <button
              onClick={handleExportData}
              className="p-3 border border-[rgba(234,193,87,0.15)] bg-[#FAF7F2] rounded-xl text-left hover:border-[#EAC157] transition-colors cursor-pointer"
            >
              <p className="text-xs text-[#052036] font-mono">
                {copiedNotification ? "✓ Natal JSON Downloaded" : "Export Chart Data (JSON) ↗"}
              </p>
              <p className="text-[11px] text-[#052036]/70 mt-0.5">
                Download your complete ephemeris coordinates and house calculations.
              </p>
            </button>

            <button
              onClick={handleSignOut}
              className="p-3 border border-[rgba(220,100,80,0.25)] bg-[rgba(40,15,20,0.5)] rounded-xl text-left hover:border-[rgba(220,100,80,0.6)] transition-colors cursor-pointer"
            >
              <p className="text-xs text-[rgba(240,140,120,1)] font-mono">Sign Out of Salon</p>
              <p className="text-[11px] text-[#052036]/70 mt-0.5">
                End active session on this device and return to private sign-in.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
