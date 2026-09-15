export interface PlanetaryShiftEvent {
  id: string;
  planet: string;
  symbol: string;
  themeCategory: "love" | "career" | "emotions" | "growth";
  categoryBadge: string;
  badgeColor: string;
  headline: string;
  timing: string;
  // 1. Where it was and the problems/feelings you had
  pastPhase: {
    pastHouse: string;
    pastSign: string;
    whatWasHappening: string;
    problemsYouFelt: string;
    whyItFeltHard: string;
  };
  // 2. Where it is shifting now
  currentShift: {
    currentHouse: string;
    currentSign: string;
    shiftDirection: string;
    plainEnglishShift: string;
  };
  // 3. What you can expect to feel next
  whatToExpectNext: {
    whatYouWillFeel: string;
    concreteSigns: string[];
    adviceForYou: string;
  };
}

export const TRANSIT_SHIFTS_DATA: PlanetaryShiftEvent[] = [
  {
    id: "shift-saturn",
    planet: "Saturn",
    symbol: "♄",
    themeCategory: "career",
    categoryBadge: "💼 Career, Work & Life Direction",
    badgeColor: "#f5d77f",
    headline: "Saturn's Shift: Heavy Burnout Giving Way to Real Craft & Structure",
    timing: "Active Shift · Unfolding over the coming months",
    pastPhase: {
      pastHouse: "4th & 5th Houses (Inner Rest & Creative Pressure)",
      pastSign: "Pisces",
      whatWasHappening:
        "Over the past period, Saturn was testing your emotional foundation and creative energy. You were carrying responsibilities behind closed doors that nobody saw.",
      problemsYouFelt:
        "You likely felt mentally exhausted, second-guessed whether your hard work was paying off, or felt lonely even around people. You were tired of giving so much energy with very little visible return.",
      whyItFeltHard:
        "Saturn felt like an invisible weight on your chest, forcing you to face emotional habits and boundaries you had avoided for years.",
    },
    currentShift: {
      currentHouse: "Moving toward your 6th & 10th Houses of Purpose & Execution",
      currentSign: "Aries / Pioneer Ground",
      shiftDirection: "From emotional isolation to direct, visible career building",
      plainEnglishShift:
        "The heavy internal fog is lifting. The planet of discipline is now demanding that you stop over-functioning for other people and channel your energy strictly into your own craft, work routine, and ambitions.",
    },
    whatToExpectNext: {
      whatYouWillFeel:
        "You will notice a sudden loss of patience for messy work environments or jobs that waste your time. You will feel a strong hunger for practical order, clear deadlines, and projects where you have real authority.",
      concreteSigns: [
        "Cutting out daily distractions and building a cleaner work routine",
        "Saying 'no' to unpaid emotional labor or extra tasks without hesitation",
        "Getting recognized or promoted because your consistency is undeniable",
      ],
      adviceForYou:
        "Don't rush to take on 5 new projects at once. Pick the ONE professional goal that matters most and build it brick by brick.",
    },
  },
  {
    id: "shift-venus-mars",
    planet: "Venus & Mars",
    symbol: "♀ ♂",
    themeCategory: "love",
    categoryBadge: "❤️ Love, Relationships & Intimacy",
    badgeColor: "#f472b6",
    headline: "Love & Partnership Shift: Ending Mixed Signals to Invite Real Reciprocity",
    timing: "Next 4 to 6 Weeks",
    pastPhase: {
      pastHouse: "12th & 8th Houses (Hidden Doubts & Emotional Hesitation)",
      pastSign: "Water & Shadow Ground",
      whatWasHappening:
        "In relationships, you were dealing with quiet uncertainties, unspoken words, or feeling like you were the only one trying to maintain the emotional bridge.",
      problemsYouFelt:
        "You felt confused by hot-and-cold behavior. A small part of you kept hoping someone would change or finally give you clarity, but the waiting only left you anxious and second-guessing your own worth.",
      whyItFeltHard:
        "You were emotionally absorbing everyone else's moods while keeping your own needs completely bottled up.",
    },
    currentShift: {
      currentHouse: "Shifting directly across your 1st & 7th House axis of Partnership",
      currentSign: "Direct, Honest Air & Fire",
      shiftDirection: "From silent overthinking to bold emotional honesty",
      plainEnglishShift:
        "The planets of attraction and courage are moving into your relationship houses. The era of guessing where you stand is officially over.",
    },
    whatToExpectNext: {
      whatYouWillFeel:
        "You will find it surprisingly easy to speak your truth without apologizing. You will crave relationships where communication is effortless and people show up consistently without you having to ask.",
      concreteSigns: [
        "Losing all interest in people who send mixed signals or play games",
        "Feeling a renewed personal glow and magnetic confidence in dating",
        "Having one deeply honest conversation that clears up weeks of tension",
      ],
      adviceForYou:
        "You do not have to beg for consistency. If someone wants to be in your life with respect, they will make it obvious.",
    },
  },
  {
    id: "shift-jupiter",
    planet: "Jupiter",
    symbol: "♃",
    themeCategory: "growth",
    categoryBadge: "💰 Money, Abundance & Expansion",
    badgeColor: "#8feaff",
    headline: "Jupiter's Expansion: Moving from Financial Scarcity to Long-Term Flow",
    timing: "Now through Late 2026",
    pastPhase: {
      pastHouse: "1st & 2nd Transition (Identity Rebirth)",
      pastSign: "Taurus / Gemini",
      whatWasHappening:
        "You spent the last year questioning your direction and worrying about whether you had enough financial or personal security to take a leap.",
      problemsYouFelt:
        "Unexpected expenses, delayed payments, or feeling stuck in low-paying situations made you feel like you were running on a financial treadmill without making headway.",
      whyItFeltHard:
        "You were being forced to learn that clinging to false security out of fear prevents you from stepping into what you are actually capable of creating.",
    },
    currentShift: {
      currentHouse: "Moving into your 2nd & 3rd Houses of Resources & Voice",
      currentSign: "Cancer / Water Sanctuary",
      shiftDirection: "From penny-pinching anxiety to trusting your earning power",
      plainEnglishShift:
        "Jupiter, the planet of abundance and good fortune, is opening doors around your earning potential, communication skills, and personal offerings.",
    },
    whatToExpectNext: {
      whatYouWillFeel:
        "A quiet, steady optimism is returning. You will see unexpected opportunities to monetize your skills, negotiate better rates, or launch an idea that people are genuinely eager to support.",
      concreteSigns: [
        "A surprise financial opening, client, or career bonus",
        "Realizing that your knowledge and time are worth significantly more",
        "Feeling safe enough to invest in your comfort and your future",
      ],
      adviceForYou:
        "Do not shrink your prices or downplay your experience. When Jupiter expands your house of value, you have to be willing to receive.",
    },
  },
  {
    id: "shift-pluto",
    planet: "Pluto",
    symbol: "♇",
    themeCategory: "emotions",
    categoryBadge: "🌊 Inner Healing, Mind & Subconscious",
    badgeColor: "#c084fc",
    headline: "Pluto's Generation Shift: Releasing Ancient Fears to Reclaim Your Power",
    timing: "Major 20-Year Paradigm Shift",
    pastPhase: {
      pastHouse: "Capricorn / Ancient Patriarchal Structures",
      pastSign: "Earth & Heavy Obligation",
      whatWasHappening:
        "For years, you operated under the heavy belief that you had to endure hardship, suffer silently, or follow someone else's strict hierarchy to earn respect.",
      problemsYouFelt:
        "Deep imposter syndrome, fear of stepping out of line, staying in suffocating situations because you feared the unknown, and emotional burnout.",
      whyItFeltHard:
        "Pluto systematically broke down old institutions and habits that were built on control rather than authentic truth.",
    },
    currentShift: {
      currentHouse: "Settling into Aquarius (Innovation & Truth)",
      currentSign: "Aquarius / Open Sky",
      shiftDirection: "From rigid survival mode to liberated personal sovereignty",
      plainEnglishShift:
        "Pluto is fundamentally rewriting your subconscious fears. You are no longer willing to trade your peace of mind for external approval.",
    },
    whatToExpectNext: {
      whatYouWillFeel:
        "A profound lightness. You will look at things that used to trigger anxiety and realize they no longer have any power over you. You are choosing peace over proving yourself.",
      concreteSigns: [
        "Walking away from drama or toxic dynamics without needing the last word",
        "Radical clarity about who you are and what you stand for",
        "Trusting your own intuition above any external authority figure",
      ],
      adviceForYou:
        "Let the old version of yourself rest with gratitude. You don't live in that survival mode anymore.",
    },
  },
];
