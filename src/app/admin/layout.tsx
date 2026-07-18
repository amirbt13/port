import Link from "next/link";
import { auth } from "@/auth";
import { signOutAction } from "./actions-auth";
import { ArrowUpRight, LayoutDashboard, Plus, Settings } from "lucide-react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {session?.user && (
        <header className="sticky top-0 z-40 px-3 pt-3 md:px-6">
          <div className="site-container glass-panel flex min-h-16 items-center justify-between rounded-[1.35rem] px-3 py-2 md:px-4">
            <Link href="/admin" className="flex items-center gap-3 rounded-xl px-1.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background display-type text-xl">N</span>
              <span className="hidden sm:block">
                <span className="block text-sm font-bold">Portfolio studio</span>
                <span className="block text-[0.62rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase">Admin workspace</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Admin navigation">
              <Link href="/admin" className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <Link href="/admin/projects/new" className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Plus size={16} /> New project
              </Link>
              <Link href="/admin/settings" className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Settings size={16} /> Personal info
              </Link>
            </nav>

            <div className="flex items-center gap-1.5">
              <Link href="/" target="_blank" className="hidden min-h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex">
                View site <ArrowUpRight size={15} />
              </Link>
              <form action={signOutAction}>
                <button type="submit" className="min-h-10 rounded-xl border border-border px-3 text-sm font-bold transition-colors hover:bg-secondary">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main className="site-container px-0 py-8 md:py-12">{children}</main>
    </div>
  );
};

export default AdminLayout;
