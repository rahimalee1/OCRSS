"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";
import type { SiteContactConfig } from "@/app/lib/site-contact";

interface FieldDef {
  key: keyof SiteContactConfig;
  label: string;
  description: string;
  placeholder: string;
}

const FIELDS: FieldDef[] = [
  { key: "email", label: "Email Address", description: "Displayed in the header, footer, and contact page", placeholder: "oromocultural@gmail.com" },
  { key: "phone", label: "Phone Number", description: "Displayed in the header, footer, and contact page (also used for WhatsApp)", placeholder: "(604) 220-1449" },
  { key: "address", label: "Office Address", description: "Displayed in the footer, contact page, and used for the embedded Google Map", placeholder: "3, 3025 Nanaimo Street, Vancouver, BC V5N 5W6, Canada" },
];

export default function AdminContactInfoPage() {
  const [values, setValues] = useState<SiteContactConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/site-contact")
      .then((res) => res.json())
      .then((data) => setValues(data))
      .catch(() => toast.error("Failed to load contact info."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!values) return;
    setSaving(true);
    try {
      const res = await fetch("/api/update-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      toast.success("Contact info updated successfully.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center py-24">
        <Icon icon="mdi:loading" className="text-3xl text-primary animate-spin" />
      </div>
    );
  }

  if (!values) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24">
        <p className="text-red-500">Failed to load contact information.</p>
        <Link href="/admin" className="text-primary text-sm mt-4 inline-block">&larr; Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-primary hover:underline mb-4 inline-flex items-center gap-1">
        <Icon icon="mdi:arrow-left" className="text-base" /> Back to dashboard
      </Link>
      <h1 className="text-2xl font-bold text-midnight_text dark:text-white mb-2">
        Contact Information
      </h1>
      <p className="text-sm text-muted dark:text-white/60 mb-8">
        Update the office email, phone number, and address. Changes reflect across the entire site immediately.
      </p>

      <div className="space-y-5">
        {FIELDS.map((field) => (
          <div key={field.key} className="rounded-xl border border-border dark:border-dark_border bg-white dark:bg-darkmode p-5 shadow-cause-shadow dark:shadow-darkmd">
            <label className="block text-sm font-semibold text-midnight_text dark:text-white mb-1">
              {field.label}
            </label>
            <p className="text-xs text-muted dark:text-white/50 mb-3">{field.description}</p>
            <input
              type="text"
              value={values[field.key]}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-border dark:border-dark_border bg-transparent px-4 py-3 text-sm text-midnight_text dark:text-white placeholder:text-gray-400 outline-none transition focus:border-primary"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-darkprimary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <>
              <Icon icon="mdi:loading" className="text-lg animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Icon icon="mdi:content-save" className="text-lg" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
