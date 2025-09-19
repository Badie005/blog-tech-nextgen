import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

// IMPORTANT:
// - Using PrismaAdapter means this must run on the Node.js runtime (not Edge).
// - Email/password via Credentials requires storing a password hash in your User model.
//   The current Prisma schema has no password field; the Credentials provider here returns null
//   until you add `passwordHash` (String) and implement hashing (e.g., bcryptjs).

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Example (requires adding `passwordHash` to User):
        // const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        // if (!user || !user.passwordHash) return null;
        // const isValid = await compare(credentials.password, user.passwordHash);
        // if (!isValid) return null;
        // return { id: user.id, name: user.name, email: user.email, image: user.image, role: user.role } as any;

        // Not implemented due to missing password field in current schema
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      // On first sign-in, attach id/role
      if (user) {
        // user from adapter may include id/role
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as any;
        token.id = u.id ?? token.id;
        token.role = u.role ?? token.role ?? "USER";
      }
      // Ensure token has id/role by querying DB when only token.email is present
      if (!token.id && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true, role: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.id as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = (token.role as string) || "USER";
      }
      return session;
    },
    async signIn() {
      // Allow all providers/users by default
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const target = new URL(url);
        if (target.origin === baseUrl) return url;
      } catch {}
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
