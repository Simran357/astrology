import { useState } from "react";
import { ZodiacIcon, SunSymbol, MoonSymbol } from "../components/icons/CelestialIcons";
import { useApp } from "../context/AppContext";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const SAVED_READINGS = [
  { title: "Your Mars in Sagittarius", date: "Sep 9, 2026", type: "Planet" },
  { title: "Venus–Saturn square", date: "Sep 6, 2026", type: "Aspect" },
  { title: "North Node in Gemini", date: "Sep 4, 2026", type: "Node" },
  { title: "Full natal reading", date: "Aug 28, 2026", type: "Complete" },
];

const AVAILABLE_INTERESTS = [
  "Relationships & love", "Career & purpose", "Inner self & shadow",
  "Creativity & expression", "Spirituality & growth", "Timing & life cycles",
];

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, updateUser, isCalculating } = useApp();

  // Edit Birth Info State
  const [isEditingBirth, setIsEditingBirth] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editDate, setEditDate] = useState(user.birthDate);
  const [editTime, setEditTime] = useState(user.birthTime);
  const [editLocation, setEditLocation] = useState(user.birthLocation);

  // Edit Interests State
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [editInterests, setEditInterests] = useState<string[]>(user.interests || []);

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
    setEditInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="min-h-screen bg-[#0e0a17] text-[#eee5d3]">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 30% 40% at 20% 60%, rgba(50,30,100,0.05) 0%, transparent 70%)" }}/>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 py-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-8">Profile</p>

          {/* Avatar and identity */}
          <div className="flex items-end gap-6 mb-8">
            <div className="relative">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format"}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover bg-[#1f1830] border border-[rgba(238,93,52,0.2)]"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0e0a17] border border-[rgba(238,93,52,0.2)] flex items-center justify-center">
                <ZodiacIcon sign={user.risingSign.toLowerCase()} size={12} className="text-[#ee5d34]"/>
              </div>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-light text-[#eee5d3]">{user.name}</h1>
              <p className="text-sm text-[#bfb7aa] mt-1">Member since August 2026</p>
            </div>
          </div>

          {/* Big three */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Sun sign", value: user.sunSign, icon: <SunSymbol size={16} className="text-[#f0c870]"/>, sign: user.sunSign.toLowerCase() },
              { label: "Moon sign", value: user.moonSign, icon: <MoonSymbol size={16} className="text-[#bfb7aa]"/>, sign: user.moonSign.toLowerCase() },
              { label: "Rising", value: user.risingSign, icon: <ZodiacIcon sign={user.risingSign.toLowerCase()} size={16} className="text-[#ee5d34]"/>, sign: user.risingSign.toLowerCase() },
            ].map((p, i) => (
              <div key={i} className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] p-4 rounded-sm">
                <div className="flex items-center gap-1.5 mb-2">{p.icon}
                  <span className="text-xs text-[#bfb7aa]">{p.label}</span>
                </div>
                <p className="font-serif text-[#eee5d3]">{p.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Birth info */}
        <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase">Birth information</p>
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
              className="text-xs text-[#ee5d34] hover:text-[#f58a6b] transition-colors cursor-pointer">
              {isEditingBirth ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditingBirth ? (
            <form onSubmit={handleSaveBirth} className="space-y-4 pt-2">
              <div>
                <label className="text-xs text-[#bfb7aa] block mb-1">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-sm text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#bfb7aa] block mb-1">Birth Date</label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-sm text-[#eee5d3] focus:outline-none focus:border-[#ee5d34] [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#bfb7aa] block mb-1">Birth Time</label>
                  <input
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-sm text-[#eee5d3] focus:outline-none focus:border-[#ee5d34] [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#bfb7aa] block mb-1">Birth Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="City, Country"
                  className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-sm text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingBirth(false)}
                  className="px-4 py-2 text-xs text-[#bfb7aa] hover:text-[#eee5d3] transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="px-5 py-2 bg-[#ee5d34] text-[#0e0a17] text-xs font-medium hover:bg-[#f58a6b] transition-colors rounded-sm cursor-pointer disabled:opacity-50">
                  {isCalculating ? "Updating Chart..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {[
                { label: "Date", value: user.birthDate },
                { label: "Time", value: user.birthTime },
                { label: "Location", value: user.birthLocation },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-[#bfb7aa]">{item.label}</span>
                  <span className="text-sm text-[#eee5d3] font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interests */}
        <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase">Your focus areas</p>
            <button
              onClick={() => {
                if (isEditingInterests) {
                  handleSaveInterests();
                } else {
                  setEditInterests(user.interests || []);
                  setIsEditingInterests(true);
                }
              }}
              className="text-xs text-[#ee5d34] hover:text-[#f58a6b] transition-colors cursor-pointer">
              {isEditingInterests ? "Save" : "Edit"}
            </button>
          </div>

          {isEditingInterests ? (
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`text-xs px-3 py-1.5 border rounded-sm transition-colors cursor-pointer ${
                      editInterests.includes(interest)
                        ? "border-[#ee5d34] text-[#eee5d3] bg-[rgba(238,93,52,0.12)]"
                        : "border-[rgba(238,93,52,0.18)] text-[#bfb7aa] hover:border-[rgba(238,93,52,0.4)]"
                    }`}>
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(user.interests && user.interests.length > 0
                ? user.interests
                : ["Relationships & love", "Career & purpose", "Inner self & shadow", "Creativity & expression"]
              ).map((interest) => (
                <span key={interest} className="text-xs px-3 py-1.5 border border-[rgba(238,93,52,0.18)] text-[#bfb7aa] rounded-sm">
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Saved readings */}
        <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6 mb-8">
          <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-4">Saved readings</p>
          <div className="space-y-0">
            {SAVED_READINGS.map((r, i) => (
              <div key={i}>
                <button onClick={() => onNavigate("reading")}
                  className="w-full flex items-center justify-between py-3.5 text-left group hover:bg-[rgba(238,93,52,0.03)] transition-colors rounded-sm px-1 -mx-1 cursor-pointer">
                  <div>
                    <p className="text-sm text-[#eee5d3] group-hover:text-white transition-colors">{r.title}</p>
                    <p className="text-xs text-[#bfb7aa] mt-0.5">{r.type} · {r.date}</p>
                  </div>
                  <span className="text-[#bfb7aa] text-xs group-hover:text-[#eee5d3] transition-colors">→</span>
                </button>
                {i < SAVED_READINGS.length - 1 && <div className="h-px bg-[rgba(238,93,52,0.06)]"/>}
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="border border-[rgba(238,93,52,0.12)] bg-[rgba(31,24,48,0.8)] rounded-sm p-6">
          <p className="text-xs font-mono text-[#bfb7aa] tracking-widest uppercase mb-4">Account</p>
          <div className="space-y-2">
            {["Account settings", "Notification preferences", "Privacy", "Sign out"].map((item, i) => (
              <button key={i}
                onClick={() => {
                  if (i === 3) onNavigate("login");
                }}
                className={`w-full text-left px-1 py-2.5 text-sm transition-colors cursor-pointer ${i === 3 ? "text-[rgba(220,100,80,0.7)] hover:text-[rgba(220,100,80,1)]" : "text-[#bfb7aa] hover:text-[#eee5d3]"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
