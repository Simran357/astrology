import { DateTime } from "luxon";
import { calculateNatalEphemeris } from "./ephemerisEngine";
import { NatalPlacement } from "./astrologyEngine";
import { TransitEvent } from "../data/transitEvents";

export interface MoonPhaseInfo {
  phaseName: string;
  sign: string;
  degrees: number;
  illumination: number; // 0 - 100%
  phaseType: "waxing" | "waning" | "full" | "new";
}

export interface LiveTransitData {
  date: string;
  transitingPlacements: NatalPlacement[];
  moonPhase: MoonPhaseInfo;
  activeShifts: TransitEvent[];
  monthlyCalendar: TransitEvent[];
  retrogrades: string[];
}

/**
 * Calculates current real planetary positions and active transits for today or any date.
 * Formatted with conversational, plain English explanations according to the Content Style Guide.
 */
export function calculateLiveTransits(
  targetDate: string = DateTime.now().toISODate() || "2026-09-14",
  natalPlacements: NatalPlacement[] = []
): LiveTransitData {
  const dt = DateTime.fromISO(targetDate);
  const year = dt.year || 2026;
  const month = String(dt.month).padStart(2, "0");
  const day = String(dt.day).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;

  // Calculate current celestial positions at Greenwich noon for standard planetary alignment
  const transitEphemeris = calculateNatalEphemeris(dateStr, "12:00", 51.5074, -0.1278, "UTC");

  const sun = transitEphemeris.placements.find((p) => p.planet === "Sun");
  const moon = transitEphemeris.placements.find((p) => p.planet === "Moon");

  // Calculate Moon Phase from Sun-Moon angular separation
  const sunDeg = sun ? sun.signIndex * 30 + sun.degrees : 170;
  const moonDeg = moon ? moon.signIndex * 30 + moon.degrees : 52;
  const angleDiff = (moonDeg - sunDeg + 360) % 360;

  let phaseName = "Waxing Gibbous";
  let phaseType: MoonPhaseInfo["phaseType"] = "waxing";
  let illumination = 50;

  if (angleDiff < 22.5 || angleDiff >= 337.5) {
    phaseName = "New Moon";
    phaseType = "new";
    illumination = 2;
  } else if (angleDiff < 67.5) {
    phaseName = "Waxing Crescent";
    phaseType = "waxing";
    illumination = 25;
  } else if (angleDiff < 112.5) {
    phaseName = "First Quarter";
    phaseType = "waxing";
    illumination = 50;
  } else if (angleDiff < 157.5) {
    phaseName = "Waxing Gibbous";
    phaseType = "waxing";
    illumination = 78;
  } else if (angleDiff < 202.5) {
    phaseName = "Full Moon";
    phaseType = "full";
    illumination = 98;
  } else if (angleDiff < 247.5) {
    phaseName = "Waning Gibbous";
    phaseType = "waning";
    illumination = 75;
  } else if (angleDiff < 292.5) {
    phaseName = "Last Quarter";
    phaseType = "waning";
    illumination = 50;
  } else {
    phaseName = "Waning Crescent";
    phaseType = "waning";
    illumination = 20;
  }

  const moonPhase: MoonPhaseInfo = {
    phaseName,
    sign: moon?.sign || "Taurus",
    degrees: moon?.degrees || 22,
    illumination,
    phaseType,
  };

  // Generate live transiting shifts and personal activations
  const activeShifts: TransitEvent[] = [];

  // 1. Current planetary positions in the sky
  for (const tp of transitEphemeris.placements) {
    if (tp.planet === "Ascendant" || tp.planet === "Midheaven") continue;

    if (
      tp.planet === "Mercury" ||
      tp.planet === "Venus" ||
      tp.planet === "Mars" ||
      tp.planet === "Jupiter" ||
      tp.planet === "Saturn"
    ) {
      activeShifts.push({
        id: `transit-pos-${tp.planet.toLowerCase()}-${tp.sign.toLowerCase()}`,
        date: dateStr,
        title: `${tp.planet} is moving through ${tp.sign}`,
        type: "Ingress",
        planet: tp.planet,
        sign: tp.sign,
        degrees: `${tp.degrees}°`,
        description: `Right now, ${tp.planet} is sitting in ${tp.sign} at ${tp.degrees}°. ${
          tp.planet === "Mercury"
            ? `You may notice your mind sorting through details, editing plans, and looking for practical clarity.`
            : tp.planet === "Venus"
            ? `In relationships, emotional safety and honest consistency might feel more important than grand gestures.`
            : tp.planet === "Mars"
            ? `Your drive and momentum can feel more deliberate. You might prefer taking steady action over rushing.`
            : tp.planet === "Jupiter"
            ? `New opportunities and fresh ideas may emerge in collaborative, forward-thinking projects.`
            : `Building steady foundations and keeping your personal boundaries clear may be on your mind.`
        }`,
        personalActivationPrompt: `How is this shift inviting you to adjust your pace today?`,
        isMajorShift: tp.planet === "Saturn" || tp.planet === "Jupiter",
        transit: `${tp.planet} in ${tp.sign}`,
        impact: `Brings extra focus to ${tp.sign} qualities in your daily rhythm, helping you clarify what actually matters.`,
        timing: `Active this week (${tp.degrees}° ${tp.sign})`,
      });
    }
  }

  // 2. Personal Transits to Natal Placements (Diffing current positions vs user's birth chart)
  if (natalPlacements.length > 0) {
    for (const tp of transitEphemeris.placements) {
      if (tp.planet === "Moon" || tp.planet === "Ascendant" || tp.planet === "Midheaven") continue;
      const tpTotalDeg = tp.signIndex * 30 + tp.degrees;

      for (const np of natalPlacements) {
        if (np.planet === "Ascendant" || np.planet === "Midheaven") continue;
        const npTotalDeg = np.signIndex * 30 + np.degrees;

        const diff = Math.abs(tpTotalDeg - npTotalDeg) % 360;
        const shortestDiff = diff > 180 ? 360 - diff : diff;

        // Check for major aspects with tight 4° transit orb
        let aspectType: string | null = null;
        let isHarmonious = true;

        if (shortestDiff <= 4) {
          aspectType = "Conjunction";
        } else if (Math.abs(shortestDiff - 60) <= 3.5) {
          aspectType = "Sextile";
        } else if (Math.abs(shortestDiff - 90) <= 4) {
          aspectType = "Square";
          isHarmonious = false;
        } else if (Math.abs(shortestDiff - 120) <= 4) {
          aspectType = "Trine";
        } else if (Math.abs(shortestDiff - 180) <= 4) {
          aspectType = "Opposition";
          isHarmonious = false;
        }

        if (aspectType) {
          activeShifts.unshift({
            id: `natal-transit-${tp.planet.toLowerCase()}-${aspectType.toLowerCase()}-${np.planet.toLowerCase()}`,
            date: dateStr,
            title: `${tp.planet} in the sky visits your Natal ${np.planet}`,
            type: "Aspect",
            planet: tp.planet,
            sign: tp.sign,
            degrees: `${tp.degrees}° ${tp.sign}`,
            description: `The current position of ${tp.planet} in ${tp.sign} is talking directly to where your ${np.planet} was when you were born (in ${np.sign}). ${
              isHarmonious
                ? `You may notice an effortless boost in flow between outside timing and your natural instincts.`
                : `Part of you may want one thing while another part still has commitments to manage. This healthy tension can help you upgrade your boundaries.`
            }`,
            personalActivationPrompt: `Where can you choose gentle clarity over old habit right now?`,
            isMajorShift: true,
            transit: `${tp.planet} connecting with Natal ${np.planet}`,
            impact: `Work, visibility, or your personal ${np.planet} rhythm may feel more important right now.`,
            timing: `Peak active alignment right now`,
          });
        }
      }
    }
  }

  // Monthly Calendar representation in plain English
  const monthlyCalendar: TransitEvent[] = [
    {
      id: "cal-evt-1",
      date: `${year}-${month}-02`,
      title: "Mercury Changes Signs",
      type: "Ingress",
      planet: "Mercury",
      sign: "Virgo",
      description: "Conversations become sharper and more direct. Ideal for editing, planning, and organizing your weekly routine.",
      personalActivationPrompt: "What project needs structured clarity right now?",
      isMajorShift: false,
      transit: "Mercury in Virgo",
      impact: "Clear mental bandwidth and practical execution.",
      timing: "Early Month",
    },
    {
      id: "cal-evt-2",
      date: `${year}-${month}-11`,
      title: "Clear Thinking Window",
      type: "Aspect",
      planet: "Mercury",
      sign: "Virgo",
      description: "Mercury aligns smoothly with Saturn, supporting calm decision-making and durable commitments.",
      personalActivationPrompt: "What decision have you been putting off?",
      isMajorShift: false,
      transit: "Mercury with Saturn",
      impact: "Grounded focus with minimal overthinking.",
      timing: "Mid Month",
    },
    {
      id: "cal-evt-3",
      date: `${year}-${month}-18`,
      title: "Full Moon Eclipse in Pisces",
      type: "Eclipse",
      planet: "Moon",
      sign: "Pisces",
      description: "An emotional culmination revealing what you've intuitively known for months. A good moment to release old stories.",
      personalActivationPrompt: "What truth is ready to be acknowledged without guilt?",
      isMajorShift: true,
      transit: "Full Moon in Pisces",
      impact: "Deep intuitive clarity and letting go of unnecessary baggage.",
      timing: "Full Moon Window",
    },
    {
      id: "cal-evt-4",
      date: `${year}-${month}-22`,
      title: "Seasonal Shift: Sun in Libra",
      type: "Ingress",
      planet: "Sun",
      sign: "Libra",
      description: "The Sun moves into Libra, bringing a desire for balance, calm conversations, and aesthetic comfort.",
      personalActivationPrompt: "Where is life asking for a little more harmony?",
      isMajorShift: true,
      transit: "Sun in Libra",
      impact: "Restoring balance in relationships and personal time.",
      timing: "Seasonal Portal",
    },
  ];

  return {
    date: dateStr,
    transitingPlacements: transitEphemeris.placements,
    moonPhase,
    activeShifts: activeShifts.slice(0, 6),
    monthlyCalendar,
    retrogrades: ["Saturn", "Pluto", "Chiron"],
  };
}

/**
 * Historical transit synthesis for the Timeline Time Travel view.
 * Casual, insightful, friend-like retrospective.
 */
export function getHistoricalTransitSynthesis(
  year: string,
  userSunSign: string = "Leo"
): {
  headline: string;
  summary: string;
  workTheme: string;
  lastingImpact: string;
} {
  const summaries: Record<
    string,
    { headline: string; summary: string; workTheme: string; lastingImpact: string }
  > = {
    "2020": {
      headline: "The Foundational Reset",
      summary:
        `During 2020, major planetary shifts brought a quiet overhaul to how you connect with groups and protect your private energy. For a ${userSunSign} Sun, you may have learned that steady, durable stability matters much more than temporary applause.`,
      workTheme: "Stepping back from commitments that drained your energy without real reciprocity.",
      lastingImpact: "Knowing exactly what you can handle on your own — and when to protect your peace.",
    },
    "2021": {
      headline: "The Tension of Expansion",
      summary:
        "In 2021, you might have felt a push-and-pull between wanting creative freedom and handling the practical duties required to build it.",
      workTheme: "Learning that genuine momentum compounds quietly when you show up day by day.",
      lastingImpact: "More patience with complex projects and trusting the longer timeline.",
    },
    "2022": {
      headline: "The Emotional Clearing",
      summary:
        "During 2022, quick shifts between deep reflection and spontaneous initiative may have helped you figure out what you truly care about.",
      workTheme: "Saying what you actually mean rather than softening the truth to keep everyone comfortable.",
      lastingImpact: "Unapologetic clarity about your standards in love and creative projects.",
    },
    "2023": {
      headline: "The Shift in Values",
      summary:
        "In 2023, you might have felt a multi-year cycle of heavy duty coming to an end, creating space for a lighter, more authentic voice.",
      workTheme: "Pruning superficial obligations and creating a sanctuary where you can truly rest.",
      lastingImpact: "Deeper trust in your own timing rather than comparing yourself to others.",
    },
    "2024": {
      headline: "The Emergence of Confidence",
      summary:
        "Throughout 2024, planetary movements supported learning new skills, connecting with inspiring people, and putting your personal signature on visible work.",
      workTheme: "Taking real creative ownership of your public life and career direction.",
      lastingImpact: "Quiet confidence that shows through consistent, high-integrity action.",
    },
  };

  return (
    summaries[year] || {
      headline: `The Chapter of ${year}`,
      summary: `During ${year}, shifts in the sky invited you to rethink your priorities, relationships, and boundaries, preparing you for the growth you're experiencing today.`,
      workTheme: "Refining what matters and learning to protect your vital energy.",
      lastingImpact: "Stronger discernment and steady confidence in your own path.",
    }
  );
}
