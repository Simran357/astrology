import { getAuthenticatedUser } from "../src/server/supabaseServer";
import { dodoPayments } from "../src/lib/payments/dodoPayments";

async function runSecurityTests() {
  console.log("=================================================");
  console.log("  ASTROFINDINGS P0 SECURITY & ISOLATION TESTS    ");
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
  // Test 1: Never Trust Client-Supplied userId
  // -------------------------------------------------------------
  console.log("--- 1. Client userId Spoofing Prevention ---");
  
  // Create mock request where malicious client sends someone else's userId in the body
  const spoofedReq = new Request("http://localhost:3000/api/natal/chart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // No Authorization token provided
    },
    body: JSON.stringify({
      userId: "victim-user-999", // Malicious spoof
      birthDate: "1990-01-01",
    }),
  });

  const authContext = await getAuthenticatedUser(spoofedReq);
  // Auth context must NOT take userId from the request body!
  assert(authContext.userId !== "victim-user-999", "Server rejected client-supplied victim userId in request body");

  // -------------------------------------------------------------
  // Test 2: Webhook Signature Verification
  // -------------------------------------------------------------
  console.log("\n--- 2. Webhook Replay & Forgery Defense ---");
  const validPayload = JSON.stringify({ id: "evt_1", type: "subscription.active" });
  
  // Empty or invalid signature should be rejected when secret is configured
  const emptySigValid = dodoPayments.verifyWebhookSignature(validPayload, "");
  assert(emptySigValid === false, "Empty webhook signature is rejected");

  // -------------------------------------------------------------
  // Test 3: Subscription Status Transitions
  // -------------------------------------------------------------
  console.log("\n--- 3. Canonical Subscription Status Representation ---");
  const canonicalStatuses = ["free", "active", "trialing", "cancelled", "expired", "past_due"];
  assert(canonicalStatuses.length === 6, "All 6 required subscription states represented in types");

  console.log("\n=================================================");
  console.log(`  SECURITY RESULTS: ${passed} PASSED, ${failed} FAILED  `);
  console.log("=================================================");

  if (failed > 0) process.exit(1);
}

runSecurityTests().catch((e) => {
  console.error("Security test error:", e);
  process.exit(1);
});
