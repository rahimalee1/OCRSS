"use client"

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import toast from "react-hot-toast";

const UrgentDonation = () => {
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleVolunteerSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const value = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit volunteer form");
      }

      toast.success("Thank you! Your volunteer form has been sent.");
      e.target.reset();
      setIsVolunteerOpen(false);
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
      <section className=" bg-[url('/images/background/donate-banner.jpg')] bg-cover sm:py-52 lg:py-28 py-16 bg-no-repeat">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div
            className="bg-white dark:bg-dark max-w-29 w-full px-10 py-14 rounded-lg text-center mx-auto"
            data-aos="fade-right"
          >
            <h3 className="sm:text-2xl text-lg font-bold mb-3">
              Make a Difference in Your Community
            </h3>
            <p className="text-muted dark:text-white/60 sm:text-base text-sm mb-4">
              Your time can be just as powerful as a donation. Join our volunteer
              team to support settlement services, education programs, community events, and outreach for newcomer families.
            </p>
            <p className="text-xs sm:text-sm text-muted dark:text-white/60 mb-7">
              It takes less than 3 minutes to sign up. Choose the days, times, and type of
              work that fits you best.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setIsVolunteerOpen(true)}
                className="bg-linear-to-r from-primary to-secondary px-7 border text-sm font-semibold text-white border-transparent py-4 rounded-sm hover:from-transparent hover:to-transparent hover:border-primary hover:text-primary"
              >
                Become a volunteer
              </button>
            </div>
          </div>
        </div>
      </section>

      {isVolunteerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsVolunteerOpen(false);
          }}
        >
          <div className="relative mx-auto my-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white px-6 py-8 text-left dark:bg-dark">
            <button
              onClick={() => setIsVolunteerOpen(false)}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute top-4 right-4"
              aria-label="Close volunteer form"
            >
              <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
            </button>
            <h3 className="text-2xl font-semibold mb-2 text-midnight_text dark:text-white text-center">
              Become a Volunteer
            </h3>
            <p className="text-sm text-muted dark:text-white/70 mb-6 text-center">
              Fill out the form below to join our volunteer team and support Oromo
              Cultural Resettlement Services Society.
            </p>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleVolunteerSubmit}
            >
              {/* 1 - Personal info */}
              <div className="md:col-span-2">
                <h4 className="text-base font-semibold mb-2 text-midnight_text dark:text-white">
                  1. Personal Information
                </h4>
              </div>
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
                  Date of Birth
                </label>
                <input
                  name="dob"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="date"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Gender / Sex
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
                  State / Province
                </label>
                <input
                  name="state"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Zip / Postal Code
                </label>
                <input
                  name="zip"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>

              {/* 2 - Availability */}
              <div className="md:col-span-2 mt-4">
                <h4 className="text-base font-semibold mb-2 text-midnight_text dark:text-white">
                  2. Your Availability
                </h4>
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Days You Are Available
                </label>
                <textarea
                  name="availableDays"
                  rows={2}
                  placeholder="e.g. Monday, Wednesday, Friday"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Available Time
                </label>
                <input
                  name="availableTime"
                  placeholder="e.g. Evenings, 4–8 PM"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Preferred Shift Length
                </label>
                <select
                  name="shiftLength"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select length</option>
                  <option value="1-hour">1 hour</option>
                  <option value="2-hour">2 hours</option>
                  <option value="3-hour">3 hours</option>
                  <option value="4-hour">4 hours</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Availability Start Date
                </label>
                <input
                  name="availabilityStart"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="date"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Availability End Date
                </label>
                <input
                  name="availabilityEnd"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="date"
                />
              </div>

              {/* 3 - Emergency Contact */}
              <div className="md:col-span-2 mt-4">
                <h4 className="text-base font-semibold mb-2 text-midnight_text dark:text-white">
                  3. Emergency Contact Information
                </h4>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Emergency Contact Name
                </label>
                <input
                  name="emergencyName"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Relationship
                </label>
                <input
                  name="emergencyRelationship"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Emergency Contact Phone Number
                </label>
                <input
                  name="emergencyPhone"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  type="tel"
                />
              </div>

              {/* 4 - Experience & Skills */}
              <div className="md:col-span-2 mt-4">
                <h4 className="text-base font-semibold mb-2 text-midnight_text dark:text-white">
                  4. Your Experience &amp; Skills
                </h4>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Previous Volunteer Experience
                </label>
                <select
                  name="previousExperience"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Relevant Skills / Qualifications
                </label>
                <textarea
                  name="skills"
                  rows={2}
                  placeholder="e.g. Event planning, first aid, teaching, customer service, IT, others"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                />
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Languages Spoken
                </label>
                <textarea
                  name="languages"
                  rows={2}
                  placeholder="e.g. English, Afaan Oromo, others"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                />
              </div>

              {/* 5 - Interests & Preferences */}
              <div className="md:col-span-2 mt-4">
                <h4 className="text-base font-semibold mb-2 text-midnight_text dark:text-white">
                  5. Your Interests &amp; Preferences
                </h4>
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Type of Work You Are Interested In
                </label>
                <textarea
                  name="workType"
                  rows={2}
                  placeholder="e.g. Outreach, event assistance, fundraising, administrative support"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                />
              </div>

              {/* 6 - Background & Consent */}
              <div className="md:col-span-2 mt-4">
                <h4 className="text-base font-semibold mb-2 text-midnight_text dark:text-white">
                  6. Background &amp; Consent
                </h4>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Consent to Background Check
                </label>
                <select
                  name="backgroundCheckConsent"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Liability Waiver / Assumption of Risk
                </label>
                <select
                  name="liabilityWaiver"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Photo / Media Release
                </label>
                <select
                  name="mediaRelease"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Why do you want to volunteer with us?
                </label>
                <textarea
                  name="motivation"
                  rows={3}
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="pb-2 text-base text-midnight_text dark:text-white">
                  Consent for Future Communication
                </label>
                <select
                  name="futureCommunicationConsent"
                  className="w-full text-base px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-linear-to-r from-primary to-secondary rounded-lg text-white py-3 px-8 hover:from-transparent hover:to-transparent hover:text-primary border hover:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Submit volunteer form"}
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

export default UrgentDonation;