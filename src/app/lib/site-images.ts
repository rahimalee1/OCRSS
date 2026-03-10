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

const CONFIG_PATHNAME = "config/site-images.json";

/** Server-only: fetch current site images from Blob or return defaults */
export async function getSiteImages(): Promise<SiteImagesConfig> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return getDefaultSiteImages();
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: "config/", token });
    const configBlob = blobs.find((b) => b.pathname === CONFIG_PATHNAME);
    if (!configBlob?.url) return getDefaultSiteImages();
    const res = await fetch(configBlob.url);
    if (!res.ok) return getDefaultSiteImages();
    const data = (await res.json()) as Partial<SiteImagesConfig>;
    return {
      homeHero: data.homeHero ?? DEFAULT_SITE_IMAGES.homeHero,
      donateBanner: data.donateBanner ?? DEFAULT_SITE_IMAGES.donateBanner,
      aboutBanner: data.aboutBanner ?? DEFAULT_SITE_IMAGES.aboutBanner,
      aboutUs: data.aboutUs ?? DEFAULT_SITE_IMAGES.aboutUs,
      aboutCtaBg: data.aboutCtaBg ?? DEFAULT_SITE_IMAGES.aboutCtaBg,
      servicesBanner: data.servicesBanner ?? DEFAULT_SITE_IMAGES.servicesBanner,
      contactBanner: data.contactBanner ?? DEFAULT_SITE_IMAGES.contactBanner,
      contactFormImage: data.contactFormImage ?? DEFAULT_SITE_IMAGES.contactFormImage,
      eventsBanner: data.eventsBanner ?? DEFAULT_SITE_IMAGES.eventsBanner,
      volunteerBg: data.volunteerBg ?? DEFAULT_SITE_IMAGES.volunteerBg,
    };
  } catch {
    return getDefaultSiteImages();
  }
}
