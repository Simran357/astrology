import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  UserProfileData,
  PersonProfile,
  DEFAULT_USER_PROFILE,
  INITIAL_PEOPLE_PROFILES,
  calculateUserProfile,
} from "../services/astrologyEngine";
import { calculateLiveTransits, LiveTransitData } from "../services/transitEngine";
import { lookupLocation } from "../services/geocodingService";
import { calculateNatalEphemeris } from "../services/ephemerisEngine";
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
  isLoggedIn: boolean;
  login: (email?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isSupabaseReady: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORAGE_KEY = "astral_heretic_user_profile";
const PEOPLE_STORAGE_KEY = "astral_heretic_people_profiles";
const MEMBERSHIP_STORAGE_KEY = "astral_heretic_membership";
const AUTH_STORAGE_KEY = "astrofindings_auth_session";

export const AppProvider: React.FC<{
  children: React.ReactNode;
  currentPage: PageId;
  onNavigate: (page: string) => void;
}> = ({ children, currentPage, onNavigate }) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSupabaseReady] = useState(isSupabaseConfigured);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [highlightedPlanet, setHighlightedPlanet] = useState<string | null>(null);

  // Load User from LocalStorage or default
  const [user, setUser] = useState<UserProfileData>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  // Supabase Auth state listener & session check
  useEffect(() => {
    const checkSession = async () => {
      const session = await getCurrentSession();
      if (session?.user) {
        setIsLoggedIn(true);
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
        setUser((prev) => ({
          ...prev,
          id: session.user.id,
          email: session.user.email || prev.email,
          name: session.user.user_metadata?.full_name || prev.name,
          avatar: session.user.user_metadata?.avatar_url || prev.avatar,
          authProvider: (session.user.app_metadata?.provider as any) || "google",
        }));
      }
    };
    checkSession();

    const { unsubscribe } = onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
        setUser((prev) => ({
          ...prev,
          id: session.user.id,
          email: session.user.email || prev.email,
          name: session.user.user_metadata?.full_name || prev.name,
          avatar: session.user.user_metadata?.avatar_url || prev.avatar,
          authProvider: (session.user.app_metadata?.provider as any) || "google",
        }));
      } else if (!session && isSupabaseConfigured()) {
        // Only log out if using real supabase and explicitly null
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = useCallback(
    async (email?: string, password?: string): Promise<{ success: boolean; error?: string }> => {
      if (email && password) {
        const res = await signInWithEmail(email, password);
        if (!res.success) {
          return { success: false, error: res.error };
        }
        setIsLoggedIn(true);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, "true");
        } catch {}
        if (res.user) {
          setUser((prev) => ({
            ...prev,
            email: res.user?.email || prev.email,
            name: res.user?.name || prev.name,
            avatar: res.user?.avatar || prev.avatar,
            authProvider: "email",
          }));
        }
        return { success: true };
      }

      setIsLoggedIn(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
      } catch {}
      if (email) {
        setUser((prev) => ({
          ...prev,
          email: email,
          name: prev.name || email.split("@")[0],
          authProvider: "email",
        }));
      }
      return { success: true };
    },
    []
  );

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password?: string
    ): Promise<{ success: boolean; error?: string }> => {
      const res = await signUpWithEmail(email, password || "password123", name);
      if (!res.success) {
        return { success: false, error: res.error };
      }
      setIsLoggedIn(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
      } catch {}
      setUser((prev) => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        avatar: res.user?.avatar || prev.avatar,
        authProvider: "email",
      }));
      return { success: true };
    },
    []
  );

  const loginWithGoogle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    const res = await signInWithGoogle();
    if (!res.success) {
      return { success: false, error: res.error };
    }
    if (res.isMockFallback && res.user) {
      setIsLoggedIn(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
      } catch {}
      setUser((prev) => ({
        ...prev,
        email: res.user?.email || "seeker.astral@gmail.com",
        name: res.user?.name || "Astral Seeker",
        avatar: res.user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&auto=format",
        authProvider: "google",
      }));
    }
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    await supabaseSignOut();
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
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


  // Membership state (free vs premium)
  const [isMembershipActive, setIsMembershipActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MEMBERSHIP_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const toggleMembership = () => {
    setIsMembershipActive((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MEMBERSHIP_STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  };

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

  // Save User to LocalStorage
  const persistUser = (newUser: UserProfileData) => {
    setUser(newUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch {}
  };

  // Save People to LocalStorage
  const persistPeople = (newPeople: PersonProfile[]) => {
    setPeople(newPeople);
    try {
      localStorage.setItem(PEOPLE_STORAGE_KEY, JSON.stringify(newPeople));
    } catch {}
  };

  // Update User Profile with recalculated astrology
  const updateUser = async (data: Partial<UserProfileData>) => {
    setIsCalculating(true);
    try {
      const updatedBasic = { ...user, ...data };
      const geocoded = await lookupLocation(updatedBasic.birthLocation);
      const ephemeris = calculateNatalEphemeris(
        updatedBasic.birthDate,
        updatedBasic.birthTime || "12:00",
        geocoded.latitude,
        geocoded.longitude,
        geocoded.timezone
      );

      const completeUser: UserProfileData = {
        ...updatedBasic,
        latitude: geocoded.latitude,
        longitude: geocoded.longitude,
        timezone: geocoded.timezone,
        sunSign: ephemeris.sunSign,
        moonSign: ephemeris.moonSign,
        risingSign: ephemeris.risingSign,
        placements: ephemeris.placements,
        aspects: ephemeris.aspects,
        houses: ephemeris.houses,
        elements: ephemeris.elements,
      };

      persistUser(completeUser);
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


  // Cross-page navigation with highlight (e.g., "See your Moon" -> /chart with Moon highlighted)
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
        isLoggedIn,
        login,
        signup,
        loginWithGoogle,
        logout,
        isSupabaseReady,
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
