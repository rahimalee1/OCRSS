"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";
import type { SiteImageKey, SiteImagesConfig } from "@/app/lib/site-images";
import type { SectionImage } from "../admin-sections";

interface AdminSectionImagesProps {
  title: string;
  description: string;
  images: SectionImage[];
}

function initialSelectedFiles(keys: SiteImageKey[]): Record<SiteImageKey, File | null> {
  return keys.reduce((acc, key) => ({ ...acc, [key]: null }), {} as Record<SiteImageKey, File | null>);
}

export default function AdminSectionImages({ title, description, images }: AdminSectionImagesProps) {
  const keys = images.map((i) => i.key);
  const [config, setConfig] = useState<SiteImagesConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<SiteImageKey | null>(null);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<Record<SiteImageKey, File | null>>(() =>
    initialSelectedFiles(keys)
  );

  async function loadConfig() {
    try {
      const res = await fetch(`/api/site-images?_=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConfig();
  }, []);

  async function handleReplace(key: SiteImageKey) {
    const file = selectedFile[key];
    if (!file) {
      toast.error("Please choose a file first.");
      return;
    }
    setUploading(key);
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 10, 90));
    }, 200);
    try {
      const formData = new FormData();
      formData.set("key", key);
      formData.set("file", file);
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      clearInterval(progressInterval);
      setProgress(100);
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      toast.success("Image replaced successfully.");
      setSelectedFile((prev) => ({ ...prev, [key]: null }));
      if (data.config && typeof data.config === "object") {
        setConfig(data.config);
      } else {
        await loadConfig();
      }
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(null);
      setProgress(0);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted dark:text-white/60">Loading images...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-midnight_text dark:text-white mb-2">{title}</h1>
      <p className="text-sm text-muted dark:text-white/60 mb-8">{description}</p>

      <div className="space-y-4">
        {images.map(({ key, label, description: imgDesc }) => {
          const url = config?.[key] || "";
          const isUploading = uploading === key;
          const file = selectedFile[key];

          return (
            <div
              key={key}
              className="bg-white dark:bg-darkmode rounded-xl border border-border dark:border-dark_border shadow-cause-shadow dark:shadow-darkmd overflow-hidden"
            >
              <div className="p-4 border-b border-border dark:border-dark_border">
                <h3 className="font-medium text-midnight_text dark:text-white">{label}</h3>
                <p className="text-xs text-muted dark:text-white/60 mt-0.5">{imgDesc}</p>
              </div>
              <div className="p-4 flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex-shrink-0 w-full sm:w-48 aspect-video rounded-lg bg-grey dark:bg-dark overflow-hidden border border-border dark:border-dark_border">
                  {url ? (
                    <Image
                      key={url}
                      src={url}
                      alt={label}
                      width={192}
                      height={108}
                      className="w-full h-full object-cover"
                      unoptimized={url.startsWith("http")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted dark:text-white/40 text-xs">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <label className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-midnight_text dark:text-white">
                      Choose file
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="text-xs text-muted dark:text-white/60 file:mr-2 file:py-1.5 file:px-2 file:rounded file:border-0 file:bg-primary file:text-white file:text-xs"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        setSelectedFile((prev) => ({ ...prev, [key]: f || null }));
                      }}
                      disabled={isUploading}
                    />
                    {file && (
                      <span className="text-xs text-muted dark:text-white/50">
                        Selected: {file.name}
                      </span>
                    )}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleReplace(key)}
                    disabled={isUploading || !file}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-white px-3 py-2 text-xs font-medium hover:bg-darkprimary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <>
                        <Icon icon="mdi:loading" className="animate-spin text-base" />
                        Uploading… {progress}%
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:upload" className="text-base" />
                        Replace image
                      </>
                    )}
                  </button>
                  {isUploading && (
                    <div className="w-full h-1 bg-grey dark:bg-dark rounded overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
