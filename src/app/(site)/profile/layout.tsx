import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/auth-options";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/profile");
  }
  return (
    <div className="pt-32 md:pt-40 lg:pt-44 min-h-screen" style={{ paddingTop: "max(8rem, var(--nav-h, 11rem))" }}>
      {children}
    </div>
  );
}
