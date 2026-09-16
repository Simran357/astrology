import type { Connect } from "vite";
import { calculateNatalEphemeris } from "../services/ephemerisEngine";
import { calculateLiveTransits } from "../services/transitEngine";
import { HOUSE_LIFE_AREAS } from "../data/houseLifeAreas";
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

export async function processAstrologyReading(payload: ServerReadingRequest): Promise<{ status: number; body: any }> {
  const requestId = `ast_req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  // Validation
  if (!payload.question || typeof payload.question !== "string" || !payload.question.trim()) {
    return { status: 400, body: { error: "Inquiry question is required." } };
  }

  if (payload.question.length > 1000) {
    return { status: 400, body: { error: "Inquiry exceeds maximum allowed length of 1000 characters." } };
  }

  const userBirth = payload.user;
  if (!userBirth || !userBirth.birthDate) {
    return { status: 400, body: { error: "User birth date is required for calculation." } };
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
  if (payload.optionalSecondPerson?.birthDate) {
    const sp = payload.optionalSecondPerson;
    const spBirthDate = sp.birthDate;
    if (spBirthDate) {
      secondPersonChart = calculateNatalEphemeris(
        spBirthDate,
        sp.birthTime || "12:00",
        sp.latitude || 30.2672,
        sp.longitude || -97.7431,
        sp.timezone || "America/Chicago"
      );
      hasSecondPerson = true;
    }
  }

  // 4. Mind Reading Protection Directive
  const asksAboutAnotherPerson =
    /\b(they|them|he|him|she|her|partner|ex|crush|boss|co-founder|parents?)\b/i.test(payload.question);

  let mindReadingDisclaimer: string | undefined = undefined;
  if (asksAboutAnotherPerson && !hasSecondPerson) {
    mindReadingDisclaimer =
      "Chart Boundary: Because only your birth chart is registered, this consultation reads your emotional architecture, relational expectations, and intuitive radar. It does not fabricate or guess another person's private thoughts.";
  }

  // 5. Select Relevant Placements & Transits based on category
  const category = classifyQuestionTheme(payload.question);
  const relevantPlacements: StructuredAstrologyReading["relevantPlacements"] = [];

  const sun = natalChart.placements.find((p) => p.planet === "Sun");
  const moon = natalChart.placements.find((p) => p.planet === "Moon");
  const venus = natalChart.placements.find((p) => p.planet === "Venus");
  const mars = natalChart.placements.find((p) => p.planet === "Mars");
  const saturn = natalChart.placements.find((p) => p.planet === "Saturn");
  const mercury = natalChart.placements.find((p) => p.planet === "Mercury");
  const jupiter = natalChart.placements.find((p) => p.planet === "Jupiter");

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

  // Summaries for debug logging and prompt construction
  const placementsSummary = natalChart.placements
    .map((p) => `${p.planet} in ${p.sign} (${p.degrees}°) House ${p.house} [${p.element}]`)
    .join(", ");

  const housesSummary = natalChart.houses
    .map((h) => `H${h.house}: ${h.sign} (${h.degrees}°)`)
    .join(", ");

  const aspectsSummary = natalChart.aspects
    .map((a) => `${a.planet1} ${a.type} ${a.planet2} (${a.influence})`)
    .join("; ");

  const transitsSummary = liveTransits.activeShifts
    .slice(0, 3)
    .map((s) => `${s.title}: ${s.impact}`)
    .join(" | ");

  // 6. Attempt Server-side AI Provider (OpenAI / Groq / Gemini via process.env)
  const openaiKey = (process.env.OPENAI_API_KEY || "").trim();
  const groqKey = (process.env.GROQ_API_KEY || "").trim();
  const geminiKey = (process.env.GEMINI_API_KEY || "").trim();

  let aiResult: StructuredAstrologyReading | null = null;
  let providerSelected = "None (No API keys configured)";
  let modelSelected = "Ephemeris Synthesis Engine";
  let externalApiCalled = false;
  let fallbackUsed = true;
  let promptLength = 0;
  let llmResponseLength = 0;

  if (openaiKey || groqKey || geminiKey) {
    try {
      const callResult = await executeServerAiCall({
        openaiKey,
        groqKey,
        geminiKey,
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

      aiResult = callResult.reading;
      providerSelected = callResult.provider;
      modelSelected = callResult.model;
      externalApiCalled = true;
      fallbackUsed = false;
      promptLength = callResult.promptLength;
      llmResponseLength = callResult.responseLength;
    } catch (aiErr: any) {
      console.warn(`[ASTROLOGY SERVER] AI completion failed (${aiErr?.message || aiErr}). Engaging dynamic ephemeris synthesis.`);
      externalApiCalled = true;
      fallbackUsed = true;
    }
  }

  // 7. Fallback to Dynamic Server-Side Ephemeris Synthesis if AI is unconfigured or failed
  if (!aiResult) {
    fallbackUsed = true;
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

  // Runtime debug logging required by audit protocol
  console.log(`
[ASTROLOGY DEBUG]
Request ID: ${requestId}
Provider selected: ${providerSelected}
Model selected: ${modelSelected}
External API called: ${externalApiCalled ? "YES" : "NO"}
Fallback used: ${fallbackUsed ? "YES" : "NO"}
User question: ${payload.question}
Birth date: ${userBirth.birthDate}
Birth time: ${bTime}
Latitude: ${lat}
Longitude: ${lng}
Planetary positions: ${placementsSummary}
Houses: ${housesSummary}
Ascendant: ${natalChart.risingSign} (${natalChart.ascendantDegree}°)
MC: ${natalChart.midheavenSign} (${natalChart.midheavenDegree}°)
Major aspects: ${aspectsSummary || "None within standard orbs"}
Transit data: ${transitsSummary || "Live ephemeris transits active"}
Prompt length: ${promptLength}
LLM response length: ${llmResponseLength}
`);

  return { status: 200, body: aiResult };
}

/**
 * Express / Connect style middleware handler for /api/astrology/reading
 */
export function astrologyApiMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (req.url !== "/api/astrology/reading" || req.method !== "POST") {
      return next();
    }

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
        const result = await processAstrologyReading(payload);
        res.statusCode = result.status;
        res.end(JSON.stringify(result.body));
      } catch (err: any) {
        console.error("Error in /api/astrology/reading:", err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message || "Internal server error during astrology calculation." }));
      }
    });
  };
}

/**
 * Executes server-side AI completion with cascading fallback across available keys.
 */
async function executeServerAiCall(params: {
  openaiKey: string;
  groqKey: string;
  geminiKey: string;
  userName: string;
  question: string;
  category: "love" | "career" | "emotions" | "timing" | "decisions" | "general";
  natalChart: any;
  liveTransits: any;
  relevantPlacements: any[];
  relevantTransits: any[];
  secondPersonChart: any | null;
  mindReadingDisclaimer?: string;
}): Promise<{
  reading: StructuredAstrologyReading;
  provider: string;
  model: string;
  promptLength: number;
  responseLength: number;
}> {
  const { userName, question, category, natalChart, liveTransits, relevantPlacements, relevantTransits, mindReadingDisclaimer } = params;

  const placementsSummary = natalChart.placements
    .map((p: any) => `${p.planet} in ${p.sign} (${p.degrees}°) House ${p.house} [Element: ${p.element}, Modality: ${p.modality}]`)
    .join(", ");

  const aspectsSummary = natalChart.aspects
    .map((a: any) => `${a.planet1} ${a.type} ${a.planet2} (${a.influence}, orb ${a.orb}°)`)
    .join("; ");

  const transitsSummary = liveTransits.activeShifts
    .slice(0, 3)
    .map((s: any) => `${s.title}: ${s.impact}`)
    .join(" | ");

  const housesSummary = natalChart.houses
    .map((h: any) => `House ${h.house} (${h.sign})`)
    .join(", ");

  const secondPersonNote = params.secondPersonChart
    ? `\nSECOND PERSON / SYNASTRY COORDINATES:\n- Sun: ${params.secondPersonChart.sunSign}\n- Moon: ${params.secondPersonChart.moonSign}\n- Rising: ${params.secondPersonChart.risingSign}\n- Placements: ${params.secondPersonChart.placements.map((p: any) => `${p.planet} in ${p.sign} (House ${p.house})`).join(", ")}`
    : "";

  const systemPrompt = `You are AstroFindings, a whole-sign astrological consultation engine.
Formulate an epistolary, psychologically profound consultation dossier for ${userName}.

CRITICAL REQUIREMENTS:
1. Ground your interpretation in the verified coordinates below. NEVER fabricate planets, houses, degrees, or aspects.
2. Directly answer ${userName}'s exact question: "${question}". Do not force unrelated relationship or trauma clichés onto a career, timing, or financial inquiry.
3. Respond ONLY with STRICT VALID JSON adhering exactly to this schema:
{
  "title": "A short title capturing the core astrological dynamic of this question",
  "category": "${category}",
  "summary": "2-3 sentences providing an immediate, unsparing glimpse of truth",
  "sections": [
    {
      "title": "✦ Celestial Architecture & Sign Tension",
      "dimensionTag": "Planetary Architecture",
      "text": "Detailed analysis of how the specific signs, houses, and planetary aspects govern the question."
    },
    {
      "title": "✦ Past Roots & Formative Conditioning",
      "dimensionTag": "Past Roots",
      "text": "How early conditioning or past cycles laid the ground for this dynamic."
    },
    {
      "title": "✦ Present Reality & Direct Dynamics",
      "dimensionTag": "Present Reality",
      "text": "Analysis of the current friction, real-world patterns, and choices at hand."
    },
    {
      "title": "✦ Unconscious Blind Spots & Somatic Indicators",
      "dimensionTag": "Blind Spots",
      "text": "Subconscious habits, avoidance tendencies, or somatic tension."
    },
    {
      "title": "✦ Future Evolution & Timing Shift",
      "dimensionTag": "Future Shift",
      "text": "How this pattern matures and how upcoming planetary cycles offer a breakthrough."
    }
  ]
}

NATAL COORDINATES FOR ${userName.toUpperCase()}:
- Sun: ${natalChart.sunSign} (${natalChart.placements.find((p: any) => p.planet === "Sun")?.degrees || 0}° in House ${natalChart.placements.find((p: any) => p.planet === "Sun")?.house || 1})
- Moon: ${natalChart.moonSign} (${natalChart.placements.find((p: any) => p.planet === "Moon")?.degrees || 0}° in House ${natalChart.placements.find((p: any) => p.planet === "Moon")?.house || 1})
- Rising / Ascendant: ${natalChart.risingSign} (${natalChart.ascendantDegree}°)
- Midheaven (MC): ${natalChart.midheavenSign} (${natalChart.midheavenDegree}°)
- Houses: ${housesSummary}
- All Planetary Placements: ${placementsSummary}
- Natal Aspects: ${aspectsSummary || "None within standard orbs"}
- Current Sky Transits: ${transitsSummary}${secondPersonNote}
`;

  let responseJsonText = "";
  let providerUsed = "";
  let modelUsed = "";
  const promptLength = systemPrompt.length + question.length;

  // Attempt 1: OpenAI (Primary default)
  if (params.openaiKey) {
    try {
      providerUsed = "OpenAI";
      modelUsed = "gpt-4o-mini";
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.openaiKey}`,
        },
        body: JSON.stringify({
          model: modelUsed,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Generate the bespoke consultation dossier for: "${question}"` },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        responseJsonText = data.choices?.[0]?.message?.content || "";
      }
    } catch (err) {
      console.warn("OpenAI call failed, checking secondary providers...");
    }
  }

  // Attempt 2: Groq Cloud (Secondary fallback)
  if (!responseJsonText && params.groqKey) {
    try {
      providerUsed = "Groq Cloud";
      modelUsed = "llama-3.3-70b-versatile";
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.groqKey}`,
        },
        body: JSON.stringify({
          model: modelUsed,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Generate the consultation dossier for: "${question}"` },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        responseJsonText = data.choices?.[0]?.message?.content || "";
      }
    } catch (err) {
      console.warn("Groq call failed, checking next provider...");
    }
  }

  // Attempt 3: Google Gemini (Tertiary fallback)
  if (!responseJsonText && params.geminiKey) {
    try {
      providerUsed = "Google Gemini";
      modelUsed = "gemini-1.5-flash";
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelUsed}:generateContent?key=${params.geminiKey}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: "${question}"\n\nRespond strictly with JSON.` }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        responseJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    } catch (err) {
      console.warn("Gemini call failed.");
    }
  }

  if (!responseJsonText) {
    throw new Error("No external AI provider returned a valid response.");
  }

  const parsed = JSON.parse(responseJsonText);

  return {
    reading: {
      title: parsed.title || `Astrological Inscription on ${category.toUpperCase()}`,
      category,
      summary: parsed.summary || "Your calculated natal coordinates reveal the structural undercurrent of this inquiry.",
      sections: parsed.sections || [],
      relevantPlacements,
      relevantTransits,
      mindReadingDisclaimer,
      engineUsed: `${providerUsed} (${modelUsed})`,
      isApiGenerated: true,
    },
    provider: providerUsed,
    model: modelUsed,
    promptLength,
    responseLength: responseJsonText.length,
  };
}

/**
 * Built-in Ephemeris Synthesis for server-side generation when no AI provider keys are configured.
 * Genuinely synthesizes the calculated Sun, Moon, Rising, MC, planetary houses, aspects, and house life areas.
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

  const sun = natalChart.placements.find((p: any) => p.planet === "Sun") || { sign: natalChart.sunSign, house: 1, degrees: 15, element: "Fire" };
  const moon = natalChart.placements.find((p: any) => p.planet === "Moon") || { sign: natalChart.moonSign, house: 4, degrees: 15, element: "Water" };
  const venus = natalChart.placements.find((p: any) => p.planet === "Venus") || { sign: "Cancer", house: 7, degrees: 10, element: "Water" };
  const mars = natalChart.placements.find((p: any) => p.planet === "Mars") || { sign: "Aries", house: 10, degrees: 5, element: "Fire" };
  const saturn = natalChart.placements.find((p: any) => p.planet === "Saturn") || { sign: "Capricorn", house: 6, degrees: 20, element: "Earth" };
  const mercury = natalChart.placements.find((p: any) => p.planet === "Mercury") || { sign: sun.sign, house: sun.house, degrees: 12, element: "Air" };

  const rising = natalChart.risingSign || "Aries";
  const mc = natalChart.midheavenSign || "Capricorn";

  // Identify relevant house description
  const primaryHouseNum = category === "career" ? 10 : category === "love" ? 7 : category === "decisions" ? 9 : 4;
  const houseMeta = HOUSE_LIFE_AREAS[primaryHouseNum] || HOUSE_LIFE_AREAS[1];

  let title = "";
  let summary = "";
  const sections: StructuredAstrologyReading["sections"] = [];

  if (category === "love") {
    title = `Venus in ${venus.sign} & Moon in ${moon.sign}: Relational Architecture`;
    summary = `Your inquiry into love directly engages your ${venus.sign} Venus in House ${venus.house} and your ${moon.sign} Moon in House ${moon.house}. Your chart requires emotional transparency before true vulnerability is unlocked.`;

    sections.push({
      title: "✦ Celestial Architecture & Relational Blueprint",
      dimensionTag: "Planetary Architecture",
      text: `In whole-sign terms, your intimate partnerships are anchored by Venus in ${venus.sign} (House ${venus.house}) and your 7th House axis. With Venus in ${venus.sign}, you value authentic resonance and consistency far above superficial charm. Meanwhile, your ${moon.sign} Moon in House ${moon.house} functions as your emotional sanctuary: when you detect disingenuous behavior or emotional ambiguity, your protective instincts activate swiftly.`,
    });
    sections.push({
      title: "✦ Past Roots & Attachment Imprints",
      dimensionTag: "Past Roots",
      text: `Your formative conditioning taught you to be cautious with your deepest devotions. Placed in ${moon.sign}, your early environment required you to read the emotional room before expressing needs. Consequently, you developed a habit of demonstrating loyalty while keeping a guarded inner perimeter until safety is proven.`,
    });
    sections.push({
      title: "✦ Present Reality & Boundary Dynamics",
      dimensionTag: "Present Reality",
      text: `Regarding "${question}": your immediate challenge is distinguishing between healthy discernment and protective isolation. In close bonds, you give deeply, but expect equal reciprocity. When that balance falters, you lean back to observe rather than pleading for consideration.`,
    });
    sections.push({
      title: "✦ Subconscious Blind Spots & Somatic Radar",
      dimensionTag: "Blind Spots",
      text: `Your subconscious tendency is to test consistency through silence. Rather than naming a boundary directly, you withdraw your warmth and wait to see if the other person notices. Somatically, unspoken tension settles into your ${moon.element === "Water" ? "stomach and digestive system" : moon.element === "Earth" ? "jaw and shoulders" : "chest and breathing patterns"}.`,
    });
    sections.push({
      title: "✦ Future Evolution & Relational Recalibration",
      dimensionTag: "Future Shift",
      text: `With active transits moving through your chart (${relevantTransits.map((t) => t.transit).join(", ") || "Current Sky Transits"}), you are stepping into sovereign partnership. You will find clarity by speaking your non-negotiables early, trading anxious guessing for reciprocal peace.`,
    });
  } else if (category === "career") {
    title = `10th House ${mc} & Mars in ${mars.sign}: Sovereign Authorship & Calling`;
    summary = `Your professional calling is defined by your Midheaven in ${mc}, your Sun in ${sun.sign} (House ${sun.house}), and Mars in ${mars.sign} (House ${mars.house}). You are built for sovereign execution, not passive compliance.`;

    sections.push({
      title: "✦ Celestial Architecture & Professional Drive",
      dimensionTag: "Planetary Architecture",
      text: `Your career horizon is directed by Midheaven in ${mc} and fueled by Mars in ${mars.sign} (House ${mars.house}, ${mars.degrees}°). While your Sun in ${sun.sign} in the ${sun.house}th House demands recognized authorship, your ${saturn.sign} Saturn in House ${saturn.house} acts as a rigorous taskmaster, ensuring that whatever you build has durable structural longevity.`,
    });
    sections.push({
      title: "✦ Formative Roots & Authority Conditioning",
      dimensionTag: "Past Roots",
      text: `In your early professional or educational trajectory, authority figures often rewarded compliance over innovation. You learned to work harder than those around you to secure an unquestionable standard of competence. This forged exceptional skill, but also a tendency to carry more than your share of the workload.`,
    });
    sections.push({
      title: "✦ Present Reality: Execution & Crossroads",
      dimensionTag: "Present Reality",
      text: `Regarding your inquiry: "${question}". What feels like friction is actually your capacity outgrowing your current container. With ${houseMeta.simpleTitle.toLowerCase()}, playing small or waiting for external permission is no longer sustainable for your energy.`,
    });
    sections.push({
      title: "✦ Unconscious Blind Spots in Leadership",
      dimensionTag: "Blind Spots",
      text: `Your primary blind spot is confusing over-preparation with readiness. You often believe you need one more credential, one more sign-off, or 100% certainty before claiming your rightful position. This over-functioning drains your vitality and slows momentum.`,
    });
    sections.push({
      title: "✦ Future Evolution & Professional Mastery",
      dimensionTag: "Future Shift",
      text: `Upcoming transits (${relevantTransits.map((t) => t.transit).join(", ") || "Cosmic Shifts"}) mark a decisive transition from execution to leadership. As you assert your craft without apology, you will attract opportunities aligned with your authentic sovereign value.`,
    });
  } else {
    title = `Moon in ${moon.sign} & Ascendant in ${rising}: Inner Navigation`;
    summary = `Your internal world is directed by your ${moon.sign} Moon in House ${moon.house} and your ${rising} Ascendant. Your chart calls for honoring your intuitive signals rather than intellectualizing them.`;

    sections.push({
      title: "✦ Celestial Architecture & Nervous System Rhythm",
      dimensionTag: "Planetary Architecture",
      text: `Your rising sign in ${rising} establishes your primary lens on reality, while your ${moon.sign} Moon in the ${moon.house}th House governs your instinctive nervous system. Placed in ${moon.element} element, your emotional processing is ${moon.element === "Fire" ? "rapid, passionate, and protective" : moon.element === "Water" ? "deep, empathetic, and intuitive" : moon.element === "Air" ? "analytical, reflective, and observant" : "grounded, patient, and sensory"}.`,
    });
    sections.push({
      title: "✦ Past Conditioning & Defense Mechanisms",
      dimensionTag: "Past Roots",
      text: `In earlier life chapters, you learned to manage your vulnerability independently. When emotional storms occurred, you adapted by becoming the steady, self-reliant observer. This created remarkable resilience, but sometimes makes asking for support feel unfamiliar.`,
    });
    sections.push({
      title: "✦ Present Reality & The Current Dilemma",
      dimensionTag: "Present Reality",
      text: `In response to: "${question}". The tension you feel is an invitation to align outer action with inner truth. Your ${sun.sign} Sun in House ${sun.house} seeks expression, and hesitating to honor your inner standard is what generates restlessness.`,
    });
    sections.push({
      title: "✦ Unconscious Blind Spots & Somatic Awareness",
      dimensionTag: "Blind Spots",
      text: `Your blind spot is attempting to solve emotional thresholds purely through mental rationalization. Your body registers truth before your intellect catches up. Notice where your somatic radar signals fatigue or resistance.`,
    });
    sections.push({
      title: "✦ Future Evolution & Internal Sovereign Peace",
      dimensionTag: "Future Shift",
      text: `As current celestial shifts (${relevantTransits.map((t) => t.transit).join(", ") || "Live Transits"}) activate your natal chart, your thinking pattern shifts toward sovereign peace: trusting your instincts without needing to defend them to others.`,
    });
  }

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
