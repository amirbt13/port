import type { NextAuthConfig } from "next-auth";

// Edge-safe config shared between middleware and the full auth instance.
// No provider logic here (bcrypt / node APIs live in auth.ts).
export const authConfig = {
  // Support either the Auth.js v5 name (AUTH_SECRET) or the classic NEXTAUTH_SECRET.
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    // Used by middleware to gate the /admin area.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname.startsWith("/admin/login");

      if (isOnLogin) return true; // login page is always reachable
      if (isOnAdmin) return isLoggedIn; // everything else under /admin is protected
      return true;
    },
  },
  providers: [], // added in auth.ts
} satisfies NextAuthConfig;
