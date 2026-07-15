import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Edge middleware uses the provider-less config; the `authorized` callback
// decides whether a request to /admin is allowed.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Run on the admin area only. Auth API routes and static assets are excluded.
  matcher: ["/admin/:path*"],
};
