import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdminCredentials, verifyAdminPassword } from "@/app/lib/admin-credentials";

// Avoid NEXTAUTH_URL warning in development
if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === "development") {
  process.env.NEXTAUTH_URL = "http://localhost:3000";
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email.trim();
        const ok = await verifyAdminPassword(email, credentials.password);
        if (!ok) return null;
        const admin = await getAdminCredentials();
        return {
          id: "admin",
          email,
          name: "Admin",
          image: admin.avatarUrl ?? null,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.provider = account?.provider ?? "credentials";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? session.user.email;
        session.user.name = token.name ?? session.user.name;
        session.user.image = token.picture ?? session.user.image;
        (session as { provider?: string }).provider = token.provider as string | undefined;
        // For credentials users, always use latest email and avatar from storage so profile updates without refresh
        if (token.provider === "credentials") {
          const admin = await getAdminCredentials();
          session.user.email = admin.email;
          session.user.image = admin.avatarUrl ?? session.user.image;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
