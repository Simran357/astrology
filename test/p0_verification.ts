import { calculateNatalEphemeris } from "../src/services/ephemerisEngine";
import { resolveHistoricalTimezone } from "../src/services/timezoneService";
import { calculateLiveTransits } from "../src/services/transitEngine";
import { dodoPayments } from "../src/lib/payments/dodoPayments";
import { PLANS } from "../src/lib/payments/types";

async function runP0Tests() {
  console.log("=================================================");
  console.log("  ASTROFINDINGS P0 MVP END-TO-END VERIFICATION  ");
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
  // Test 1: Historical Timezone & UTC Offset Resolution
  // -------------------------------------------------------------
  console.log("--- 1. Birth Data & Historical Timezone ---");
  // Test location: San Francisco (Summer 1994, Daylight Savings Time active => UTC-7 = -420 min)
  const sfSummer = resolveHistoricalTimezone(37.7749, -122.4194, "1994-08-09", "07:24");
  assert(sfSummer.timezone === "America/Los_Angeles", "SF Timezone identified as America/Los_Angeles");
  assert(sfSummer.historicalUtcOffsetMinutes === -420, `SF Summer 1994 historical offset is -420 min (got ${sfSummer.historicalUtcOffsetMinutes})`);
  assert(!sfSummer.isTimeApproximate, "Exact time marked not approximate");

  // Test location: London (Winter 1985, Standard Time UTC+0 = 0 min)
  const londonWinter = resolveHistoricalTimezone(51.5074, -0.1278, "1985-01-15", "10:00");
  assert(londonWinter.historicalUtcOffsetMinutes === 0, `London Winter 1985 historical offset is 0 min (got ${londonWinter.historicalUtcOffsetMinutes})`);

  // Test unknown birth time -> Solar Noon Fallback
  const noonFallback = resolveHistoricalTimezone(37.7749, -122.4194, "1994-08-09", undefined);
  assert(noonFallback.isTimeApproximate === true, "Missing birth time flags isTimeApproximate: true");

  // -------------------------------------------------------------
  // Test 2: Real Swiss Ephemeris Engine (No Fake Math)
  // -------------------------------------------------------------
  console.log("\n--- 2. Real Natal Chart Calculation Engine ---");
  const chart = calculateNatalEphemeris("1994-08-09", "07:24", 37.7749, -122.4194, "America/Los_Angeles", "Placidus");
  
  // Verify Sun is in Leo around 16°
  const sun = chart.placements.find(p => p.planet === "Sun");
  assert(Boolean(sun), "Sun placement computed");
  assert(sun?.sign === "Leo", `Sun sign is Leo (got ${sun?.sign})`);
  assert(typeof sun?.degrees === "number" && sun.degrees > 15 && sun.degrees < 18, `Sun degrees accurate around 16° (got ${sun?.degrees})`);

  // Verify Retrograde detection (Saturn was retrograde in August 1994)
  const saturn = chart.placements.find(p => p.planet === "Saturn");
  assert(Boolean(saturn), "Saturn placement computed");
  assert(saturn?.isRetrograde === true, `Saturn retrograde status accurately detected (got ${saturn?.isRetrograde})`);

  // Verify Houses & Placidus Cusps
  assert(chart.houses.length === 12, "All 12 astrological houses computed");
  assert(Boolean(chart.ascendant.sign), `Ascendant calculated: ${chart.ascendant.sign} ${chart.ascendant.degree}°`);
  assert(Boolean(chart.midheaven.sign), `Midheaven calculated: ${chart.midheaven.sign} ${chart.midheaven.degree}°`);

  // Verify Aspects with Orbs and Nature
  assert(chart.aspects.length > 0, `Calculated ${chart.aspects.length} real geometric aspects`);
  const firstAspect = chart.aspects[0];
  assert(typeof firstAspect.angle === "number" && typeof firstAspect.orb === "number", "Aspect contains exact angle and orb");
  assert(Boolean(firstAspect.nature), `Aspect contains nature classification: ${firstAspect.nature}`);

  // Single Source of Truth: chartJson structure
  assert(Boolean(chart.chartJson.planets && chart.chartJson.houses && chart.chartJson.aspects), "chartJson contains canonical single-source-of-truth structure");

  // Determinism test: same inputs must yield identical chart
  const chart2 = calculateNatalEphemeris("1994-08-09", "07:24", 37.7749, -122.4194, "America/Los_Angeles", "Placidus");
  assert(JSON.stringify(chart.chartJson) === JSON.stringify(chart2.chartJson), "Ephemeris calculation is 100% deterministic (reproducible)");

  // -------------------------------------------------------------
  // Test 3: Daily Transit Engine
  // -------------------------------------------------------------
  console.log("\n--- 3. Personalized Daily Transit Horoscope ---");
  const todayStr = new Date().toISOString().split("T")[0];
  const liveTransits = calculateLiveTransits(todayStr, chart.placements);
  assert(liveTransits.transitingPlacements.length > 0, "Transiting planetary coordinates computed for today");
  assert(Boolean(liveTransits.moonPhase.phaseName), `Current moon phase computed: ${liveTransits.moonPhase.phaseName} (${liveTransits.moonPhase.illumination}%)`);
  assert(liveTransits.activeShifts.length > 0, `Cross-examined today's transits against natal placements: found ${liveTransits.activeShifts.length} active shifts`);

  // -------------------------------------------------------------
  // Test 4: Payment & Webhook Verification
  // -------------------------------------------------------------
  console.log("\n--- 4. Paywall & Subscription Infrastructure ---");
  assert(Boolean(PLANS.monthly && PLANS.annual), "Subscription plans configured");
  
  // Test simulated / live checkout creation
  const checkout = await dodoPayments.createCheckoutSession({
    userId: "test-user-123",
    email: "seeker@test.com",
    planId: "monthly",
    returnUrl: "http://localhost:3000/dashboard",
  });
  assert(Boolean(checkout.checkoutUrl && checkout.sessionId), `Checkout session created: ${checkout.sessionId}`);

  // Test webhook event handler
  const sampleWebhookEvent = {
    id: "evt_test_12345",
    type: "subscription.active",
    data: {
      id: "sub_dodo_987",
      customer: {
        metadata: {
          user_id: "user_abc_789",
        },
      },
      next_billing_date: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
    },
  };
  const webhookResult = await dodoPayments.handleWebhookEvent(sampleWebhookEvent);
  assert(webhookResult.handled === true, "Webhook event correctly handled");
  assert(webhookResult.userId === "user_abc_789", "User ID extracted from webhook payload");
  assert(webhookResult.status === "active", "Subscription status correctly transitioned to active");

  console.log("\n=================================================");
  console.log(`  VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED  `);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runP0Tests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
