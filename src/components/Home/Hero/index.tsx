"use client"

import Link from "next/link";
import { useContext } from "react";
import { Donation } from "./Donation";
import DonationFormContext from "@/app/context/donationContext";

const Hero = () => {
  const donationInfo = useContext(DonationFormContext);
  return (
    <>
    <section className="relative bg-cover text-white md:pt-40 md:pb-28 py-20 bg-no-repeat bg-[url('/images/hero/banner-bg.jpg')] lg:mt-40 sm:mt-44 mt-20" >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 grid grid-cols-12">
          <div className="bg-white rounded-md p-10 lg:col-span-5 md:col-span-7 sm:col-span-10 col-span-12 dark:bg-dark" data-aos="fade-right">
          <div className="mb-6">
            <div className="px-4 py-2 bg-primary/10 rounded-sm inline-block">
              <p className="text-primary text-sm font-semibold">
                Building Stronger Communities
              </p>
            </div>
          </div>
          <h3 className="text-midnight_text dark:text-white text-xl font-bold mb-6">
            Oromo Cultural Resettlement Services Society
          </h3>
          <p className="text-muted dark:text-white/60 text-base mb-5">
            We provide settlement, education, employment, and community support services to refugees, immigrants, and newcomers in British Columbia.
          </p>
          <div className="grid grid-cols-2 border-t border-border dark:border-dark_border mb-5">
            <div className="col-span-1 border-r border-border dark:border-dark_border px-5 py-4">
              <p className="text-xs text-muted dark:text-white/60 mb-1">Programs</p>
              <h4 className="text-2xl text-secondary">10+</h4>
            </div>
            <div className="col-span-1 px-5 py-4">
              <p className="text-xs text-muted dark:text-white/60 mb-1">Families Helped</p>
              <h4 className="text-2xl text-midnight_text dark:text-white">500+</h4>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => donationInfo?.setIsDonationOpen(true)}
              className="text-white bg-primary text-sm px-7 py-4 font-semibold rounded-md hover:bg-darkprimary transition-colors"
            >
              Donate Now
            </button>
            <Link
              href="/about"
              className="text-midnight_text dark:text-white border border-midnight_text dark:border-white text-sm px-7 py-4 font-semibold rounded-md hover:bg-midnight_text hover:text-white dark:hover:bg-white dark:hover:text-dark transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>

    </>
    
  );
};

export default Hero;
