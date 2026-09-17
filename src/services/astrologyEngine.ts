/**
 * Canonical Astrology Types & Profile Models for AstroFindings P0 MVP
 */

export interface NatalPlacement {
  planet: string;
  sign: string;
  degrees: number;
  signIndex: number;
  house: number;
  meaning: string;
  glyph?: string;
  signGlyph?: string;
  isRetrograde?: boolean;
  name?: string;
  degree?: number;
  formatted?: string;
  element?: string;
  color?: string;
  keywords?: string | string[];
}

export interface NatalAspect {
  planet1: string;
  planet2: string;
  type: "Conjunction" | "Sextile" | "Square" | "Trine" | "Opposition" | "Quincunx";
  influence?: "Harmonious" | "Challenging" | "Intensifying" | "Supportive";
  interpretation: string;
  angle?: number;
  degrees?: number;
  orb?: number;
  nature?: string;
}

export interface UserProfileData {
  id?: string;
  name: string;
  email?: string;
  avatar?: string;
  authProvider?: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthLocation: string;
  latitude: number;
  longitude: number;
  timezone: string;
  historicalUtcOffsetMinutes?: number;
  isTimeApproximate?: boolean;
  houseSystem?: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  placements: NatalPlacement[];
  aspects: NatalAspect[];
  houses?: { house: number; sign: string; degrees: number; meaning?: string; startDeg?: number }[];
  elements?: { fire: number; earth: number; air: number; water: number };
  chartJson?: any;
  interests?: string[];
}

export interface PersonProfile {
  id: string;
  name: string;
  relationship: "Partner" | "Friend" | "Family" | "Crush" | "Colleague";
  birthDate: string;
  birthTime?: string;
  birthLocation?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  sunSign: string;
  moonSign: string;
  risingSign?: string;
  placements?: NatalPlacement[];
  avatar?: string;
  notes?: string;
}

export const DEFAULT_USER_PROFILE: UserProfileData = {
  name: "Seeker",
  birthDate: "1994-08-09",
  birthTime: "07:24",
  birthLocation: "San Francisco, CA, USA",
  latitude: 37.7749,
  longitude: -122.4194,
  timezone: "America/Los_Angeles",
  historicalUtcOffsetMinutes: -420,
  isTimeApproximate: false,
  houseSystem: "Placidus",
  sunSign: "Leo",
  moonSign: "Taurus",
  risingSign: "Virgo",
  placements: [
    { planet: "Sun", sign: "Leo", degrees: 15, signIndex: 4, house: 10, meaning: "Core identity and creative sovereign self.", isRetrograde: false, name: "Sun", degree: 15, formatted: "15° Leo", element: "Fire", glyph: "☉" },
    { planet: "Moon", sign: "Taurus", degrees: 8, signIndex: 1, house: 4, meaning: "Instinctive nervous system, emotional sanctuary, and inner calm.", isRetrograde: false, name: "Moon", degree: 8, formatted: "8° Taurus", element: "Earth", glyph: "☽" },
    { planet: "Mercury", sign: "Leo", degrees: 28, signIndex: 4, house: 10, meaning: "Communication cadence, mental discernment, and intellectual voice.", isRetrograde: false, name: "Mercury", degree: 28, formatted: "28° Leo", element: "Fire", glyph: "☿" },
    { planet: "Venus", sign: "Cancer", degrees: 5, signIndex: 3, house: 9, meaning: "Relational architecture, aesthetic resonance, and deep loyalty.", isRetrograde: false, name: "Venus", degree: 5, formatted: "5° Cancer", element: "Water", glyph: "♀" },
    { planet: "Mars", sign: "Sagittarius", degrees: 22, signIndex: 8, house: 1, meaning: "Drive, physical initiative, boundary defense, and passion.", isRetrograde: false, name: "Mars", degree: 22, formatted: "22° Sagittarius", element: "Fire", glyph: "♂" },
    { planet: "Jupiter", sign: "Aquarius", degrees: 3, signIndex: 10, house: 3, meaning: "Philosophical expansion, collaborative wisdom, and optimism.", isRetrograde: false, name: "Jupiter", degree: 3, formatted: "3° Aquarius", element: "Air", glyph: "♃" },
    { planet: "Saturn", sign: "Libra", degrees: 18, signIndex: 6, house: 12, meaning: "Discipline, structural responsibility, boundaries, and mastery.", isRetrograde: true, name: "Saturn", degree: 18, formatted: "18° Libra ℞", element: "Air", glyph: "♄" },
    { planet: "Ascendant", sign: "Virgo", degrees: 14, signIndex: 5, house: 1, meaning: "The dawn threshold: instinctive lens and bodily expression.", isRetrograde: false, name: "Ascendant", degree: 14, formatted: "14° Virgo", element: "Earth", glyph: "AC" },
  ],
  aspects: [
    { planet1: "Sun", planet2: "Mercury", type: "Conjunction", influence: "Intensifying", interpretation: "Mind and identity align with natural clarity and conviction.", angle: 0, orb: 2.1, nature: "Harmonious" },
    { planet1: "Sun", planet2: "Mars", type: "Trine", influence: "Harmonious", interpretation: "Vital creative impulse flows smoothly into physical courage and momentum.", angle: 120, orb: 1.8, nature: "Harmonious" },
    { planet1: "Moon", planet2: "Venus", type: "Sextile", influence: "Supportive", interpretation: "Emotional comfort connects easily with affectionate devotion.", angle: 60, orb: 3.2, nature: "Harmonious" },
    { planet1: "Moon", planet2: "Saturn", type: "Opposition", influence: "Challenging", interpretation: "Tension between vulnerability and defensive self-containment.", angle: 180, orb: 3.4, nature: "Tense" },
  ],
};

export const INITIAL_PEOPLE_PROFILES: PersonProfile[] = [
  {
    id: "person-1",
    name: "Elena Rostova",
    relationship: "Partner",
    birthDate: "1993-11-12",
    birthTime: "14:15",
    birthLocation: "Vienna, Austria",
    sunSign: "Scorpio",
    moonSign: "Cancer",
    risingSign: "Pisces",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",
    notes: "Deep emotional resonance, intuitive connection.",
  },
  {
    id: "person-2",
    name: "Julian Vance",
    relationship: "Friend",
    birthDate: "1991-04-20",
    birthTime: "08:30",
    birthLocation: "London, UK",
    sunSign: "Taurus",
    moonSign: "Virgo",
    risingSign: "Gemini",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
    notes: "Steadfast creative collaborator.",
  },
];

/**
 * Calculates astrological synastry compatibility scores between two profiles
 */
export function calculateCompatibility(
  user: { sunSign: string; moonSign: string; placements?: NatalPlacement[] },
  partner: { sunSign: string; moonSign: string; placements?: NatalPlacement[] }
) {
  const elements: Record<string, string> = {
    Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
    Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
    Gemini: "Air", Libra: "Air", Aquarius: "Air",
    Cancer: "Water", Scorpio: "Water", Pisces: "Water",
  };

  const userSunEl = elements[user.sunSign] || "Fire";
  const userMoonEl = elements[user.moonSign] || "Earth";
  const partnerSunEl = elements[partner.sunSign] || "Water";
  const partnerMoonEl = elements[partner.moonSign] || "Water";

  let emotionalScore = 78;
  if (userMoonEl === partnerMoonEl) emotionalScore += 16;
  else if (
    (userMoonEl === "Water" && partnerMoonEl === "Earth") ||
    (userMoonEl === "Earth" && partnerMoonEl === "Water") ||
    (userMoonEl === "Fire" && partnerMoonEl === "Air") ||
    (userMoonEl === "Air" && partnerMoonEl === "Fire")
  ) {
    emotionalScore += 10;
  }

  let passionScore = 72;
  if (userSunEl === partnerSunEl) passionScore += 14;
  else if (
    (userSunEl === "Fire" && partnerSunEl === "Air") ||
    (userSunEl === "Air" && partnerSunEl === "Fire")
  ) {
    passionScore += 18;
  }

  let communicationScore = 80;
  let longTermScore = 82;

  emotionalScore = Math.min(98, Math.max(55, emotionalScore));
  passionScore = Math.min(96, Math.max(50, passionScore));
  communicationScore = Math.min(95, Math.max(60, communicationScore));
  longTermScore = Math.min(97, Math.max(58, longTermScore));

  const overallScore = Math.round(
    (emotionalScore * 0.35) + (communicationScore * 0.25) + (passionScore * 0.2) + (longTermScore * 0.2)
  );

  return {
    overallScore,
    emotionalScore,
    communicationScore,
    passionScore,
    longTermScore,
  };
}

export function calculateUserProfile(baseData: Partial<UserProfileData>): UserProfileData {
  return {
    ...DEFAULT_USER_PROFILE,
    ...baseData,
  };
}
