import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await auth();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, role: true, mfaEnabled: true, createdAt: true }
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm text-muted-foreground">You are</div>
        <div className="mt-1 font-medium">
          {session?.user?.email} ({session?.user?.role})
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
        <h2 className="font-semibold mb-3">Users</h2>
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="border-b border-border">
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">MFA</th>
              <th className="py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-border">
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.role}</td>
                <td className="py-2">{u.mfaEnabled ? "Enabled" : "Off"}</td>
                <td className="py-2">{u.createdAt.toISOString().slice(0,10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-xs text-muted-foreground">
          (CRUD actions intentionally left as v2 — clean skeleton first.)
        </div>
      </div>
    </div>
  );
}
