import { requireOnboarded } from "@/lib/dal";
import { AccountProvider, type ClientAccount } from "@/lib/account-context";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirects to /login if unauthenticated, /onboarding if not yet onboarded.
  const ctx = await requireOnboarded();

  const account: ClientAccount = {
    userId: ctx.userId,
    role: ctx.profile.role,
    displayName: ctx.profile.full_name,
    email: ctx.profile.email,
    status: ctx.profile.status,
    companyId: ctx.companyId,
    influencerId: ctx.influencerId,
  };

  return (
    <AccountProvider value={account}>
      <DashboardShell>{children}</DashboardShell>
    </AccountProvider>
  );
}
