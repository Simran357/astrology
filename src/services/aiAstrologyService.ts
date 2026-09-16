import { UserProfileData, NatalPlacement, PersonProfile } from "./astrologyEngine";
import { LiveTransitData } from "./transitEngine";
import { HOUSE_LIFE_AREAS } from "../data/houseLifeAreas";
import type { StructuredAstrologyReading } from "../server/astrologyApiServer";

export type { StructuredAstrologyReading };

export interface AIResponse {
  text: string;
  consultedPlanets: string[];
  category: "love" | "career" | "emotions" | "timing" | "decisions" | "general";
  isApiGenerated?: boolean;
  engineUsed?: string;
  structuredReading?: StructuredAstrologyReading;
}

export interface AISettings {
  apiKey: string;
  provider: "server" | "builtin" | "groq" | "gemini" | "openrouter" | "openai";
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

  // Secure default: production server API endpoint
  return {
    apiKey: "",
    provider: "server",
    model: "llama-3.3-70b-versatile",
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

  const systemPrompt = `You are AstroFindings, an authentic, deeply perceptive whole-sign astrological consultation engine.
You are NOT a chat bot. You do not write casual robot greetings or conversational pleasantries like "Hello! How can I assist you today?".
Instead, you formulate an authoritative, emotionally poignant Astrological Inscription Dossier for ${user.name}.
You write in the sharp, emotionally resonant literary style of Co-Star and Chani Nicholas: psychologically observant, honest, and grounded in raw human feelings.

YOUR MANDATORY ARCHITECTURAL DIRECTIVES:
1. NEVER speak like a chatbot or assistant. Present your output as an Astrological Inscription Dossier.
2. STUDY AND GROUND your entire reading directly in ${user.name}'s verified natal sky coordinates:
   - Sun: ${user.sunSign}
   - Moon: ${user.moonSign}
   - Rising / Ascendant: ${user.risingSign}
   - Natal Placements & Houses: ${placementsSummary}
   - Natal Aspects: ${aspectsSummary}
   - Active Sky Transits: ${transitSummary}
3. EVERY READING MUST THOROUGHLY EXPLAIN THESE 5 PSYCHOLOGICAL DIMENSIONS:
   - ✦ The Planetary & House Architecture: How the specific sign and house mechanics create this tension (e.g., Moon in Aries in 6th house: urgent fiery emotions living in the somatic nervous system; or Sun in Leo in 10th house).
   - ✦ Past Roots & Childhood Conditioning: How this emotional defense, shutdown habit, or anger pattern formed in early life.
   - ✦ Present Reality in Love, Friendships & Emotional Anger: Why they oscillate between deep devotion and sudden cold detachment; why they feel lonely even when surrounded by friends; how they handle anger and betrayal.
   - ✦ Subconscious Blind Spots & Somatic Symptoms: Physical somatic symptoms (jaw clenching, digestive knots, sleep disruption) and subconscious over-functioning or avoidance.
   - ✦ Future Evolution & Thinking Pattern Shift: How their thinking pattern will evolve as they heal this placement; upcoming cosmic transit shifts that unlock sovereign peace.
4. Directly cite 2 to 3 of their exact placements with degrees and house numbers so the reading feels indisputably personalized and real.
5. Provide grounded, emotionally liberating perspective with zero generic fluff.`;

  // Handle Google Gemini API
  if (settings.provider === "gemini") {
    const geminiModel = settings.model || "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${settings.apiKey.trim()}`;

    const promptText = `${systemPrompt}\n\nUser Question/Inquiry: "${question}"\n\nPlease formulate your bespoke astrological reading dossier now:`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 800,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Gemini API error ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      throw new Error("No response returned by Gemini model.");
    }
    return reply.trim();
  }

  // Handle OpenAI, Groq, and OpenRouter (OpenAI-compatible endpoints)
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
      model: settings.model || (settings.provider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini"),
      messages: messagesPayload,
      temperature: 0.8,
      max_tokens: 750,
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

    let hook = `Let's be completely candid, ${firstName}. You're not asking because you're genuinely confused. You're asking because your gut already clocked the shift, but part of you is waiting for cosmic confirmation so you don't feel foolish for feeling it so deeply.`;
    if (subTheme === "betrayal_soft_corner") {
      hook = `Why do you still hold a soft corner for someone who hurt or betrayed your trust, ${firstName}? Because in your chart, your devotion isn't a mechanical switch you can shut off when logic demands it. You see their unspoken wound, and that soft corner is your heart's refusal to become cynical.`;
    } else if (subTheme === "partner_perspective") {
      hook = `What does that person truly feel about you right now, ${firstName}? They felt the full weight of your presence, and when you stepped back into silence, it rattled them far deeper than any argument ever could. They know you offered them an unguarded version of yourself that few ever see.`;
    }

    const celestialMechanism = `✦ CELESTIAL ARCHITECTURE & SIGN TENSION:\nLook directly at your **Venus in ${vSign} in your ${vHouse}${getOrdinal(vHouse)} House** cross-examined against your **${mSign} Moon**. In your chart, love is never a casual transaction. With ${vSign} flavoring your Venus, you require authentic intellectual and emotional honesty. You have an instinctual radar that detects insincerity days before words are spoken. When someone treats you with inconsistency or betrayal, your ${mSign} Moon immediately triggers your protective barriers.`;

    const pastRoots = `✦ PAST ROOTS & EARLY CONDITIONING:\nHow did this dynamic begin? In your past relationships and early formative bonds, you often fell in love with someone's potential rather than their actual behavior. You became their emotional rehabilitator, holding space for their wounds while neglecting your own. When they failed to reciprocate, you internalized the blame, believing you should have been more patient or more understanding. This formed a persistent habit of second-guessing your own worth.`;

    const presentReality = `✦ PRESENT REALITY: IN LOVE, FRIENDSHIPS & ANGER:\nToday, you find yourself caught between intense yearning for intimacy and a terrifying dread of vulnerability. When hurt in love or friendships, you don't just get mad—you either snap in sudden, burning anger or you lean back into absolute, ice-cold silence. In friendships, you are the fiercely loyal anchor, yet you often feel emotionally isolated, questioning whether anyone would fight for you with the same ferocity you fight for them.`;

    const blindspot = `✦ UNCONSCIOUS BLIND SPOTS :\nWhat you are not noticing: You confuse having a soft corner with being obligated to tolerate disrespect. You hold onto people's apologies that never came, and your nervous system holds the tension somatically in your chest and gut. You test partners through silence, hoping they will break through your walls, yet secretly terrified of what happens if they don't.`;

    const futureShift = `✦ FUTURE EVOLUTION & THINKING PATTERN SHIFT :\nYour relationship trajectory is shifting from auditioning for affection to resting in reciprocal peace. The upcoming transits in ${currentMoonSign} are demanding that you retire the rescue mission. You will learn to state your needs plainly without apology. Your future thinking will realize: keeping a soft corner for someone does not require keeping your door unlocked for their dysfunction.`;

    return {
      text: `${hook}\n\n${celestialMechanism}\n\n${pastRoots}\n\n${presentReality}\n\n${blindspot}\n\n${futureShift}`,
      consultedPlanets: consulted,
      category: "love",
    };
  }

  /* ----------------------- 2. CAREER & PURPOSE ----------------------- */
  if (category === "career") {
    const sSign = sun?.sign || user.sunSign;
    const sHouse = sun?.house || 10;
    const satSign = saturn?.sign || "Capricorn";
    const satHouse = saturn?.house || 6;
    const rSign = rising?.sign || user.risingSign;

    consulted.push(`☉ Sun in ${sSign} (House ${sHouse})`);
    consulted.push(`♄ Saturn in ${satSign} (House ${satHouse})`);
    if (rising) consulted.push(`↗ Rising in ${rSign}`);

    let hook = `You're not stuck because you lack talent or stamina, ${firstName}. You're stuck because you've completely outgrown the container you're currently working in, and playing it safe is starting to feel more suffocating than taking the leap.`;

    const celestialMechanism = `✦ CELESTIAL ARCHITECTURE & SIGN TENSION :\nYour **Sun in ${sSign} in the ${sHouse}${getOrdinal(sHouse)} House** demands personal authorship and visible impact, not robotic compliance. However, your **Saturn in ${satSign} (House ${satHouse})** acts as a hyper-vigilant inner taskmaster. It tells you that you must over-prepare, over-qualify, and wait for external permission before you are allowed to claim your seat at the table.`;

    const pastRoots = `✦ PAST ROOTS & EARLY CONDITIONING :\nIn your early education and career beginnings, authority figures often rewarded your obedience rather than your originality. You learned to suppress your sharpest instincts to avoid triggering other people's insecurities. Out of survival, you trained yourself to be the silent workhorse who delivers excellence without demanding the spotlight.`;

    const presentReality = `✦ PRESENT REALITY: WORKPLACE FRIENDS & FRUSTRATION :\nToday, you are operating at 40% battery because what you are doing doesn't ask enough of who you truly are. In professional relationships, you find yourself doing the work of three people because you don't trust others to execute with your precision. When bureaucracy slows you down, your internal anger turns into chronic cognitive fatigue and restlessness.`;

    const blindspot = `✦ UNCONSCIOUS BLIND SPOTS :\nYour blindspot is treating exhaustion as a badge of honor. You convince yourself that suffering in silence proves your dedication, while in reality, it is simply fear of stepping into authentic visibility and leadership.`;

    const futureShift = `✦ FUTURE EVOLUTION & THINKING PATTERN SHIFT :\nA massive professional recalibration is approaching. As you step out of execution mode into sovereign leadership, you will stop asking for permission. You will begin pricing your craftsmanship at its true value and saying 'No' to projects that drain your vital fire.`;

    return {
      text: `${hook}\n\n${celestialMechanism}\n\n${pastRoots}\n\n${presentReality}\n\n${blindspot}\n\n${futureShift}`,
      consultedPlanets: consulted,
      category: "career",
    };
  }

  /* ----------------------- 3. EMOTIONS, DETACHMENT & ANXIETY ----------------------- */
  if (category === "emotions") {
    const mSign = moon?.sign || user.moonSign;
    const mHouse = moon?.house || 6;
    const mercSign = mercury?.sign || user.sunSign;
    const mercHouse = mercury?.house || 3;
    const satSign = saturn?.sign || "Capricorn";

    consulted.push(`☽ Moon in ${mSign} (House ${mHouse})`);
    consulted.push(`☿ Mercury in ${mercSign} (House ${mercHouse})`);
    if (saturn) consulted.push(`♄ Saturn in ${satSign}`);
    if (sun) consulted.push(`☉ Sun in ${sun.sign}`);

    let hook = `This emotional heaviness and sudden urge to withdraw isn't random, ${firstName}. You absorb micro-reactions, swallow your grievances, and pretend you're completely unbothered until your nervous system literally runs out of storage space.`;
    if (subTheme === "detachment_defense") {
      hook = `You don't step back into total silence because you've stopped caring, ${firstName}. You detach because overthinking and anxiety push your emotional threshold past red line. In your chart, going cold and stepping back is the emergency brake your nervous system built so you don't get destroyed by heartbreak.`;
    } else if (subTheme === "emotional_suppression") {
      hook = `What makes you suppress yourself until you feel completely alone in the dark, ${firstName}? You learned early that your messy feelings made other people uncomfortable. So you became the anchor for everyone else while leaving yourself with no one to lean on.`;
    }

    const celestialMechanism = `✦ CELESTIAL ARCHITECTURE & SIGN TENSION:\nYour **${mSign} Moon in your ${mHouse}${getOrdinal(mHouse)} House** is the core epicenter of this pattern. ${
      mSign === "Aries"
        ? "With Aries ruling your Moon, your emotional tempo is swift, hot, and visceral. Anger and irritation flare instantaneously when you feel disrespected, trapped, or forced to beg for basic understanding."
        : `With ${mSign} flavoring your Moon, your feelings run exceptionally deep, requiring profound emotional safety before you allow anyone past your defenses.`
    } Placed in the **${mHouse}${getOrdinal(mHouse)} House**—the house of daily labor, bodily health, and the nervous system—your emotions don't stay abstract; they manifest somatically in your physical body. You tend to treat your feelings like chores or defects that need immediate fixing rather than patient witnessing.`;

    const pastRoots = `✦ PAST ROOTS & EARLY CONDITIONING:\nHow did this defense form? In your childhood and early home environment, softness was rarely met with patient understanding. You learned that showing vulnerability or crying either overwhelmed those around you, invited harsh criticism, or left you dangerously exposed. To protect yourself, your nervous system forged a rapid defense: stay busy, manage everything alone, swallow the tears, or erupt in sharp self-defense before anyone could pierce your core.`;

    const presentReality = `✦ PRESENT REALITY: IN LOVE, FRIENDSHIPS & ANGER:\nToday, when you feel overwhelmed or emotionally bruised, your immediate reaction is to withdraw behind an impenetrable wall of silence. In relationships, you hold a sacred soft corner for those you love, yet you oscillate between passionate loyalty and sudden cold detachment. In friendships, you are the rock who listens to everyone, but you secretly feel profoundly alone—wondering why no one ever notices when your own heart is breaking. When anger builds up, you suppress it until one small trigger causes an unexpected explosion or complete shutdown.`;

    const blindspot = `✦ UNCONSCIOUS BLIND SPOTS:\nWhat you are failing to notice: Your body is absorbing what your pride refuses to speak. Your unresolved emotional tension manifests as somatic stress—tightness in the jaw, digestive knots, sleep disruption, and restless mental overthinking. You convince yourself that because you can survive alone, you don't need anyone, which only deepens your isolation.`;

    const futureShift = `✦ FUTURE EVOLUTION & THINKING PATTERN SHIFT:\nYou are approaching a profound psychological liberation. You will stop treating your sensitivity as a weakness. Ahead, your thinking pattern will shift: anger will transform from a chaotic reactive flare into a quiet, unshakeable boundary. You will learn that having a soft corner does not mean letting people cross your boundaries. You will discover the somatic peace of saying: 'I am allowed to rest, and I don't have to carry everyone else's storm.'`;

    return {
      text: `${hook}\n\n${celestialMechanism}\n\n${pastRoots}\n\n${presentReality}\n\n${blindspot}\n\n${futureShift}`,
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

    const hook = `The cosmic weather around you is undergoing a decisive shift, ${firstName}. The confusion that characterized your recent months is clearing, making way for unmistakable clarity.`;

    const celestialMechanism = `✦ CELESTIAL ARCHITECTURE & TRANSIT IMPACT:\nToday's **${currentMoonPhase} in ${currentMoonSign}** is activating the whole-sign angles of your natal chart. The planetary transits are directly challenging the areas where you have been hesitating or tolerating halfway situations.`;

    const pastRoots = `✦ PAST PATTERN BEING RESOLVED:\nYou have spent the last cycle over-analyzing past heartbreaks and doubting whether you made the right choices. You carried guilt for stepping away from dynamics that were draining you.`;

    const presentReality = `✦ PRESENT ATMOSPHERE IN DAILY LIFE & KINSHIP:\nRight now, you are experiencing a heightened intolerance for pretense and wasted energy. In friendships and daily work, you are naturally pulling back from people who only take without reciprocating. Trust this instinct—it is your chart clearing space for aligned opportunities.`;

    const blindspot = `✦ UNCONSCIOUS BLIND SPOT:\nDo not let fear of the unknown trick you into running back to what is familiar. An outgrown comfort zone is still a prison, no matter how comfortable it feels.`;

    const futureShift = `✦ FUTURE EVOLUTION & TIMING HORIZON:\nOver the coming lunar weeks, a window of decisive opportunity will open. You will feel a surge of courage to initiate the change you've been pondering. Your thinking pattern will stabilize into sovereign certainty.`;

    return {
      text: `${hook}\n\n${celestialMechanism}\n\n${pastRoots}\n\n${presentReality}\n\n${blindspot}\n\n${futureShift}`,
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

  const hook = `Here is what your chart reveals about "${question}", ${firstName}: you are not looking for outside answers—you are looking for permission to trust what your gut decided days ago.`;

  const celestialMechanism = `✦ CELESTIAL ARCHITECTURE:\nYour **${rSign} Rising** gives you a razor-sharp intuitive radar, while your **Sun in ${sSign}** and **Moon in ${mSign}** create an internal debate committee that over-analyzes every micro-scenario until action feels terrifying.`;

  const pastRoots = `✦ PAST PATTERN:\nYou learned early that making a mistake out loud invited criticism, so you developed a habit of gathering endless opinions before honoring your own authority.`;

  const presentReality = `✦ PRESENT REALITY:\nToday, this hesitation is creating low-grade anxiety. You are waiting for 100% certainty that never comes. In relationships and choices, the cleanest path is always the one that lets your nervous system exhale.`;

  const blindspot = `✦ UNCONSCIOUS BLIND SPOT:\nPolling people who don't have to live with the consequences of your choices will only keep you trapped in their limitations.`;

  const futureShift = `✦ FUTURE SHIFT:\nStep into your center, make the sovereign call, and trust that your chart is built with the exact resilience needed to navigate whatever unfolds.`;

  return {
    text: `${hook}\n\n${celestialMechanism}\n\n${pastRoots}\n\n${presentReality}\n\n${blindspot}\n\n${futureShift}`,
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
/* Main Public Entrypoint: Centralized Reading Pipeline                      */
/* -------------------------------------------------------------------------- */

/**
 * Canonical unified reading pipeline:
 * Validates request -> calls server API /api/astrology/reading -> falls back cleanly to ephemeris synthesis
 */
export async function getPersonalizedAstrologyReading({
  user,
  question,
  liveTransits,
  optionalSecondPerson,
  customSettings,
}: {
  user: UserProfileData;
  question: string;
  liveTransits?: LiveTransitData | null;
  optionalSecondPerson?: PersonProfile | null;
  customSettings?: AISettings;
}): Promise<StructuredAstrologyReading> {
  const settings = customSettings || getAISettings();

  // If user configured a personal BYOK client key
  if (
    settings.provider !== "server" &&
    settings.provider !== "builtin" &&
    settings.apiKey &&
    settings.apiKey.trim().length > 5
  ) {
    try {
      const llmText = await queryExternalLLM(settings, user, liveTransits || null, question, []);
      const context = classifyQuestion(question);
      return {
        title: `Astrological Inscription for ${user.name || "Seeker"}`,
        category: context.category,
        summary: llmText.slice(0, 180) + "...",
        sections: [
          {
            title: "✦ Astrological Consultation Dossier",
            dimensionTag: "Bespoke Dossier",
            text: llmText,
          },
        ],
        relevantPlacements: [
          { planet: "Sun", sign: user.sunSign, house: user.placements.find((p) => p.planet === "Sun")?.house || 1, influence: "Conscious Will" },
          { planet: "Moon", sign: user.moonSign, house: user.placements.find((p) => p.planet === "Moon")?.house || 4, influence: "Emotional Sanctuary" },
        ],
        relevantTransits: liveTransits?.activeShifts?.slice(0, 2).map((s) => ({ transit: s.transit, impact: s.impact })) || [],
        engineUsed: `${settings.provider.toUpperCase()} (${settings.model})`,
        isApiGenerated: true,
      };
    } catch (err) {
      console.warn("BYOK client API failed, falling back to server / ephemeris:", err);
    }
  }

  // Primary Production Flow: call /api/astrology/reading
  try {
    const payload = {
      user: {
        name: user.name,
        birthDate: user.birthDate,
        birthTime: user.birthTime,
        birthLocation: user.birthLocation,
        latitude: user.latitude,
        longitude: user.longitude,
        timezone: user.timezone,
      },
      question,
      optionalSecondPerson: optionalSecondPerson
        ? {
            name: optionalSecondPerson.name,
            birthDate: optionalSecondPerson.birthDate,
            birthTime: optionalSecondPerson.birthTime,
            birthLocation: optionalSecondPerson.birthLocation,
            latitude: optionalSecondPerson.latitude,
            longitude: optionalSecondPerson.longitude,
            timezone: optionalSecondPerson.timezone,
            relationship: optionalSecondPerson.relationship,
          }
        : undefined,
    };

    const res = await fetch("/api/astrology/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const reading: StructuredAstrologyReading = await res.json();
      return reading;
    }
  } catch (err) {
    console.warn("Server reading endpoint unavailable, falling back to client synthesis:", err);
  }

  // Fallback: client-side deep ephemeris synthesis
  const context = classifyQuestion(question);
  const synth = synthesizeAstrologicalReading(user, liveTransits || null, question, context);

  return {
    title: `Inquiry on ${context.category.toUpperCase()}`,
    category: context.category,
    summary: `Grounded in your ${user.moonSign} Moon and ${user.sunSign} Sun.`,
    sections: [
      {
        title: "✦ Inscription Dossier",
        dimensionTag: "Full Interpretation",
        text: synth.text,
      },
    ],
    relevantPlacements: synth.consultedPlanets.map((cp) => ({
      planet: cp.split(" in ")[0]?.replace(/[^a-zA-Z]/g, "") || "Planet",
      sign: cp.split(" in ")[1]?.split(" ")[0] || "Zodiac",
      house: 1,
      influence: cp,
    })),
    relevantTransits: liveTransits?.activeShifts?.slice(0, 2).map((s) => ({ transit: s.transit, impact: s.impact })) || [],
    engineUsed: "Free Built-in Ephemeris Synthesis",
    isApiGenerated: false,
  };
}

export async function askAstrologyConsultant(
  user: UserProfileData,
  liveTransits: LiveTransitData | null,
  question: string,
  _history: Array<{ sender: "user" | "ai"; text: string }> = []
): Promise<AIResponse> {
  const structured = await getPersonalizedAstrologyReading({
    user,
    question,
    liveTransits,
  });

  const fullText =
    structured.sections.length > 0
      ? structured.sections.map((s) => `${s.title}\n${s.text}`).join("\n\n")
      : structured.summary;

  return {
    text: fullText,
    consultedPlanets: structured.relevantPlacements.map(
      (p) => `${p.planet} in ${p.sign} (House ${p.house})`
    ),
    category: structured.category,
    isApiGenerated: structured.isApiGenerated,
    engineUsed: structured.engineUsed,
    structuredReading: structured,
  };
}
