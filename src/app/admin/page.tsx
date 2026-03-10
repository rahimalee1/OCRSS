import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ADMIN_SECTIONS } from "./admin-sections";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-midnight_text dark:text-white mb-2">
        Image manager
      </h1>
      <p className="text-sm text-muted dark:text-white/60 mb-8">
        Choose a section to manage that page’s images. Replace any image and it updates on the site immediately.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {ADMIN_SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className="flex items-start gap-4 p-4 rounded-xl border border-border dark:border-dark_border bg-white dark:bg-darkmode shadow-cause-shadow dark:shadow-darkmd hover:border-primary hover:shadow-md transition-all"
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <Icon icon="mdi:image-multiple" className="text-xl text-primary" />
            </span>
            <div className="min-w-0">
              <h2 className="font-semibold text-midnight_text dark:text-white">
                {section.pageName}
              </h2>
              <p className="text-xs text-muted dark:text-white/60 mt-0.5">
                {section.description}
              </p>
              <p className="text-xs text-primary mt-1">
                {section.images.length} image{section.images.length !== 1 ? "s" : ""} →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
