export interface TransitEvent {
  id: string;

  date: string; // ISO date string YYYY-MM-DD

  title: string;

  type: "Moon" | "Ingress" | "Station" | "Aspect" | "Eclipse";

  planet: string;

  sign?: string;

  degrees?: string;

  description: string;

  personalActivationPrompt: string;

  isMajorShift: boolean;

  transit?: string;

  impact?: string;

  timing?: string;
}

export interface CalendarEvent extends TransitEvent {}

export const ASTROLOGY_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "evt-1",
    date: "2026-09-02",
    title: "Mercury enters Virgo",
    type: "Ingress",
    planet: "Mercury",
    sign: "Virgo",

    description:
      "You may find yourself wanting to get your life a little more together around this time. Conversations can feel clearer, your mind may be more focused, and even small things you've been putting off can suddenly feel easier to deal with. It's a good moment to clean up your routine and make things simpler.",

    personalActivationPrompt:
      "What's one thing in your daily life that has been unnecessarily complicated lately?",

    isMajorShift: false,

    transit: "Mercury in Virgo",

    impact:
      "You may feel more focused, practical, and ready to sort out things that have been sitting in the background.",

    timing: "Sep 2 – Sep 21",
  },

  {
    id: "evt-2",
    date: "2026-09-08",
    title: "Venus trine Saturn",
    type: "Aspect",
    planet: "Venus",
    sign: "Scorpio",

    description:
      "Something in your relationships may start feeling more serious — but in a good way. You may care less about dramatic words and more about whether someone's actions actually match what they say. If there's someone important in your life, this can be a good time to notice what feels genuinely stable.",

    personalActivationPrompt:
      "Who has been showing you through their actions that they can actually be trusted?",

    isMajorShift: false,

    transit: "Venus trine Saturn",

    impact:
      "Relationships can feel steadier, more honest, and easier to judge by actions rather than promises.",

    timing: "Active this week",
  },

  {
    id: "evt-3",
    date: "2026-09-11",
    title: "Mercury trine Saturn",
    type: "Aspect",
    planet: "Mercury",
    sign: "Virgo",

    description:
      "This is one of those moments where a conversation can actually lead somewhere. If you've been going back and forth about a decision, plan, message, or difficult conversation, you may suddenly know what you want to say. Less overthinking, more 'okay, this is what I'm going to do.'",

    personalActivationPrompt:
      "What conversation or decision have you been thinking about for too long?",

    isMajorShift: false,

    transit: "Mercury trine Saturn",

    impact:
      "You may find it easier to think clearly, communicate seriously, and finally make a decision.",

    timing: "Today · Peak influence",
  },

  {
    id: "evt-4",
    date: "2026-09-14",
    title: "Mars enters Capricorn",
    type: "Ingress",
    planet: "Mars",
    sign: "Capricorn",

    description:
      "Your energy may start feeling more controlled and purposeful. Instead of wanting everything to happen immediately, you may become much more willing to work quietly toward something that matters to you. This is less about a sudden burst of motivation and more about actually sticking with it.",

    personalActivationPrompt:
      "What goal would genuinely change your life if you stayed consistent with it for the next few months?",

    isMajorShift: true,

    transit: "Mars in Capricorn",

    impact:
      "You may become more disciplined, patient, and serious about turning a long-term goal into something real.",

    timing: "Sep 14 – Oct 24",
  },

  {
    id: "evt-5",
    date: "2026-09-17",
    title: "Full Moon Eclipse in Pisces",
    type: "Eclipse",
    planet: "Moon",
    sign: "Pisces",
    degrees: "25°",

    description:
      "Something you've been feeling for a while may finally become impossible to ignore. You could get clarity about a person, situation, creative idea, or emotional pattern that has been sitting in the background. Don't be surprised if you suddenly realize, 'Okay... now I understand why this has been bothering me.'",

    personalActivationPrompt:
      "What feeling or situation have you been trying not to look at too closely?",

    isMajorShift: true,

    transit: "Full Moon Eclipse",

    impact:
      "An emotional situation may reach a turning point, bringing clarity, closure, or a strong realization.",

    timing: "Sep 17 · Major Shift",
  },

  {
    id: "evt-6",
    date: "2026-09-22",
    title: "Sun enters Libra",
    type: "Ingress",
    planet: "Sun",
    sign: "Libra",

    description:
      "Your attention may shift toward relationships, teamwork, and the balance between what you want and what other people need. You may notice where you've been doing too much, compromising too much, or expecting too much — and start wanting things to feel more equal.",

    personalActivationPrompt:
      "Where have you been giving more than you're getting back?",

    isMajorShift: true,

    transit: "Sun in Libra",

    impact:
      "Relationships and one-to-one connections may become much more important to you.",

    timing: "Sep 22 – Oct 22",
  },

  {
    id: "evt-7",
    date: "2026-09-26",
    title: "New Moon in Libra",
    type: "Moon",
    planet: "Moon",
    sign: "Libra",
    degrees: "3°",

    description:
      "A fresh start may be opening up around relationships and the way you connect with people. You may decide that you're no longer interested in repeating the same dynamic and want something healthier, calmer, or more mutual this time.",

    personalActivationPrompt:
      "What would a healthier, more balanced relationship look like for you now?",

    isMajorShift: false,

    transit: "New Moon in Libra",

    impact:
      "A new chapter can begin around relationships, collaboration, communication, or personal boundaries.",

    timing: "Sep 26",
  },

  {
    id: "evt-8",
    date: "2026-09-29",
    title: "Saturn turns Direct in Pisces",
    type: "Station",
    planet: "Saturn",
    sign: "Pisces",

    description:
      "Something you've been quietly thinking about for months may finally be ready to move forward. A boundary you knew you needed, a responsibility you've been avoiding, or a decision you've been sitting with can start becoming much more concrete.",

    personalActivationPrompt:
      "What's something you've known you needed to change but kept postponing?",

    isMajorShift: true,

    transit: "Saturn Direct",

    impact:
      "You may feel ready to turn an internal realization into an actual decision, boundary, or next step.",

    timing: "Sep 29",
  },
];

export const TRANSIT_EVENTS: TransitEvent[] = ASTROLOGY_CALENDAR_EVENTS;