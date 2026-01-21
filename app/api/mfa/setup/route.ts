import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { authenticator } from "otplib";
import QRCode from "qrcode";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const secret = authenticator.generateSecret();
  const label = encodeURIComponent(user.email);
  const issuer = encodeURIComponent("NextjsBoilerplate");
  const otpauth = authenticator.keyuri(label, issuer, secret);

  const qrDataUrl = await QRCode.toDataURL(otpauth);

  await prisma.user.update({ where: { id: user.id }, data: { mfaSecretPending: secret } });

  return NextResponse.json({
    qrDataUrl,
    secretPreview: secret.slice(0, 4) + "..." + secret.slice(-4)
  });
}
