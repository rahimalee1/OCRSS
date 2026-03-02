"use client"

import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "@/components/Layout/Header/Logo";
import { useState } from "react";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-md border placeholder:text-gray-400 border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary";

const selectClass =
  "w-full rounded-md border border-border dark:border-dark_border border-solid bg-white dark:bg-dark px-5 py-3 text-base text-dark dark:text-white outline-hidden transition focus:border-primary dark:focus:border-primary [&>option]:bg-white [&>option]:text-dark dark:[&>option]:bg-dark dark:[&>option]:text-white";

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

      toast.success("Thank you! Your volunteer application has been sent.");
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
      <section className="bg-[url('/images/background/donate-banner.jpg')] bg-cover sm:py-52 lg:py-28 py-16 bg-no-repeat">
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
          <div className="relative mx-auto my-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white px-8 py-10 text-left dark:bg-dark shadow-2xl form-modal-scroll">
            <button
              onClick={() => setIsVolunteerOpen(false)}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute top-4 right-4 z-10"
              aria-label="Close volunteer form"
            >
              <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="max-w-[170px]">
                <Logo />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-midnight_text dark:text-white text-center">
              Become a Volunteer
            </h3>
            <p className="text-sm text-muted dark:text-white/60 mb-8 text-center max-w-md mx-auto">
              Fill out the form below to join our volunteer team and support Oromo
              Cultural Resettlement Services Society.
            </p>

            <form onSubmit={handleVolunteerSubmit}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">1. Personal Information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input name="firstName" placeholder="First name *" required type="text" className={inputClass} />
                <input name="lastName" placeholder="Last name *" required type="text" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input name="phone" placeholder="Phone number" type="tel" className={inputClass} />
                <input name="email" placeholder="Email *" required type="email" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input name="dob" placeholder="Date of birth" type="date" className={inputClass} />
                <select name="gender" className={selectClass}>
                  <option value="">Gender / Sex</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="preferNotSay">Prefer not to say</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input name="address" placeholder="Address" type="text" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input name="city" placeholder="City" type="text" className={inputClass} />
                <input name="state" placeholder="State / Province" type="text" className={inputClass} />
                <input name="zip" placeholder="Postal code" type="text" className={inputClass} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">2. Your Availability</p>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea name="availableDays" rows={2} placeholder="Days you are available (e.g. Monday, Wednesday, Friday)" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input name="availableTime" placeholder="Available time (e.g. 4-8 PM)" type="text" className={inputClass} />
                <select name="shiftLength" className={selectClass}>
                  <option value="">Preferred shift length</option>
                  <option value="1-hour">1 hour</option>
                  <option value="2-hour">2 hours</option>
                  <option value="3-hour">3 hours</option>
                  <option value="4-hour">4 hours</option>
                </select>
                <input name="availabilityStart" placeholder="Start date" type="date" className={inputClass} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">3. Emergency Contact</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input name="emergencyName" placeholder="Contact name" type="text" className={inputClass} />
                <input name="emergencyRelationship" placeholder="Relationship" type="text" className={inputClass} />
                <input name="emergencyPhone" placeholder="Contact phone" type="tel" className={inputClass} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">4. Experience & Skills</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select name="previousExperience" className={selectClass}>
                  <option value="">Previous volunteer experience</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <input name="languages" placeholder="Languages spoken" type="text" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <textarea name="skills" rows={2} placeholder="Relevant skills (e.g. event planning, first aid, teaching, IT)" className={inputClass} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">5. Interests & Preferences</p>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <textarea name="workType" rows={2} placeholder="Type of work you are interested in (e.g. outreach, fundraising, event assistance)" className={inputClass} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">6. Background & Consent</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select name="backgroundCheckConsent" className={selectClass}>
                  <option value="">Background check consent</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <select name="liabilityWaiver" className={selectClass}>
                  <option value="">Liability waiver</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <select name="mediaRelease" className={selectClass}>
                  <option value="">Photo / media release</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea name="motivation" rows={3} placeholder="Why do you want to volunteer with us?" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 mb-8">
                <select name="futureCommunicationConsent" className={selectClass}>
                  <option value="">Consent for future communication</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="text-white w-full text-base bg-linear-to-r from-primary to-secondary font-semibold border border-transparent py-4 px-7 rounded-md hover:text-primary hover:border-primary hover:from-transparent hover:to-transparent disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Submit Volunteer Application"}
              </button>

              {submitError && (
                <p className="mt-4 text-sm text-red-500 text-center">{submitError}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UrgentDonation;
