"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    // signIn throws a redirect on success — only AuthError means bad creds.
    if (error instanceof AuthError) {
      return "Invalid email or password.";
    }
    throw error;
  }
  return undefined;
}
