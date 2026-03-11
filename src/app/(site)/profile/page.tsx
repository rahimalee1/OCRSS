"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-lg border border-border dark:border-dark_border bg-white dark:bg-dark px-4 py-3 text-base text-midnight_text dark:text-white placeholder:text-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changing, setChanging] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  const [emailPassword, setEmailPassword] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [updatingEmail, setUpdatingEmail] = useState(false);

  const [avatarPassword, setAvatarPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted dark:text-white/60">Loading profile...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const isCredentials = (session as { provider?: string }).provider === "credentials";
  const isAdmin = useMemo(() => !!adminEmail && user.email === adminEmail, [adminEmail, user.email]);

  useEffect(() => {
    fetch("/api/site-contact") // cheap existing request warms up; ignore errors
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Get current admin email so the admin can change it later.
    fetch("/api/admin-email-check")
      .then((res) => res.json())
      .then((data) => setAdminEmail(typeof data?.adminEmail === "string" ? data.adminEmail : null))
      .catch(() => setAdminEmail(null));
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    setChanging(true);
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Failed to change password.");
        return;
      }
      toast.success("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setChanging(false);
    }
  };

  const handleAdminEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) {
      toast.error("Please enter a new email address.");
      return;
    }
    setUpdatingEmail(true);
    try {
      const res = await fetch("/api/admin-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: emailPassword, newEmail: newAdminEmail }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Failed to update admin email.");
        return;
      }
      toast.success("Admin email updated. Please sign out and sign in again.");
      setAdminEmail(data.email ?? newAdminEmail.trim());
      setEmailPassword("");
      setNewAdminEmail("");
    } finally {
      setUpdatingEmail(false);
    }
  };

  const handleAvatarUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarFile) {
      toast.error("Please choose an image file.");
      return;
    }
    setUploadingAvatar(true);
    try {
      const fd = new FormData();
      fd.append("file", avatarFile);
      fd.append("currentPassword", avatarPassword);
      const res = await fetch("/api/admin-avatar", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Failed to upload avatar.");
        return;
      }
      toast.success("Display picture updated. Refresh to see it everywhere.");
      setAvatarFile(null);
      setAvatarPassword("");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-midnight_text dark:text-white mb-8">
        Profile
      </h1>

      {isAdmin && (
        <Link
          href="/admin"
          className="mb-6 flex items-center gap-3 p-4 rounded-xl border-2 border-primary bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon icon="mdi:image-multiple" className="text-2xl text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-midnight_text dark:text-white">
              Replace website images
            </p>
            <p className="text-sm text-muted dark:text-white/60">
              Manage hero, banner, and page images (admin only)
            </p>
          </div>
          <Icon icon="mdi:chevron-right" className="text-2xl text-primary flex-shrink-0 ml-auto" />
        </Link>
      )}

      <div className="bg-white dark:bg-darkmode rounded-xl border border-border dark:border-dark_border shadow-cause-shadow dark:shadow-darkmd overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "Profile"}
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon icon="mdi:account" className="text-4xl text-primary" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-midnight_text dark:text-white mb-1">
                {user.name ?? "—"}
              </h2>
              <p className="text-muted dark:text-white/70 break-all">
                {user.email ?? "—"}
              </p>
              <p className="text-xs text-muted dark:text-white/50 mt-2">
                {isCredentials ? "Signed in with email and password." : "Signed in with Google."}
              </p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="border-t border-border dark:border-dark_border p-6 md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Admin profile
            </h3>

            <div className="grid gap-6">
              <form onSubmit={handleAdminEmailUpdate} className="space-y-3 max-w-sm">
                <p className="text-sm text-muted dark:text-white/60">
                  Change the admin email used for manual login and admin access.
                </p>
                <div>
                  <label className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                    New admin email
                  </label>
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className={inputClass}
                    placeholder="Enter a new admin email"
                    disabled={updatingEmail}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                    Current password
                  </label>
                  <input
                    type="password"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    className={inputClass}
                    placeholder="Enter current password"
                    disabled={updatingEmail}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={updatingEmail}
                  className="rounded-lg bg-primary text-white font-semibold px-5 py-2.5 hover:bg-darkprimary disabled:opacity-50 transition-colors"
                >
                  {updatingEmail ? "Updating…" : "Update admin email"}
                </button>
              </form>

              <form onSubmit={handleAvatarUpload} className="space-y-3 max-w-sm">
                <p className="text-sm text-muted dark:text-white/60">
                  Upload a display picture for the admin account.
                </p>
                <div>
                  <label className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                    Display picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                    className="block w-full text-sm text-midnight_text dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={uploadingAvatar}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                    Current password
                  </label>
                  <input
                    type="password"
                    value={avatarPassword}
                    onChange={(e) => setAvatarPassword(e.target.value)}
                    className={inputClass}
                    placeholder="Enter current password"
                    disabled={uploadingAvatar}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploadingAvatar}
                  className="rounded-lg bg-primary text-white font-semibold px-5 py-2.5 hover:bg-darkprimary disabled:opacity-50 transition-colors"
                >
                  {uploadingAvatar ? "Uploading…" : "Upload display picture"}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="border-t border-border dark:border-dark_border p-6 md:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
            Personal information
          </h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-muted dark:text-white/50">Name</dt>
              <dd className="text-midnight_text dark:text-white">{user.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted dark:text-white/50">Email</dt>
              <dd className="text-midnight_text dark:text-white break-all">{user.email ?? "—"}</dd>
            </div>
          </dl>
          {!isCredentials && (
            <p className="text-sm text-muted dark:text-white/60 mt-4">
              To change your name or email, update your{" "}
              <a href="https://myaccount.google.com/profile" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google account
              </a>
              .
            </p>
          )}
        </div>

        <div className="border-t border-border dark:border-dark_border p-6 md:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
            Security & password
          </h3>
          {isCredentials ? (
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                  Current password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={inputClass}
                  required
                  disabled={changing}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                  New password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={inputClass}
                  required
                  minLength={8}
                  disabled={changing}
                  autoComplete="new-password"
                />
                <p className="text-xs text-muted dark:text-white/50 mt-1">At least 8 characters.</p>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-midnight_text dark:text-white mb-1.5">
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass}
                  required
                  disabled={changing}
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                disabled={changing}
                className="rounded-lg bg-primary text-white font-semibold px-5 py-2.5 hover:bg-darkprimary disabled:opacity-50 transition-colors"
              >
                {changing ? "Updating…" : "Change password"}
              </button>
            </form>
          ) : (
            <p className="text-muted dark:text-white/70 text-sm">
              You signed in with Google. Your password is managed by your Google account. To change it or manage security, visit{" "}
              <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google account security
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
