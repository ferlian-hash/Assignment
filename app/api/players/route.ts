import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// CREATE - Simpan hasil player
export async function POST(req: Request) {
  const { name, score } = await req.json();

  if (!name || score === undefined) {
    return NextResponse.json({ error: "Name & Score wajib" }, { status: 400 });
  }

  const result = await prisma.playerResult.create({
    data: { name, score }
  });

  return NextResponse.json({ message: "Saved!", result });
}

// READ - Ambil list leaderboard
export async function GET() {
  const results = await prisma.playerResult.findMany({
    orderBy: { score: "desc" }
  });

  return NextResponse.json(results);
}
