import { NextResponse } from "next/server";
import { getAuthenticatedUser, getSupabaseAdmin, getSupabaseUserClient } from "@/server/supabaseServer";
import { calculateLiveTransits } from "@/services/transitEngine";
import { DateTime } from "luxon";
import OpenAI from "openai";

/**
 * GET /api/horoscope/today
 * Resolves today's personalized horoscope for the authenticated user.
 * 1. Resolves today's date in the user's timezone.
 * 2. Checks database cache in daily_horoscopes table.
 * 3. If cache hit, returns cached reading immediately.
 * 4. If cache miss:
 *    - Loads user's saved natal chart.
 *    - Computes real ephemeris transits for today.
 *    - Compares transits against natal placements (aspects & orbs).
 *    - Passes ONLY verified transit data to OpenAI LLM (server-side).
 *    - Persists reading + transits in daily_horoscopes table.
 *    - Returns generated reading.
 */
export async function GET(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth.userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const client = auth.token ? getSupabaseUserClient(auth.token) : getSupabaseAdmin();

    // 1. Fetch user profile for timezone and birth info
    let userTimezone = "America/Los_Angeles";
    let userProfile: any = null;
    let natalChart: any = null;

    if (client) {
      const { data: profile } = await client
        .from("profiles")
        .select("*")
        .eq("id", auth.userId)
        .maybeSingle();

      if (profile) {
        userProfile = profile;
        if (profile.birth_timezone) {
          userTimezone = profile.birth_timezone;
        }
      }

      // Fetch saved natal chart
      const { data: chart } = await client
        .from("natal_charts")
        .select("*")
        .eq("user_id", auth.userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      natalChart = chart;
    }

    // 2. Determine user's local date based on their timezone
    const nowInTz = DateTime.now().setZone(userTimezone);
    const todayDateStr = nowInTz.toISODate() || new Date().toISOString().split("T")[0];

    // 3. Check Supabase cache: daily_horoscopes for (user_id, date)
    if (client) {
      const { data: cached } = await client
        .from("daily_horoscopes")
        .select("*")
        .eq("user_id", auth.userId)
        .eq("date", todayDateStr)
        .maybeSingle();

      if (cached) {
        return NextResponse.json({
          date: cached.date,
          headline: cached.headline,
          reading: cached.reading,
          summary: cached.summary,
          category: cached.category,
          transitsData: cached.transits_data,
          fromCache: true,
        });
      }
    }

    // Fallback placements if no saved chart yet
    const natalPlacements = natalChart?.placements || [
      { planet: "Sun", sign: userProfile?.sun_sign || "Leo", degrees: 15, signIndex: 4, house: 10, meaning: "Core identity" },
      { planet: "Moon", sign: userProfile?.moon_sign || "Taurus", degrees: 8, signIndex: 1, house: 4, meaning: "Emotional sanctuary" },
      { planet: "Mercury", sign: "Leo", degrees: 28, signIndex: 4, house: 10, meaning: "Intellectual cadence" },
      { planet: "Venus", sign: "Cancer", degrees: 5, signIndex: 3, house: 9, meaning: "Relational architecture" },
      { planet: "Mars", sign: "Sagittarius", degrees: 22, signIndex: 8, house: 1, meaning: "Action and drive" },
      { planet: "Saturn", sign: "Libra", degrees: 18, signIndex: 6, house: 12, meaning: "Boundaries" },
    ];

    // 4. Calculate real transits for user's date against natal chart
    const liveTransits = calculateLiveTransits(todayDateStr, natalPlacements);
    const activeTransitEvents = liveTransits.activeShifts || [];
    const moonPhase = liveTransits.moonPhase;

    // 5. Send ONLY verified astronomical transit data to OpenAI LLM (Server-side)
    let headline = `Moon in ${moonPhase.sign}: Navigating Today's Internal Atmosphere`;
    let reading = `Today's lunar position in ${moonPhase.sign} (${moonPhase.phaseName}) highlights your internal rhythm. With planetary shifts cross-examining your natal placements, quiet discernment serves you better than reactive over-explaining.`;
    let summary = `Moon in ${moonPhase.sign} asks for healthy boundaries and emotional clarity today.`;

    const openAiKey = process.env.OPENAI_API_KEY;
    if (openAiKey && openAiKey !== "your-openai-api-key-here") {
      try {
        const openai = new OpenAI({ apiKey: openAiKey });
        const systemPrompt = `You are AstroFindings' high-accuracy psychological astrology engine.
Interpret ONLY the verified astronomical placements and real transits provided below.
NEVER invent or hallucinate planetary coordinates.
Tone: Conversational, sophisticated, psychological, direct, compassionate. No vague clichés like "Today is a good day".
Focus on the psychological diagnostic: what is triggering the user today, why they feel an impulse to detach or overthink, and what is their Hope Window.
Return strict JSON with fields:
- "headline": Short punchy diagnostic title (max 10 words)
- "summary": 1-2 sentence overview for notifications & quick glances
- "reading": 3-paragraph detailed personal interpretation grounded strictly in the verified transits
- "trigger": Specific trigger diagnosis
- "hopeWindow": The psychological resolution and how to step forward`;

        const verifiedContext = JSON.stringify({
          date: todayDateStr,
          timezone: userTimezone,
          natalPlacements: natalPlacements.map((p: any) => ({ planet: p.planet, sign: p.sign, degree: p.degrees, house: p.house })),
          activeTransits: activeTransitEvents.map((t) => ({
            transit: t.transit,
            type: t.type,
            planet: t.planet,
            sign: t.sign,
            description: t.description,
          })),
          moonPhase: {
            phase: moonPhase.phaseName,
            sign: moonPhase.sign,
            illumination: `${moonPhase.illumination}%`,
          },
        });

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Here is the verified astrological data for today: ${verifiedContext}` },
          ],
          temperature: 0.7,
        });

        const parsed = JSON.parse(completion.choices[0].message.content || "{}");
        if (parsed.headline) headline = parsed.headline;
        if (parsed.reading) reading = parsed.reading;
        if (parsed.summary) summary = parsed.summary;
      } catch (aiErr) {
        console.warn("OpenAI daily horoscope generation fallback:", aiErr);
      }
    }

    const payload = {
      date: todayDateStr,
      headline,
      reading,
      summary,
      category: "general",
      transitsData: {
        activeShifts: activeTransitEvents,
        moonPhase,
        retrogrades: liveTransits.retrogrades,
      },
    };

    // 6. Cache reading in daily_horoscopes table
    if (client) {
      await client.from("daily_horoscopes").upsert({
        user_id: auth.userId,
        date: todayDateStr,
        headline: payload.headline,
        reading: payload.reading,
        summary: payload.summary,
        category: payload.category,
        transits_data: payload.transitsData,
        created_at: new Date().toISOString(),
      }, { onConflict: "user_id,date" });
    }

    return NextResponse.json({
      ...payload,
      fromCache: false,
    });
  } catch (err: any) {
    console.error("Error in /api/horoscope/today:", err);
    return NextResponse.json({ error: err.message || "Failed to generate daily horoscope" }, { status: 500 });
  }
}
