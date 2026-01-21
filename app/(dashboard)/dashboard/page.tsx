import Link from "next/link";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm text-muted-foreground">Signed in as</div>
        <div className="mt-1 font-medium">{session?.user?.email}</div>

        <div className="mt-4 text-sm">
          <Link className="underline" href="/settings/mfa">Manage MFA</Link>
        </div>
      </div>
    </div>
  );
}
