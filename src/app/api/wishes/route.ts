import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const ATTENDANCE_VALUES = ["Hadir", "Tidak Hadir", "Belum Pasti"] as const;

export async function GET() {
  try {
    const wishes = await db.wish.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ data: wishes });
  } catch (error) {
    console.error("GET /api/wishes error:", error);
    return NextResponse.json(
      { error: "Gagal memuat ucapan" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const attendance = ATTENDANCE_VALUES.includes(body.attendance)
      ? (body.attendance as (typeof ATTENDANCE_VALUES)[number])
      : "Hadir";

    if (!name || !message) {
      return NextResponse.json(
        { error: "Nama dan ucapan wajib diisi" },
        { status: 400 }
      );
    }

    if (name.length > 100 || message.length > 1000) {
      return NextResponse.json(
        { error: "Nama maksimal 100 karakter, ucapan maksimal 1000 karakter" },
        { status: 400 }
      );
    }

    const wish = await db.wish.create({
      data: { name, message, attendance },
    });

    return NextResponse.json({ data: wish }, { status: 201 });
  } catch (error) {
    console.error("POST /api/wishes error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim ucapan" },
      { status: 500 }
    );
  }
}
