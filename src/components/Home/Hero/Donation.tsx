"use client"

import Logo from "@/components/Layout/Header/Logo";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-md border placeholder:text-gray-400 border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary";

export const Donation = () => {
  const [donationAmount, setDonationAmount] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function getDonationAmount(value: any) {
    setDonationAmount(String(value));
  }

  useEffect(() => {
    if (donationAmount !== null && inputRef.current) {
      inputRef.current.value = donationAmount;
    }
  }, [donationAmount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(form);
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const amount =
      donationAmount ||
      (formData.get("customAmount") as string) ||
      (formData.get("amount") as string) ||
      "";
    const anonymous = formData.get("anonymous") === "on";

    try {
      const res = await fetch("/api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          amount,
          anonymous,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit donation");
      }

      toast.success("Thank you! Your donation details have been sent successfully.");
      formRef.current?.reset();
      setDonationAmount(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error: any) {
      const message = error.message || "Something went wrong. Please try again.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="max-w-[220px]">
          <Logo />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-midnight_text dark:text-white text-center">
        Donate Now
      </h3>
      <p className="text-sm text-muted dark:text-white/60 mb-8 text-center max-w-md mx-auto">
        Your gift helps us provide settlement, education, and community support
        to refugees and newcomers in British Columbia.
      </p>

      <form ref={formRef} onSubmit={handleSubmit}>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
          Personal Information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First name *"
            name="firstName"
            required
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Last name *"
            name="lastName"
            required
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            type="email"
            placeholder="Email address *"
            name="email"
            required
            className={inputClass}
          />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
          Donation Amount
        </p>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            ref={inputRef}
            placeholder="Choose or enter amount ($)"
            name="amount"
            className={inputClass}
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="donation"
              onChange={(e: any) => getDonationAmount(e.target.value)}
              value={10}
              className="text-primary focus:ring-primary"
            />
            <span className="text-muted dark:text-white/60">$10</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="donation"
              onChange={(e: any) => getDonationAmount(e.target.value)}
              value={50}
              className="text-primary focus:ring-primary"
            />
            <span className="text-muted dark:text-white/60">$50</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="donation"
              onChange={(e: any) => getDonationAmount(e.target.value)}
              value={100}
              className="text-primary focus:ring-primary"
            />
            <span className="text-muted dark:text-white/60">$100</span>
          </label>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            type="number"
            onChange={(e: any) => getDonationAmount(e.target.value)}
            placeholder="$ Other amount"
            name="customAmount"
            min={1}
            className={inputClass}
          />
        </div>

        <div className="flex gap-2 items-center mb-6">
          <input
            type="checkbox"
            id="anonymous"
            name="anonymous"
            className="rounded border-border dark:border-dark_border text-primary focus:ring-primary"
          />
          <label
            htmlFor="anonymous"
            className="text-muted dark:text-white/60 text-base cursor-pointer"
          >
            I would like to donate anonymously
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="text-white w-full text-base bg-linear-to-r from-primary to-secondary font-semibold border border-transparent py-4 px-7 rounded-md hover:text-primary hover:border-primary hover:from-transparent hover:to-transparent disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending..." : "Donate now"}
        </button>
        {submitError && (
          <p className="mt-4 text-sm text-red-500 text-center">{submitError}</p>
        )}
      </form>
    </>
  );
}
