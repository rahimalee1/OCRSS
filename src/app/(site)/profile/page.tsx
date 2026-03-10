"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ADMIN_EMAIL } from "@/app/lib/site-images";

export default function ProfilePage() {
  const { data: session, status } = useSession();

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
  const isAdmin = user.email === ADMIN_EMAIL;

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
                Signed in with Google.
              </p>
            </div>
          </div>
        </div>

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
          <p className="text-sm text-muted dark:text-white/60 mt-4">
            To change your name or email, update your{" "}
            <a href="https://myaccount.google.com/profile" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google account
            </a>
            .
          </p>
        </div>

        <div className="border-t border-border dark:border-dark_border p-6 md:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
            Security & password
          </h3>
          <p className="text-muted dark:text-white/70 text-sm">
            You signed in with Google. Your password is managed by your Google account. To change it or manage security, visit{" "}
            <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google account security
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
