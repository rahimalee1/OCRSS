import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import Volunteer from "@/components/SharedComponent/Volunteer";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import { getSiteImages } from "@/app/lib/site-images";
import { getSiteContact } from "@/app/lib/site-contact";

export const metadata: Metadata = {
  title: "Contact | OCRSS",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const siteImages = await getSiteImages();
  const contactInfo = await getSiteContact();
  return (
    <>
      <HeroSub title="Contact Us" backgroundImage={siteImages.contactBanner} />
      <ContactInfo contactInfo={contactInfo} />
      <ContactForm imageUrl={siteImages.contactFormImage} />
      <Location contactInfo={contactInfo} />
      <Volunteer />
    </>
  );
}
