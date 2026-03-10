import type { SiteImageKey } from "@/app/lib/site-images";

export interface SectionImage {
  key: SiteImageKey;
  label: string;
  description: string;
}

export interface AdminSection {
  id: string;
  pageName: string;
  description: string;
  href: string;
  images: SectionImage[];
}

export const ADMIN_SECTIONS: AdminSection[] = [
  {
    id: "home",
    pageName: "Home",
    description: "Images on the home page",
    href: "/admin/home",
    images: [
      { key: "homeHero", label: "Hero banner", description: "Main hero section background" },
      { key: "donateBanner", label: "Donate section banner", description: "Urgent donation / donate CTA section" },
    ],
  },
  {
    id: "about",
    pageName: "About Us",
    description: "Images on the About page",
    href: "/admin/about",
    images: [
      { key: "aboutBanner", label: "Page banner", description: "Top banner behind 'About Us' title" },
      { key: "aboutUs", label: "Who We Are image", description: "Main image in the Who We Are section" },
      { key: "aboutCtaBg", label: "CTA background", description: "Background for 'Join Us in Making a Difference' section" },
    ],
  },
  {
    id: "services",
    pageName: "Services",
    description: "Images on the Our Services page",
    href: "/admin/services",
    images: [
      { key: "servicesBanner", label: "Page banner", description: "Top banner behind 'Our Services' title" },
    ],
  },
  {
    id: "contact",
    pageName: "Contact",
    description: "Images on the Contact page",
    href: "/admin/contact",
    images: [
      { key: "contactBanner", label: "Page banner", description: "Top banner behind 'Contact Us' title" },
      { key: "contactFormImage", label: "Form side image", description: "Image beside the contact form" },
    ],
  },
  {
    id: "events",
    pageName: "Events",
    description: "Images on the Events page",
    href: "/admin/events",
    images: [
      { key: "eventsBanner", label: "Page banner", description: "Top banner behind 'Event List' title" },
    ],
  },
  {
    id: "other",
    pageName: "Other (shared)",
    description: "Images used in multiple or shared sections",
    href: "/admin/other",
    images: [
      { key: "volunteerBg", label: "Volunteer section background", description: "Background for the Volunteer section" },
    ],
  },
];
