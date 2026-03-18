import bcrypt from "bcryptjs";
import { ADMIN_EMAIL } from "./admin-constants";
import {
  getAdminCredentialsFromCloudinary,
  saveAdminCredentialsToCloudinary,
} from "./admin-credentials-cloudinary";

/** No default — set ADMIN_PASSWORD in .env and Vercel for production. */
const getInitialPassword = (): string => {
  const p = process.env.ADMIN_PASSWORD;
  if (!p || p.trim() === "") {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it to .env (local) and Vercel Environment Variables (production)."
    );
  }
  return p.trim();
};

export interface AdminCredentials {
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
}

let cachedCreds: AdminCredentials | null = null;

/** Server-only: get admin credentials from Cloudinary or from env (first run). */
export async function getAdminCredentials(): Promise<AdminCredentials> {
  const stored = await getAdminCredentialsFromCloudinary().catch(() => null);
  if (stored) {
    cachedCreds = stored;
    return stored;
  }
  const email = (ADMIN_EMAIL || "").trim();
  if (!email) {
    throw new Error(
      "ADMIN_EMAIL is not set. Add it to .env (local) and Vercel Environment Variables (production)."
    );
  }
  const initialPassword = getInitialPassword();
  const passwordHash = await bcrypt.hash(initialPassword, 10);
  const defaultCreds: AdminCredentials = {
    email,
    passwordHash,
    avatarUrl: null,
  };
  cachedCreds = defaultCreds;
  try {
    await saveAdminCredentialsToCloudinary(defaultCreds);
  } catch {
    // Cloudinary not configured or save failed; in-memory only
  }
  return defaultCreds;
}

export async function getAdminEmail(): Promise<string> {
  return (await getAdminCredentials()).email;
}

/** Update admin password; persists to Cloudinary so it survives across requests. */
export async function updateAdminPasswordHash(newPasswordHash: string): Promise<void> {
  const creds = await getAdminCredentials();
  const updated = { ...creds, passwordHash: newPasswordHash };
  cachedCreds = updated;
  await saveAdminCredentialsToCloudinary(updated);
}

/** Update admin email; persists to Cloudinary. */
export async function updateAdminEmail(newEmail: string): Promise<void> {
  const creds = await getAdminCredentials();
  const updated = { ...creds, email: newEmail };
  cachedCreds = updated;
  await saveAdminCredentialsToCloudinary(updated);
}

/** Update admin avatar URL; persists to Cloudinary. */
export async function updateAdminAvatarUrl(newAvatarUrl: string | null): Promise<void> {
  const creds = await getAdminCredentials();
  const updated = { ...creds, avatarUrl: newAvatarUrl };
  cachedCreds = updated;
  await saveAdminCredentialsToCloudinary(updated);
}

export async function verifyAdminPassword(email: string, password: string): Promise<boolean> {
  const creds = await getAdminCredentials();
  if (email !== creds.email) return false;
  return bcrypt.compare(password, creds.passwordHash);
}
