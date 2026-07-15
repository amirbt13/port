import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authConfig } from "@/auth.config";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) {
          return null;
        }

        const emailOk = email.toLowerCase() === adminEmail.toLowerCase();
        const passwordOk = await bcrypt.compare(password, adminHash);
        alert(JSON.stringify({ emailOk, passwordOk }));
        if (!emailOk || !passwordOk) {
          alert(JSON.stringify({ emailOk, passwordOk }));

          return null;
        }

        return { id: "admin", email: adminEmail, name: "Admin" };
      },
    }),
  ],
});
