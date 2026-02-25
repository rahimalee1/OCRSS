"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const ContactTeaserForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const value = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit contact form");
      }

      toast.success("Thank you! Your message has been sent.");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      const message =
        error?.message || "Something went wrong. Please try again.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="w-full p-4 border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark rounded-sm focus-visible:outline-hidden"
        />
      </div>
      <div className="mb-6">
        <input
          type="tel"
          name="phone"
          placeholder="Your phone number (optional)"
          className="w-full p-4 border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark rounded-sm focus-visible:outline-hidden"
        />
      </div>
      <div className="mb-6">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="w-full p-4 border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark rounded-sm focus-visible:outline-hidden"
        />
      </div>
      <div className="mb-6">
        <input
          type="text"
          name="subject"
          placeholder="Subject (optional)"
          className="w-full p-4 border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark rounded-sm focus-visible:outline-hidden"
        />
      </div>
      <div className="mb-6">
        <textarea
          name="message"
          required
          rows={4}
          placeholder="How can we help you?"
          className="w-full p-4 border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark rounded-sm focus-visible:outline-hidden"
        />
      </div>
      <div className="flex justify-center mb-2">
        <button
          type="submit"
          disabled={submitting}
          className="text-white bg-linear-to-r from-error to-warning px-7 py-4 dark:hover:from-dark hover:from-white hover:to-white dark:hover:to-dark border border-transparent hover:border-error hover:text-error rounded-sm w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending..." : "Send message"}
        </button>
      </div>
      {submitError && (
        <p className="text-sm text-red-500 mb-4">{submitError}</p>
      )}
    </form>
  );
};

export default ContactTeaserForm;

