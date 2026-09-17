"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useApp } from "../context/AppContext";
import { searchLocations, GeocodedLocation } from "../services/geocodingService";
const darkLogo = "/image/AstroFindingsDarkLogo.svg";

interface OnboardingPageProps {
  onNavigate: (page: string) => void;
}

const STEPS = [
  { id: "name", title: "What should we call you?", symbol: "✦", category: "Coordinate 1/4" },
  { id: "birth", title: "When were you born?", symbol: "☉", category: "Coordinate 2/4" },
  { id: "time", title: "What time were you born?", symbol: "☽", category: "Coordinate 3/4" },
  { id: "location", title: "Where were you born?", symbol: "♄", category: "Coordinate 4/4" },
  { id: "q1", title: "The Instinct of Retreat", symbol: "🛡️", category: "Diagnostic 1/3" },
  { id: "q2", title: "The Unseen Anchor", symbol: "🕯️", category: "Diagnostic 2/3" },
  { id: "q3", title: "The Sacred Crossroads", symbol: "✧", category: "Diagnostic 3/3" },
  { id: "reveal", title: "Your First Cosmic Mirror", symbol: "🪞", category: "Synthesis" },
];

const YES_QUESTIONS = [
  {
    stepIndex: 4,
    qNumber: 1,
    tag: "DETACHMENT · OVERTHINKING",
    question: "Do you detach, step back into silence, and overthink when emotionally overwhelmed?",
    subtext: "Why you react this way: unearthing the planet placement where your defense mechanism was born.",
    options: [
      {
        id: "yes_retreat",
        label: "YES — Overthinking triggers me to detach and step back into silence.",
        whisper: "Your detachment isn't coldness. Your chart locates the exact planet placement triggering your retreat.",
      },
      {
        id: "yes_freeze",
        label: "YES — Anxiety freezes me; numbness feels safer than facing difficult emotions.",
        whisper: "Silence was built to avoid overwhelm. Your Moon and Saturn hold the blueprint of this thinking pattern.",
      },
    ],
  },
  {
    stepIndex: 5,
    qNumber: 2,
    tag: "HEARTBREAK · SUPPRESSED EMOTIONS",
    question: "Do you hold a soft corner for someone who hurt you, feeling lonely while suppressing yourself?",
    subtext: "Why you still have feelings, and what makes you suppress yourself without guilt.",
    options: [
      {
        id: "yes_anchor",
        label: "YES — I still have feelings and hold a soft corner, even through betrayal and heartbreak.",
        whisper: "Your Venus and 7th House reveal why your feelings get hurt so easily and why you forgive betrayal.",
      },
      {
        id: "yes_alone",
        label: "YES — I suppress my heartbreak and carry the feeling of loneliness completely alone.",
        whisper: "Your chart proves that feeling alone is not a defect — it reveals what they do which makes you cry.",
      },
    ],
  },
  {
    stepIndex: 6,
    qNumber: 3,
    tag: "COMFORT ZONE · WHAT MAKES YOU SHINE",
    question: "Are you hiding in your comfort zone, wondering what triggers you instead of stepping into what makes you shine?",
    subtext: "Moving from emotional overwhelm and fear into your true celestial power.",
    options: [
      {
        id: "yes_hollow",
        label: "YES — Overwhelm traps me in my comfort zone while what makes me shine stays locked inside.",
        whisper: "Your Sun, Mars, and Midheaven expose the exact triggers keeping you small and how to break free.",
      },
      {
        id: "yes_leap",
        label: "YES — I need to understand why I react this way so I can finally step into what makes me shine.",
        whisper: "Planetary shifts and transits are aligning right now to release unexplored emotions with no guilt.",
      },
    ],
  },
];

export default function OnboardingPage({ onNavigate }: OnboardingPageProps) {
  const { updateUser, isCalculating, user, login } = useApp();
  const [step, setStep] = useState(0);

  // Form Data
  const [data, setData] = useState({
    name: "",
    birthDate: "1994-08-09",
    birthTime: "07:24",
    birthLocation: "San Francisco, 94102, CA, USA",
    latitude: 37.7749,
    longitude: -122.4194,
    timezone: "America/Los_Angeles",
    isTimeApproximate: false,
    q1Answer: "yes_retreat",
    q2Answer: "yes_anchor",
    q3Answer: "yes_hollow",
  });

  // Location API Autocomplete State
  const [locationQuery, setLocationQuery] = useState(data.birthLocation);
  const [suggestions, setSuggestions] = useState<GeocodedLocation[]>([]);
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isNavigatingRef = useRef(false);

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  // Debounced Location API Search with Pincode
  useEffect(() => {
    if (step !== 3) return;
    if (!locationQuery || locationQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingGeo(true);
      try {
        const results = await searchLocations(locationQuery);
        setSuggestions(results);
        setShowDropdown(results.length > 0);
      } catch (err) {
        console.warn("Location search error:", err);
      } finally {
        setIsLoadingGeo(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [locationQuery, step]);

  // Handle Location Selection with Pincode
  const handleSelectLocation = (loc: GeocodedLocation) => {
    let full = loc.displayName || loc.name;
    if (loc.postcode && !full.includes(loc.postcode)) {
      full = `${loc.city || loc.name}, ${loc.postcode}, ${loc.state ? loc.state + ", " : ""}${loc.country || ""}`;
    }

    setData((d) => ({
      ...d,
      birthLocation: full,
      latitude: loc.latitude,
      longitude: loc.longitude,
      timezone: loc.timezone,
    }));
    setLocationQuery(full);
    setShowDropdown(false);
  };

  const handleNext = useCallback(async () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 350);

    if (step === 1) {
      const bDate = new Date(data.birthDate);
      if (isNaN(bDate.getTime()) || bDate.getFullYear() < 1900 || bDate > new Date()) {
        alert("Please enter a valid birth date between 1900 and today.");
        return;
      }
    }
    if (step < 6) {
      setStep((s) => s + 1);
    } else if (step === 6) {
      setStep(7);
      await updateUser({
        name: data.name.trim() || "Seeker",
        birthDate: data.birthDate || "1994-08-09",
        birthTime: data.isTimeApproximate ? "12:00" : (data.birthTime || "12:00"),
        birthLocation: data.birthLocation || "San Francisco, 94102, CA, USA",
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        isTimeApproximate: data.isTimeApproximate,
        interests: [
          "Detachment & Overthinking Patterns",
          "Heartbreak & Suppressed Emotions",
          "Comfort Zone & Stepping Into Power",
        ],
      });
    } else {
      login();
      onNavigate("chart");
    }
  }, [step, data, updateUser, login, onNavigate]);

  // Enter key listener: when user types name on Step 0 or presses Enter, proceed to next step
  useEffect(() => {
    if (step !== 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [step, handleNext]);

  const activeQ = YES_QUESTIONS.find((q) => q.stepIndex === step);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#052036] flex flex-col selection:bg-[#EAC157] selection:text-[#052036] font-inter">
      {/* Ambient background with stars */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 75% 25%, rgba(234,193,87,0.06) 0%, transparent 70%)",
          }}
        />
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#FAF9F6]"
            style={{
              left: `${(i * 19) % 100}%`,
              top: `${(i * 29) % 100}%`,
              width: `${0.8 + (i % 3) * 0.7}px`,
              height: `${0.8 + (i % 3) * 0.7}px`,
              opacity: 0.12 + (i % 4) * 0.1,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 border-b border-[#052036]/10">
        <div onClick={() => onNavigate("home")} className="cursor-pointer" aria-label="AstroFindings Home">
          <img src={darkLogo} alt="AstroFindings" className="h-7 w-auto select-none inline-block align-middle" />
        </div>

        {step < 7 && (
          <button
            onClick={() => onNavigate("dashboard")}
            className="text-xs text-[#052036]/60 hover:text-[#052036] transition-colors cursor-pointer font-mono uppercase tracking-wider">
            Skip to Chart →
          </button>
        )}
      </header>

      {/* Progress Bar */}
      <div className="relative z-10 px-6 md:px-12">
        <div className="h-0.5 bg-[#052036]/10 w-full">
          <div
            className="h-0.5 bg-[#EAC157] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(234,193,87,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2.5">
          <span className="text-[10px] font-mono text-[#8C6B1B] tracking-widest uppercase">
            Step {step + 1} of {STEPS.length} · {current.title}
          </span>
          <span className="text-[10px] font-mono text-[#052036]/60">
            {current.category}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 md:py-14">
        <div className="w-full max-w-2xl">
          {/* -------------------------------------------------------------- */}
          {/* STEP 0: NAME                                                   */}
          {/* -------------------------------------------------------------- */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border border-dashed border-[#052036]/15 bg-[#FAF7F2] text-[10px] font-mono text-[#8C6B1B] uppercase tracking-widest">
                <span>✦ NATAL FOLIO · ENTRY IDENTITY</span>
              </div>
              <h1 className="font-cormorant text-3xl md:text-4xl font-normal text-[#052036] leading-snug">
                What should we call you?
              </h1>
              <p className="text-sm text-[#052036]/60 leading-relaxed">
                Your name anchors your personalized whole-sign chart archive and transits.
              </p>
              <div className="pt-2">
                <input
                  ref={nameInputRef}
                  type="text"
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                  placeholder="Enter your name or chosen alias"
                  autoFocus
                  style={{ color: "#052036" }}
                  className="w-full bg-transparent border-b-2 border-[#052036]/20 py-3 text-xl text-[#052036] placeholder:text-[#052036]/40 focus:outline-none focus:border-[#EAC157] transition-colors font-sans"
                />
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* STEP 1: BIRTH DATE                                             */}
          {/* -------------------------------------------------------------- */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border border-dashed border-[#052036]/15 bg-[#FAF7F2] text-[10px] font-mono text-[#8C6B1B] uppercase tracking-widest">
                <span>☉ SOLAR EPHEMERIS COORDINATE</span>
              </div>
              <h1 className="font-cormorant text-3xl md:text-4xl font-normal text-[#052036] leading-snug">
                When were you born?
              </h1>
              <p className="text-sm text-[#052036]/60 leading-relaxed">
                Your date of birth fixes the exact planetary longitude of the Sun, outer planets, and lunar nodes.
              </p>
              <div className="pt-2">
                <input
                  type="date"
                  value={data.birthDate}
                  onChange={(e) => setData((d) => ({ ...d, birthDate: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                  style={{ color: "#052036" }}
                  className="w-full bg-transparent border-b-2 border-[#052036]/20 py-3 text-xl text-[#052036] focus:outline-none focus:border-[#C89B3C] transition-colors [color-scheme:light] font-sans"
                />
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* STEP 2: BIRTH TIME                                             */}
          {/* -------------------------------------------------------------- */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border border-dashed border-[#052036]/15 bg-[#FAF7F2] text-[10px] font-mono text-[#8C6B1B] uppercase tracking-widest">
                <span>☽ LUNAR & ASCENDANT HORIZON</span>
              </div>
              <h1 className="font-cormorant text-3xl md:text-4xl font-normal text-[#052036] leading-snug">
                What time were you born?
              </h1>
              <p className="text-sm text-[#052036]/60 leading-relaxed">
                Birth time fixes your Ascendant (Rising sign) and the twelve houses. Every 4 minutes shifts the cosmic horizon by one degree.
              </p>
              <div className="pt-2">
                <input
                  type="time"
                  value={data.birthTime}
                  onChange={(e) => setData((d) => ({ ...d, birthTime: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                  style={{ color: "#052036" }}
                  className="w-full bg-transparent border-b-2 border-[#052036]/20 py-3 text-xl text-[#052036] focus:outline-none focus:border-[#C89B3C] transition-colors [color-scheme:light] font-sans"
                />
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={data.isTimeApproximate}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setData((d) => ({
                        ...d,
                        isTimeApproximate: checked,
                        birthTime: checked ? "12:00" : d.birthTime,
                      }));
                    }}
                    className="w-4 h-4 rounded accent-[#EAC157] cursor-pointer"
                  />
                  <span className="text-xs text-[#8C6B1B] hover:underline underline-offset-4 font-mono">
                    ✦ I don't know my exact time (calculate using solar noon)
                  </span>
                </label>
                {data.isTimeApproximate && (
                  <div className="mt-2.5 p-3 rounded-xl border border-[#052036]/15 bg-[#FAF7F2] text-xs text-[#052036]/80 font-sans shadow-sm">
                    <span className="text-[#8C6B1B] font-semibold block mb-0.5">Approximate Chart Active</span>
                    House cusps and Ascendant will be estimated based on solar noon. Planetary sign placements, degrees, and aspects remain exact.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* STEP 3: BIRTH LOCATION WITH LIVE API & PINCODE AUTOCOMPLETE     */}
          {/* -------------------------------------------------------------- */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border border-dashed border-[#052036]/15 bg-[#FAF7F2] text-[10px] font-mono text-[#8C6B1B] uppercase tracking-widest">
                <span>♄ GEOGRAPHIC EPHEMERIS & PINCODE</span>
              </div>
              <h1 className="font-cormorant text-3xl md:text-4xl font-normal text-[#052036] leading-snug">
                Where were you born?
              </h1>
              <p className="text-sm text-[#052036]/60 leading-relaxed">
                Enter your birthplace city or postal code. We use live geocoding coordinates and pincode resolution to calibrate your house cusps and topocentric sky.
              </p>

              <div className="relative pt-2" ref={dropdownRef}>
                <div className="relative">
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      setData((d) => ({ ...d, birthLocation: e.target.value }));
                    }}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowDropdown(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (suggestions.length > 0) {
                          handleSelectLocation(suggestions[0]);
                        } else {
                          handleNext();
                        }
                      }
                    }}
                    placeholder="Search city, state, or pincode (e.g. New Delhi 110001 or San Francisco 94102)"
                    style={{ color: "#052036" }}
                    className="w-full bg-transparent border-b-2 border-[#052036]/20 py-3 text-xl text-[#052036] placeholder:text-[#052036]/40 focus:outline-none focus:border-[#EAC157] transition-colors pr-10 font-sans"
                  />
                  {isLoadingGeo && (
                    <div className="absolute right-2 top-3.5 text-xs font-mono text-[#8C6B1B] animate-pulse">
                      Searching...
                    </div>
                  )}
                </div>

                {/* Autocomplete Dropdown List */}
                {showDropdown && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#052036]/15 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto divide-y divide-[#052036]/10">
                    {suggestions.map((loc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectLocation(loc)}
                        className="w-full text-left p-3 hover:bg-[#FAF7F2] transition-colors cursor-pointer flex items-center justify-between group">
                        <div className="space-y-0.5">
                          <p className="text-sm font-cormorant text-[#052036] group-hover:text-[#8C6B1B]">
                            {loc.city || loc.name}
                            {loc.postcode && (
                              <span className="ml-2 text-xs font-mono text-[#8C6B1B] bg-[#EAC157]/15 px-1.5 py-0.5 rounded-xl">
                                PIN: {loc.postcode}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-[#052036]/60 font-mono">
                            {[loc.state, loc.country].filter(Boolean).join(", ")}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-[#052036]/60/60 group-hover:text-[#8C6B1B]">
                          {loc.timezone}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Current Selected Location Indicator */}
              <div className="p-3.5 rounded-xl border border-[#052036]/15 bg-[#FAF7F2] flex items-center justify-between text-xs font-mono shadow-sm">
                <span className="text-[#052036]/60">Active Birth Coordinate:</span>
                <span className="text-[#8C6B1B] font-medium truncate ml-2">
                  {data.birthLocation}
                </span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* STEPS 4, 5, 6: THE 3 PROVOCATIVE "YES" EMOTIONAL QUESTIONS     */}
          {/* -------------------------------------------------------------- */}
          {activeQ && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1  text-[10px] font-mono text-[#8C6B1B] uppercase tracking-widest rotate-[-1deg]">
                  <span>{activeQ.tag}</span>
                </div>
                <span className="text-[10px] font-mono text-[#052036]/60">
                  QUESTION 0{activeQ.qNumber} OF 03
                </span>
              </div>

              <div>
                <h1 className="font-cormorant text-2xl md:text-3xl font-normal text-[#052036] leading-snug">
                  {activeQ.question}
                </h1>
                <p className="text-xs text-[#052036]/60 mt-2 font-light">
                  {activeQ.subtext}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {activeQ.options.map((opt) => {
                  const isSelected =
                    step === 4
                      ? data.q1Answer === opt.id
                      : step === 5
                        ? data.q2Answer === opt.id
                        : data.q3Answer === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        if (step === 4) setData((d) => ({ ...d, q1Answer: opt.id }));
                        if (step === 5) setData((d) => ({ ...d, q2Answer: opt.id }));
                        if (step === 6) setData((d) => ({ ...d, q3Answer: opt.id }));
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${isSelected
                          ? "border-[#EAC157] bg-[#FAF7F2] shadow-md"
                          : "border-[#052036]/15 bg-white hover:border-[#EAC157] hover:bg-[#FAF7F2] shadow-sm"
                        }`}>
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${isSelected ? "border-[#EAC157] bg-[#EAC157]" : "border-[#052036]/30 bg-white"
                            }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#052036]" />}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-cormorant text-[#052036] leading-snug font-normal">
                            {opt.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Validating Whisper */}
              {(() => {
                const currentOptId =
                  step === 4 ? data.q1Answer : step === 5 ? data.q2Answer : data.q3Answer;
                const chosen = activeQ.options.find((o) => o.id === currentOptId) || activeQ.options[0];
                return (
                  <div className="p-4 rounded-xl border-l-2 border-[#EAC157] bg-[rgba(234,193,87,0.06)] space-y-1">
                    <span className="text-[10px] font-mono text-[#8C6B1B] tracking-wider uppercase font-semibold">
                      THE MIRROR CONFIRMS
                    </span>
                    <p className="font-cormorant italic text-xs text-[#052036]/80 leading-relaxed">
                      "{chosen.whisper}"
                    </p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* STEP 7: THE FIRST REVEAL PAYOFF CARD                           */}
          {/* -------------------------------------------------------------- */}
          {step === 7 && (
            <div className="space-y-8 animate-fadeIn">
              {/* Talismanic Seal */}
              <div className="text-center space-y-3">
                <div className="flex justify-center mb-2">
                  <img 
                    src={"/stickers/zodiac/" + (user?.sunSign || "leo").toLowerCase() + ".png"} 
                    alt={user?.sunSign || "Zodiac"} 
                    className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                  />
                </div>
                <h1 className="font-cormorant text-3xl md:text-4xl text-[#052036] font-normal">
                  Your First Cosmic Mirror, {data.name || "Seeker"}
                </h1>
                <p className="text-xs text-[#052036]/60 max-w-lg mx-auto">
                  Calculated from your exact birth sky in {data.birthLocation}. Here is the architecture of your soul.
                </p>
              </div>

              {/* The Trinity Card (Sun, Moon, Rising) */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="editorial-card border border-[#052036]/15 bg-white p-5 rounded-xl text-center space-y-2 relative group hover:border-[#EAC157] transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C6B1B]">
                      ☉ The Sun · Core Will
                    </div>
                    <div className="text-2xl font-cormorant text-[#052036] my-1">
                      {user?.sunSign || "Leo"}
                    </div>
                    <p className="text-xs text-[#052036]/60 font-light leading-relaxed">
                      Your sovereign creative fire, your authenticity under pressure, and what allows you to stop performing and truly shine.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "astrofindings_pending_inquiry",
                        `Examine my ${user?.sunSign || "natal"} Sun: Where am I suppressing my natural creative authority, what triggers my performance anxiety, and what does my true sovereign shine look like?`
                      );
                      onNavigate("askai");
                    }}
                    className="pt-2 text-[11px] font-mono text-[#8C6B1B] hover:text-[#d9b048] transition-colors cursor-pointer border-t border-[rgba(234,193,87,0.15)] mt-2"
                  >
                    Inscribe to Ask AstroFindings →
                  </button>
                </div>

                <div className="editorial-card border border-[#052036]/15 bg-white p-5 rounded-xl text-center space-y-2 relative group hover:border-[#EAC157] transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C6B1B]">
                      ☽ The Moon · Emotional Patterns
                    </div>
                    <div className="text-2xl font-cormorant text-[#052036] my-1">
                      {user?.moonSign || "Virgo"}
                    </div>
                    <p className="text-xs text-[#052036]/60 font-light leading-relaxed">
                      How you experience emotional overwhelm, why you shut down, why you carry unspoken anger or a soft corner, and the unconscious sanctuary your nervous system requires.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "astrofindings_pending_inquiry",
                        `Examine my ${user?.moonSign || "natal"} Moon: Why do I experience emotional overwhelm, what makes me shut down or withdraw into silence, why do I feel sudden anger or carry unsaid guilt, and what subconscious blindspots am I not noticing in love and friendships?`
                      );
                      onNavigate("askai");
                    }}
                    className="pt-2 text-[11px] font-mono text-[#8C6B1B] hover:text-[#d9b048] transition-colors cursor-pointer border-t border-[rgba(234,193,87,0.15)] mt-2"
                  >
                    Inscribe to Ask AstroFindings →
                  </button>
                </div>

                <div className="editorial-card border border-[#052036]/15 bg-white p-5 rounded-xl text-center space-y-2 relative group hover:border-[#EAC157] transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C6B1B]">
                      ↑ The Ascendant · The Shield
                    </div>
                    <div className="text-2xl font-cormorant text-[#052036] my-1">
                      {user?.risingSign || "Scorpio"}
                    </div>
                    <p className="text-xs text-[#052036]/60 font-light leading-relaxed">
                      The lens through which you meet the outside world, why you erect a defensive boundary when safety is threatened, and how you observe before speaking.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "astrofindings_pending_inquiry",
                        `Examine my ${user?.risingSign || "natal"} Ascendant: The lens through which I meet the world, why I erect an emotional boundary when safety is threatened, and how to step out of my comfort zone.`
                      );
                      onNavigate("askai");
                    }}
                    className="pt-2 text-[11px] font-mono text-[#8C6B1B] hover:text-[#d9b048] transition-colors cursor-pointer border-t border-[rgba(234,193,87,0.15)] mt-2"
                  >
                    Inscribe to Ask AstroFindings →
                  </button>
                </div>
              </div>

              {/* Bespoke Synthesis Reflecting the 3 YES Answers */}
              <div className="border border-[#052036]/15 bg-white p-6 md:p-8 rounded-xl space-y-4 shadow-md relative">
                <div className="flex items-center justify-between border-b border-[rgba(234,193,87,0.15)] pb-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C6B1B]">
                    THE SYNTHESIS OF YOUR PATTERN
                  </span>
                  <span className="text-[10px] font-mono text-[#052036]/60">
                    WHOLE-SIGN EPHEMERIS
                  </span>
                </div>

                <p className="font-cormorant text-base md:text-lg text-[#052036] leading-relaxed font-normal">
                  You confirmed that your instinct is to <span className="text-[#8C6B1B] font-medium">withdraw behind an ice wall</span> when intimacy gets intense, that you carry everyone else's emotional storms in silence, and that you feel hollow inside an outgrown life. In your birth chart, your <span className="text-[#8C6B1B]">{user?.moonSign} Moon</span> reveals why: your nervous system learned early that showing raw vulnerability brought isolation.
                </p>

                <p className="text-xs md:text-sm text-[#052036]/60 leading-relaxed font-light">
                  Regarding your crossroads: the sky confirms that your current restlessness is not an impending breakdown. It is the friction of a soul shedding outgrown armor. Your <span className="text-[#052036] font-bold">{user?.risingSign} Rising</span> is a shield built for sovereignty, and your <span className="text-[#052036] font-bold">{user?.sunSign} Sun</span> is ready to stop performing.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[rgba(234,193,87,0.12)]">
                  <div className="flex items-center gap-2 text-xs text-[#8C6B1B] font-mono">
                    <span>✦ 10 Natal Planets Mapped</span>
                    <span>·</span>
                    <span>✦ Whole-Sign Houses Calibrated</span>
                    <span>·</span>
                    <span>✦ Real Ephemeris Active</span>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "astrofindings_pending_inquiry",
                        `Deep Natal Reading: Inquire into my core emotional conflict between my ${user?.sunSign} Sun, ${user?.moonSign} Moon, and ${user?.risingSign} Rising. Why do I oscillate between intense devotion and sudden cold detachment, and what subconscious emotional triggers am I ignoring?`
                      );
                      onNavigate("askai");
                    }}
                    className="px-4 py-2 bg-[rgba(234,193,87,0.15)] border border-[#EAC157] hover:bg-[#EAC157] hover:text-[#052036] text-[#052036] text-xs font-mono rounded-xl transition-all cursor-pointer"
                  >
                    Consult Ask AstroFindings on My Emotional Pattern →
                  </button>
                </div>
              </div>

              {/* No real astrologers notice */}
              <div className="p-3 border border-[#052036]/15 bg-[#FAF7F2] rounded-xl text-center text-xs text-[#052036]/80">
                <span className="text-[#8C6B1B]">100% Self-guided exploration: </span>
                Your chart interpretations, live astronomical transits, and relational synastry are fully unlocked without consultation fees.
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-[rgba(234,193,87,0.1)] mt-8">
            <button
              onClick={() => step > 0 && setStep((s) => s - 1)}
              className={`text-xs font-mono uppercase tracking-wider text-[#052036]/60 hover:text-[#052036] transition-colors cursor-pointer ${step === 0 || step === 7 ? "invisible" : ""
                }`}>
              ← Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNext();
                }
              }}
              disabled={isCalculating}
              className="px-8 py-3.5 bg-[#052036] text-[#FAF9F6] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#d9b048] transition-all duration-200 rounded-full shadow-lg cursor-pointer disabled:opacity-50">
              {isCalculating
                ? "Calculating Ephemeris..."
                : step === 6
                  ? "Reveal My Inner Architecture →"
                  : step === 7
                    ? "Enter Your Sanctuary & Chart →"
                    : "Continue →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
