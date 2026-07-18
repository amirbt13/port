"use client";

import HeaderLogo from "@/components/modules/logo/HeaderLogo";
import ThemeToggle from "@/components/modules/themeToggle/ThemeToggle";
import Link from "next/link";
import BurgerMenu from "@/components/layouts/header/BurgerMenu";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about-me", label: "Studio" },
];

const HeaderLayout = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-6">
      <div className="site-container glass-panel flex min-h-16 items-center justify-between rounded-[1.35rem] px-3 py-2 md:px-4">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2.5 rounded-xl px-1.5"
          aria-label="Narjes Ghaffari home"
        >
          <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-background/60 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
            <HeaderLogo className="size-7" />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-bold tracking-tight">
              Narjes Ghaffari
            </span>
            <span className="mt-1 block text-[0.62rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Architect
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              pathname === "/"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            Home
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                pathname.startsWith(link.href)
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
