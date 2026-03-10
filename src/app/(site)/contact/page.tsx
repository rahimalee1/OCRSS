import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import Volunteer from "@/components/SharedComponent/Volunteer";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import { getSiteImages } from "@/app/lib/site-images";

export const metadata: Metadata = {
  title: "Contact | OCRSS",
};

export default async function ContactPage() {
  const siteImages = await getSiteImages();
  return (
    <>
      <HeroSub title="Contact Us" backgroundImage={siteImages.contactBanner} />
      <ContactInfo />
      <ContactForm imageUrl={siteImages.contactFormImage} />
      <Location />
      <Volunteer />
    </>
  );
}
