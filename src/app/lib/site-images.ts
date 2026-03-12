import { ADMIN_EMAIL } from "./admin-constants";

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

export async function getSiteImages(): Promise<SiteImagesConfig> {
  try {
    const { getSiteImagesConfigFromCloudinary } = await import("./site-images-cloudinary");
    const stored = await getSiteImagesConfigFromCloudinary();
    if (!stored || typeof stored !== "object") return getDefaultSiteImages();
    return {
      homeHero: stored.homeHero ?? DEFAULT_SITE_IMAGES.homeHero,
      donateBanner: stored.donateBanner ?? DEFAULT_SITE_IMAGES.donateBanner,
      aboutBanner: stored.aboutBanner ?? DEFAULT_SITE_IMAGES.aboutBanner,
      aboutUs: stored.aboutUs ?? DEFAULT_SITE_IMAGES.aboutUs,
      aboutCtaBg: stored.aboutCtaBg ?? DEFAULT_SITE_IMAGES.aboutCtaBg,
      servicesBanner: stored.servicesBanner ?? DEFAULT_SITE_IMAGES.servicesBanner,
      contactBanner: stored.contactBanner ?? DEFAULT_SITE_IMAGES.contactBanner,
      contactFormImage: stored.contactFormImage ?? DEFAULT_SITE_IMAGES.contactFormImage,
      eventsBanner: stored.eventsBanner ?? DEFAULT_SITE_IMAGES.eventsBanner,
      volunteerBg: stored.volunteerBg ?? DEFAULT_SITE_IMAGES.volunteerBg,
    };
  } catch {
    return getDefaultSiteImages();
  }
}
