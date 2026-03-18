import { getCloudinary } from "./cloudinary";
import type { AdminCredentials } from "./admin-credentials";

const CONFIG_PUBLIC_ID = "config/admin-credentials";

/**
 * Fetch admin credentials JSON from Cloudinary (raw file). Returns null if not found or Cloudinary unavailable.
 */
export async function getAdminCredentialsFromCloudinary(): Promise<AdminCredentials | null> {
  try {
    const cloudinary = getCloudinary();
    const result = await new Promise<{ secure_url?: string } | null>((resolve) => {
      cloudinary.api.resource(
        CONFIG_PUBLIC_ID,
        { resource_type: "raw" },
        (err: Error | null, res: { secure_url?: string } | undefined) => {
          if (err || !res?.secure_url) return resolve(null);
          resolve(res);
        }
      );
    });
    if (!result?.secure_url) return null;
    const res = await fetch(result.secure_url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { email?: string; passwordHash?: string; avatarUrl?: string | null };
    if (typeof data.email !== "string" || typeof data.passwordHash !== "string") return null;
    return {
      email: data.email,
      passwordHash: data.passwordHash,
      avatarUrl: typeof data.avatarUrl === "string" ? data.avatarUrl : null,
    };
  } catch {
    return null;
  }
}

/**
 * Save admin credentials to Cloudinary (overwrites). No-op if Cloudinary not configured.
 */
export async function saveAdminCredentialsToCloudinary(creds: AdminCredentials): Promise<void> {
  try {
    const cloudinary = getCloudinary();
    const json = JSON.stringify(
      { email: creds.email, passwordHash: creds.passwordHash, avatarUrl: creds.avatarUrl ?? null },
      null,
      2
    );
    const buffer = Buffer.from(json, "utf-8");
    await new Promise<void>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", public_id: CONFIG_PUBLIC_ID, overwrite: true },
        (error) => (error ? reject(error) : resolve())
      );
      uploadStream.end(buffer);
    });
  } catch (e) {
    console.warn("Failed to save admin credentials to Cloudinary:", e);
    throw new Error("Could not persist admin credentials.");
  }
}
