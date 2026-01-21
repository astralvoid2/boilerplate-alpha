import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function NavBar() {
  const session = await auth();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link href="/" className="font-semibold">
          Next.js Boilerplate
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {!session?.user ? (
            <>
              <Link href="/login" className="underline">Login</Link>
              <Link href="/register" className="underline">Register</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="underline">Dashboard</Link>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="underline">Admin</Link>
              )}
              <SignOutButton />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
