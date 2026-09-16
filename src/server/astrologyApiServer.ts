import type { Connect } from "vite";
import { calculateNatalEphemeris } from "../services/ephemerisEngine";
import { calculateLiveTransits } from "../services/transitEngine";
import { DateTime } from "luxon";

export interface ServerReadingRequest {
  user: {
    name?: string;
    birthDate: string; // YYYY-MM-DD
    birthTime?: string; // HH:mm
    birthLocation?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };
  question: string;
  optionalSecondPerson?: {
    name?: string;
    birthDate?: string;
    birthTime?: string;
    birthLocation?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    relationship?: string;
  };
}

export interface StructuredAstrologyReading {
  title: string;
  category: "love" | "career" | "emotions" | "timing" | "decisions" | "general";
  summary: string;
  sections: {
    title: string;
    text: string;
    dimensionTag?: string;
  }[];
  relevantPlacements: {
    planet: string;
    sign: string;
    house: number;
    influence: string;
  }[];
  relevantTransits: {
    transit: string;
    impact: string;
  }[];
  mindReadingDisclaimer?: string;
  engineUsed: string;
  isApiGenerated: boolean;
}

/**
 * Classifies the inquiry to select relevant astrological factors.
 */
function classifyQuestionTheme(question: string) {
  const q = question.toLowerCase();
  if (
    q.includes("love") ||
    q.includes("relationship") ||
    q.includes("partner") ||
    q.includes("ex") ||
    q.includes("crush") ||
    q.includes("marriage") ||
    q.includes("dating") ||
    q.includes("betray") ||
    q.includes("soft corner") ||
    q.includes("cheat") ||
    q.includes("heartbreak") ||
    q.includes("what they feel") ||
    q.includes("how they see me")
  ) {
    return "love" as const;
  }
  if (
    q.includes("career") ||
    q.includes("job") ||
    q.includes("work") ||
    q.includes("money") ||
    q.includes("business") ||
    q.includes("equity") ||
    q.includes("calling") ||
    q.includes("purpose") ||
    q.includes("profession") ||
    q.includes("salary")
  ) {
    return "career" as const;
  }
  if (
    q.includes("timing") ||
    q.includes("transit") ||
    q.includes("cycle") ||
    q.includes("shift") ||
    q.includes("when will") ||
    q.includes("future") ||
    q.includes("retrograde")
  ) {
    return "timing" as const;
  }
  if (
    q.includes("decision") ||
    q.includes("crossroad") ||
    q.includes("choice") ||
    q.includes("dilemma") ||
    q.includes("quit") ||
    q.includes("stay") ||
    q.includes("leave")
  ) {
    return "decisions" as const;
  }
  return "emotions" as const;
}

/**
 * Express / Connect style middleware handler for /api/astrology/reading
 */
export function astrologyApiMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (req.url !== "/api/astrology/reading" || req.method !== "POST") {
      return next();
    }

    // Read request body
    let bodyText = "";
    req.on("data", (chunk) => {
      bodyText += chunk;
    });

    req.on("end", async () => {
      res.setHeader("Content-Type", "application/json");

      try {
        if (!bodyText.trim()) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Missing request body" }));
          return;
        }

        const payload: ServerReadingRequest = JSON.parse(bodyText);

        // Validation
        if (!payload.question || typeof payload.question !== "string" || !payload.question.trim()) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Inquiry question is required." }));
          return;
        }

        if (payload.question.length > 1000) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Inquiry exceeds maximum allowed length of 1000 characters." }));
          return;
        }

        const userBirth = payload.user;
        if (!userBirth || !userBirth.birthDate) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "User birth date is required for calculation." }));
          return;
        }

        // 1. Calculate Real Natal Chart
        const lat = userBirth.latitude ?? 37.7749;
        const lng = userBirth.longitude ?? -122.4194;
        const tz = userBirth.timezone || "America/Los_Angeles";
        const bTime = userBirth.birthTime || "12:00";

        const natalChart = calculateNatalEphemeris(userBirth.birthDate, bTime, lat, lng, tz);

        // 2. Calculate Real Transits & Current Sky
        const liveTransits = calculateLiveTransits(DateTime.now().toISODate() || "2026-09-16", natalChart.placements);

        // 3. Check for Second Person Chart (Synastry)
        let secondPersonChart = null;
        let hasSecondPerson = false;
        if (
          payload.optionalSecondPerson &&
          payload.optionalSecondPerson.birthDate
        ) {
          const sp = payload.optionalSecondPerson;
          secondPersonChart = calculateNatalEphemeris(
            sp.birthDate,
            sp.birthTime || "12:00",
            sp.latitude || 30.2672,
            sp.longitude || -97.7431,
            sp.timezone || "America/Chicago"
          );
          hasSecondPerson = true;
        }

        // 4. Mind Reading Protection Directive
        const asksAboutAnotherPerson =
          /\b(they|them|he|him|she|her|partner|ex|crush|boss|co-founder|parents?)\b/i.test(payload.question);

        let mindReadingDisclaimer: string | undefined = undefined;
        if (asksAboutAnotherPerson && !hasSecondPerson) {
          mindReadingDisclaimer =
            "Chart Boundary: Because only your birth chart is registered, this consultation reads your emotional architecture, relational expectations, and intuitive radar. It does not fabricate or guess another person's private thoughts.";
        }

        // 5. Select Relevant Placements & Transits
        const category = classifyQuestionTheme(payload.question);
        const relevantPlacements: StructuredAstrologyReading["relevantPlacements"] = [];

        const sun = natalChart.placements.find((p) => p.planet === "Sun");
        const moon = natalChart.placements.find((p) => p.planet === "Moon");
        const venus = natalChart.placements.find((p) => p.planet === "Venus");
        const mars = natalChart.placements.find((p) => p.planet === "Mars");
        const saturn = natalChart.placements.find((p) => p.planet === "Saturn");
        const mercury = natalChart.placements.find((p) => p.planet === "Mercury");

        if (category === "love") {
          if (venus) relevantPlacements.push({ planet: "Venus", sign: venus.sign, house: venus.house, influence: "Values, attraction & boundaries" });
          if (moon) relevantPlacements.push({ planet: "Moon", sign: moon.sign, house: moon.house, influence: "Subconscious sanctuary & instinctual defense" });
          if (mars) relevantPlacements.push({ planet: "Mars", sign: mars.sign, house: mars.house, influence: "Passion & emotional friction" });
        } else if (category === "career") {
          if (mars) relevantPlacements.push({ planet: "Mars", sign: mars.sign, house: mars.house, influence: "Momentum, sovereignty & execution" });
          if (sun) relevantPlacements.push({ planet: "Sun", sign: sun.sign, house: sun.house, influence: "Core authority & public recognition" });
          if (saturn) relevantPlacements.push({ planet: "Saturn", sign: saturn.sign, house: saturn.house, influence: "Mastery, endurance & discipline" });
        } else {
          if (moon) relevantPlacements.push({ planet: "Moon", sign: moon.sign, house: moon.house, influence: "Emotional nervous system & safety" });
          if (mercury) relevantPlacements.push({ planet: "Mercury", sign: mercury.sign, house: mercury.house, influence: "Mental rhythm & cognitive patterns" });
          if (saturn) relevantPlacements.push({ planet: "Saturn", sign: saturn.sign, house: saturn.house, influence: "Karmic defense & boundary structure" });
        }

        const relevantTransits: StructuredAstrologyReading["relevantTransits"] = liveTransits.activeShifts.slice(0, 3).map((s) => ({
          transit: s.transit || s.title,
          impact: s.impact || s.description,
        }));

        // 6. Attempt Server-side AI Provider (Groq / Gemini / OpenAI via process.env)
        const groqKey = process.env.GROQ_API_KEY || "";
        const geminiKey = process.env.GEMINI_API_KEY || "";
        const openaiKey = process.env.OPENAI_API_KEY || "";

        let aiResult: StructuredAstrologyReading | null = null;

        if (groqKey || geminiKey || openaiKey) {
          try {
            aiResult = await executeServerAiCall({
              groqKey,
              geminiKey,
              openaiKey,
              userName: userBirth.name || "Seeker",
              question: payload.question,
              category,
              natalChart,
              liveTransits,
              relevantPlacements,
              relevantTransits,
              secondPersonChart,
              mindReadingDisclaimer,
            });
          } catch (aiErr) {
            console.warn("Server AI provider call failed, falling back to built-in ephemeris synthesis:", aiErr);
          }
        }

        // 7. Fallback to Server-Side Deep Ephemeris Synthesis if AI is unconfigured or failed
        if (!aiResult) {
          aiResult = generateServerEphemerisSynthesis({
            userName: userBirth.name || "Seeker",
            question: payload.question,
            category,
            natalChart,
            liveTransits,
            relevantPlacements,
            relevantTransits,
            mindReadingDisclaimer,
          });
        }

        res.statusCode = 200;
        res.end(JSON.stringify(aiResult));
      } catch (err: any) {
        console.error("Error in /api/astrology/reading:", err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message || "Internal server error during astrology calculation." }));
      }
    });
  };
}

/**
 * Executes server-side AI completion with strict grounding prompt.
 */
async function executeServerAiCall(params: {
  groqKey: string;
  geminiKey: string;
  openaiKey: string;
  userName: string;
  question: string;
  category: "love" | "career" | "emotions" | "timing" | "decisions" | "general";
  natalChart: any;
  liveTransits: any;
  relevantPlacements: any[];
  relevantTransits: any[];
  secondPersonChart: any | null;
  mindReadingDisclaimer?: string;
}): Promise<StructuredAstrologyReading> {
  const { userName, question, category, natalChart, liveTransits, relevantPlacements, relevantTransits, mindReadingDisclaimer } = params;

  const placementsSummary = natalChart.placements
    .map((p: any) => `${p.planet} in ${p.sign} (${p.degrees}°) House ${p.house}`)
    .join(", ");

  const aspectsSummary = natalChart.aspects
    .map((a: any) => `${a.planet1} ${a.type} ${a.planet2} (${a.influence})`)
    .join("; ");

  const transitsSummary = liveTransits.activeShifts
    .slice(0, 3)
    .map((s: any) => `${s.title}: ${s.impact}`)
    .join(" | ");

  const systemPrompt = `You are AstroFindings, an authoritative, deeply perceptive astrological consultation engine.
You formulate an epistolary, psychologically profound consultation dossier for ${userName}.
STRICT MANDATORY CONSTRAINTS:
1. ONLY use the verified calculated coordinates below. NEVER invent or fabricate planets, houses, degrees, aspects, or transits.
2. DO NOT pretend to read the mind of third parties without their charts.
3. Address ${userName}'s exact question: "${question}".
4. You MUST respond with STRICT VALID JSON adhering exactly to this schema:
{
  "title": "A short, poignant title summarizing the core tension",
  "category": "${category}",
  "summary": "2-3 sentences providing an immediate, unsparing glimpse of truth",
  "sections": [
    {
      "title": "Celestial Architecture & Sign Tension",
      "dimensionTag": "Planetary Architecture",
      "text": "Detailed analysis of sign and house mechanics"
    },
    {
      "title": "Past Roots & Childhood Conditioning",
      "dimensionTag": "Past Roots",
      "text": "How this defense or habit formed in earlier life"
    },
    {
      "title": "Present Reality: In Love, Friendships & Emotional Anger",
      "dimensionTag": "Present Reality",
      "text": "Why they oscillate between devotion and cold detachment; visceral anger and boundaries"
    },
    {
      "title": "Unconscious Blind Spots & Somatic Symptoms",
      "dimensionTag": "Blind Spots",
      "text": "Somatic manifestations (jaw clenching, stomach knots) and subconscious over-functioning"
    },
    {
      "title": "Future Evolution & Thinking Pattern Shift",
      "dimensionTag": "Future Shift",
      "text": "How their thinking pattern evolves as they heal this placement; upcoming cosmic timing"
    }
  ]
}

NATAL COORDINATES:
- Sun: ${natalChart.sunSign}
- Moon: ${natalChart.moonSign}
- Rising: ${natalChart.risingSign}
- Placements: ${placementsSummary}
- Aspects: ${aspectsSummary}
- Active Transits: ${transitsSummary}
`;

  let responseJsonText = "";
  let engineUsed = "Server AI";

  if (params.groqKey) {
    engineUsed = "Groq Cloud (Llama 3.3 70B)";
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.groqKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate the consultation dossier for: "${question}"` },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });
    const data = await res.json();
    responseJsonText = data.choices?.[0]?.message?.content || "";
  } else if (params.geminiKey) {
    engineUsed = "Google Gemini 1.5";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${params.geminiKey}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nRespond with pure JSON.` }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    });
    const data = await res.json();
    responseJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } else if (params.openaiKey) {
    engineUsed = "OpenAI GPT-4o-mini";
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate the consultation dossier for: "${question}"` },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });
    const data = await res.json();
    responseJsonText = data.choices?.[0]?.message?.content || "";
  }

  const parsed = JSON.parse(responseJsonText);

  return {
    title: parsed.title || `Astrological Inscription on ${category.toUpperCase()}`,
    category,
    summary: parsed.summary || "Your natal coordinates reveal the deep psychological undercurrent of this pattern.",
    sections: parsed.sections || [],
    relevantPlacements,
    relevantTransits,
    mindReadingDisclaimer,
    engineUsed,
    isApiGenerated: true,
  };
}

/**
 * Built-in Ephemeris Synthesis for server-side generation when no AI provider keys are provided.
 */
function generateServerEphemerisSynthesis(params: {
  userName: string;
  question: string;
  category: "love" | "career" | "emotions" | "timing" | "decisions" | "general";
  natalChart: any;
  liveTransits: any;
  relevantPlacements: any[];
  relevantTransits: any[];
  mindReadingDisclaimer?: string;
}): StructuredAstrologyReading {
  const { userName, question, category, natalChart, liveTransits, relevantPlacements, relevantTransits, mindReadingDisclaimer } = params;

  const sun = natalChart.placements.find((p: any) => p.planet === "Sun") || { sign: natalChart.sunSign, house: 10 };
  const moon = natalChart.placements.find((p: any) => p.planet === "Moon") || { sign: natalChart.moonSign, house: 6 };

  let title = "The Architecture of Sovereign Boundaries";
  let summary = `Your ${moon.sign} Moon in House ${moon.house} cross-examined with your ${sun.sign} Sun reveals why this situation feels non-negotiable.`;

  const sections = [
    {
      title: "✦ Celestial Architecture & Sign Tension",
      dimensionTag: "Planetary Architecture",
      text: `Your inquiry directly activates your ${moon.sign} Moon located in your ${moon.house}th House interacting with your ${sun.sign} Sun in House ${sun.house}. The tension between ${moon.sign}'s visceral survival instinct and the external demands of your chart creates an immediate impulse to protect yourself. Rather than an intellectual dilemma, this is your somatic system signaling that a core personal standard is being compromised.`,
    },
    {
      title: "✦ Past Roots & Childhood Conditioning",
      dimensionTag: "Past Roots",
      text: `In your early formative years, emotional softness was rarely treated as safe. You learned that when difficulties arose, expressing helplessness or grief only invited criticism, anxiety, or vulnerability. Your defense mechanism was swift: swallow the ache, take charge of the crisis, or detach behind an impenetrable wall of silence.`,
    },
    {
      title: "✦ Present Reality: Love, Friendships & Emotional Anger",
      dimensionTag: "Present Reality",
      text: `Today, in your personal relationships and close bonds, this creates a sharp oscillation: you offer profound devotion to those in your inner circle, but the moment you detect duplicity or disrespect, you do not just get irritated—your anger flares rapidly, followed by absolute emotional detachment. In friendships, you are often the quiet anchor, yet you secretly wonder who would fight for you with the same intensity.`,
    },
    {
      title: "✦ Unconscious Blind Spots & Somatic Symptoms",
      dimensionTag: "Blind Spots",
      text: `Your primary blind spot is confusing endurance with virtue. You frequently hold space for people whose apologies never came, absorbing the tension somatically in your jaw, shoulders, and digestion. You test situations through withdrawal, secretly hoping someone will bridge the gap, yet terrified of what happens if they do not.`,
    },
    {
      title: "✦ Future Evolution & Thinking Pattern Shift",
      dimensionTag: "Future Shift",
      text: `Your thinking pattern is undergoing an essential upgrade. With the active transit shifts (${relevantTransits.map((t) => t.transit).join(", ")}), you are retiring the habit of self-censorship. Your mind will realize: holding a soft corner for past memories does not require keeping your door unlocked for repeated disrespect. Ahead, your boundary becomes quiet, immovable, and at peace.`,
    },
  ];

  return {
    title,
    category,
    summary,
    sections,
    relevantPlacements,
    relevantTransits,
    mindReadingDisclaimer,
    engineUsed: "Free Built-in Ephemeris Synthesis",
    isApiGenerated: false,
  };
}
