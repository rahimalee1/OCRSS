import { getCloudinary } from "./cloudinary";
import type { SiteImagesConfig } from "./site-images";

const CONFIG_PUBLIC_ID = "config/site-images";

/**
 * Fetch the current site images config JSON from Cloudinary (raw file).
 * Returns null if not found or on error.
 */
export async function getSiteImagesConfigFromCloudinary(): Promise<Partial<SiteImagesConfig> | null> {
  try {
    const cloudinary = getCloudinary();
    const result = await new Promise<{ secure_url?: string } | null>((resolve, reject) => {
      cloudinary.api.resource(
        CONFIG_PUBLIC_ID,
        { resource_type: "raw" },
        (err: Error | null, res: { secure_url?: string } | undefined) => {
          if (err || !res?.secure_url) {
            return resolve(null);
          }
          resolve(res);
        }
      );
    });
    if (!result?.secure_url) return null;
    const res = await fetch(result.secure_url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<SiteImagesConfig>;
    return data;
  } catch {
    return null;
  }
}

/**
 * Save the full site images config to Cloudinary as a raw JSON file (overwrites).
 */
export async function saveSiteImagesConfigToCloudinary(config: SiteImagesConfig): Promise<void> {
  const cloudinary = getCloudinary();
  const json = JSON.stringify(config, null, 2);
  const buffer = Buffer.from(json, "utf-8");

  await new Promise<void>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: CONFIG_PUBLIC_ID,
        overwrite: true,
      },
      (error) => {
        if (error) return reject(error);
        resolve();
      }
    );
    uploadStream.end(buffer);
  });
}
