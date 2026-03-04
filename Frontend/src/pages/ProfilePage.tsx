import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";

export function ProfilePage() {
  return (
    <AppShell title="Profile">
      <EmptyState
        title="Profile"
        description="Add auth and profile settings here. Your avatar, display name, and preferences will appear once connected."
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />
    </AppShell>
  );
}
