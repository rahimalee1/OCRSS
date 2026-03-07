"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function DonateSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
      return;
    }

    fetch(`/api/stripe/session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setDonorName(data.firstName || "");
        setAmount(data.amount || "");
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [sessionId, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey dark:bg-darkmode">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-muted dark:text-white/60 text-lg">Confirming your donation...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey dark:bg-darkmode px-4">
        <div className="max-w-md w-full text-center bg-white dark:bg-dark_card rounded-2xl shadow-xl p-10">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#ef4444" opacity="0.15"/>
              <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-midnight_text dark:text-white mb-3">Something went wrong</h1>
          <p className="text-muted dark:text-white/60 mb-8">We could not verify your donation. Please contact us if your payment was charged.</p>
          <Link href="/" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey dark:bg-darkmode px-4">
      <div className="max-w-lg w-full text-center bg-white dark:bg-dark_card rounded-2xl shadow-xl p-10">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24">
            <path fill="#2cdd9b" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L10.5 13.44l4.47-4.47a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"/>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-midnight_text dark:text-white mb-3">
          Thank you{donorName ? `, ${donorName}` : ""}!
        </h1>
        <p className="text-muted dark:text-white/60 text-lg mb-2">
          Your donation{amount ? ` of $${amount} CAD` : ""} has been received.
        </p>
        <p className="text-muted dark:text-white/60 mb-8">
          You will receive a confirmation email shortly. Your generosity helps us provide settlement, education, and community support to newcomers in British Columbia.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-8 text-left">
          <p className="text-sm font-semibold text-primary mb-1">What happens next?</p>
          <ul className="text-sm text-muted dark:text-white/60 space-y-1 list-disc list-inside">
            <li>A receipt has been sent to your email</li>
            <li>Our team has been notified of your donation</li>
            <li>Your support will be put to work immediately</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Return Home
          </Link>
          <Link
            href="/about"
            className="border border-border dark:border-dark_border text-midnight_text dark:text-white font-semibold px-8 py-3 rounded-lg hover:border-primary hover:text-primary transition"
          >
            Learn About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
