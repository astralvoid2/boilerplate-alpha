import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { authenticator } from "otplib";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as any;
  const code = String(body?.code ?? "").replace(/\s/g, "");
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.mfaSecretPending) return NextResponse.json({ error: "No pending setup" }, { status: 400 });

  if (!authenticator.check(code, user.mfaSecretPending)) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { mfaEnabled: true, mfaSecret: user.mfaSecretPending, mfaSecretPending: null }
  });

  return NextResponse.json({ ok: true });
}
