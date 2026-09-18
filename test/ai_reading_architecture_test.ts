import { processAstrologyReading } from "../src/server/astrologyApiServer";
import fs from "fs";
import path from "path";

async function runAiReadingArchitectureTests() {
  console.log("=================================================");
  console.log("   AI ASTROLOGER ARCHITECTURE & SCHEMA TEST      ");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${detail || "Assertion failed"}`);
      failed++;
    }
  }

  // -------------------------------------------------------------
  // Test 1: Migration Schema Validation
  // -------------------------------------------------------------
  console.log("--- 1. Database Schema & Migration Integrity ---");
  const migrationPath = path.resolve(process.cwd(), "supabase/migrations/20260918_p0_core_schema.sql");
  const migrationSql = fs.readFileSync(migrationPath, "utf-8");

  assert(!migrationSql.includes("astrology_consultations"), "Old 'astrology_consultations' table completely purged from P0 migration");
  assert(migrationSql.includes("CREATE TABLE IF NOT EXISTS public.ai_readings"), "public.ai_readings table cleanly created in P0 migration");
  assert(migrationSql.includes("reading_type TEXT NOT NULL DEFAULT 'free'"), "reading_type column present with default 'free'");
  assert(migrationSql.includes("CHECK (reading_type IN ('free', 'deep'))"), "Strict CHECK constraint on reading_type ('free' | 'deep')");
  assert(migrationSql.includes("CREATE INDEX IF NOT EXISTS idx_ai_readings_user_type"), "Index on user_id and reading_type created");
  assert(migrationSql.includes("Users can view own ai readings"), "RLS SELECT policy enforces view own ai readings");
  assert(migrationSql.includes("Users can insert own ai readings"), "RLS INSERT policy enforces insert own ai readings");

  // -------------------------------------------------------------
  // Test 2: Free AI Astrology Insight Flow
  // -------------------------------------------------------------
  console.log("\n--- 2. Free AI Reading Engine Execution ---");
  const freeResult = await processAstrologyReading({
    user: {
      birthDate: "1994-06-15",
      birthTime: "14:30",
      name: "Alex",
    },
    question: "I feel stuck in my career and don't know whether I should stay or move.",
    readingType: "free",
  }, {
    isEntitledToDeep: false,
  });

  assert(freeResult.status === 200, "Free reading responds with HTTP 200");
  const freeReading = (freeResult as any).body;
  assert(freeReading && freeReading.readingType === "free", "Returned readingType is 'free'");
  assert(freeReading && freeReading.sections.length >= 3, "Free reading generates structured sections");
  const hasWhatHappening = freeReading.sections.some((s: any) => s.title.includes("What's Happening") || s.dimensionTag.includes("Pattern"));
  const hasWhatMayHelp = freeReading.sections.some((s: any) => s.title.includes("What May Help") || s.dimensionTag.includes("Perspective") || s.dimensionTag.includes("Relief"));
  const hasHopeDirection = freeReading.sections.some((s: any) => s.title.includes("Hope") || s.dimensionTag.includes("Direction"));
  assert(hasWhatHappening, "Free reading contains 'What's Happening' root section");
  assert(hasWhatMayHelp, "Free reading contains 'What May Help' perspective section");
  assert(hasHopeDirection, "Free reading contains 'Hope & Direction' forward section");
  assert(Boolean(freeReading.nextDeeperPrompt && freeReading.nextDeeperPrompt.length > 20), "Free reading naturally provides the deeper reading prompt invitation");
  assert(freeReading.relevantPlacements.length > 0, "Free reading references factual planetary placements calculated by the engine");

  // -------------------------------------------------------------
  // Test 3: Paid/Deep Reading Entitlement Enforcement
  // -------------------------------------------------------------
  console.log("\n--- 3. Server-Side Entitlement Enforcement ---");
  // Non-entitled user requesting deep reading
  const unentitledDeepResult = await processAstrologyReading({
    user: {
      birthDate: "1994-06-15",
      birthTime: "14:30",
      name: "Alex",
    },
    question: "I feel stuck in my career and don't know whether I should stay or move.",
    readingType: "deep",
  }, {
    isEntitledToDeep: false, // Server determined user is not subscribed
  });

  assert(unentitledDeepResult.status === 403, "Unsubscribed user requesting 'deep' reading gets HTTP 403 Forbidden");
  assert((unentitledDeepResult as any).body?.requiresUpgrade === true, "Response includes requiresUpgrade: true");

  // Entitled user requesting deep reading
  const entitledDeepResult = await processAstrologyReading({
    user: {
      birthDate: "1994-06-15",
      birthTime: "14:30",
      name: "Alex",
    },
    question: "I feel stuck in my career and don't know whether I should stay or move.",
    readingType: "deep",
  }, {
    isEntitledToDeep: true, // Server validated subscription
  });

  assert(entitledDeepResult.status === 200, "Subscribed user requesting 'deep' reading succeeds with HTTP 200");
  const deepReading = (entitledDeepResult as any).body;
  assert(deepReading.readingType === "deep", "Returned readingType is 'deep'");
  assert(deepReading.sections.length === 5, "Deep reading delivers all 5 psychological and celestial dimensions");

  // -------------------------------------------------------------
  // Test 4: Codebase Audit for Legacy Human Marketplace Concepts
  // -------------------------------------------------------------
  console.log("\n--- 4. Codebase Audit for Human Astrologer Concepts ---");
  const readingRoutePath = path.resolve(process.cwd(), "src/app/api/astrology/reading/route.ts");
  const readingRouteCode = fs.readFileSync(readingRoutePath, "utf-8");

  assert(readingRouteCode.includes('from("ai_readings")'), "API route persists to 'ai_readings'");
  assert(!readingRouteCode.includes("astrology_consultations"), "API route has no reference to astrology_consultations");
  assert(!readingRouteCode.includes("assigned_astrologer"), "API route has no assigned_astrologer concept");

  console.log("\n=================================================");
  console.log(`  AI ARCHITECTURE RESULTS: ${passed} PASSED, ${failed} FAILED `);
  console.log("=================================================");

  if (failed > 0) process.exit(1);
}

runAiReadingArchitectureTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
