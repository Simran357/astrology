export interface HouseLifeArea {
  houseNumber: number;
  domain: "love" | "career" | "emotions" | "money" | "communication" | "growth";
  domainLabel: string;
  domainBadge: string;
  badgeColor: string;
  badgeBg: string;
  simpleTitle: string;
  plainSummary: string;
  realLifeQuestions: string[];
}

export const HOUSE_LIFE_AREAS: Record<number, HouseLifeArea> = {
  1: {
    houseNumber: 1,
    domain: "emotions",
    domainLabel: "Identity & Physical Self",
    domainBadge: "⚡ Self & Vitality",
    badgeColor: "#f5d77f",
    badgeBg: "rgba(245, 215, 127, 0.12)",
    simpleTitle: "Your Personal Energy & How You Meet the World",
    plainSummary:
      "This house controls your physical vitality, your direct personal presence, and how you naturally protect your energy when entering any room.",
    realLifeQuestions: [
      "How do you instinctually react when meeting someone new?",
      "Where do you draw the line between being yourself and pleasing others?",
    ],
  },
  2: {
    houseNumber: 2,
    domain: "money",
    domainLabel: "Money & Self-Worth",
    domainBadge: "💰 Money & Stability",
    badgeColor: "#8feaff",
    badgeBg: "rgba(143, 234, 255, 0.12)",
    simpleTitle: "Your Personal Finances, Income & Material Security",
    plainSummary:
      "This house directly impacts how you earn money, what you need to feel financially secure, and how much you value your own time and talent.",
    realLifeQuestions: [
      "What gives you a genuine feeling of financial safety?",
      "Do you charge or accept what you are truly worth?",
    ],
  },
  3: {
    houseNumber: 3,
    domain: "communication",
    domainLabel: "Mind & Daily Voice",
    domainBadge: "🗣️ Voice & Mind",
    badgeColor: "#6ee7b7",
    badgeBg: "rgba(110, 231, 183, 0.12)",
    simpleTitle: "How You Think, Talk, and Process Information",
    plainSummary:
      "This house governs your everyday communication, conversations with friends, learning style, and how honest you are with your words.",
    realLifeQuestions: [
      "Do you speak up right away or overthink until the moment passes?",
      "How easily do you express your immediate thoughts?",
    ],
  },
  4: {
    houseNumber: 4,
    domain: "emotions",
    domainLabel: "Emotions & Private Roots",
    domainBadge: "🌊 Emotional Sanctuary",
    badgeColor: "#c7d2fe",
    badgeBg: "rgba(199, 210, 254, 0.12)",
    simpleTitle: "Your Deep Emotions, Family Roots & Home Sanctuary",
    plainSummary:
      "This house governs what you feel when the door closes and nobody is watching. It rules your emotional foundation, family past, and need for a safe sanctuary.",
    realLifeQuestions: [
      "What kind of space does your nervous system need to fully decompress?",
      "How much does your home environment affect your daily mood?",
    ],
  },
  5: {
    houseNumber: 5,
    domain: "love",
    domainLabel: "Love, Romance & Joy",
    domainBadge: "❤️ Romance & Spark",
    badgeColor: "#f472b6",
    badgeBg: "rgba(244, 114, 182, 0.12)",
    simpleTitle: "Dating, Romance, Pleasure & Creative Passion",
    plainSummary:
      "This is your primary house of dating, butterflies, creative projects, and the fun things you do simply because they make you feel happy and alive.",
    realLifeQuestions: [
      "What brings the spark back into your romantic life?",
      "Are you allowing yourself time to play without feeling guilty?",
    ],
  },
  6: {
    houseNumber: 6,
    domain: "career",
    domainLabel: "Daily Work & Habits",
    domainBadge: "💼 Daily Work & Health",
    badgeColor: "#8feaff",
    badgeBg: "rgba(143, 234, 255, 0.12)",
    simpleTitle: "Your Day-to-Day Job, Routines & Physical Well-being",
    plainSummary:
      "This house rules the practical work you do every day, your workplace environment, to-do lists, and keeping your body and nervous system healthy.",
    realLifeQuestions: [
      "Is your daily routine nourishing you or draining your fuel?",
      "How do you handle workplace stress and demanding workloads?",
    ],
  },
  7: {
    houseNumber: 7,
    domain: "love",
    domainLabel: "Committed Love & Marriage",
    domainBadge: "💍 Committed Love & Bonds",
    badgeColor: "#f472b6",
    badgeBg: "rgba(244, 114, 182, 0.12)",
    simpleTitle: "Long-Term Partnerships, Marriage & Deep 1-on-1 Bonds",
    plainSummary:
      "This is the cornerstone house for serious love. It reveals what you look for in a life partner, how you handle commitment, and what makes you stay.",
    realLifeQuestions: [
      "What does true equality and emotional reciprocity look like for you?",
      "What kind of person makes you feel safe enough to lower your guard?",
    ],
  },
  8: {
    houseNumber: 8,
    domain: "love",
    domainLabel: "Intimacy, Trust & Shared Wealth",
    domainBadge: "🔒 Deep Intimacy & Trust",
    badgeColor: "#c084fc",
    badgeBg: "rgba(192, 132, 252, 0.12)",
    simpleTitle: "Vulnerability, Deep Trust, Secrets & Shared Finances",
    plainSummary:
      "This house rules deep emotional intimacy: what happens after you fall in love. It controls trust, shared money, psychological truth, and letting someone see your raw side.",
    realLifeQuestions: [
      "How easily do you trust someone with your secrets or finances?",
      "Can you let yourself be emotionally seen without pulling away?",
    ],
  },
  9: {
    houseNumber: 9,
    domain: "growth",
    domainLabel: "Higher Wisdom & Travel",
    domainBadge: "🧭 Life Vision & Growth",
    badgeColor: "#fbbf24",
    badgeBg: "rgba(251, 191, 36, 0.12)",
    simpleTitle: "Your Big-Picture Vision, Travel & Philosophy",
    plainSummary:
      "This house pulls you toward higher meaning, long-distance travel, spiritual studies, and expanding beyond the routines you've outgrown.",
    realLifeQuestions: [
      "What belief or life vision keeps you hopeful when things get hard?",
      "Where are you feeling called to learn or explore next?",
    ],
  },
  10: {
    houseNumber: 10,
    domain: "career",
    domainLabel: "Career, Ambition & Calling",
    domainBadge: "👑 Career & Life Purpose",
    badgeColor: "#f5d77f",
    badgeBg: "rgba(245, 215, 127, 0.12)",
    simpleTitle: "Your Life Calling, Career Ambition & Public Reputation",
    plainSummary:
      "This is the highest point of your chart. It impacts your career accomplishments, your leadership drive, how the public views your work, and the legacy you leave behind.",
    realLifeQuestions: [
      "What do you want to be recognized and respected for?",
      "Are you building a career that matches your personal standards?",
    ],
  },
  11: {
    houseNumber: 11,
    domain: "growth",
    domainLabel: "Friendships & Belonging",
    domainBadge: "🤝 Friends & Community",
    badgeColor: "#38bdf8",
    badgeBg: "rgba(56, 189, 248, 0.12)",
    simpleTitle: "Your Social Circle, Chosen Family & Future Dreams",
    plainSummary:
      "This house impacts the friendships you keep, the communities where you feel you belong, and your biggest dreams for the future.",
    realLifeQuestions: [
      "Do your friends celebrate your growth or try to keep you small?",
      "What collective cause or community inspires you most?",
    ],
  },
  12: {
    houseNumber: 12,
    domain: "emotions",
    domainLabel: "Subconscious & Solitude",
    domainBadge: "🌙 Inner Healing & Rest",
    badgeColor: "#a78bda",
    badgeBg: "rgba(167, 139, 218, 0.12)",
    simpleTitle: "Your Subconscious Mind, Quiet Retreat & Letting Go",
    plainSummary:
      "This house rules what is hidden beneath the surface: your dreams, subconscious patterns, need for solitude, and letting go of old emotional baggage.",
    realLifeQuestions: [
      "Do you give yourself permission to rest without feeling guilty?",
      "What old emotional pattern are you finally ready to release?",
    ],
  },
};

/**
 * Returns a crystal-clear, plain English explanation of how a specific planet
 * in a specific house directly impacts that life area.
 */
export function getPlanetHouseRealLifeImpact(
  planet: string,
  house: number,
  sign: string
): {
  headline: string;
  lifeDomain: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  plainEnglishExplanation: string;
  howItShowsUpDaily: string;
} {
  const houseInfo = HOUSE_LIFE_AREAS[house] || HOUSE_LIFE_AREAS[1];
  const p = planet.toLowerCase();

  let plainEnglish = "";
  let howDaily = "";

  if (p === "sun") {
    plainEnglish = `Your Sun (core identity & confidence) is sitting in your ${house} House (${houseInfo.simpleTitle}). This means your primary sense of purpose and vitality is concentrated directly in ${houseInfo.domainLabel.toLowerCase()}. You feel most confident and alive when you have personal control and creative pride in this area.`;
    howDaily = `When your ${houseInfo.domainLabel.toLowerCase()} is thriving, your whole energy feels light and confident. If something feels stuck here, it hits your self-esteem much harder than you usually admit to others.`;
  } else if (p === "moon") {
    plainEnglish = `Your Moon (emotions, gut instincts & sanctuary) is sitting in your ${house} House (${houseInfo.simpleTitle}). This means your inner emotional peace and moods are deeply tied to ${houseInfo.domainLabel.toLowerCase()}. This is where you are most sensitive, intuitive, and protective.`;
    howDaily = `You react with your gut here before you have time to explain why with logic. You need genuine emotional safety in this part of life to relax your nervous system.`;
  } else if (p === "venus") {
    plainEnglish = `Your Venus (love, attraction, harmony & values) is in your ${house} House (${houseInfo.simpleTitle}). This planet brings warmth, affection, and a craving for genuine beauty to ${houseInfo.domainLabel.toLowerCase()}. This is where you naturally attract support and where you seek deep harmony.`;
    howDaily = `You cannot tolerate cold, transactional, or aggressive behavior here. You need this part of your life to feel respectful, kind, and emotionally nourishing.`;
  } else if (p === "mars") {
    plainEnglish = `Your Mars (drive, ambition, fire & courage) is placed in your ${house} House (${houseInfo.simpleTitle}). This is where you put your fighter energy, passion, and determination. You do not like being told what to do in this area of life.`;
    howDaily = `You have strong momentum here, but you can also get frustrated quickly if people move too slow or try to stand in your way. You fight hard for what you want here.`;
  } else if (p === "mercury") {
    plainEnglish = `Your Mercury (mind, conversations & decisions) is in your ${house} House (${houseInfo.simpleTitle}). Your mental focus is constantly analyzing, organizing, and finding smart solutions for ${houseInfo.domainLabel.toLowerCase()}.`;
    howDaily = `You ask questions, notice small inconsistencies, and want honest communication in this area. You do not like vague promises or guessing games here.`;
  } else if (p === "jupiter") {
    plainEnglish = `Your Jupiter (luck, expansion & wisdom) blesses your ${house} House (${houseInfo.simpleTitle}). This is where doors naturally open for you when you stay generous, optimistic, and true to your values.`;
    howDaily = `You have natural resilience here. Even after setbacks in this part of life, you find a way to bounce back with greater perspective.`;
  } else if (p === "saturn") {
    plainEnglish = `Your Saturn (lessons, discipline, patience & mastery) sits in your ${house} House (${houseInfo.simpleTitle}). This is where life asks you to build with patience, learn from hard experiences, and become exceptionally capable over time.`;
    howDaily = `Things may have felt delayed or heavy here early on, making you feel you had to carry too much responsibility alone. But what you build here will last for decades.`;
  } else if (p === "uranus") {
    plainEnglish = `Your Uranus (originality, sudden shifts & freedom) is in your ${house} House (${houseInfo.simpleTitle}). You refuse to follow traditional templates in ${houseInfo.domainLabel.toLowerCase()}. You need freedom to do things your own way.`;
    howDaily = `If someone tries to trap you in arbitrary rules here, you rebel. You thrive on fresh ideas and unexpected breakthroughs in this part of life.`;
  } else if (p === "neptune") {
    plainEnglish = `Your Neptune (dreams, intuition & empathy) softens your ${house} House (${houseInfo.simpleTitle}). You bring deep imagination, spiritual devotion, and sensitivity to this area of life.`;
    howDaily = `Be careful of seeing what you wish were true rather than what is actually there. When you keep healthy boundaries, your intuition here is remarkable.`;
  } else if (p === "pluto") {
    plainEnglish = `Your Pluto (deep transformation, power & rebirth) resides in your ${house} House (${houseInfo.simpleTitle}). This is where you experience life-altering shifts, shed old skins, and reclaim your deepest personal authority.`;
    howDaily = `You don't do superficial half-measures here. You demand complete authenticity, and you have survived deep challenges here that made you far stronger.`;
  } else {
    plainEnglish = `Your ${planet} in the ${house} House directly influences your ${houseInfo.domainLabel.toLowerCase()} (${houseInfo.simpleTitle}). It shapes how you navigate this core area of daily life.`;
    howDaily = `You will notice this energy whenever you have to make an important choice regarding ${houseInfo.domainLabel.toLowerCase()}.`;
  }

  return {
    headline: `${planet} in House ${house}: Direct Impact on ${houseInfo.domainLabel}`,
    lifeDomain: houseInfo.domainLabel,
    badge: houseInfo.domainBadge,
    badgeColor: houseInfo.badgeColor,
    badgeBg: houseInfo.badgeBg,
    plainEnglishExplanation: plainEnglish,
    howItShowsUpDaily: howDaily,
  };
}
