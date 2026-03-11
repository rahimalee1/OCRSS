"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function AuthNotifications() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { status } = useSession();
  const hasShownSignIn = useRef(false);
  const hasShownSignOut = useRef(false);

  useEffect(() => {
    const signedIn = searchParams.get("signed_in") === "1";
    const signedOut = searchParams.get("signed_out") === "1";

    if (!signedIn && !signedOut) return;

    if (status === "loading") return;

    if (signedIn && status === "authenticated" && !hasShownSignIn.current) {
      toast.dismiss();
      toast.success("Signed in successfully.");
      hasShownSignIn.current = true;
    }

    if (signedOut && status === "unauthenticated" && !hasShownSignOut.current) {
      toast.dismiss();
      toast.success("Signed out successfully.");
      hasShownSignOut.current = true;
    }

    const next = new URLSearchParams(searchParams);
    if (signedIn) next.delete("signed_in");
    if (signedOut) next.delete("signed_out");
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  }, [pathname, searchParams, router, status]);

  return null;
}
