"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="site-container flex min-h-dvh items-center justify-center px-0 py-8">
      <div className="glass-panel grid w-full max-w-4xl overflow-hidden rounded-[2rem] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[34rem] overflow-hidden bg-foreground p-10 text-background md:flex md:flex-col">
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-accent/50 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold tracking-[0.18em] text-background/65 uppercase">Narjes Ghaffari</p>
            <h1 className="display-type mt-6 text-6xl leading-[0.84]">Portfolio<br />studio.</h1>
          </div>
          <p className="relative mt-auto max-w-xs text-sm leading-7 text-background/70">A private workspace for shaping the collection and maintaining the visual story.</p>
        </div>
        <form action={formAction} className="flex flex-col gap-6 p-6 sm:p-10">
          <div>
            <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-foreground"><LockKeyhole size={20} /></span>
            <p className="eyebrow mt-6">Private workspace</p>
            <h2 className="display-type mt-4 text-4xl leading-none">Welcome back.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Sign in to update projects and personal information.</p>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold">
            Email
            <input name="email" type="email" required autoComplete="username" className="admin-input" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Password
            <input name="password" type="password" required autoComplete="current-password" className="admin-input" />
          </label>

          {errorMessage && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-200">{errorMessage}</p>}

          <button type="submit" disabled={isPending} className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
            {isPending ? "Signing in…" : "Enter workspace"}
            {!isPending && <ArrowUpRight size={17} />}
          </button>
          <Link href="/" className="text-center text-sm font-bold text-muted-foreground transition-colors hover:text-foreground">Back to the public portfolio</Link>
        </form>
      </div>
    </div>
  );
}
