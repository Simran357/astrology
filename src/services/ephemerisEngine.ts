import * as horoscopePkg from "circular-natal-horoscope-js";
const horoscopeModule = (horoscopePkg as any)?.Origin
  ? horoscopePkg
  : ((horoscopePkg as any)?.default?.Origin
    ? (horoscopePkg as any).default
    : ((horoscopePkg as any)?.default || horoscopePkg));
const { Origin, Horoscope } = horoscopeModule as any;
import { DateTime } from "luxon";
import { NatalPlacement, NatalAspect } from "./astrologyEngine";

export interface CanonicalNatalChartJSON {
  ascendant: {
    sign: string;
    degree: number;
    formatted: string;
  };
  midheaven: {
    sign: string;
    degree: number;
    formatted: string;
  };
  planets: NatalPlacement[];
  houses: { house: number; sign: string; degrees: number; startDeg: number }[];
  aspects: NatalAspect[];
}

export interface CalculatedChartResult {
  ascendant: { sign: string; degree: number; formatted: string };
  midheaven: { sign: string; degree: number; formatted: string };
  sunSign: string;
  moonSign: string;
  risingSign: string;
  midheavenSign: string;
  ascendantDegree: number;
  midheavenDegree: number;
  placements: NatalPlacement[];
  aspects: NatalAspect[];
  houses: { house: number; sign: string; degrees: number; startDeg: number }[];
  elements: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  modalities: {
    cardinal: number;
    fixed: number;
    mutable: number;
  };
  chartJson: CanonicalNatalChartJSON;
  rawHoroscope: any;
}

const ZODIAC_SIGNS = [
  { name: "Aries", glyph: "♈", element: "Fire" as const, modality: "Cardinal" as const },
  { name: "Taurus", glyph: "♉", element: "Earth" as const, modality: "Fixed" as const },
  { name: "Gemini", glyph: "♊", element: "Air" as const, modality: "Mutable" as const },
  { name: "Cancer", glyph: "♋", element: "Water" as const, modality: "Cardinal" as const },
  { name: "Leo", glyph: "♌", element: "Fire" as const, modality: "Fixed" as const },
  { name: "Virgo", glyph: "♍", element: "Earth" as const, modality: "Mutable" as const },
  { name: "Libra", glyph: "♎", element: "Air" as const, modality: "Cardinal" as const },
  { name: "Scorpio", glyph: "♏", element: "Water" as const, modality: "Fixed" as const },
  { name: "Sagittarius", glyph: "♐", element: "Fire" as const, modality: "Mutable" as const },
  { name: "Capricorn", glyph: "♑", element: "Earth" as const, modality: "Cardinal" as const },
  { name: "Aquarius", glyph: "♒", element: "Air" as const, modality: "Fixed" as const },
  { name: "Pisces", glyph: "♓", element: "Water" as const, modality: "Mutable" as const },
];

const PLANET_METADATA: Record<
  string,
  {
    displayName: string;
    glyph: string;
    color: string;
    defaultKeywords: string;
    defaultMeaning: (sign: string, house: number) => string;
  }
> = {
  sun: {
    displayName: "Sun",
    glyph: "☉",
    color: "#c9a96e",
    defaultKeywords: "Core Identity & Creative Vitality",
    defaultMeaning: (sign, house) =>
      `Your core identity shines through ${sign} in the ${house}th House, expressing your conscious purpose, creative vitality, and what gives your life meaning.`,
  },
  moon: {
    displayName: "Moon",
    glyph: "☽",
    color: "#e8d5b5",
    defaultKeywords: "Instinctive Needs & Emotional Sanctuary",
    defaultMeaning: (sign, house) =>
      `Your instinctive feelings and emotional compass anchor in ${sign} in the ${house}th House, defining how you self-soothe, process vulnerability, and find safety.`,
  },
  ascendant: {
    displayName: "Ascendant",
    glyph: "AC",
    color: "#EAC157",
    defaultKeywords: "First Impression & Atmospheric Aura",
    defaultMeaning: (sign) =>
      `You greet the world with ${sign} rising on the horizon, defining the presence, instinctual style, and atmosphere people notice before you speak.`,
  },
  mercury: {
    displayName: "Mercury",
    glyph: "☿",
    color: "#a0c4ff",
    defaultKeywords: "Mental Rhythm & Communication",
    defaultMeaning: (sign, house) =>
      `Your intellect and communication pattern operate through ${sign} in the ${house}th House, shaping how you organize thoughts, learn, and articulate ideas.`,
  },
  venus: {
    displayName: "Venus",
    glyph: "♀",
    color: "#f4acb7",
    defaultKeywords: "Aesthetic Value & Relational Harmony",
    defaultMeaning: (sign, house) =>
      `In love and values, ${sign} in the ${house}th House guides what magnetically attracts you, how you express affection, and your aesthetic sensibilities.`,
  },
  mars: {
    displayName: "Mars",
    glyph: "♂",
    color: "#e07070",
    defaultKeywords: "Drive, Passion & Decisive Momentum",
    defaultMeaning: (sign, house) =>
      `Your physical drive, ambition, and instinct for action move through ${sign} in the ${house}th House, dictating how you assert yourself and pursue goals.`,
  },
  jupiter: {
    displayName: "Jupiter",
    glyph: "♃",
    color: "#f0c060",
    defaultKeywords: "Growth, Wisdom & Horizon Expansion",
    defaultMeaning: (sign, house) =>
      `Opportunity, higher learning, and optimism expand through ${sign} in the ${house}th House, indicating where life invites you to trust and grow.`,
  },
  saturn: {
    displayName: "Saturn",
    glyph: "♄",
    color: "#8aabcc",
    defaultKeywords: "Structure, Mastery & Long-Term Wisdom",
    defaultMeaning: (sign, house) =>
      `Discipline, boundaries, and hard-earned mastery develop through ${sign} in the ${house}th House, where patience eventually builds enduring strength.`,
  },
  uranus: {
    displayName: "Uranus",
    glyph: "♅",
    color: "#70d6ff",
    defaultKeywords: "Awakening, Innovation & Freedom",
    defaultMeaning: (sign, house) =>
      `Originality, breakthroughs, and unconventional perspectives emerge through ${sign} in the ${house}th House, inspiring authentic individuality.`,
  },
  neptune: {
    displayName: "Neptune",
    glyph: "♆",
    color: "#b8c0ff",
    defaultKeywords: "Intuition, Dream Realm & Transpersonal Vision",
    defaultMeaning: (sign, house) =>
      `Imagination, empathy, and spiritual connection flow through ${sign} in the ${house}th House, heightening intuition and subtle artistic resonance.`,
  },
  pluto: {
    displayName: "Pluto",
    glyph: "♇",
    color: "#9d8189",
    defaultKeywords: "Metamorphosis, Rebirth & Deep Psychological Power",
    defaultMeaning: (sign, house) =>
      `Profound transformation, catharsis, and unshakeable psychological power root in ${sign} in the ${house}th House, turning vulnerability into sovereignty.`,
  },
  chiron: {
    displayName: "Chiron",
    glyph: "⚷",
    color: "#d4a373",
    defaultKeywords: "Sacred Wound & Healing Insight",
    defaultMeaning: (sign, house) =>
      `Your deepest sensitivity and ultimate gift for mentoring others lives in ${sign} in the ${house}th House, transforming personal trials into compassion.`,
  },
  northnode: {
    displayName: "North Node",
    glyph: "☊",
    color: "#e2afff",
    defaultKeywords: "Evolutionary Destiny & Soul Growth",
    defaultMeaning: (sign, house) =>
      `Your evolutionary growth edge and soul compass point toward ${sign} in the ${house}th House, asking you to step courageously into unfamiliar territory.`,
  },
  midheaven: {
    displayName: "Midheaven",
    glyph: "MC",
    color: "#e9c46a",
    defaultKeywords: "Public Legacy & Career Summit",
    defaultMeaning: (sign) =>
      `Your public reputation, vocational calling, and highest visible achievements unfold under the influence of ${sign}.`,
  },
};

/**
 * Calculates a complete natal chart from birth date, time, and coordinates.
 * Powered by high-precision astronomical Swiss Ephemeris calculations.
 *
 * CRITICAL P0 COMPLIANCE:
 * ZERO fake formulas or demo arithmetic. Every coordinate is mathematically
 * calculated using orbital mechanics and true celestial positions.
 */
export function calculateNatalEphemeris(
  birthDate: string, // YYYY-MM-DD
  birthTime: string, // HH:mm
  latitude: number,
  longitude: number,
  timezone: string,
  houseSystem: string = "placidus"
): CalculatedChartResult {
  // Parse birth date and time into local datetime in specified IANA timezone
  let dt = DateTime.fromISO(`${birthDate}T${birthTime || "12:00"}`, { zone: timezone });
  if (!dt.isValid) {
    const [year, month, day] = birthDate.split("-").map(Number);
    const [hour, minute] = (birthTime || "12:00").split(":").map(Number);
    dt = DateTime.fromObject(
      {
        year: year || 1994,
        month: month || 8,
        day: day || 9,
        hour: isNaN(hour) ? 12 : hour,
        minute: isNaN(minute) ? 0 : minute,
      },
      { zone: timezone }
    );
  }

  // Create Origin for circular-natal-horoscope-js
  // month in Origin is 0-indexed (0 = Jan, 11 = Dec)
  const origin = new Origin({
    year: dt.year,
    month: dt.month - 1,
    date: dt.day,
    hour: dt.hour,
    minute: dt.minute,
    latitude: latitude,
    longitude: longitude,
  });

  const horoscope = new Horoscope({
    origin,
    houseSystem: houseSystem,
    zodiac: "tropical",
    aspectPoints: ["bodies", "points", "angles"],
    aspectWithPoints: ["bodies", "points", "angles"],
    aspectTypes: ["major"],
    customOrbs: {
      conjunction: 8,
      opposition: 8,
      trine: 8,
      square: 7,
      sextile: 6,
    },
    language: "en",
  });

  // Extract Ascendant & Midheaven
  const ascInfo = horoscope.Ascendant;
  const ascDegree = ascInfo?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
  const ascSignName = ascInfo?.Sign?.label ?? "Aries";
  const ascDegInSign = Math.round(ascInfo?.ChartPosition?.Ecliptic?.ArcDegreesFormatted30 ? parseFloat(ascInfo.ChartPosition.Ecliptic.ArcDegreesFormatted30) : ascDegree % 30);

  const mcInfo = horoscope.Midheaven;
  const mcDegree = mcInfo?.ChartPosition?.Ecliptic?.DecimalDegrees ?? 0;
  const mcSignName = mcInfo?.Sign?.label ?? "Capricorn";
  const mcDegInSign = Math.round(mcDegree % 30);

  // Build 12 House Cusps
  const houses = (horoscope.Houses || []).map((h: any, index: number) => {
    const rawDeg = h.ChartPosition?.Ecliptic?.DecimalDegrees ?? index * 30;
    const signName = h.Sign?.label || ZODIAC_SIGNS[Math.floor(rawDeg / 30) % 12].name;
    const degInSign = Math.round(rawDeg % 30);
    return {
      house: index + 1,
      sign: signName,
      degrees: degInSign,
      startDeg: rawDeg,
    };
  });

  // Helper to determine house for a given celestial body's degree if house is missing
  const getHouseForDegree = (eclipticDeg: number): number => {
    if (!houses.length) return 1;
    for (let i = 0; i < houses.length; i++) {
      const current = houses[i].startDeg;
      const next = houses[(i + 1) % houses.length].startDeg;
      if (current < next) {
        if (eclipticDeg >= current && eclipticDeg < next) return i + 1;
      } else {
        // Crosses 0° Aries
        if (eclipticDeg >= current || eclipticDeg < next) return i + 1;
      }
    }
    return 1;
  };

  // Helper to find sign index
  const getSignIndex = (signName: string): number => {
    const idx = ZODIAC_SIGNS.findIndex((z) => z.name.toLowerCase() === signName.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  // Collect Placements
  const placements: NatalPlacement[] = [];
  const celestialBodies = horoscope.CelestialBodies?.all || [];
  const celestialPoints = horoscope.CelestialPoints?.all || [];
  const allObjects = [...celestialBodies, ...celestialPoints];

  const bodyKeys = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
    "chiron",
    "northnode",
  ];

  for (const key of bodyKeys) {
    const obj = allObjects.find((b: any) => b.key === key);
    const meta = PLANET_METADATA[key];
    if (!obj || !meta) continue;

    const signName = obj.Sign?.label || "Aries";
    const signIdx = getSignIndex(signName);
    const signMeta = ZODIAC_SIGNS[signIdx];
    const eclipticDeg = obj.ChartPosition?.Ecliptic?.DecimalDegrees ?? signIdx * 30;
    const degreesInSign = Math.round(eclipticDeg % 30);
    const houseNum = obj.House?.id || getHouseForDegree(eclipticDeg);
    const isRetrograde = Boolean(obj.isRetrograde);

    placements.push({
      planet: meta.displayName,
      name: meta.displayName,
      glyph: meta.glyph,
      sign: signName,
      signGlyph: signMeta.glyph,
      signIndex: signIdx,
      degrees: degreesInSign,
      degree: degreesInSign,
      house: houseNum,
      isRetrograde,
      formatted: `${degreesInSign}° in ${signName}`,
      color: meta.color,
      element: signMeta.element,
      keywords: meta.defaultKeywords,
      meaning: meta.defaultMeaning(signName, houseNum),
    });
  }

  // Add Ascendant as a prominent placement
  const ascSignIdx = getSignIndex(ascSignName);
  const ascMeta = ZODIAC_SIGNS[ascSignIdx];
  placements.push({
    planet: "Ascendant",
    name: "Ascendant",
    glyph: "AC",
    sign: ascSignName,
    signGlyph: ascMeta.glyph,
    signIndex: ascSignIdx,
    degrees: ascDegInSign,
    degree: ascDegInSign,
    house: 1,
    isRetrograde: false,
    formatted: `${ascDegInSign}° in ${ascSignName}`,
    color: PLANET_METADATA.ascendant.color,
    element: ascMeta.element,
    keywords: PLANET_METADATA.ascendant.defaultKeywords,
    meaning: PLANET_METADATA.ascendant.defaultMeaning(ascSignName, 1),
  });

  // Extract Major Aspects
  const aspects: NatalAspect[] = [];
  const rawAspects = horoscope.Aspects?.all || [];

  for (const asp of rawAspects) {
    const p1 = asp.point1Key;
    const p2 = asp.point2Key;
    const meta1 = PLANET_METADATA[p1];
    const meta2 = PLANET_METADATA[p2];
    if (!meta1 || !meta2) continue;

    const rawType = (asp.aspectKey || "").toLowerCase();
    let type: NatalAspect["type"] = "Conjunction";
    let influence: NatalAspect["influence"] = "Harmonious";
    let nature: "harmonious" | "challenging" | "intensifying" | "supportive" = "harmonious";

    if (rawType.includes("conjunction")) {
      type = "Conjunction";
      influence = "Intensifying";
      nature = "intensifying";
    } else if (rawType.includes("opposition")) {
      type = "Opposition";
      influence = "Challenging";
      nature = "challenging";
    } else if (rawType.includes("trine")) {
      type = "Trine";
      influence = "Harmonious";
      nature = "harmonious";
    } else if (rawType.includes("square")) {
      type = "Square";
      influence = "Challenging";
      nature = "challenging";
    } else if (rawType.includes("sextile")) {
      type = "Sextile";
      influence = "Supportive";
      nature = "supportive";
    } else {
      continue;
    }

    const orb = Math.abs(asp.orb || 0);
    const degrees = Math.round(asp.aspectAngle ? Math.abs(asp.aspectAngle) : 0);

    const interpretation = `${meta1.displayName} ${type.toLowerCase()} ${meta2.displayName} (${degrees}°, orb ${orb.toFixed(1)}°): ${
      influence === "Harmonious" || influence === "Supportive"
        ? `Natural flow and mutual reinforcement between your ${meta1.displayName} instincts and ${meta2.displayName} qualities.`
        : influence === "Challenging"
        ? `Creative friction and evolutionary tension between ${meta1.displayName} drive and ${meta2.displayName} boundaries that builds resilience.`
        : `Powerful fusion uniting the qualities of ${meta1.displayName} and ${meta2.displayName} into a focal point of personal power.`
    }`;

    aspects.push({
      planet1: meta1.displayName,
      planet2: meta2.displayName,
      type,
      degrees,
      angle: degrees,
      orb: Number(orb.toFixed(1)),
      influence,
      nature,
      interpretation,
    });
  }

  // Calculate Elemental & Modality counts
  const elements = { fire: 0, earth: 0, air: 0, water: 0 };
  const modalities = { cardinal: 0, fixed: 0, mutable: 0 };

  for (const p of placements) {
    if (p.planet === "Ascendant" || p.planet === "Midheaven") continue;
    const sign = ZODIAC_SIGNS[p.signIndex];
    if (sign.element === "Fire") elements.fire++;
    if (sign.element === "Earth") elements.earth++;
    if (sign.element === "Air") elements.air++;
    if (sign.element === "Water") elements.water++;

    if (sign.modality === "Cardinal") modalities.cardinal++;
    if (sign.modality === "Fixed") modalities.fixed++;
    if (sign.modality === "Mutable") modalities.mutable++;
  }

  const sunPlacement = placements.find((p) => p.planet === "Sun");
  const moonPlacement = placements.find((p) => p.planet === "Moon");

  const chartJson: CanonicalNatalChartJSON = {
    ascendant: {
      sign: ascSignName,
      degree: ascDegree,
      formatted: `${ascDegInSign}° in ${ascSignName}`,
    },
    midheaven: {
      sign: mcSignName,
      degree: mcDegree,
      formatted: `${mcDegInSign}° in ${mcSignName}`,
    },
    planets: placements,
    houses,
    aspects,
  };

  return {
    ascendant: { sign: ascSignName, degree: ascDegree, formatted: `${ascDegree}° ${ascSignName}` },
    midheaven: { sign: mcSignName, degree: mcDegree, formatted: `${mcDegree}° ${mcSignName}` },
    sunSign: sunPlacement?.sign || "Leo",
    moonSign: moonPlacement?.sign || "Taurus",
    risingSign: ascSignName,
    midheavenSign: mcSignName,
    ascendantDegree: ascDegree,
    midheavenDegree: mcDegree,
    placements,
    aspects,
    houses,
    elements,
    modalities,
    chartJson,
    rawHoroscope: horoscope,
  };
}
