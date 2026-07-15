"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <form
        action={formAction}
        className="w-full max-w-sm flex flex-col gap-4 rounded-lg border border-slate-300 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 shadow-xl"
      >
        <h1 className="text-2xl font-semibold">Admin sign in</h1>

        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="rounded-md border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-md border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2"
          />
        </label>

        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-green-600 text-white px-4 py-2 font-medium disabled:opacity-60"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
