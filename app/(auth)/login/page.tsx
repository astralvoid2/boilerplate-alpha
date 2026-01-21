"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      otp: otp || undefined,
      redirect: false
    });

    setBusy(false);

    if (!res?.ok) {
      setError("Login failed. Check email/password — and OTP if MFA is enabled.");
      return;
    }

    window.location.href = next;
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>

      <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-border bg-card p-6">
        <div>
          <label className="text-sm">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>

        <div>
          <label className="text-sm">One-time code (if enabled)</label>
          <Input value={otp} onChange={(e) => setOtp(e.target.value)} inputMode="numeric" placeholder="123456" />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <Button disabled={busy} type="submit">{busy ? "Signing in..." : "Sign in"}</Button>

        <div className="text-sm text-muted-foreground">
          No account? <Link className="underline" href="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
