"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export function AuthNotifications() {
  const { status } = useSession();
  const previousStatus = useRef<SessionStatus>("loading");

  useEffect(() => {
    const prev = previousStatus.current;

    // Show success once when we first reach authenticated
    if (status === "authenticated" && prev !== "authenticated") {
      toast.dismiss();
      toast.success("Signed in successfully.");
    }

    // Show success when we arrive at unauthenticated after being signed in
    // (allow for an intermediate "loading" state during redirects)
    if (status === "unauthenticated" && prev !== "unauthenticated") {
      toast.dismiss();
      toast.success("Signed out successfully.");
    }

    previousStatus.current = status as SessionStatus;
  }, [status]);

  return null;
}

