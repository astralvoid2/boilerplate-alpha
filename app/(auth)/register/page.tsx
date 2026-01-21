"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, name, password })
    });

    setBusy(false);

    if (!res.ok) {
      const msg = (await res.json().catch(() => ({})))?.error ?? "Registration failed";
      setError(msg);
      return;
    }

    await signIn("credentials", { email, password, redirect: true, callbackUrl: "/dashboard" });
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>

      <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-border bg-card p-6">
        <div>
          <label className="text-sm">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        </div>

        <div>
          <label className="text-sm">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          <div className="mt-1 text-xs text-muted-foreground">Use a strong password. (Enforce policy later.)</div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <Button disabled={busy} type="submit">{busy ? "Creating..." : "Create account"}</Button>

        <div className="text-sm text-muted-foreground">
          Already have an account? <Link className="underline" href="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
