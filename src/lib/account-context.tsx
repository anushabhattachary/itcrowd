"use client";

import { createContext, useContext } from "react";
import type { Role } from "@/lib/types";

export interface ClientAccount {
  userId: string;
  role: Role;
  displayName: string;
  email: string;
  status: "active" | "pending" | "suspended";
  companyId: string | null;
  influencerId: string | null;
}

const AccountContext = createContext<ClientAccount | null>(null);

export function AccountProvider({
  value,
  children,
}: {
  value: ClientAccount;
  children: React.ReactNode;
}) {
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount(): ClientAccount {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within an AccountProvider");
  return ctx;
}
