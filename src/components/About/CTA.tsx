"use client";
import { useContext } from "react";
import Link from "next/link";
import DonationFormContext from "@/app/context/donationContext";

const AboutCTA = () => {
  const donationInfo = useContext(DonationFormContext);

  return (
    <section className="lg:py-28 py-16 bg-white dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-6" data-aos="fade-up">
          Join Us in Making a Difference
        </h2>
        <p className="text-muted dark:text-white/60 text-base max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
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
