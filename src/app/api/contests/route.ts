import { NextResponse } from "next/server";

import mockData from "@/data/contests.json";

export const runtime = "nodejs";

export async function GET() {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)
  );

  return NextResponse.json(mockData);
}
