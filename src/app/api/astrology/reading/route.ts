import { NextResponse } from "next/server";
import { processAstrologyReading, ServerReadingRequest } from "@/server/astrologyApiServer";
import { getAuthenticatedUser, getSupabaseAdmin, getSupabaseUserClient } from "@/server/supabaseServer";

/**
 * POST /api/astrology/reading
 * Generates an AI Astrological Reading grounded strictly in calculated astronomical coordinates.
 *
 * Product Architecture:
 * - Free Insight (readingType: 'free'):
 *   Provides instant clarity, core placement pattern, grounded perspective, and direction.
 *   Available to seekers exploring their astrology.
 * - Deep Reading (readingType: 'deep'):
 *   Comprehensive multi-dimensional analysis (all 5 psychological/astrological dimensions,
 *   exact aspect geometry, karmic roots, somatic radar, and active transit timing).
 *   Strictly gated by server-side subscription entitlement.
 *
 * When an authenticated user requests a reading, the result is persisted to public.ai_readings.
 */
export async function POST(req: Request) {
  try {
    const payload: ServerReadingRequest = await req.json();
    const auth = await getAuthenticatedUser(req);
    const admin = getSupabaseAdmin();

    // 1. Verify subscription entitlement server-side (prevent client tampering)
    let isEntitledToDeep = false;
    if (auth.userId && admin) {
      const { data: sub } = await admin
        .from("subscriptions")
        .select("status, tier, current_period_end")
        .eq("user_id", auth.userId)
        .maybeSingle();

      if (sub) {
        const isPeriodValid = sub.current_period_end
          ? new Date(sub.current_period_end) > new Date()
          : true;
        isEntitledToDeep =
          (sub.status === "active" || sub.status === "trialing") &&
          sub.tier === "premium" &&
          isPeriodValid;
      }
    }

    // 2. Process the reading through the AI Astrologer Engine
    const result = await processAstrologyReading(payload, { isEntitledToDeep });

    if (result.status !== 200) {
      return NextResponse.json(result.body, { status: result.status });
    }

    // 3. Persist reading history to public.ai_readings for authenticated seekers
    if (auth.userId && admin) {
      try {
        const reading = result.body;
        const { data: inserted, error: insertError } = await admin
          .from("ai_readings")
          .insert({
            user_id: auth.userId,
            question: payload.question,
            category: reading.category || "general",
            reading_type: reading.readingType || (payload.readingType === "deep" ? "deep" : "free"),
            title: reading.title,
            summary: reading.summary,
            sections: reading.sections || [],
            relevant_placements: reading.relevantPlacements || [],
            relevant_transits: reading.relevantTransits || [],
            mind_reading_disclaimer: reading.mindReadingDisclaimer || null,
            engine_used: reading.engineUsed || "AstroFindings AI Astrologer Engine",
            is_api_generated: reading.isApiGenerated ?? true,
          })
          .select("id, created_at")
          .maybeSingle();

        if (inserted && !insertError) {
          reading.id = inserted.id;
          reading.createdAt = inserted.created_at;
        }
      } catch (dbErr) {
        console.warn("[ASTROLOGY READING] Failed to persist reading to public.ai_readings:", dbErr);
      }
    }

    return NextResponse.json(result.body, { status: 200 });
  } catch (error: any) {
    console.error("Error in Next.js /api/astrology/reading route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during astrology calculation." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/astrology/reading
 * Retrieves the authenticated seeker's AI reading history from public.ai_readings.
 * Respects RLS and user ownership.
 */
export async function GET(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth.userId || !auth.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = auth.token ? getSupabaseUserClient(auth.token) : getSupabaseAdmin();
    if (!client) {
      return NextResponse.json({ readings: [] });
    }

    const { data: readings, error } = await client
      .from("ai_readings")
      .select("id, question, category, reading_type, title, summary, sections, relevant_placements, relevant_transits, engine_used, created_at")
      .eq("user_id", auth.userId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.warn("[ASTROLOGY READING] Error fetching reading history:", error.message);
      return NextResponse.json({ readings: [] });
    }

    return NextResponse.json({ readings: readings || [] });
  } catch (err: any) {
    console.error("Error in GET /api/astrology/reading:", err);
    return NextResponse.json({ error: "Internal server error fetching reading history." }, { status: 500 });
  }
}
