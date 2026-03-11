"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-lg border border-border dark:border-dark_border bg-white dark:bg-dark px-4 py-3 text-base text-midnight_text dark:text-white placeholder:text-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const btnPrimary =
  "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#00180f] text-white font-semibold px-4 py-3 text-base hover:bg-[#0d1410] transition-colors";

const btnSecondary =
  "w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#00180f] bg-white text-[#00180f] font-semibold px-4 py-3 text-base hover:bg-[#00180f]/5 transition-colors dark:bg-transparent dark:text-white dark:hover:bg-[#00180f]/10";

export default function LoginClient({ callbackUrl }: { callbackUrl: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const url = callbackUrl.includes("?") ? `${callbackUrl}&signed_in=1` : `${callbackUrl}?signed_in=1`;
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        callbackUrl: url,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid email or password.");
        return;
      }
      if (res?.url) {
        window.location.href = res.url;
        return;
      }
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    setLoadingGoogle(true);
    toast.loading("Redirecting to Google…");
    const url = callbackUrl.includes("?") ? `${callbackUrl}&signed_in=1` : `${callbackUrl}?signed_in=1`;
    signIn("google", { callbackUrl: url });
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-darkmode rounded-xl border border-border dark:border-dark_border shadow-cause-shadow dark:shadow-darkmd overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold text-midnight_text dark:text-white mb-1">
              Login
            </h1>
            <p className="text-sm text-muted dark:text-white/60 mb-8 text-center max-w-sm">
              Sign in with your admin account or use Google.
            </p>

            <form onSubmit={handleCredentialsSubmit} className="w-full space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={inputClass}
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={inputClass}
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? "Signing in…" : "Sign in with email"}
              </button>
            </form>

            <div className="w-full flex items-center gap-3 mb-6">
              <span className="flex-1 h-px bg-border dark:bg-dark_border" />
              <span className="text-xs text-muted dark:text-white/50">or</span>
              <span className="flex-1 h-px bg-border dark:bg-dark_border" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loadingGoogle}
              className={`${btnSecondary} disabled:opacity-50`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
