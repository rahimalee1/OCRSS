"use client";
import { useContext } from "react";
import Link from "next/link";
import DonationFormContext from "@/app/context/donationContext";

const AboutCTA = () => {
  const donationInfo = useContext(DonationFormContext);

  return (
    <section className="relative lg:py-28 py-16 bg-[#0D1318] dark:bg-[#0D1318] overflow-hidden">
      {/* Top gradient strip like home page */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-cyan-400" />
      {/* Optional background image - same as home hero for consistency */}
      <div className="absolute inset-0 bg-[url('/images/hero/banner-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-20" aria-hidden />
      <div className="relative container mx-auto lg:max-w-(--breakpoint-xl) px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-aos="fade-up">
          Join Us in Making a Difference
        </h2>
        <p className="text-white/80 text-base max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
          Whether you want to volunteer, donate, or access our services — we welcome you to be part of
          our growing community. Together, we can build stronger futures.
        </p>
        <div className="flex flex-wrap gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
          <Link
            href="/contact#contact-form"
            className="bg-primary text-white px-8 py-4 rounded-md hover:bg-darkprimary transition-colors font-medium text-lg"
          >
            Get In Touch
          </Link>
          <button
            onClick={() => donationInfo?.setIsDonationOpen(true)}
            className="bg-error text-white px-8 py-4 rounded-md hover:bg-error/90 transition-colors font-medium text-lg"
          >
            Donate Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
