"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";
import { AuthNotifications } from "./AuthNotifications";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        <AuthNotifications />
      </Suspense>
      {children}
    </SessionProvider>
  );
}
