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
  | "tarot"
  | "askai"
  | "wellness"
  | "palm";

export interface TarotDrawResult {
  id: string;
  date: string;
  spreadType: string;
  cardName: string;
  cardId: string;
  question: string;
  insight: string;
}

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
  savedTarotDraws: TarotDrawResult[];
  saveTarotDraw: (draw: Omit<TarotDrawResult, "id" | "date">) => void;
  highlightedPlanet: string | null;
  setHighlightedPlanet: (planet: string | null) => void;
  navigateWithHighlight: (page: string, planet?: string) => void;
  isMembershipActive: boolean;
  toggleMembership: () => void;
  isLoggedIn: boolean;
  login: (email?: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORAGE_KEY = "astral_heretic_user_profile";
const PEOPLE_STORAGE_KEY = "astral_heretic_people_profiles";
const TAROT_STORAGE_KEY = "astral_heretic_tarot_history";
const MEMBERSHIP_STORAGE_KEY = "astral_heretic_membership";

export const AppProvider: React.FC<{
  children: React.ReactNode;
  currentPage: PageId;
  onNavigate: (page: string) => void;
}> = ({ children, currentPage, onNavigate }) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const AUTH_STORAGE_KEY = "astrofindings_auth_session";
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const login = useCallback((email?: string) => {
    setIsLoggedIn(true);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
  }, []);
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

  // Saved Tarot Draws
  const [savedTarotDraws, setSavedTarotDraws] = useState<TarotDrawResult[]>(() => {
    try {
      const saved = localStorage.getItem(TAROT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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

  // Save a Tarot draw
  const saveTarotDraw = (draw: Omit<TarotDrawResult, "id" | "date">) => {
    const newDraw: TarotDrawResult = {
      ...draw,
      id: `tarot-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    const updated = [newDraw, ...savedTarotDraws];
    setSavedTarotDraws(updated);
    try {
      localStorage.setItem(TAROT_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
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
        savedTarotDraws,
        saveTarotDraw,
        highlightedPlanet,
        setHighlightedPlanet,
        navigateWithHighlight,
        isMembershipActive,
        toggleMembership,
        isLoggedIn,
        login,
        logout,
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
