import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/auth-options";

const ADMIN_EMAIL = "ocrssbc@gmail.com";

async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }
  if (session.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-grey dark:bg-dark pt-36 md:pt-44 lg:pt-48" style={{ paddingTop: "max(9rem, var(--nav-h, 12rem))" }}>
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 py-8">
        <nav className="flex items-center gap-4 mb-8 pb-4 border-b border-border dark:border-dark_border">
          <Link
            href="/admin"
            className="text-sm font-medium text-primary hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-midnight_text dark:text-white hover:underline"
          >
            Profile
          </Link>
          <Link
            href="/"
            className="text-sm text-muted dark:text-white/60 hover:text-primary"
          >
            Back to site
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
