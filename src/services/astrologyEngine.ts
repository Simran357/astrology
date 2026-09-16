import { calculateNatalEphemeris } from "./ephemerisEngine";
import { lookupLocation } from "./geocodingService";

export interface NatalPlacement {
  planet: string;
  glyph: string;
  sign: string;
  signGlyph: string;
  signIndex: number; // 0 = Aries, 11 = Pisces
  degrees: number;
  house: number;
  color: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  keywords: string;
  meaning: string;
}

export interface NatalAspect {
  planet1: string;
  planet2: string;
  type: "Conjunction" | "Opposition" | "Trine" | "Square" | "Sextile";
  degrees: number;
  influence: "Harmonious" | "Challenging" | "Intensifying" | "Supportive";
  interpretation: string;
}

export interface UserProfileData {
  id: string;
  name: string;
  email?: string;
  authProvider?: "google" | "email" | "anonymous";
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  avatar: string;
  interests: string[];
  membershipTier: "free" | "premium";
  placements: NatalPlacement[];
  aspects: NatalAspect[];
  houses?: { house: number; sign: string; degrees: number; startDeg: number }[];
  elements?: { fire: number; earth: number; air: number; water: number };
}

export interface PersonProfile {
  id: string;
  name: string;
  relationship: "Partner" | "Friend" | "Family" | "Crush" | "Colleague";
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  avatar: string;
  notes: string;
  placements?: NatalPlacement[];
}

export interface CompatibilityAnalysis {
  overallScore: number;
  emotionalScore: number;
  communicationScore: number;
  passionScore: number;
  longTermScore: number;
  elementalSummary: string;
  strengths: string[];
  growthAreas: string[];
  synastryAspects: {
    title: string;
    type: string;
    impact: string;
    description: string;
  }[];
  timingInsight: string;
}

export interface AIReadingResponse {
  category: string;
  question: string;
  directAnswer: string;
  chartFactors: { factor: string; influence: string }[];
  plainLanguageExplanation: string;
  harmonicInteraction: string;
  strengths: string[];
  challenges: string[];
  timingContext: string;
  reflectionPrompt: string;
}

/**
 * Calculates a complete UserProfileData structure from raw birth inputs.
 */
export async function calculateUserProfile(
  name: string,
  birthDate: string,
  birthTime: string,
  birthLocation: string,
  interests: string[] = ["Relationships & intimacy", "Career & direction"],
  membershipTier: "free" | "premium" = "free",
  avatar?: string
): Promise<UserProfileData> {
  const geocoded = await lookupLocation(birthLocation);
  const ephemeris = calculateNatalEphemeris(
    birthDate,
    birthTime || "12:00",
    geocoded.latitude,
    geocoded.longitude,
    geocoded.timezone
  );

  return {
    id: `user-${Date.now()}`,
    name: name.trim() || "Maya Reeves",
    birthDate,
    birthTime: birthTime || "12:00",
    birthLocation: geocoded.name || birthLocation,
    latitude: geocoded.latitude,
    longitude: geocoded.longitude,
    timezone: geocoded.timezone,
    sunSign: ephemeris.sunSign,
    moonSign: ephemeris.moonSign,
    risingSign: ephemeris.risingSign,
    avatar:
      avatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&auto=format",
    interests,
    membershipTier,
    placements: ephemeris.placements,
    aspects: ephemeris.aspects,
    houses: ephemeris.houses,
    elements: ephemeris.elements,
  };
}

// Initial Default User Profile (San Francisco, Aug 9, 1994, 07:24 PDT)
const initialDefaultEphemeris = calculateNatalEphemeris(
  "1994-08-09",
  "07:24",
  37.7749,
  -122.4194,
  "America/Los_Angeles"
);

export const DEFAULT_USER_PROFILE: UserProfileData = {
  id: "user-maya",
  name: "Maya Reeves",
  birthDate: "1994-08-09",
  birthTime: "07:24",
  birthLocation: "San Francisco, CA, USA",
  latitude: 37.7749,
  longitude: -122.4194,
  timezone: "America/Los_Angeles",
  sunSign: initialDefaultEphemeris.sunSign,
  moonSign: initialDefaultEphemeris.moonSign,
  risingSign: initialDefaultEphemeris.risingSign,
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&auto=format",
  interests: [
    "Relationships & intimacy",
    "Career & direction",
    "Inner patterns & habits",
    "Timing & upcoming shifts",
  ],
  membershipTier: "free",
  placements: initialDefaultEphemeris.placements,
  aspects: initialDefaultEphemeris.aspects,
  houses: initialDefaultEphemeris.houses,
  elements: initialDefaultEphemeris.elements,
};

// Initial Sample People Profiles
export const INITIAL_PEOPLE_PROFILES: PersonProfile[] = [
  {
    id: "person-1",
    name: "Julian Rivera",
    relationship: "Partner",
    birthDate: "1992-11-14",
    birthTime: "14:15",
    birthLocation: "Austin, TX, USA",
    latitude: 30.2672,
    longitude: -97.7431,
    timezone: "America/Chicago",
    sunSign: "Scorpio",
    moonSign: "Cancer",
    risingSign: "Pisces",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
    notes: "Deep emotional resonance, quiet loyalty, and creative depth.",
  },
  {
    id: "person-2",
    name: "Chloe Chen",
    relationship: "Friend",
    birthDate: "1995-04-28",
    birthTime: "09:30",
    birthLocation: "Seattle, WA, USA",
    latitude: 47.6062,
    longitude: -122.3321,
    timezone: "America/Los_Angeles",
    sunSign: "Taurus",
    moonSign: "Aries",
    risingSign: "Gemini",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&auto=format",
    notes: "Direct communication, grounded execution, and shared curiosity.",
  },
];

/**
 * Calculates genuine Synastry and Compatibility between two charts
 * based on exact geometric cross-aspects and elemental resonance.
 * Written in a smart, chill friend tone following the Content Style Guide.
 */
export function calculateCompatibility(
  user: UserProfileData,
  person: PersonProfile
): CompatibilityAnalysis {
  let personPlacements = person.placements;
  if (!personPlacements || !personPlacements.length) {
    const pEphemeris = calculateNatalEphemeris(
      person.birthDate || "1992-11-14",
      person.birthTime || "12:00",
      person.latitude || 30.2672,
      person.longitude || -97.7431,
      person.timezone || "America/Chicago"
    );
    personPlacements = pEphemeris.placements;
  }

  // Cross-chart aspect detection
  const synastryAspects: CompatibilityAnalysis["synastryAspects"] = [];
  let emotionalHarmonies = 0;
  let emotionalClashes = 0;
  let mentalHarmonies = 0;
  let passionPoints = 0;
  let stabilityPoints = 0;

  for (const up of user.placements) {
    if (up.planet === "Ascendant" || up.planet === "Midheaven") continue;
    const uDeg = up.signIndex * 30 + up.degrees;

    for (const pp of personPlacements) {
      if (pp.planet === "Ascendant" || pp.planet === "Midheaven") continue;
      const pDeg = pp.signIndex * 30 + pp.degrees;

      const diff = Math.abs(uDeg - pDeg) % 360;
      const shortest = diff > 180 ? 360 - diff : diff;

      let aspectName: string | null = null;
      let isHarmonious = true;

      if (shortest <= 6) {
        aspectName = "Conjunction";
      } else if (Math.abs(shortest - 60) <= 5) {
        aspectName = "Sextile";
      } else if (Math.abs(shortest - 90) <= 5.5) {
        aspectName = "Square";
        isHarmonious = false;
      } else if (Math.abs(shortest - 120) <= 5.5) {
        aspectName = "Trine";
      } else if (Math.abs(shortest - 180) <= 5.5) {
        aspectName = "Opposition";
        isHarmonious = false;
      }

      if (aspectName) {
        const isMoonContact = up.planet === "Moon" || pp.planet === "Moon";
        const isMercuryContact = up.planet === "Mercury" || pp.planet === "Mercury";
        const isVenusMarsContact =
          (up.planet === "Venus" && pp.planet === "Mars") ||
          (up.planet === "Mars" && pp.planet === "Venus") ||
          (up.planet === "Venus" && pp.planet === "Venus");
        const isSaturnContact = up.planet === "Saturn" || pp.planet === "Saturn";

        if (isMoonContact) {
          if (isHarmonious) emotionalHarmonies += 2;
          else emotionalClashes += 1.5;
        }
        if (isMercuryContact && isHarmonious) mentalHarmonies += 2;
        if (isVenusMarsContact) passionPoints += isHarmonious ? 3 : 2;
        if (isSaturnContact && isHarmonious) stabilityPoints += 2;

        if (
          (up.planet === "Sun" || up.planet === "Moon" || up.planet === "Venus" || up.planet === "Mars") &&
          (pp.planet === "Sun" || pp.planet === "Moon" || pp.planet === "Venus" || pp.planet === "Mars")
        ) {
          synastryAspects.push({
            title: `${user.name}'s ${up.planet} connecting with ${person.name}'s ${pp.planet}`,
            type: `${isHarmonious ? "Supportive" : "Dynamic"} connection`,
            impact: isHarmonious ? "Natural Understanding & Flow" : "Healthy Growth Edge",
            description: isHarmonious
              ? `Your ${up.planet} in ${up.sign} aligns comfortably with ${person.name}'s ${pp.planet} in ${pp.sign}, creating an easy, natural rapport between you.`
              : `Your ${up.planet} and ${person.name}'s ${pp.planet} gently challenge each other to step past old habits, helping both of you grow over time.`,
          });
        }
      }
    }
  }

  const emotionalScore = Math.min(96, Math.max(68, Math.round(78 + emotionalHarmonies * 4 - emotionalClashes * 3)));
  const communicationScore = Math.min(95, Math.max(70, Math.round(76 + mentalHarmonies * 5)));
  const passionScore = Math.min(98, Math.max(65, Math.round(75 + passionPoints * 4)));
  const longTermScore = Math.min(96, Math.max(68, Math.round(80 + stabilityPoints * 3)));
  const overallScore = Math.round(
    emotionalScore * 0.3 + communicationScore * 0.25 + passionScore * 0.25 + longTermScore * 0.2
  );

  const strengths = [
    `Your ${user.risingSign} Rising and ${person.name}'s ${person.sunSign} Sun create mutual respect and an immediate spark of recognition.`,
    `Your ${user.moonSign} Moon with ${person.name}'s ${person.moonSign} Moon establishes an intuitive baseline for emotional comfort.`,
    `A balanced dynamic that gives both of you room to pursue your own ambitions without losing your closeness.`,
  ];

  const growthAreas = [
    `Giving each other enough time to process intense feelings independently before expecting an immediate answer.`,
    `Balancing direct honesty with gentleness when plans change or expectations shift unexpectedly.`,
  ];

  return {
    overallScore,
    emotionalScore,
    communicationScore,
    passionScore,
    longTermScore,
    elementalSummary: `Natural interplay between your ${user.sunSign} energy and ${person.name}'s ${person.sunSign} nature.`,
    strengths,
    growthAreas,
    synastryAspects: synastryAspects.slice(0, 4),
    timingInsight:
      "Current planetary movements support calm, candid conversations and taking real steps together over the coming weeks.",
  };
}

/**
 * Editorial AI Reading Generator that dynamically connects the user's real
 * chart factors to the category and question with zero jargon and warm,
 * conversational curiosity.
 */
export function generateAIInterpretation(
  category: string,
  question: string,
  user: UserProfileData
): AIReadingResponse {
  const trimmedQ = question.toLowerCase();
  const sunP = user.placements.find((p) => p.planet === "Sun") || user.placements[0];
  const moonP = user.placements.find((p) => p.planet === "Moon") || user.placements[1];
  const venusP = user.placements.find((p) => p.planet === "Venus") || user.placements[3];
  const marsP = user.placements.find((p) => p.planet === "Mars") || user.placements[4];
  const saturnP = user.placements.find((p) => p.planet === "Saturn") || user.placements[6];

  if (trimmedQ.includes("career") || trimmedQ.includes("stuck") || trimmedQ.includes("work") || trimmedQ.includes("goal")) {
    return {
      category: "Career & Purpose",
      question,
      directAnswer: `With your Sun in ${sunP?.sign} in the ${sunP?.house}th House, meaningful work is deeply tied to creative authorship. You thrive when given real ownership rather than a generic checklist.`,
      chartFactors: [
        {
          factor: `Sun in ${sunP?.sign} (${sunP?.house}th House)`,
          influence: "Encourages taking visible ownership and pride in what you create.",
        },
        {
          factor: `Mars in ${marsP?.sign} (${marsP?.house}th House)`,
          influence: "Powers your momentum when you genuinely believe in the vision.",
        },
        {
          factor: `Saturn in ${saturnP?.sign}`,
          influence: "Invites you to build steady systems rather than rushing temporary shortcuts.",
        },
      ],
      plainLanguageExplanation: `In your chart, having your Sun in ${sunP?.sign} means work feels best when it reflects who you are. With Mars in ${marsP?.sign}, your momentum comes from believing in the outcome. When you feel uninspired, you may simply be executing someone else's template rather than putting your personal stamp on the project.`,
      harmonicInteraction: `Your Mars in ${marsP?.sign} wants to move fast on instinct, while your Saturn in ${saturnP?.sign} asks for patient groundwork. The sweet spot is taking steady daily steps without waiting for perfect conditions.`,
      strengths: [
        `Natural creative confidence and clear vision rooted in ${sunP?.sign}`,
        `Decisive problem-solving drive supported by ${marsP?.sign}`,
        `Capacity to build enduring projects that stand the test of time`,
      ],
      challenges: [
        `Impatience with administrative delays that temporarily slow creative flow`,
        `Mistaking a necessary season of consolidation for a lack of progress`,
      ],
      timingContext:
        "Work, visibility, or the direction of your everyday routine may feel especially important right now. Organizing your systems now sets you up for what's coming.",
      reflectionPrompt:
        "If you knew this current season was quietly building your foundation for what's next, what one habit would you refine today?",
    };
  }

  if (trimmedQ.includes("love") || trimmedQ.includes("relationship") || trimmedQ.includes("partner") || trimmedQ.includes("intimacy")) {
    return {
      category: "Love & Relationships",
      question,
      directAnswer: `With Venus in ${venusP?.sign} in your ${venusP?.house}th House and Moon in ${moonP?.sign}, you look for connections that offer emotional safety combined with mutual curiosity.`,
      chartFactors: [
        {
          factor: `Venus in ${venusP?.sign} (${venusP?.house}th House)`,
          influence: "Seeks partners who expand your perspective while protecting your vulnerability.",
        },
        {
          factor: `Moon in ${moonP?.sign} (${moonP?.house}th House)`,
          influence: "Looks for steady ground, emotional consistency, and reliable peace.",
        },
        {
          factor: `${user.risingSign} Rising (how you meet the world)`,
          influence: "Protects a tender interior behind an observant, discerning presence.",
        },
      ],
      plainLanguageExplanation: `Your chart shows that superficial banter gets boring quickly. You probably remember a late-night conversation about fears and dreams far longer than a loud night out. Your Moon in ${moonP?.sign} likes to know where you stand before fully letting down your guard.`,
      harmonicInteraction: `When your rising sign feels comfortable and your Venus feels cherished, you offer profound loyalty and warmth. If uncertainty appears, your instinct may be to step back into quiet observation.`,
      strengths: [
        `Deep relational loyalty and intuitive emotional radar`,
        `Ability to create a comforting, grounded sanctuary with someone you trust`,
        `Genuine capacity to hold space for others without rushing them`,
      ],
      challenges: [
        `Holding back your tender needs out of fear of appearing demanding`,
        `Absorbing the emotional temperature of the room instead of keeping your own boundary`,
      ],
      timingContext:
        "Current planetary movements support honest, grounded conversations and clarifying what you truly want from partnerships.",
      reflectionPrompt:
        "What tender thought or boundary have you hesitated to share out of concern for how it might be received?",
    };
  }

  // General Self & Life Crossroads
  return {
    category: category || "Self & Life Direction",
    question,
    directAnswer: `You are in a meaningful window of internal alignment—reconnecting with your ${sunP?.sign} core vision while honoring your ${moonP?.sign} Moon's need for grounded rest.`,
    chartFactors: [
      {
        factor: `${sunP?.sign} Sun & ${moonP?.sign} Moon`,
        influence: "The dynamic creator anchored by a steady need for emotional comfort.",
      },
      {
        factor: `${user.risingSign} Rising (how you meet the world)`,
        influence: "Provides an instinctual radar for authenticity and perceptive presence.",
      },
      {
        factor: `Saturn in ${saturnP?.sign}`,
        influence: "Builds quiet resilience and durable inner strength over time.",
      },
    ],
    plainLanguageExplanation: `Your chart balances outward creative expression (${sunP?.sign} Sun) with an instinctual need for quiet replenishment (${moonP?.sign} Moon). When both your ambition and your rest are given room, your next steps feel straightforward and natural.`,
    harmonicInteraction: `Part of you may want momentum while another part asks for steady groundwork. Allowing ideas to settle naturally brings genuine clarity.`,
    strengths: [
      `Intuitive discernment backed by practical common sense`,
      `Resilience in the face of uncertainty and quiet self-sovereignty`,
      `Creative capacity to turn lived experience into meaningful insight`,
    ],
    challenges: [
      `Judging yourself during quiet periods meant for rest`,
      `Holding onto old expectations that no longer match who you are becoming`,
    ],
    timingContext:
      "Active seasonal shifts encourage clearing clutter, refining daily routines, and setting focused intentions for the coming weeks.",
    reflectionPrompt:
      "What old expectation about who you 'should' be are you finally ready to set down in peace?",
  };
}
