"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type SetupResponse = { qrDataUrl: string; secretPreview: string };

export default function MfaManager() {
  const [setup, setSetup] = useState<SetupResponse | null>(null);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function beginSetup() {
    setBusy(true);
    setStatus(null);
    const res = await fetch("/api/mfa/setup", { method: "POST" });
    setBusy(false);
    if (!res.ok) return setStatus("Failed to start setup.");
    setSetup(await res.json());
  }

  async function verify() {
    if (!code.trim()) return;
    setBusy(true);
    setStatus(null);
    const res = await fetch("/api/mfa/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code })
    });
    setBusy(false);
    if (!res.ok) return setStatus("Invalid code. Try again.");
    setStatus("MFA enabled! Next login will require an OTP code.");
    setSetup(null);
    setCode("");
  }

  async function disable() {
    setBusy(true);
    setStatus(null);
    const res = await fetch("/api/mfa/disable", { method: "POST" });
    setBusy(false);
    if (!res.ok) return setStatus("Failed to disable MFA.");
    setStatus("MFA disabled.");
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button onClick={beginSetup} disabled={busy}>{busy ? "Working..." : "Enable MFA"}</Button>
        <Button variant="ghost" onClick={disable} disabled={busy}>Disable MFA</Button>
      </div>

      {status && <div className="text-sm">{status}</div>}

      {setup && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <div className="font-semibold">Scan QR code in your authenticator</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={setup.qrDataUrl} alt="MFA QR Code" className="w-56 h-56 border border-border rounded-md" />
          <div className="text-xs text-muted-foreground">
            Secret (preview): <code>{setup.secretPreview}</code>
          </div>

          <div>
            <label className="text-sm">Enter 6-digit code</label>
            <Input value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" placeholder="123456" />
          </div>

          <Button onClick={verify} disabled={busy}>Verify & Enable</Button>
        </div>
      )}
    </div>
  );
}
