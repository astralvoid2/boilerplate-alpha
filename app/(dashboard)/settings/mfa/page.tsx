import MfaManager from "@/components/MfaManager";

export default function MfaSettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">MFA Settings</h1>
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Enable TOTP MFA (Google Authenticator / Microsoft Authenticator / 1Password).
        </p>
        <div className="mt-4">
          <MfaManager />
        </div>
      </div>
    </div>
  );
}
