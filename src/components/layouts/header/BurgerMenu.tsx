"use client";

import ThemeToggle from "@/components/modules/themeToggle/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/about-me", label: "Studio", index: "03" },
];

const BurgerMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuIsOpen(false), [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setMenuIsOpen(true)}
        className="flex size-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-secondary"
        aria-label="Open navigation menu"
        aria-expanded={menuIsOpen}
      >
        <Menu size={21} aria-hidden="true" />
      </button>

      {menuIsOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/30 p-3 backdrop-blur-sm">
          <div className="glass-panel bg-accent-foreground  flex min-h-full flex-col rounded-[1.75rem] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setMenuIsOpen(false)}
                className="flex size-11 items-center justify-center rounded-xl bg-secondary text-foreground"
                aria-label="Close navigation menu"
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>
            <nav
              className="mt-12 flex flex-1 flex-col"
              aria-label="Mobile navigation"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-border py-5 text-3xl font-semibold tracking-tight"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
                    {link.index}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-border pt-5">
              <span className="text-sm text-muted-foreground">
                Choose your view
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
