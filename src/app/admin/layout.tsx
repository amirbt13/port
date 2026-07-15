import Link from "next/link";
import { auth } from "@/auth";
import { signOutAction } from "./actions-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {session?.user && (
        <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
            <nav className="flex items-center gap-5 text-sm">
              <Link href="/admin" className="font-semibold">
                Dashboard
              </Link>
              <Link href="/admin/projects/new">New project</Link>
              <Link href="/admin/settings">Personal info</Link>
              <Link href="/" target="_blank" className="text-slate-500">
                View site ↗
              </Link>
            </nav>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-sm rounded-md border border-slate-300 dark:border-slate-600 px-3 py-1.5"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>
      )}
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
