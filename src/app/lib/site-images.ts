export const ADMIN_EMAIL = "ocrssbc@gmail.com";

export type SiteImageKey =
  | "homeHero"
  | "donateBanner"
  | "aboutBanner"
  | "aboutUs"
  | "aboutCtaBg"
  | "servicesBanner"
  | "contactBanner"
  | "contactFormImage"
  | "eventsBanner"
  | "volunteerBg";

export interface SiteImagesConfig {
  homeHero: string;
  donateBanner: string;
  aboutBanner: string;
  aboutUs: string;
  aboutCtaBg: string;
  servicesBanner: string;
  contactBanner: string;
  contactFormImage: string;
  eventsBanner: string;
  volunteerBg: string;
}

const DEFAULT_SITE_IMAGES: SiteImagesConfig = {
  homeHero: "/images/hero/banner-bg.jpg",
  donateBanner: "/images/background/donate-banner.jpg",
  aboutBanner: "/images/background/herosub-banner.png",
  aboutUs: "/images/about/aboutus.png",
  aboutCtaBg: "/images/hero/banner-bg.jpg",
  servicesBanner: "/images/background/herosub-banner.png",
  contactBanner: "/images/contact-page/contactus.jpg",
  contactFormImage: "/images/contact-page/contactus.jpg",
  eventsBanner: "/images/background/herosub-banner.png",
  volunteerBg: "/images/background/volunteer-bg.jpg",
};

export function getDefaultSiteImages(): SiteImagesConfig {
  return { ...DEFAULT_SITE_IMAGES };
}
let siteImagesOverrides: Partial<SiteImagesConfig> = {};

export function setSiteImage(key: SiteImageKey, url: string) {
  siteImagesOverrides = { ...siteImagesOverrides, [key]: url };
}

export async function getSiteImages(): Promise<SiteImagesConfig> {
  return { ...DEFAULT_SITE_IMAGES, ...siteImagesOverrides };
}
