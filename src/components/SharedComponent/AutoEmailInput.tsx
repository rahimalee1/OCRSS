"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface AutoEmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  /** Hide the helper text (used when layout is tight in multi-column grids) */
  hideHelperText?: boolean;
}

export function AutoEmailInput(props: AutoEmailInputProps) {
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session?.user?.email);
  const sessionEmail = session?.user?.email ?? "";
  const [guestEmail, setGuestEmail] = useState("");

  const {
    className,
    hideHelperText,
    ...rest
  } = props;

  const value = isLoggedIn ? sessionEmail : guestEmail;

  return (
    <>
      <input
        {...rest}
        type="email"
        name={props.name ?? "email"}
        value={value}
        onChange={isLoggedIn ? undefined : (e) => setGuestEmail(e.target.value)}
        readOnly={isLoggedIn}
        className={`${className || ""} ${isLoggedIn ? "cursor-not-allowed bg-gray-100 dark:bg-dark/50 opacity-90" : ""}`}
        aria-label={isLoggedIn ? "Email (from your Google account)" : (props["aria-label"] || "Email")}
      />
      {isLoggedIn && !hideHelperText && (
        <p className="text-xs text-muted dark:text-white/50 mt-1">
          Using your Google account email. This cannot be changed.
        </p>
      )}
    </>
  );
}

