import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* ====================== CREATE Score (POST) ====================== */
export async function POST(req: Request) {
  try {
    const { name, score } = await req.json();

    if (!name || score === undefined) {
      return NextResponse.json(
        { error: "Name & Score wajib diisi." },
        { status: 400 }
      );
    }

    console.log("Saving:", { name, score, type: typeof score });

    const result = await prisma.playerResult.create({
      data: { 
        name, 
        score: Number(score),    // <── perbaikan utama
      },
    });

    return NextResponse.json(
      { message: "Score berhasil disimpan!", result },
      { status: 201 }
    );

  } catch (err:any) {
    console.error("POST ERROR:", err);
    return NextResponse.json(
      { error: "POST Error", detail: err.message ?? String(err) },
      { status: 500 }
    );
  }
}

/* ====================== READ Leaderboard (GET) ====================== */
export async function GET() {
  try {
    const results = await prisma.playerResult.findMany({
      orderBy: { score: "desc" },
    });

    return NextResponse.json(results);

  } catch (err:any) {
    return NextResponse.json({ error: "GET Error", detail: err.message }, { status: 500 });
  }
}

/* ====================== DELETE semua score (DELETE) ====================== */
export async function DELETE() {
  try {
    await prisma.playerResult.deleteMany({});
    return NextResponse.json({ message: "Leaderboard berhasil direset!" });

  } catch (err:any) {
    return NextResponse.json({ error: "DELETE Error", detail: err.message }, { status: 500 });
  }
}
