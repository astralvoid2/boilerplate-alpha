import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as any;
  const email = String(body?.email ?? "").toLowerCase().trim();
  const name = body?.name ? String(body.name).trim() : null;
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email is already registered." }, { status: 409 });

  const passwordHash = await hashPassword(password);
  const userCount = await prisma.user.count();

  const user = await prisma.user.create({
    data: { email, name, passwordHash, role: userCount === 0 ? Role.ADMIN : Role.USER },
    select: { id: true, email: true }
  });

  return NextResponse.json({ ok: true, user }, { status: 201 });
}
