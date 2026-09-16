import { useState, useEffect, FormEvent } from "react";
import { useApp } from "../context/AppContext";
import { calculateCompatibility, PersonProfile } from "../services/astrologyEngine";
import {
  askAstrologyConsultant,
  getPersonalizedAstrologyReading,
  AIResponse,
  getAISettings,
  saveAISettings,
  AISettings,
} from "../services/aiAstrologyService";
import { TRANSIT_SHIFTS_DATA } from "../data/transitShiftsData";
import { AFFIRMATIONS_DATA } from "../data/wellnessData";

interface Props {
  onNavigate: (page: string) => void;
}

function Shell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="app-page-shell astral-app-surface min-h-screen selection:bg-[#ee5d34] selection:text-[#0e0a17]">
      <div className="section-shell max-w-5xl mx-auto px-5 sm:px-8 py-8 md:py-12">
        <div className="eyebrow mb-3 text-xs font-mono uppercase tracking-widest text-[#ee5d34]">
          {eyebrow}
        </div>
        <h1 className="display app-display-title font-serif text-3xl md:text-5xl text-[#eee5d3] leading-tight mb-3">
          {title}
        </h1>
        <p className="app-page-intro text-sm md:text-base text-[#bfb7aa] max-w-2xl mb-8 leading-relaxed">
          {intro}
        </p>
        {children}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 1. AUTH PAGES: LOGIN & SIGNUP                                             */
/* ========================================================================= */

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export function LoginPage({ onNavigate }: Props) {
  const { login, loginWithGoogle, isSupabaseReady } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMsg(res.error || "Invalid credentials. Please verify your email and password.");
        setIsLoading(false);
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        onNavigate("chart");
      }, 350);
    } catch (err: any) {
      setErrorMsg(err.message || "Sign in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const res = await loginWithGoogle();
      if (!res.success) {
        setErrorMsg(res.error || "Google authentication failed.");
        setIsLoading(false);
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        onNavigate("chart");
      }, 350);
    } catch (err: any) {
      setErrorMsg(err.message || "Google sign in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page astral-app-surface min-h-screen flex items-center justify-center p-6 bg-[#0e0a17]">
      <div className="auth-card max-w-md w-full border border-[rgba(238,93,52,0.25)] bg-[rgba(31,24,48,0.92)] p-8 rounded-sm space-y-6 shadow-2xl backdrop-blur-md">
        <button
          className="brand auth-brand flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <span className="brand-mark text-xs font-mono px-1.5 py-0.5 border border-[#ee5d34] text-[#ee5d34]">
            AF
          </span>
          <span className="brand-name font-serif text-lg text-[#eee5d3]">AstroFindings</span>
        </button>

        <div className="flex items-center justify-between">
          <span className="eyebrow text-xs font-mono text-[#ee5d34] uppercase tracking-wider">
            Private access
          </span>
          <span className="text-[10px] font-mono text-[#bfb7aa]">
            {isSupabaseReady ? "✦ Supabase Cloud Active" : "✦ Local Auth Ready"}
          </span>
        </div>

        <h1 className="display font-serif text-2xl md:text-3xl text-[#eee5d3]">
          Return to the salon.
        </h1>
        <p className="app-page-intro text-xs text-[#bfb7aa] leading-relaxed">
          Sign in to access your birth wheel, synastry bonds, daily transits, and private inquiries.
        </p>

        {/* Continue with Google */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 rounded-sm border border-[rgba(238,93,52,0.3)] bg-[rgba(20,15,35,0.8)] hover:bg-[rgba(238,93,52,0.12)] hover:border-[#ee5d34] transition-all flex items-center justify-center gap-3 text-xs font-mono text-[#eee5d3] cursor-pointer shadow-md disabled:opacity-50"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[rgba(238,93,52,0.15)]" />
          <span className="text-[10px] font-mono text-[#bfb7aa] uppercase tracking-widest">
            or email
          </span>
          <div className="h-px flex-1 bg-[rgba(238,93,52,0.15)]" />
        </div>

        {errorMsg && (
          <div className="p-3 border border-[rgba(220,100,80,0.5)] bg-[rgba(60,20,20,0.4)] rounded-sm text-xs text-[#ff9999] leading-relaxed">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="form-stack space-y-4">
          <label className="block text-xs font-mono text-[#bfb7aa]">
            Email Address
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 bg-[rgba(14,10,23,0.85)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2.5 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
            />
          </label>
          <label className="block text-xs font-mono text-[#bfb7aa]">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 bg-[rgba(14,10,23,0.85)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2.5 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
            />
          </label>

          <button
            disabled={isLoading}
            className="button-primary w-full py-3 cursor-pointer text-xs font-medium disabled:opacity-50"
            type="submit"
          >
            {isLoading ? "Authenticating..." : "Enter the salon ↗"}
          </button>
        </form>

        {submitted && (
          <div className="form-feedback text-xs text-[#ee5d34] p-2 border border-[#ee5d34] bg-[rgba(238,93,52,0.1)] rounded-sm text-center">
            Sign-in verified. Opening your celestial coordinates...
          </div>
        )}

        <button
          className="button-quiet text-xs text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer block text-center w-full pt-1"
          onClick={() => onNavigate("signup")}
        >
          New seeker? Create an account →
        </button>
      </div>
    </div>
  );
}

export function SignupPage({ onNavigate }: Props) {
  const { signup, loginWithGoogle, isSupabaseReady } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await signup(name.trim(), email.trim(), password);
      if (!res.success) {
        setErrorMsg(res.error || "Could not register account.");
        setIsLoading(false);
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        onNavigate("onboarding");
      }, 400);
    } catch (err: any) {
      setErrorMsg(err.message || "Sign up failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const res = await loginWithGoogle();
      if (!res.success) {
        setErrorMsg(res.error || "Google authentication failed.");
        setIsLoading(false);
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        onNavigate("chart");
      }, 350);
    } catch (err: any) {
      setErrorMsg(err.message || "Google registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page astral-app-surface min-h-screen flex items-center justify-center p-6 bg-[#0e0a17]">
      <div className="auth-card max-w-md w-full border border-[rgba(238,93,52,0.25)] bg-[rgba(31,24,48,0.92)] p-8 rounded-sm space-y-6 shadow-2xl backdrop-blur-md">
        <button
          className="brand auth-brand flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <span className="brand-mark text-xs font-mono px-1.5 py-0.5 border border-[#ee5d34] text-[#ee5d34]">
            AF
          </span>
          <span className="brand-name font-serif text-lg text-[#eee5d3]">AstroFindings</span>
        </button>

        <div className="flex items-center justify-between">
          <span className="eyebrow text-xs font-mono text-[#ee5d34] uppercase tracking-wider">
            Begin a private practice
          </span>
          <span className="text-[10px] font-mono text-[#bfb7aa]">
            {isSupabaseReady ? "✦ Supabase Cloud Active" : "✦ Local Auth Ready"}
          </span>
        </div>

        <h1 className="display font-serif text-2xl md:text-3xl text-[#eee5d3]">
          Make room for the question.
        </h1>
        <p className="app-page-intro text-xs text-[#bfb7aa] leading-relaxed">
          Create your account to calculate true whole-sign placements, daily transit forecasts, and synastry bonds.
        </p>

        {/* Continue with Google */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleSignup}
          className="w-full py-3 px-4 rounded-sm border border-[rgba(238,93,52,0.3)] bg-[rgba(20,15,35,0.8)] hover:bg-[rgba(238,93,52,0.12)] hover:border-[#ee5d34] transition-all flex items-center justify-center gap-3 text-xs font-mono text-[#eee5d3] cursor-pointer shadow-md disabled:opacity-50"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[rgba(238,93,52,0.15)]" />
          <span className="text-[10px] font-mono text-[#bfb7aa] uppercase tracking-widest">
            or register with email
          </span>
          <div className="h-px flex-1 bg-[rgba(238,93,52,0.15)]" />
        </div>

        {errorMsg && (
          <div className="p-3 border border-[rgba(220,100,80,0.5)] bg-[rgba(60,20,20,0.4)] rounded-sm text-xs text-[#ff9999] leading-relaxed">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignupSubmit} className="form-stack space-y-4">
          <label className="block text-xs font-mono text-[#bfb7aa]">
            Your Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Julian Vance"
              className="w-full mt-1 bg-[rgba(14,10,23,0.85)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2.5 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
            />
          </label>
          <label className="block text-xs font-mono text-[#bfb7aa]">
            Email Address
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 bg-[rgba(14,10,23,0.85)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2.5 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
            />
          </label>
          <label className="block text-xs font-mono text-[#bfb7aa]">
            Password
            <input
              required
              minLength={6}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full mt-1 bg-[rgba(14,10,23,0.85)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2.5 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
            />
          </label>

          <button
            disabled={isLoading}
            className="button-primary w-full py-3 cursor-pointer text-xs font-medium disabled:opacity-50"
            type="submit"
          >
            {isLoading ? "Creating celestial vault..." : "Create account ↗"}
          </button>
        </form>

        {submitted && (
          <div className="form-feedback text-xs text-[#ee5d34] p-2 border border-[#ee5d34] bg-[rgba(238,93,52,0.1)] rounded-sm text-center">
            Account created. Navigating to your personal sky...
          </div>
        )}

        <button
          className="button-quiet text-xs text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer block text-center w-full pt-1"
          onClick={() => onNavigate("login")}
        >
          Already a member? Sign in →
        </button>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 2. YOUR ASTROLOGY TIMELINE — ASTROLOGY CALENDAR                           */
/* ========================================================================= */

export function TimelinePage({ onNavigate }: Props) {
  const { liveTransits, user, navigateWithHighlight } = useApp();
  const [timelineView, setTimelineView] = useState<"today" | "7days" | "month" | "shifts" | "hope">("today");
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>("shift-saturn");
  const [aiInquiryResponse, setAiInquiryResponse] = useState<string | null>(null);
  const [isConsultingAI, setIsConsultingAI] = useState(false);

  const handleAskTimelineAI = async (topic: string) => {
    setIsConsultingAI(true);
    try {
      const res = await askAstrologyConsultant(user, liveTransits, topic);
      setAiInquiryResponse(res.text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsConsultingAI(false);
    }
  };

  return (
    <Shell
      eyebrow="02 / Astrology Timeline"
      title="Your astrology calendar & time."
      intro="What is happening today? What happened before? When will the emotional fog lift? All time-related experiences unified in one living calendar."
    >
      {/* Free vs Paid Banner */}
      <div className="flex flex-wrap items-center justify-between p-3 border border-[rgba(238,93,52,0.15)] bg-[rgba(31,24,48,0.7)] rounded-sm mb-6 gap-2">
        <span className="text-xs font-mono text-[#bfb7aa]">
          FREE: Calendar & Moon Shifts · PAID: Deep Transit Interpretations & Hope Timing
        </span>
        <button
          onClick={() => onNavigate("askai")}
          className="text-xs text-[#ee5d34] font-mono hover:underline cursor-pointer"
        >
          Ask AI about current timing →
        </button>
      </div>

      {/* Timeline View Switcher Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[rgba(238,93,52,0.12)] pb-3">
        {[
          { id: "today", label: "Today's Sky Weather" },
          { id: "7days", label: "Next 7 Days" },
          { id: "month", label: "This Month" },
          { id: "shifts", label: "Planetary Shifts & Past Periods" },
          { id: "hope", label: "Hope & Breakthrough Timing" },
        ].map((tab) => {
          const active = timelineView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setTimelineView(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-all cursor-pointer ${
                active
                  ? "bg-[#ee5d34] text-[#0e0a17] font-semibold"
                  : "border border-[rgba(238,93,52,0.12)] text-[#bfb7aa] hover:border-[#ee5d34] hover:text-[#eee5d3]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* VIEW 1: TODAY (DAILY HOROSCOPE & WEATHER) */}
      {timelineView === "today" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.8)] p-6 rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#ee5d34]">Today's Theme</span>
                <span className="text-xs font-mono text-[#bfb7aa]">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              <h2 className="font-serif text-2xl text-[#eee5d3]">
                Moon in {liveTransits.moonPhase?.sign || "Scorpio"} ({liveTransits.moonPhase?.phaseName || "Waxing"})
              </h2>
              <p className="text-xs text-[#bfb7aa] leading-relaxed">
                Today's celestial atmosphere pulls unspoken feelings to the surface.
                Your {user.sunSign} Sun registers a need to step back from overthinking, while the lunar transit asks you to honor what is quietly draining your battery.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => handleAskTimelineAI("Why is today's moon triggering my anxiety or emotional withdrawal?")}
                  className="button-primary cursor-pointer text-xs py-2 px-3"
                >
                  Why? Ask AI →
                </button>
                <button
                  onClick={() => navigateWithHighlight("chart", "Moon")}
                  className="text-xs text-[#ee5d34] hover:text-[#f58a6b] font-mono cursor-pointer"
                >
                  Locate Moon in my chart →
                </button>
              </div>
            </div>

            <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.8)] p-6 rounded-sm space-y-4">
              <span className="text-xs font-mono uppercase text-[#ee5d34]">Active Personal Transits</span>
              <div className="space-y-3">
                <div className="border-l-2 border-[#ee5d34] pl-3">
                  <h4 className="text-sm font-serif text-[#eee5d3]">Venus Transit Influence</h4>
                  <p className="text-xs text-[#bfb7aa] mt-0.5">
                    Influencing an important area of your relational sky. You may feel a pull to revisit an old soft corner or establish a cleaner boundary without guilt.
                  </p>
                </div>
                <div className="border-l-2 border-[#f0c870] pl-3">
                  <h4 className="text-sm font-serif text-[#eee5d3]">Mercury Thought Current</h4>
                  <p className="text-xs text-[#bfb7aa] mt-0.5">
                    Heightened mental vigilance. Notice if you are trying to 'think' your way out of a feeling that simply needs rest.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate("chart")}
                className="text-xs text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
              >
                Inspect my complete natal wheel →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: NEXT 7 DAYS (SHORT-TERM THEMES) */}
      {timelineView === "7days" && (
        <div className="space-y-4">
          <div className="p-4 border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] rounded-sm">
            <span className="text-xs font-mono text-[#ee5d34] uppercase block mb-1">Weekly Forecast</span>
            <h3 className="font-serif text-xl text-[#eee5d3]">Next 7 Days: Releasing Vigilance</h3>
            <p className="text-xs text-[#bfb7aa] mt-1">
              Short-term planetary movement asks you to step out of defense mode. Expect honest conversations in relationships and clearer momentum in work.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { day: "Days 1–2", title: "Emotional Boundary", desc: "Notice where you absorb other people's crises. Step back before exhaustion hits." },
              { day: "Days 3–4", title: "Conversation Window", desc: "Mercury creates clarity. Speak what you've suppressed without guilt." },
              { day: "Days 5–7", title: "Heart Opening", desc: "The tension eases. Space opens for authentic connection and creative drive." },
            ].map((d) => (
              <div key={d.day} className="border border-[rgba(238,93,52,0.1)] p-4 rounded-sm bg-[rgba(20,15,35,0.6)] space-y-2">
                <span className="text-[10px] font-mono text-[#ee5d34] uppercase">{d.day}</span>
                <h4 className="font-serif text-base text-[#eee5d3]">{d.title}</h4>
                <p className="text-xs text-[#bfb7aa] leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: THIS MONTH */}
      {timelineView === "month" && (
        <div className="space-y-4">
          <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 rounded-sm space-y-3">
            <span className="text-xs font-mono text-[#ee5d34] uppercase block">Monthly Architectural Theme</span>
            <h3 className="font-serif text-2xl text-[#eee5d3]">The Shift from Overthinking to Agency</h3>
            <p className="text-xs md:text-sm text-[#bfb7aa] leading-relaxed">
              This month tests your comfort zone. A major shift in the planetary landscape demands that you stop performing invulnerability.
              Old relationship dilemmas are arriving at a definitive threshold.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 border border-[rgba(238,93,52,0.2)] rounded-sm text-[#eee5d3]">
                ✦ New Moon: Clean Slate
              </span>
              <span className="text-xs px-2.5 py-1 border border-[rgba(238,93,52,0.2)] rounded-sm text-[#eee5d3]">
                ✦ Full Moon: Emotional Truth
              </span>
              <span className="text-xs px-2.5 py-1 border border-[rgba(238,93,52,0.2)] rounded-sm text-[#eee5d3]">
                ✦ Venus Ingress: Soft Corners Defined
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: PLANETARY SHIFTS & PAST PERIODS */}
      {timelineView === "shifts" && (
        <div className="space-y-6">
          <div className="p-4 border border-[rgba(238,93,52,0.2)] bg-[rgba(20,15,35,0.8)] rounded-sm">
            <span className="text-xs font-mono text-[#ee5d34] uppercase block mb-1">
              Deep Astrological Archaeology
            </span>
            <h3 className="font-serif text-xl text-[#eee5d3]">
              Why Did That Past Period Hurt So Deeply?
            </h3>
            <p className="text-xs text-[#bfb7aa] mt-1">
              Select a major planetary shift to understand what was happening behind the scenes, why it broke your heart or caused burnout, and how it is resolving now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {TRANSIT_SHIFTS_DATA.map((shift) => (
              <button
                key={shift.id}
                onClick={() => setSelectedShiftId(shift.id)}
                className={`p-4 text-left border rounded-sm transition-all cursor-pointer ${
                  selectedShiftId === shift.id
                    ? "border-[#ee5d34] bg-[rgba(238,93,52,0.12)]"
                    : "border-[rgba(238,93,52,0.1)] bg-[rgba(31,24,48,0.6)] hover:border-[rgba(238,93,52,0.3)]"
                }`}
              >
                <span className="text-xl text-[#ee5d34] block mb-1">{shift.symbol}</span>
                <h4 className="font-serif text-sm text-[#eee5d3] font-semibold">{shift.planet} Shift</h4>
                <p className="text-[11px] text-[#bfb7aa] mt-1 line-clamp-2">{shift.headline}</p>
              </button>
            ))}
          </div>

          {selectedShiftId && (() => {
            const shift = TRANSIT_SHIFTS_DATA.find((s) => s.id === selectedShiftId) || TRANSIT_SHIFTS_DATA[0];
            return (
              <div className="border border-[#ee5d34] bg-[rgba(31,24,48,0.9)] p-6 rounded-sm space-y-5">
                <div>
                  <span className="text-xs font-mono text-[#ee5d34] uppercase">{shift.categoryBadge}</span>
                  <h3 className="font-serif text-2xl text-[#eee5d3] mt-1">{shift.headline}</h3>
                  <p className="text-xs text-[#bfb7aa] mt-1">{shift.timing}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-[rgba(238,93,52,0.15)] p-4 rounded-sm bg-[rgba(20,15,35,0.7)] space-y-2">
                    <span className="text-xs font-mono text-[#ee5d34] uppercase block">
                      1. The Past Phase (Why It Hurt)
                    </span>
                    <p className="text-xs text-[#eee5d3] font-medium">{shift.pastPhase.whatWasHappening}</p>
                    <p className="text-xs text-[#bfb7aa] leading-relaxed">{shift.pastPhase.problemsYouFelt}</p>
                    <p className="text-[11px] text-[#bfb7aa] italic pt-1 border-t border-[rgba(238,93,52,0.1)]">
                      ✦ Root Cause: {shift.pastPhase.whyItFeltHard}
                    </p>
                  </div>

                  <div className="border border-[rgba(238,93,52,0.15)] p-4 rounded-sm bg-[rgba(20,15,35,0.7)] space-y-2">
                    <span className="text-xs font-mono text-[#ee5d34] uppercase block">
                      2. What You Can Expect Next
                    </span>
                    <p className="text-xs text-[#eee5d3] font-medium">{shift.whatToExpectNext.whatYouWillFeel}</p>
                    <ul className="text-xs text-[#bfb7aa] space-y-1">
                      {shift.whatToExpectNext.concreteSigns.map((sign, idx) => (
                        <li key={idx}>✦ {sign}</li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-[#ee5d34] pt-1 border-t border-[rgba(238,93,52,0.1)]">
                      Advice: {shift.whatToExpectNext.adviceForYou}
                    </p>
                  </div>
                </div>

                {/* Deep Emotional & Psychological Inquiries */}
                <div className="p-4 border border-[rgba(238,93,52,0.2)] bg-[rgba(20,15,35,0.85)] rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#ee5d34] uppercase font-semibold">
                      ✦ Unspoken Emotional Inquiries ({shift.planet})
                    </span>
                    <span className="text-[10px] font-mono text-[#bfb7aa]">
                      Free Discovery · Paid Deep Resolution
                    </span>
                  </div>
                  <p className="text-xs text-[#bfb7aa]">
                    Select a core psychological inquiry to understand why this planetary shift triggered your detachment, feelings of loneliness, or recurring overthinking:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      `Why did the ${shift.planet} shift cause me to detach and step back from people?`,
                      `Why do I still have feelings or a soft corner despite betrayal or cheating in this phase?`,
                      `What triggered my anxiety and made me suppress my real voice during this transit?`,
                      `What made me cry in private, and how do I leave my comfort zone to shine again?`,
                    ].map((inquiry, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          localStorage.setItem("astrofindings_pending_inquiry", inquiry);
                          onNavigate("askai");
                        }}
                        className="text-[11px] px-3 py-1.5 border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] text-[#eee5d3] hover:border-[#ee5d34] rounded-sm transition-colors text-left cursor-pointer"
                      >
                        ✦ {inquiry}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                  <button
                    onClick={() => handleAskTimelineAI(`Explain in detail how the ${shift.planet} shift affects my specific natal placements, my tendency to overthink, and my relationship timing.`)}
                    className="button-primary cursor-pointer text-xs py-2 px-3"
                  >
                    Ask AI to analyze this shift for my chart →
                  </button>
                  <button
                    onClick={() => navigateWithHighlight("chart", shift.planet)}
                    className="text-xs text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
                  >
                    Locate {shift.planet} in my birth sky →
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW 5: HOPE & BREAKTHROUGH TIMING */}
      {timelineView === "hope" && (
        <div className="space-y-6">
          <div className="border border-[rgba(238,93,52,0.25)] bg-[rgba(31,24,48,0.85)] p-6 rounded-sm space-y-4">
            <span className="text-xs font-mono text-[#ee5d34] uppercase block">
              ✦ Hope, Healing & The Clearing of the Fog
            </span>
            <h3 className="font-serif text-2xl text-[#eee5d3]">
              When Will the Emotional Heaviness Lift?
            </h3>
            <p className="text-xs md:text-sm text-[#bfb7aa] leading-relaxed">
              Astrology is not endless endurance. Every harsh transit has an exact expiration date.
              The coming planetary windows indicate a decisive release of the emotional baggage, lonely sleepless nights, and suppressed grief you have been carrying:
            </p>

            {/* Free Discovery Windows */}
            <div className="space-y-3 pt-2">
              <div className="p-4 border border-[rgba(100,180,100,0.25)] bg-[rgba(20,40,25,0.4)] rounded-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[rgba(140,210,140,1)] uppercase">
                    Window 1: The Relief of Silence
                  </span>
                  <span className="text-[9px] font-mono text-[rgba(140,210,140,0.8)] border border-[rgba(140,210,140,0.3)] px-1.5 py-0.2 rounded-sm">
                    FREE DISCOVERY
                  </span>
                </div>
                <h4 className="font-serif text-base text-[#eee5d3]">Letting Go of Unspoken Guilt & Anxiety</h4>
                <p className="text-xs text-[#bfb7aa] leading-relaxed">
                  As the Moon shifts into a harmonious trine with your natal placements, the urge to constantly overthink and explain yourself subsides. You will realize that you do not need their validation to heal, and stepping back into your own space is not abandonment—it is survival.
                </p>
              </div>

              <div className="p-4 border border-[rgba(238,93,52,0.25)] bg-[rgba(50,25,35,0.4)] rounded-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#ee5d34] uppercase">
                    Window 2: Relational Truth & Soft Corners
                  </span>
                  <span className="text-[9px] font-mono text-[#ee5d34] border border-[rgba(238,93,52,0.3)] px-1.5 py-0.2 rounded-sm">
                    FREE DISCOVERY
                  </span>
                </div>
                <h4 className="font-serif text-base text-[#eee5d3]">Clarity in Love, Cheating Doubts & Heartbreak</h4>
                <p className="text-xs text-[#bfb7aa] leading-relaxed">
                  The planetary cycle that caused confusion in your 7th House completes. You will finally understand why you maintained a soft corner even after betrayal, what it taught you about your own vulnerability, and how to open your heart again without terror.
                </p>
              </div>

              <div className="p-4 border border-[rgba(200,160,80,0.25)] bg-[rgba(45,35,20,0.4)] rounded-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#f0c870] uppercase">
                    Window 3: Stepping Into What Makes You Shine
                  </span>
                  <span className="text-[9px] font-mono text-[#f0c870] border border-[rgba(200,160,80,0.3)] px-1.5 py-0.2 rounded-sm">
                    FREE DISCOVERY
                  </span>
                </div>
                <h4 className="font-serif text-base text-[#eee5d3]">Emerging From Your Comfort Zone Trap</h4>
                <p className="text-xs text-[#bfb7aa] leading-relaxed">
                  Mars and Sun synchronize with your Midheaven. Your real voice breaks through the old container. You stop suppressing yourself to keep others comfortable, and energy returns to your career and ambition.
                </p>
              </div>
            </div>

            {/* COMPETITOR-STYLE PAID PAYWALL HOOK (The Pattern / Nebula / Co-Star style curiosity & suspense) */}
            <div className="mt-6 border-2 border-dashed border-[rgba(238,93,52,0.4)] bg-[linear-gradient(135deg,rgba(31,24,48,0.95),rgba(20,15,35,0.98))] p-6 rounded-sm space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-[radial-gradient(circle,rgba(238,93,52,0.15),transparent_70%)] pointer-events-none" />
              
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#ee5d34]">🔒</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ee5d34] font-semibold">
                    PREMIUM BREAKTHROUGH DOSSIER · EXACT RESOLUTION TIMING
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#ee5d34] text-[#0e0a17] font-semibold rounded-sm">
                  PAID ACCESS ONLY
                </span>
              </div>

              <div>
                <h4 className="font-serif text-xl md:text-2xl text-[#eee5d3]">
                  Unlock the Exact Day the Fog Lifts & The Conversation Script
                </h4>
                <p className="text-xs text-[#bfb7aa] mt-1.5 leading-relaxed">
                  Free reveals the diagnostic sky weather. Premium reveals the <strong>exact dates, the psychological levers, and what they secretly feel</strong> according to synastric transits so you never walk in the dark again:
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 pt-1">
                <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(14,10,23,0.7)] p-3 rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-[#ee5d34]">✦ 01 / Exact Peak Dates</span>
                  <p className="text-xs text-[#eee5d3] font-medium">Exact Calendar Day & Degree</p>
                  <p className="text-[11px] text-[#bfb7aa] blur-[3px] select-none">
                    Transit peaks on October 14th at 18° Aries, ending your 14-month cycle of silence.
                  </p>
                </div>
                <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(14,10,23,0.7)] p-3 rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-[#ee5d34]">✦ 02 / The Hard Script</span>
                  <p className="text-xs text-[#eee5d3] font-medium">What to Say Without Guilt</p>
                  <p className="text-[11px] text-[#bfb7aa] blur-[3px] select-none">
                    "I can hold a soft corner for who you were while refusing to allow who you are now to hurt me."
                  </p>
                </div>
                <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(14,10,23,0.7)] p-3 rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-[#ee5d34]">✦ 03 / Their Hidden Reaction</span>
                  <p className="text-xs text-[#eee5d3] font-medium">Placements & Planetary Intent</p>
                  <p className="text-[11px] text-[#bfb7aa] blur-[3px] select-none">
                    Their Saturn return triggers remorse when you stop initiating, forcing genuine accountability.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onNavigate("reading")}
                  className="w-full sm:w-auto py-3 px-6 bg-[#ee5d34] text-[#0e0a17] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#f58a6b] transition-all rounded-sm cursor-pointer shadow-lg"
                >
                  Unlock Complete Breakthrough Dossier →
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem("astrofindings_pending_inquiry", "When will the emotional fog lift in my life, why do I still have a soft corner for them, and what is the exact breakthrough window coming for my birth chart?");
                    onNavigate("askai");
                  }}
                  className="text-xs text-[#bfb7aa] hover:text-[#eee5d3] font-mono cursor-pointer"
                >
                  Ask AstroFindings AI About This Window →
                </button>
              </div>
            </div>

            <button
              onClick={() => handleAskTimelineAI("When will the emotional fog lift in my life and where is my biggest breakthrough window coming?")}
              className="button-primary cursor-pointer text-xs py-2.5 px-4 mt-3"
            >
              Consult AI on My Personal Breakthrough Timing →
            </button>
          </div>
        </div>
      )}

      {/* AI Consultation Feedback Box */}
      {isConsultingAI && (
        <div className="p-4 border border-[#ee5d34] bg-[rgba(31,24,48,0.95)] rounded-sm text-xs text-[#ee5d34] font-mono animate-pulse mt-6">
          ✦ Consulting your whole-sign chart against live transits...
        </div>
      )}

      {aiInquiryResponse && (
        <div className="border border-[#ee5d34] bg-[rgba(20,15,35,0.95)] p-6 rounded-sm space-y-3 mt-6">
          <div className="flex items-center justify-between border-b border-[rgba(238,93,52,0.15)] pb-2">
            <span className="text-xs font-mono uppercase text-[#ee5d34] font-semibold">
              ✦ Personal Timing Synthesis
            </span>
            <button
              onClick={() => setAiInquiryResponse(null)}
              className="text-xs text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
          <p className="text-xs text-[#eee5d3] leading-relaxed whitespace-pre-line">
            {aiInquiryResponse}
          </p>
        </div>
      )}
    </Shell>
  );
}

/* ========================================================================= */
/* 3. RELATIONSHIPS — COMPATIBILITY & BONDS                                  */
/* ========================================================================= */

export function RelationshipsPage({ onNavigate }: Props) {
  const { people, addPerson, deletePerson, user, navigateWithHighlight, liveTransits } = useApp();
  const [name, setName] = useState("");
  const [relationType, setRelationType] = useState<"Partner" | "Friend" | "Family" | "Crush">("Partner");
  const [birthDate, setBirthDate] = useState("1995-05-15");
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [synastryAIQuery, setSynastryAIQuery] = useState("");
  const [synastryAIResponse, setSynastryAIResponse] = useState<string | null>(null);
  const [isConsultingSynastry, setIsConsultingSynastry] = useState(false);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    await addPerson({
      name: cleanName,
      relationship: relationType,
      birthDate,
      birthTime: "12:00",
      birthLocation: "New York, NY",
      sunSign: "Taurus",
      moonSign: "Virgo",
      risingSign: "Cancer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",
      notes: "Saved bond in your private circle",
    });
    setName("");
  };

  const selectedPerson = people.find((p) => p.id === selectedPersonId) || (people.length > 0 ? people[0] : null);
  const compatibility = selectedPerson ? calculateCompatibility(user, selectedPerson) : null;

  const handleConsultBondAI = async (customQ?: string) => {
    if (!selectedPerson) return;
    const q = customQ || synastryAIQuery || `Why do ${user.name} and ${selectedPerson.name} connect this way and where do our defense mechanisms clash?`;
    setIsConsultingSynastry(true);
    try {
      const reading = await getPersonalizedAstrologyReading({
        user,
        question: q,
        liveTransits,
        optionalSecondPerson: selectedPerson,
      });
      const fullText =
        reading.sections.length > 0
          ? reading.sections.map((s) => `${s.title}\n${s.text}`).join("\n\n")
          : reading.summary;
      setSynastryAIResponse(fullText);
    } catch (e) {
      console.error(e);
    } finally {
      setIsConsultingSynastry(false);
    }
  };

  return (
    <Shell
      eyebrow="04 / Bonds & Synastry"
      title="Relationships, without the horoscope clichés."
      intro="Why do you still hold a soft corner for them? Why does communication trigger detachment? Compare two charts as an authentic psychological dialogue."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Person Card */}
        <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 rounded-sm space-y-4">
          <span className="text-xs font-mono uppercase text-[#ee5d34]">Create Bond Dossier</span>
          <h2 className="font-serif text-2xl text-[#eee5d3]">Add a Person</h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Their name"
              required
              className="w-full bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-3 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={relationType}
                onChange={(e) => setRelationType(e.target.value as any)}
                className="bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-2 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
              >
                <option value="Partner">Partner</option>
                <option value="Friend">Friend</option>
                <option value="Family">Family</option>
                <option value="Crush">Crush</option>
              </select>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-[rgba(14,10,23,0.8)] border border-[rgba(238,93,52,0.3)] rounded-sm px-2 py-2 text-xs text-[#eee5d3] focus:outline-none focus:border-[#ee5d34] [color-scheme:dark]"
              />
            </div>
            <button className="button-primary cursor-pointer w-full py-2.5 text-xs font-medium" type="submit">
              Calculate Synastry Dossier →
            </button>
          </form>
        </div>

        {/* Psychological Synastry Principles */}
        <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] p-6 rounded-sm space-y-3">
          <span className="text-xs font-mono uppercase text-[#ee5d34]">What We Interrogate</span>
          <ul className="text-xs text-[#bfb7aa] space-y-2">
            <li>✦ <strong>The Ice Wall vs Anxiety:</strong> How your emotional withdrawal triggers their fear, and vice versa.</li>
            <li>✦ <strong>Soft Corners:</strong> Why you still have feelings despite boundary breaches or heartbreak.</li>
            <li>✦ <strong>Attraction & Dialogue:</strong> Venus & Mars chemistry versus Mercury communication blocks.</li>
            <li>✦ <strong>Timing of the Shift:</strong> Why this bond feels different right now in current transits.</li>
          </ul>
        </div>
      </div>

      {/* Saved Bonds List */}
      <div className="mt-8 mb-6">
        <span className="text-xs font-mono uppercase text-[#ee5d34] tracking-wider block mb-3">
          Saved Bonds ({people.length})
        </span>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {people.map((p) => {
            const isSelected = selectedPerson?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPersonId(p.id)}
                className={`border p-4 rounded-sm transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#ee5d34] bg-[rgba(238,93,52,0.12)]"
                    : "border-[rgba(238,93,52,0.1)] bg-[rgba(31,24,48,0.6)] hover:border-[rgba(238,93,52,0.3)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-base text-[#eee5d3]">{p.name}</h3>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-[rgba(238,93,52,0.15)] text-[#ee5d34] rounded-sm">
                      {p.relationship}
                    </span>
                  </div>
                  <p className="text-xs text-[#bfb7aa]">☉ {p.sunSign} · ☽ {p.moonSign}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-[rgba(238,93,52,0.08)]">
                  <span className="text-xs text-[#ee5d34]">View synastry →</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePerson(p.id);
                    }}
                    className="text-xs text-[#bfb7aa] hover:text-[rgba(220,100,80,1)]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Synastry Analysis Detail Card */}
      {selectedPerson && compatibility && (
        <div className="border border-[rgba(238,93,52,0.25)] bg-[rgba(31,24,48,0.85)] p-6 rounded-sm mb-6 space-y-5">
          <div className="flex items-baseline justify-between border-b border-[rgba(238,93,52,0.1)] pb-3">
            <div>
              <h3 className="font-serif text-2xl text-[#eee5d3]">
                {user.name} & {selectedPerson.name}
              </h3>
              <p className="text-xs text-[#bfb7aa]">
                {user.sunSign} Sun / {user.moonSign} Moon × {selectedPerson.sunSign} Sun / {selectedPerson.moonSign} Moon
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-serif text-[#ee5d34]">{compatibility.overallScore}%</span>
              <span className="block text-[10px] font-mono text-[#bfb7aa] uppercase">Harmony index</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center py-2">
            <div className="border border-[rgba(238,93,52,0.1)] p-2.5 rounded-sm bg-[rgba(20,15,35,0.6)]">
              <span className="text-xs text-[#bfb7aa] block">Emotional</span>
              <strong className="text-base text-[#eee5d3]">{compatibility.emotionalScore}%</strong>
            </div>
            <div className="border border-[rgba(238,93,52,0.1)] p-2.5 rounded-sm bg-[rgba(20,15,35,0.6)]">
              <span className="text-xs text-[#bfb7aa] block">Dialogue</span>
              <strong className="text-base text-[#eee5d3]">{compatibility.communicationScore}%</strong>
            </div>
            <div className="border border-[rgba(238,93,52,0.1)] p-2.5 rounded-sm bg-[rgba(20,15,35,0.6)]">
              <span className="text-xs text-[#bfb7aa] block">Passion</span>
              <strong className="text-base text-[#eee5d3]">{compatibility.passionScore}%</strong>
            </div>
            <div className="border border-[rgba(238,93,52,0.1)] p-2.5 rounded-sm bg-[rgba(20,15,35,0.6)]">
              <span className="text-xs text-[#bfb7aa] block">Long-Term</span>
              <strong className="text-base text-[#eee5d3]">{compatibility.longTermScore}%</strong>
            </div>
          </div>

          {/* Deep Psychological Prompts */}
          <div className="p-4 border border-[rgba(238,93,52,0.15)] bg-[rgba(20,15,35,0.7)] rounded-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#ee5d34] block">
                ✦ Unspoken Synastry Inquiries (Click to Consult AI)
              </span>
              <span className="text-[10px] font-mono text-[#bfb7aa]">
                Grounded in Both Natal Wheels
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                `Why do I still have feelings and a soft corner for ${selectedPerson.name}?`,
                `What might ${selectedPerson.name} feel about me according to their placements?`,
                `What triggers our heartbreak or fears of betrayal and cheating?`,
                `What do they do which makes me cry, and why do I suppress myself?`,
                `Why did our dynamic cause me to detach and step back into loneliness?`,
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setSynastryAIQuery(q);
                    handleConsultBondAI(q);
                  }}
                  className="text-xs px-2.5 py-1.5 border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] text-[#eee5d3] hover:border-[#ee5d34] rounded-sm cursor-pointer text-left"
                >
                  ✦ {q}
                </button>
              ))}
            </div>

            {/* Competitor Synastric Paywall Teaser */}
            <div className="mt-4 p-4 border border-dashed border-[rgba(238,93,52,0.35)] bg-[rgba(14,10,23,0.85)] rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] font-semibold">
                  🔒 Premium Synastry Dossier · What They Secretly Feel
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#ee5d34] text-[#0e0a17] font-semibold rounded-sm">
                  PAID ACCESS
                </span>
              </div>
              <p className="text-xs text-[#bfb7aa] leading-relaxed">
                Free reveals basic harmony scores. Premium reveals <strong>what {selectedPerson.name} actually feels about you according to their planetary placements, why they act distant, and the script for honest conversation:</strong>
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-left pt-1">
                <div className="p-2 border border-[rgba(238,93,52,0.12)] rounded-sm bg-[rgba(31,24,48,0.6)]">
                  <span className="text-[10px] font-mono text-[#ee5d34] block">✦ What They Secretly Feel</span>
                  <p className="text-[11px] text-[#bfb7aa] blur-[3px] select-none mt-0.5">
                    Their Venus in Leo craves your admiration, but their Saturn square causes cold emotional withdrawal.
                  </p>
                </div>
                <div className="p-2 border border-[rgba(238,93,52,0.12)] rounded-sm bg-[rgba(31,24,48,0.6)]">
                  <span className="text-[10px] font-mono text-[#ee5d34] block">✦ The Healing Script</span>
                  <p className="text-[11px] text-[#bfb7aa] blur-[3px] select-none mt-0.5">
                    "I am stepping back not out of anger, but because I deserve the same emotional safety I offer you."
                  </p>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => onNavigate("reading")}
                  className="button-primary cursor-pointer text-xs py-2 px-4"
                >
                  Unlock Full Synastric Dossier ($19) →
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "astrofindings_pending_inquiry",
                      `Deep Synastry: What does ${selectedPerson.name} feel about me according to our placements, why do I still have feelings or a soft corner for them, and how do we resolve this emotional tension?`
                    );
                    onNavigate("askai");
                  }}
                  className="text-xs text-[#ee5d34] hover:underline font-mono cursor-pointer"
                >
                  Consult AI on This Bond →
                </button>
              </div>
            </div>

            {isConsultingSynastry && (
              <div className="text-xs font-mono text-[#ee5d34] animate-pulse pt-2">
                Consulting synastry ephemeris between your two charts...
              </div>
            )}

            {synastryAIResponse && (
              <div className="p-4 border border-[#ee5d34] bg-[rgba(14,10,23,0.9)] rounded-sm text-xs text-[#eee5d3] leading-relaxed whitespace-pre-line mt-3">
                <div className="flex items-center justify-between border-b border-[rgba(238,93,52,0.15)] pb-1 mb-2">
                  <span className="font-mono text-[#ee5d34] uppercase text-[10px]">
                    ✦ Synastry AI Consultation
                  </span>
                  <button
                    onClick={() => setSynastryAIResponse(null)}
                    className="text-[10px] text-[#bfb7aa] hover:text-[#eee5d3]"
                  >
                    ✕ Close
                  </button>
                </div>
                {synastryAIResponse}
              </div>
            )}
          </div>
        </div>
      )}
    </Shell>
  );
}



/* ========================================================================= */
/* 5. WELLNESS / SPIRITUAL — AFFIRMATIONS, MEDITATION & PRACTICES           */
/* ========================================================================= */

export function WellnessPage({ onNavigate }: Props) {
  const { user } = useApp();
  const [wellnessTab, setWellnessTab] = useState<"affirmations" | "meditations" | "rituals">("affirmations");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  const affirmations = AFFIRMATIONS_DATA.filter(
    (a) => selectedCategory === "all" || a.category === selectedCategory
  );

  return (
    <Shell
      eyebrow="06 / Wellness & Grounding"
      title="Spiritual practices for emotional regulation."
      intro="What can you do with these feelings? Daily affirmations, somatic meditations, and rituals to ease anxiety, heal heartbreak, and step out of your comfort zone."
    >
      {/* Sub Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[rgba(238,93,52,0.12)] pb-3">
        {[
          { id: "affirmations", label: "Affirmations (No Guilt)" },
          { id: "meditations", label: "Grounding Soundscapes" },
          { id: "rituals", label: "Daily Lunar Rituals" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setWellnessTab(t.id as any)}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
              wellnessTab === t.id
                ? "bg-[#ee5d34] text-[#0e0a17] font-semibold"
                : "border border-[rgba(238,93,52,0.12)] text-[#bfb7aa] hover:border-[#ee5d34] hover:text-[#eee5d3]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. AFFIRMATIONS */}
      {wellnessTab === "affirmations" && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-1.5">
            {["all", "daily", "healing", "courage", "love", "career"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-sm uppercase font-mono transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#ee5d34] text-[#0e0a17] font-medium"
                    : "border border-[rgba(238,93,52,0.15)] text-[#bfb7aa] hover:text-[#eee5d3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {affirmations.map((a) => (
              <div
                key={a.id}
                className="border border-[rgba(238,93,52,0.15)] bg-[rgba(31,24,48,0.7)] p-5 rounded-sm space-y-3"
              >
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] block">
                  ✦ {a.category} · Focus: {a.focusPlanet}
                </span>
                <p className="font-serif text-base text-[#eee5d3] leading-snug">“{a.text}”</p>
                <p className="text-xs text-[#bfb7aa] leading-relaxed pt-2 border-t border-[rgba(238,93,52,0.08)]">
                  {a.insightContext}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. MEDITATIONS & SOUNDSCAPES */}
      {wellnessTab === "meditations" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { id: "s-1", title: "Easing Nervous System Overwhelm", duration: "8 min", freq: "432 Hz", desc: "Designed for when racing thoughts, anxiety, or overthinking push you into emotional numbness." },
              { id: "s-2", title: "Releasing the Soft Corner", duration: "12 min", freq: "528 Hz", desc: "For healing heartbreak and letting go of guilt over why you still care for someone who hurt you." },
              { id: "s-3", title: "Stepping Out of the Comfort Zone", duration: "10 min", freq: "639 Hz", desc: "Grounding vitality to reconnect with what makes you shine without fear of judgment." },
              { id: "s-4", title: "Deep Somatic Sanctuary", duration: "15 min", freq: "396 Hz", desc: "When carrying everyone else's weight makes you feel completely alone in the dark." },
            ].map((track) => {
              const playing = isPlayingAudio === track.id;
              return (
                <div key={track.id} className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.8)] p-5 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#ee5d34]">{track.freq}</span>
                    <span className="text-xs font-mono text-[#bfb7aa]">{track.duration}</span>
                  </div>
                  <h4 className="font-serif text-lg text-[#eee5d3]">{track.title}</h4>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">{track.desc}</p>
                  <button
                    onClick={() => setIsPlayingAudio(playing ? null : track.id)}
                    className="button-primary cursor-pointer text-xs py-1.5 px-3 w-full"
                  >
                    {playing ? "⏸ Pause Audio" : "▶ Play Grounding Frequency"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. RITUALS */}
      {wellnessTab === "rituals" && (
        <div className="space-y-4">
          <div className="border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.8)] p-6 rounded-sm space-y-4">
            <span className="text-xs font-mono uppercase text-[#ee5d34] block">Current Celestial Practice</span>
            <h3 className="font-serif text-xl text-[#eee5d3]">The Unspoken Cord Cut</h3>
            <p className="text-xs text-[#bfb7aa] leading-relaxed">
              When someone lingers in your mental space long after the relationship ended, your energy remains depleted.
              Tonight, take five minutes in total darkness: write down what they did that made you cry, acknowledge that holding a soft corner does not require you to contact them, and destroy the paper without guilt.
            </p>
            <button onClick={() => onNavigate("askai")} className="button-quiet cursor-pointer text-xs">
              Ask AI for a personalized ritual for your chart →
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ========================================================================= */
/* 6. PALM READING AI                                                        */
/* ========================================================================= */

export function PalmReadingPage({ onNavigate }: Props) {
  const { user } = useApp();
  const [analyzedLine, setAnalyzedLine] = useState<"heart" | "head" | "life">("heart");

  return (
    <Shell
      eyebrow="07 / Somatic Divination"
      title="Palm reading AI & line analysis."
      intro="Learn what palm lines are → see your palm → understand your own lines. Somatic patterns revealing heartbreak, overthinking, and comfort zones."
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Palm Visualizer Card */}
        <div className="border border-[rgba(238,93,52,0.25)] bg-[rgba(20,15,35,0.8)] p-6 rounded-sm text-center space-y-4">
          <span className="text-xs font-mono uppercase text-[#ee5d34]">Somatic Mirror</span>
          <div className="w-56 h-64 mx-auto border-2 border-dashed border-[rgba(238,93,52,0.3)] rounded-sm flex flex-col items-center justify-center p-4 relative">
            <span className="text-6xl text-[#ee5d34] opacity-80 mb-2">✋</span>
            <span className="text-[11px] font-mono text-[#bfb7aa]">Active Line: {analyzedLine.toUpperCase()} LINE</span>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a17] via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="flex justify-center gap-2">
            {[
              { id: "heart", label: "Heart Line" },
              { id: "head", label: "Head Line" },
              { id: "life", label: "Life Line" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setAnalyzedLine(l.id as any)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                  analyzedLine === l.id
                    ? "bg-[#ee5d34] text-[#0e0a17] font-semibold"
                    : "border border-[rgba(238,93,52,0.15)] text-[#bfb7aa] hover:border-[#ee5d34]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line Psychological Interpretation */}
        <div className="border border-[rgba(238,93,52,0.25)] bg-[rgba(31,24,48,0.85)] p-6 rounded-sm space-y-4">
          {analyzedLine === "heart" && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#ee5d34] uppercase">Heart Line: The Relational Valve</span>
              <h3 className="font-serif text-2xl text-[#eee5d3]">Heartbreak, Detachment & Soft Corners</h3>
              <p className="text-xs text-[#bfb7aa] leading-relaxed">
                Your heart line indicates how your nervous system responds to emotional injury.
                A deep curve shows a person who loves with intense loyalty, frequently keeping an unspoken soft corner for those who betrayed them.
                When overwhelmed, your defense mechanism is to step back into complete silence.
              </p>
            </div>
          )}

          {analyzedLine === "head" && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#ee5d34] uppercase">Head Line: The Thought Machine</span>
              <h3 className="font-serif text-2xl text-[#eee5d3]">Overthinking & Cognitive Vigilance</h3>
              <p className="text-xs text-[#bfb7aa] leading-relaxed">
                Your head line reflects mental bandwidth. Sloping gently downward, it signals high emotional intuition coupled with an exhaustion-inducing tendency to over-analyze every micro-reaction from other people.
              </p>
            </div>
          )}

          {analyzedLine === "life" && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#ee5d34] uppercase">Life Line: Grounding & Vitality</span>
              <h3 className="font-serif text-2xl text-[#eee5d3]">Comfort Zone & Sovereign Power</h3>
              <p className="text-xs text-[#bfb7aa] leading-relaxed">
                This line doesn't measure lifespan — it measures your grounded presence. It reveals when you are hiding inside your safe comfort zone versus when you have the vitality to step out and truly shine.
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => onNavigate("askai")}
              className="button-primary cursor-pointer text-xs py-2.5 px-4 w-full"
            >
              Consult AI on My Complete Somatic Pattern →
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ========================================================================= */
/* 7. ASK ASTROFINDINGS — CELESTIAL CONSULTATION & INSCRIPTION DOSSIER       */
/* ========================================================================= */

export function AskAIPage({ onNavigate }: Props) {
  const { user, liveTransits } = useApp();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [copied, setCopied] = useState(false);

  // Engine Settings State
  const [showEngineModal, setShowEngineModal] = useState(false);
  const [settings, setSettings] = useState<AISettings>(() => getAISettings());
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [engineSavedNotice, setEngineSavedNotice] = useState(false);

  const diagnosticInquiries = [
    {
      title: "Emotional Detachment",
      prompt: "Why do I detach, withdraw my energy, and step back into total silence when emotionally overwhelmed?",
      glyph: "☽",
    },
    {
      title: "The Soft Corner & Betrayal",
      prompt: "Why do I still hold a soft corner for someone who hurt or betrayed me, and what placement causes this guilt?",
      glyph: "♀",
    },
    {
      title: "Overthinking & Solitude",
      prompt: "What astrological aspects trigger my midnight overthinking and make me feel completely alone even around people?",
      glyph: "☿",
    },
    {
      title: "Suppression vs. True Shine",
      prompt: "Where in my natal houses am I suppressing myself to stay safe in my comfort zone, and what will make me truly shine?",
      glyph: "☉",
    },
    {
      title: "Current Sky & Threshold Timing",
      prompt: "Based on today's planetary transits and retrogrades, what karmic cycle or relationship shift am I navigating right now?",
      glyph: "♄",
    },
  ];

  const handleConsult = async (qText?: string) => {
    const textToSubmit = (qText || question).trim();
    if (!textToSubmit) return;
    setIsLoading(true);
    try {
      const res = await askAstrologyConsultant(user, liveTransits, textToSubmit);
      setResponse(res);
    } catch (e) {
      console.error("Consultation error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const pending = localStorage.getItem("astrofindings_pending_inquiry");
      if (pending) {
        localStorage.removeItem("astrofindings_pending_inquiry");
        setQuestion(pending);
        handleConsult(pending);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveSettings = () => {
    saveAISettings(settings);
    setEngineSavedNotice(true);
    setTimeout(() => {
      setEngineSavedNotice(false);
      setShowEngineModal(false);
    }, 1200);
  };

  const handleCopyDossier = () => {
    if (!response) return;
    const textToCopy = `ASTROFINDINGS CONSULTATION DOSSIER\nSubject: ${user.name || "Sovereign Inquirer"}\nNatal Coordinates: Sun in ${user.sunSign}, Moon in ${user.moonSign}, Rising in ${user.risingSign}\nInquiry: ${question}\nEngine: ${response.engineUsed}\n\n${response.text}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Shell
      eyebrow="03 / Astrological Consultation & Inscription"
      title="Ask AstroFindings."
      intro="A chart-grounded astrological salon. Not an automated chatbot, but an epistolary dossier synthesized by cross-examining your exact natal coordinates against current planetary transits."
    >
      {/* 1. STUDIED NATAL COORDINATES BANNER */}
      <div className="border border-[rgba(238,93,52,0.22)] bg-[radial-gradient(ellipse_at_top,rgba(31,24,48,0.95),rgba(14,10,23,0.98))] p-5 rounded-sm mb-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(238,93,52,0.12)] pb-4 mb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#ee5d34] block">
              ✦ Studied Natal Coordinates Anchored to Your Inquiry
            </span>
            <h3 className="font-serif text-lg text-[#eee5d3]">
              {user.name || "Natal Blueprint"} · Born {user.birthDate || "Configured in Profile"}
            </h3>
          </div>

          {/* Active Engine Badge & Switcher */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <span className="text-[9px] font-mono text-[#bfb7aa] uppercase block">Active Synthesis Engine</span>
              <span className="text-xs font-mono text-[#d4af37]">
                {settings.provider === "builtin" && "Free Built-in Ephemeris"}
                {settings.provider === "groq" && "Groq Cloud (Free Llama 3.3)"}
                {settings.provider === "gemini" && "Google Gemini (Free Tier)"}
                {settings.provider === "openrouter" && "OpenRouter"}
                {settings.provider === "openai" && "OpenAI Engine"}
              </span>
            </div>
            <button
              onClick={() => setShowEngineModal(true)}
              className="px-3 py-1.5 border border-[rgba(238,93,52,0.3)] bg-[rgba(238,93,52,0.08)] hover:bg-[rgba(238,93,52,0.18)] text-[#eee5d3] text-xs font-mono rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>⚙</span>
              <span>Configure Engine & API</span>
            </button>
          </div>
        </div>

        {/* Coordinate Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 border border-[rgba(238,93,52,0.1)] bg-[rgba(20,15,35,0.6)] rounded-sm">
            <span className="text-[10px] font-mono text-[#ee5d34] block uppercase">☉ Sun Luminary</span>
            <div className="font-serif text-sm text-[#eee5d3] font-medium">{user.sunSign}</div>
            <span className="text-[10px] text-[#bfb7aa] block">
              {user.sunHouse ? `House ${user.sunHouse} · Conscious Will` : "Vital Purpose"}
            </span>
          </div>

          <div className="p-3 border border-[rgba(238,93,52,0.1)] bg-[rgba(20,15,35,0.6)] rounded-sm">
            <span className="text-[10px] font-mono text-[#ee5d34] block uppercase">☽ Moon Core</span>
            <div className="font-serif text-sm text-[#eee5d3] font-medium">{user.moonSign}</div>
            <span className="text-[10px] text-[#bfb7aa] block">
              {user.moonHouse ? `House ${user.moonHouse} · Instinct & Care` : "Subconscious Depths"}
            </span>
          </div>

          <div className="p-3 border border-[rgba(238,93,52,0.1)] bg-[rgba(20,15,35,0.6)] rounded-sm">
            <span className="text-[10px] font-mono text-[#ee5d34] block uppercase">↑ Ascendant</span>
            <div className="font-serif text-sm text-[#eee5d3] font-medium">{user.risingSign}</div>
            <span className="text-[10px] text-[#bfb7aa] block">Sovereign Facade & Mask</span>
          </div>

          <div className="p-3 border border-[rgba(238,93,52,0.1)] bg-[rgba(20,15,35,0.6)] rounded-sm">
            <span className="text-[10px] font-mono text-[#d4af37] block uppercase">☿ Active Transits</span>
            <div className="font-serif text-sm text-[#eee5d3] font-medium truncate">
              {liveTransits.sunSign} Sun · {liveTransits.moonSign} Moon
            </div>
            <span className="text-[10px] text-[#bfb7aa] block truncate">
              {liveTransits.retrogrades.length} Retrograde(s)
            </span>
          </div>
        </div>
      </div>

      {/* 2. ENGINE & API CONFIGURATION MODAL / DRAWER */}
      {showEngineModal && (
        <div className="fixed inset-0 z-50 bg-[rgba(10,8,16,0.85)] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140f23] border border-[#ee5d34] rounded-sm max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[rgba(238,93,52,0.2)] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] tracking-wider block">
                  AstroFindings Intelligence System
                </span>
                <h3 className="font-serif text-xl text-[#eee5d3]">Astrological Engine & API Provider</h3>
              </div>
              <button
                onClick={() => setShowEngineModal(false)}
                className="text-[#bfb7aa] hover:text-[#eee5d3] text-lg font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-[#bfb7aa] leading-relaxed">
              Choose between the free offline Ephemeris engine or plug in your personal API key (Groq, Gemini, OpenAI, OpenRouter) to unlock limitless deep psychological synthesis.
            </div>

            {/* Provider Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#eee5d3] block uppercase">Select Calculation Engine</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "builtin", name: "Free Built-in Engine", desc: "100% Free · No API key needed" },
                  { id: "groq", name: "Groq Cloud (Free)", desc: "Free key at console.groq.com" },
                  { id: "gemini", name: "Google Gemini (Free)", desc: "Free tier at aistudio.google.com" },
                  { id: "openrouter", name: "OpenRouter", desc: "Multi-model gateway" },
                  { id: "openai", name: "OpenAI", desc: "GPT-4o / GPT-4o-mini" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        provider: p.id as any,
                        model:
                          p.id === "groq"
                            ? "llama-3.3-70b-versatile"
                            : p.id === "gemini"
                            ? "gemini-1.5-flash"
                            : p.id === "openai"
                            ? "gpt-4o-mini"
                            : prev.model,
                      }))
                    }
                    className={`p-2.5 text-left rounded-sm border transition-all cursor-pointer ${
                      settings.provider === p.id
                        ? "border-[#ee5d34] bg-[rgba(238,93,52,0.15)] text-[#eee5d3]"
                        : "border-[rgba(238,93,52,0.15)] bg-[rgba(31,24,48,0.5)] text-[#bfb7aa] hover:border-[#ee5d34]"
                    }`}
                  >
                    <div className="text-xs font-serif font-medium text-[#eee5d3]">{p.name}</div>
                    <div className="text-[10px] text-[#bfb7aa] mt-0.5">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* API Key Input (if not builtin) */}
            {settings.provider !== "builtin" && (
              <div className="space-y-2 pt-2 border-t border-[rgba(238,93,52,0.1)]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-[#eee5d3] uppercase">
                    {settings.provider.toUpperCase()} API Key
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowKeyInput(!showKeyInput)}
                    className="text-[10px] font-mono text-[#ee5d34] hover:underline"
                  >
                    {showKeyInput ? "Hide Key" : "Show Key"}
                  </button>
                </div>
                <input
                  type={showKeyInput ? "text" : "password"}
                  value={settings.apiKey}
                  onChange={(e) => setSettings((prev) => ({ ...prev, apiKey: e.target.value }))}
                  placeholder={
                    settings.provider === "groq"
                      ? "gsk_..."
                      : settings.provider === "gemini"
                      ? "AIzaSy..."
                      : "sk-..."
                  }
                  className="w-full bg-[rgba(10,8,16,0.9)] border border-[rgba(238,93,52,0.3)] rounded-sm p-2.5 text-xs font-mono text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
                />
                <div className="text-[11px] text-[#bfb7aa]">
                  {settings.provider === "groq" && (
                    <span>
                      Get a free Groq key with thousands of fast requests daily at{" "}
                      <a
                        href="https://console.groq.com/keys"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#ee5d34] underline"
                      >
                        console.groq.com
                      </a>
                    </span>
                  )}
                  {settings.provider === "gemini" && (
                    <span>
                      Get a free Google Gemini key at{" "}
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#ee5d34] underline"
                      >
                        aistudio.google.com
                      </a>
                    </span>
                  )}
                  {settings.provider === "openai" && (
                    <span>Stored strictly in your local browser storage. Never sent to any 3rd-party servers.</span>
                  )}
                </div>
              </div>
            )}

            {/* Model Field */}
            {settings.provider !== "builtin" && (
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#eee5d3] uppercase">Model Identifier</label>
                <input
                  type="text"
                  value={settings.model}
                  onChange={(e) => setSettings((prev) => ({ ...prev, model: e.target.value }))}
                  className="w-full bg-[rgba(10,8,16,0.9)] border border-[rgba(238,93,52,0.2)] rounded-sm p-2 text-xs font-mono text-[#eee5d3] focus:outline-none focus:border-[#ee5d34]"
                />
              </div>
            )}

            {engineSavedNotice && (
              <div className="text-xs font-mono text-[#ee5d34] bg-[rgba(238,93,52,0.1)] p-2 rounded-sm text-center">
                ✓ Engine configuration saved successfully!
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowEngineModal(false)}
                className="px-4 py-2 text-xs font-mono text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="button-primary cursor-pointer text-xs py-2 px-5"
              >
                Save Engine Configuration →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DIAGNOSTIC INQUIRIES & INSCRIPTION DESK */}
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#ee5d34] block mb-2">
            ✦ Diagnostic Natal Inquiries (Select to Inscribe)
          </span>
          <div className="grid md:grid-cols-3 gap-2.5">
            {diagnosticInquiries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(item.prompt);
                  handleConsult(item.prompt);
                }}
                className="border border-[rgba(238,93,52,0.18)] bg-[rgba(31,24,48,0.7)] hover:border-[#ee5d34] hover:bg-[rgba(31,24,48,0.95)] p-3.5 rounded-sm transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-[#ee5d34] font-mono mb-1">
                  <span>{item.title}</span>
                  <span className="opacity-60 group-hover:opacity-100">{item.glyph}</span>
                </div>
                <p className="text-xs text-[#bfb7aa] group-hover:text-[#eee5d3] line-clamp-2 leading-relaxed">
                  “{item.prompt}”
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Manuscript Input Field */}
        <div className="border border-[rgba(238,93,52,0.25)] bg-[rgba(20,15,35,0.75)] p-5 rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-[#eee5d3] uppercase tracking-wider">
              Formulate Inscription for AstroFindings
            </label>
            <span className="text-[10px] font-mono text-[#bfb7aa]">
              Cross-referenced with {user.sunSign} Sun · {user.moonSign} Moon · {user.risingSign} Rising
            </span>
          </div>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Inscribe the truth you keep guarded: Why do I shut down during intimacy? Why am I terrified of being alone yet keep pushing people away? Why does this specific heartbreak feel physical?..."
            className="w-full h-32 bg-[rgba(10,8,16,0.85)] border border-[rgba(238,93,52,0.25)] rounded-sm p-4 text-xs sm:text-sm text-[#eee5d3] placeholder:text-[#6e677c] focus:outline-none focus:border-[#ee5d34] leading-relaxed resize-y"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-[11px] font-mono text-[#bfb7aa]">
              {settings.provider === "builtin" ? (
                <span>⚡ Using Free Ephemeris Engine (Instant Offline Calculation)</span>
              ) : (
                <span className="text-[#d4af37]">
                  ✦ Live Engine: {settings.provider.toUpperCase()} ({settings.model})
                </span>
              )}
            </div>

            <button
              onClick={() => handleConsult()}
              disabled={isLoading || !question.trim()}
              className="button-primary cursor-pointer disabled:opacity-50 py-2.5 px-6 text-xs font-medium w-full sm:w-auto"
            >
              {isLoading ? "Studying Natal Ephemeris & Transits..." : "Inscribe Inquiry & Study Natal Blueprint →"}
            </button>
          </div>
        </div>

        {/* 4. THE CONSULTATION DOSSIER (NON-CHATBOT PARCHMENT LEDGER) */}
        {isLoading && (
          <div className="border border-[rgba(238,93,52,0.3)] bg-[rgba(20,15,35,0.9)] p-8 rounded-sm text-center space-y-4 animate-pulse">
            <span className="text-2xl text-[#ee5d34] block animate-spin inline-block">✦</span>
            <div className="font-serif text-lg text-[#eee5d3]">Studying Natal Coordinates & Whole-Sign Rulers</div>
            <p className="text-xs font-mono text-[#bfb7aa] max-w-md mx-auto">
              Calculating aspects between {user.sunSign} Sun, {user.moonSign} Moon, house rulers, and current sky retrogrades...
            </p>
          </div>
        )}

        {response && !isLoading && (
          <div className="border border-[#ee5d34] bg-[radial-gradient(ellipse_at_top,rgba(31,24,48,0.95),rgba(14,10,23,0.98))] rounded-sm shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(238,93,52,0.2)] pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#ee5d34] block">
                  ✦ ASTROFINDINGS CONSULTATION DOSSIER · EPHEMERIS VERIFIED
                </span>
                <h2 className="font-serif text-2xl text-[#eee5d3] mt-0.5">
                  Astrological Reading on “{question.slice(0, 50)}
                  {question.length > 50 ? "..." : ""}”
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyDossier}
                  className="text-xs font-mono px-3 py-1.5 border border-[rgba(238,93,52,0.2)] hover:border-[#ee5d34] text-[#eee5d3] rounded-sm transition-colors cursor-pointer"
                >
                  {copied ? "✓ Inscription Copied" : "Copy Dossier"}
                </button>
              </div>
            </div>

            {/* Inscription Metadata strip */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#bfb7aa] border-b border-[rgba(238,93,52,0.1)] pb-3">
              <span className="px-2 py-0.5 bg-[rgba(238,93,52,0.1)] text-[#ee5d34] rounded-sm">
                Subject: {user.name || "Sovereign Inquirer"}
              </span>
              <span className="px-2 py-0.5 bg-[rgba(20,15,35,0.8)] border border-[rgba(238,93,52,0.15)] rounded-sm">
                Coordinates: {user.sunSign} Sun · {user.moonSign} Moon · {user.risingSign} Rising
              </span>
              <span className="px-2 py-0.5 bg-[rgba(20,15,35,0.8)] border border-[rgba(238,93,52,0.15)] rounded-sm">
                Engine: {response.engineUsed}
              </span>
              <span className="px-2 py-0.5 bg-[rgba(20,15,35,0.8)] border border-[rgba(238,93,52,0.15)] rounded-sm text-[#d4af37]">
                Archetype: {response.category}
              </span>
            </div>

            {/* Mind Reading Disclaimer if third party inquiry */}
            {response.structuredReading?.mindReadingDisclaimer && (
              <div className="p-3.5 border border-[#ee5d34]/40 bg-[rgba(238,93,52,0.08)] rounded-sm text-xs text-[#eee5d3] flex items-start gap-2.5">
                <span className="text-[#ee5d34] text-base leading-none mt-0.5">✦</span>
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] text-[#ee5d34] uppercase tracking-wider block font-bold">Chart Boundary Notice</span>
                  <p className="text-xs text-[#bfb7aa] leading-relaxed">{response.structuredReading.mindReadingDisclaimer}</p>
                </div>
              </div>
            )}

            {/* Reading Body: Structured or Prose */}
            {response.structuredReading && response.structuredReading.sections.length > 0 ? (
              <div className="space-y-6">
                {response.structuredReading.summary && (
                  <div className="p-4 rounded-sm bg-[rgba(238,93,52,0.06)] border-l-2 border-[#ee5d34] font-serif text-sm md:text-base text-[#eee5d3] italic leading-relaxed">
                    "{response.structuredReading.summary}"
                  </div>
                )}

                <div className="space-y-6 pt-2">
                  {response.structuredReading.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-2 border-b border-[rgba(238,93,52,0.1)] pb-5 last:border-b-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {sec.dimensionTag && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[rgba(238,93,52,0.15)] text-[#ee5d34] rounded-sm font-semibold uppercase">
                            {sec.dimensionTag}
                          </span>
                        )}
                        <h3 className="font-serif text-base md:text-lg text-[#eee5d3] font-medium">
                          {sec.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#eee5d3]/90 leading-relaxed whitespace-pre-line font-serif">
                        {sec.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#eee5d3] leading-relaxed space-y-4 whitespace-pre-line font-serif font-normal">
                {response.text}
              </div>
            )}

            {/* Active Sky Transits Tag Cloud */}
            {response.structuredReading?.relevantTransits && response.structuredReading.relevantTransits.length > 0 && (
              <div className="pt-2 border-t border-[rgba(238,93,52,0.15)] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#d4af37] block font-bold">
                  Active Sky Transits Impacting This Inquiry:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {response.structuredReading.relevantTransits.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2.5 py-1 bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.25)] text-[#eee5d3] rounded-sm"
                    >
                      ⚡ {t.transit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Consulted Planets Tag Cloud */}
            {response.consultedPlanets && response.consultedPlanets.length > 0 && (
              <div className="pt-2 border-t border-[rgba(238,93,52,0.15)] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#ee5d34] block">
                  Cross-Examined Ephemeris Bodies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {response.consultedPlanets.map((p, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-1 bg-[rgba(238,93,52,0.12)] border border-[rgba(238,93,52,0.2)] text-[#eee5d3] rounded-sm"
                    >
                      ✦ {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dossier Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[rgba(238,93,52,0.15)]">
              <button
                onClick={() => {
                  setResponse(null);
                  setQuestion("");
                }}
                className="text-xs font-mono text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
              >
                ← Inscribe Another Inquiry
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate("chart")}
                  className="text-xs font-mono text-[#ee5d34] hover:underline cursor-pointer"
                >
                  Examine Natal Planetary Chart Wheel →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-10 flex items-center justify-between border-t border-[rgba(238,93,52,0.12)] mt-12">
        <button
          className="button-quiet cursor-pointer text-xs text-[#bfb7aa] hover:text-[#eee5d3]"
          onClick={() => onNavigate("chart")}
        >
          ← Read Birth Chart Wheel
        </button>
        <button
          className="button-quiet cursor-pointer text-xs text-[#bfb7aa] hover:text-[#eee5d3]"
          onClick={() => onNavigate("timeline")}
        >
          Inspect Planetary Transits Timeline →
        </button>
      </div>
    </Shell>
  );
}
