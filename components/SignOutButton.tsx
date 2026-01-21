"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function SignOutButton() {
  return (
    <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })} type="button">
      Sign out
    </Button>
  );
}
