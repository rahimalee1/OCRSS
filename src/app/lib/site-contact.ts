export { ADMIN_EMAIL } from "./site-images";

export interface SiteContactConfig {
  email: string;
  phone: string;
  address: string;
}

const DEFAULT_SITE_CONTACT: SiteContactConfig = {
  email: "oromocultural@gmail.com",
  phone: "(604) 220-1449",
  address: "3, 3025 Nanaimo Street, Vancouver, BC V5N 5W6, Canada",
};

export function getDefaultSiteContact(): SiteContactConfig {
  return { ...DEFAULT_SITE_CONTACT };
}

/** Derive a WhatsApp URL from a phone string like "(604) 220-1449" → "https://wa.me/16042201449" */
export function phoneToWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const full = digits.length === 10 ? `1${digits}` : digits;
  return `https://wa.me/${full}`;
}

/** Build a Gmail compose link */
export function gmailComposeUrl(email: string, subject = "Inquiry from Website"): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;
}

/** Build a Google Maps embed URL */
export function mapsEmbedUrl(address: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

const CONFIG_PATHNAME = "config/site-contact.json";

export async function getSiteContact(): Promise<SiteContactConfig> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return getDefaultSiteContact();
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: "config/", token });
    const configBlob = blobs.find((b) => b.pathname === CONFIG_PATHNAME);
    if (!configBlob?.url) return getDefaultSiteContact();
    const res = await fetch(configBlob.url);
    if (!res.ok) return getDefaultSiteContact();
    const data = (await res.json()) as Partial<SiteContactConfig>;
    const defaults = getDefaultSiteContact();
    return { ...defaults, ...data };
  } catch {
    return getDefaultSiteContact();
  }
}
