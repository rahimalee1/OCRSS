import bcrypt from "bcryptjs";
import { ADMIN_EMAIL } from "./admin-constants";

const INITIAL_PASSWORD = process.env.ADMIN_PASSWORD ?? "Oromoco2026";

export interface AdminCredentials {
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
}

let cachedCreds: AdminCredentials | null = null;

/** Server-only: get admin email and password hash (pure in-memory, no Blob). */
export async function getAdminCredentials(): Promise<AdminCredentials> {
  if (cachedCreds) return cachedCreds;

  const passwordHash = await bcrypt.hash(INITIAL_PASSWORD, 10);
  cachedCreds = {
    email: ADMIN_EMAIL,
    passwordHash,
    avatarUrl: null,
  };
  return cachedCreds;
}

export async function getAdminEmail(): Promise<string> {
  return (await getAdminCredentials()).email;
}

/** Update admin password hash in memory only. */
export async function updateAdminPasswordHash(newPasswordHash: string): Promise<void> {
  const creds = await getAdminCredentials();
  cachedCreds = { ...creds, passwordHash: newPasswordHash };
}

/** Update admin email in memory only. */
export async function updateAdminEmail(newEmail: string): Promise<void> {
  const creds = await getAdminCredentials();
  cachedCreds = { ...creds, email: newEmail };
}

/** Update admin avatar URL in memory only. */
export async function updateAdminAvatarUrl(newAvatarUrl: string | null): Promise<void> {
  const creds = await getAdminCredentials();
  cachedCreds = { ...creds, avatarUrl: newAvatarUrl };
}

export async function verifyAdminPassword(email: string, password: string): Promise<boolean> {
  const creds = await getAdminCredentials();
  if (email !== creds.email) return false;
  return bcrypt.compare(password, creds.passwordHash);
}
