import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Next.js Boilerplate</h1>
        <p className="mt-2 text-muted-foreground">
          Prisma + SQLite dev + Postgres-ready + DB auth + MFA + Admin/User dashboards.
        </p>

        <div className="mt-6 flex gap-3">
          <Link href="/register"><Button>Create account</Button></Link>
          <Link href="/login"><Button variant="ghost">Sign in</Button></Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Configurable Theme", "Edit CSS variables once; everything updates."],
          ["Prisma + SQLite", "Local dev DB with clean migrations and seed."],
          ["MFA + RBAC", "TOTP MFA and admin/user protected routes."]
        ].map(([title, desc]) => (
          <div key={title} className="rounded-xl border border-border bg-card p-6">
            <div className="font-semibold">{title}</div>
            <div className="mt-2 text-sm text-muted-foreground">{desc}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
