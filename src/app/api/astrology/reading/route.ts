import { NextResponse } from "next/server";
import { processAstrologyReading, ServerReadingRequest } from "@/server/astrologyApiServer";

export async function POST(req: Request) {
  try {
    const payload: ServerReadingRequest = await req.json();
    const result = await processAstrologyReading(payload);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error: any) {
    console.error("Error in Next.js /api/astrology/reading route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during astrology calculation." },
      { status: 500 }
    );
  }
}
