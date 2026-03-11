import { list, put } from "@vercel/blob";
import bcrypt from "bcryptjs";
import { ADMIN_EMAIL } from "./site-images";

const CONFIG_PATHNAME = "config/admin-credentials.json";
const INITIAL_PASSWORD = "Oromoco2026";

export interface AdminCredentials {
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
}

async function getStoredCredentials(): Promise<AdminCredentials | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  const { blobs } = await list({ prefix: "config/", token });
  const blob = blobs.find((b) => b.pathname === CONFIG_PATHNAME);
  if (!blob?.url) return null;
  const res = await fetch(blob.url);
  if (!res.ok) return null;
  const data = (await res.json()) as { email?: string; passwordHash?: string; avatarUrl?: string | null };
  if (typeof data.email !== "string" || typeof data.passwordHash !== "string") return null;
  return { email: data.email, passwordHash: data.passwordHash, avatarUrl: typeof data.avatarUrl === "string" ? data.avatarUrl : null };
}

/** Server-only: get admin email and password hash (from Blob or initial default). */
export async function getAdminCredentials(): Promise<AdminCredentials> {
  const stored = await getStoredCredentials();
  // If we already have credentials and the email matches the hard-coded admin email,
  // keep using them.
  if (stored && stored.email === ADMIN_EMAIL) return stored;

  // Otherwise, reset to the hard-coded admin email and initial password,
  // while preserving the existing avatar if present.
  const passwordHash = await bcrypt.hash(INITIAL_PASSWORD, 10);
  const reset: AdminCredentials = {
    email: ADMIN_EMAIL,
    passwordHash,
    avatarUrl: stored?.avatarUrl ?? null,
  };

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    await put(
      CONFIG_PATHNAME,
      JSON.stringify(
        { email: reset.email, passwordHash: reset.passwordHash, avatarUrl: reset.avatarUrl },
        null,
        2
      ),
      {
        access: "public",
        addRandomSuffix: false,
        contentType: "application/json",
        allowOverwrite: true,
        token,
      }
    );
  }

  return reset;
}

export async function getAdminEmail(): Promise<string> {
  return (await getAdminCredentials()).email;
}

/** Server-only: update admin password hash in Blob. */
export async function updateAdminPasswordHash(newPasswordHash: string): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("Blob storage not configured");
  const stored = await getStoredCredentials();
  const email = stored?.email ?? ADMIN_EMAIL;
  const avatarUrl = stored?.avatarUrl ?? null;
  await put(
    CONFIG_PATHNAME,
    JSON.stringify({ email, passwordHash: newPasswordHash, avatarUrl }, null, 2),
    { access: "public", addRandomSuffix: false, contentType: "application/json", allowOverwrite: true, token }
  );
}

/** Server-only: update admin email in Blob (keeps existing password hash). */
export async function updateAdminEmail(newEmail: string): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("Blob storage not configured");
  const creds = await getAdminCredentials();
  await put(
    CONFIG_PATHNAME,
    JSON.stringify({ email: newEmail, passwordHash: creds.passwordHash, avatarUrl: creds.avatarUrl ?? null }, null, 2),
    { access: "public", addRandomSuffix: false, contentType: "application/json", allowOverwrite: true, token }
  );
}

export async function updateAdminAvatarUrl(newAvatarUrl: string | null): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("Blob storage not configured");
  const creds = await getAdminCredentials();
  await put(
    CONFIG_PATHNAME,
    JSON.stringify({ email: creds.email, passwordHash: creds.passwordHash, avatarUrl: newAvatarUrl }, null, 2),
    { access: "public", addRandomSuffix: false, contentType: "application/json", allowOverwrite: true, token }
  );
}

export async function verifyAdminPassword(email: string, password: string): Promise<boolean> {
  const creds = await getAdminCredentials();
  if (email !== creds.email) return false;
  return bcrypt.compare(password, creds.passwordHash);
}
