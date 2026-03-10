"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  source?: string;
}

export default function NewsletterSignup({ source }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }
      setMessage("Thank you for subscribing. We will keep you updated.");
      setEmail("");
    } catch (err: any) {
      setError(err?.message || "Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="p-3 dark:bg-dark border border-border dark:border-dark_border rounded-lg mb-1 w-full focus:outline-0 focus:border-primary dark:focus:border-primary"
        disabled={submitting}
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-linear-to-r w-full from-primary to-secondary px-7 border text-base text-white border-transparent py-4 rounded-sm hover:from-transparent hover:to-transparent hover:border-primary hover:text-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Subscribing..." : "Subscribe"}
      </button>
      {message && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{message}</p>
      )}
      {error && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}
    </form>
  );
}

