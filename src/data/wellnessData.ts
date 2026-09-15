import React from "react";

export interface Affirmation {
  id: string;

  category: "daily" | "career" | "love" | "healing" | "courage";

  // User-facing affirmation.
  text: string;

  // Internal context used by the interpretation/personalization layer.
  insightContext: string;

  // Internal personalization metadata.
  focusPlanet: string;
}

export interface SoundscapeTrack {
  id: string;

  // User-facing title.
  title: string;

  // User-facing description.
  description: string;

  mood: "Grounded" | "Calm" | "Reflective" | "Energized" | "Open";

  duration: string;

  // Internal audio configuration.
  baseFreq: number;
  harmonicFreq: number;
  modulationSpeed: number;

  // Internal metadata.
  element?: "Earth" | "Water" | "Fire" | "Air" | "Cosmos";
}

export interface Insight {
  id: string;

  category:
    | "love"
    | "career"
    | "self"
    | "social"
    | "emotional"
    | "timing";

  // Short, emotionally interesting title.
  headline: string;

  // First thing the user sees.
  opening: string;

  // Main conversational interpretation.
  interpretation: string;

  // Possible ways the theme may show up.
  possibilities: string[];

  // Reflection question.
  reflection: string;

  intensity: "soft" | "moderate" | "intense";

  // Internal astrology metadata.
  focusPlanet?: string;
  transit?: string;
}

/* =========================================================
   AFFIRMATIONS
   ========================================================= */

export const AFFIRMATIONS_DATA: Affirmation[] = [
  {
    id: "aff-1",
    category: "daily",

    text:
      "You don't have to make yourself easier to understand. Be honest, say what you mean, and let people who care meet you halfway.",

    insightContext:
      "You may be becoming more intentional with your words. Instead of explaining yourself repeatedly, you're learning when a conversation is worth your energy and when silence says enough.",

    focusPlanet: "Mercury",
  },

  {
    id: "aff-2",
    category: "career",

    text:
      "You do not need the whole plan before you begin. Start with what is in front of you. Clarity often arrives after the first real step.",

    insightContext:
      "Your ambition may be becoming more focused. You may care less about proving that you're capable and more about building something that actually teaches you, challenges you, or feels like yours.",

    focusPlanet: "Mars",
  },

  {
    id: "aff-3",
    category: "love",

    text:
      "You should not have to earn someone's consistency. The right connection will not leave you constantly wondering where you stand.",

    insightContext:
      "You may be noticing the difference between attention and genuine presence. This can change what you are willing to accept, especially when someone's words and actions don't line up.",

    focusPlanet: "Venus",
  },

  {
    id: "aff-4",
    category: "healing",

    text:
      "You can love what something meant to you and still know that it is time to leave it behind.",

    insightContext:
      "Something from the past may be easier to look at now without becoming completely consumed by it. Revisiting an old feeling can sometimes mean you're finally strong enough to release it.",

    focusPlanet: "Moon",
  },

  {
    id: "aff-5",
    category: "courage",

    text:
      "You are allowed to become someone your old life would not recognize. You do not need permission to grow.",

    insightContext:
      "You may feel less willing to shape yourself around everyone else's expectations. Being authentic can start to matter more than being universally approved of.",

    focusPlanet: "Sun",
  },
];

/* =========================================================
   INSIGHTS
   ========================================================= */

export const INSIGHTS_DATA: Insight[] = [
  {
    id: "love-unfinished",
    category: "love",

    headline: "Something still feels unfinished.",

    opening:
      "You may think you've moved on, but a small part of you could still be waiting for something to finally make sense.",

    interpretation:
      "Sometimes you don't actually miss the person. You miss the possibility, the version of yourself that existed around them, or the answer you never got. That's why something old can suddenly feel emotionally present again even after a long time.",

    possibilities: [
      "An old connection may come back into your thoughts unexpectedly.",
      "A current relationship could become more emotionally honest.",
      "You may finally stop giving energy to something that has kept you uncertain.",
    ],

    reflection:
      "If they came back tomorrow, would you actually want them — or would you want the clarity you never got?",

    intensity: "intense",
    focusPlanet: "Venus",
  },

  {
    id: "love-mixed-signals",
    category: "love",

    headline: "You're getting tired of guessing.",

    opening:
      "There comes a point when mixed signals stop feeling exciting and start feeling exhausting.",

    interpretation:
      "You may be reaching a stage where attention alone is not enough. You want consistency. You want to know where you stand without decoding every message, delay, mood change, or sudden burst of interest.",

    possibilities: [
      "A connection may become clearer through one honest conversation.",
      "Someone may realize that they have to show more effort to keep you close.",
      "You may decide that uncertainty itself is telling you something.",
    ],

    reflection:
      "Are you actually confused about what they feel, or are you waiting for their actions to contradict what they've already shown you?",

    intensity: "intense",
    focusPlanet: "Venus",
  },

  {
    id: "love-new-energy",
    category: "love",

    headline: "Your standards are quietly changing.",

    opening:
      "The things that used to make you excited may not have the same pull anymore.",

    interpretation:
      "Your idea of attraction can change when emotional safety starts mattering just as much as chemistry. You may still want intensity, but you may no longer want to confuse intensity with instability.",

    possibilities: [
      "A calmer connection may suddenly become more attractive.",
      "Someone who once had a strong hold on you may feel less important.",
      "You may become much more selective about who gets emotional access to you.",
    ],

    reflection:
      "Do you want a connection that gives you butterflies, or one that lets you breathe?",

    intensity: "moderate",
    focusPlanet: "Venus",
  },

  {
    id: "self-restless",
    category: "self",

    headline: "You need movement, not more thinking.",

    opening:
      "There is a restless part of you that may be getting tired of sitting around trying to figure everything out.",

    interpretation:
      "You may want to change your routine, go somewhere new, start something, meet people, or simply get out of the same environment. Sometimes your mind doesn't need another answer. It needs an experience.",

    possibilities: [
      "You may feel unusually motivated to begin something new.",
      "A change of environment could affect your mood more than expected.",
      "You may become less patient with situations that keep you feeling stuck.",
    ],

    reflection:
      "What would you do this week if you stopped waiting to feel completely ready?",

    intensity: "moderate",
    focusPlanet: "Mars",
  },

  {
    id: "self-authentic",
    category: "self",

    headline: "You're becoming harder to impress.",

    opening:
      "Not because you've become colder. You're just starting to care more about what feels real.",

    interpretation:
      "You may be losing interest in performing a version of yourself that keeps everyone comfortable. The need for approval can still be there, but it may not have the same control over you anymore.",

    possibilities: [
      "You may find it easier to say no.",
      "You could become more selective about who gets your time.",
      "A decision you've been avoiding may suddenly feel much simpler.",
    ],

    reflection:
      "If nobody could judge your choice, what would you actually choose?",

    intensity: "moderate",
    focusPlanet: "Sun",
  },

  {
    id: "emotional-release",
    category: "emotional",

    headline: "Something you've been carrying is getting lighter.",

    opening:
      "You may not notice the change immediately, but something that used to hit you hard may not have the same power anymore.",

    interpretation:
      "Healing is not always dramatic. Sometimes it looks like remembering something without needing to relive it. Caring about someone without needing them back. Missing an old life without wanting to return to it.",

    possibilities: [
      "An old emotional trigger may start losing some of its intensity.",
      "You may finally understand why something affected you so deeply.",
      "You could feel ready to close a chapter without getting the perfect ending.",
    ],

    reflection:
      "What are you still waiting for the past to give you that you could give yourself now?",

    intensity: "soft",
    focusPlanet: "Moon",
  },

  {
    id: "career-momentum",
    category: "career",

    headline: "You're ready for something more real.",

    opening:
      "You may be getting less satisfied with simply being busy. You want to feel like you're actually going somewhere.",

    interpretation:
      "There can be a stronger need to build something tangible now — something that gives you proof of your own growth. You may feel more motivated when you can see the result of your effort instead of collecting tasks, promises, or plans.",

    possibilities: [
      "You may feel pulled toward work that gives you more ownership.",
      "A career decision could become easier once you focus on what you'll actually learn.",
      "You may lose interest in opportunities that sound impressive but don't help you grow.",
    ],

    reflection:
      "What would make you look back six months from now and think, 'Okay, I actually grew'?",

    intensity: "moderate",
    focusPlanet: "Mars",
  },

  {
    id: "career-confidence",
    category: "career",

    headline: "You're closer than you think.",

    opening:
      "The frustrating part is that you may notice everything you still don't know instead of everything you've already learned.",

    interpretation:
      "Growth can feel uncomfortable when your standards rise faster than your confidence. You may compare yourself with people who seem further ahead, while forgetting that your current stage is not supposed to look finished yet.",

    possibilities: [
      "A difficult task may show you that you're more capable than you expected.",
      "Someone could recognize your ability before you fully recognize it yourself.",
      "A period of uncertainty may push you to strengthen one skill that changes your direction.",
    ],

    reflection:
      "If you measured yourself by how far you've come instead of how far you still have to go, would you feel differently?",

    intensity: "soft",
    focusPlanet: "Saturn",
  },

  {
    id: "social-boundaries",
    category: "social",

    headline: "Not everyone needs access to you.",

    opening:
      "You may be realizing that being available to everyone does not automatically make you a better friend, partner, or person.",

    interpretation:
      "Your energy has limits. You may start noticing who leaves you feeling understood and who leaves you feeling drained, confused, or like you have to perform.",

    possibilities: [
      "You may naturally become quieter around certain people.",
      "One friendship could become deeper while another becomes more distant.",
      "You may stop chasing people who rarely meet you halfway.",
    ],

    reflection:
      "Who makes you feel like yourself instead of someone you have to manage?",

    intensity: "moderate",
    focusPlanet: "Mercury",
  },

  {
    id: "timing-patience",
    category: "timing",

    headline: "Not everything needs to happen right now.",

    opening:
      "You might want an answer immediately because waiting can feel worse than uncertainty.",

    interpretation:
      "But some situations become clearer when you stop pushing them. Give people room to show you who they are. Give opportunities time to reveal what they actually are worth. You do not always need to make the next move.",

    possibilities: [
      "A situation may reveal more through someone's actions than their words.",
      "Something you're waiting for could develop more slowly than expected.",
      "Stepping back may give you information that chasing never could.",
    ],

    reflection:
      "What if you stopped trying to control the outcome and simply watched what happens next?",

    intensity: "soft",
    focusPlanet: "Saturn",
  },

  {
    id: "timing-turning-point",
    category: "timing",

    headline: "Something is starting to shift.",

    opening:
      "It may not look dramatic from the outside yet, but internally you're not in exactly the same place you were a few weeks ago.",

    interpretation:
      "Change often begins as a feeling before it becomes an event. You may notice yourself wanting different things, reacting differently, or losing interest in situations you once tolerated.",

    possibilities: [
      "A decision you've postponed could become easier.",
      "A new person, opportunity, or environment may change your perspective.",
      "Something familiar may stop feeling like the right fit.",
    ],

    reflection:
      "What has been feeling different lately that you haven't really admitted to yourself yet?",

    intensity: "intense",
    focusPlanet: "Sun",
  },
];

/* =========================================================
   SOUNDSCAPES
   =========================================================
   User-facing copy describes the experience rather than making
   unsupported claims about specific frequencies.
   ========================================================= */

export const SOUNDSCAPES_DATA: SoundscapeTrack[] = [
  {
    id: "late-night-thoughts",

    title: "Late Night Thoughts",

    description:
      "A slow, spacious soundscape for when your head feels busy and you want everything to feel a little quieter.",

    mood: "Reflective",

    duration: "Ambient loop",

    baseFreq: 108,
    harmonicFreq: 432,
    modulationSpeed: 0.1,

    element: "Cosmos",
  },

  {
    id: "let-it-be-quiet",

    title: "Let It Be Quiet",

    description:
      "Soft, flowing tones for moments when you don't need an answer — you just need some room to breathe.",

    mood: "Calm",

    duration: "Ambient loop",

    baseFreq: 132,
    harmonicFreq: 528,
    modulationSpeed: 0.15,

    element: "Water",
  },

  {
    id: "come-back-to-yourself",

    title: "Come Back to Yourself",

    description:
      "Low, steady tones for when you've been overthinking everything and want to feel more present in the moment.",

    mood: "Grounded",

    duration: "Ambient loop",

    baseFreq: 87,
    harmonicFreq: 174,
    modulationSpeed: 0.08,

    element: "Earth",
  },

  {
    id: "do-something-with-it",

    title: "Do Something With It",

    description:
      "A warmer, brighter soundscape for getting out of your head and back into motion.",

    mood: "Energized",

    duration: "Ambient loop",

    baseFreq: 213,
    harmonicFreq: 639,
    modulationSpeed: 0.25,

    element: "Fire",
  },

  {
    id: "open-window",

    title: "Open the Window",

    description:
      "Light, airy tones for clearing your head and making a little space for a new perspective.",

    mood: "Open",

    duration: "Ambient loop",

    baseFreq: 144,
    harmonicFreq: 396,
    modulationSpeed: 0.18,

    element: "Air",
  },
];