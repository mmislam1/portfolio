import { NextResponse } from "next/server";
import { getPortfolioData, writePortfolioData } from "@/lib/portfolioDb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json(data);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const data = await writePortfolioData(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not update portfolio data." },
      { status: 400 }
    );
  }
}
