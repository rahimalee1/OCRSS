"use client"

import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "@/components/Layout/Header/Logo";
import { useState } from "react";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-md border placeholder:text-gray-400 border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary";

const selectClass =
  "w-full rounded-md border border-border dark:border-dark_border border-solid bg-white dark:bg-dark px-5 py-3 text-base text-dark dark:text-white outline-hidden transition focus:border-primary dark:focus:border-primary [&>option]:bg-white [&>option]:text-dark dark:[&>option]:bg-dark dark:[&>option]:text-white";

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
              Join Our Community
            </h2>
            <p className="text-base text-white lg:max-w-60% mx-auto mb-6">
              Join our mission to make a positive impact! As a member, you'll
              stand with Oromo refugees, immigrants, and newcomers, helping us
              provide vital services and build a stronger community.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setIsMemberOpen(true)}
                className="text-white rounded-md bg-linear-to-r text-sm font-semibold from-error to-warning px-7 py-4 hover:from-transparent hover:to-transparent border border-transparent hover:border-error hover:text-error"
              >
                Become a Member
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
          <div className="relative mx-auto my-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white px-8 py-10 text-left dark:bg-dark shadow-2xl form-modal-scroll">
            <button
              onClick={() => setIsMemberOpen(false)}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute top-4 right-4 z-10"
              aria-label="Close membership form"
            >
              <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="max-w-[170px]">
                <Logo />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-midnight_text dark:text-white text-center">
              Become a Member
            </h3>
            <p className="text-sm text-muted dark:text-white/60 mb-8 text-center max-w-md mx-auto">
              Fill out the form below to join our community and support Oromo Cultural
              Resettlement Services Society.
            </p>

            <form
              onSubmit={handleMembershipSubmit}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Personal Information</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input name="firstName" placeholder="First name *" required type="text" className={inputClass} />
                <input name="middleName" placeholder="Middle name" type="text" className={inputClass} />
                <input name="lastName" placeholder="Last name *" required type="text" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input name="age" placeholder="Age" type="number" min={0} className={inputClass} />
                <select name="gender" className={selectClass}>
                  <option value="">Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="preferNotSay">Prefer not to say</option>
                </select>
                <select name="maritalStatus" className={selectClass}>
                  <option value="">Marital status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                  <option value="separated">Separated</option>
                  <option value="widow">Widow</option>
                </select>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Address</p>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input name="address" placeholder="Street address" type="text" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input name="city" placeholder="City" type="text" className={inputClass} />
                <select name="province" className={selectClass}>
                  <option value="">Province</option>
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
                <input name="zip" placeholder="Postal code" type="text" className={inputClass} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Contact</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input name="email" placeholder="Email *" required type="email" className={inputClass} />
                <input name="phone" placeholder="Phone" type="tel" className={inputClass} />
                <input name="homePhone" placeholder="Home phone" type="tel" className={inputClass} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Background</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input name="education" placeholder="Education" type="text" className={inputClass} />
                <select name="employment" className={selectClass}>
                  <option value="">Employment status</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Family</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <select name="children" className={selectClass}>
                  <option value="">Children</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <select name="familySize" className={selectClass}>
                  <option value="">Family size</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                  <option value="10+">10+</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="text-white w-full text-base bg-linear-to-r from-primary to-secondary font-semibold border border-transparent py-4 px-7 rounded-md hover:text-primary hover:border-primary hover:from-transparent hover:to-transparent disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Submit Membership"}
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

export default Volunteer;
