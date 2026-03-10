"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { AuthNotifications } from "./AuthNotifications";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthNotifications />
      {children}
    </SessionProvider>
  );
}
