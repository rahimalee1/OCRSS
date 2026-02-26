"use client"

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import toast from "react-hot-toast";

const Volunteer = () => {
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleMembershipSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const value = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit membership");
      }

      toast.success("Thank you! Your membership request has been sent.");
      e.target.reset();
      setIsMemberOpen(false);
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
      <section className="lg:py-28 py-16 bg-[url('/images/background/volunteer-bg.jpg')] bg-no-repeat bg-cover overflow-hidden">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="text-center">
            <h2 className="text-3xl font-medium text-white mb-6">
              Become a member
            </h2>
            <p className="text-base text-white lg:max-w-60% mx-auto mb-6">
              Join our mission to make a positive impact! As a member, you’ll
              stand with Oromo refugees, immigrants, and newcomers, helping us
              provide vital services and build a stronger community.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setIsMemberOpen(true)}
                className="text-white rounded-md bg-linear-to-r text-sm font-semibold from-error to-warning px-7 py-4 hover:from-transparent hover:to-transparent border border-transparent hover:border-error hover:text-error"
              >
                Become a member
              </button>
            </div>
          </div>
        </div>
      </section>

      {isMemberOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMemberOpen(false);
          }}
        >
          <div className="relative mx-auto my-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white px-6 py-8 text-left dark:bg-dark">
            <button
              onClick={() => setIsMemberOpen(false)}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute top-4 right-4"
              aria-label="Close membership form"
            >
              <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
            </button>
            <h3 className="text-2xl font-semibold mb-2 text-midnight_text dark:text-white text-center">
              Become a Member
            </h3>
            <p className="text-sm text-muted dark:text-white/70 mb-6 text-center">
              Fill out the form below to join our community and support Oromo Cultural
              Resettlement Services Society.
            </p>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleMembershipSubmit}
            >
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  First Name
                </label>
                <input
                  name="firstName"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Middle Name
                </label>
                <input
                  name="middleName"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Last Name
                </label>
                <input
                  name="lastName"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Age
                </label>
                <input
                  name="age"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="number"
                  min={0}
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Gender
                </label>
                <select
                  name="gender"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="preferNotSay">Prefer not to say</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Address
                </label>
                <input
                  name="address"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  City
                </label>
                <input
                  name="city"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Province / State
                </label>
                <select
                  name="province"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select province</option>
                  <option value="BC">British Columbia</option>
                  <option value="ON">Ontario</option>
                  <option value="QC">Quebec</option>
                  <option value="AB">Alberta</option>
                  <option value="MB">Manitoba</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NB">New Brunswick</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="YT">Yukon</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Postal / Zip Code
                </label>
                <input
                  name="zip"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Email
                </label>
                <input
                  name="email"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Phone Number
                </label>
                <input
                  name="phone"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="tel"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Office Phone
                </label>
                <input
                  name="officePhone"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="tel"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Home Phone
                </label>
                <input
                  name="homePhone"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="tel"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Educational
                </label>
                <input
                  name="education"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Job / Employment
                </label>
                <select
                  name="employment"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select status</option>
                  <option value="employed">Has / Employed</option>
                  <option value="unemployed">Not available / Unemployed</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                  <option value="separated">Separated</option>
                  <option value="widow">Widow</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Children
                </label>
                <select
                  name="children"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select option</option>
                  <option value="yes">I have / Yes</option>
                  <option value="no">I don't have / No</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Family Size
                </label>
                <select
                  name="familySize"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select family size</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="10+">10+</option>
                </select>
              </div>
              <div className="md:col-span-2 mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-linear-to-r from-primary to-secondary rounded-lg text-white py-3 px-8 hover:from-transparent hover:to-transparent hover:text-primary border hover:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Submit membership"}
                </button>
              </div>
            </form>
            {submitError && (
              <p className="mt-4 text-sm text-red-500">{submitError}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Volunteer;