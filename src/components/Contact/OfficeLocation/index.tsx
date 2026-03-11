import React from "react";
import Link from "next/link";
import { phoneToWhatsApp, gmailComposeUrl, type SiteContactConfig } from "@/app/lib/site-contact";

interface LocationProps {
  contactInfo?: SiteContactConfig;
}

const Location = ({ contactInfo }: LocationProps) => {
  const address = contactInfo?.address ?? "3, 3025 Nanaimo Street, Vancouver, BC V5N 5W6, Canada";
  const email = contactInfo?.email ?? "oromocultural@gmail.com";
  const phone = contactInfo?.phone ?? "(604) 220-1449";
  const waUrl = phoneToWhatsApp(phone);

  return (
    <>
      <section className="bg-linear-to-r from-primary to-secondary lg:py-24 py-16">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="flex flex-col gap-6">

            {/* Vancouver Head Office */}
            <div className="rounded-xl border border-white/30 bg-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 items-start">
              <div className="col-span-3">
                <h2 className="text-midnight_text text-[36px] leading-tight font-bold">
                  Vancouver<br />Head Office
                </h2>
              </div>
              <div className="col-span-3">
                <p className="sm:text-xl text-lg text-midnight_text/80 font-normal max-w-64 leading-9">
                  {address}
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <Link href={gmailComposeUrl(email)} target="_blank" rel="noopener noreferrer" className="sm:text-xl text-lg text-midnight_text font-medium underline hover:opacity-80">
                  {email}
                </Link>
                <Link href={waUrl} target="_blank" rel="noopener noreferrer" className="sm:text-xl text-lg text-midnight_text/80 flex items-center gap-2 hover:text-midnight_text w-fit">
                  <span className="text-midnight_text/50">WhatsApp</span>{phone}
                </Link>
              </div>
            </div>

            {/* Programs Office */}
            <div className="rounded-xl border border-white/30 bg-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 items-start">
              <div className="col-span-3">
                <h2 className="text-midnight_text text-[36px] leading-tight font-bold max-w-52">
                  Programs Office
                </h2>
              </div>
              <div className="col-span-3">
                <p className="sm:text-xl text-lg text-midnight_text/80 font-normal max-w-64 leading-9">
                  {address}
                </p>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <Link href={gmailComposeUrl(email)} target="_blank" rel="noopener noreferrer" className="sm:text-xl text-lg text-midnight_text font-medium underline hover:opacity-80">
                  {email}
                </Link>
                <Link href={waUrl} target="_blank" rel="noopener noreferrer" className="sm:text-xl text-lg text-midnight_text/80 flex items-center gap-2 hover:text-midnight_text w-fit">
                  <span className="text-midnight_text/50">WhatsApp</span>{phone}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
