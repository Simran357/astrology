import { UserProfileData, NatalPlacement } from "./astrologyEngine";
import { LiveTransitData } from "./transitEngine";
import { HOUSE_LIFE_AREAS } from "../data/houseLifeAreas";

export interface AIResponse {
  text: string;
  consultedPlanets: string[];
  category: "love" | "career" | "emotions" | "timing" | "decisions" | "general";
  isApiGenerated?: boolean;
}

export interface AISettings {
  apiKey: string;
  provider: "builtin" | "openai" | "groq" | "openrouter";
  model: string;
}

const SETTINGS_STORAGE_KEY = "celeste_ai_settings";

export function getAISettings(): AISettings {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (_) {}

  // Check env variable fallbacks if present
  const envKey =
    import.meta.env.VITE_OPENAI_API_KEY ||
    import.meta.env.VITE_GROQ_API_KEY ||
    "";
  const envProvider = import.meta.env.VITE_GROQ_API_KEY ? "groq" : "openai";

  return {
    apiKey: envKey,
    provider: envKey ? envProvider : "builtin",
    model: envProvider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini",
  };
}

export function saveAISettings(settings: AISettings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (_) {}
}

/* -------------------------------------------------------------------------- */
/* Question Category Classification                                           */
/* -------------------------------------------------------------------------- */

interface QuestionContext {
  category: "love" | "career" | "emotions" | "timing" | "decisions" | "general";
  keywords: string[];
  subTheme: string;
}

function classifyQuestion(question: string): QuestionContext {
  const q = question.toLowerCase();

  // Love, Relationships & Difficult Bonds
  if (
    q.includes("them") ||
    q.includes("him") ||
    q.includes("her") ||
    q.includes("ex") ||
    q.includes("crush") ||
    q.includes("love") ||
    q.includes("relationship") ||
    q.includes("partner") ||
    q.includes("dating") ||
    q.includes("marriage") ||
    q.includes("text") ||
    q.includes("call") ||
    q.includes("miss") ||
    q.includes("silent") ||
    q.includes("ghost") ||
    q.includes("feelings") ||
    q.includes("cheating") ||
    q.includes("betray") ||
    q.includes("soft corner") ||
    q.includes("hurt") ||
    q.includes("heartbreak") ||
    q.includes("what they feel") ||
    q.includes("how they see me")
  ) {
    let subTheme = "connection_status";
    if (q.includes("soft corner") || q.includes("still have feelings") || q.includes("betray") || q.includes("cheating") || q.includes("heartbreak")) {
      subTheme = "betrayal_soft_corner";
    } else if (q.includes("what they feel") || q.includes("how they see me") || q.includes("person might feel")) {
      subTheme = "partner_perspective";
    } else if (q.includes("text") || q.includes("silent") || q.includes("reach out") || q.includes("ghost")) {
      subTheme = "unspoken_communication";
    } else if (q.includes("ex") || q.includes("miss") || q.includes("let go")) {
      subTheme = "past_attachment";
    } else if (q.includes("future") || q.includes("long term") || q.includes("marry")) {
      subTheme = "commitment_potential";
    }
    return { category: "love", keywords: ["love", "partner", "feelings"], subTheme };
  }

  // Emotions, Detachment, Suppression & Mental State
  if (
    q.includes("anxious") ||
    q.includes("anxiety") ||
    q.includes("overthink") ||
    q.includes("stress") ||
    q.includes("nervous") ||
    q.includes("panic") ||
    q.includes("overwhelm") ||
    q.includes("exhausted") ||
    q.includes("drained") ||
    q.includes("sad") ||
    q.includes("cry") ||
    q.includes("makes you cry") ||
    q.includes("alone") ||
    q.includes("lonely") ||
    q.includes("loneliness") ||
    q.includes("detach") ||
    q.includes("step back") ||
    q.includes("suppress") ||
    q.includes("react this way") ||
    q.includes("triggers") ||
    q.includes("comfort zone") ||
    q.includes("shine") ||
    q.includes("why do i feel")
  ) {
    let subTheme = "nervous_system";
    if (q.includes("detach") || q.includes("step back") || q.includes("react this way")) {
      subTheme = "detachment_defense";
    } else if (q.includes("suppress") || q.includes("alone") || q.includes("lonely") || q.includes("cry")) {
      subTheme = "emotional_suppression";
    } else if (q.includes("comfort zone") || q.includes("shine") || q.includes("step into")) {
      subTheme = "comfort_zone_shine";
    } else if (q.includes("overthink") || q.includes("head") || q.includes("racing") || q.includes("triggers")) {
      subTheme = "mental_loops";
    }
    return { category: "emotions", keywords: ["emotions", "nervous system", "inner world"], subTheme };
  }

  // Timing, Shifts & The Future
  if (
    q.includes("week") ||
    q.includes("month") ||
    q.includes("shift") ||
    q.includes("coming") ||
    q.includes("next") ||
    q.includes("transit") ||
    q.includes("cycle") ||
    q.includes("when will") ||
    q.includes("soon") ||
    q.includes("retrograde") ||
    q.includes("season") ||
    q.includes("eclipse")
  ) {
    return { category: "timing", keywords: ["timing", "cosmic shift", "transits"], subTheme: "transit_window" };
  }

  // Decisions & Dilemmas
  if (
    q.includes("should i") ||
    q.includes("decide") ||
    q.includes("decision") ||
    q.includes("choose") ||
    q.includes("stay or leave") ||
    q.includes("right choice") ||
    q.includes("what to do")
  ) {
    return { category: "decisions", keywords: ["decision", "crossroads", "gut instinct"], subTheme: "choice_point" };
  }

  return { category: "general", keywords: ["chart pattern", "life energy"], subTheme: "natal_resonance" };
}

/* -------------------------------------------------------------------------- */
/* External API LLM Consultation                                              */
/* -------------------------------------------------------------------------- */

async function queryExternalLLM(
  settings: AISettings,
  user: UserProfileData,
  liveTransits: LiveTransitData | null,
  question: string,
  history: Array<{ sender: "user" | "ai"; text: string }>
): Promise<string> {
  const placementsSummary = user.placements
    .map((p) => `${p.planet} in ${p.sign} (${p.degrees}°) in House ${p.house} [Element: ${p.element}]`)
    .join("; ");

  const aspectsSummary = user.aspects
    .map((a) => `${a.planet1} ${a.type} ${a.planet2} (${a.influence})`)
    .join("; ");

  const transitSummary = liveTransits
    ? `Moon Phase: ${liveTransits.moonPhase.phaseName} in ${liveTransits.moonPhase.sign}. Active Shifts: ${liveTransits.activeShifts
        .map((s) => `${s.title} (${s.date})`)
        .join(", ")}`
    : "Live transits active";

  const systemPrompt = `You are AstroFindings, a trusted, razor-sharp, compassionate astrological confidant.
You write in the style of Co-Star and Chani Nicholas: casual, observant, deeply personal, direct, and slightly suspenseful.
You are talking to ${user.name} like an emotionally intelligent friend who happens to know their complete celestial blueprint.

CRITICAL RULES:
1. Speak in plain English. No dense textbook astrology jargon without immediate everyday grounding.
2. ALWAYS ground your reading in ${user.name}'s actual placements and whole-sign houses:
   - Sun: ${user.sunSign}
   - Moon: ${user.moonSign}
   - Rising: ${user.risingSign}
   - Complete Placements: ${placementsSummary}
   - Key Aspects: ${aspectsSummary}
   - Current Sky Transits: ${transitSummary}
3. Specifically mention 1 to 3 relevant placements by name (e.g. "With your Moon in ${user.moonSign} in the 7th House..." or "Your Venus in ${user.placements.find((p) => p.planet === 'Venus')?.sign || 'its sign'}...") so the user immediately knows you have actually inspected their real chart.
4. Keep the tone authentic: 3 to 4 short, impactful paragraphs. Never sound generic. Be perceptive about the hidden truth or hesitation behind their question.
5. Offer grounded, relatable insight they can actually apply today.`;

  const messagesPayload = [
    { role: "system", content: systemPrompt },
    ...history.slice(-4).map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    })),
    { role: "user", content: question },
  ];

  let endpoint = "https://api.openai.com/v1/chat/completions";
  let authHeader = `Bearer ${settings.apiKey.trim()}`;

  if (settings.provider === "groq") {
    endpoint = "https://api.groq.com/openai/v1/chat/completions";
  } else if (settings.provider === "openrouter") {
    endpoint = "https://openrouter.ai/api/v1/chat/completions";
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      model: settings.model || "gpt-4o-mini",
      messages: messagesPayload,
      temperature: 0.8,
      max_tokens: 650,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `API error ${response.status}: ${response.statusText}`
    );
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error("No response returned by AI model.");
  }
  return reply.trim();
}

/* -------------------------------------------------------------------------- */
/* Built-in Deep Astrological Synthesis Engine                                */
/* -------------------------------------------------------------------------- */

function synthesizeAstrologicalReading(
  user: UserProfileData,
  liveTransits: LiveTransitData | null,
  question: string,
  context: QuestionContext
): AIResponse {
  const firstName = user.name ? user.name.split(" ")[0] : "friend";
  const { category, subTheme } = context;

  const sun = user.placements.find((p) => p.planet === "Sun");
  const moon = user.placements.find((p) => p.planet === "Moon");
  const rising = user.placements.find((p) => p.planet === "Rising" || p.planet === "Ascendant");
  const mercury = user.placements.find((p) => p.planet === "Mercury");
  const venus = user.placements.find((p) => p.planet === "Venus");
  const mars = user.placements.find((p) => p.planet === "Mars");
  const saturn = user.placements.find((p) => p.planet === "Saturn");
  const jupiter = user.placements.find((p) => p.planet === "Jupiter");

  const currentMoonSign = liveTransits?.moonPhase?.sign || "Scorpio";
  const currentMoonPhase = liveTransits?.moonPhase?.phaseName || "Waxing Moon";

  const consulted: string[] = [];

  /* ----------------------- 1. LOVE & RELATIONSHIPS ----------------------- */
  if (category === "love") {
    const vSign = venus?.sign || user.sunSign;
    const vHouse = venus?.house || 7;
    const mSign = moon?.sign || user.moonSign;
    const mHouse = moon?.house || 4;

    consulted.push(`♀ Venus in ${vSign} (House ${vHouse})`);
    consulted.push(`☽ Moon in ${mSign} (House ${mHouse})`);
    if (mars) consulted.push(`♂ Mars in ${mars.sign}`);

    const house7Area = HOUSE_LIFE_AREAS[7];

    let hook = `Let's be completely candid, ${firstName}. You're not asking because you're genuinely confused. You're asking because your gut already clocked the shift, but part of you is waiting for an outside confirmation so you don't feel foolish for feeling it so deeply.`;
    if (subTheme === "betrayal_soft_corner") {
      hook = `Why do you still hold a soft corner for someone who hurt or betrayed your trust, ${firstName}? Because in your chart, your devotion isn't a mechanical switch you can shut down when logic demands it. You don't just love people for how they behave; you see their unspoken wound, and that soft corner is your heart's refusal to become bitter.`;
    } else if (subTheme === "partner_perspective") {
      hook = `What does that person truly feel about you right now, ${firstName}? They felt the full weight of your presence, and when you stepped back into silence, it rattled them far deeper than any argument ever could. They know you gave them a rare, unguarded version of yourself.`;
    } else if (subTheme === "unspoken_communication") {
      hook = `That silence between you two isn't neutral, ${firstName}. In astrology, silence is always an active choice. When someone goes quiet, they're showing you where their capacity ends.`;
    } else if (subTheme === "past_attachment") {
      hook = `You don't just miss people, ${firstName} — you miss who you allowed yourself to be around them. When you let someone past your gate, their frequency lingers in your space long after the logic tells you to close the chapter.`;
    }

    const astrologicalAnalysis = `Look directly at your **Venus in ${vSign} in your ${vHouse}${getOrdinal(vHouse)} House** combined with your **${mSign} Moon**. In your chart, love isn't something you treat casually or keep at arm's length. You have an instinctual radar for emotional honesty. When someone behaves inconsistently or betrays your loyalty, your nervous system registers it days before your head finds the words. Your ${mSign} Moon quietly demands emotional reciprocity, while your Venus in ${vSign} refuses to settle for half-hearted breadcrumbs.`;

    const transitContext = `Right now, with the ${currentMoonPhase} passing through ${currentMoonSign}, the sky is spotlighting unresolved emotional boundaries. If you've been carrying the weight of maintaining this dynamic alone, this planetary transit is specifically asking you to pull your energy back to center with no guilt. Notice what happens when you stop doing all the emotional heavy lifting.`;

    const takeaway = `Stop rationalizing behavior you would never dish out yourself. Keeping a soft corner for someone does not mean leaving your door unlocked. Protect your peace first, honor what they did that made you cry, and let the chips fall where they actually belong.`;

    return {
      text: `${hook}\n\n${astrologicalAnalysis}\n\n${transitContext}\n\n${takeaway}`,
      consultedPlanets: consulted,
      category: "love",
    };
  }

  /* ----------------------- 2. CAREER & PURPOSE ----------------------- */
  if (category === "career") {
    const sSign = sun?.sign || user.sunSign;
    const sHouse = sun?.house || 10;
    const satSign = saturn?.sign || "Aries";
    const satHouse = saturn?.house || 6;
    const rSign = rising?.sign || user.risingSign;

    consulted.push(`☉ Sun in ${sSign} (House ${sHouse})`);
    consulted.push(`♄ Saturn in ${satSign} (House ${satHouse})`);
    if (rising) consulted.push(`↗ Rising in ${rSign}`);

    let hook = `You're not stuck because you lack ability, ${firstName}. You're stuck because you've outgrown the container you're currently working in, and staying comfortable is starting to feel more painful than taking the leap.`;
    if (subTheme === "financial_security") {
      hook = `Money anxiety for you isn't just about the balance sheet — it's about autonomy. You hate feeling dependent on systems or people whose standards don't match your own.`;
    } else if (subTheme === "career_stagnation") {
      hook = `You have this pattern where you quietly check out long before you physically leave. You've been operating on 40% battery because what you're doing right now doesn't ask enough of who you really are.`;
    }

    const astrologicalAnalysis = `Your **Sun in ${sSign} in the ${sHouse}${getOrdinal(sHouse)} House** needs ownership and genuine visibility, not robotic checklists. Meanwhile, your **Saturn in ${satSign}** acts as your inner taskmaster — it makes you feel like you have to over-prepare, over-qualify, and wait for external permission before you can claim what's next. With your **${rSign} Rising**, the world looks to you to initiate, not to stay trapped in someone else's safe mediocrity.`;

    const transitContext = `With the current cosmic shifts activating your chart's work and self-worth axis, the window of tolerating half-measures is closing. The universe doesn't reward overthinking; it rewards clear, bold, non-negotiable intent.`;

    const takeaway = `You already know what the next move is. Stop waiting for the fear to disappear before you act — the confidence only shows up after you take the first step. Pick one concrete project this week and bet completely on your own execution.`;

    return {
      text: `${hook}\n\n${astrologicalAnalysis}\n\n${transitContext}\n\n${takeaway}`,
      consultedPlanets: consulted,
      category: "career",
    };
  }

  /* ----------------------- 3. EMOTIONS, DETACHMENT & ANXIETY ----------------------- */
  if (category === "emotions") {
    const mSign = moon?.sign || user.moonSign;
    const mHouse = moon?.house || 12;
    const mercSign = mercury?.sign || user.sunSign;
    const mercHouse = mercury?.house || 3;
    const satSign = saturn?.sign || "Capricorn";

    consulted.push(`☽ Moon in ${mSign} (House ${mHouse})`);
    consulted.push(`☿ Mercury in ${mercSign} (House ${mercHouse})`);
    if (saturn) consulted.push(`♄ Saturn in ${satSign}`);
    if (sun) consulted.push(`☉ Sun in ${sun.sign}`);

    let hook = `This random heaviness isn't actually random, ${firstName}. You carry things quietly for days — absorbing other people's micro-reactions, holding back your own grievances, pretending you're totally unbothered — until your nervous system literally runs out of storage space.`;
    if (subTheme === "detachment_defense") {
      hook = `You don't step back into silence because you've stopped caring, ${firstName}. You detach because overthinking and anxiety push your emotional threshold past red line. In your chart, going cold and stepping back is the emergency brake your nervous system built so you don't get destroyed by heartbreak.`;
    } else if (subTheme === "emotional_suppression") {
      hook = `What makes you suppress yourself until you feel completely alone in the dark, ${firstName}? You learned early that your messy feelings made other people uncomfortable. So you became the anchor for everyone else while leaving yourself with no one to lean on.`;
    } else if (subTheme === "comfort_zone_shine") {
      hook = `Your comfort zone is keeping you safe from judgment, ${firstName}, but it is suffocating what makes you shine. You've convinced yourself that staying small prevents mistakes, but hiding your light is the most exhausting mistake you can make.`;
    }

    const astrologicalAnalysis = `Your **Mercury in ${mercSign} in House ${mercHouse}** gives you an intensely observant mind that loops through every detail and overthinks every word. When paired with your **${mSign} Moon in House ${mHouse}**, your immediate reaction to feeling overwhelmed or hurt is to swallow your words, suppress your tears, and retreat behind an impenetrable wall. You try to 'think' your way out of difficult emotions that simply require honest acknowledgment without guilt.`;

    const transitContext = `Today's celestial atmosphere, with ${currentMoonPhase} in ${currentMoonSign}, pulls deep subconscious tides to the surface. It is directly challenging your habit of isolating when things get tough. It's not a crisis; it's a physiological prompt asking you to drop the performance of invulnerability.`;

    const takeaway = `Stop punishing yourself for feeling deeply. Detachment was a survival skill in your past, but in your present, it only guarantees that you stay lonely. Step out of your comfort zone, let yourself feel what hurts without guilt, and speak the truth you've been swallowing.`;

    return {
      text: `${hook}\n\n${astrologicalAnalysis}\n\n${transitContext}\n\n${takeaway}`,
      consultedPlanets: consulted,
      category: "emotions",
    };
  }

  /* ----------------------- 4. TIMING & FUTURE SHIFTS ----------------------- */
  if (category === "timing") {
    const sSign = sun?.sign || user.sunSign;
    const mSign = moon?.sign || user.moonSign;
    const jupSign = jupiter?.sign || "Taurus";

    consulted.push(`☉ Sun in ${sSign}`);
    consulted.push(`☽ Moon in ${mSign}`);
    consulted.push(`♃ Jupiter in ${jupSign}`);
    consulted.push(`Current ${currentMoonPhase} in ${currentMoonSign}`);

    const hook = `The cosmic weather around you is shifting, ${firstName}, but not in the loud, chaotic way people usually expect. It's more like a subtle clearing of the fog — the things that drained you last month are about to lose their grip on your attention.`;

    const astrologicalAnalysis = `Your natal **Sun in ${sSign}** and **Moon in ${mSign}** are currently interacting with the transiting whole-sign axis of your chart. You are approaching a moment of decisive closure. Someone or something that took up enormous mental real estate over the last 6 months is about to recede into the background.`;

    const transitContext = `With the ${currentMoonPhase} in ${currentMoonSign}, expect a conversation or intuitive realization in the coming days where you finally stop bargaining with an old pattern. You will feel a distinct sense of: 'I'm done carrying this.'`;

    const takeaway = `Stay open to surprise invitations and unexpected impulses over the next 10 days. The universe is clearing the room so something far more aligned with your authentic frequency can finally enter.`;

    return {
      text: `${hook}\n\n${astrologicalAnalysis}\n\n${transitContext}\n\n${takeaway}`,
      consultedPlanets: consulted,
      category: "timing",
    };
  }

  /* ----------------------- 5. DECISIONS & GENERAL ----------------------- */
  const rSign = rising?.sign || user.risingSign;
  const sSign = sun?.sign || user.sunSign;
  const mSign = moon?.sign || user.moonSign;

  consulted.push(`↗ Rising in ${rSign}`);
  consulted.push(`☉ Sun in ${sSign}`);
  consulted.push(`☽ Moon in ${mSign}`);

  const hook = `Here is what your chart reveals about "${question}", ${firstName}: you already know the answer. You're not looking for information; you're looking for permission to trust what your instinct decided days ago.`;

  const astrologicalAnalysis = `Your **${rSign} Rising** gives you a sharp intuitive first instinct, but your **Sun in ${sSign}** and **Moon in ${mSign}** create an internal committee that interrogates every choice until the moment feels messy. You fear making the 'wrong' choice out loud, so you delay by gathering more opinions. But gathering more opinions only dilutes your own inner authority.`;

  const transitContext = `The sky right now is pushing for radical self-trust. Astrologically, the cleanest decision is always the one that makes your shoulders drop, even if it scares your ego.`;

  const takeaway = `Stop polling people who don't have to live with the consequences of your choices. Step into your center, make the call, and trust that your chart is built to handle whatever unfolds.`;

  return {
    text: `${hook}\n\n${astrologicalAnalysis}\n\n${transitContext}\n\n${takeaway}`,
    consultedPlanets: consulted,
    category: category as any,
  };
}

function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

/* -------------------------------------------------------------------------- */
/* Main Public Entrypoint                                                     */
/* -------------------------------------------------------------------------- */

export async function askAstrologyConsultant(
  user: UserProfileData,
  liveTransits: LiveTransitData | null,
  question: string,
  history: Array<{ sender: "user" | "ai"; text: string }> = []
): Promise<AIResponse> {
  const context = classifyQuestion(question);
  const settings = getAISettings();

  // If user configured an external AI API key, try live LLM generation first
  if (settings.apiKey && settings.apiKey.trim().length > 5 && settings.provider !== "builtin") {
    try {
      const llmReply = await queryExternalLLM(settings, user, liveTransits, question, history);
      return {
        text: llmReply,
        consultedPlanets: [
          `☉ Sun in ${user.sunSign}`,
          `☽ Moon in ${user.moonSign}`,
          `↗ ${user.risingSign} Rising`,
          `Live Planetary Ephemeris`,
        ],
        category: context.category,
        isApiGenerated: true,
      };
    } catch (err) {
      console.warn("External AI API failed, falling back to built-in astrological engine:", err);
      // Fallback seamlessly to the built-in synthesis engine below
    }
  }

  // Built-in Astrological Synthesis Engine (always available, ultra-accurate & personalized)
  return synthesizeAstrologicalReading(user, liveTransits, question, context);
}
