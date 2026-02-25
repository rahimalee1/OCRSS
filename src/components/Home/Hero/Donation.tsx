 "use client"

import Logo from "@/components/Layout/Header/Logo";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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
      <div className="mb-10 text-center mx-auto inline-block max-w-[170px]">
        <Logo />
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-[22px]">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              className="w-full rounded-md border placeholder:text-gray-400  border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-[22px]">
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              className="w-full rounded-md border placeholder:text-gray-400  border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-[22px]">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              className="w-full rounded-md border placeholder:text-gray-400  border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-2.5">
            <input
              type="text"
              ref={inputRef}
              placeholder="Choose donation amount"
              name="amount"
              className="w-full rounded-md border placeholder:text-gray-400  border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-2">
                        <div className="flex gap-4">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="donation"
                  id="donation-10"
                  onChange={(e: any) => getDonationAmount(e.target.value)}
                  value={10}
                />
                <label
                  htmlFor="donation-10"
                  className="text-muted dark:text-white/60"
                >
                  $10
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="donation"
                  id="donation-50"
                  onChange={(e: any) => getDonationAmount(e.target.value)}
                  value={50}
                />
                <label
                  htmlFor="donation-50"
                  className="text-muted dark:text-white/60"
                >
                  $50
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="donation"
                  id="donation-100"
                  onChange={(e: any) => getDonationAmount(e.target.value)}
                  value={100}
                />
                <label
                  htmlFor="donation-100"
                  className="text-muted dark:text-white/60"
                >
                  $100
                </label>
              </div>
                        </div>
            </div>
            <div className="mb-[22px] flex items-center gap-6">
            <input
              type="number"
              onChange={(e: any) => {
                getDonationAmount(e.target.value);
              }}
              placeholder="$ Other value"
              name="customAmount"
              className="w-full placeholder:text-gray-400 border-b min-w-44 rounded-none border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
            />
            <p className="text-[15px] text-nowrap/60 dark:text-white" >Other donation amount</p>
          </div>

          <div className="flex gap-2 items-center">
            <input type="checkbox" id="anonymous" name="anonymous" />
            <label
              htmlFor="anonymous"
              className="text-muted dark:text-white/60 text-base"
            >
              I would like to donate anonymously
            </label>
          </div>
                    
          <div className="mb-0 mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="text-white w-full text-base bg-linear-to-r from-primary to-secondary font-semibold border border-transparent py-4 px-7 rounded-md hover:text-primary hover:border-primary hover:from-transparent hover:to-transparent disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Donate now"}
            </button>
          </div>
          {submitError && (
            <p className="mt-4 text-sm text-red-500">{submitError}</p>
          )}
        </form>
      </>
    );
};
