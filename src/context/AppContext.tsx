"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  UserProfileData,
  PersonProfile,
  DEFAULT_USER_PROFILE,
  INITIAL_PEOPLE_PROFILES,
} from "../services/astrologyEngine";
import { calculateLiveTransits, LiveTransitData } from "../services/transitEngine";
import { lookupLocation } from "../services/geocodingService";
import { calculateNatalEphemeris } from "../services/ephemerisEngine";
import { resolveHistoricalTimezone } from "../services/timezoneService";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut as supabaseSignOut,
  onAuthStateChange,
  getCurrentSession,
  isSupabaseConfigured,
} from "../services/supabaseClient";

export type PageId =
  | "home"
  | "dashboard"
  | "chart"
  | "reading"
  | "learn"
  | "profile"
  | "onboarding"
  | "login"
  | "signup"
  | "timeline"
  | "relationships"
  | "askai"
  | "wellness"
  | "palm";

export const PUBLIC_PAGES: PageId[] = ["home", "login", "signup", "learn"];
export const PROTECTED_PAGES: PageId[] = [
  "dashboard",
  "chart",
  "reading",
  "profile",
  "timeline",
  "relationships",
  "askai",
  "wellness",
  "palm",
];

interface AppContextType {
  currentPage: PageId;
  navigate: (page: string) => void;
  user: UserProfileData;
  updateUser: (data: Partial<UserProfileData>) => Promise<void>;
  isCalculating: boolean;
  liveTransits: LiveTransitData;
  refreshTransits: () => void;
  people: PersonProfile[];
  addPerson: (person: Omit<PersonProfile, "id">) => Promise<void>;
  updatePerson: (id: string, person: Partial<PersonProfile>) => Promise<void>;
  deletePerson: (id: string) => void;
  highlightedPlanet: string | null;
  setHighlightedPlanet: (planet: string | null) => void;
  navigateWithHighlight: (page: string, planet?: string) => void;
  isMembershipActive: boolean;
  toggleMembership: () => void;
  startCheckout: (planId?: string) => Promise<void>;
  restorePurchases: () => Promise<{ success: boolean; message: string; restored?: boolean }>;
  subscriptionStatus: string;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  session: Session | null;
  intendedPage: PageId | null;
  setIntendedPage: (page: PageId | null) => void;
  login: (email?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password?: string
  ) => Promise<{ success: boolean; emailConfirmationRequired?: boolean; message?: string; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isSupabaseReady: boolean;
  hasCompletedOnboarding: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORAGE_KEY = "astral_heretic_user_profile";
const PEOPLE_STORAGE_KEY = "astral_heretic_people_profiles";
const MEMBERSHIP_STORAGE_KEY = "astral_heretic_membership";
const ONBOARDING_COMPLETED_KEY = "astrofindings_onboarding_done";

export const AppProvider: React.FC<{
  children: React.ReactNode;
  currentPage: PageId;
  onNavigate: (page: string) => void;
}> = ({ children, currentPage, onNavigate }) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSupabaseReady] = useState(isSupabaseConfigured);

  // Real Supabase session state (Source of Truth)
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [intendedPage, setIntendedPage] = useState<PageId | null>(null);

  const isLoggedIn = Boolean(session?.user);

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [highlightedPlanet, setHighlightedPlanet] = useState<string | null>(null);

  // User Profile state
  const [user, setUser] = useState<UserProfileData>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_USER_PROFILE, ...parsed };
      }
    } catch {}
    return DEFAULT_USER_PROFILE;
  });

  // Membership state & server-verified entitlement
  const [isMembershipActive, setIsMembershipActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MEMBERSHIP_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("free");

  // Sync server-side entitlement status
  const checkServerEntitlements = useCallback(async (token?: string) => {
    try {
      const activeToken = token || (await getCurrentSession())?.access_token;
      if (!activeToken) {
        setIsMembershipActive(false);
        setSubscriptionStatus("free");
        return;
      }
      const headers: Record<string, string> = {
        Authorization: `Bearer ${activeToken}`,
      };
      const res = await fetch("/api/subscriptions/status", { headers });
      if (res.ok) {
        const data = await res.json();
        setIsMembershipActive(Boolean(data.isPremium));
        setSubscriptionStatus(data.status || "free");
        try {
          localStorage.setItem(MEMBERSHIP_STORAGE_KEY, String(Boolean(data.isPremium)));
        } catch {}
      }
    } catch (e) {
      console.warn("[Entitlements] Failed to check server status:", e);
    }
  }, []);

  const toggleMembership = () => {
    setIsMembershipActive((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MEMBERSHIP_STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  };

  const startCheckout = async (planId: string = "monthly") => {
    try {
      const activeSession = session || (await getCurrentSession());
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (activeSession?.access_token) {
        headers["Authorization"] = `Bearer ${activeSession.access_token}`;
      }

      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers,
        body: JSON.stringify({
          planId,
          returnUrl: `${window.location.origin}/dashboard?payment=success`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        }
      }
    } catch (e) {
      console.error("Checkout initiation failed:", e);
    }
  };

  // Hydrate user chart and profile from remote database
  const loadUserNatalData = useCallback(async (accessToken?: string) => {
    try {
      const token = accessToken || (await getCurrentSession())?.access_token;
      if (!token) return;

      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };
      const res = await fetch("/api/natal/chart", { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.chart) {
          const chart = data.chart;
          const planets = chart.planets || chart.placements || [];
          const sun = planets.find((p: any) => p.planet === "Sun");
          const moon = planets.find((p: any) => p.planet === "Moon");
          const asc = chart.ascendant;
          const profile = data.profile;

          setHasCompletedOnboarding(true);
          try {
            localStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
          } catch {}

          setUser((prev) => {
            const updated: UserProfileData = {
              ...prev,
              name: profile?.display_name || prev.name,
              avatar: profile?.avatar_url || prev.avatar,
              interests: profile?.interests || prev.interests,
              isTimeApproximate: data.isApproximate ?? prev.isTimeApproximate,
              chartJson: chart,
              placements: planets.length > 0 ? planets : prev.placements,
              houses: chart.houses || prev.houses,
              aspects: chart.aspects || prev.aspects,
              sunSign: sun?.sign || prev.sunSign,
              moonSign: moon?.sign || prev.moonSign,
              risingSign: asc?.sign || prev.risingSign,
            };
            try {
              localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      } else if (res.status === 404) {
        // No natal chart saved yet for this account
        setHasCompletedOnboarding(false);
      }
    } catch (e) {
      console.warn("Could not sync remote chart:", e);
    }
  }, []);

  const restorePurchases = useCallback(async (): Promise<{ success: boolean; message: string; restored?: boolean }> => {
    try {
      const activeSession = session || (await getCurrentSession());
      if (!activeSession?.access_token) {
        return { success: false, message: "Authentication required to restore purchases." };
      }
      const headers: Record<string, string> = {
        Authorization: `Bearer ${activeSession.access_token}`,
      };
      const res = await fetch("/api/subscriptions/restore", {
        method: "POST",
        headers,
      });
      const data = await res.json();
      if (data.restored) {
        setIsMembershipActive(true);
        setSubscriptionStatus(data.status || "active");
        try {
          localStorage.setItem(MEMBERSHIP_STORAGE_KEY, "true");
        } catch {}
        return { success: true, message: data.message || "Subscriptions restored successfully.", restored: true };
      }
      return { success: true, message: data.message || "No active subscriptions found to restore.", restored: false };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to restore purchases." };
    }
  }, [session]);

  // Real Supabase Auth Lifecycle Listener
  useEffect(() => {
    let isMounted = true;

    // 1. Initial Session Check on mount
    getCurrentSession().then((initialSession) => {
      if (!isMounted) return;
      setSession(initialSession);
      setIsAuthLoading(false);

      if (initialSession?.user) {
        const supaUser = initialSession.user;
        setUser((prev) => ({
          ...prev,
          id: supaUser.id,
          email: supaUser.email || prev.email,
          name: supaUser.user_metadata?.full_name || supaUser.user_metadata?.name || prev.name,
          avatar: supaUser.user_metadata?.avatar_url || prev.avatar,
          authProvider: (supaUser.app_metadata?.provider as any) || "email",
        }));
        loadUserNatalData(initialSession.access_token);
        checkServerEntitlements(initialSession.access_token);
      }
    });

    // 2. Real-time auth state listener (handles login, logout, token refresh, OAuth redirects)
    const { unsubscribe } = onAuthStateChange(async (event, currentSession) => {
      if (!isMounted) return;
      setSession(currentSession);
      setIsAuthLoading(false);

      if (currentSession?.user) {
        const supaUser = currentSession.user;
        setUser((prev) => ({
          ...prev,
          id: supaUser.id,
          email: supaUser.email || prev.email,
          name: supaUser.user_metadata?.full_name || supaUser.user_metadata?.name || prev.name,
          avatar: supaUser.user_metadata?.avatar_url || prev.avatar,
          authProvider: (supaUser.app_metadata?.provider as any) || "email",
        }));
        loadUserNatalData(currentSession.access_token);
        checkServerEntitlements(currentSession.access_token);
      } else if (event === "SIGNED_OUT") {
        setUser(DEFAULT_USER_PROFILE);
        setIsMembershipActive(false);
        setSubscriptionStatus("free");
        setHasCompletedOnboarding(false);
        try {
          localStorage.removeItem(USER_STORAGE_KEY);
          localStorage.removeItem(MEMBERSHIP_STORAGE_KEY);
          localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
        } catch {}
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [loadUserNatalData, checkServerEntitlements]);

  // Real Email/Password Login
  const login = useCallback(
    async (email?: string, password?: string): Promise<{ success: boolean; error?: string }> => {
      if (!email || !password) {
        return { success: false, error: "Please enter both email and password." };
      }
      const res = await signInWithEmail(email, password);
      if (!res.success) {
        return { success: false, error: res.error };
      }
      if (res.session) {
        setSession(res.session);
      }
      return { success: true };
    },
    []
  );

  // Real Email/Password Signup
  const signup = useCallback(
    async (
      name: string,
      email: string,
      password?: string
    ): Promise<{ success: boolean; emailConfirmationRequired?: boolean; message?: string; error?: string }> => {
      if (!email || !password) {
        return { success: false, error: "Please provide a valid email and password." };
      }
      const res = await signUpWithEmail(email, password, name);
      if (!res.success) {
        return { success: false, error: res.error };
      }
      if (res.session) {
        setSession(res.session);
      }
      return {
        success: true,
        emailConfirmationRequired: res.emailConfirmationRequired,
        message: res.message,
      };
    },
    []
  );

  // Real Google OAuth
  const loginWithGoogle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    return await signInWithGoogle();
  }, []);

  // Real Logout
  const logout = useCallback(async () => {
    await supabaseSignOut();
    setSession(null);
    setUser(DEFAULT_USER_PROFILE);
    setIsMembershipActive(false);
    setSubscriptionStatus("free");
    setHasCompletedOnboarding(false);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(MEMBERSHIP_STORAGE_KEY);
      localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    } catch {}
  }, []);

  // Load People Profiles from LocalStorage
  const [people, setPeople] = useState<PersonProfile[]>(() => {
    try {
      const saved = localStorage.getItem(PEOPLE_STORAGE_KEY);
      const list: PersonProfile[] = saved ? JSON.parse(saved) : INITIAL_PEOPLE_PROFILES;
      return list.length > 0 ? list : INITIAL_PEOPLE_PROFILES;
    } catch {
      return INITIAL_PEOPLE_PROFILES;
    }
  });

  // Live astronomical transits based on user's current placements
  const [liveTransits, setLiveTransits] = useState<LiveTransitData>(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    return calculateLiveTransits(todayStr, user.placements);
  });

  const refreshTransits = useCallback(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    setLiveTransits(calculateLiveTransits(todayStr, user.placements));
  }, [user.placements]);

  useEffect(() => {
    refreshTransits();
  }, [refreshTransits]);

  const persistUser = (newUser: UserProfileData) => {
    setUser(newUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch {}
  };

  const persistPeople = (newPeople: PersonProfile[]) => {
    setPeople(newPeople);
    try {
      localStorage.setItem(PEOPLE_STORAGE_KEY, JSON.stringify(newPeople));
    } catch {}
  };

  /**
   * Updates user profile with real ephemeris calculation,
   * historical UTC offset resolution, and persistence to backend Supabase.
   */
  const updateUser = async (data: Partial<UserProfileData>) => {
    setIsCalculating(true);
    try {
      const updatedBasic = { ...user, ...data };
      const geocoded = await lookupLocation(updatedBasic.birthLocation);

      // Historical timezone resolution (accounts for historical DST changes on birth date)
      const tzResolution = resolveHistoricalTimezone(
        geocoded.latitude,
        geocoded.longitude,
        updatedBasic.birthDate,
        updatedBasic.birthTime || "12:00"
      );

      const effectiveTime = tzResolution.isTimeApproximate ? "12:00" : (updatedBasic.birthTime || "12:00");

      const ephemeris = calculateNatalEphemeris(
        updatedBasic.birthDate,
        effectiveTime,
        geocoded.latitude,
        geocoded.longitude,
        tzResolution.timezone,
        updatedBasic.houseSystem || "Placidus"
      );

      const completeUser: UserProfileData = {
        ...updatedBasic,
        latitude: geocoded.latitude,
        longitude: geocoded.longitude,
        timezone: tzResolution.timezone,
        historicalUtcOffsetMinutes: tzResolution.historicalUtcOffsetMinutes,
        isTimeApproximate: tzResolution.isTimeApproximate,
        sunSign: ephemeris.sunSign,
        moonSign: ephemeris.moonSign,
        risingSign: ephemeris.risingSign,
        placements: ephemeris.placements,
        aspects: ephemeris.aspects,
        houses: ephemeris.houses,
        elements: ephemeris.elements,
        chartJson: ephemeris.chartJson,
      };

      persistUser(completeUser);
      setHasCompletedOnboarding(true);
      try {
        localStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
      } catch {}

      // Persist to server API & Supabase database if authenticated
      const activeSession = session || (await getCurrentSession());
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (activeSession?.access_token) {
        headers["Authorization"] = `Bearer ${activeSession.access_token}`;
      }

      await fetch("/api/natal/chart", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: updatedBasic.name,
          interests: updatedBasic.interests,
          birthDate: updatedBasic.birthDate,
          birthTime: effectiveTime,
          birthLocation: updatedBasic.birthLocation,
          latitude: geocoded.latitude,
          longitude: geocoded.longitude,
          timezone: tzResolution.timezone,
          houseSystem: updatedBasic.houseSystem || "Placidus",
        }),
      }).catch((e) => console.warn("Chart persistence warning:", e));
    } catch (err) {
      console.error("Error updating user chart:", err);
      persistUser({ ...user, ...data });
    } finally {
      setIsCalculating(false);
    }
  };

  // Add person to relationships
  const addPerson = async (personData: Omit<PersonProfile, "id">) => {
    try {
      const geocoded = await lookupLocation(personData.birthLocation || "New York");
      const ephemeris = calculateNatalEphemeris(
        personData.birthDate || "1995-01-01",
        personData.birthTime || "12:00",
        geocoded.latitude,
        geocoded.longitude,
        geocoded.timezone
      );

      const newPerson: PersonProfile = {
        ...personData,
        id: `person-${Date.now()}`,
        latitude: geocoded.latitude,
        longitude: geocoded.longitude,
        timezone: geocoded.timezone,
        sunSign: ephemeris.sunSign,
        moonSign: ephemeris.moonSign,
        risingSign: ephemeris.risingSign,
        placements: ephemeris.placements,
      };

      persistPeople([...people, newPerson]);
    } catch (err) {
      console.error("Error adding person:", err);
      const fallbackPerson: PersonProfile = {
        ...personData,
        id: `person-${Date.now()}`,
        sunSign: "Aries",
        moonSign: "Taurus",
        risingSign: "Gemini",
      };
      persistPeople([...people, fallbackPerson]);
    }
  };

  const updatePerson = async (id: string, personData: Partial<PersonProfile>) => {
    const updated = people.map((p) => (p.id === id ? { ...p, ...personData } : p));
    persistPeople(updated);
  };

  const deletePerson = (id: string) => {
    persistPeople(people.filter((p) => p.id !== id));
  };

  const navigateWithHighlight = (page: string, planet?: string) => {
    if (planet) {
      setHighlightedPlanet(planet);
    }
    onNavigate(page);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigate: onNavigate,
        user,
        updateUser,
        isCalculating,
        liveTransits,
        refreshTransits,
        people,
        addPerson,
        updatePerson,
        deletePerson,
        highlightedPlanet,
        setHighlightedPlanet,
        navigateWithHighlight,
        isMembershipActive,
        toggleMembership,
        startCheckout,
        restorePurchases,
        subscriptionStatus,
        isLoggedIn,
        isAuthLoading,
        session,
        intendedPage,
        setIntendedPage,
        login,
        signup,
        loginWithGoogle,
        logout,
        isSupabaseReady,
        hasCompletedOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
