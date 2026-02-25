"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

const ContactForm = () => {
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
    <>
      <section id="contact-form" className="dark:bg-dark pb-24">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-8 items-center">
            <div className="lg:col-span-6 lg:order-1 order-2">
              <h2 className="max-w-72 text-[40px] leading-tight font-bold mb-4 text-midnight_text dark:text-white">
                Contact us
              </h2>
              <p className="text-base text-muted dark:text-white/70 mb-6">
                Charity activities are taking place around the world. Send us a
                message and we’ll get back to you as soon as possible.
              </p>
              <form
                className="flex flex-wrap w-full m-auto justify-between"
                onSubmit={handleSubmit}
              >
                <div className="w-full mx-0 my-2.5">
                  <label
                    htmlFor="name"
                    className="pb-3 inline-block text-base text-midnight_text dark:text-white"
                  >
                    Name*
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white  dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    type="text"
                  />
                </div>
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="phone"
                      className="pb-3 inline-block text-base text-midnight_text dark:text-white"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      className="w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white  dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                      type="tel"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="email"
                      className="pb-3 inline-block text-base text-midnight_text dark:text-white"
                    >
                      Email*
                    </label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white  dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    />
                  </div>
                </div>
                <div className="w-full mx-0 my-2.5">
                  <label
                    htmlFor="subject"
                    className="pb-3 inline-block text-base text-midnight_text dark:text-white"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    className="w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white  dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    type="text"
                  />
                </div>
                <div className="w-full mx-0 my-2.5">
                  <label
                    htmlFor="message"
                    className="pb-3 inline-block text-base text-midnight_text dark:text-white"
                  >
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white  dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                  />
                </div>
                <div className="mx-0 my-2.5 w-full">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-linear-to-r from-primary to-secondary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:from-transparent hover:to-transparent hover:text-primary border hover:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Send message"}
                  </button>
                </div>
                {submitError && (
                  <p className="mt-2 text-sm text-red-500">{submitError}</p>
                )}
              </form>
            </div>
            <div className="lg:col-span-6 lg:order-2 order-1">
              <Image
                src="/images/contact-page/contact.jpg"
                alt="Contact"
                width={1300}
                height={0}
                quality={100}
                style={{ width: "100%", height: "auto" }}
                className="bg-no-repeat bg-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
